'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  ConversationTurn, 
  PromptAnalysis, 
  OptimizedPrompt,
  analyzePrompt,
  generateClarifyingQuestions,
  optimizePrompt,
  exportPrompt,
  suggestTokenOptimizations,
  PromptCategory
} from '@/lib/prompt-engineering';
import { 
  AIModel, 
  AI_MODELS, 
  getAvailableModels, 
  generateOptimizedPrompt,
  generateOptimizedPromptStream,
  PromptGenerationRequest,
  getModelInstructions,
  estimateModelCost
} from '@/lib/ai-models';
import { 
  parseConversation, 
  generateConversationCopy, 
  createOptimizedRequestFromConversation 
} from '@/lib/conversation-parser';
import Typography from '@/components/ui/Typography';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PromptEngineerBotProps {
  className?: string;
}

interface ConversationState {
  turns: ConversationTurn[];
  currentAnalysis: PromptAnalysis | null;
  userResponses: Record<string, string>;
  originalPrompt: string;
  optimizedPrompt: OptimizedPrompt | null;
  isAwaitingResponse: boolean;
  currentQuestionIndex: number;
  selectedModel: AIModel;
  isGenerating: boolean;
  streamingContent: string;
}

export default function PromptEngineerBot({ className = '' }: PromptEngineerBotProps) {
  const [conversation, setConversation] = useState<ConversationState>({
    turns: [
      {
        id: 'welcome',
        type: 'bot',
        content: "👋 Hello! I'm your AI Prompt Engineering Assistant. I'll help you transform your rough ideas into professional, optimized prompts using real AI models.\n\nFirst, please select which AI model you'd like to use for optimization, then share your initial prompt or describe what you'd like to accomplish.",
        timestamp: new Date()
      }
    ],
    currentAnalysis: null,
    userResponses: {},
    originalPrompt: '',
    optimizedPrompt: null,
    isAwaitingResponse: false,
    currentQuestionIndex: 0,
    selectedModel: 'claude',
    isGenerating: false,
    streamingContent: ''
  });

  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.turns]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const addMessage = (content: string, type: 'user' | 'bot' | 'system', metadata?: any) => {
    const newTurn: ConversationTurn = {
      id: `${type}_${Date.now()}`,
      type,
      content,
      timestamp: new Date(),
      metadata
    };

    setConversation(prev => ({
      ...prev,
      turns: [...prev.turns, newTurn]
    }));
  };

  const handleInitialPrompt = async (prompt: string) => {
    setIsProcessing(true);
    
    // Analyze the prompt
    const analysis = analyzePrompt(prompt);
    
    // Add analysis results
    addMessage(
      `Great! I've analyzed your prompt. Here's what I found:\n\n` +
      `**Category**: ${analysis.category.charAt(0).toUpperCase() + analysis.category.slice(1)}\n` +
      `**Complexity**: ${analysis.complexity.charAt(0).toUpperCase() + analysis.complexity.slice(1)}\n` +
      `**Estimated tokens**: ${analysis.tokenEstimate}\n\n` +
      `**Strengths**: ${analysis.strengths.length > 0 ? analysis.strengths.join(', ') : 'None identified'}\n\n` +
      `**Areas for improvement**: ${analysis.missingElements.length > 0 ? analysis.missingElements.join(', ') : 'None needed'}\n\n` +
      (analysis.missingElements.length > 0 
        ? "I'll ask you some questions to help optimize your prompt. Let's start:" 
        : "Your prompt looks good! Let me generate an optimized version for you."),
      'bot',
      { promptAnalysis: analysis }
    );

    // Generate clarifying questions if needed
    if (analysis.missingElements.length > 0) {
      const questions = generateClarifyingQuestions(analysis, prompt);
      
      if (questions.length > 0) {
        // Add first question
        setTimeout(() => {
          addMessage(questions[0].content, 'bot', questions[0].metadata);
        }, 1000);
      }
    } else {
      // Generate optimized prompt immediately
      setTimeout(() => {
        generateOptimizedResult(prompt, analysis, {});
      }, 1000);
    }

    setConversation(prev => ({
      ...prev,
      currentAnalysis: analysis,
      originalPrompt: prompt,
      isAwaitingResponse: analysis.missingElements.length > 0,
      currentQuestionIndex: 0
    }));

    setIsProcessing(false);
  };

  const handleQuestionResponse = async (response: string) => {
    const { currentAnalysis, currentQuestionIndex, userResponses, originalPrompt } = conversation;
    
    if (!currentAnalysis) return;

    const missingElement = currentAnalysis.missingElements[currentQuestionIndex];
    const updatedResponses = { ...userResponses, [missingElement]: response };

    setConversation(prev => ({
      ...prev,
      userResponses: updatedResponses
    }));

    // Check if we have more questions
    if (currentQuestionIndex < currentAnalysis.missingElements.length - 1) {
      // Ask next question
      const questions = generateClarifyingQuestions(currentAnalysis, originalPrompt);
      const nextQuestion = questions[currentQuestionIndex + 1];
      
      if (nextQuestion) {
        setTimeout(() => {
          addMessage(nextQuestion.content, 'bot', nextQuestion.metadata);
        }, 500);
      }

      setConversation(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      // Generate optimized prompt
      setTimeout(() => {
        generateOptimizedResult(originalPrompt, currentAnalysis, updatedResponses);
      }, 1000);

      setConversation(prev => ({
        ...prev,
        isAwaitingResponse: false
      }));
    }
  };

  const generateOptimizedResult = async (original: string, analysis: PromptAnalysis, userResponses: Record<string, string>) => {
    const { selectedModel } = conversation;
    
    setConversation(prev => ({ ...prev, isGenerating: true, streamingContent: '' }));
    
    addMessage(
      `🚀 Generating optimized prompt using **${AI_MODELS[selectedModel].name}**...\n\nThis may take a few moments while the AI analyzes and improves your prompt.`,
      'bot'
    );

    try {
      // Use conversation parser to create proper request
      const parsedRequest = createOptimizedRequestFromConversation(conversation.turns);
      const request: PromptGenerationRequest = {
        ...parsedRequest,
        originalPrompt: original || parsedRequest.originalPrompt,
        userResponses: Object.keys(userResponses).length > 0 ? userResponses : parsedRequest.userResponses,
        model: selectedModel,
        analysis: analysis || parsedRequest.analysis
      };

      // Use streaming for real-time experience
      const stream = generateOptimizedPromptStream(request);
      let streamedContent = '';
      let isFirstChunk = true;

      addMessage('', 'system', { type: 'streaming_start' });

      for await (const chunk of stream) {
        streamedContent += chunk;
        
        if (isFirstChunk) {
          addMessage(
            "✨ **AI is generating your optimized prompt:**\n\n",
            'bot'
          );
          isFirstChunk = false;
        }

        setConversation(prev => ({ ...prev, streamingContent: streamedContent }));
      }

      // Parse the final result
      let optimizedResult;
      try {
        // Try to extract JSON from the streamed content
        const jsonMatch = streamedContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          optimizedResult = JSON.parse(jsonMatch[0]);
        } else {
          // Fallback: treat the entire content as the optimized prompt
          optimizedResult = {
            optimizedPrompt: streamedContent,
            explanation: "AI-generated optimization",
            improvements: ["Enhanced by AI model"],
            reasoning: "The prompt has been optimized using advanced AI analysis"
          };
        }
      } catch (parseError) {
        optimizedResult = {
          optimizedPrompt: streamedContent,
          explanation: "AI-generated optimization",
          improvements: ["Enhanced by AI model"],
          reasoning: "The prompt has been optimized using advanced AI analysis"
        };
      }

      const tokenCount = Math.ceil(optimizedResult.optimizedPrompt.split(/\s+/).length * 1.3);
      const optimized: OptimizedPrompt = {
        content: optimizedResult.optimizedPrompt,
        explanation: optimizedResult.explanation,
        improvements: optimizedResult.improvements,
        tokenCount,
        structure: {
          task: optimizedResult.optimizedPrompt
        }
      };

      // Show comparison
      setTimeout(() => {
        addMessage('', 'system', {
          type: 'comparison',
          original,
          optimized
        });
      }, 500);

      setTimeout(() => {
        const originalTokens = Math.ceil(original.split(/\s+/).length * 1.3);
        const costEstimate = estimateModelCost(selectedModel, tokenCount);
        
        addMessage(
          `**Optimization complete!** ✨\n\n` +
          `**Model used**: ${AI_MODELS[selectedModel].name} ${AI_MODELS[selectedModel].icon}\n` +
          `**Token count**: ${tokenCount} (was ${originalTokens})\n` +
          `**Estimated cost**: ${costEstimate}\n\n` +
          `**Key improvements**:\n${optimized.improvements.map(imp => `• ${imp}`).join('\n')}\n\n` +
          `**Explanation**: ${optimized.explanation}\n\n` +
          `Would you like to:\n• **Refine further** - Make additional adjustments\n• **Export** - Save your optimized prompt\n• **Try different model** - Generate with another AI\n• **Start over** - Work on a new prompt`,
          'bot'
        );
      }, 1500);

      setConversation(prev => ({
        ...prev,
        optimizedPrompt: optimized,
        isGenerating: false,
        streamingContent: ''
      }));

    } catch (error) {
      console.error('Error generating optimized prompt:', error);
      
      addMessage(
        `❌ **Error generating optimized prompt**\n\n` +
        `There was an issue with the ${AI_MODELS[selectedModel].name} API: ${error instanceof Error ? error.message : 'Unknown error'}\n\n` +
        `You can:\n• **Try a different model** - Switch to another AI\n• **Try again** - Retry with the same model\n• **Use fallback** - Get a rule-based optimization`,
        'bot'
      );

      setConversation(prev => ({ ...prev, isGenerating: false, streamingContent: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const userInput = inputValue.trim();
    setInputValue('');
    
    // Add user message
    addMessage(userInput, 'user');

    // Determine how to handle the input
    if (!conversation.originalPrompt) {
      // Check if this is a model selection
      if (handleModelSelection(userInput)) {
        return; // Model selection handled
      }
      // This is the initial prompt
      await handleInitialPrompt(userInput);
    } else if (conversation.isAwaitingResponse) {
      // This is an answer to a clarifying question
      await handleQuestionResponse(userInput);
    } else {
      // Check if this is a model selection
      if (handleModelSelection(userInput)) {
        return; // Model selection handled
      }
      // Handle commands or new requests
      await handleCommand(userInput);
    }
  };

  const copyConversation = async () => {
    try {
      const conversationText = generateConversationCopy(conversation.turns);
      await navigator.clipboard.writeText(conversationText);
      addMessage("📋 **Conversation copied to clipboard!**", 'bot');
    } catch (error) {
      console.error('Failed to copy conversation:', error);
      addMessage("❌ **Failed to copy conversation**\n\nPlease try again or copy manually from the chat.", 'bot');
    }
  };

  const handleCommand = async (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('export') || lowerCommand.includes('save')) {
      if (conversation.optimizedPrompt) {
        handleExport();
      } else {
        addMessage("I don't have an optimized prompt to export yet. Please complete the optimization process first.", 'bot');
      }
    } else if (lowerCommand.includes('start over') || lowerCommand.includes('new prompt')) {
      handleReset();
    } else if (lowerCommand.includes('refine') || lowerCommand.includes('improve')) {
      addMessage("What would you like to refine? You can ask me to:\n• Adjust the tone or style\n• Change the output format\n• Add or remove constraints\n• Modify the role or context", 'bot');
    } else if (lowerCommand.includes('different model') || lowerCommand.includes('try another') || lowerCommand.includes('switch model')) {
      showModelSelection();
    } else if (lowerCommand.includes('try again') || lowerCommand.includes('retry')) {
      if (conversation.originalPrompt && conversation.currentAnalysis) {
        await generateOptimizedResult(conversation.originalPrompt, conversation.currentAnalysis, conversation.userResponses);
      } else {
        addMessage("Please provide a prompt first so I can retry the optimization.", 'bot');
      }
    } else if (lowerCommand.includes('fallback') || lowerCommand.includes('rule-based')) {
      if (conversation.originalPrompt && conversation.currentAnalysis) {
        const fallbackOptimized = optimizePrompt(conversation.originalPrompt, conversation.currentAnalysis, conversation.userResponses);
        showFallbackResult(conversation.originalPrompt, fallbackOptimized);
      } else {
        addMessage("Please provide a prompt first so I can create a fallback optimization.", 'bot');
      }
    } else if (lowerCommand.includes('copy')) {
      await copyConversation();
    } else {
      // Treat as a new prompt
      await handleInitialPrompt(command);
    }
  };

  const showModelSelection = () => {
    const models = getAvailableModels();
    const modelOptions = models.map(model => 
      `**${model.icon} ${model.name}**\n${model.description}\n*${model.pricing}* - ${model.strengths.join(', ')}`
    ).join('\n\n');

    addMessage(
      `🤖 **Choose your AI model:**\n\n${modelOptions}\n\nType the model name (openai, gemini, or claude) to select it.`,
      'bot'
    );
  };

  const handleModelSelection = (modelName: string) => {
    const model = modelName.toLowerCase() as AIModel;
    if (AI_MODELS[model]) {
      setConversation(prev => ({ ...prev, selectedModel: model }));
      addMessage(
        `✅ **Selected ${AI_MODELS[model].name}** ${AI_MODELS[model].icon}\n\n${getModelInstructions(model)}\n\nNow, please share your prompt or request for optimization.`,
        'bot'
      );
      return true;
    }
    return false;
  };

  const showFallbackResult = (original: string, optimized: OptimizedPrompt) => {
    addMessage(
      "🔧 **Using rule-based optimization** (no AI model required):\n\nHere's your optimized prompt using built-in prompt engineering rules:",
      'bot'
    );

    setTimeout(() => {
      addMessage('', 'system', {
        type: 'comparison',
        original,
        optimized
      });
    }, 500);

    setTimeout(() => {
      addMessage(
        `**Rule-based optimization complete!** 🛠️\n\n` +
        `**Token count**: ${optimized.tokenCount}\n` +
        `**Improvements**: ${optimized.improvements.join(', ')}\n\n` +
        `This optimization was created using built-in prompt engineering rules. For more advanced optimization, try using one of the AI models.`,
        'bot'
      );
    }, 1500);

    setConversation(prev => ({ ...prev, optimizedPrompt: optimized }));
  };

  const handleExport = () => {
    if (!conversation.optimizedPrompt) return;

    const exported = exportPrompt(conversation.optimizedPrompt, 'md');
    const blob = new Blob([exported], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-prompt.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addMessage("✅ Your optimized prompt has been exported as a Markdown file!", 'bot');
  };

  const handleReset = () => {
    setConversation({
      turns: [
        {
          id: 'welcome_reset',
          type: 'bot',
          content: "🔄 Starting fresh! What new prompt would you like me to help you optimize?",
          timestamp: new Date()
        }
      ],
      currentAnalysis: null,
      userResponses: {},
      originalPrompt: '',
      optimizedPrompt: null,
      isAwaitingResponse: false,
      currentQuestionIndex: 0,
      selectedModel: 'claude',
      isGenerating: false,
      streamingContent: ''
    });
  };

  const formatMessageContent = (content: string) => {
    // Convert markdown-style formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/•/g, '→')
      .split('\n')
      .map(line => line.trim())
      .join('<br />');
  };

  return (
    <div className={`flex flex-col h-full max-h-[800px] ${className}`}>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-glow-primary/5 rounded-t-lg border border-glow-primary/20">
        {conversation.turns.map((turn, index) => (
          <div key={turn.id}>
            {turn.type === 'system' && turn.metadata?.type === 'comparison' ? (
              <PromptComparison 
                original={turn.metadata.original || ''}
                optimized={turn.metadata.optimized || { content: '', explanation: '', improvements: [], tokenCount: 0, structure: { task: '' } }}
              />
            ) : turn.type === 'system' && turn.metadata?.type === 'streaming_start' ? (
              <StreamingDisplay content={conversation.streamingContent} />
            ) : (
              <div 
                className={`flex ${turn.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div 
                  className={`max-w-[80%] p-4 rounded-lg ${
                    turn.type === 'user' 
                      ? 'bg-glow-primary/20 border border-glow-primary/40 text-glow-primary' 
                      : 'bg-glow-secondary/10 border border-glow-secondary/20 text-primary'
                  }`}
                >
                  {turn.type === 'bot' && (
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">🤖</span>
                      <Typography variant="caption" color="secondary" className="opacity-70">
                        AI Assistant
                      </Typography>
                    </div>
                  )}
                  
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: formatMessageContent(turn.content) }}
                  />
                  
                  <Typography variant="caption" color="secondary" className="opacity-50 mt-2 block">
                    {turn.timestamp.toLocaleTimeString()}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start mb-4">
            <div className="bg-glow-secondary/10 border border-glow-secondary/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-glow-secondary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-glow-secondary rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-glow-secondary rounded-full animate-pulse delay-150"></div>
                </div>
                <Typography variant="caption" color="secondary">
                  Analyzing your prompt...
                </Typography>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-background border-t border-glow-primary/20">
        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                !conversation.originalPrompt 
                  ? "Enter your initial prompt or request..."
                  : conversation.isAwaitingResponse
                  ? "Your response..."
                  : "Ask for refinements, export, or start a new prompt..."
              }
              className="w-full p-3 bg-glow-primary/10 border border-glow-primary/30 rounded-lg text-primary placeholder-secondary/50 resize-none focus:outline-none focus:border-glow-primary/50 focus:ring-2 focus:ring-glow-primary/20 min-h-[48px] max-h-[120px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isProcessing}
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            className="px-6 py-3 bg-glow-primary/20 border border-glow-primary/40 rounded-lg text-glow-primary hover:bg-glow-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>Send</span>
            <span className="text-lg">→</span>
          </button>
        </div>
        
        {/* Model Selection Bar */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Typography variant="caption" color="secondary" className="opacity-70">
              Current model:
            </Typography>
            <span className="px-2 py-1 bg-glow-primary/20 border border-glow-primary/30 rounded text-xs text-glow-primary">
              {AI_MODELS[conversation.selectedModel].icon} {AI_MODELS[conversation.selectedModel].name}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={copyConversation}
              className="px-3 py-1 text-xs bg-glow-secondary/10 border border-glow-secondary/20 rounded text-glow-secondary hover:bg-glow-secondary/20 transition-colors"
            >
              📋 Copy Chat
            </button>
            <button
              type="button"
              onClick={showModelSelection}
              className="px-3 py-1 text-xs bg-glow-secondary/10 border border-glow-secondary/20 rounded text-glow-secondary hover:bg-glow-secondary/20 transition-colors"
            >
              🔄 Change Model
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {!conversation.originalPrompt && (
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
                onClick={() => setInputValue("Help me debug this JavaScript function that's not working")}
                className="px-3 py-1 text-xs bg-glow-secondary/10 border border-glow-secondary/20 rounded text-glow-secondary hover:bg-glow-secondary/20 transition-colors"
              >
                🐛 Code Debugging
              </button>
              <button
                type="button"
                onClick={() => setInputValue("Create a marketing strategy for a new app launch")}
                className="px-3 py-1 text-xs bg-glow-secondary/10 border border-glow-secondary/20 rounded text-glow-secondary hover:bg-glow-secondary/20 transition-colors"
              >
                📈 Business Strategy
              </button>
            </>
          )}
          
          {conversation.optimizedPrompt && (
            <>
              <button
                type="button"
                onClick={handleExport}
                className="px-3 py-1 text-xs bg-green-500/10 border border-green-500/20 rounded text-green-400 hover:bg-green-500/20 transition-colors"
              >
                💾 Export Prompt
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1 text-xs bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 hover:bg-blue-500/20 transition-colors"
              >
                🔄 Start Over
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

// Component for showing streaming AI generation
function StreamingDisplay({ content }: { content: string }) {
  return (
    <ScrollReveal>
      <div className="glow-card p-6 border-green-500/30">
        <div className="flex items-center mb-4">
          <div className="flex space-x-1 mr-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
          </div>
          <Typography variant="body" color="primary" className="font-medium text-green-400">
            AI Generating Response...
          </Typography>
        </div>
        
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 min-h-[100px]">
          <Typography variant="body" color="secondary" className="whitespace-pre-wrap font-mono">
            {content || "Starting generation..."}
          </Typography>
          <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
        </div>
      </div>
    </ScrollReveal>
  );
}

// Component for showing before/after prompt comparison
function PromptComparison({ original, optimized }: { original: string; optimized: OptimizedPrompt }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ScrollReveal>
      <div className="glow-card p-6 space-y-6">
        <Typography variant="subhead" color="primary" className="text-glow-subtle mb-4">
          📊 Before & After Comparison
        </Typography>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Typography variant="body" color="primary" className="font-medium">
                Original Prompt
              </Typography>
              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                {Math.ceil(original.split(/\s+/).length * 1.3)} tokens
              </span>
            </div>
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
              <Typography variant="body" color="secondary" className="whitespace-pre-wrap">
                {original}
              </Typography>
            </div>
          </div>

          {/* Optimized Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Typography variant="body" color="primary" className="font-medium">
                Optimized Prompt
              </Typography>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                {optimized.tokenCount} tokens
              </span>
            </div>
            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
              <Typography variant="body" color="secondary" className="whitespace-pre-wrap">
                {optimized.content}
              </Typography>
            </div>
          </div>
        </div>

        {/* Toggle Details */}
        <div className="text-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 bg-glow-primary/20 border border-glow-primary/40 rounded text-glow-primary hover:bg-glow-primary/30 transition-colors"
          >
            {showDetails ? 'Hide Details' : 'Show Details'} {showDetails ? '▲' : '▼'}
          </button>
        </div>

        {/* Detailed Analysis */}
        {showDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-glow-primary/20">
            <div>
              <Typography variant="body" color="primary" className="font-medium mb-3">
                Improvements Made
              </Typography>
              <ul className="space-y-2">
                {optimized.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <Typography variant="caption" color="secondary">
                      {improvement}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Typography variant="body" color="primary" className="font-medium mb-3">
                Prompt Structure
              </Typography>
              <div className="space-y-2">
                {optimized.structure.role && (
                  <div>
                    <Typography variant="caption" color="primary" className="font-medium">Role:</Typography>
                    <Typography variant="caption" color="secondary" className="ml-2">
                      {optimized.structure.role}
                    </Typography>
                  </div>
                )}
                {optimized.structure.context && (
                  <div>
                    <Typography variant="caption" color="primary" className="font-medium">Context:</Typography>
                    <Typography variant="caption" color="secondary" className="ml-2">
                      {optimized.structure.context}
                    </Typography>
                  </div>
                )}
                {optimized.structure.format && (
                  <div>
                    <Typography variant="caption" color="primary" className="font-medium">Format:</Typography>
                    <Typography variant="caption" color="secondary" className="ml-2">
                      {optimized.structure.format}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}