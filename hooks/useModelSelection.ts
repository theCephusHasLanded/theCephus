'use client';

import { useState, useEffect, useCallback } from 'react';
import { AIModel, AIProvider, AIProviderConfig } from '@/lib/ai-providers';

export interface AvailableModelsData {
  providers: AIProviderConfig[];
  availableModels: AIModel[];
  totalModels: number;
  availableCount: number;
  defaultModel: string | null;
}

export interface UseModelSelectionState {
  // Models data
  modelsData: AvailableModelsData | null;
  isLoading: boolean;
  error: string | null;
  
  // Selection state
  selectedModel: string | null;
  selectedProvider: AIProvider | null;
  
  // UI state
  isModalOpen: boolean;
  searchQuery: string;
  selectedCategory: string | null;
  sortBy: 'name' | 'cost' | 'context' | 'provider';
  filterByAvailable: boolean;
}

export interface UseModelSelectionActions {
  // Data actions
  fetchModels: () => Promise<void>;
  refreshModels: () => Promise<void>;
  
  // Selection actions
  selectModel: (modelId: string) => void;
  selectProvider: (provider: AIProvider) => void;
  clearSelection: () => void;
  
  // UI actions
  openModal: () => void;
  closeModal: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSortBy: (sortBy: UseModelSelectionState['sortBy']) => void;
  toggleFilterByAvailable: () => void;
  
  // Utility actions
  getModelById: (modelId: string) => AIModel | undefined;
  getProviderById: (providerId: AIProvider) => AIProviderConfig | undefined;
  getAvailableModels: () => AIModel[];
  getModelsByProvider: (provider: AIProvider) => AIModel[];
  estimateModelCost: (modelId: string, tokens: number) => number;
  
  // Error handling
  clearError: () => void;
  
  // Additional utility functions
  getUniqueCapabilities: () => string[];
  getProviderStats: () => Record<string, number>;
}

