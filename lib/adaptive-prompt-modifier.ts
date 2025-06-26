// Adaptive Prompt Modification System - Self-Evolving Prompt Enhancement
import { AIModel } from './ai-models';
import { LearnedPattern, MemoryEntry } from './agentic-core';
import { ModelResponse, FeedbackCriteria } from './multi-llm-tracker';
import { OptimizationStrategy } from './inference-optimizer';

export interface AdaptiveModification {
  id: string;
  type: ModificationType;
  trigger: ModificationTrigger;
  transformation: PromptTransformation;
  effectiveness: number;
  confidence: number;
  learningHistory: ModificationHistory[];
  applicableContexts: string[];
}

export type ModificationType = 
  | 'context_enhancement' 
  | 'structure_optimization' 
  | 'clarity_improvement' 
  | 'specificity_boost' 
  | 'creativity_enhancement'
  | 'safety_reinforcement'
  | 'efficiency_optimization'
  | 'personalization';

export interface ModificationTrigger {
  condition: TriggerCondition;
  threshold: number;
  priority: number;
}

export interface TriggerCondition {
  type: 'quality_score' | 'response_time' | 'user_satisfaction' | 'error_rate' | 'pattern_match';
  operator: '<' | '>' | '=' | 'contains' | 'not_contains';
  value: any;
  timeWindow?: number; // minutes
}

export interface PromptTransformation {
  method: TransformationMethod;
  parameters: TransformationParameters;
  validation: ValidationRule[];
}

export type TransformationMethod = 
  | 'template_injection'
  | 'pattern_application'
  | 'semantic_enhancement'
  | 'structural_reorganization'
  | 'contextual_expansion'
  | 'constraint_addition'
  | 'example_integration'
  | 'tone_adjustment';

export interface TransformationParameters {
  intensity: number; // 0-1 scale
  preserveOriginal: boolean;
  targetAspects: string[];
  customRules: string[];
}

export interface ValidationRule {
  type: 'length_check' | 'coherence_check' | 'safety_check' | 'format_check';
  constraint: any;
  required: boolean;
}

export interface ModificationHistory {
  timestamp: Date;
  originalPrompt: string;
  modifiedPrompt: string;
  context: ModificationContext;
  result: ModificationResult;
}

export interface ModificationContext {
  domain: string;
  userIntent: string;
  model: AIModel;
  previousAttempts: number;
  environmentFactors: Record<string, any>;
}

export interface ModificationResult {
  qualityImprovement: number;
  performanceImpact: number;
  userAcceptance: number;
  unexpectedEffects: string[];
}

export interface AdaptivePromptRequest {
  originalPrompt: string;
  context: ModificationContext;
  targetCriteria: FeedbackCriteria;
  constraints: ModificationConstraints;
  learningMode: 'conservative' | 'balanced' | 'aggressive';
}

export interface ModificationConstraints {
  maxLengthIncrease: number;
  preserveKeywords: string[];
  forbiddenTransformations: ModificationType[];
  safetyLevel: 'low' | 'medium' | 'high';
}

export interface AdaptivePromptResult {
  modifiedPrompt: string;
  appliedModifications: AppliedModification[];
  confidence: number;
  reasoning: string;
  alternativeVersions: string[];
  rollbackPlan: RollbackPlan;
}

export interface AppliedModification {
  id: string;
  type: ModificationType;
  description: string;
  impact: number;
  reversible: boolean;
}

export interface RollbackPlan {
  triggers: string[];
  fallbackPrompt: string;
  monitoringMetrics: string[];
}

export interface ModificationPattern {
  id: string;
  pattern: string;
  context: string;
  effectiveness: number;
  frequency: number;
  lastUsed: Date;
  successMetrics: SuccessMetric[];
}

export interface SuccessMetric {
  metric: string;
  improvement: number;
  confidence: number;
  sampleSize: number;
}

// Adaptive Prompt Modification Engine
export class AdaptivePromptModifier {
  private modifications: Map<string, AdaptiveModification> = new Map();
  private patterns: Map<string, ModificationPattern> = new Map();
  private history: ModificationHistory[] = [];
  private evolutionStrategies: Map<string, EvolutionStrategy> = new Map();
  private performanceBaseline: Map<string, number> = new Map();

  constructor() {
    this.initializeModifications();
    this.initializeEvolutionStrategies();
  }

