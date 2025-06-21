'use client';

import { useState, useRef, useEffect } from 'react';
import { usePromptEngineer } from '@/hooks/usePromptEngineer';
import { useModelSelection } from '@/hooks/useModelSelection';
import Typography from '@/components/ui/Typography';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ModelSelector from '@/components/ModelSelector';
import PromptComparison from '@/components/PromptComparison';
import PromptTemplates from '@/components/PromptTemplates';

interface PromptEngineerBotProps {
  className?: string;
}

export default function PromptEngineerBot({ className = '' }: PromptEngineerBotProps) {
  const [engineerState, engineerActions] = usePromptEngineer();
  const [modelState, modelActions] = useModelSelection();
  const [inputValue, setInputValue] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [engineerState.context.messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || engineerState.isLoading) return;

    const userInput = inputValue.trim();
    setInputValue('');

    // Determine what to do based on current phase
    switch (engineerState.context.phase) {
      case 'analysis':
        engineerActions.analyzeUserPrompt(userInput);
        break;
      case 'questioning':
        engineerActions.answerQuestion(userInput);
        break;
      case 'optimization':
        if (engineerState.selectedModel) {
          await engineerActions.optimizeWithAI(engineerState.selectedModel);
        } else {
          // Ask user to select a model
          addSystemMessage('Please select an AI model first to optimize your prompt.');
        }
        break;
      default:
        // Handle commands or start new analysis
        if (userInput.toLowerCase().includes('start over') || userInput.toLowerCase().includes('new prompt')) {
          engineerActions.startOver();
        } else {
          engineerActions.analyzeUserPrompt(userInput);
        }
    }
  };

  const addSystemMessage = (content: string) => {
    // This would typically be handled by the hook, but for system messages we'll handle it here
    console.log('System message:', content);
  };

  const handleTemplateSelect = (prompt: string, systemPrompt?: string) => {
    setInputValue(prompt);
    setShowTemplates(false);
    // Auto-submit the template
    setTimeout(() => {
      engineerActions.analyzeUserPrompt(prompt);
    }, 100);
  };

  const handleModelSelect = (modelId: string) => {
    engineerActions.setSelectedModel(modelId);
    modelActions.selectModel(modelId);
  };

  const handleOptimizeNow = async () => {
    if (engineerState.selectedModel && engineerState.context.phase === 'optimization') {
      await engineerActions.optimizeWithAI(engineerState.selectedModel);
    }
  };

  const formatMessageContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .split('\n')
      .map(line => line.trim())
      .join('<br />');
  };

  const getPhaseInfo = () => {
    switch (engineerState.context.phase) {
      case 'analysis':
        return { icon: '🔍', text: 'Ready to analyze', color: 'text-glow-primary' };
      case 'questioning':
        return { icon: '❓', text: 'Gathering context', color: 'text-glow-secondary' };
      case 'optimization':
        return { icon: '⚡', text: 'Ready to optimize', color: 'text-yellow-400' };
      case 'refinement':
        return { icon: '🔧', text: 'Refining prompt', color: 'text-blue-400' };
      case 'complete':
        return { icon: '✅', text: 'Optimization complete', color: 'text-green-400' };
      default:
        return { icon: '🤖', text: 'AI Assistant', color: 'text-glow-primary' };
    }
  };

  const phaseInfo = getPhaseInfo();

  return (
    <div className={`flex flex-col h-full max-h-[800px] ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-glow-primary/20 bg-glow-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🚀</span>
            <div>
              <Typography variant="body" color="primary" className="font-medium">
                AI Prompt Engineer
              </Typography>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${phaseInfo.color}`}>{phaseInfo.icon}</span>
                <Typography variant="caption" color="secondary">
                  {phaseInfo.text}
                </Typography>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className={`p-2 rounded transition-colors ${
                showTemplates 
                  ? 'bg-glow-secondary/20 text-glow-secondary' 
                  : 'hover:bg-glow-primary/20 text-secondary hover:text-glow-primary'
              }`}
              title="Templates"
            >
              📋
            </button>
            
            <button
              onClick={engineerActions.startOver}
              className="p-2 hover:bg-glow-primary/20 text-secondary hover:text-glow-primary rounded transition-colors"
              title="Start Over"
            >
              🔄
            </button>
          </div>
        </div>
        
        {/* Model Selector */}
        <div className="mt-4">
          <ModelSelector
            selectedModel={engineerState.selectedModel}
            onModelSelect={handleModelSelect}
          />
        </div>
      </div>

      {/* Templates Panel */}
      {showTemplates && (
        <div className="max-h-96 overflow-y-auto border-b border-glow-primary/20 bg-glow-primary/5">
          <PromptTemplates
            onTemplateSelect={handleTemplateSelect}
            className="p-4"
          />
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {engineerState.context.messages.map((message, index) => (
          <div key={index}>
            {message.analysis && (
              <ScrollReveal>
                <div className="glow-card p-4 mb-4 bg-blue-500/5 border-blue-500/20">
                  <Typography variant="body" color="primary" className="font-medium mb-2">
                    📊 Prompt Analysis Results
                  </Typography>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-glow-primary">
                        {message.analysis.score}/100
                      </div>
                      <Typography variant="caption" color="secondary">Quality Score</Typography>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-glow-secondary">
                        {message.analysis.category}
                      </div>
                      <Typography variant="caption" color="secondary">Category</Typography>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">
                        {message.analysis.complexity}
                      </div>
                      <Typography variant="caption" color="secondary">Complexity</Typography>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">
                        {message.analysis.tokenEstimate}
                      </div>
                      <Typography variant="caption" color="secondary">Tokens</Typography>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}
            
            <div 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-glow-primary/20 border border-glow-primary/40 text-glow-primary' 
                    : 'bg-glow-secondary/10 border border-glow-secondary/20 text-primary'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">{phaseInfo.icon}</span>
                    <Typography variant="caption" color="secondary" className="opacity-70">
                      AI Assistant
                    </Typography>
                  </div>
                )}
                
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                />
                
                <Typography variant="caption" color="secondary" className="opacity-50 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </div>
            </div>
          </div>
        ))}

        {/* Streaming Content */}
        {engineerState.isStreaming && engineerState.streamingContent && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[80%] p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="flex space-x-1 mr-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
                </div>
                <Typography variant="caption" color="primary" className="text-green-400">
                  AI Generating...
                </Typography>
              </div>
              <Typography variant="body" color="secondary" className="whitespace-pre-wrap font-mono">
                {engineerState.streamingContent}
                <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
              </Typography>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {engineerState.isLoading && !engineerState.isStreaming && (
          <div className="flex justify-start mb-4">
            <div className="bg-glow-secondary/10 border border-glow-secondary/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-glow-secondary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-glow-secondary rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-glow-secondary rounded-full animate-pulse delay-150"></div>
                </div>
                <Typography variant="caption" color="secondary">
                  {engineerState.context.phase === 'analysis' ? 'Analyzing prompt...' : 
                   engineerState.context.phase === 'optimization' ? 'Optimizing with AI...' : 
                   'Processing...'}
                </Typography>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {engineerState.error && (
          <div className="glow-card p-4 border-red-500/30">
            <div className="flex items-start space-x-3">
              <span className="text-red-400 text-xl">⚠️</span>
              <div className="flex-1">
                <Typography variant="body" color="primary" className="font-medium mb-1">
                  Error
                </Typography>
                <Typography variant="caption" color="secondary">
                  {engineerState.error}
                </Typography>
              </div>
              <button
                onClick={engineerActions.clearError}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Optimization Results */}
        {engineerState.optimizedResult && (
          <PromptComparison
            original={engineerState.context.currentPrompt}
            optimized={engineerState.optimizedResult}
            modelUsed={engineerState.selectedModel || undefined}
            onExport={engineerActions.exportOptimized}
            onCopy={engineerActions.copyToClipboard}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-background border-t border-glow-primary/20">
        {/* Quick Actions */}
        {engineerState.context.phase === 'optimization' && engineerState.selectedModel && (
          <div className="mb-3 flex justify-center">
            <button
              type="button"
              onClick={handleOptimizeNow}
              disabled={engineerState.isLoading}
              className="px-6 py-2 bg-glow-primary/20 border border-glow-primary/40 rounded-lg text-glow-primary hover:bg-glow-primary/30 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <span>⚡</span>
              <span>Optimize with AI</span>
            </button>
          </div>
        )}

        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                engineerState.context.phase === 'analysis' 
                  ? "Enter your prompt to analyze and optimize..."
                  : engineerState.context.phase === 'questioning'
                  ? "Answer the question above..."
                  : "Ask for refinements, export, or start a new prompt..."
              }
              className="w-full p-3 bg-glow-primary/10 border border-glow-primary/30 rounded-lg text-primary placeholder-secondary/50 resize-none focus:outline-none focus:border-glow-primary/50 focus:ring-2 focus:ring-glow-primary/20 min-h-[48px] max-h-[120px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={engineerState.isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || engineerState.isLoading}
            className="px-6 py-3 bg-glow-primary/20 border border-glow-primary/40 rounded-lg text-glow-primary hover:bg-glow-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>Send</span>
            <span className="text-lg">→</span>
          </button>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="mt-3 flex flex-wrap gap-2">
          {engineerState.context.phase === 'analysis' && (
            <>
              <button
                type="button"
                onClick={() => setInputValue("Write a professional email to a client about project delays")}
                className="px-3 py-1 text-xs bg-glow-secondary/10 border border-glow-secondary/20 rounded text-glow-secondary hover:bg-glow-secondary/20 transition-colors"
              >
                📧 Email Writing
              </button>
              <button
                type="button"
                onClick={() => setInputValue("Help me debug this JavaScript function that's not working properly")}
                className="px-3 py-1 text-xs bg-glow-secondary/10 border border-glow-secondary/20 rounded text-glow-secondary hover:bg-glow-secondary/20 transition-colors"
              >
                🐛 Code Review
              </button>
              <button
                type="button"
                onClick={() => setInputValue("Create a comprehensive marketing strategy for a new SaaS product")}
                className="px-3 py-1 text-xs bg-glow-secondary/10 border border-glow-secondary/20 rounded text-glow-secondary hover:bg-glow-secondary/20 transition-colors"
              >
                📈 Business Strategy
              </button>
            </>
          )}
          
          {engineerState.optimizedResult && (
            <>
              <button
                type="button"
                onClick={() => engineerActions.exportOptimized('markdown')}
                className="px-3 py-1 text-xs bg-green-500/10 border border-green-500/20 rounded text-green-400 hover:bg-green-500/20 transition-colors"
              >
                💾 Export
              </button>
              <button
                type="button"
                onClick={() => engineerActions.copyToClipboard(engineerState.optimizedResult?.content || '')}
                className="px-3 py-1 text-xs bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 hover:bg-blue-500/20 transition-colors"
              >
                📋 Copy
              </button>
            </>
          )}
          
          <button
            type="button"
            onClick={engineerActions.startOver}
            className="px-3 py-1 text-xs bg-glow-primary/10 border border-glow-primary/20 rounded text-glow-primary hover:bg-glow-primary/20 transition-colors"
          >
            🔄 Start Over
          </button>
        </div>
      </form>
    </div>
  );
}