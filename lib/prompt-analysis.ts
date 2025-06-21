// Advanced Prompt Analysis and Optimization System

export interface PromptAnalysis {
  score: number; // 0-100 quality score
  category: PromptCategory;
  complexity: 'simple' | 'moderate' | 'complex' | 'expert';
  issues: PromptIssue[];
  strengths: string[];
  suggestions: PromptSuggestion[];
  missingElements: MissingElement[];
  tokenEstimate: number;
  contextRequirement: 'low' | 'medium' | 'high' | 'extreme';
  improvementPotential: number; // 0-100
}

export interface PromptIssue {
  type: 'critical' | 'warning' | 'suggestion';
  category: string;
  message: string;
  fix?: string;
  priority: number;
}

export interface PromptSuggestion {
  type: 'structure' | 'clarity' | 'specificity' | 'examples' | 'constraints';
  description: string;
  example?: string;
  impact: 'high' | 'medium' | 'low';
}

export interface MissingElement {
  element: string;
  importance: 'critical' | 'important' | 'optional';
  description: string;
  question: string;
  example?: string;
}

export type PromptCategory = 
  | 'coding' 
  | 'writing' 
  | 'analysis' 
  | 'creative' 
  | 'research' 
  | 'business' 
  | 'education'
  | 'conversation'
  | 'technical'
  | 'general';

export interface OptimizedPrompt {
  content: string;
  systemPrompt?: string;
  explanation: string;
  improvements: string[];
  structure: PromptStructure;
  metadata: {
    originalScore: number;
    optimizedScore: number;
    tokenCount: number;
    estimatedCost: number;
    timeToOptimize: number;
  };
}

export interface PromptStructure {
  role?: string;
  context?: string;
  task: string;
  constraints?: string[];
  format?: string;
  examples?: string[];
  steps?: string[];
  tone?: string;
  audience?: string;
}

export interface ConversationContext {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    analysis?: PromptAnalysis;
  }>;
  currentPrompt: string;
  optimizedPrompt?: OptimizedPrompt;
  userResponses: Record<string, string>;
  phase: 'analysis' | 'questioning' | 'optimization' | 'refinement' | 'complete';
  questionsAsked: string[];
  improvementHistory: Array<{
    version: number;
    prompt: string;
    score: number;
    changes: string[];
  }>;
}

// Prompt quality scoring weights
const SCORING_WEIGHTS = {
  clarity: 0.25,
  specificity: 0.20,
  structure: 0.15,
  context: 0.15,
  examples: 0.10,
  constraints: 0.10,
  completeness: 0.05
};

// Category detection patterns
const CATEGORY_PATTERNS = {
  coding: [
    'code', 'program', 'function', 'class', 'method', 'variable', 'algorithm',
    'debug', 'fix', 'implement', 'refactor', 'optimize', 'api', 'database',
    'javascript', 'python', 'react', 'typescript', 'sql', 'git', 'test'
  ],
  writing: [
    'write', 'essay', 'article', 'blog', 'story', 'content', 'copy', 'draft',
    'edit', 'proofread', 'tone', 'style', 'narrative', 'paragraph', 'chapter'
  ],
  analysis: [
    'analyze', 'compare', 'evaluate', 'assess', 'review', 'examine', 'study',
    'investigate', 'breakdown', 'critique', 'interpret', 'summarize'
  ],
  creative: [
    'create', 'design', 'brainstorm', 'imagine', 'invent', 'generate',
    'creative', 'artistic', 'innovative', 'original', 'unique', 'concept'
  ],
  research: [
    'research', 'find', 'investigate', 'explore', 'discover', 'learn',
    'information', 'data', 'facts', 'sources', 'evidence', 'study'
  ],
  business: [
    'business', 'strategy', 'marketing', 'sales', 'revenue', 'profit',
    'plan', 'proposal', 'meeting', 'presentation', 'roi', 'kpi'
  ],
  education: [
    'teach', 'learn', 'explain', 'tutorial', 'lesson', 'course',
    'student', 'homework', 'quiz', 'exam', 'curriculum', 'education'
  ]
};

