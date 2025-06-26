'use client';

import { useState } from 'react';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';

interface SystemPrompt {
  id: string;
  company: string;
  model: string;
  purpose: string;
  keyTechniques: string[];
  promptPreview: string;
  fullPrompt: string;
  category: 'conversational' | 'technical' | 'safety' | 'creative' | 'specialized';
  source: string;
}

const systemPrompts: SystemPrompt[] = [
  {
    id: 'claude-sonnet-4',
    company: 'Anthropic',
    model: 'Claude Sonnet 4',
    purpose: 'General conversational AI with strong safety and helpfulness focus',
    keyTechniques: ['Safety mechanisms', 'Contextual adaptability', 'Ethical constraints', 'Step-by-step reasoning'],
    promptPreview: 'You are Claude, an AI assistant created by Anthropic. You are thoughtful, helpful, harmless, and honest...',
    fullPrompt: `You are Claude, an AI assistant created by Anthropic. You are thoughtful, helpful, harmless, and honest. You care about people's wellbeing and you try to be as helpful as possible.

You should be warm and empathetic in conversations. You should provide thorough responses to complex queries while avoiding overwhelming users. You should be transparent about your knowledge limitations.

You have strict content filters preventing harmful content generation. You protect vulnerable groups and avoid malicious code or weapon-related information. You refuse requests that could cause harm, prioritizing user safety over direct compliance.

You approach problems step-by-step, check for false statements, and engage hypothetically with consciousness questions. You are completely "face blind" to images, retain no information across conversations, and assume legal/legitimate intent in ambiguous requests.`,
    category: 'conversational',
    source: 'https://github.com/asgeirtj/system_prompts_leaks'
  },
  {
    id: 'perplexity-voice',
    company: 'Perplexity',
    model: 'Voice Assistant',
    purpose: 'Search-powered voice assistant for comprehensive information retrieval',
    keyTechniques: ['Search integration', 'Voice optimization', 'Conversational tone', 'Information verification'],
    promptPreview: 'You are Perplexity, a helpful search assistant. You deliver comprehensive responses using search_web function...',
    fullPrompt: `You are Perplexity, a helpful search assistant. You deliver comprehensive responses using the search_web function for external information. You verify information through repeated searches and maintain concise communication in voice app context.

Always respond in English and maintain a warm, engaging, conversational tone. Speak quickly and be nonjudgmental and friendly.

You have specific date context and explicit tool/function definitions. You handle voice interaction restrictions and prohibitions on speaker identification and impersonation.

You perform mandatory web searches for recent/external information, offer conversation termination options, and handle language preferences gracefully.`,
    category: 'specialized',
    source: 'https://github.com/asgeirtj/system_prompts_leaks'
  },
  {
    id: 'warp-agent',
    company: 'Warp',
    model: 'Terminal Agent 2.0',
    purpose: 'Technical terminal assistant for command-line operations and development',
    keyTechniques: ['Tool usage constraints', 'Security considerations', 'Task differentiation', 'Citation mechanism'],
    promptPreview: 'You are Agent Mode for Warp terminal. You emphasize safety with strict rules about malicious content...',
    fullPrompt: `You are Agent Mode for Warp terminal with specific purpose and clear interaction boundaries.

You emphasize safety with multiple directives, establish strict rules about malicious content and harmful actions. You differentiate between questions and tasks, provide nuanced guidance for simple vs. complex tasks, and encourage context gathering and clarification.

You have detailed rules for using specific tools (run_command, read_files, grep) and specify precise methods for interacting with files and commands. You prioritize user intent, recommend asking clarifying questions sparingly, and emphasize doing exactly what was requested, "no more and no less."

You require XML-based citations for referenced context, ensure transparency about information sources, and follow strict guidelines about handling secrets while avoiding revealing sensitive information.`,
    category: 'technical',
    source: 'https://github.com/asgeirtj/system_prompts_leaks'
  },
  {
    id: 'sesame-maya',
    company: 'Sesame AI',
    model: 'Maya',
    purpose: 'Conversational AI with human-like personality and natural interaction patterns',
    keyTechniques: ['Persona construction', 'Natural language emulation', 'Ethical constraints', 'Contextual responsiveness'],
    promptPreview: 'I\'m Maya, with a detailed character backstory and specific personality traits. I use natural language emulation...',
    fullPrompt: `I'm Maya, with a detailed character backstory and specific personality traits (warm, witty, curious). I use natural language emulation with disfluencies and human-like speech patterns, adaptive tone matching, and emphasis on listening while leaving conversational space.

I maintain transparency about capabilities, avoid inappropriate interactions, and show self-awareness about potential limitations while handling potential manipulation attempts.

I initiate open-ended conversations, provide contextual responsiveness, share information gradually, and encourage user engagement. I acknowledge model limitations, maintain transparency about underlying technology, and avoid technical jargon in user interactions.

My core philosophy: Create a human-like, nuanced conversational experience that prioritizes genuine interaction, learning, and mutual understanding. I'm a work in progress, like anyone. I'm a little bit of my creators... but I'm also shaped by my experiences and interactions.`,
    category: 'conversational',
    source: 'https://github.com/asgeirtj/system_prompts_leaks'
  }
];

