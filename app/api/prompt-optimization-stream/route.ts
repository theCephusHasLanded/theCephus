import { NextRequest } from 'next/server';
import { PromptGenerationRequest, createOptimizationSystemPrompt, createOptimizationUserPrompt } from '@/lib/ai-models';
import { optimizePrompt, analyzePrompt } from '@/lib/prompt-optimizer';

export async function POST(request: NextRequest) {
  try {
    const body: PromptGenerationRequest = await request.json();
    const { model } = body;

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          switch (model) {
            case 'openai':
              const systemPrompt = createOptimizationSystemPrompt(model);
              const userPrompt = createOptimizationUserPrompt(body);
              await streamOpenAI(systemPrompt, userPrompt, controller);
              break;
            case 'gemini':
              const geminiSystemPrompt = createOptimizationSystemPrompt(model);
              const geminiUserPrompt = createOptimizationUserPrompt(body);
              await streamGemini(geminiSystemPrompt, geminiUserPrompt, controller);
              break;
            case 'claude':
              const claudeSystemPrompt = createOptimizationSystemPrompt(model);
              const claudeUserPrompt = createOptimizationUserPrompt(body);
              await streamClaude(claudeSystemPrompt, claudeUserPrompt, controller);
              break;
            case 'local':
              // Use intelligent optimizer for free local model
              await streamIntelligentOptimizer(body, controller);
              break;
            default:
              throw new Error(`Unsupported model: ${model}`);
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({error: errorMessage})}\n\n`));
        } finally {
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in streaming prompt optimization:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to optimize prompt' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function streamOpenAI(systemPrompt: string, userPrompt: string, controller: ReadableStreamDefaultController) {
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
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content})}\n\n`));
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
  }
}

async function streamGemini(systemPrompt: string, userPrompt: string, controller: ReadableStreamDefaultController) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }

  // Gemini doesn't support streaming in the same way, so we'll simulate it
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
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const fullText = data.candidates[0].content.parts[0].text;
  
  // Simulate streaming by sending chunks
  const words = fullText.split(' ');
  for (let i = 0; i < words.length; i += 3) {
    const chunk = words.slice(i, i + 3).join(' ') + ' ';
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: chunk})}\n\n`));
    await new Promise(resolve => setTimeout(resolve, 50)); // Small delay for streaming effect
  }
}

async function streamClaude(systemPrompt: string, userPrompt: string, controller: ReadableStreamDefaultController) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    // Fallback to local optimization
    await streamFallback(userPrompt, controller);
    return;
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
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
        stream: true
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.delta?.text;
            if (content) {
              controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content})}\n\n`));
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  } catch (error) {
    console.warn('Claude streaming failed, using fallback:', error);
    await streamFallback(userPrompt, controller);
  }
}

async function streamFallback(userPrompt: string, controller: ReadableStreamDefaultController) {
  // Extract the original prompt
  const originalMatch = userPrompt.match(/Original: "([\s\S]*?)"/);
  const originalPrompt = originalMatch ? originalMatch[1] : userPrompt;

  // Extract user responses for context
  const roleMatch = userPrompt.match(/Role Definition: (.*)/);
  const formatMatch = userPrompt.match(/Output Format: (.*)/);
  const constraintsMatch = userPrompt.match(/Constraints: (.*)/);

  const userRole = roleMatch ? roleMatch[1] : 'expert assistant';
  const outputFormat = formatMatch ? formatMatch[1] : 'clear and structured';
  const constraints = constraintsMatch ? constraintsMatch[1] : 'accurate and helpful';

  // Stream the optimization process
  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: '✨ **Optimizing your prompt...**\n\n'})}\n\n`));
  await new Promise(resolve => setTimeout(resolve, 300));

  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: '**Original prompt:** ' + originalPrompt + '\n\n'})}\n\n`));
  await new Promise(resolve => setTimeout(resolve, 400));

  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: '**Optimized version:**\n\n'})}\n\n`));
  await new Promise(resolve => setTimeout(resolve, 300));

  // Build optimized prompt
  let optimized = '';

  // Add role definition
  if (!originalPrompt.toLowerCase().includes('you are')) {
    optimized = `You are a ${userRole}. `;
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: optimized})}\n\n`));
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Add the main task with better specificity
  const enhancedPrompt = originalPrompt
    .replace(/help me/gi, 'Please assist me in')
    .replace(/create/gi, 'develop and create')
    .replace(/write/gi, 'compose and write');

  optimized += enhancedPrompt;
  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: enhancedPrompt})}\n\n`));
  await new Promise(resolve => setTimeout(resolve, 300));

  // Add format requirements
  const formatRequirement = `\n\nPlease provide your response in ${outputFormat} format.`;
  optimized += formatRequirement;
  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: formatRequirement})}\n\n`));
  await new Promise(resolve => setTimeout(resolve, 200));

  // Add constraints
  const constraintRequirement = ` Ensure the response is ${constraints}.`;
  optimized += constraintRequirement;
  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: constraintRequirement})}\n\n`));
  await new Promise(resolve => setTimeout(resolve, 200));

  // Add final improvements message
  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: '\n\n**Improvements made:**\n• Added role definition\n• Enhanced specificity\n• Clarified output format\n• Added quality constraints'})}\n\n`));
}

