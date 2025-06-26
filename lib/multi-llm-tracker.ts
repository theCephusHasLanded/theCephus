// Multi-LLM Performance Tracking and Feedback Collection System
import { AIModel } from './ai-models';

export interface LLMPerformanceMetrics {
  modelId: AIModel;
  totalRequests: number;
  successfulRequests: number;
  averageResponseTime: number;
  averageQualityScore: number;
  averageTokenUsage: number;
  averageCost: number;
  errorRate: number;
  lastUpdated: Date;
}

export interface ModelComparison {
  prompt: string;
  responses: ModelResponse[];
  userFeedback: ComparisonFeedback;
  timestamp: Date;
  category: string;
}

export interface ModelResponse {
  modelId: AIModel;
  response: string;
  responseTime: number;
  tokenUsage: number;
  cost: number;
  qualityScore: number;
  confidence: number;
}

export interface ComparisonFeedback {
  bestModel: AIModel;
  worstModel: AIModel;
  qualityRatings: Record<AIModel, number>;
  userComments: string;
  specificCriteria: FeedbackCriteria;
}

export interface FeedbackCriteria {
  accuracy: number;
  clarity: number;
  relevance: number;
  completeness: number;
  creativity: number;
  efficiency: number;
}

export interface OptimizationSuggestion {
  modelId: AIModel;
  suggestion: string;
  expectedImprovement: number;
  confidence: number;
  category: string;
}

export interface ModelAnalytics {
  strengthsWeaknesses: Record<AIModel, { strengths: string[], weaknesses: string[] }>;
  performanceTrends: Record<AIModel, PerformanceTrend[]>;
  usagePatterns: Record<AIModel, UsagePattern>;
  recommendations: ModelRecommendation[];
}

export interface PerformanceTrend {
  date: Date;
  qualityScore: number;
  responseTime: number;
  successRate: number;
}

export interface UsagePattern {
  peakHours: number[];
  commonCategories: string[];
  averagePromptLength: number;
  preferredFormats: string[];
}

export interface ModelRecommendation {
  scenario: string;
  recommendedModel: AIModel;
  reasoning: string;
  confidence: number;
}

// Multi-LLM Tracking System
export class MultiLLMTracker {
  private metrics: Map<AIModel, LLMPerformanceMetrics> = new Map();
  private comparisons: ModelComparison[] = [];
  private feedbackHistory: ComparisonFeedback[] = [];
  private analytics: ModelAnalytics;

  constructor() {
    this.initializeMetrics();
    this.analytics = {
      strengthsWeaknesses: {} as any,
      performanceTrends: {} as any,
      usagePatterns: {} as any,
      recommendations: []
    };
  }

  private initializeMetrics(): void {
    const models: AIModel[] = ['openai', 'gemini', 'claude', 'local'];
    
    models.forEach(model => {
      this.metrics.set(model, {
        modelId: model,
        totalRequests: 0,
        successfulRequests: 0,
        averageResponseTime: 0,
        averageQualityScore: 0,
        averageTokenUsage: 0,
        averageCost: 0,
        errorRate: 0,
        lastUpdated: new Date()
      });
    });
  }

  // Track individual model performance
  trackModelUsage(
    modelId: AIModel, 
    response: ModelResponse, 
    success: boolean = true
  ): void {
    const metrics = this.metrics.get(modelId);
    if (!metrics) return;

    // Update basic metrics
    metrics.totalRequests++;
    if (success) metrics.successfulRequests++;

    // Update averages using running average
    const alpha = 1 / metrics.totalRequests; // Learning rate decreases over time
    
    metrics.averageResponseTime = this.updateRunningAverage(
      metrics.averageResponseTime, 
      response.responseTime, 
      alpha
    );
    
    metrics.averageQualityScore = this.updateRunningAverage(
      metrics.averageQualityScore, 
      response.qualityScore, 
      alpha
    );
    
    metrics.averageTokenUsage = this.updateRunningAverage(
      metrics.averageTokenUsage, 
      response.tokenUsage, 
      alpha
    );
    
    metrics.averageCost = this.updateRunningAverage(
      metrics.averageCost, 
      response.cost, 
      alpha
    );

    // Calculate error rate
    metrics.errorRate = 1 - (metrics.successfulRequests / metrics.totalRequests);
    metrics.lastUpdated = new Date();

    // Update performance trends
    this.updatePerformanceTrends(modelId, response);
  }

