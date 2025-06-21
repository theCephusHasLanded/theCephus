// Types and interfaces for prompt engineering
export interface PromptAnalysis {
  complexity: 'simple' | 'moderate' | 'complex';
  category: PromptCategory;
  missingElements: string[];
  strengths: string[];
  tokenEstimate: number;
  suggestedImprovements: string[];
}

export interface OptimizedPrompt {
  content: string;
  explanation: string;
  improvements: string[];
  tokenCount: number;
  structure: PromptStructure;
}

export interface PromptStructure {
  role?: string;
  context?: string;
  task: string;
  constraints?: string[];
  format?: string;
  examples?: string[];
  steps?: string[];
}

export interface ConversationTurn {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    isQuestion?: boolean;
    questionType?: QuestionType;
    promptAnalysis?: PromptAnalysis;
    optimizedPrompt?: OptimizedPrompt;
    type?: 'comparison' | 'streaming_start' | 'streaming_end';
    original?: string;
    optimized?: OptimizedPrompt;
  };
}

export type PromptCategory = 
  | 'coding' 
  | 'writing' 
  | 'analysis' 
  | 'creative' 
  | 'research' 
  | 'business' 
  | 'education' 
  | 'general';

export type QuestionType = 
  | 'context' 
  | 'output_format' 
  | 'constraints' 
  | 'examples' 
  | 'tone' 
  | 'audience' 
  | 'complexity';

// Prompt templates for different categories
export const PROMPT_TEMPLATES: Record<PromptCategory, PromptStructure> = {
  coding: {
    role: "You are an expert software developer",
    context: "I need help with a programming task",
    task: "[Specific coding request]",
    constraints: ["Use best practices", "Include error handling", "Add comments"],
    format: "Provide code with explanations",
    examples: ["Show before/after code snippets"]
  },
  writing: {
    role: "You are a professional writer and editor",
    context: "I need assistance with writing content",
    task: "[Specific writing request]",
    constraints: ["Maintain consistent tone", "Target specific audience"],
    format: "Well-structured, engaging content",
    examples: ["Include examples of good writing in this style"]
  },
  analysis: {
    role: "You are a data analyst and critical thinker",
    context: "I need help analyzing information or data",
    task: "[Specific analysis request]",
    constraints: ["Be objective and evidence-based", "Consider multiple perspectives"],
    format: "Structured analysis with clear conclusions",
    examples: ["Provide concrete examples to support analysis"]
  },
  creative: {
    role: "You are a creative professional",
    context: "I need help with creative ideation or content",
    task: "[Specific creative request]",
    constraints: ["Be original and innovative", "Consider practical constraints"],
    format: "Creative, engaging output",
    examples: ["Show creative examples for inspiration"]
  },
  research: {
    role: "You are a research expert",
    context: "I need help with research and information gathering",
    task: "[Specific research request]",
    constraints: ["Use reliable sources", "Be thorough and accurate"],
    format: "Well-researched, cited information",
    examples: ["Include examples of quality research methods"]
  },
  business: {
    role: "You are a business consultant",
    context: "I need help with business-related tasks",
    task: "[Specific business request]",
    constraints: ["Consider ROI and practical implementation", "Be professional"],
    format: "Business-focused, actionable advice",
    examples: ["Provide real-world business examples"]
  },
  education: {
    role: "You are an expert educator",
    context: "I need help with educational content or learning",
    task: "[Specific educational request]",
    constraints: ["Make it accessible to the target audience", "Use pedagogical best practices"],
    format: "Clear, educational content with examples",
    examples: ["Include learning examples and exercises"]
  },
  general: {
    role: "You are a knowledgeable assistant",
    context: "I need help with a general task",
    task: "[Specific request]",
    constraints: ["Be helpful and accurate"],
    format: "Clear, well-structured response"
  }
};

