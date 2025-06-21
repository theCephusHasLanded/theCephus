// AI Model Integration for Prompt Engineering
export type AIModel = 'openai' | 'gemini' | 'claude' | 'local';

export interface AIModelConfig {
  id: AIModel;
  name: string;
  description: string;
  icon: string;
  pricing: string;
  strengths: string[];
  isAvailable: boolean;
  requiresKey?: boolean;
}

export const AI_MODELS: Record<AIModel, AIModelConfig> = {
  openai: {
    id: 'openai',
    name: 'OpenAI GPT-4',
    description: 'Advanced reasoning and code generation',
    icon: '🧠',
    pricing: 'Pay per use',
    strengths: ['Code generation', 'Complex reasoning', 'Creative writing'],
    isAvailable: true,
    requiresKey: true
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Multimodal AI with strong analytical capabilities',
    icon: '💎',
    pricing: 'Free tier available',
    strengths: ['Analysis', 'Research', 'Multimodal tasks'],
    isAvailable: true,
    requiresKey: true
  },
  claude: {
    id: 'claude',
    name: 'Anthropic Claude',
    description: 'Advanced AI assistant for professional prompt optimization',
    icon: '🤖',
    pricing: 'Your API key',
    strengths: ['Excellent reasoning', 'Detailed analysis', 'Professional quality'],
    isAvailable: true,
    requiresKey: true
  },
  local: {
    id: 'local',
    name: 'AI Optimizer (Always Free)',
    description: 'Intelligent prompt analysis using free models',
    icon: '🧠',
    pricing: 'Completely Free',
    strengths: ['Smart analysis', 'Always available', 'No API required'],
    isAvailable: true,
    requiresKey: false
  }
};

export interface PromptGenerationRequest {
  originalPrompt: string;
  userResponses: Record<string, string>;
  category: string;
  model: AIModel;
  analysis: any;
}

export interface PromptGenerationResponse {
  optimizedPrompt: string;
  explanation: string;
  improvements: string[];
  tokenCount: number;
  model: AIModel;
  generationTime: number;
}

// Generate system prompt for prompt optimization
export function createOptimizationSystemPrompt(model: AIModel): string {
  const basePrompt = `You are an expert prompt engineer specializing in optimizing AI prompts for maximum effectiveness. Your task is to transform rough, basic prompts into professional, well-structured instructions that will produce better results from AI models.

Key principles to apply:
1. Role Definition: Add clear role/persona when beneficial
2. Context Setting: Provide necessary background information
3. Task Specification: Make the request crystal clear and specific
4. Format Requirements: Specify desired output format
5. Constraints & Guidelines: Add helpful boundaries and requirements
6. Examples: Include examples when they would clarify expectations
7. Step-by-step: Break complex tasks into steps when needed

Your response should be a JSON object with this structure:
{
  "optimizedPrompt": "The improved prompt text",
  "explanation": "Brief explanation of what was improved",
  "improvements": ["List of specific improvements made"],
  "reasoning": "Why these changes will make the prompt more effective"
}`;

  // Model-specific adjustments
  switch (model) {
    case 'openai':
      return basePrompt + `\n\nOptimize specifically for OpenAI GPT models, which respond well to clear instructions, role definitions, and specific formatting requests.`;
    
    case 'gemini':
      return basePrompt + `\n\nOptimize specifically for Google Gemini, which excels at analytical tasks and benefits from structured, logical prompt organization.`;
    
    case 'claude':
      return basePrompt + `\n\nOptimize specifically for Anthropic Claude, which values helpful, clear communication and responds well to conversational but specific prompts.`;
    
    default:
      return basePrompt;
  }
}

// Generate user prompt for optimization request
export function createOptimizationUserPrompt(request: PromptGenerationRequest): string {
  const { originalPrompt, userResponses, category, analysis } = request;
  
  let userPrompt = `Please optimize this ${category} prompt:\n\nOriginal: "${originalPrompt}"\n\n`;
  
  // Add user responses as context
  if (Object.keys(userResponses).length > 0) {
    userPrompt += "Additional context provided by user:\n";
    Object.entries(userResponses).forEach(([key, value]) => {
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      userPrompt += `- ${label}: ${value}\n`;
    });
    userPrompt += "\n";
  }
  
  // Add analysis insights
  if (analysis && analysis.missingElements && analysis.missingElements.length > 0) {
    userPrompt += `Missing elements identified: ${analysis.missingElements.join(', ')}\n`;
  }
  
  if (analysis && analysis.strengths && analysis.strengths.length > 0) {
    userPrompt += `Current strengths: ${analysis.strengths.join(', ')}\n`;
  }
  
  userPrompt += `\nPlease create an optimized version that addresses the missing elements while maintaining the original intent. Focus on making it more specific, actionable, and likely to produce high-quality results.`;
  
  return userPrompt;
}

// Call AI model API
export async function generateOptimizedPrompt(request: PromptGenerationRequest): Promise<PromptGenerationResponse> {
  const startTime = Date.now();
  
  try {
    const response = await fetch('/api/prompt-optimization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    const generationTime = Date.now() - startTime;
    
    return {
      ...result,
      model: request.model,
      generationTime
    };
  } catch (error) {
    console.error('Error generating optimized prompt:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate optimized prompt');
  }
}

// Streaming version for real-time responses
export async function* generateOptimizedPromptStream(request: PromptGenerationRequest): AsyncGenerator<string, void, unknown> {
  try {
    const response = await fetch('/api/prompt-optimization-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    if (!reader) {
      throw new Error('No response body');
    }
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            return;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              yield parsed.content;
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  } catch (error) {
    console.error('Error in streaming generation:', error);
    throw error;
  }
}

// Get available models based on configuration
export function getAvailableModels(): AIModelConfig[] {
  return Object.values(AI_MODELS).filter(model => model.isAvailable);
}

// Check if model requires API key
export function modelRequiresKey(model: AIModel): boolean {
  return AI_MODELS[model].requiresKey || false;
}

// Get model-specific instructions for users
export function getModelInstructions(model: AIModel): string {
  switch (model) {
    case 'openai':
      return 'Requires OpenAI API key. Excellent for complex reasoning and code generation tasks.';
    case 'gemini':
      return 'Requires Google AI API key. Great for analytical tasks and research-oriented prompts.';
    case 'claude':
      return 'Uses free tier access. Ideal for writing, analysis, and helpful conversational prompts.';
    default:
      return 'General-purpose AI model for prompt optimization.';
  }
}

// Estimate cost for different models (rough estimates)
export function estimateModelCost(model: AIModel, tokenCount: number): string {
  switch (model) {
    case 'openai':
      const openaiCost = (tokenCount / 1000) * 0.03; // Rough GPT-4 pricing
      return `~$${openaiCost.toFixed(4)}`;
    case 'gemini':
      return 'Free tier available';
    case 'claude':
      return 'Free';
    default:
      return 'N/A';
  }
}