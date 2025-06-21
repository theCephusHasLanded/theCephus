import { NextRequest, NextResponse } from 'next/server';
import { 
  getProviderClient, 
  getProviderByModel, 
  getModelById,
  ChatRequest,
  AIProvider 
} from '@/lib/ai-providers';

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30; // requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const remote = request.headers.get('x-remote-addr');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return real || remote || 'unknown';
}

function validateChatRequest(body: any): ChatRequest | null {
  if (!body || typeof body !== 'object') {
    return null;
  }
  
  const { messages, model, temperature, maxTokens, stream, systemPrompt } = body;
  
  if (!Array.isArray(messages) || !model || typeof model !== 'string') {
    return null;
  }
  
  // Validate messages structure
  for (const message of messages) {
    if (!message.role || !message.content || 
        !['system', 'user', 'assistant'].includes(message.role)) {
      return null;
    }
    
    // Sanitize content length
    if (message.content.length > 50000) {
      return null;
    }
  }
  
  return {
    messages,
    model,
    temperature: temperature && typeof temperature === 'number' ? Math.max(0, Math.min(2, temperature)) : 0.7,
    maxTokens: maxTokens && typeof maxTokens === 'number' ? Math.max(1, Math.min(8192, maxTokens)) : 4096,
    stream: Boolean(stream),
    systemPrompt: systemPrompt && typeof systemPrompt === 'string' ? systemPrompt : undefined
  };
}

function getApiKey(provider: AIProvider): string | null {
  switch (provider) {
    case 'anthropic':
      return process.env.ANTHROPIC_API_KEY || null;
    case 'openai':
      return process.env.OPENAI_API_KEY || null;
    case 'google':
      return process.env.GEMINI_API_KEY || null;
    case 'deepseek':
      return process.env.DEEPSEEK_API_KEY || null;
    default:
      return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request
    const body = await request.json();
    const chatRequest = validateChatRequest(body);
    
    if (!chatRequest) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Get model and provider
    const model = getModelById(chatRequest.model);
    if (!model) {
      return NextResponse.json(
        { error: 'Model not found' },
        { status: 400 }
      );
    }

    const provider = getProviderByModel(chatRequest.model);
    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 400 }
      );
    }

    // Get API key
    const apiKey = getApiKey(provider);
    if (!apiKey) {
      return NextResponse.json(
        { error: `${provider} API key not configured` },
        { status: 503 }
      );
    }

    // Create provider client
    const client = getProviderClient(provider, apiKey);

    // Handle streaming vs non-streaming
    if (chatRequest.stream) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            let fullContent = '';
            for await (const chunk of client.stream(chatRequest)) {
              if (chunk.isComplete) {
                const finalData = {
                  content: '',
                  isComplete: true,
                  totalContent: fullContent,
                  model: chatRequest.model,
                  provider
                };
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(finalData)}\n\n`));
                break;
              } else {
                fullContent += chunk.content;
                const data = {
                  content: chunk.content,
                  isComplete: false,
                  model: chatRequest.model,
                  provider
                };
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
              }
            }
          } catch (error) {
            const errorData = {
              error: error instanceof Error ? error.message : 'Stream error',
              isComplete: true
            };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`));
          } finally {
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          }
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    } else {
      // Non-streaming response
      const response = await client.chat(chatRequest);
      return NextResponse.json(response);
    }

  } catch (error) {
    console.error('Chat API error:', error);
    
    if (error instanceof Error) {
      // Handle specific API errors
      if (error.message.includes('API error: 401')) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }
      
      if (error.message.includes('API error: 429')) {
        return NextResponse.json(
          { error: 'API rate limit exceeded' },
          { status: 429 }
        );
      }
      
      if (error.message.includes('API error: 403')) {
        return NextResponse.json(
          { error: 'API access forbidden' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}