// Analyze prompt comprehensively
export function analyzePrompt(prompt: string): PromptAnalysis {
  const category = detectCategory(prompt);
  const complexity = assessComplexity(prompt);
  const issues = identifyIssues(prompt);
  const strengths = identifyStrengths(prompt);
  const suggestions = generateSuggestions(prompt, category, issues);
  const missingElements = identifyMissingElements(prompt, category);
  const tokenEstimate = estimateTokens(prompt);
  const contextRequirement = assessContextRequirement(prompt, tokenEstimate);
  const score = calculateQualityScore(prompt, issues, strengths);
  const improvementPotential = Math.max(0, 100 - score);

  return {
    score,
    category,
    complexity,
    issues,
    strengths,
    suggestions,
    missingElements,
    tokenEstimate,
    contextRequirement,
    improvementPotential
  };
}

function detectCategory(prompt: string): PromptCategory {
  const lowerPrompt = prompt.toLowerCase();
  const scores: Record<PromptCategory, number> = {
    coding: 0, writing: 0, analysis: 0, creative: 0, research: 0,
    business: 0, education: 0, conversation: 0, technical: 0, general: 0
  };

  // Score based on keyword matches
  Object.entries(CATEGORY_PATTERNS).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (lowerPrompt.includes(keyword)) {
        scores[category as PromptCategory] += 1;
      }
    });
  });

  // Additional context-based scoring
  if (lowerPrompt.includes('explain') || lowerPrompt.includes('how to')) {
    scores.education += 2;
  }
  
  if (lowerPrompt.includes('chat') || lowerPrompt.includes('talk') || lowerPrompt.includes('conversation')) {
    scores.conversation += 2;
  }

  if (lowerPrompt.includes('technical') || lowerPrompt.includes('documentation')) {
    scores.technical += 2;
  }

  // Find highest scoring category
  const topCategory = Object.entries(scores).reduce((a, b) => 
    scores[a[0] as PromptCategory] > scores[b[0] as PromptCategory] ? a : b
  )[0] as PromptCategory;

  return scores[topCategory] > 0 ? topCategory : 'general';
}

function assessComplexity(prompt: string): 'simple' | 'moderate' | 'complex' | 'expert' {
  const words = prompt.split(/\s+/).length;
  const sentences = prompt.split(/[.!?]+/).length;
  const hasMultipleTasks = /and|also|additionally|furthermore|then|next|after/i.test(prompt);
  const hasConditionals = /if|when|unless|provided|given|assuming/i.test(prompt);
  const hasSpecializations = /expert|advanced|professional|technical|specialized/i.test(prompt);
  const hasConstraints = /must|should|need to|require|ensure|avoid|don't|never/i.test(prompt);
  const hasExamples = /example|instance|like|such as|for example|e\.g\./i.test(prompt);

  let complexityScore = 0;
  
  if (words > 50) complexityScore += 1;
  if (words > 100) complexityScore += 1;
  if (sentences > 5) complexityScore += 1;
  if (hasMultipleTasks) complexityScore += 1;
  if (hasConditionals) complexityScore += 1;
  if (hasSpecializations) complexityScore += 1;
  if (hasConstraints) complexityScore += 1;
  if (hasExamples) complexityScore += 1;

  if (complexityScore >= 6) return 'expert';
  if (complexityScore >= 4) return 'complex';
  if (complexityScore >= 2) return 'moderate';
  return 'simple';
}