// Analyze a prompt and identify areas for improvement
export function analyzePrompt(prompt: string): PromptAnalysis {
  const words = prompt.split(/\s+/).length;
  const tokenEstimate = Math.ceil(words * 1.3); // Rough token estimation
  
  const category = categorizePrompt(prompt);
  const complexity = assessComplexity(prompt);
  const missingElements = identifyMissingElements(prompt, category);
  const strengths = identifyStrengths(prompt);
  const suggestedImprovements = generateImprovements(prompt, missingElements);

  return {
    complexity,
    category,
    missingElements,
    strengths,
    tokenEstimate,
    suggestedImprovements
  };
}

// Categorize prompt based on content
function categorizePrompt(prompt: string): PromptCategory {
  const lowercasePrompt = prompt.toLowerCase();
  
  const keywords = {
    coding: ['code', 'program', 'function', 'debug', 'api', 'javascript', 'python', 'react', 'algorithm'],
    writing: ['write', 'essay', 'article', 'blog', 'content', 'copy', 'story', 'paragraph'],
    analysis: ['analyze', 'compare', 'evaluate', 'assess', 'review', 'examine', 'study'],
    creative: ['create', 'design', 'brainstorm', 'creative', 'innovative', 'idea', 'concept'],
    research: ['research', 'find', 'investigate', 'study', 'information', 'data', 'source'],
    business: ['business', 'strategy', 'marketing', 'sales', 'roi', 'profit', 'company'],
    education: ['teach', 'learn', 'explain', 'tutorial', 'lesson', 'education', 'course']
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => lowercasePrompt.includes(word))) {
      return category as PromptCategory;
    }
  }

  return 'general';
}

// Assess prompt complexity
function assessComplexity(prompt: string): 'simple' | 'moderate' | 'complex' {
  const words = prompt.split(/\s+/).length;
  const sentences = prompt.split(/[.!?]+/).length;
  const hasMultipleTasks = /and|also|additionally|furthermore/i.test(prompt);
  const hasConstraints = /must|should|need to|require|ensure/i.test(prompt);
  
  if (words < 20 && sentences <= 2 && !hasMultipleTasks) {
    return 'simple';
  } else if (words < 50 && sentences <= 4 && !hasMultipleTasks && !hasConstraints) {
    return 'moderate';
  } else {
    return 'complex';
  }
}

// Identify missing elements in a prompt
function identifyMissingElements(prompt: string, category: PromptCategory): string[] {
  const missing: string[] = [];
  const template = PROMPT_TEMPLATES[category];
  
  // Check for role definition
  if (!prompt.includes('you are') && !prompt.includes('act as') && template.role) {
    missing.push('role_definition');
  }
  
  // Check for context
  if (prompt.length < 50 && !prompt.includes('context') && !prompt.includes('background')) {
    missing.push('context');
  }
  
  // Check for output format specification
  if (!prompt.includes('format') && !prompt.includes('structure') && 
      !prompt.includes('list') && !prompt.includes('paragraph')) {
    missing.push('output_format');
  }
  
  // Check for examples
  if (!prompt.includes('example') && !prompt.includes('instance') && 
      !prompt.includes('like') && category !== 'general') {
    missing.push('examples');
  }
  
  // Check for constraints
  if (!prompt.includes('don\'t') && !prompt.includes('avoid') && 
      !prompt.includes('must') && !prompt.includes('should')) {
    missing.push('constraints');
  }
  
  // Check for audience specification
  if (!prompt.includes('audience') && !prompt.includes('for') && 
      (category === 'writing' || category === 'education' || category === 'business')) {
    missing.push('target_audience');
  }

  return missing;
}

// Identify strengths in a prompt
function identifyStrengths(prompt: string): string[] {
  const strengths: string[] = [];
  
  if (prompt.includes('you are') || prompt.includes('act as')) {
    strengths.push('Has role definition');
  }
  
  if (prompt.includes('example') || prompt.includes('instance')) {
    strengths.push('Includes examples');
  }
  
  if (prompt.includes('format') || prompt.includes('structure')) {
    strengths.push('Specifies output format');
  }
  
  if (prompt.includes('don\'t') || prompt.includes('avoid') || prompt.includes('must')) {
    strengths.push('Has clear constraints');
  }
  
  if (prompt.split(/\s+/).length > 30) {
    strengths.push('Detailed and specific');
  }
  
  if (prompt.includes('step') || prompt.includes('process')) {
    strengths.push('Requests structured approach');
  }

  return strengths;
}