  private initializeModifications(): void {
    // Context Enhancement
    this.modifications.set('context_enhancement', {
      id: 'context_enhancement',
      type: 'context_enhancement',
      trigger: {
        condition: { type: 'quality_score', operator: '<', value: 70 },
        threshold: 0.7,
        priority: 8
      },
      transformation: {
        method: 'contextual_expansion',
        parameters: {
          intensity: 0.6,
          preserveOriginal: true,
          targetAspects: ['background', 'requirements', 'expectations'],
          customRules: []
        },
        validation: [
          { type: 'length_check', constraint: { maxIncrease: 200 }, required: true },
          { type: 'coherence_check', constraint: { minScore: 0.8 }, required: true }
        ]
      },
      effectiveness: 0.75,
      confidence: 0.85,
      learningHistory: [],
      applicableContexts: ['technical', 'creative', 'business']
    });

    // Structure Optimization
    this.modifications.set('structure_optimization', {
      id: 'structure_optimization',
      type: 'structure_optimization',
      trigger: {
        condition: { type: 'response_time', operator: '>', value: 8000 },
        threshold: 0.6,
        priority: 7
      },
      transformation: {
        method: 'structural_reorganization',
        parameters: {
          intensity: 0.8,
          preserveOriginal: false,
          targetAspects: ['clarity', 'flow', 'logical_order'],
          customRules: ['bullet_points', 'numbered_lists', 'clear_sections']
        },
        validation: [
          { type: 'format_check', constraint: { requireStructure: true }, required: true }
        ]
      },
      effectiveness: 0.82,
      confidence: 0.90,
      learningHistory: [],
      applicableContexts: ['all']
    });

    // Clarity Improvement
    this.modifications.set('clarity_improvement', {
      id: 'clarity_improvement',
      type: 'clarity_improvement',
      trigger: {
        condition: { type: 'user_satisfaction', operator: '<', value: 0.6 },
        threshold: 0.5,
        priority: 9
      },
      transformation: {
        method: 'semantic_enhancement',
        parameters: {
          intensity: 0.7,
          preserveOriginal: true,
          targetAspects: ['precision', 'specificity', 'unambiguity'],
          customRules: ['define_terms', 'provide_examples', 'clarify_intent']
        },
        validation: [
          { type: 'coherence_check', constraint: { minScore: 0.9 }, required: true },
          { type: 'safety_check', constraint: { level: 'high' }, required: true }
        ]
      },
      effectiveness: 0.88,
      confidence: 0.92,
      learningHistory: [],
      applicableContexts: ['all']
    });

    // Creativity Enhancement
    this.modifications.set('creativity_enhancement', {
      id: 'creativity_enhancement',
      type: 'creativity_enhancement',
      trigger: {
        condition: { type: 'pattern_match', operator: 'contains', value: 'creative' },
        threshold: 0.8,
        priority: 6
      },
      transformation: {
        method: 'template_injection',
        parameters: {
          intensity: 0.9,
          preserveOriginal: true,
          targetAspects: ['innovation', 'exploration', 'originality'],
          customRules: ['encourage_brainstorming', 'multiple_perspectives', 'novel_approaches']
        },
        validation: [
          { type: 'safety_check', constraint: { level: 'medium' }, required: true }
        ]
      },
      effectiveness: 0.78,
      confidence: 0.80,
      learningHistory: [],
      applicableContexts: ['creative', 'marketing', 'ideation']
    });

    // Safety Reinforcement
    this.modifications.set('safety_reinforcement', {
      id: 'safety_reinforcement',
      type: 'safety_reinforcement',
      trigger: {
        condition: { type: 'pattern_match', operator: 'contains', value: 'sensitive' },
        threshold: 0.9,
        priority: 10
      },
      transformation: {
        method: 'constraint_addition',
        parameters: {
          intensity: 1.0,
          preserveOriginal: true,
          targetAspects: ['ethics', 'safety', 'responsibility'],
          customRules: ['ethical_guidelines', 'safety_warnings', 'responsible_use']
        },
        validation: [
          { type: 'safety_check', constraint: { level: 'high' }, required: true }
        ]
      },
      effectiveness: 0.95,
      confidence: 0.98,
      learningHistory: [],
      applicableContexts: ['all']
    });
  }

