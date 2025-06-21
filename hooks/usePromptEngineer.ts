'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  ConversationContext, 
  PromptAnalysis, 
  OptimizedPrompt,
  analyzePrompt,
  generateClarifyingQuestions,
  optimizePrompt,
  exportPrompt
} from '@/lib/prompt-analysis';
import { ChatMessage, ChatResponse, StreamChunk } from '@/lib/ai-providers';

export interface UsePromptEngineerState {
  // Conversation state
  context: ConversationContext;
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
  
  // Current analysis
  currentAnalysis: PromptAnalysis | null;
  optimizedResult: OptimizedPrompt | null;
  
  // UI state
  selectedModel: string | null;
  streamingContent: string;
  conversationHistory: ChatMessage[];
}

export interface UsePromptEngineerActions {
  // Core actions
  analyzeUserPrompt: (prompt: string) => void;
  answerQuestion: (answer: string) => void;
  optimizeWithAI: (model: string) => Promise<void>;
  regenerateOptimization: () => Promise<void>;
  
  // Template actions
  loadTemplate: (templateId: string, variables: Record<string, string>) => void;
  
  // Export actions
  exportOptimized: (format: 'markdown' | 'json' | 'text') => void;
  copyToClipboard: (content: string) => Promise<boolean>;
  
  // Navigation actions
  startOver: () => void;
  goToPhase: (phase: ConversationContext['phase']) => void;
  
  // Model management
  setSelectedModel: (model: string) => void;
  
  // Error handling
  clearError: () => void;
}