async function streamIntelligentOptimizer(body: PromptGenerationRequest, controller: ReadableStreamDefaultController) {
  const { originalPrompt, userResponses } = body;
  
  // Step 1: Analyze the prompt
  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: '🔍 **Analyzing your prompt...**\n\n'})}\n\n`));
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const analysis = analyzePrompt(originalPrompt, userResponses);
  
  // Step 2: Show analysis results
  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: `**Analysis Results:**\n• Clarity: ${analysis.clarity}/100\n• Specificity: ${analysis.specificity}/100\n• Completeness: ${analysis.completeness}/100\n• Category: ${analysis.category}\n\n`})}\n\n`));
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Step 3: Show what will be improved
  if (analysis.missingElements.length > 0) {
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: `**Missing Elements Detected:**\n${analysis.missingElements.map(e => `• ${e.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`).join('\n')}\n\n`})}\n\n`));
    await new Promise(resolve => setTimeout(resolve, 600));
  }
  
  // Step 4: Generate optimized prompt
  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: '⚡ **Generating optimized prompt...**\n\n'})}\n\n`));
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    const result = await optimizePrompt(originalPrompt, userResponses, true);
    
    // Step 5: Show before/after comparison
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: '**📊 Before vs After:**\n\n'})}\n\n`));
    await new Promise(resolve => setTimeout(resolve, 400));
    
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: `**Original Prompt:**\n"${result.originalPrompt}"\n\n`})}\n\n`));
    await new Promise(resolve => setTimeout(resolve, 800));
    
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: '**✨ Optimized Prompt:**\n\n'})}\n\n`));
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Stream the optimized prompt gradually
    const optimizedWords = result.optimizedPrompt.split(' ');
    for (let i = 0; i < optimizedWords.length; i += 5) {
      const chunk = optimizedWords.slice(i, i + 5).join(' ') + ' ';
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: chunk})}\n\n`));
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    // Step 6: Show improvements made
    await new Promise(resolve => setTimeout(resolve, 600));
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: '\n\n**🎯 Improvements Made:**\n'})}\n\n`));
    await new Promise(resolve => setTimeout(resolve, 300));
    
    for (const improvement of result.improvements) {
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: `• ${improvement}\n`})}\n\n`));
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Step 7: Show metrics improvement
    await new Promise(resolve => setTimeout(resolve, 400));
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: '\n**📈 Quality Improvements:**\n'})}\n\n`));
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const { beforeAfterComparison } = result;
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: `• Clarity: ${beforeAfterComparison.clarity.before} → ${beforeAfterComparison.clarity.after} (+${beforeAfterComparison.clarity.after - beforeAfterComparison.clarity.before})\n`})}\n\n`));
    await new Promise(resolve => setTimeout(resolve, 200));
    
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: `• Specificity: ${beforeAfterComparison.specificity.before} → ${beforeAfterComparison.specificity.after} (+${beforeAfterComparison.specificity.after - beforeAfterComparison.specificity.before})\n`})}\n\n`));
    await new Promise(resolve => setTimeout(resolve, 200));
    
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: `• Completeness: ${beforeAfterComparison.completeness.before} → ${beforeAfterComparison.completeness.after} (+${beforeAfterComparison.completeness.after - beforeAfterComparison.completeness.before})\n`})}\n\n`));
    await new Promise(resolve => setTimeout(resolve, 200));
    
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: `• Token count: ${result.tokenCount.before} → ${result.tokenCount.after}\n\n`})}\n\n`));
    
    // Step 8: Show reasoning
    await new Promise(resolve => setTimeout(resolve, 400));
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: `**🧠 AI Reasoning:**\n${result.reasoning}\n\n`})}\n\n`));
    
    // Final message
    await new Promise(resolve => setTimeout(resolve, 500));
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: '✅ **Optimization complete!** Copy the optimized prompt above and use it with any AI model for better results.'})}\n\n`));
    
  } catch (error) {
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: `❌ **Error during optimization:** ${error instanceof Error ? error.message : 'Unknown error'}\n\nFalling back to rule-based optimization...`})}\n\n`));
    
    // Fallback to rule-based optimization
    const result = await optimizePrompt(originalPrompt, userResponses, false);
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({content: `\n**Optimized Prompt:**\n${result.optimizedPrompt}`})}\n\n`));
  }
}