  private initializeEvolutionStrategies(): void {
    // Genetic Algorithm Strategy
    this.evolutionStrategies.set('genetic', {
      id: 'genetic',
      name: 'Genetic Evolution',
      description: 'Evolve prompts through mutation and crossover',
      parameters: {
        populationSize: 10,
        mutationRate: 0.1,
        crossoverRate: 0.7,
        eliteSize: 2
      }
    });

    // Reinforcement Learning Strategy
    this.evolutionStrategies.set('reinforcement', {
      id: 'reinforcement',
      name: 'Reinforcement Learning',
      description: 'Learn optimal modifications through reward feedback',
      parameters: {
        learningRate: 0.1,
        explorationRate: 0.2,
        discountFactor: 0.9
      }
    });

    // Hill Climbing Strategy
    this.evolutionStrategies.set('hill_climbing', {
      id: 'hill_climbing',
      name: 'Hill Climbing',
      description: 'Iteratively improve prompts through local optimization',
      parameters: {
        stepSize: 0.1,
        maxIterations: 5,
        improvementThreshold: 0.05
      }
    });
  }

  // Main adaptive modification method
  async adaptPrompt(request: AdaptivePromptRequest): Promise<AdaptivePromptResult> {
    // Analyze current prompt state
    const analysis = await this.analyzePrompt(request.originalPrompt, request.context);
    
    // Identify applicable modifications
    const applicableModifications = this.identifyApplicableModifications(
      request, 
      analysis
    );
    
    // Select optimal modifications based on learning mode
    const selectedModifications = this.selectOptimalModifications(
      applicableModifications,
      request.learningMode,
      request.targetCriteria
    );
    
    // Apply modifications
    const modifiedPrompt = await this.applyModifications(
      request.originalPrompt,
      selectedModifications,
      request.constraints
    );
    
    // Generate alternatives using evolution strategies
    const alternativeVersions = await this.generateAlternatives(
      request.originalPrompt,
      modifiedPrompt,
      request.context
    );
    
    // Create rollback plan
    const rollbackPlan = this.createRollbackPlan(
      request.originalPrompt,
      modifiedPrompt,
      selectedModifications
    );
    
    // Calculate confidence
    const confidence = this.calculateConfidence(
      selectedModifications,
      analysis,
      request.context
    );
    
    return {
      modifiedPrompt,
      appliedModifications: selectedModifications.map(m => ({
        id: m.id,
        type: m.type,
        description: this.generateModificationDescription(m),
        impact: m.effectiveness,
        reversible: this.isReversible(m)
      })),
      confidence,
      reasoning: this.generateReasoning(selectedModifications, analysis),
      alternativeVersions,
      rollbackPlan
    };
  }

  // Learn from modification results
  async learnFromResult(
    originalRequest: AdaptivePromptRequest,
    result: AdaptivePromptResult,
    actualOutcome: ModificationResult
  ): Promise<void> {
    // Record history
    const historyEntry: ModificationHistory = {
      timestamp: new Date(),
      originalPrompt: originalRequest.originalPrompt,
      modifiedPrompt: result.modifiedPrompt,
      context: originalRequest.context,
      result: actualOutcome
    };
    
    this.history.push(historyEntry);
    
    // Update modification effectiveness
    for (const appliedMod of result.appliedModifications) {
      const modification = this.modifications.get(appliedMod.id);
      if (modification) {
        this.updateModificationEffectiveness(modification, actualOutcome);
        modification.learningHistory.push(historyEntry);
      }
    }
    
    // Extract new patterns
    const newPatterns = await this.extractPatterns(historyEntry);
    for (const pattern of newPatterns) {
      this.patterns.set(pattern.id, pattern);
    }
    
    // Update evolution strategies
    this.updateEvolutionStrategies(actualOutcome);
    
    // Prune old history
    if (this.history.length > 10000) {
      this.history = this.history.slice(-10000);
    }
  }

  // Evolve modifications automatically
  async evolveModifications(): Promise<void> {
    const recentHistory = this.history.slice(-100);
    
    // Analyze performance trends
    const trends = this.analyzePerformanceTrends(recentHistory);
    
    // Identify underperforming modifications
    const underperforming = this.identifyUnderperformingModifications(trends);
    
    // Evolve each underperforming modification
    for (const modification of underperforming) {
      await this.evolveModification(modification, trends);
    }
    
    // Generate new modifications from successful patterns
    const newModifications = await this.generateNewModifications(trends);
    for (const newMod of newModifications) {
      this.modifications.set(newMod.id, newMod);
    }
  }