export function usePromptEngineer(): [UsePromptEngineerState, UsePromptEngineerActions] {
  const [state, setState] = useState<UsePromptEngineerState>({
    context: {
      messages: [
        {
          role: 'assistant',
          content: "Hello! I'm your AI Prompt Engineering Assistant. I'll help you analyze and optimize your prompts for better AI interactions.\n\nTo get started, please share a prompt you'd like me to analyze and improve.",
          timestamp: new Date()
        }
      ],
      currentPrompt: '',
      userResponses: {},
      phase: 'analysis',
      questionsAsked: [],
      improvementHistory: []
    },
    isLoading: false,
    isStreaming: false,
    error: null,
    currentAnalysis: null,
    optimizedResult: null,
    selectedModel: null,
    streamingContent: '',
    conversationHistory: []
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  // Add message to conversation
  const addMessage = useCallback((role: 'user' | 'assistant' | 'system', content: string, analysis?: PromptAnalysis) => {
    setState(prev => ({
      ...prev,
      context: {
        ...prev.context,
        messages: [
          ...prev.context.messages,
          {
            role,
            content,
            timestamp: new Date(),
            analysis
          }
        ]
      }
    }));
  }, []);

  // Analyze user prompt
  const analyzeUserPrompt = useCallback((prompt: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const analysis = analyzePrompt(prompt);
      const questions = generateClarifyingQuestions(analysis);
      
      // Add user message
      addMessage('user', prompt);
      
      // Add analysis results
      const analysisMessage = `I've analyzed your prompt! Here's what I found:

**Quality Score**: ${analysis.score}/100
**Category**: ${analysis.category.charAt(0).toUpperCase() + analysis.category.slice(1)}
**Complexity**: ${analysis.complexity.charAt(0).toUpperCase() + analysis.complexity.slice(1)}
**Token Estimate**: ${analysis.tokenEstimate}

**Strengths**:
${analysis.strengths.length > 0 ? analysis.strengths.map(s => `• ${s}`).join('\n') : '• None identified'}

**Issues Found**:
${analysis.issues.length > 0 ? analysis.issues.map(i => `• ${i.message}`).join('\n') : '• No major issues'}

**Improvement Potential**: ${analysis.improvementPotential}%`;

      addMessage('assistant', analysisMessage, analysis);
      
      // Ask clarifying questions if needed
      if (questions.length > 0) {
        const questionMessage = `To optimize your prompt, I need some additional information:\n\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n')}\n\nPlease answer these questions one by one, and I'll create an optimized version for you.`;
        addMessage('assistant', questionMessage);
        
        setState(prev => ({
          ...prev,
          context: {
            ...prev.context,
            currentPrompt: prompt,
            phase: 'questioning',
            questionsAsked: questions
          },
          currentAnalysis: analysis,
          isLoading: false
        }));
      } else {
        // Skip to optimization if no questions needed
        setState(prev => ({
          ...prev,
          context: {
            ...prev.context,
            currentPrompt: prompt,
            phase: 'optimization'
          },
          currentAnalysis: analysis,
          isLoading: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to analyze prompt',
        isLoading: false
      }));
    }
  }, [addMessage]);

  // Answer clarifying question
  const answerQuestion = useCallback((answer: string) => {
    setState(prev => {
      const questionIndex = Object.keys(prev.context.userResponses).length;
      const questionKey = `question_${questionIndex}`;
      
      addMessage('user', answer);
      
      const updatedResponses = {
        ...prev.context.userResponses,
        [questionKey]: answer
      };
      
      const remainingQuestions = prev.context.questionsAsked.length - Object.keys(updatedResponses).length;
      
      if (remainingQuestions > 0) {
        addMessage('assistant', `Thank you! ${remainingQuestions} more question${remainingQuestions > 1 ? 's' : ''} to go.`);
        
        return {
          ...prev,
          context: {
            ...prev.context,
            userResponses: updatedResponses
          }
        };
      } else {
        addMessage('assistant', 'Perfect! I have all the information I need. Now I can optimize your prompt.');
        
        return {
          ...prev,
          context: {
            ...prev.context,
            userResponses: updatedResponses,
            phase: 'optimization'
          }
        };
      }
    });
  }, [addMessage]);

  // Optimize with AI
  const optimizeWithAI = useCallback(async (model: string) => {
    if (!state.currentAnalysis || !state.context.currentPrompt) {
      setState(prev => ({ ...prev, error: 'No prompt to optimize' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, isStreaming: true, error: null, streamingContent: '' }));
    
    try {
      // Cancel any existing request
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      addMessage('assistant', `🚀 Optimizing your prompt using ${model}...`);

      // Prepare the optimization request
      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: `You are an expert prompt engineer. Optimize the user's prompt based on the analysis and their responses. Return a JSON object with: optimizedPrompt, systemPrompt, explanation, improvements, and score.`
        },
        {
          role: 'user',
          content: `Original prompt: "${state.context.currentPrompt}"
          
Analysis: ${JSON.stringify(state.currentAnalysis, null, 2)}

User responses: ${JSON.stringify(state.context.userResponses, null, 2)}

Please optimize this prompt for better AI interactions.`
        }
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          model,
          stream: true,
          temperature: 0.7,
          maxTokens: 2000
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullContent += parsed.content;
                setState(prev => ({ ...prev, streamingContent: fullContent }));
              }
              if (parsed.isComplete) break;
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      // Parse the optimization result
      let optimizationResult;
      try {
        const jsonMatch = fullContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          optimizationResult = JSON.parse(jsonMatch[0]);
        } else {
          optimizationResult = {
            optimizedPrompt: fullContent,
            explanation: 'AI-generated optimization',
            improvements: ['Enhanced by AI'],
            score: Math.min(100, state.currentAnalysis.score + 25)
          };
        }
      } catch (parseError) {
        optimizationResult = {
          optimizedPrompt: fullContent,
          explanation: 'AI-generated optimization',
          improvements: ['Enhanced by AI'],
          score: Math.min(100, state.currentAnalysis.score + 25)
        };
      }

      const optimized: OptimizedPrompt = {
        content: optimizationResult.optimizedPrompt,
        systemPrompt: optimizationResult.systemPrompt,
        explanation: optimizationResult.explanation,
        improvements: optimizationResult.improvements || [],
        structure: {
          task: optimizationResult.optimizedPrompt
        },
        metadata: {
          originalScore: state.currentAnalysis.score,
          optimizedScore: optimizationResult.score || 85,
          tokenCount: Math.ceil(optimizationResult.optimizedPrompt.split(/\s+/).length * 1.33),
          estimatedCost: 0.02, // Placeholder
          timeToOptimize: Date.now()
        }
      };

      addMessage('assistant', '✅ Optimization complete! Here\'s your improved prompt:');

      setState(prev => ({
        ...prev,
        optimizedResult: optimized,
        context: {
          ...prev.context,
          phase: 'complete'
        },
        isLoading: false,
        isStreaming: false,
        streamingContent: '',
        selectedModel: model
      }));

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return; // Request was cancelled
      }
      
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to optimize prompt',
        isLoading: false,
        isStreaming: false,
        streamingContent: ''
      }));
    }
  }, [state.currentAnalysis, state.context.currentPrompt, state.context.userResponses, addMessage]);

  // Regenerate optimization
  const regenerateOptimization = useCallback(async () => {
    if (state.selectedModel) {
      await optimizeWithAI(state.selectedModel);
    }
  }, [optimizeWithAI, state.selectedModel]);

  // Load template
  const loadTemplate = useCallback((templateId: string, variables: Record<string, string>) => {
    // This would integrate with the template system
    addMessage('assistant', `Loading template: ${templateId}`);
    setState(prev => ({
      ...prev,
      context: {
        ...prev.context,
        phase: 'analysis'
      }
    }));
  }, [addMessage]);

  // Export optimized prompt
  const exportOptimized = useCallback((format: 'markdown' | 'json' | 'text') => {
    if (!state.optimizedResult) return;
    
    const exported = exportPrompt(state.optimizedResult, format);
    const blob = new Blob([exported], { 
      type: format === 'json' ? 'application/json' : 'text/plain' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized-prompt.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addMessage('assistant', `✅ Prompt exported as ${format.toUpperCase()} file!`);
  }, [state.optimizedResult, addMessage]);

  // Copy to clipboard
  const copyToClipboard = useCallback(async (content: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(content);
      addMessage('assistant', '✅ Copied to clipboard!');
      return true;
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to copy to clipboard' }));
      return false;
    }
  }, [addMessage]);

  // Start over
  const startOver = useCallback(() => {
    setState({
      context: {
        messages: [
          {
            role: 'assistant',
            content: "Let's start fresh! Share a new prompt you'd like me to analyze and optimize.",
            timestamp: new Date()
          }
        ],
        currentPrompt: '',
        userResponses: {},
        phase: 'analysis',
        questionsAsked: [],
        improvementHistory: []
      },
      isLoading: false,
      isStreaming: false,
      error: null,
      currentAnalysis: null,
      optimizedResult: null,
      selectedModel: null,
      streamingContent: '',
      conversationHistory: []
    });
  }, []);

  // Go to specific phase
  const goToPhase = useCallback((phase: ConversationContext['phase']) => {
    setState(prev => ({
      ...prev,
      context: {
        ...prev.context,
        phase
      }
    }));
  }, []);

  // Set selected model
  const setSelectedModel = useCallback((model: string) => {
    setState(prev => ({ ...prev, selectedModel: model }));
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return [
    state,
    {
      analyzeUserPrompt,
      answerQuestion,
      optimizeWithAI,
      regenerateOptimization,
      loadTemplate,
      exportOptimized,
      copyToClipboard,
      startOver,
      goToPhase,
      setSelectedModel,
      clearError
    }
  ];
}