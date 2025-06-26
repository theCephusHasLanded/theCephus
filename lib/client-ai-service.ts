'use client';

// Client-side AI service for static deployments
export interface AIServiceConfig {
  anthropicKey?: string;
  openaiKey?: string;
  geminiKey?: string;
}

export interface OptimizationRequest {
  originalPrompt: string;
  userResponses: Record<string, string>;
  category: string;
  model: string;
}

export interface OptimizationResult {
  optimizedPrompt: string;
  explanation: string;
  improvements: string[];
  reasoning: string;
}

class ClientAIService {
  private config: AIServiceConfig = {};

  setConfig(config: AIServiceConfig) {
    this.config = config;
  }

  async optimizePrompt(request: OptimizationRequest): Promise<OptimizationResult> {
    const { model } = request;

    switch (model) {
      case 'claude':
        return this.optimizeWithClaude(request);
      case 'openai':
        return this.optimizeWithOpenAI(request);
      case 'gemini':
        return this.optimizeWithGemini(request);
      case 'local':
      default:
        return this.optimizeWithLocal(request);
    }
  }

  async* optimizePromptStream(request: OptimizationRequest): AsyncGenerator<string, void, unknown> {
    const { model } = request;

    switch (model) {
      case 'claude':
        yield* this.optimizeWithClaudeStream(request);
        break;
      case 'openai':
        yield* this.optimizeWithOpenAIStream(request);
        break;
      case 'gemini':
        yield* this.optimizeWithGeminiStream(request);
        break;
      case 'local':
      default:
        yield* this.optimizeWithLocalStream(request);
        break;
    }
  }

  private async optimizeWithClaude(request: OptimizationRequest): Promise<OptimizationResult> {
    if (!this.config.anthropicKey) {
      throw new Error('Anthropic API key not configured');
    }

    const systemPrompt = this.createSystemPrompt('claude');
    const userPrompt = this.createUserPrompt(request);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.config.anthropicKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 2000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content[0].text;
    
    return this.parseOptimizationResult(content);
  }

