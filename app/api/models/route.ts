import { NextRequest, NextResponse } from 'next/server';
import { AI_PROVIDERS, AI_MODELS, AIProvider } from '@/lib/ai-providers';

function checkProviderAvailability(provider: AIProvider): boolean {
  switch (provider) {
    case 'anthropic':
      return Boolean(process.env.ANTHROPIC_API_KEY);
    case 'openai':
      return Boolean(process.env.OPENAI_API_KEY);
    case 'google':
      return Boolean(process.env.GEMINI_API_KEY);
    case 'deepseek':
      return Boolean(process.env.DEEPSEEK_API_KEY);
    default:
      return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check which providers are available based on environment variables
    const availableProviders = Object.keys(AI_PROVIDERS).filter(provider => 
      checkProviderAvailability(provider as AIProvider)
    ) as AIProvider[];

    // Get available models grouped by provider
    const providerData = availableProviders.map(providerId => {
      const provider = AI_PROVIDERS[providerId];
      return {
        ...provider,
        isAvailable: true,
        models: provider.models.map(model => ({
          ...model,
          isAvailable: true
        }))
      };
    });

    // Also include unavailable providers for UI display
    const unavailableProviders = Object.keys(AI_PROVIDERS).filter(provider => 
      !checkProviderAvailability(provider as AIProvider)
    ) as AIProvider[];

    const unavailableProviderData = unavailableProviders.map(providerId => {
      const provider = AI_PROVIDERS[providerId];
      return {
        ...provider,
        isAvailable: false,
        models: provider.models.map(model => ({
          ...model,
          isAvailable: false
        }))
      };
    });

    const allProviders = [...providerData, ...unavailableProviderData];

    // Get flat list of available models
    const availableModels = availableProviders.flatMap(provider => 
      AI_PROVIDERS[provider].models
    );

    const response = {
      providers: allProviders,
      availableModels,
      totalModels: Object.keys(AI_MODELS).length,
      availableCount: availableModels.length,
      defaultModel: availableModels[0]?.id || null
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Models API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}

// Health check endpoint for individual providers
export async function POST(request: NextRequest) {
  try {
    const { provider } = await request.json();
    
    if (!provider || !AI_PROVIDERS[provider as AIProvider]) {
      return NextResponse.json(
        { error: 'Invalid provider' },
        { status: 400 }
      );
    }

    const isAvailable = checkProviderAvailability(provider as AIProvider);
    
    return NextResponse.json({
      provider,
      isAvailable,
      models: AI_PROVIDERS[provider as AIProvider].models.map(model => ({
        ...model,
        isAvailable
      }))
    });

  } catch (error) {
    console.error('Provider check error:', error);
    return NextResponse.json(
      { error: 'Failed to check provider' },
      { status: 500 }
    );
  }
}