// Generate improvement suggestions
function generateImprovements(prompt: string, missingElements: string[]): string[] {
  const improvements: string[] = [];
  
  missingElements.forEach(element => {
    switch (element) {
      case 'role_definition':
        improvements.push('Add a role definition (e.g., "You are an expert...")');
        break;
      case 'context':
        improvements.push('Provide more context about your situation or goal');
        break;
      case 'output_format':
        improvements.push('Specify the desired output format (list, paragraph, code, etc.)');
        break;
      case 'examples':
        improvements.push('Include examples to clarify what you\'re looking for');
        break;
      case 'constraints':
        improvements.push('Add constraints or requirements (what to avoid, must include, etc.)');
        break;
      case 'target_audience':
        improvements.push('Specify your target audience or who this is for');
        break;
    }
  });
  
  return improvements;
}

// Generate clarifying questions based on missing elements
export function generateClarifyingQuestions(analysis: PromptAnalysis, originalPrompt: string): ConversationTurn[] {
  const questions: ConversationTurn[] = [];
  
  analysis.missingElements.forEach((element, index) => {
    const question = createQuestionForElement(element, analysis.category, originalPrompt);
    if (question) {
      questions.push({
        id: `question_${index}`,
        type: 'bot',
        content: question.content,
        timestamp: new Date(),
        metadata: {
          isQuestion: true,
          questionType: question.type
        }
      });
    }
  });
  
  return questions;
}

// Create specific questions for missing elements
function createQuestionForElement(element: string, category: PromptCategory, prompt: string): 
  { content: string; type: QuestionType } | null {
  
  switch (element) {
    case 'role_definition':
      return {
        content: `What role or expertise should the AI assume? For example, should it act as a ${getRoleExample(category)}?`,
        type: 'context'
      };
    
    case 'context':
      return {
        content: 'Could you provide more context about your situation? What\'s the background or purpose of this request?',
        type: 'context'
      };
    
    case 'output_format':
      return {
        content: 'What format would you like the response in? (e.g., bullet points, detailed paragraphs, step-by-step guide, code blocks)',
        type: 'output_format'
      };
    
    case 'examples':
      return {
        content: 'Could you provide an example of what you\'re looking for? This will help me understand your expectations better.',
        type: 'examples'
      };
    
    case 'constraints':
      return {
        content: 'Are there any specific requirements, limitations, or things to avoid in the response?',
        type: 'constraints'
      };
    
    case 'target_audience':
      return {
        content: 'Who is the target audience for this? (e.g., beginners, experts, general public, children)',
        type: 'audience'
      };
    
    default:
      return null;
  }
}

// Get role examples for different categories
function getRoleExample(category: PromptCategory): string {
  const examples = {
    coding: 'senior software developer, code reviewer, or system architect',
    writing: 'professional writer, editor, or content strategist',
    analysis: 'data analyst, researcher, or consultant',
    creative: 'creative director, designer, or brainstorming facilitator',
    research: 'research specialist, academic, or fact-checker',
    business: 'business consultant, strategist, or advisor',
    education: 'teacher, tutor, or educational expert',
    general: 'knowledgeable assistant or subject matter expert'
  };
  
  return examples[category];
}