  private async* optimizeWithClaudeStream(request: OptimizationRequest): AsyncGenerator<string, void, unknown> {
    if (!this.config.anthropicKey) {
      yield 'Error: Anthropic API key not configured';
      return;
    }

    const systemPrompt = this.createSystemPrompt('claude');
    const userPrompt = this.createUserPrompt(request);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': this.config.anthropicKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 2000,
          temperature: 0.7,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }],
          stream: true
        })
      });

      if (!response.ok) {
        yield `Error: Claude API error - ${response.statusText}`;
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        yield 'Error: No response body';
        return;
      }

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
              if (parsed.delta?.text) {
                yield parsed.delta.text;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      yield `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  private async optimizeWithOpenAI(request: OptimizationRequest): Promise<OptimizationResult> {
    if (!this.config.openaiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = this.createSystemPrompt('openai');
    const userPrompt = this.createUserPrompt(request);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.openaiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    return this.parseOptimizationResult(content);
  }

  private async* optimizeWithOpenAIStream(request: OptimizationRequest): AsyncGenerator<string, void, unknown> {
    if (!this.config.openaiKey) {
      yield 'Error: OpenAI API key not configured';
      return;
    }

    const systemPrompt = this.createSystemPrompt('openai');
    const userPrompt = this.createUserPrompt(request);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.openaiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 2000,
          stream: true
        })
      });

      if (!response.ok) {
        yield `Error: OpenAI API error - ${response.statusText}`;
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        yield 'Error: No response body';
        return;
      }

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
              if (parsed.choices[0]?.delta?.content) {
                yield parsed.choices[0].delta.content;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      yield `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  private async optimizeWithGemini(request: OptimizationRequest): Promise<OptimizationResult> {
    if (!this.config.geminiKey) {
      throw new Error('Gemini API key not configured');
    }

    const systemPrompt = this.createSystemPrompt('gemini');
    const userPrompt = this.createUserPrompt(request);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.config.geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser Request:\n${userPrompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    
    return this.parseOptimizationResult(content);
  }

  private async* optimizeWithGeminiStream(request: OptimizationRequest): AsyncGenerator<string, void, unknown> {
    // Gemini doesn't support streaming, so we'll simulate it
    try {
      const result = await this.optimizeWithGemini(request);
      const fullText = result.optimizedPrompt;
      
      // Simulate streaming by yielding chunks
      const words = fullText.split(' ');
      for (let i = 0; i < words.length; i += 3) {
        const chunk = words.slice(i, i + 3).join(' ') + ' ';
        yield chunk;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      yield `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  private async optimizeWithLocal(request: OptimizationRequest): Promise<OptimizationResult> {
    // Local optimization using rule-based improvements
    const { originalPrompt, userResponses } = request;
    
    let optimized = originalPrompt;
    const improvements: string[] = [];

    // Add role if missing
    if (!optimized.toLowerCase().includes('you are') && !optimized.toLowerCase().includes('act as')) {
      const role = userResponses.role_definition || 'expert assistant';
      optimized = `You are a ${role}. ${optimized}`;
      improvements.push('Added role definition');
    }

    // Add format specification if missing
    if (!optimized.toLowerCase().includes('format') && !optimized.toLowerCase().includes('structure')) {
      const format = userResponses.output_format || 'clear, well-structured format';
      optimized += `\n\nPlease provide your response in ${format}.`;
      improvements.push('Added format specification');
    }

    // Add specificity if the prompt is too short
    if (optimized.split(' ').length < 20) {
      optimized += ' Please be thorough and provide detailed explanations with examples where helpful.';
      improvements.push('Enhanced specificity and detail requirements');
    }

    // Add constraints if specified
    if (userResponses.constraints) {
      optimized += `\n\nImportant constraints: ${userResponses.constraints}`;
      improvements.push('Added user-specified constraints');
    }

    return {
      optimizedPrompt: optimized,
      explanation: 'Optimized using intelligent rule-based improvements',
      improvements,
      reasoning: 'Applied professional prompt engineering principles including role definition, format specification, and clarity enhancements'
    };
  }

  private async* optimizeWithLocalStream(request: OptimizationRequest): AsyncGenerator<string, void, unknown> {
    yield '🔍 **Analyzing your prompt...**\n\n';
    await new Promise(resolve => setTimeout(resolve, 500));

    yield '**Original prompt:** ' + request.originalPrompt + '\n\n';
    await new Promise(resolve => setTimeout(resolve, 400));

    yield '⚡ **Generating optimized version...**\n\n';
    await new Promise(resolve => setTimeout(resolve, 600));

    const result = await this.optimizeWithLocal(request);
    
    yield '**✨ Optimized Prompt:**\n\n';
    await new Promise(resolve => setTimeout(resolve, 300));

    // Stream the optimized prompt word by word
    const words = result.optimizedPrompt.split(' ');
    for (let i = 0; i < words.length; i += 5) {
      const chunk = words.slice(i, i + 5).join(' ') + ' ';
      yield chunk;
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    yield '\n\n**🎯 Improvements Made:**\n';
    await new Promise(resolve => setTimeout(resolve, 300));

    for (const improvement of result.improvements) {
      yield `• ${improvement}\n`;
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    yield '\n**🧠 Reasoning:**\n';
    yield result.reasoning;
  }

  private createSystemPrompt(model: string): string {
    const basePrompt = `You are a world-class prompt engineer specializing in optimizing AI prompts for maximum effectiveness. Transform basic prompts into professional, well-structured instructions.

Apply these principles:
1. Role Definition: Add clear expertise roles
2. Context Setting: Provide necessary background
3. Task Specification: Make requests crystal clear
4. Format Requirements: Specify desired output format
5. Constraints & Guidelines: Add helpful boundaries
6. Step-by-step: Break complex tasks into steps

Return a JSON object with:
{
  "optimizedPrompt": "The improved prompt text",
  "explanation": "Brief explanation of improvements",
  "improvements": ["List of specific improvements"],
  "reasoning": "Why these changes improve effectiveness"
}`;

    switch (model) {
      case 'openai':
        return basePrompt + '\n\nOptimize for OpenAI GPT models with clear instructions and role definitions.';
      case 'gemini':
        return basePrompt + '\n\nOptimize for Google Gemini with structured, analytical approaches.';
      case 'claude':
        return basePrompt + '\n\nOptimize for Anthropic Claude with conversational but specific prompts.';
      default:
        return basePrompt;
    }
  }

  private createUserPrompt(request: OptimizationRequest): string {
    const { originalPrompt, userResponses, category } = request;
    
    let prompt = `Please optimize this ${category} prompt:\n\nOriginal: "${originalPrompt}"\n\n`;
    
    if (Object.keys(userResponses).length > 0) {
      prompt += "Additional context:\n";
      Object.entries(userResponses).forEach(([key, value]) => {
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        prompt += `- ${label}: ${value}\n`;
      });
    }
    
    return prompt;
  }

  private parseOptimizationResult(content: string): OptimizationResult {
    try {
      // Try to parse as JSON first
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          optimizedPrompt: parsed.optimizedPrompt || content,
          explanation: parsed.explanation || 'AI-generated optimization',
          improvements: parsed.improvements || ['Enhanced clarity', 'Improved structure'],
          reasoning: parsed.reasoning || 'Applied professional prompt engineering principles'
        };
      }
    } catch (e) {
      // If JSON parsing fails, extract from markdown format
    }

    // Fallback: extract from markdown format
    const optimizedMatch = content.match(/\*\*✨ Optimized Prompt:\*\*\n\n([\s\S]*?)(?=\n\n\*\*|$)/);
    const improvementsMatch = content.match(/\*\*🎯 Improvements Made:\*\*\n([\s\S]*?)(?=\n\n\*\*|$)/);
    
    let optimizedPrompt = '';
    let improvements: string[] = [];
    
    if (optimizedMatch) {
      optimizedPrompt = optimizedMatch[1].trim();
    } else {
      optimizedPrompt = content;
    }
    
    if (improvementsMatch) {
      improvements = improvementsMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('•'))
        .map(line => line.replace(/^•\s*/, '').trim())
        .filter(Boolean);
    }
    
    return {
      optimizedPrompt: optimizedPrompt || content,
      explanation: 'AI-generated optimization with enhanced structure',
      improvements: improvements.length > 0 ? improvements : ['Enhanced clarity', 'Improved structure', 'Added context'],
      reasoning: 'Applied professional prompt engineering principles for better AI performance'
    };
  }
}

export const clientAIService = new ClientAIService();