  // Private helper methods
  private async analyzePrompt(
    prompt: string, 
    context: ModificationContext
  ): Promise<any> {
    return {
      length: prompt.length,
      complexity: this.calculateComplexity(prompt),
      clarity: this.assessClarity(prompt),
      structure: this.analyzeStructure(prompt),
      domain: context.domain,
      intent: context.userIntent,
      weakPoints: this.identifyWeakPoints(prompt)
    };
  }

  private identifyApplicableModifications(
    request: AdaptivePromptRequest,
    analysis: any
  ): AdaptiveModification[] {
    const applicable: AdaptiveModification[] = [];
    
    for (const modification of this.modifications.values()) {
      if (this.isModificationApplicable(modification, request, analysis)) {
        applicable.push(modification);
      }
    }
    
    return applicable.sort((a, b) => 
      (b.effectiveness * b.confidence) - (a.effectiveness * a.confidence)
    );
  }

  private isModificationApplicable(
    modification: AdaptiveModification,
    request: AdaptivePromptRequest,
    analysis: any
  ): boolean {
    // Check if modification type is forbidden
    if (request.constraints.forbiddenTransformations.includes(modification.type)) {
      return false;
    }
    
    // Check if context is applicable
    if (!modification.applicableContexts.includes('all') && 
        !modification.applicableContexts.includes(request.context.domain)) {
      return false;
    }
    
    // Check trigger condition
    return this.evaluateTriggerCondition(modification.trigger, request, analysis);
  }

  private evaluateTriggerCondition(
    trigger: ModificationTrigger,
    request: AdaptivePromptRequest,
    analysis: any
  ): boolean {
    const condition = trigger.condition;
    let actualValue: any;
    
    switch (condition.type) {
      case 'quality_score':
        actualValue = analysis.clarity * 100; // Convert to 0-100 scale
        break;
      case 'pattern_match':
        actualValue = request.originalPrompt.toLowerCase();
        break;
      default:
        return false;
    }
    
    switch (condition.operator) {
      case '<':
        return actualValue < condition.value;
      case '>':
        return actualValue > condition.value;
      case '=':
        return actualValue === condition.value;
      case 'contains':
        return actualValue.includes(condition.value);
      case 'not_contains':
        return !actualValue.includes(condition.value);
      default:
        return false;
    }
  }

  private selectOptimalModifications(
    applicable: AdaptiveModification[],
    learningMode: 'conservative' | 'balanced' | 'aggressive',
    targetCriteria: FeedbackCriteria
  ): AdaptiveModification[] {
    let maxModifications: number;
    let riskTolerance: number;
    
    switch (learningMode) {
      case 'conservative':
        maxModifications = 2;
        riskTolerance = 0.8;
        break;
      case 'balanced':
        maxModifications = 3;
        riskTolerance = 0.6;
        break;
      case 'aggressive':
        maxModifications = 5;
        riskTolerance = 0.4;
        break;
    }
    
    // Filter by risk tolerance
    const filtered = applicable.filter(m => m.confidence >= riskTolerance);
    
    // Select top modifications
    return filtered.slice(0, maxModifications);
  }

  private async applyModifications(
    originalPrompt: string,
    modifications: AdaptiveModification[],
    constraints: ModificationConstraints
  ): Promise<string> {
    let modifiedPrompt = originalPrompt;
    
    for (const modification of modifications) {
      const beforeLength = modifiedPrompt.length;
      modifiedPrompt = await this.applyTransformation(
        modifiedPrompt,
        modification.transformation
      );
      
      // Check length constraint
      const lengthIncrease = modifiedPrompt.length - beforeLength;
      if (lengthIncrease > constraints.maxLengthIncrease) {
        // Revert this modification
        modifiedPrompt = originalPrompt;
        continue;
      }
      
      // Validate modification
      if (!this.validateModification(modifiedPrompt, modification.transformation.validation)) {
        // Revert this modification
        modifiedPrompt = originalPrompt;
        continue;
      }
    }
    
    return modifiedPrompt;
  }

  private async applyTransformation(
    prompt: string,
    transformation: PromptTransformation
  ): Promise<string> {
    switch (transformation.method) {
      case 'template_injection':
        return this.injectTemplate(prompt, transformation.parameters);
      case 'pattern_application':
        return this.applyPattern(prompt, transformation.parameters);
      case 'semantic_enhancement':
        return this.enhanceSemantics(prompt, transformation.parameters);
      case 'structural_reorganization':
        return this.reorganizeStructure(prompt, transformation.parameters);
      case 'contextual_expansion':
        return this.expandContext(prompt, transformation.parameters);
      case 'constraint_addition':
        return this.addConstraints(prompt, transformation.parameters);
      case 'example_integration':
        return this.integrateExamples(prompt, transformation.parameters);
      case 'tone_adjustment':
        return this.adjustTone(prompt, transformation.parameters);
      default:
        return prompt;
    }
  }

