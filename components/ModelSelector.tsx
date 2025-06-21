'use client';

import { useState, useRef, useEffect } from 'react';
import { useModelSelection } from '@/hooks/useModelSelection';
import { AIModel, AIProvider, formatCost } from '@/lib/ai-providers';
import Typography from '@/components/ui/Typography';

interface ModelSelectorProps {
  selectedModel: string | null;
  onModelSelect: (modelId: string) => void;
  className?: string;
}

export default function ModelSelector({ selectedModel, onModelSelect, className = '' }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [modelState, modelActions] = useModelSelection();
  const { modelsData, isLoading, error } = modelState;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get selected model info
  const getSelectedModelInfo = () => {
    if (!selectedModel || !modelsData) return null;
    return modelsData.availableModels.find(m => m.id === selectedModel);
  };

  // Filter models based on search
  const getFilteredModels = () => {
    if (!modelsData) return [];
    
    let models = modelsData.availableModels;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      models = models.filter(model => 
        model.name.toLowerCase().includes(query) ||
        model.provider.toLowerCase().includes(query) ||
        model.description.toLowerCase().includes(query)
      );
    }
    
    return models;
  };

  // Group models by provider
  const getGroupedModels = () => {
    const filtered = getFilteredModels();
    const grouped: Record<AIProvider, AIModel[]> = {} as any;
    
    filtered.forEach(model => {
      if (!grouped[model.provider]) {
        grouped[model.provider] = [];
      }
      grouped[model.provider].push(model);
    });
    
    return grouped;
  };

  // Get provider info
  const getProviderInfo = (providerId: AIProvider) => {
    return modelsData?.providers.find(p => p.id === providerId);
  };

  const selectedModelInfo = getSelectedModelInfo();
  const groupedModels = getGroupedModels();

  if (isLoading) {
    return (
      <div className={`glow-card p-4 ${className}`}>
        <div className="animate-pulse flex items-center space-x-3">
          <div className="w-8 h-8 bg-glow-primary/20 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-glow-primary/20 rounded mb-2"></div>
            <div className="h-3 bg-glow-secondary/20 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`glow-card p-4 border-red-500/30 ${className}`}>
        <div className="flex items-center space-x-3">
          <span className="text-red-400 text-xl">⚠️</span>
          <div>
            <Typography variant="body" color="primary">Failed to load models</Typography>
            <Typography variant="caption" color="secondary">{error}</Typography>
          </div>
          <button
            onClick={modelActions.refreshModels}
            className="ml-auto px-3 py-1 bg-red-500/20 border border-red-500/40 rounded text-red-400 hover:bg-red-500/30 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Model Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glow-card p-4 flex items-center justify-between hover:shadow-glow-lg transition-all duration-300"
      >
        <div className="flex items-center space-x-3">
          {selectedModelInfo ? (
            <>
              <span className="text-2xl">
                {getProviderInfo(selectedModelInfo.provider)?.icon || '🤖'}
              </span>
              <div className="text-left">
                <Typography variant="body" color="primary" className="font-medium">
                  {selectedModelInfo.name}
                </Typography>
                <Typography variant="caption" color="secondary">
                  {selectedModelInfo.provider} • {formatCost(selectedModelInfo.costPer1kTokens)}/1K tokens
                </Typography>
              </div>
            </>
          ) : (
            <>
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <Typography variant="body" color="primary">Select AI Model</Typography>
                <Typography variant="caption" color="secondary">Choose your preferred AI provider</Typography>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {selectedModelInfo && (
            <span className={`px-2 py-1 rounded text-xs ${
              getProviderInfo(selectedModelInfo.provider)?.isAvailable
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}>
              {getProviderInfo(selectedModelInfo.provider)?.isAvailable ? 'Available' : 'Unavailable'}
            </span>
          )}
          <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-glow-primary/20 rounded-lg shadow-glow-lg z-50 max-h-96 overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-glow-primary/20">
            <input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 bg-glow-primary/10 border border-glow-primary/30 rounded text-primary placeholder-secondary/50 focus:outline-none focus:border-glow-primary/50"
            />
          </div>

          {/* Models List */}
          <div className="overflow-y-auto max-h-80">
            {Object.entries(groupedModels).map(([providerId, models]) => {
              const provider = getProviderInfo(providerId as AIProvider);
              if (!provider) return null;

              return (
                <div key={providerId} className="border-b border-glow-primary/10 last:border-b-0">
                  {/* Provider Header */}
                  <div className="p-3 bg-glow-primary/5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{provider.icon}</span>
                      <Typography variant="body" color="primary" className="font-medium">
                        {provider.name}
                      </Typography>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        provider.isAvailable 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {provider.isAvailable ? 'Available' : 'API Key Required'}
                      </span>
                      <Typography variant="caption" color="secondary">
                        {models.length} model{models.length !== 1 ? 's' : ''}
                      </Typography>
                    </div>
                  </div>

                  {/* Provider Models */}
                  <div className="divide-y divide-glow-primary/10">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          onModelSelect(model.id);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                        disabled={!provider.isAvailable}
                        className={`w-full p-4 text-left hover:bg-glow-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          selectedModel === model.id ? 'bg-glow-primary/20' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Typography variant="body" color="primary" className="font-medium">
                            {model.name}
                          </Typography>
                          <div className="flex items-center space-x-2">
                            <Typography variant="caption" color="secondary">
                              {formatCost(model.costPer1kTokens)}/1K
                            </Typography>
                            {selectedModel === model.id && (
                              <span className="text-glow-primary">✓</span>
                            )}
                          </div>
                        </div>
                        
                        <Typography variant="caption" color="secondary" className="mb-2 block">
                          {model.description}
                        </Typography>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {model.capabilities.slice(0, 3).map((capability) => (
                              <span
                                key={capability}
                                className="px-2 py-1 bg-glow-secondary/20 text-glow-secondary rounded text-xs"
                              >
                                {capability}
                              </span>
                            ))}
                            {model.capabilities.length > 3 && (
                              <span className="px-2 py-1 bg-glow-secondary/10 text-secondary rounded text-xs">
                                +{model.capabilities.length - 3}
                              </span>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <Typography variant="caption" color="secondary">
                              {(model.contextWindow / 1000).toFixed(0)}K context
                            </Typography>
                            {model.supportsStreaming && (
                              <div className="text-xs text-glow-secondary">⚡ Streaming</div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-3 bg-glow-primary/5 border-t border-glow-primary/20">
            <Typography variant="caption" color="secondary" className="text-center">
              {modelsData?.availableCount || 0} of {modelsData?.totalModels || 0} models available
              {modelsData && modelsData.availableCount < modelsData.totalModels && (
                <span className="ml-2 text-glow-secondary">• Configure API keys for more models</span>
              )}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
}