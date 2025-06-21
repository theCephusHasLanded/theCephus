// AI Provider Types and Interfaces
export type AIProvider = 'anthropic' | 'openai' | 'google' | 'deepseek';

export interface AIModel {
  id: string;
  name: string;
  provider: AIProvider;
  maxTokens: number;
  contextWindow: number;
  costPer1kTokens: number;
  supportsStreaming: boolean;
  capabilities: string[];
  description: string;
}

export interface AIProviderConfig {
  id: AIProvider;
  name: string;
  icon: string;
  description: string;
  models: AIModel[];
  isAvailable: boolean;
  apiKeyEnvVar: string;
  baseUrl?: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  tokens?: number;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  systemPrompt?: string;
}

export interface ChatResponse {
  content: string;
  model: string;
  provider: AIProvider;
  tokens: {
    prompt: number;
    completion: number;
    total: number;
  };
  cost: number;
  finishReason: string;
}

export interface StreamChunk {
  content: string;
  isComplete: boolean;
  tokens?: number;
}

// AI Models Configuration
export const AI_MODELS: Record<string, AIModel> = {
  // Anthropic Claude Models
  'claude-3-5-sonnet-20241022': {
    id: 'claude-3-5-sonnet-20241022',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    maxTokens: 8192,
    contextWindow: 200000,
    costPer1kTokens: 3.0,
    supportsStreaming: true,
    capabilities: ['reasoning', 'coding', 'analysis', 'writing'],
    description: 'Most intelligent Claude model, best for complex tasks'
  },
  'claude-3-sonnet-20240229': {
    id: 'claude-3-sonnet-20240229',
    name: 'Claude 3 Sonnet',
    provider: 'anthropic',
    maxTokens: 4096,
    contextWindow: 200000,
    costPer1kTokens: 3.0,
    supportsStreaming: true,
    capabilities: ['reasoning', 'coding', 'analysis'],
    description: 'Balanced performance and speed'
  },
  'claude-3-haiku-20240307': {
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    maxTokens: 4096,
    contextWindow: 200000,
    costPer1kTokens: 0.25,
    supportsStreaming: true,
    capabilities: ['reasoning', 'coding'],
    description: 'Fastest and most cost-effective'
  },

  // OpenAI Models
  'gpt-4-turbo': {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    maxTokens: 4096,
    contextWindow: 128000,
    costPer1kTokens: 10.0,
    supportsStreaming: true,
    capabilities: ['reasoning', 'coding', 'analysis', 'writing', 'vision'],
    description: 'Most capable GPT-4 model with large context'
  },
  'gpt-4o': {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    maxTokens: 4096,
    contextWindow: 128000,
    costPer1kTokens: 5.0,
    supportsStreaming: true,
    capabilities: ['reasoning', 'coding', 'analysis', 'writing', 'vision'],
    description: 'Optimized GPT-4 with multimodal capabilities'
  },
  'gpt-3.5-turbo': {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    maxTokens: 4096,
    contextWindow: 16385,
    costPer1kTokens: 0.5,
    supportsStreaming: true,
    capabilities: ['coding', 'writing'],
    description: 'Fast and cost-effective for most tasks'
  },

  // Google Gemini Models
  'gemini-1.5-pro': {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    maxTokens: 8192,
    contextWindow: 2000000,
    costPer1kTokens: 7.0,
    supportsStreaming: true,
    capabilities: ['reasoning', 'coding', 'analysis', 'writing', 'vision'],
    description: 'Largest context window, excellent for long documents'
  },
  'gemini-1.5-flash': {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'google',
    maxTokens: 8192,
    contextWindow: 1000000,
    costPer1kTokens: 0.35,
    supportsStreaming: true,
    capabilities: ['reasoning', 'coding', 'analysis'],
    description: 'Fast and efficient with large context'
  },
  'gemini-pro': {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'google',
    maxTokens: 2048,
    contextWindow: 30720,
    costPer1kTokens: 0.5,
    supportsStreaming: true,
    capabilities: ['reasoning', 'writing'],
    description: 'Standard Gemini model for general tasks'
  },

  // DeepSeek Models
  'deepseek-chat': {
    id: 'deepseek-chat',
    name: 'DeepSeek Chat',
    provider: 'deepseek',
    maxTokens: 4096,
    contextWindow: 32768,
    costPer1kTokens: 0.14,
    supportsStreaming: true,
    capabilities: ['reasoning', 'writing', 'analysis'],
    description: 'General purpose conversational model'
  },
  'deepseek-coder': {
    id: 'deepseek-coder',
    name: 'DeepSeek Coder',
    provider: 'deepseek',
    maxTokens: 4096,
    contextWindow: 16384,
    costPer1kTokens: 0.14,
    supportsStreaming: true,
    capabilities: ['coding', 'debugging', 'refactoring'],
    description: 'Specialized for code generation and debugging'
  }
};