  // Compare multiple models on the same prompt
  async compareModels(
    prompt: string, 
    models: AIModel[], 
    category: string = 'general'
  ): Promise<ModelComparison> {
    const responses: ModelResponse[] = [];
    
    // Get responses from each model
    for (const modelId of models) {
      try {
        const startTime = Date.now();
        const response = await this.getModelResponse(modelId, prompt);
        const endTime = Date.now();
        
        const modelResponse: ModelResponse = {
          modelId,
          response: response.content,
          responseTime: endTime - startTime,
          tokenUsage: response.tokenUsage || 0,
          cost: response.cost || 0,
          qualityScore: await this.assessQuality(response.content, prompt),
          confidence: response.confidence || 0.8
        };
        
        responses.push(modelResponse);
        this.trackModelUsage(modelId, modelResponse, true);
        
      } catch (error) {
        console.error(`Error with model ${modelId}:`, error);
        this.trackModelUsage(modelId, {
          modelId,
          response: '',
          responseTime: 0,
          tokenUsage: 0,
          cost: 0,
          qualityScore: 0,
          confidence: 0
        }, false);
      }
    }

    const comparison: ModelComparison = {
      prompt,
      responses,
      userFeedback: this.generateInitialFeedback(responses),
      timestamp: new Date(),
      category
    };

    this.comparisons.push(comparison);
    return comparison;
  }

  // Collect user feedback on model comparison
  collectFeedback(comparisonId: string, feedback: ComparisonFeedback): void {
    const comparison = this.comparisons.find(c => 
      c.timestamp.getTime().toString() === comparisonId
    );
    
    if (comparison) {
      comparison.userFeedback = feedback;
      this.feedbackHistory.push(feedback);
      
      // Update model analytics based on feedback
      this.updateAnalytics(comparison);
    }
  }

  // Generate optimization suggestions
  generateOptimizationSuggestions(modelId: AIModel): OptimizationSuggestion[] {
    const metrics = this.metrics.get(modelId);
    const suggestions: OptimizationSuggestion[] = [];
    
    if (!metrics) return suggestions;

    // Analyze performance patterns
    const recentComparisons = this.comparisons
      .filter(c => c.responses.some(r => r.modelId === modelId))
      .slice(-20);

    // Generate suggestions based on weaknesses
    if (metrics.averageResponseTime > 5000) {
      suggestions.push({
        modelId,
        suggestion: 'Consider using shorter, more focused prompts to reduce response time',
        expectedImprovement: 0.3,
        confidence: 0.8,
        category: 'performance'
      });
    }

    if (metrics.averageQualityScore < 70) {
      suggestions.push({
        modelId,
        suggestion: 'Add more context and specific examples to improve response quality',
        expectedImprovement: 0.4,
        confidence: 0.9,
        category: 'quality'
      });
    }

    if (metrics.errorRate > 0.1) {
      suggestions.push({
        modelId,
        suggestion: 'Review prompt formatting and API key configuration',
        expectedImprovement: 0.6,
        confidence: 0.95,
        category: 'reliability'
      });
    }

    // Category-specific suggestions
    const categoryFeedback = this.analyzeCategoryPerformance(modelId);
    suggestions.push(...this.generateCategorySpecificSuggestions(modelId, categoryFeedback));

    return suggestions;
  }

  // Get comprehensive analytics
  getAnalytics(): ModelAnalytics {
    this.updateAnalytics();
    return this.analytics;
  }

  // Get model rankings for specific criteria
  getRankings(criteria: keyof FeedbackCriteria): { model: AIModel; score: number }[] {
    const rankings: { model: AIModel; score: number }[] = [];
    
    for (const [modelId, metrics] of this.metrics.entries()) {
      const feedbackScores = this.feedbackHistory
        .map(f => f.specificCriteria[criteria])
        .filter(score => score !== undefined);
      
      const averageScore = feedbackScores.length > 0 
        ? feedbackScores.reduce((sum, score) => sum + score, 0) / feedbackScores.length
        : metrics.averageQualityScore;
      
      rankings.push({ model: modelId, score: averageScore });
    }
    
    return rankings.sort((a, b) => b.score - a.score);
  }