function identifyIssues(prompt: string): PromptIssue[] {
  const issues: PromptIssue[] = [];
  const words = prompt.split(/\s+/).length;

  // Too short
  if (words < 5) {
    issues.push({
      type: 'critical',
      category: 'length',
      message: 'Prompt is too short and lacks necessary detail',
      fix: 'Add more context and specific requirements',
      priority: 10
    });
  }

  // Too long without structure
  if (words > 200 && !prompt.includes('\n') && !prompt.includes('-') && !prompt.includes('1.')) {
    issues.push({
      type: 'warning',
      category: 'structure',
      message: 'Long prompt lacks clear structure',
      fix: 'Break into sections with bullet points or numbered steps',
      priority: 7
    });
  }

  // Vague language
  const vagueWords = ['something', 'anything', 'stuff', 'things', 'good', 'nice', 'better'];
  const hasVagueWords = vagueWords.some(word => prompt.toLowerCase().includes(word));
  if (hasVagueWords) {
    issues.push({
      type: 'warning',
      category: 'specificity',
      message: 'Contains vague language that may lead to unclear results',
      fix: 'Replace vague terms with specific requirements',
      priority: 6
    });
  }

  // No clear task
  const hasImperative = /^(create|write|analyze|explain|generate|build|make|design|help)/i.test(prompt.trim());
  const hasQuestion = prompt.includes('?');
  if (!hasImperative && !hasQuestion) {
    issues.push({
      type: 'critical',
      category: 'clarity',
      message: 'No clear task or question identified',
      fix: 'Start with a clear action verb or question',
      priority: 9
    });
  }

  // Multiple unrelated tasks
  const taskIndicators = prompt.toLowerCase().match(/(and then|also|additionally|furthermore)/g);
  if (taskIndicators && taskIndicators.length > 2) {
    issues.push({
      type: 'suggestion',
      category: 'focus',
      message: 'Contains multiple tasks that might be better separated',
      fix: 'Consider breaking into separate prompts for better results',
      priority: 4
    });
  }

  // No context for complex tasks
  if (words > 50 && !prompt.toLowerCase().includes('context') && 
      !prompt.toLowerCase().includes('background') && 
      !prompt.toLowerCase().includes('for')) {
    issues.push({
      type: 'warning',
      category: 'context',
      message: 'Complex task lacks context or background information',
      fix: 'Add relevant background or context for better results',
      priority: 5
    });
  }

  return issues.sort((a, b) => b.priority - a.priority);
}

function identifyStrengths(prompt: string): string[] {
  const strengths: string[] = [];

  if (/^(create|write|analyze|explain|generate|build|make|design)/i.test(prompt.trim())) {
    strengths.push('Clear action verb at the start');
  }

  if (prompt.includes('example') || prompt.includes('instance') || prompt.includes('like')) {
    strengths.push('Includes examples for clarity');
  }

  if (prompt.includes('format') || prompt.includes('structure') || prompt.includes('layout')) {
    strengths.push('Specifies output format');
  }

  if (prompt.includes('don\'t') || prompt.includes('avoid') || prompt.includes('must') || prompt.includes('ensure')) {
    strengths.push('Contains helpful constraints');
  }

  if (prompt.includes('audience') || prompt.includes('for') && prompt.includes('user')) {
    strengths.push('Considers target audience');
  }

  if (prompt.includes('step') || prompt.includes('process') || prompt.includes('method')) {
    strengths.push('Requests structured approach');
  }

  const words = prompt.split(/\s+/).length;
  if (words >= 20 && words <= 150) {
    strengths.push('Appropriate length with good detail');
  }

  if (prompt.includes('context') || prompt.includes('background')) {
    strengths.push('Provides context information');
  }

  return strengths;
}

function generateSuggestions(prompt: string, category: PromptCategory, issues: PromptIssue[]): PromptSuggestion[] {
  const suggestions: PromptSuggestion[] = [];

  // Structure suggestions
  if (!prompt.includes('\n') && prompt.split(/\s+/).length > 50) {
    suggestions.push({
      type: 'structure',
      description: 'Break prompt into clear sections',
      example: 'Use headers like "Context:", "Task:", "Requirements:"',
      impact: 'high'
    });
  }

  // Specificity suggestions
  if (issues.some(i => i.category === 'specificity')) {
    suggestions.push({
      type: 'specificity',
      description: 'Add specific details and requirements',
      example: 'Instead of "make it good", specify "use professional tone, 500 words, include statistics"',
      impact: 'high'
    });
  }

  // Examples suggestion
  if (!prompt.includes('example') && category !== 'conversation') {
    suggestions.push({
      type: 'examples',
      description: 'Include examples to clarify expectations',
      example: 'Add "For example:" followed by a sample of desired output',
      impact: 'medium'
    });
  }

  // Constraints suggestion
  if (!prompt.includes('don\'t') && !prompt.includes('avoid') && !prompt.includes('must')) {
    suggestions.push({
      type: 'constraints',
      description: 'Add constraints to guide the response',
      example: 'Include what to avoid or specific requirements to follow',
      impact: 'medium'
    });
  }

  // Clarity suggestion for questions
  if (prompt.includes('?') && !prompt.toLowerCase().startsWith('what') && 
      !prompt.toLowerCase().startsWith('how') && !prompt.toLowerCase().startsWith('why')) {
    suggestions.push({
      type: 'clarity',
      description: 'Rephrase question for better clarity',
      example: 'Start with "What", "How", or "Why" for clearer questions',
      impact: 'medium'
    });
  }

  return suggestions;
}