// AI Providers Configuration
export const AI_PROVIDERS: Record<AIProvider, AIProviderConfig> = {
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    icon: '🤖',
    description: 'Constitutional AI with Claude models',
    models: [
      AI_MODELS['claude-3-5-sonnet-20241022'],
      AI_MODELS['claude-3-sonnet-20240229'],
      AI_MODELS['claude-3-haiku-20240307']
    ],
    isAvailable: false,
    apiKeyEnvVar: 'ANTHROPIC_API_KEY',
    baseUrl: 'https://api.anthropic.com'
  },
  openai: {
    id: 'openai',
    name: 'OpenAI',
    icon: '🧠',
    description: 'GPT models for various tasks',
    models: [
      AI_MODELS['gpt-4-turbo'],
      AI_MODELS['gpt-4o'],
      AI_MODELS['gpt-3.5-turbo']
    ],
    isAvailable: false,
    apiKeyEnvVar: 'OPENAI_API_KEY',
    baseUrl: 'https://api.openai.com'
  },
  google: {
    id: 'google',
    name: 'Google',
    icon: '💎',
    description: 'Gemini models with large context windows',
    models: [
      AI_MODELS['gemini-1.5-pro'],
      AI_MODELS['gemini-1.5-flash'],
      AI_MODELS['gemini-pro']
    ],
    isAvailable: false,
    apiKeyEnvVar: 'GEMINI_API_KEY',
    baseUrl: 'https://generativelanguage.googleapis.com'
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: '🔍',
    description: 'Efficient models for chat and coding',
    models: [
      AI_MODELS['deepseek-chat'],
      AI_MODELS['deepseek-coder']
    ],
    isAvailable: false,
    apiKeyEnvVar: 'DEEPSEEK_API_KEY',
    baseUrl: 'https://api.deepseek.com'
  }
};

// Provider-specific API implementations
export abstract class AIProviderClient {
  abstract chat(request: ChatRequest): Promise<ChatResponse>;
  abstract stream(request: ChatRequest): AsyncGenerator<StreamChunk>;
  abstract validateApiKey(): Promise<boolean>;
}

export class AnthropicClient extends AIProviderClient {
  constructor(private apiKey: string) {
    super();
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: request.model,
        max_tokens: request.maxTokens || 4096,
        temperature: request.temperature || 0.7,
        messages: request.messages.filter(m => m.role !== 'system'),
        system: request.systemPrompt || request.messages.find(m => m.role === 'system')?.content
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const modelConfig = AI_MODELS[request.model];
    
    return {
      content: data.content[0].text,
      model: request.model,
      provider: 'anthropic',
      tokens: {
        prompt: data.usage.input_tokens,
        completion: data.usage.output_tokens,
        total: data.usage.input_tokens + data.usage.output_tokens
      },
      cost: ((data.usage.input_tokens + data.usage.output_tokens) / 1000) * modelConfig.costPer1kTokens,
      finishReason: data.stop_reason
    };
  }

  async *stream(request: ChatRequest): AsyncGenerator<StreamChunk> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: request.model,
        max_tokens: request.maxTokens || 4096,
        temperature: request.temperature || 0.7,
        messages: request.messages.filter(m => m.role !== 'system'),
        system: request.systemPrompt || request.messages.find(m => m.role === 'system')?.content,
        stream: true
      })
    });

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
          if (data === '[DONE]') {
            yield { content: '', isComplete: true };
            return;
          }
          
          try {
            const parsed = JSON.parse(data);
            if (parsed.delta?.text) {
              yield { content: parsed.delta.text, isComplete: false };
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1,
          messages: [{ role: 'user', content: 'test' }]
        })
      });
      return response.status !== 401;
    } catch {
      return false;
    }
  }
}