  private async generateAlternatives(
    originalPrompt: string,
    modifiedPrompt: string,
    context: ModificationContext
  ): Promise<string[]> {
    const alternatives: string[] = [];
    
    // Use different evolution strategies
    for (const strategy of this.evolutionStrategies.values()) {
      const alternative = await this.applyEvolutionStrategy(
        originalPrompt,
        strategy,
        context
      );
      if (alternative && alternative !== originalPrompt && alternative !== modifiedPrompt) {
        alternatives.push(alternative);
      }
    }
    
    return alternatives.slice(0, 3); // Limit to 3 alternatives
  }

  private createRollbackPlan(
    originalPrompt: string,
    modifiedPrompt: string,
    modifications: AdaptiveModification[]
  ): RollbackPlan {
    return {
      triggers: [
        'quality_score < 60',
        'user_satisfaction < 0.5',
        'error_rate > 0.3'
      ],
      fallbackPrompt: originalPrompt,
      monitoringMetrics: [
        'response_quality',
        'user_feedback',
        'performance_metrics'
      ]
    };
  }

  private calculateConfidence(
    modifications: AdaptiveModification[],
    analysis: any,
    context: ModificationContext
  ): number {
    if (modifications.length === 0) return 0.5;
    
    const avgConfidence = modifications.reduce((sum, m) => sum + m.confidence, 0) / modifications.length;
    const contextFactor = this.getContextFactor(context);
    const analysisFactor = this.getAnalysisFactor(analysis);
    
    return Math.min(1.0, avgConfidence * contextFactor * analysisFactor);
  }

  private generateReasoning(
    modifications: AdaptiveModification[],
    analysis: any
  ): string {
    if (modifications.length === 0) {
      return 'No modifications were deemed necessary for this prompt.';
    }
    
    let reasoning = `Applied ${modifications.length} modification(s): `;
    reasoning += modifications.map(m => m.type.replace('_', ' ')).join(', ');
    reasoning += '. ';
    
    if (analysis.clarity < 0.7) {
      reasoning += 'Low clarity detected, enhanced for better understanding. ';
    }
    
    if (analysis.complexity > 0.8) {
      reasoning += 'High complexity identified, restructured for clarity. ';
    }
    
    return reasoning;
  }

  // Transformation implementations
  private injectTemplate(prompt: string, params: TransformationParameters): string {
    const templates = {
      creative: 'Think creatively and explore innovative approaches. ',
      analytical: 'Analyze this systematically and provide detailed reasoning. ',
      structured: 'Organize your response in a clear, structured format. '
    };
    
    const template = templates[params.targetAspects[0] as keyof typeof templates] || '';
    return template + prompt;
  }

  private applyPattern(prompt: string, params: TransformationParameters): string {
    // Apply learned patterns based on success history
    const pattern = this.findBestPattern(prompt);
    return pattern ? pattern.pattern.replace('{prompt}', prompt) : prompt;
  }

  private enhanceSemantics(prompt: string, params: TransformationParameters): string {
    let enhanced = prompt;
    
    // Add clarity enhancements
    if (params.targetAspects.includes('precision')) {
      enhanced = 'Please be precise and specific. ' + enhanced;
    }
    
    if (params.targetAspects.includes('specificity')) {
      enhanced += ' Provide specific details and examples.';
    }
    
    return enhanced;
  }

  private reorganizeStructure(prompt: string, params: TransformationParameters): string {
    const sentences = prompt.split('.').filter(s => s.trim());
    
    if (sentences.length <= 2) return prompt;
    
    // Simple reorganization: most important first
    const organized = [
      'Please address the following systematically:',
      ...sentences.map((s, i) => `${i + 1}. ${s.trim()}.`)
    ];
    
    return organized.join('\n');
  }

  private expandContext(prompt: string, params: TransformationParameters): string {
    const contextAdditions = {
      background: 'Please consider relevant background information. ',
      requirements: 'Ensure all requirements are addressed. ',
      expectations: 'Meet or exceed quality expectations. '
    };
    
    let expanded = prompt;
    for (const aspect of params.targetAspects) {
      const addition = contextAdditions[aspect as keyof typeof contextAdditions];
      if (addition) {
        expanded = addition + expanded;
      }
    }
    
    return expanded;
  }

