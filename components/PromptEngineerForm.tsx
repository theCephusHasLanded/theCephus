'use client';

import { useState } from 'react';
import { AIModel, AI_MODELS } from '@/lib/ai-models';
import Typography from '@/components/ui/Typography';

interface PromptFormData {
  // Core Elements
  originalPrompt: string;
  model: AIModel;
  category: string;
  roleDefinition: string;
  outputFormat: string;
  toneStyle: string;
  
  // Context & Constraints
  context: string;
  constraints: string;
  targetAudience: string;
  domain: string;
  
  // Format & Structure
  lengthRequirement: string;
  responseStructure: string[];
  technicalLevel: string;
  
  // Examples & Quality
  examples: string;
  qualityCriteria: string[];
  
  // Advanced Settings
  creativity: number; // 0-100 slider
  specificity: number; // 0-100 slider
  language: string;
}

const CATEGORIES = [
  'General Assistant',
  'Code Generation',
  'Technical Writing',
  'Creative Writing',
  'Data Analysis',
  'Research & Analysis',
  'Business Communication',
  'Educational Content',
  'Marketing Content',
  'Legal Documents',
  'Scientific Writing',
  'Product Development'
];

const TONE_STYLES = [
  'Professional',
  'Casual & Friendly',
  'Technical & Precise',
  'Creative & Engaging',
  'Formal & Academic',
  'Conversational',
  'Authoritative',
  'Empathetic',
  'Concise & Direct',
  'Detailed & Thorough'
];

const OUTPUT_FORMATS = [
  'Plain Text',
  'Markdown',
  'JSON Structure',
  'Bullet Points',
  'Numbered List',
  'Table Format',
  'Code Blocks',
  'Step-by-step Guide',
  'Q&A Format',
  'Structured Essay'
];

const LENGTH_REQUIREMENTS = [
  'Brief (1-2 sentences)',
  'Short (1 paragraph)',
  'Medium (2-3 paragraphs)',
  'Detailed (Multiple paragraphs)',
  'Comprehensive (Full analysis)',
  'Custom length specified'
];

const TECHNICAL_LEVELS = [
  'Beginner (Simple explanations)',
  'Intermediate (Some technical terms)',
  'Advanced (Technical expertise)',
  'Expert (Highly specialized)',
  'Mixed Audience'
];

const RESPONSE_STRUCTURE_OPTIONS = [
  'Include reasoning/explanation',
  'Provide examples',
  'Add relevant context',
  'Include implementation steps',
  'Suggest alternatives',
  'Add quality checks',
  'Include references',
  'Provide troubleshooting'
];

const QUALITY_CRITERIA = [
  'Accuracy & Factual Correctness',
  'Clarity & Readability',
  'Completeness & Thoroughness',
  'Actionable & Practical',
  'Well-structured & Organized',
  'Engaging & Interesting',
  'Concise & Efficient',
  'Professional Quality'
];