// Optimize a prompt based on analysis and user responses
export function optimizePrompt(
  originalPrompt: string, 
  analysis: PromptAnalysis, 
  userResponses: Record<string, string>
): OptimizedPrompt {
  const template = PROMPT_TEMPLATES[analysis.category];
  const structure: PromptStructure = { ...template };
  
  // Build optimized prompt structure
  const parts: string[] = [];
  
  // Role definition
  if (userResponses.role) {
    structure.role = userResponses.role;
    parts.push(userResponses.role);
  }
  
  // Context
  if (userResponses.context) {
    structure.context = userResponses.context;
    parts.push(userResponses.context);
  }
  
  // Main task
  structure.task = originalPrompt;
  parts.push(originalPrompt);
  
  // Constraints
  if (userResponses.constraints) {
    const constraints = userResponses.constraints.split(',').map(c => c.trim());
    structure.constraints = constraints;
    parts.push(`Requirements: ${constraints.join(', ')}`);
  }
  
  // Output format
  if (userResponses.output_format) {
    structure.format = userResponses.output_format;
    parts.push(`Format: ${userResponses.output_format}`);
  }
  
  // Examples
  if (userResponses.examples) {
    structure.examples = [userResponses.examples];
    parts.push(`Example: ${userResponses.examples}`);
  }
  
  // Target audience
  if (userResponses.target_audience) {
    parts.push(`Target audience: ${userResponses.target_audience}`);
  }
  
  const optimizedContent = parts.join('\n\n');
  const tokenCount = Math.ceil(optimizedContent.split(/\s+/).length * 1.3);
  
  const improvements = generateOptimizationExplanation(originalPrompt, optimizedContent, analysis);
  
  return {
    content: optimizedContent,
    explanation: `Optimized your ${analysis.category} prompt by adding ${analysis.missingElements.length} missing elements.`,
    improvements,
    tokenCount,
    structure
  };
}

// Generate explanation of optimizations made
function generateOptimizationExplanation(
  original: string, 
  optimized: string, 
  analysis: PromptAnalysis
): string[] {
  const improvements: string[] = [];
  
  if (optimized.includes('You are') && !original.includes('You are')) {
    improvements.push('Added role definition for better context');
  }
  
  if (optimized.includes('Format:') && !original.includes('format')) {
    improvements.push('Specified output format for clarity');
  }
  
  if (optimized.includes('Requirements:') && !original.includes('must')) {
    improvements.push('Added constraints and requirements');
  }
  
  if (optimized.includes('Example:') && !original.includes('example')) {
    improvements.push('Included examples for better understanding');
  }
  
  if (optimized.length > original.length * 1.5) {
    improvements.push('Enhanced specificity and detail');
  }
  
  return improvements;
}

// Export functionality
export function exportPrompt(prompt: OptimizedPrompt, format: 'txt' | 'md' | 'json' = 'md'): string {
  switch (format) {
    case 'txt':
      return prompt.content;
    
    case 'json':
      return JSON.stringify(prompt, null, 2);
    
    case 'md':
    default:
      return `# Optimized Prompt

## Content
${prompt.content}

## Explanation
${prompt.explanation}

## Improvements Made
${prompt.improvements.map(imp => `- ${imp}`).join('\n')}

## Token Count
${prompt.tokenCount} tokens

## Structure
- **Role**: ${prompt.structure.role || 'Not specified'}
- **Context**: ${prompt.structure.context || 'Not specified'}
- **Task**: ${prompt.structure.task}
- **Format**: ${prompt.structure.format || 'Not specified'}
- **Constraints**: ${prompt.structure.constraints?.join(', ') || 'None specified'}

---
*Generated by AI Prompt Engineering Assistant*
`;
  }
}

// Token optimization suggestions
export function suggestTokenOptimizations(prompt: string): string[] {
  const suggestions: string[] = [];
  
  if (prompt.includes('please') || prompt.includes('thank you')) {
    suggestions.push('Remove politeness words (please, thank you) to save tokens');
  }
  
  if (prompt.match(/\b(very|really|quite|pretty|extremely)\b/gi)) {
    suggestions.push('Remove unnecessary adverbs to reduce token count');
  }
  
  if (prompt.includes('I want you to') || prompt.includes('Can you')) {
    suggestions.push('Use direct commands instead of requests ("Create..." vs "Can you create...")');
  }
  
  if (prompt.split('\n\n').length > 5) {
    suggestions.push('Consider breaking complex prompts into multiple focused prompts');
  }
  
  return suggestions;
}