function identifyMissingElements(prompt: string, category: PromptCategory): MissingElement[] {
  const missing: MissingElement[] = [];

  // Role definition
  if (!prompt.toLowerCase().includes('you are') && !prompt.toLowerCase().includes('act as') && 
      !prompt.toLowerCase().includes('as a') && category !== 'conversation') {
    missing.push({
      element: 'role',
      importance: 'important',
      description: 'Define the AI\'s role or expertise',
      question: 'What role or expertise should the AI assume for this task?',
      example: 'You are an expert software developer...'
    });
  }

  // Context
  if (prompt.split(/\s+/).length < 30 && !prompt.includes('context') && !prompt.includes('background')) {
    missing.push({
      element: 'context',
      importance: 'important',
      description: 'Provide background or situational context',
      question: 'What background information would help the AI understand the situation better?'
    });
  }

  // Output format
  if (!prompt.includes('format') && !prompt.includes('structure') && !prompt.includes('list') && 
      !prompt.includes('paragraph') && category !== 'conversation') {
    missing.push({
      element: 'format',
      importance: 'optional',
      description: 'Specify desired output format',
      question: 'How would you like the response formatted?',
      example: 'Provide as a bulleted list, markdown table, or structured paragraphs'
    });
  }

  // Target audience
  if (!prompt.includes('audience') && !prompt.includes('for') && 
      (category === 'writing' || category === 'education' || category === 'business')) {
    missing.push({
      element: 'audience',
      importance: 'important',
      description: 'Define the target audience',
      question: 'Who is the intended audience for this content?',
      example: 'For beginners, experts, general public, children, etc.'
    });
  }

  // Examples
  if (!prompt.includes('example') && !prompt.includes('instance') && category !== 'conversation') {
    missing.push({
      element: 'examples',
      importance: 'optional',
      description: 'Provide examples to clarify expectations',
      question: 'Can you provide an example of what you\'re looking for?'
    });
  }

  // Constraints
  if (!prompt.includes('don\'t') && !prompt.includes('avoid') && !prompt.includes('must') && 
      !prompt.includes('should') && category !== 'conversation') {
    missing.push({
      element: 'constraints',
      importance: 'optional',
      description: 'Add requirements or limitations',
      question: 'Are there any specific requirements, limitations, or things to avoid?'
    });
  }

  return missing.sort((a, b) => {
    const importanceOrder = { critical: 3, important: 2, optional: 1 };
    return importanceOrder[b.importance] - importanceOrder[a.importance];
  });
}

function estimateTokens(prompt: string): number {
  // Rough estimation: 1 token ≈ 0.75 words
  const words = prompt.split(/\s+/).length;
  return Math.ceil(words * 1.33);
}

function assessContextRequirement(prompt: string, tokens: number): 'low' | 'medium' | 'high' | 'extreme' {
  if (tokens > 8000) return 'extreme';
  if (tokens > 4000) return 'high';
  if (tokens > 1000) return 'medium';
  return 'low';
}

function calculateQualityScore(prompt: string, issues: PromptIssue[], strengths: string[]): number {
  let score = 50; // Base score

  // Add points for strengths
  score += strengths.length * 8;

  // Deduct points for issues
  issues.forEach(issue => {
    switch (issue.type) {
      case 'critical':
        score -= 25;
        break;
      case 'warning':
        score -= 15;
        break;
      case 'suggestion':
        score -= 5;
        break;
    }
  });

  // Bonus points for good practices
  const words = prompt.split(/\s+/).length;
  if (words >= 20 && words <= 150) score += 10;
  if (prompt.includes('example')) score += 5;
  if (prompt.includes('format')) score += 5;
  if (prompt.toLowerCase().includes('you are')) score += 5;

  return Math.max(0, Math.min(100, score));
}

// Generate clarifying questions based on missing elements
export function generateClarifyingQuestions(analysis: PromptAnalysis): string[] {
  return analysis.missingElements
    .filter(element => element.importance === 'critical' || element.importance === 'important')
    .slice(0, 3) // Limit to 3 questions at a time
    .map(element => element.question);
}