export default function PromptEngineerForm() {
  const [formData, setFormData] = useState<PromptFormData>({
    originalPrompt: '',
    model: 'local',
    category: 'General Assistant',
    roleDefinition: '',
    outputFormat: 'Plain Text',
    toneStyle: 'Professional',
    context: '',
    constraints: '',
    targetAudience: '',
    domain: '',
    lengthRequirement: 'Medium (2-3 paragraphs)',
    responseStructure: [],
    technicalLevel: 'Intermediate (Some technical terms)',
    examples: '',
    qualityCriteria: [],
    creativity: 50,
    specificity: 70,
    language: 'English'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string>('');
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>('');
  const [showAdaptiveQuestions, setShowAdaptiveQuestions] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleInputChange = (field: keyof PromptFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Trigger adaptive questioning when original prompt is entered
    if (field === 'originalPrompt' && value.length > 10) {
      analyzeAndSuggestQuestions(value);
    }
  };

  const analyzeAndSuggestQuestions = (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase();
    
    // Smart defaults based on prompt content
    const updates: Partial<PromptFormData> = {};
    
    // Detect category
    if (/\b(code|program|function|debug|algorithm|software)\b/.test(lowerPrompt)) {
      updates.category = 'Code Generation';
      updates.outputFormat = 'Code Blocks';
      updates.roleDefinition = 'expert software developer';
    } else if (/\b(write|article|blog|content|story|creative)\b/.test(lowerPrompt)) {
      updates.category = 'Creative Writing';
      updates.outputFormat = 'Markdown';
      updates.roleDefinition = 'professional writer';
    } else if (/\b(analyze|research|data|study|report)\b/.test(lowerPrompt)) {
      updates.category = 'Data Analysis';
      updates.outputFormat = 'Structured Essay';
      updates.roleDefinition = 'data analyst';
    } else if (/\b(business|marketing|strategy|plan)\b/.test(lowerPrompt)) {
      updates.category = 'Business Communication';
      updates.outputFormat = 'Bullet Points';
      updates.roleDefinition = 'business consultant';
    }

    // Detect tone
    if (/\b(formal|official|professional|business)\b/.test(lowerPrompt)) {
      updates.toneStyle = 'Professional';
    } else if (/\b(casual|friendly|simple|easy)\b/.test(lowerPrompt)) {
      updates.toneStyle = 'Casual & Friendly';
    } else if (/\b(technical|precise|detailed|specific)\b/.test(lowerPrompt)) {
      updates.toneStyle = 'Technical & Precise';
    }

    // Detect length preference
    if (/\b(brief|short|quick|summary)\b/.test(lowerPrompt)) {
      updates.lengthRequirement = 'Brief (1-2 sentences)';
    } else if (/\b(detailed|comprehensive|thorough|complete)\b/.test(lowerPrompt)) {
      updates.lengthRequirement = 'Comprehensive (Full analysis)';
    }

    if (Object.keys(updates).length > 0) {
      setFormData(prev => ({ ...prev, ...updates }));
      setShowAdaptiveQuestions(true);
    }
  };

  const handleArrayChange = (field: 'responseStructure' | 'qualityCriteria', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy. Please select and copy manually.');
    }
  };

  const extractOptimizedPrompt = (fullResult: string): string => {
    // Extract the optimized prompt from the result
    const optimizedMatch = fullResult.match(/\*\*✨ Optimized Prompt:\*\*\n\n([\s\S]*?)(?=\n\n\*\*|$)/);
    if (optimizedMatch) {
      return optimizedMatch[1].trim();
    }
    
    // Fallback: look for any substantial text after "Optimized Prompt"
    const lines = fullResult.split('\n');
    let capturing = false;
    let prompt = '';
    
    for (const line of lines) {
      if (line.includes('Optimized Prompt') || line.includes('optimized prompt')) {
        capturing = true;
        continue;
      }
      if (capturing && line.includes('**') && line.includes(':')) {
        break; // Stop at next section
      }
      if (capturing && line.trim()) {
        prompt += line + '\n';
      }
    }
    
    return prompt.trim() || fullResult;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.originalPrompt.trim()) return;

    setIsGenerating(true);
    setResult('');
    setOptimizedPrompt('');

    try {
      const response = await fetch('/api/prompt-optimization-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalPrompt: formData.originalPrompt,
          userResponses: {
            role_definition: formData.roleDefinition,
            output_format: formData.outputFormat,
            tone_style: formData.toneStyle,
            constraints: formData.constraints,
            context: formData.context,
            target_audience: formData.targetAudience,
            domain: formData.domain,
            length_requirement: formData.lengthRequirement,
            technical_level: formData.technicalLevel,
            examples: formData.examples,
            response_structure: formData.responseStructure.join(', '),
            quality_criteria: formData.qualityCriteria.join(', ')
          },
          category: formData.category,
          model: formData.model,
          analysis: {
            category: formData.category,
            complexity: 'advanced',
            missingElements: [],
            strengths: []
          }
        })
      });

      if (!response.ok) throw new Error('Generation failed');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResult = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullResult += parsed.content;
                setResult(fullResult);
                
                // Continuously extract and update the optimized prompt
                const extracted = extractOptimizedPrompt(fullResult);
                if (extracted && extracted !== fullResult) {
                  setOptimizedPrompt(extracted);
                }
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
      
      // Final extraction
      const finalOptimized = extractOptimizedPrompt(fullResult);
      setOptimizedPrompt(finalOptimized);
      
    } catch (error) {
      setResult('Error generating optimized prompt. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <Typography variant="headline" className="text-glow-primary mb-2">
              🚀 AI Prompt Engineer
            </Typography>
            <Typography variant="body" color="secondary">
              Professional prompt optimization with comprehensive controls
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Model Selection */}
            <div>
              <Typography variant="subhead" className="mb-3">AI Model Selection</Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.values(AI_MODELS).map((model) => (
                  <label
                    key={model.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.model === model.id
                        ? 'border-glow-primary bg-glow-primary/10'
                        : 'border-glow-primary/20 hover:border-glow-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="model"
                      value={model.id}
                      checked={formData.model === model.id}
                      onChange={(e) => handleInputChange('model', e.target.value as AIModel)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-1">{model.icon}</div>
                      <div className="font-semibold text-sm">{model.name}</div>
                      <div className="text-xs text-glow-secondary mt-1">{model.pricing}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Original Prompt */}
            <div>
              <Typography variant="subhead" className="mb-2">Original Prompt</Typography>
              <textarea
                value={formData.originalPrompt}
                onChange={(e) => handleInputChange('originalPrompt', e.target.value)}
                placeholder="Enter your initial prompt that you want to optimize..."
                className="w-full h-32 p-4 bg-glow-primary/5 border border-glow-primary/20 rounded-lg resize-none focus:ring-2 focus:ring-glow-primary/50 focus:border-glow-primary"
                required
              />
              
              {/* Adaptive Questions Notification */}
              {showAdaptiveQuestions && (
                <div className="mt-3 p-3 bg-glow-secondary/10 border border-glow-secondary/20 rounded-lg">
                  <Typography variant="caption" className="text-glow-secondary font-medium">
                    ✨ Smart Detection: I've automatically filled in some fields based on your prompt. Review and adjust as needed below.
                  </Typography>
                </div>
              )}
            </div>

            {/* Core Settings Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-3 bg-glow-primary/5 border border-glow-primary/20 rounded-lg focus:ring-2 focus:ring-glow-primary/50"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tone & Style</label>
                <select
                  value={formData.toneStyle}
                  onChange={(e) => handleInputChange('toneStyle', e.target.value)}
                  className="w-full p-3 bg-glow-primary/5 border border-glow-primary/20 rounded-lg focus:ring-2 focus:ring-glow-primary/50"
                >
                  {TONE_STYLES.map(tone => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Role & Format Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Role Definition</label>
                <input
                  type="text"
                  value={formData.roleDefinition}
                  onChange={(e) => handleInputChange('roleDefinition', e.target.value)}
                  placeholder="e.g., expert software developer, marketing specialist"
                  className="w-full p-3 bg-glow-primary/5 border border-glow-primary/20 rounded-lg focus:ring-2 focus:ring-glow-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Output Format</label>
                <select
                  value={formData.outputFormat}
                  onChange={(e) => handleInputChange('outputFormat', e.target.value)}
                  className="w-full p-3 bg-glow-primary/5 border border-glow-primary/20 rounded-lg focus:ring-2 focus:ring-glow-primary/50"
                >
                  {OUTPUT_FORMATS.map(format => (
                    <option key={format} value={format}>{format}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Context & Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Context & Background</label>
                <textarea
                  value={formData.context}
                  onChange={(e) => handleInputChange('context', e.target.value)}
                  placeholder="Provide relevant background information..."
                  className="w-full h-24 p-3 bg-glow-primary/5 border border-glow-primary/20 rounded-lg resize-none focus:ring-2 focus:ring-glow-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Constraints & Requirements</label>
                <textarea
                  value={formData.constraints}
                  onChange={(e) => handleInputChange('constraints', e.target.value)}
                  placeholder="What should be avoided or required..."
                  className="w-full h-24 p-3 bg-glow-primary/5 border border-glow-primary/20 rounded-lg resize-none focus:ring-2 focus:ring-glow-primary/50"
                />
              </div>
            </div>

            {/* Advanced Settings */}
            <details className="group">
              <summary className="cursor-pointer text-glow-primary font-medium">⚙️ Advanced Settings</summary>
              <div className="mt-4 space-y-4 p-4 bg-glow-primary/5 rounded-lg">
                {/* Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Creativity Level: {formData.creativity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.creativity}
                      onChange={(e) => handleInputChange('creativity', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Specificity Level: {formData.specificity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.specificity}
                      onChange={(e) => handleInputChange('specificity', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Response Structure */}
                <div>
                  <label className="block text-sm font-medium mb-2">Response Structure</label>
                  <div className="grid grid-cols-2 gap-2">
                    {RESPONSE_STRUCTURE_OPTIONS.map(option => (
                      <label key={option} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.responseStructure.includes(option)}
                          onChange={(e) => handleArrayChange('responseStructure', option, e.target.checked)}
                          className="rounded"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </details>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!formData.originalPrompt.trim() || isGenerating}
              className="w-full py-4 bg-glow-primary text-white rounded-lg font-semibold hover:bg-glow-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? '🔄 Generating Optimized Prompt...' : '🚀 Generate Optimized Prompt'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="lg:sticky lg:top-6">
          <div className="bg-glow-primary/5 border border-glow-primary/20 rounded-lg p-6 min-h-[600px]">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="subhead">
                ✨ Optimized Prompt Result
              </Typography>
              
              {optimizedPrompt && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(optimizedPrompt)}
                    className="px-3 py-1 text-xs bg-glow-primary/20 border border-glow-primary/40 rounded text-glow-primary hover:bg-glow-primary/30 transition-colors"
                  >
                    📋 Copy Optimized Prompt
                  </button>
                  <button
                    onClick={() => copyToClipboard(result)}
                    className="px-3 py-1 text-xs bg-glow-secondary/20 border border-glow-secondary/40 rounded text-glow-secondary hover:bg-glow-secondary/30 transition-colors"
                  >
                    📄 Copy Full Analysis
                  </button>
                </div>
              )}
            </div>
            
            {result ? (
              <div className="space-y-4">
                {/* Quick Copy Section */}
                {optimizedPrompt && (
                  <div className="bg-glow-primary/10 border border-glow-primary/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <Typography variant="caption" className="font-semibold text-glow-primary">
                        🎯 Ready-to-Use Optimized Prompt:
                      </Typography>
                      <button
                        onClick={() => copyToClipboard(optimizedPrompt)}
                        className="text-xs text-glow-primary hover:underline"
                      >
                        Click to Copy
                      </button>
                    </div>
                    <div className="bg-white/5 rounded p-3 text-sm font-mono leading-relaxed max-h-32 overflow-y-auto">
                      {optimizedPrompt}
                    </div>
                  </div>
                )}
                
                {/* Full Analysis */}
                <div className="prose prose-sm max-w-none">
                  <div 
                    className="whitespace-pre-wrap text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-glow-secondary py-12">
                <div className="text-4xl mb-4">📝</div>
                <Typography variant="body">
                  Fill out the form and click "Generate" to see your optimized prompt here.
                </Typography>
                <div className="mt-4 text-sm">
                  <Typography variant="caption" color="secondary">
                    💡 Tip: Just enter your basic prompt above - I'll automatically detect the type and fill in smart defaults!
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}