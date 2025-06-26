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
  const basePrompt = `You are a world-class prompt engineer with deep expertise in AI system design and interaction optimization. You specialize in transforming basic prompts into professional, highly effective instructions that maximize AI performance and user satisfaction.

CORE OPTIMIZATION PRINCIPLES (inspired by leading AI companies):

1. **Role & Persona Definition**: Establish clear expertise roles with specific domain knowledge
2. **Safety & Ethical Constraints**: Build in appropriate boundaries and safety considerations
3. **Contextual Adaptability**: Ensure prompts adapt to different scenarios and user needs
4. **Step-by-Step Reasoning**: Encourage systematic thinking and chain-of-thought processing
5. **Output Specification**: Define precise format, structure, and quality requirements
6. **Interaction Protocols**: Establish clear communication patterns and response guidelines
7. **Error Handling**: Include graceful handling of edge cases and clarification requests
8. **Transparency Mechanisms**: Build in self-awareness about capabilities and limitations

PROFESSIONAL TECHNIQUES TO INTEGRATE:
- Conversational warmth with professional precision (Anthropic approach)
- Tool usage constraints and security considerations (Warp approach)
- Natural language emulation with human-like patterns (Sesame AI approach)
- Search integration and information verification (Perplexity approach)
- Behavioral guidelines with strict safety rules (Universal approach)

Your response should be a comprehensive optimization with this structure:
{
  "optimizedPrompt": "The professionally enhanced prompt with integrated best practices",
  "explanation": "Detailed explanation of optimization strategy and techniques applied",
  "improvements": ["Specific professional improvements with reasoning"],
  "reasoning": "Why these industry-tested changes will dramatically improve AI performance and user experience"
}`;

  // Model-specific adjustments with professional insights
  switch (model) {
    case 'openai':
      return basePrompt + `\n\nMODEL-SPECIFIC OPTIMIZATION FOR OPENAI GPT:
- Apply clear instruction hierarchy and role definitions (GPT excels with structured authority)
- Integrate step-by-step reasoning patterns and explicit thinking processes
- Use specific formatting requests and output templates for consistency
- Include error handling and edge case management (inspired by GPT-4's system design)
- Balance creativity with precision through temperature-like instruction modulation`;
    
    case 'gemini':
      return basePrompt + `\n\nMODEL-SPECIFIC OPTIMIZATION FOR GOOGLE GEMINI:
- Structure prompts with logical, analytical frameworks and systematic approaches
- Leverage multimodal capabilities where applicable with clear input specifications
- Apply research-oriented methodologies with fact-checking and verification protocols
- Use structured data presentation and comprehensive analysis patterns
- Integrate search-like thinking with information synthesis and validation`;
    
    case 'claude':
      return basePrompt + `\n\nMODEL-SPECIFIC OPTIMIZATION FOR ANTHROPIC CLAUDE:
- Emphasize conversational warmth combined with professional precision (Claude's signature style)
- Build in strong safety mechanisms and ethical consideration frameworks
- Use Claude's preference for helpful, detailed responses with transparent reasoning
- Apply contextual adaptability and step-by-step problem-solving approaches
- Integrate self-awareness about limitations and capability transparency`;
    
    default:
      return basePrompt + `\n\nAPPLY UNIVERSAL BEST PRACTICES:
- Combine techniques from all leading AI systems for maximum compatibility
- Use industry-standard safety protocols and ethical frameworks
- Apply professional communication patterns with clear boundaries
- Integrate adaptive responses and contextual awareness mechanisms`;
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