// Create optimized prompt
export function optimizePrompt(
  originalPrompt: string, 
  analysis: PromptAnalysis, 
  userResponses: Record<string, string>
): OptimizedPrompt {
  const structure: PromptStructure = {
    task: originalPrompt
  };

  let optimizedParts: string[] = [];
  let systemPromptParts: string[] = [];

  // Add role if provided
  if (userResponses.role) {
    structure.role = userResponses.role;
    systemPromptParts.push(userResponses.role);
  }

  // Add context if provided
  if (userResponses.context) {
    structure.context = userResponses.context;
    optimizedParts.push(`Context: ${userResponses.context}`);
  }

  // Main task
  optimizedParts.push(`Task: ${originalPrompt}`);

  // Add format if specified
  if (userResponses.format) {
    structure.format = userResponses.format;
    optimizedParts.push(`Format: ${userResponses.format}`);
  }

  // Add constraints if provided
  if (userResponses.constraints) {
    const constraints = userResponses.constraints.split(',').map(c => c.trim());
    structure.constraints = constraints;
    optimizedParts.push(`Requirements: ${constraints.join(', ')}`);
  }

  // Add examples if provided
  if (userResponses.examples) {
    structure.examples = [userResponses.examples];
    optimizedParts.push(`Example: ${userResponses.examples}`);
  }

  // Add audience if specified
  if (userResponses.audience) {
    structure.audience = userResponses.audience;
    optimizedParts.push(`Audience: ${userResponses.audience}`);
  }

  const optimizedContent = optimizedParts.join('\n\n');
  const systemPrompt = systemPromptParts.length > 0 ? systemPromptParts.join('. ') : undefined;
  const tokenCount = estimateTokens(optimizedContent);
  const optimizedScore = Math.min(100, analysis.score + 30);

  return {
    content: optimizedContent,
    systemPrompt,
    explanation: `Improved prompt by adding ${analysis.missingElements.length} missing elements and addressing ${analysis.issues.length} issues.`,
    improvements: generateImprovementList(analysis, userResponses),
    structure,
    metadata: {
      originalScore: analysis.score,
      optimizedScore,
      tokenCount,
      estimatedCost: 0, // Will be calculated with specific model
      timeToOptimize: Date.now()
    }
  };
}

function generateImprovementList(analysis: PromptAnalysis, userResponses: Record<string, string>): string[] {
  const improvements: string[] = [];

  if (userResponses.role) improvements.push('Added role definition for better context');
  if (userResponses.context) improvements.push('Provided background context');
  if (userResponses.format) improvements.push('Specified output format');
  if (userResponses.constraints) improvements.push('Added requirements and constraints');
  if (userResponses.examples) improvements.push('Included examples for clarity');
  if (userResponses.audience) improvements.push('Defined target audience');

  // Add issue-based improvements
  analysis.issues.forEach(issue => {
    if (issue.type === 'critical') {
      improvements.push(`Fixed critical issue: ${issue.message}`);
    }
  });

  return improvements;
}

// Export optimized prompt to various formats
export function exportPrompt(optimized: OptimizedPrompt, format: 'markdown' | 'json' | 'text' = 'markdown'): string {
  switch (format) {
    case 'json':
      return JSON.stringify(optimized, null, 2);
    
    case 'text':
      return optimized.systemPrompt 
        ? `${optimized.systemPrompt}\n\n${optimized.content}`
        : optimized.content;
    
    case 'markdown':
    default:
      return `# Optimized Prompt

## System Prompt
${optimized.systemPrompt || 'None specified'}

## Main Prompt
${optimized.content}

## Analysis
- **Original Score**: ${optimized.metadata.originalScore}/100
- **Optimized Score**: ${optimized.metadata.optimizedScore}/100
- **Token Count**: ${optimized.metadata.tokenCount}

## Improvements Made
${optimized.improvements.map(imp => `- ${imp}`).join('\n')}

## Explanation
${optimized.explanation}

## Structure
- **Role**: ${optimized.structure.role || 'Not specified'}
- **Context**: ${optimized.structure.context || 'Not specified'}
- **Task**: ${optimized.structure.task}
- **Format**: ${optimized.structure.format || 'Not specified'}
- **Audience**: ${optimized.structure.audience || 'Not specified'}
- **Constraints**: ${optimized.structure.constraints?.join(', ') || 'None specified'}

---
*Generated by AI Prompt Engineering Assistant*
`;
  }
}