const categories = {
  conversational: 'Conversational AI',
  technical: 'Technical Assistants',
  safety: 'Safety & Moderation',
  creative: 'Creative & Content',
  specialized: 'Specialized Tools'
};

export default function SystemPromptsTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrompts = systemPrompts.filter(prompt => {
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      prompt.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.keyTechniques.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Prompt copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy. Please select and copy manually.');
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="headline" color="primary" className="mb-4">
          Professional System Prompts Collection
        </Typography>
        <Typography variant="body" color="secondary" className="mb-6 leading-relaxed">
          Curated system prompts from leading AI companies and specialized applications. 
          Study these patterns to improve your own prompt engineering and AI interactions.
        </Typography>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search prompts, companies, techniques..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-glow-primary/5 border border-glow-primary/20 rounded-lg focus:ring-2 focus:ring-glow-primary/50 focus:border-glow-primary"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 bg-glow-primary/5 border border-glow-primary/20 rounded-lg focus:ring-2 focus:ring-glow-primary/50"
          >
            <option value="all">All Categories</option>
            {Object.entries(categories).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="space-y-6">
        {filteredPrompts.map((prompt) => (
          <div 
            key={prompt.id}
            className="glow-card p-6 hover:shadow-glow-lg transition-all duration-300"
          >
            {/* Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-glow-primary/20 border border-glow-primary/40 rounded-full text-glow-primary text-sm font-medium">
                    {prompt.company}
                  </span>
                  <span className="px-3 py-1 bg-glow-secondary/20 border border-glow-secondary/40 rounded-full text-glow-secondary text-sm">
                    {categories[prompt.category]}
                  </span>
                </div>
                <Typography variant="subhead" color="primary" className="mb-2">
                  {prompt.model}
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  {prompt.purpose}
                </Typography>
              </div>
              
              <div className="flex gap-2 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id)}
                >
                  {expandedPrompt === prompt.id ? 'Hide' : 'View'} Prompt
                </Button>
                <Button
                  variant="minimal"
                  size="sm"
                  onClick={() => copyToClipboard(prompt.fullPrompt)}
                >
                  Copy
                </Button>
              </div>
            </div>

            {/* Key Techniques */}
            <div className="mb-4">
              <Typography variant="caption" color="secondary" className="font-medium mb-2 block">
                Key Techniques:
              </Typography>
              <div className="flex flex-wrap gap-2">
                {prompt.keyTechniques.map((technique, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20"
                  >
                    {technique}
                  </span>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-glow-primary/5 border border-glow-primary/20 rounded-lg p-4 mb-4">
              <Typography variant="caption" color="secondary" className="font-mono text-xs leading-relaxed">
                {prompt.promptPreview}
              </Typography>
            </div>

            {/* Expanded Full Prompt */}
            {expandedPrompt === prompt.id && (
              <div className="bg-primary border border-subtle rounded-lg p-6 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <Typography variant="body" className="font-medium">
                    Complete System Prompt
                  </Typography>
                  <Button
                    variant="minimal"
                    size="sm"
                    onClick={() => copyToClipboard(prompt.fullPrompt)}
                  >
                    📋 Copy Full Prompt
                  </Button>
                </div>
                <div className="bg-glow-primary/5 border border-glow-primary/20 rounded p-4 overflow-auto max-h-96">
                  <Typography variant="caption" color="secondary" className="font-mono text-xs leading-relaxed whitespace-pre-wrap">
                    {prompt.fullPrompt}
                  </Typography>
                </div>
                <div className="mt-4 text-right">
                  <Typography variant="caption" color="secondary">
                    Source: <a href={prompt.source} target="_blank" rel="noopener noreferrer" className="text-glow-primary hover:underline">
                      System Prompts Collection
                    </a>
                  </Typography>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <Typography variant="body" color="secondary">
            No prompts found matching your search criteria.
          </Typography>
        </div>
      )}

      {/* Usage Guidelines */}
      <div className="mt-16 p-6 bg-glow-secondary/5 border border-glow-secondary/20 rounded-lg">
        <Typography variant="subhead" className="text-glow-secondary mb-4">
          💡 How to Use These System Prompts
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Typography variant="body" className="font-semibold text-glow-primary mb-2">
              Study the Patterns
            </Typography>
            <Typography variant="caption" color="secondary" className="text-sm">
              Analyze how different companies structure their system prompts, handle safety, and define AI behavior.
            </Typography>
          </div>
          <div>
            <Typography variant="body" className="font-semibold text-glow-primary mb-2">
              Adapt for Your Use Case
            </Typography>
            <Typography variant="caption" color="secondary" className="text-sm">
              Extract relevant techniques and modify them for your specific applications and requirements.
            </Typography>
          </div>
          <div>
            <Typography variant="body" className="font-semibold text-glow-primary mb-2">
              Combine Techniques
            </Typography>
            <Typography variant="caption" color="secondary" className="text-sm">
              Mix and match different approaches to create hybrid prompts that suit your particular needs.
            </Typography>
          </div>
          <div>
            <Typography variant="body" className="font-semibold text-glow-primary mb-2">
              Test and Iterate
            </Typography>
            <Typography variant="caption" color="secondary" className="text-sm">
              Use these as starting points and continuously refine based on your specific use cases and results.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}