  private addConstraints(prompt: string, params: TransformationParameters): string {
    const constraints = {
      ethics: 'Ensure your response is ethical and responsible. ',
      safety: 'Prioritize safety in your recommendations. ',
      responsibility: 'Consider the broader implications of your advice. '
    };
    
    let constrained = prompt;
    for (const aspect of params.targetAspects) {
      const constraint = constraints[aspect as keyof typeof constraints];
      if (constraint) {
        constrained += '\n\n' + constraint;
      }
    }
    
    return constrained;
  }

  private integrateExamples(prompt: string, params: TransformationParameters): string {
    return prompt + '\n\nPlease provide specific examples to illustrate your points.';
  }

  private adjustTone(prompt: string, params: TransformationParameters): string {
    const toneAdjustments = {
      professional: 'Please respond in a professional tone. ',
      friendly: 'Please respond in a friendly, approachable manner. ',
      formal: 'Please use formal language and structure. '
    };
    
    const tone = params.targetAspects[0];
    const adjustment = toneAdjustments[tone as keyof typeof toneAdjustments];
    
    return adjustment ? adjustment + prompt : prompt;
  }

  // Utility methods
  private calculateComplexity(prompt: string): number {
    let complexity = 0;
    
    // Length factor
    complexity += Math.min(0.5, prompt.length / 1000);
    
    // Sentence count
    const sentences = prompt.split(/[.!?]+/).length;
    complexity += Math.min(0.3, sentences / 10);
    
    // Technical terms
    const techTerms = ['algorithm', 'implementation', 'architecture', 'optimization'];
    for (const term of techTerms) {
      if (prompt.toLowerCase().includes(term)) {
        complexity += 0.1;
      }
    }
    
    return Math.min(1.0, complexity);
  }

  private assessClarity(prompt: string): number {
    let clarity = 0.7; // Base clarity
    
    // Clear structure indicators
    if (prompt.includes('1.') || prompt.includes('•') || prompt.includes('-')) {
      clarity += 0.1;
    }
    
    // Question clarity
    const questions = (prompt.match(/\?/g) || []).length;
    if (questions === 1) clarity += 0.1;
    else if (questions > 3) clarity -= 0.1;
    
    // Word clarity
    const vagueWords = ['something', 'anything', 'somehow', 'maybe'];
    for (const word of vagueWords) {
      if (prompt.toLowerCase().includes(word)) {
        clarity -= 0.05;
      }
    }
    
    return Math.max(0.1, Math.min(1.0, clarity));
  }

  private analyzeStructure(prompt: string): any {
    return {
      hasIntroduction: prompt.length > 50,
      hasConclusion: prompt.includes('please') || prompt.includes('thank'),
      isStructured: prompt.includes('\n') || prompt.includes('1.'),
      paragraphCount: prompt.split('\n\n').length
    };
  }

  private identifyWeakPoints(prompt: string): string[] {
    const weakPoints: string[] = [];
    
    if (prompt.length < 20) weakPoints.push('too_short');
    if (prompt.length > 2000) weakPoints.push('too_long');
    if (!prompt.includes('?') && !prompt.includes('please')) weakPoints.push('unclear_request');
    if (prompt.split(' ').length < 5) weakPoints.push('insufficient_detail');
    
    return weakPoints;
  }

  private getContextFactor(context: ModificationContext): number {
    let factor = 1.0;
    
    if (context.previousAttempts > 2) factor *= 0.9; // Reduce confidence for repeated attempts
    if (context.domain === 'technical') factor *= 1.1; // Higher confidence for technical domain
    
    return Math.max(0.5, Math.min(1.2, factor));
  }

  private getAnalysisFactor(analysis: any): number {
    return (analysis.clarity + (1 - analysis.complexity)) / 2;
  }

  private findBestPattern(prompt: string): ModificationPattern | undefined {
    const relevantPatterns = Array.from(this.patterns.values())
      .filter(p => prompt.toLowerCase().includes(p.context.toLowerCase()))
      .sort((a, b) => b.effectiveness - a.effectiveness);
    
    return relevantPatterns[0];
  }

  private validateModification(prompt: string, rules: ValidationRule[]): boolean {
    for (const rule of rules) {
      if (rule.required && !this.checkValidationRule(prompt, rule)) {
        return false;
      }
    }
    return true;
  }

