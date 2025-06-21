import { NextRequest, NextResponse } from 'next/server';
import { PromptGenerationRequest, createOptimizationSystemPrompt, createOptimizationUserPrompt } from '@/lib/ai-models';

export async function POST(request: NextRequest) {
  try {
    const body: PromptGenerationRequest = await request.json();
    const { model, originalPrompt, userResponses, category, analysis } = body;

    // Generate system and user prompts
    const systemPrompt = createOptimizationSystemPrompt(model);
    const userPrompt = createOptimizationUserPrompt(body);

    let result;

    switch (model) {
      case 'openai':
        result = await callOpenAI(systemPrompt, userPrompt);
        break;
      case 'gemini':
        result = await callGemini(systemPrompt, userPrompt);
        break;
      case 'claude':
        result = await callClaude(systemPrompt, userPrompt);
        break;
      default:
        throw new Error(`Unsupported model: ${model}`);
    }

    // Parse the AI response
    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      parsedResult = {
        optimizedPrompt: result,
        explanation: "AI-generated optimization",
        improvements: ["Enhanced clarity", "Added structure", "Improved specificity"],
        reasoning: "The prompt has been optimized using AI analysis"
      };
    }

    // Calculate token count (rough estimate)
    const tokenCount = Math.ceil(parsedResult.optimizedPrompt.split(/\s+/).length * 1.3);

    return NextResponse.json({
      optimizedPrompt: parsedResult.optimizedPrompt,
      explanation: parsedResult.explanation,
      improvements: parsedResult.improvements,
      tokenCount,
      reasoning: parsedResult.reasoning
    });

  } catch (error) {
    console.error('Error in prompt optimization:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to optimize prompt' },
      { status: 500 }
    );
  }
}

async function callOpenAI(systemPrompt: string, userPrompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini', // Using cheaper model for cost efficiency
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(systemPrompt: string, userPrompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${systemPrompt}\n\nUser Request:\n${userPrompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

async function callClaude(systemPrompt: string, userPrompt: string) {
  // For Claude, we'll use a fallback approach since free tier requires web interface
  // In a real implementation, you would use Anthropic's API with proper keys
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    // Fallback to local optimization when no API key is available
    return await fallbackOptimization(userPrompt);
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', // Using cheaper model
        max_tokens: 1000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt }
        ]
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Claude API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.warn('Claude API failed, using fallback:', error);
    return await fallbackOptimization(userPrompt);
  }
}

// Fallback optimization for when API keys are not available
async function fallbackOptimization(userPrompt: string): Promise<string> {
  // Extract the original prompt from the user prompt
  const originalMatch = userPrompt.match(/Original: "([\s\S]*?)"/g);
  const originalPrompt = originalMatch ? originalMatch[1] : userPrompt;

  // Create a rule-based optimization
  const optimizations = [];
  let optimizedPrompt = originalPrompt;

  // Add role if missing
  if (!optimizedPrompt.toLowerCase().includes('you are') && !optimizedPrompt.toLowerCase().includes('act as')) {
    optimizedPrompt = `You are an expert assistant. ${optimizedPrompt}`;
    optimizations.push('Added role definition');
  }

  // Add format specification if missing
  if (!optimizedPrompt.toLowerCase().includes('format') && !optimizedPrompt.toLowerCase().includes('structure')) {
    optimizedPrompt += '\n\nPlease provide your response in a clear, well-structured format.';
    optimizations.push('Added format specification');
  }

  // Add specificity if the prompt is too short
  if (optimizedPrompt.split(' ').length < 20) {
    optimizedPrompt += ' Please be thorough and provide detailed explanations.';
    optimizations.push('Enhanced specificity');
  }

  // Add constraints if missing
  if (!optimizedPrompt.toLowerCase().includes('ensure') && !optimizedPrompt.toLowerCase().includes('make sure')) {
    optimizedPrompt += '\n\nEnsure your response is accurate and helpful.';
    optimizations.push('Added quality constraints');
  }

  return JSON.stringify({
    optimizedPrompt,
    explanation: 'Optimized using built-in prompt engineering rules',
    improvements: optimizations,
    reasoning: 'Applied role definition, format specification, and quality constraints to improve prompt effectiveness'
  });
}