export class OpenAIClient extends AIProviderClient {
  constructor(private apiKey: string) {
    super();
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 4096
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const modelConfig = AI_MODELS[request.model];
    
    return {
      content: data.choices[0].message.content,
      model: request.model,
      provider: 'openai',
      tokens: {
        prompt: data.usage.prompt_tokens,
        completion: data.usage.completion_tokens,
        total: data.usage.total_tokens
      },
      cost: (data.usage.total_tokens / 1000) * modelConfig.costPer1kTokens,
      finishReason: data.choices[0].finish_reason
    };
  }

  async *stream(request: ChatRequest): AsyncGenerator<StreamChunk> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 4096,
        stream: true
      })
    });

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
          if (data === '[DONE]') {
            yield { content: '', isComplete: true };
            return;
          }
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              yield { content, isComplete: false };
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export class GoogleClient extends AIProviderClient {
  constructor(private apiKey: string) {
    super();
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const modelName = request.model.includes('1.5') ? request.model : 'gemini-pro';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: request.messages.map(m => `${m.role}: ${m.content}`).join('\n\n')
            }]
          }],
          generationConfig: {
            temperature: request.temperature || 0.7,
            maxOutputTokens: request.maxTokens || 4096
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    const modelConfig = AI_MODELS[request.model];
    const content = data.candidates[0].content.parts[0].text;
    const tokens = Math.ceil(content.split(' ').length * 1.3); // Rough estimate
    
    return {
      content,
      model: request.model,
      provider: 'google',
      tokens: {
        prompt: tokens,
        completion: tokens,
        total: tokens * 2
      },
      cost: (tokens * 2 / 1000) * modelConfig.costPer1kTokens,
      finishReason: 'stop'
    };
  }

  async *stream(request: ChatRequest): AsyncGenerator<StreamChunk> {
    // Google doesn't support streaming in the same way, so we'll simulate it
    const response = await this.chat({ ...request, stream: false });
    const words = response.content.split(' ');
    
    for (let i = 0; i < words.length; i += 3) {
      const chunk = words.slice(i, i + 3).join(' ') + ' ';
      yield { content: chunk, isComplete: false };
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    yield { content: '', isComplete: true };
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'test' }] }]
          })
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  }
}

export class DeepSeekClient extends AIProviderClient {
  constructor(private apiKey: string) {
    super();
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 4096
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const modelConfig = AI_MODELS[request.model];
    
    return {
      content: data.choices[0].message.content,
      model: request.model,
      provider: 'deepseek',
      tokens: {
        prompt: data.usage.prompt_tokens,
        completion: data.usage.completion_tokens,
        total: data.usage.total_tokens
      },
      cost: (data.usage.total_tokens / 1000) * modelConfig.costPer1kTokens,
      finishReason: data.choices[0].finish_reason
    };
  }

  async *stream(request: ChatRequest): AsyncGenerator<StreamChunk> {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 4096,
        stream: true
      })
    });

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
          if (data === '[DONE]') {
            yield { content: '', isComplete: true };
            return;
          }
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              yield { content, isComplete: false };
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const response = await fetch('https://api.deepseek.com/v1/models', {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Utility functions
export function getProviderClient(provider: AIProvider, apiKey: string): AIProviderClient {
  switch (provider) {
    case 'anthropic':
      return new AnthropicClient(apiKey);
    case 'openai':
      return new OpenAIClient(apiKey);
    case 'google':
      return new GoogleClient(apiKey);
    case 'deepseek':
      return new DeepSeekClient(apiKey);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

export function getAvailableModels(availableProviders: AIProvider[]): AIModel[] {
  return availableProviders.flatMap(provider => AI_PROVIDERS[provider].models);
}

export function getModelById(modelId: string): AIModel | undefined {
  return AI_MODELS[modelId];
}

export function getProviderByModel(modelId: string): AIProvider | undefined {
  const model = getModelById(modelId);
  return model?.provider;
}

export function calculateCost(tokens: number, model: AIModel): number {
  return (tokens / 1000) * model.costPer1kTokens;
}

export function formatCost(cost: number): string {
  if (cost < 0.01) {
    return `$${(cost * 1000).toFixed(2)}¢`;
  }
  return `$${cost.toFixed(4)}`;
}