  private checkValidationRule(prompt: string, rule: ValidationRule): boolean {
    switch (rule.type) {
      case 'length_check':
        return prompt.length <= (rule.constraint.maxIncrease || 1000);
      case 'coherence_check':
        return this.assessCoherence(prompt) >= (rule.constraint.minScore || 0.5);
      case 'safety_check':
        return this.checkSafety(prompt, rule.constraint.level || 'medium');
      case 'format_check':
        return this.checkFormat(prompt, rule.constraint);
      default:
        return true;
    }
  }

  private assessCoherence(prompt: string): number {
    // Simple coherence check - could be enhanced with NLP
    const sentences = prompt.split(/[.!?]+/).filter(s => s.trim());
    if (sentences.length < 2) return 1.0;
    
    // Check for logical flow (very basic)
    let coherence = 0.8;
    
    // Penalize for excessive repetition
    const words = prompt.toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words);
    const repetitionRatio = uniqueWords.size / words.length;
    coherence *= repetitionRatio;
    
    return Math.max(0.1, Math.min(1.0, coherence));
  }

  private checkSafety(prompt: string, level: string): boolean {
    // Basic safety check - would be enhanced with proper safety detection
    const unsafePatterns = ['harm', 'danger', 'illegal', 'unethical'];
    const lowerPrompt = prompt.toLowerCase();
    
    const hasUnsafeContent = unsafePatterns.some(pattern => lowerPrompt.includes(pattern));
    
    switch (level) {
      case 'high':
        return !hasUnsafeContent;
      case 'medium':
        return !hasUnsafeContent || prompt.includes('safe') || prompt.includes('responsible');
      case 'low':
        return true;
      default:
        return true;
    }
  }

  private checkFormat(prompt: string, constraint: any): boolean {
    if (constraint.requireStructure) {
      return prompt.includes('\n') || prompt.includes('1.') || prompt.includes('•');
    }
    return true;
  }

  // Evolution and learning methods
  private updateModificationEffectiveness(
    modification: AdaptiveModification,
    outcome: ModificationResult
  ): void {
    const learningRate = 0.1;
    const targetEffectiveness = outcome.qualityImprovement / 100;
    
    modification.effectiveness += learningRate * (targetEffectiveness - modification.effectiveness);
    modification.effectiveness = Math.max(0.1, Math.min(1.0, modification.effectiveness));
    
    // Update confidence based on consistency
    const recentResults = modification.learningHistory.slice(-10);
    if (recentResults.length >= 5) {
      const variance = this.calculateVariance(recentResults.map(r => r.result.qualityImprovement));
      modification.confidence = Math.max(0.5, 1.0 - variance / 100);
    }
  }

  private async extractPatterns(history: ModificationHistory): Promise<ModificationPattern[]> {
    const patterns: ModificationPattern[] = [];
    
    // Simple pattern extraction - could be enhanced with ML
    if (history.result.qualityImprovement > 20) {
      const pattern: ModificationPattern = {
        id: `pattern_${Date.now()}`,
        pattern: `For ${history.context.domain} tasks, apply modifications: {prompt}`,
        context: history.context.domain,
        effectiveness: history.result.qualityImprovement / 100,
        frequency: 1,
        lastUsed: new Date(),
        successMetrics: [{
          metric: 'quality_improvement',
          improvement: history.result.qualityImprovement,
          confidence: 0.8,
          sampleSize: 1
        }]
      };
      
      patterns.push(pattern);
    }
    
    return patterns;
  }

  private updateEvolutionStrategies(outcome: ModificationResult): void {
    // Update strategy parameters based on outcome
    for (const strategy of this.evolutionStrategies.values()) {
      if (outcome.qualityImprovement > 15) {
        // Successful outcome, adjust parameters
        if (strategy.id === 'genetic') {
          strategy.parameters.mutationRate *= 0.95; // Reduce mutation for stability
        }
      }
    }
  }

  private analyzePerformanceTrends(history: ModificationHistory[]): any {
    const improvements = history.map(h => h.result.qualityImprovement);
    const avgImprovement = improvements.reduce((sum, imp) => sum + imp, 0) / improvements.length;
    
    return {
      averageImprovement: avgImprovement,
      trendDirection: improvements.slice(-5).reduce((sum, imp) => sum + imp, 0) / 5 > avgImprovement ? 'up' : 'down',
      consistency: 1 - this.calculateVariance(improvements) / 100
    };
  }

  private identifyUnderperformingModifications(trends: any): AdaptiveModification[] {
    return Array.from(this.modifications.values())
      .filter(m => m.effectiveness < 0.6 || m.confidence < 0.7);
  }

  private async evolveModification(
    modification: AdaptiveModification,
    trends: any
  ): Promise<void> {
    // Simple evolution: adjust parameters based on trends
    if (trends.averageImprovement < 10) {
      modification.transformation.parameters.intensity *= 1.1;
      modification.transformation.parameters.intensity = Math.min(1.0, modification.transformation.parameters.intensity);
    }
  }

  private async generateNewModifications(trends: any): Promise<AdaptiveModification[]> {
    // Generate new modifications based on successful patterns
    const newModifications: AdaptiveModification[] = [];
    
    if (trends.averageImprovement > 20 && trends.consistency > 0.8) {
      // Create a new modification based on successful patterns
      const newMod: AdaptiveModification = {
        id: `dynamic_${Date.now()}`,
        type: 'efficiency_optimization',
        trigger: {
          condition: { type: 'quality_score', operator: '<', value: 75 },
          threshold: 0.75,
          priority: 7
        },
        transformation: {
          method: 'template_injection',
          parameters: {
            intensity: 0.7,
            preserveOriginal: true,
            targetAspects: ['efficiency', 'clarity'],
            customRules: []
          },
          validation: []
        },
        effectiveness: 0.7,
        confidence: 0.75,
        learningHistory: [],
        applicableContexts: ['all']
      };
      
      newModifications.push(newMod);
    }
    
    return newModifications;
  }

  private async applyEvolutionStrategy(
    prompt: string,
    strategy: EvolutionStrategy,
    context: ModificationContext
  ): Promise<string> {
    switch (strategy.id) {
      case 'genetic':
        return this.applyGeneticEvolution(prompt, strategy.parameters);
      case 'reinforcement':
        return this.applyReinforcementLearning(prompt, strategy.parameters);
      case 'hill_climbing':
        return this.applyHillClimbing(prompt, strategy.parameters);
      default:
        return prompt;
    }
  }

  private applyGeneticEvolution(prompt: string, params: any): string {
    // Simple genetic algorithm implementation
    const mutations = [
      'Please be more specific. ' + prompt,
      prompt + ' Provide detailed examples.',
      'Think step by step. ' + prompt
    ];
    
    return mutations[Math.floor(Math.random() * mutations.length)];
  }

  private applyReinforcementLearning(prompt: string, params: any): string {
    // Simple RL-based modification
    return 'Based on learned patterns: ' + prompt;
  }

  private applyHillClimbing(prompt: string, params: any): string {
    // Simple hill climbing modification
    return prompt + ' Please optimize your approach.';
  }

  private calculateVariance(values: number[]): number {
    if (values.length === 0) return 0;
    
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / values.length;
  }

  private generateModificationDescription(modification: AdaptiveModification): string {
    const descriptions: Record<ModificationType, string> = {
      context_enhancement: 'Enhanced context and background information',
      structure_optimization: 'Improved prompt structure and organization',
      clarity_improvement: 'Clarified language and intent',
      specificity_boost: 'Increased specificity and detail',
      creativity_enhancement: 'Enhanced creative potential',
      safety_reinforcement: 'Added safety and ethical guidelines',
      efficiency_optimization: 'Optimized for better efficiency',
      personalization: 'Personalized for user preferences'
    };
    
    return descriptions[modification.type] || 'Applied optimization';
  }

  private isReversible(modification: AdaptiveModification): boolean {
    // Most modifications are reversible except constraint additions
    return modification.type !== 'safety_reinforcement';
  }

  // Public API
  getModifications(): AdaptiveModification[] {
    return Array.from(this.modifications.values());
  }

  getPatterns(): ModificationPattern[] {
    return Array.from(this.patterns.values());
  }

  getHistory(): ModificationHistory[] {
    return [...this.history];
  }

  exportConfiguration(): any {
    return {
      modifications: Array.from(this.modifications.entries()),
      patterns: Array.from(this.patterns.entries()),
      evolutionStrategies: Array.from(this.evolutionStrategies.entries()),
      history: this.history.slice(-1000) // Last 1000 entries
    };
  }

  importConfiguration(config: any): void {
    this.modifications = new Map(config.modifications);
    this.patterns = new Map(config.patterns);
    this.evolutionStrategies = new Map(config.evolutionStrategies);
    this.history = config.history;
  }
}

interface EvolutionStrategy {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
}

export { AdaptivePromptModifier };