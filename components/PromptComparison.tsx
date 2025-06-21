'use client';

import { useState } from 'react';
import { OptimizedPrompt } from '@/lib/prompt-analysis';
import { formatCost } from '@/lib/ai-providers';
import Typography from '@/components/ui/Typography';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PromptComparisonProps {
  original: string;
  optimized: OptimizedPrompt;
  modelUsed?: string;
  onExport?: (format: 'markdown' | 'json' | 'text') => void;
  onCopy?: (content: string) => void;
  className?: string;
}

export default function PromptComparison({ 
  original, 
  optimized, 
  modelUsed,
  onExport,
  onCopy,
  className = '' 
}: PromptComparisonProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'comparison' | 'structure' | 'analysis'>('comparison');

  const improvement = optimized.metadata.optimizedScore - optimized.metadata.originalScore;
  const tokenDifference = optimized.metadata.tokenCount - Math.ceil(original.split(/\s+/).length * 1.33);

  const handleCopyOptimized = () => {
    const content = optimized.systemPrompt 
      ? `${optimized.systemPrompt}\n\n${optimized.content}`
      : optimized.content;
    
    if (onCopy) {
      onCopy(content);
    } else {
      navigator.clipboard.writeText(content);
    }
  };

  const handleCopyOriginal = () => {
    if (onCopy) {
      onCopy(original);
    } else {
      navigator.clipboard.writeText(original);
    }
  };

  return (
    <ScrollReveal>
      <div className={`glow-card p-6 space-y-6 ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="subhead" color="primary" className="text-glow-subtle mb-2">
              📊 Prompt Optimization Results
            </Typography>
            {modelUsed && (
              <Typography variant="caption" color="secondary" className="opacity-70">
                Optimized using {modelUsed}
              </Typography>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className={`text-lg font-bold ${improvement > 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                {improvement > 0 ? '+' : ''}{improvement.toFixed(0)} points
              </div>
              <Typography variant="caption" color="secondary">
                Quality improvement
              </Typography>
            </div>
            
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${optimized.metadata.optimizedScore}, 100`}
                  className="text-glow-primary"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-glow-primary/20"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-glow-primary">
                  {optimized.metadata.optimizedScore}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-glow-primary/10 rounded-lg p-1">
          {[
            { id: 'comparison', label: 'Before & After', icon: '🔄' },
            { id: 'structure', label: 'Structure', icon: '🏗️' },
            { id: 'analysis', label: 'Analysis', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-glow-primary/20 text-glow-primary border border-glow-primary/30'
                  : 'text-secondary hover:text-primary hover:bg-glow-primary/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'comparison' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Prompt */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Typography variant="body" color="primary" className="font-medium flex items-center space-x-2">
                  <span>📝</span>
                  <span>Original Prompt</span>
                </Typography>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                    {optimized.metadata.originalScore}/100
                  </span>
                  <button
                    onClick={handleCopyOriginal}
                    className="p-1 hover:bg-glow-primary/20 rounded transition-colors"
                    title="Copy original prompt"
                  >
                    📋
                  </button>
                </div>
              </div>
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg max-h-64 overflow-y-auto">
                <Typography variant="body" color="secondary" className="whitespace-pre-wrap">
                  {original}
                </Typography>
              </div>
              <Typography variant="caption" color="secondary" className="opacity-60">
                ~{Math.ceil(original.split(/\s+/).length * 1.33)} tokens
              </Typography>
            </div>

            {/* Optimized Prompt */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Typography variant="body" color="primary" className="font-medium flex items-center space-x-2">
                  <span>✨</span>
                  <span>Optimized Prompt</span>
                </Typography>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                    {optimized.metadata.optimizedScore}/100
                  </span>
                  <button
                    onClick={handleCopyOptimized}
                    className="p-1 hover:bg-glow-primary/20 rounded transition-colors"
                    title="Copy optimized prompt"
                  >
                    📋
                  </button>
                </div>
              </div>
              
              {optimized.systemPrompt && (
                <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <Typography variant="caption" color="primary" className="font-medium mb-1 block">
                    System Prompt:
                  </Typography>
                  <Typography variant="caption" color="secondary" className="whitespace-pre-wrap">
                    {optimized.systemPrompt}
                  </Typography>
                </div>
              )}
              
              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg max-h-64 overflow-y-auto">
                <Typography variant="body" color="secondary" className="whitespace-pre-wrap">
                  {optimized.content}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="caption" color="secondary" className="opacity-60">
                  {optimized.metadata.tokenCount} tokens
                  {tokenDifference !== 0 && (
                    <span className={`ml-2 ${tokenDifference > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      ({tokenDifference > 0 ? '+' : ''}{tokenDifference})
                    </span>
                  )}
                </Typography>
                <Typography variant="caption" color="secondary" className="opacity-60">
                  Est. cost: {formatCost(optimized.metadata.estimatedCost)}
                </Typography>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="space-y-4">
            <Typography variant="body" color="primary" className="font-medium mb-4">
              🏗️ Prompt Structure Analysis
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Role/Persona', value: optimized.structure.role, icon: '👤' },
                { label: 'Context', value: optimized.structure.context, icon: '📍' },
                { label: 'Task', value: optimized.structure.task, icon: '🎯' },
                { label: 'Format', value: optimized.structure.format, icon: '📄' },
                { label: 'Audience', value: optimized.structure.audience, icon: '👥' },
                { label: 'Tone', value: optimized.structure.tone, icon: '🎭' }
              ].map((item) => (
                <div key={item.label} className="p-3 bg-glow-primary/5 border border-glow-primary/10 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span>{item.icon}</span>
                    <Typography variant="caption" color="primary" className="font-medium">
                      {item.label}
                    </Typography>
                  </div>
                  <Typography variant="caption" color="secondary">
                    {item.value || 'Not specified'}
                  </Typography>
                </div>
              ))}
            </div>

            {optimized.structure.constraints && optimized.structure.constraints.length > 0 && (
              <div className="p-3 bg-glow-secondary/5 border border-glow-secondary/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span>⚠️</span>
                  <Typography variant="caption" color="primary" className="font-medium">
                    Constraints
                  </Typography>
                </div>
                <ul className="space-y-1">
                  {optimized.structure.constraints.map((constraint, index) => (
                    <li key={index}>
                      <Typography variant="caption" color="secondary">
                        • {constraint}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {optimized.structure.examples && optimized.structure.examples.length > 0 && (
              <div className="p-3 bg-glow-primary/5 border border-glow-primary/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span>💡</span>
                  <Typography variant="caption" color="primary" className="font-medium">
                    Examples
                  </Typography>
                </div>
                <ul className="space-y-1">
                  {optimized.structure.examples.map((example, index) => (
                    <li key={index}>
                      <Typography variant="caption" color="secondary">
                        • {example}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-4">
            <Typography variant="body" color="primary" className="font-medium mb-4">
              📈 Improvement Analysis
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-glow-primary/5 border border-glow-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-glow-primary mb-1">
                  {optimized.metadata.originalScore}
                </div>
                <Typography variant="caption" color="secondary">Original Score</Typography>
              </div>
              
              <div className="text-center p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {optimized.metadata.optimizedScore}
                </div>
                <Typography variant="caption" color="secondary">Optimized Score</Typography>
              </div>
              
              <div className="text-center p-4 bg-glow-secondary/5 border border-glow-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-glow-secondary mb-1">
                  +{improvement.toFixed(0)}
                </div>
                <Typography variant="caption" color="secondary">Improvement</Typography>
              </div>
            </div>

            <div className="space-y-3">
              <Typography variant="body" color="primary" className="font-medium">
                🔧 Improvements Made
              </Typography>
              <ul className="space-y-2">
                {optimized.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                    <Typography variant="caption" color="secondary">
                      {improvement}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-glow-primary/5 border border-glow-primary/10 rounded-lg">
              <Typography variant="caption" color="primary" className="font-medium mb-2 block">
                💭 Explanation
              </Typography>
              <Typography variant="caption" color="secondary">
                {optimized.explanation}
              </Typography>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-glow-primary/20">
          <button
            onClick={() => onExport?.('markdown')}
            className="px-4 py-2 bg-glow-primary/20 border border-glow-primary/40 rounded text-glow-primary hover:bg-glow-primary/30 transition-colors"
          >
            📄 Export Markdown
          </button>
          
          <button
            onClick={() => onExport?.('json')}
            className="px-4 py-2 bg-glow-secondary/20 border border-glow-secondary/40 rounded text-glow-secondary hover:bg-glow-secondary/30 transition-colors"
          >
            📊 Export JSON
          </button>
          
          <button
            onClick={() => onExport?.('text')}
            className="px-4 py-2 bg-glow-primary/20 border border-glow-primary/40 rounded text-glow-primary hover:bg-glow-primary/30 transition-colors"
          >
            📝 Export Text
          </button>
          
          <button
            onClick={handleCopyOptimized}
            className="px-4 py-2 bg-green-500/20 border border-green-500/40 rounded text-green-400 hover:bg-green-500/30 transition-colors"
          >
            📋 Copy Optimized
          </button>
          
          <div className="ml-auto">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 bg-glow-secondary/20 border border-glow-secondary/40 rounded text-glow-secondary hover:bg-glow-secondary/30 transition-colors"
            >
              {showDetails ? 'Hide Details' : 'Show Details'} {showDetails ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {/* Detailed Metrics */}
        {showDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-glow-primary/20">
            <div>
              <Typography variant="body" color="primary" className="font-medium mb-3">
                📊 Metrics
              </Typography>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="caption" color="secondary">Original Tokens:</Typography>
                  <Typography variant="caption" color="primary">
                    {Math.ceil(original.split(/\s+/).length * 1.33)}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="caption" color="secondary">Optimized Tokens:</Typography>
                  <Typography variant="caption" color="primary">
                    {optimized.metadata.tokenCount}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="caption" color="secondary">Token Difference:</Typography>
                  <Typography variant="caption" color={tokenDifference > 0 ? "secondary" : "primary"}>
                    {tokenDifference > 0 ? '+' : ''}{tokenDifference}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="caption" color="secondary">Estimated Cost:</Typography>
                  <Typography variant="caption" color="primary">
                    {formatCost(optimized.metadata.estimatedCost)}
                  </Typography>
                </div>
              </div>
            </div>
            
            <div>
              <Typography variant="body" color="primary" className="font-medium mb-3">
                ⏱️ Process Info
              </Typography>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="caption" color="secondary">Model Used:</Typography>
                  <Typography variant="caption" color="primary">
                    {modelUsed || 'Rule-based'}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="caption" color="secondary">Processing Time:</Typography>
                  <Typography variant="caption" color="primary">
                    {(Date.now() - optimized.metadata.timeToOptimize) / 1000}s
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="caption" color="secondary">Quality Gain:</Typography>
                  <Typography variant="caption" color="primary">
                    {improvement.toFixed(1)}%
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}