  // Get best model for specific task
  getBestModelForTask(
    category: string, 
    requirements: Partial<FeedbackCriteria> = {}
  ): { model: AIModel; confidence: number; reasoning: string } {
    const categoryComparisons = this.comparisons.filter(c => c.category === category);
    
    if (categoryComparisons.length === 0) {
      return {
        model: 'claude',
        confidence: 0.5,
        reasoning: 'No historical data for this category, defaulting to Claude'
      };
    }

    // Score models based on requirements
    const modelScores = new Map<AIModel, number>();
    
    for (const comparison of categoryComparisons) {
      for (const response of comparison.responses) {
        const currentScore = modelScores.get(response.modelId) || 0;
        let newScore = response.qualityScore;
        
        // Weight by specific requirements
        if (requirements.accuracy) {
          newScore *= (comparison.userFeedback.specificCriteria.accuracy / 100);
        }
        if (requirements.efficiency) {
          newScore *= (1 - response.responseTime / 10000); // Penalize slow responses
        }
        
        modelScores.set(response.modelId, currentScore + newScore);
      }
    }

    // Find best model
    let bestModel: AIModel = 'claude';
    let bestScore = 0;
    
    for (const [model, score] of modelScores.entries()) {
      if (score > bestScore) {
        bestScore = score;
        bestModel = model;
      }
    }

    const confidence = Math.min(0.95, bestScore / 100);
    const reasoning = this.generateRecommendationReasoning(bestModel, category, modelScores);

    return { model: bestModel, confidence, reasoning };
  }

  // Private helper methods
  private updateRunningAverage(current: number, newValue: number, alpha: number): number {
    return current + alpha * (newValue - current);
  }

  private updatePerformanceTrends(modelId: AIModel, response: ModelResponse): void {
    if (!this.analytics.performanceTrends[modelId]) {
      this.analytics.performanceTrends[modelId] = [];
    }
    
    const trends = this.analytics.performanceTrends[modelId];
    trends.push({
      date: new Date(),
      qualityScore: response.qualityScore,
      responseTime: response.responseTime,
      successRate: 1.0 // Single response is always successful if we reach here
    });
    
    // Keep only recent trends (last 100 entries)
    if (trends.length > 100) {
      this.analytics.performanceTrends[modelId] = trends.slice(-100);
    }
  }

  private async getModelResponse(modelId: AIModel, prompt: string): Promise<any> {
    // Mock implementation - in real app, this would call actual APIs
    return {
      content: `Response from ${modelId}: ${prompt.substring(0, 50)}...`,
      tokenUsage: Math.floor(Math.random() * 1000) + 100,
      cost: Math.random() * 0.1,
      confidence: Math.random() * 0.3 + 0.7
    };
  }

  private async assessQuality(response: string, prompt: string): Promise<number> {
    // Simple quality assessment - in real app, use more sophisticated metrics
    let score = 50; // Base score
    
    if (response.length > 100) score += 20;
    if (response.includes('example')) score += 10;
    if (response.split('\n').length > 3) score += 10;
    if (response.length > prompt.length * 2) score += 10;
    
    return Math.min(100, score);
  }

  private generateInitialFeedback(responses: ModelResponse[]): ComparisonFeedback {
    const best = responses.reduce((prev, current) => 
      prev.qualityScore > current.qualityScore ? prev : current
    );
    
    const worst = responses.reduce((prev, current) => 
      prev.qualityScore < current.qualityScore ? prev : current
    );

    const qualityRatings: Record<AIModel, number> = {} as any;
    responses.forEach(r => {
      qualityRatings[r.modelId] = r.qualityScore;
    });

    return {
      bestModel: best.modelId,
      worstModel: worst.modelId,
      qualityRatings,
      userComments: '',
      specificCriteria: {
        accuracy: best.qualityScore,
        clarity: best.qualityScore,
        relevance: best.qualityScore,
        completeness: best.qualityScore,
        creativity: best.qualityScore,
        efficiency: 100 - (best.responseTime / 1000)
      }
    };
  }

  private updateAnalytics(comparison?: ModelComparison): void {
    // Update strengths and weaknesses
    for (const [modelId] of this.metrics.entries()) {
      this.analytics.strengthsWeaknesses[modelId] = this.analyzeModelStrengthsWeaknesses(modelId);
    }

    // Update usage patterns
    for (const [modelId] of this.metrics.entries()) {
      this.analytics.usagePatterns[modelId] = this.analyzeUsagePatterns(modelId);
    }

    // Generate recommendations
    this.analytics.recommendations = this.generateRecommendations();
  }

