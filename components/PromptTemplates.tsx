'use client';

import { useState, useEffect } from 'react';
import { 
  PROMPT_TEMPLATES, 
  PromptTemplate, 
  TemplateVariable,
  getTemplatesByCategory,
  getTemplateCategories,
  searchTemplates,
  fillTemplate,
  validateTemplateVariables,
  estimateTemplateTokens
} from '@/lib/prompt-templates';
import Typography from '@/components/ui/Typography';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PromptTemplatesProps {
  onTemplateSelect: (prompt: string, systemPrompt?: string) => void;
  selectedCategory?: string;
  className?: string;
}

export default function PromptTemplates({ 
  onTemplateSelect, 
  selectedCategory, 
  className = '' 
}: PromptTemplatesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'all');
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Get filtered templates
  const getFilteredTemplates = () => {
    let templates = PROMPT_TEMPLATES;
    
    if (searchQuery) {
      templates = searchTemplates(searchQuery);
    }
    
    if (activeCategory !== 'all') {
      templates = templates.filter(t => t.category === activeCategory);
    }
    
    return templates;
  };

  // Handle template selection
  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    
    // Initialize variables with default values
    const initialVariables: Record<string, string> = {};
    template.variables.forEach(variable => {
      initialVariables[variable.name] = variable.defaultValue || '';
    });
    setTemplateVariables(initialVariables);
    setValidationErrors([]);
    setShowPreview(false);
  };

  // Handle variable change
  const handleVariableChange = (variableName: string, value: string) => {
    setTemplateVariables(prev => ({
      ...prev,
      [variableName]: value
    }));
  };

  // Validate and preview template
  const handlePreview = () => {
    if (!selectedTemplate) return;
    
    const validation = validateTemplateVariables(selectedTemplate, templateVariables);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    
    setValidationErrors([]);
    setShowPreview(true);
  };

  // Use template
  const handleUseTemplate = () => {
    if (!selectedTemplate) return;
    
    const validation = validateTemplateVariables(selectedTemplate, templateVariables);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    
    const { prompt, systemPrompt } = fillTemplate(selectedTemplate, templateVariables);
    onTemplateSelect(prompt, systemPrompt);
  };

  // Get template preview
  const getTemplatePreview = () => {
    if (!selectedTemplate) return { prompt: '', systemPrompt: undefined };
    return fillTemplate(selectedTemplate, templateVariables);
  };

  const filteredTemplates = getFilteredTemplates();
  const categories = getTemplateCategories();
  const templatePreview = getTemplatePreview();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <Typography variant="subhead" color="primary" className="mb-2 text-glow-subtle">
          📋 Prompt Templates
        </Typography>
        <Typography variant="body" color="secondary">
          Choose from professionally crafted templates to jumpstart your prompts
        </Typography>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 bg-glow-primary/10 border border-glow-primary/30 rounded-lg text-primary placeholder-secondary/50 focus:outline-none focus:border-glow-primary/50"
            />
          </div>
          
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="p-3 bg-glow-primary/10 border border-glow-primary/30 rounded-lg text-primary focus:outline-none focus:border-glow-primary/50"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <Typography variant="caption" color="secondary">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
          </Typography>
          
          {selectedTemplate && (
            <button
              onClick={() => setSelectedTemplate(null)}
              className="text-glow-secondary hover:text-glow-primary transition-colors"
            >
              ← Back to templates
            </button>
          )}
        </div>
      </div>

      {!selectedTemplate ? (
        /* Template Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <ScrollReveal key={template.id}>
              <button
                onClick={() => handleTemplateSelect(template)}
                className="glow-card p-6 text-left hover:shadow-glow-lg transition-all duration-300 group w-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{template.icon}</span>
                    <div>
                      <Typography variant="body" color="primary" className="font-medium group-hover:text-glow-primary transition-colors">
                        {template.name}
                      </Typography>
                      <Typography variant="caption" color="secondary">
                        {template.category}
                      </Typography>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-1 rounded text-xs ${
                    template.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                    template.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {template.difficulty}
                  </span>
                </div>
                
                <Typography variant="caption" color="secondary" className="mb-4 block">
                  {template.description}
                </Typography>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-glow-secondary/20 text-glow-secondary rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="px-2 py-1 bg-glow-secondary/10 text-secondary rounded text-xs">
                      +{template.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <Typography variant="caption" color="secondary">
                    {template.variables.length} variable{template.variables.length !== 1 ? 's' : ''}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    ~{template.estimatedTokens} tokens
                  </Typography>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        /* Template Configuration */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div className="glow-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{selectedTemplate.icon}</span>
                <div>
                  <Typography variant="subhead" color="primary" className="text-glow-subtle">
                    {selectedTemplate.name}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    {selectedTemplate.category} • {selectedTemplate.difficulty}
                  </Typography>
                </div>
              </div>
              
              <Typography variant="body" color="secondary" className="mb-4">
                {selectedTemplate.description}
              </Typography>
              
              <div className="space-y-2 mb-4">
                <Typography variant="caption" color="primary" className="font-medium">
                  Use Case:
                </Typography>
                <Typography variant="caption" color="secondary">
                  {selectedTemplate.useCase}
                </Typography>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-glow-secondary/20 text-glow-secondary rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Variables Form */}
            <div className="glow-card p-6">
              <Typography variant="body" color="primary" className="font-medium mb-4">
                🔧 Template Variables
              </Typography>
              
              {validationErrors.length > 0 && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <Typography variant="caption" color="primary" className="font-medium mb-2 block">
                    Please fix the following errors:
                  </Typography>
                  <ul className="space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>
                        <Typography variant="caption" color="secondary">
                          • {error}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="space-y-4">
                {selectedTemplate.variables.map((variable) => (
                  <div key={variable.name}>
                    <label className="block mb-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <Typography variant="caption" color="primary" className="font-medium">
                          {variable.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Typography>
                        {variable.required && (
                          <span className="text-red-400 text-xs">*</span>
                        )}
                      </div>
                      <Typography variant="caption" color="secondary" className="block mb-2">
                        {variable.description}
                      </Typography>
                    </label>
                    
                    {variable.type === 'textarea' ? (
                      <textarea
                        value={templateVariables[variable.name] || ''}
                        onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                        placeholder={variable.placeholder}
                        className="w-full p-3 bg-glow-primary/10 border border-glow-primary/30 rounded-lg text-primary placeholder-secondary/50 focus:outline-none focus:border-glow-primary/50 min-h-[80px] resize-y"
                      />
                    ) : variable.type === 'select' ? (
                      <select
                        value={templateVariables[variable.name] || ''}
                        onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                        className="w-full p-3 bg-glow-primary/10 border border-glow-primary/30 rounded-lg text-primary focus:outline-none focus:border-glow-primary/50"
                      >
                        <option value="">Select an option...</option>
                        {variable.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={variable.type === 'number' ? 'number' : 'text'}
                        value={templateVariables[variable.name] || ''}
                        onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                        placeholder={variable.placeholder}
                        className="w-full p-3 bg-glow-primary/10 border border-glow-primary/30 rounded-lg text-primary placeholder-secondary/50 focus:outline-none focus:border-glow-primary/50"
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handlePreview}
                  className="flex-1 py-3 px-4 bg-glow-secondary/20 border border-glow-secondary/40 rounded-lg text-glow-secondary hover:bg-glow-secondary/30 transition-colors"
                >
                  👁️ Preview
                </button>
                <button
                  onClick={handleUseTemplate}
                  className="flex-1 py-3 px-4 bg-glow-primary/20 border border-glow-primary/40 rounded-lg text-glow-primary hover:bg-glow-primary/30 transition-colors"
                >
                  ✨ Use Template
                </button>
              </div>
            </div>
          </div>
          
          {/* Preview Panel */}
          <div className="space-y-6">
            {showPreview && (
              <div className="glow-card p-6">
                <Typography variant="body" color="primary" className="font-medium mb-4">
                  👁️ Template Preview
                </Typography>
                
                {templatePreview.systemPrompt && (
                  <div className="mb-4">
                    <Typography variant="caption" color="primary" className="font-medium mb-2 block">
                      System Prompt:
                    </Typography>
                    <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                      <Typography variant="caption" color="secondary" className="whitespace-pre-wrap">
                        {templatePreview.systemPrompt}
                      </Typography>
                    </div>
                  </div>
                )}
                
                <div className="mb-4">
                  <Typography variant="caption" color="primary" className="font-medium mb-2 block">
                    Main Prompt:
                  </Typography>
                  <div className="p-4 bg-glow-primary/5 border border-glow-primary/10 rounded-lg max-h-64 overflow-y-auto">
                    <Typography variant="caption" color="secondary" className="whitespace-pre-wrap">
                      {templatePreview.prompt}
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <Typography variant="caption" color="secondary">
                    Estimated tokens: {estimateTemplateTokens(selectedTemplate, templateVariables)}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    {templatePreview.prompt.split(/\s+/).length} words
                  </Typography>
                </div>
              </div>
            )}
            
            {/* Template Example */}
            {selectedTemplate.examples.length > 0 && (
              <div className="glow-card p-6">
                <Typography variant="body" color="primary" className="font-medium mb-4">
                  💡 Example Usage
                </Typography>
                
                <div className="space-y-4">
                  {selectedTemplate.examples[0] && (
                    <div>
                      <Typography variant="caption" color="primary" className="font-medium mb-2 block">
                        {selectedTemplate.examples[0].title}
                      </Typography>
                      <Typography variant="caption" color="secondary" className="mb-3 block">
                        {selectedTemplate.examples[0].description}
                      </Typography>
                      
                      <div className="space-y-2">
                        <Typography variant="caption" color="primary" className="font-medium">
                          Example variables:
                        </Typography>
                        {Object.entries(selectedTemplate.examples[0].variables).map(([key, value]) => (
                          <div key={key} className="flex">
                            <Typography variant="caption" color="secondary" className="w-24 flex-shrink-0">
                              {key}:
                            </Typography>
                            <Typography variant="caption" color="secondary">
                              {value}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => {
                    if (selectedTemplate.examples[0]) {
                      setTemplateVariables(selectedTemplate.examples[0].variables);
                    }
                  }}
                  className="mt-4 w-full py-2 px-4 bg-glow-secondary/20 border border-glow-secondary/40 rounded-lg text-glow-secondary hover:bg-glow-secondary/30 transition-colors"
                >
                  📝 Load Example Values
                </button>
              </div>
            )}
            
            {/* Recommended Models */}
            {selectedTemplate.recommendedModels.length > 0 && (
              <div className="glow-card p-6">
                <Typography variant="body" color="primary" className="font-medium mb-4">
                  🤖 Recommended Models
                </Typography>
                
                <div className="space-y-2">
                  {selectedTemplate.recommendedModels.map((model) => (
                    <div key={model} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-glow-primary rounded-full"></span>
                      <Typography variant="caption" color="secondary">
                        {model}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}