export function useModelSelection(): [UseModelSelectionState, UseModelSelectionActions] {
  const [state, setState] = useState<UseModelSelectionState>({
    modelsData: null,
    isLoading: false,
    error: null,
    selectedModel: null,
    selectedProvider: null,
    isModalOpen: false,
    searchQuery: '',
    selectedCategory: null,
    sortBy: 'name',
    filterByAvailable: true
  });

  // Fetch available models from API
  const fetchModels = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetch('/api/models');
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
      }
      
      const data: AvailableModelsData = await response.json();
      
      setState(prev => ({
        ...prev,
        modelsData: data,
        selectedModel: prev.selectedModel || data.defaultModel,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch models',
        isLoading: false
      }));
    }
  }, []);

  // Refresh models data
  const refreshModels = useCallback(async () => {
    await fetchModels();
  }, [fetchModels]);

  // Select model
  const selectModel = useCallback((modelId: string) => {
    setState(prev => {
      const model = prev.modelsData?.availableModels.find(m => m.id === modelId);
      return {
        ...prev,
        selectedModel: modelId,
        selectedProvider: model?.provider || null
      };
    });
  }, []);

  // Select provider
  const selectProvider = useCallback((provider: AIProvider) => {
    setState(prev => ({
      ...prev,
      selectedProvider: provider,
      selectedModel: null // Clear model selection when provider changes
    }));
  }, []);

  // Clear selection
  const clearSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedModel: null,
      selectedProvider: null
    }));
  }, []);

  // Open modal
  const openModal = useCallback(() => {
    setState(prev => ({ ...prev, isModalOpen: true }));
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setState(prev => ({ ...prev, isModalOpen: false }));
  }, []);

  // Set search query
  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  }, []);

  // Set selected category
  const setSelectedCategory = useCallback((category: string | null) => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  }, []);

  // Set sort by
  const setSortBy = useCallback((sortBy: UseModelSelectionState['sortBy']) => {
    setState(prev => ({ ...prev, sortBy }));
  }, []);

  // Toggle filter by available
  const toggleFilterByAvailable = useCallback(() => {
    setState(prev => ({ ...prev, filterByAvailable: !prev.filterByAvailable }));
  }, []);

  // Get model by ID
  const getModelById = useCallback((modelId: string): AIModel | undefined => {
    return state.modelsData?.availableModels.find(model => model.id === modelId);
  }, [state.modelsData]);

  // Get provider by ID
  const getProviderById = useCallback((providerId: AIProvider): AIProviderConfig | undefined => {
    return state.modelsData?.providers.find(provider => provider.id === providerId);
  }, [state.modelsData]);

  // Get available models
  const getAvailableModels = useCallback((): AIModel[] => {
    if (!state.modelsData) return [];
    
    let models = state.modelsData.availableModels;
    
    // Filter by availability
    if (state.filterByAvailable) {
      models = models.filter(model => {
        const provider = state.modelsData!.providers.find(p => p.id === model.provider);
        return provider?.isAvailable;
      });
    }
    
    // Filter by search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      models = models.filter(model => 
        model.name.toLowerCase().includes(query) ||
        model.description.toLowerCase().includes(query) ||
        model.capabilities.some(cap => cap.toLowerCase().includes(query))
      );
    }
    
    // Filter by category (capabilities)
    if (state.selectedCategory) {
      models = models.filter(model => 
        model.capabilities.includes(state.selectedCategory!)
      );
    }
    
    // Sort models
    models.sort((a, b) => {
      switch (state.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'cost':
          return a.costPer1kTokens - b.costPer1kTokens;
        case 'context':
          return b.contextWindow - a.contextWindow;
        case 'provider':
          return a.provider.localeCompare(b.provider);
        default:
          return 0;
      }
    });
    
    return models;
  }, [state.modelsData, state.filterByAvailable, state.searchQuery, state.selectedCategory, state.sortBy]);

  // Get models by provider
  const getModelsByProvider = useCallback((provider: AIProvider): AIModel[] => {
    if (!state.modelsData) return [];
    return state.modelsData.availableModels.filter(model => model.provider === provider);
  }, [state.modelsData]);

  // Estimate model cost
  const estimateModelCost = useCallback((modelId: string, tokens: number): number => {
    const model = getModelById(modelId);
    if (!model) return 0;
    return (tokens / 1000) * model.costPer1kTokens;
  }, [getModelById]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Fetch models on mount
  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  // Get unique capabilities for filtering
  const getUniqueCapabilities = useCallback((): string[] => {
    if (!state.modelsData) return [];
    
    const capabilities = new Set<string>();
    state.modelsData.availableModels.forEach(model => {
      model.capabilities.forEach(cap => capabilities.add(cap));
    });
    
    return Array.from(capabilities).sort();
  }, [state.modelsData]);

  // Get provider statistics
  const getProviderStats = useCallback(() => {
    if (!state.modelsData) return {};
    
    const stats: Record<AIProvider, { total: number; available: number; avgCost: number }> = {} as any;
    
    state.modelsData.providers.forEach(provider => {
      const models = getModelsByProvider(provider.id);
      const availableModels = models.filter(() => provider.isAvailable);
      const avgCost = models.length > 0 ? 
        models.reduce((sum, model) => sum + model.costPer1kTokens, 0) / models.length : 0;
      
      stats[provider.id] = {
        total: models.length,
        available: availableModels.length,
        avgCost
      };
    });
    
    return stats;
  }, [state.modelsData, getModelsByProvider]);

  return [
    state,
    {
      fetchModels,
      refreshModels,
      selectModel,
      selectProvider,
      clearSelection,
      openModal,
      closeModal,
      setSearchQuery,
      setSelectedCategory,
      setSortBy,
      toggleFilterByAvailable,
      getModelById,
      getProviderById,
      getAvailableModels,
      getModelsByProvider,
      estimateModelCost,
      clearError,
      // Additional utility functions
      getUniqueCapabilities,
      getProviderStats
    }
  ];
}