  private analyzeModelStrengthsWeaknesses(modelId: AIModel): { strengths: string[], weaknesses: string[] } {
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const metrics = this.metrics.get(modelId);
    
    if (!metrics) return { strengths, weaknesses };

    // Analyze metrics
    if (metrics.averageQualityScore > 80) strengths.push('High quality responses');
    if (metrics.averageResponseTime < 3000) strengths.push('Fast response times');
    if (metrics.errorRate < 0.05) strengths.push('Reliable performance');
    if (metrics.averageCost < 0.01) strengths.push('Cost effective');

    if (metrics.averageQualityScore < 60) weaknesses.push('Low quality responses');
    if (metrics.averageResponseTime > 8000) weaknesses.push('Slow response times');
    if (metrics.errorRate > 0.15) weaknesses.push('High error rate');
    if (metrics.averageCost > 0.05) weaknesses.push('Expensive to use');

    return { strengths, weaknesses };
  }

  private analyzeUsagePatterns(modelId: AIModel): UsagePattern {
    const modelComparisons = this.comparisons.filter(c => 
      c.responses.some(r => r.modelId === modelId)
    );

    const hours = modelComparisons.map(c => c.timestamp.getHours());
    const categories = modelComparisons.map(c => c.category);
    const promptLengths = modelComparisons.map(c => c.prompt.length);

    return {
      peakHours: this.findPeakHours(hours),
      commonCategories: this.findMostCommon(categories),
      averagePromptLength: promptLengths.reduce((sum, len) => sum + len, 0) / promptLengths.length,
      preferredFormats: ['text', 'structured'] // Placeholder
    };
  }

  private generateRecommendations(): ModelRecommendation[] {
    const recommendations: ModelRecommendation[] = [];
    
    // Generate scenario-based recommendations
    const scenarios = ['code generation', 'creative writing', 'data analysis', 'business communication'];
    
    for (const scenario of scenarios) {
      const best = this.getBestModelForTask(scenario);
      recommendations.push({
        scenario,
        recommendedModel: best.model,
        reasoning: best.reasoning,
        confidence: best.confidence
      });
    }

    return recommendations;
  }

  private analyzeCategoryPerformance(modelId: AIModel): any {
    // Analyze performance by category
    return {};
  }

  private generateCategorySpecificSuggestions(modelId: AIModel, categoryFeedback: any): OptimizationSuggestion[] {
    return [];
  }

  private generateRecommendationReasoning(model: AIModel, category: string, scores: Map<AIModel, number>): string {
    const modelScore = scores.get(model) || 0;
    const averageScore = Array.from(scores.values()).reduce((sum, score) => sum + score, 0) / scores.size;
    
    if (modelScore > averageScore * 1.2) {
      return `${model} consistently outperforms other models in ${category} tasks with ${Math.round(modelScore)}% effectiveness`;
    } else {
      return `${model} shows good performance in ${category} tasks`;
    }
  }

  private findPeakHours(hours: number[]): number[] {
    const hourCounts = new Map<number, number>();
    hours.forEach(hour => {
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    });
    
    return Array.from(hourCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([hour]) => hour);
  }

  private findMostCommon(items: string[]): string[] {
    const counts = new Map<string, number>();
    items.forEach(item => {
      counts.set(item, (counts.get(item) || 0) + 1);
    });
    
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([item]) => item);
  }

  // Public API
  getMetrics(): Map<AIModel, LLMPerformanceMetrics> {
    return new Map(this.metrics);
  }

  getComparisons(): ModelComparison[] {
    return [...this.comparisons];
  }

  exportData(): any {
    return {
      metrics: Array.from(this.metrics.entries()),
      comparisons: this.comparisons,
      feedbackHistory: this.feedbackHistory,
      analytics: this.analytics
    };
  }

  importData(data: any): void {
    this.metrics = new Map(data.metrics);
    this.comparisons = data.comparisons;
    this.feedbackHistory = data.feedbackHistory;
    this.analytics = data.analytics;
  }
}

export { MultiLLMTracker };