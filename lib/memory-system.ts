// Advanced Memory System for Agentic AI
import { AgentMemory, MemoryEntry, LearnedPattern, FeedbackEntry } from './agentic-core';

export interface MemoryVector {
  id: string;
  embedding: number[];
  metadata: Record<string, any>;
}

export interface MemoryCluster {
  id: string;
  centroid: number[];
  entries: string[];
  topic: string;
  importance: number;
}

export interface MemorySearchResult {
  entry: MemoryEntry;
  similarity: number;
  relevanceScore: number;
}

// Memory Management System
export class AdvancedMemorySystem {
  private memory: AgentMemory;
  private vectors: Map<string, MemoryVector>;
  private clusters: Map<string, MemoryCluster>;
  private searchIndex: Map<string, string[]>;

  constructor(initialMemory?: AgentMemory) {
    this.memory = initialMemory || {
      shortTerm: [],
      longTerm: [],
      conversationHistory: [],
      patternLearning: [],
      feedbackHistory: []
    };
    this.vectors = new Map();
    this.clusters = new Map();
    this.searchIndex = new Map();
  }

  // Core Memory Operations
  async addMemory(entry: MemoryEntry): Promise<void> {
    // Generate embedding for semantic search
    const embedding = await this.generateEmbedding(entry.content);
    
    // Store vector representation
    this.vectors.set(entry.id, {
      id: entry.id,
      embedding,
      metadata: entry.metadata
    });

    // Add to appropriate memory store
    if (entry.importance > 0.7) {
      this.memory.longTerm.push(entry);
    } else {
      this.memory.shortTerm.push(entry);
    }

    // Update search index
    await this.updateSearchIndex(entry);
    
    // Trigger clustering if needed
    if (this.vectors.size % 50 === 0) {
      await this.reclusterMemories();
    }

    // Manage memory capacity
    await this.manageCapacity();
  }

  async findSimilarMemories(query: string, limit: number = 10): Promise<MemorySearchResult[]> {
    const queryEmbedding = await this.generateEmbedding(query);
    const results: MemorySearchResult[] = [];

    // Search through all memory types
    const allMemories = [
      ...this.memory.shortTerm,
      ...this.memory.longTerm,
      ...this.memory.conversationHistory.map(c => ({
        id: c.id,
        type: 'conversation' as const,
        content: `${c.prompt} ${c.response}`,
        metadata: { model: c.model, quality: c.quality },
        importance: c.quality / 100,
        timestamp: c.timestamp,
        relationships: []
      }))
    ];

    for (const memory of allMemories) {
      const vector = this.vectors.get(memory.id);
      if (!vector) continue;

      const similarity = this.cosineSimilarity(queryEmbedding, vector.embedding);
      const relevanceScore = this.calculateRelevanceScore(memory, similarity, query);

      if (similarity > 0.3) { // Threshold for relevance
        results.push({
          entry: memory,
          similarity,
          relevanceScore
        });
      }
    }

    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }

  async consolidateMemories(): Promise<void> {
    // Move important short-term memories to long-term
    const important = this.memory.shortTerm.filter(m => m.importance > 0.6);
    
    for (const memory of important) {
      this.memory.longTerm.push(memory);
      this.memory.shortTerm = this.memory.shortTerm.filter(m => m.id !== memory.id);
    }

    // Cluster related memories
    await this.createMemoryClusters();
    
    // Prune old, unimportant memories
    await this.pruneMemories();
  }

  // Pattern Learning
  async extractPatterns(fromMemories: MemoryEntry[]): Promise<LearnedPattern[]> {
    const patterns: LearnedPattern[] = [];
    
    // Analyze successful optimizations
    const successful = fromMemories.filter(m => 
      m.type === 'optimization' && 
      m.metadata.qualityScore > 80
    );

    // Group by common characteristics
    const grouped = this.groupByPatterns(successful);
    
    for (const [patternKey, memories] of grouped.entries()) {
      const pattern: LearnedPattern = {
        id: this.generateId(),
        pattern: patternKey,
        context: this.extractContext(memories),
        effectiveness: this.calculateEffectiveness(memories),
        applications: this.identifyApplications(memories),
        lastUsed: new Date()
      };
      
      patterns.push(pattern);
      this.memory.patternLearning.push(pattern);
    }

    return patterns;
  }

  async updatePattern(pattern: LearnedPattern, usage: any): Promise<void> {
    const existing = this.memory.patternLearning.find(p => p.id === pattern.id);
    if (existing) {
      existing.effectiveness = this.updateEffectiveness(existing.effectiveness, usage.success);
      existing.lastUsed = new Date();
      existing.applications.push(usage.context);
    }
  }

  // Memory Clustering
  private async reclusterMemories(): Promise<void> {
    const embeddings = Array.from(this.vectors.values());
    
    // K-means clustering
    const k = Math.min(10, Math.floor(embeddings.length / 10));
    const clusters = await this.kMeansClustering(embeddings, k);
    
    // Store clusters
    this.clusters.clear();
    clusters.forEach((cluster, index) => {
      this.clusters.set(`cluster_${index}`, {
        id: `cluster_${index}`,
        centroid: cluster.centroid,
        entries: cluster.members,
        topic: this.inferTopic(cluster),
        importance: this.calculateClusterImportance(cluster)
      });
    });
  }

  private async createMemoryClusters(): Promise<void> {
    // Create thematic clusters based on content similarity
    const conversations = this.memory.conversationHistory;
    const grouped = new Map<string, any[]>();

    for (const conv of conversations) {
      const category = await this.categorizeContent(conv.prompt);
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(conv);
    }

    // Convert to clusters
    for (const [category, items] of grouped.entries()) {
      if (items.length >= 3) { // Minimum cluster size
        const clusterId = this.generateId();
        this.clusters.set(clusterId, {
          id: clusterId,
          centroid: await this.calculateCentroid(items),
          entries: items.map(i => i.id),
          topic: category,
          importance: items.reduce((sum, i) => sum + i.quality, 0) / items.length / 100
        });
      }
    }
  }

  // Utility Methods
  private async generateEmbedding(text: string): Promise<number[]> {
    // Simple text embedding using word frequency and position
    // In production, use a proper embedding model
    const words = text.toLowerCase().split(/\s+/);
    const embedding = new Array(384).fill(0); // Standard embedding size
    
    for (let i = 0; i < words.length && i < embedding.length; i++) {
      const word = words[i];
      const hash = this.simpleHash(word) % embedding.length;
      embedding[hash] += 1.0 / (i + 1); // Position-weighted
    }
    
    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return magnitude > 0 ? embedding.map(val => val / magnitude) : embedding;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      magnitudeA += a[i] * a[i];
      magnitudeB += b[i] * b[i];
    }
    
    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);
    
    return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
  }

  private calculateRelevanceScore(memory: MemoryEntry, similarity: number, query: string): number {
    let score = similarity * 0.6; // Base similarity weight
    
    // Boost recent memories
    const daysSince = (Date.now() - memory.timestamp.getTime()) / (1000 * 60 * 60 * 24);
    const recencyBoost = Math.exp(-daysSince / 30) * 0.2;
    
    // Boost important memories
    const importanceBoost = memory.importance * 0.2;
    
    return Math.min(1.0, score + recencyBoost + importanceBoost);
  }

  private groupByPatterns(memories: MemoryEntry[]): Map<string, MemoryEntry[]> {
    const groups = new Map<string, MemoryEntry[]>();
    
    for (const memory of memories) {
      const patterns = this.identifyPatterns(memory);
      for (const pattern of patterns) {
        if (!groups.has(pattern)) {
          groups.set(pattern, []);
        }
        groups.get(pattern)!.push(memory);
      }
    }
    
    return groups;
  }

  private identifyPatterns(memory: MemoryEntry): string[] {
    const patterns: string[] = [];
    const content = memory.content.toLowerCase();
    
    // Identify common patterns
    if (content.includes('step by step')) patterns.push('step_by_step');
    if (content.includes('example')) patterns.push('with_examples');
    if (content.includes('context')) patterns.push('context_heavy');
    if (content.includes('format')) patterns.push('format_specific');
    
    return patterns;
  }

  private extractContext(memories: MemoryEntry[]): string {
    const contexts = memories.map(m => m.metadata.context || '').filter(Boolean);
    return contexts.length > 0 ? contexts[0] : 'general';
  }

  private calculateEffectiveness(memories: MemoryEntry[]): number {
    const scores = memories.map(m => m.metadata.qualityScore || 0);
    return scores.reduce((sum, score) => sum + score, 0) / scores.length / 100;
  }

  private identifyApplications(memories: MemoryEntry[]): string[] {
    const applications = new Set<string>();
    memories.forEach(m => {
      if (m.metadata.category) applications.add(m.metadata.category);
      if (m.metadata.domain) applications.add(m.metadata.domain);
    });
    return Array.from(applications);
  }

  private updateEffectiveness(current: number, success: boolean): number {
    const alpha = 0.1; // Learning rate
    const target = success ? 1.0 : 0.0;
    return current + alpha * (target - current);
  }

  private async kMeansClustering(vectors: MemoryVector[], k: number): Promise<any[]> {
    // Simplified k-means implementation
    const clusters: any[] = [];
    
    // Initialize centroids randomly
    for (let i = 0; i < k; i++) {
      const randomVector = vectors[Math.floor(Math.random() * vectors.length)];
      clusters.push({
        centroid: [...randomVector.embedding],
        members: [],
        previousMembers: []
      });
    }
    
    // Iterate until convergence
    for (let iter = 0; iter < 10; iter++) {
      // Assign vectors to closest centroids
      clusters.forEach(c => c.members = []);
      
      for (const vector of vectors) {
        let bestCluster = 0;
        let bestDistance = Infinity;
        
        for (let i = 0; i < clusters.length; i++) {
          const distance = this.euclideanDistance(vector.embedding, clusters[i].centroid);
          if (distance < bestDistance) {
            bestDistance = distance;
            bestCluster = i;
          }
        }
        
        clusters[bestCluster].members.push(vector.id);
      }
      
      // Update centroids
      for (const cluster of clusters) {
        if (cluster.members.length > 0) {
          const memberVectors = cluster.members.map(id => 
            vectors.find(v => v.id === id)!.embedding
          );
          
          cluster.centroid = this.calculateMeanVector(memberVectors);
        }
      }
    }
    
    return clusters;
  }

  private euclideanDistance(a: number[], b: number[]): number {
    return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
  }

  private calculateMeanVector(vectors: number[][]): number[] {
    if (vectors.length === 0) return new Array(384).fill(0);
    
    const mean = new Array(vectors[0].length).fill(0);
    for (const vector of vectors) {
      for (let i = 0; i < vector.length; i++) {
        mean[i] += vector[i];
      }
    }
    
    return mean.map(val => val / vectors.length);
  }

  private inferTopic(cluster: any): string {
    // Simple topic inference based on cluster members
    return `topic_${cluster.members.length}`;
  }

  private calculateClusterImportance(cluster: any): number {
    return Math.min(1.0, cluster.members.length / 10);
  }

  private async categorizeContent(content: string): Promise<string> {
    const categories = ['code', 'creative', 'business', 'technical', 'general'];
    const lowerContent = content.toLowerCase();
    
    if (/\b(code|program|function|debug)\b/.test(lowerContent)) return 'code';
    if (/\b(write|story|creative|article)\b/.test(lowerContent)) return 'creative';
    if (/\b(business|marketing|strategy)\b/.test(lowerContent)) return 'business';
    if (/\b(technical|analysis|research)\b/.test(lowerContent)) return 'technical';
    
    return 'general';
  }

  private async calculateCentroid(items: any[]): Promise<number[]> {
    // Calculate centroid for cluster items
    return new Array(384).fill(0);
  }

  private async manageCapacity(): Promise<void> {
    const MAX_SHORT_TERM = 1000;
    const MAX_LONG_TERM = 10000;
    
    // Prune short-term memory if too large
    if (this.memory.shortTerm.length > MAX_SHORT_TERM) {
      // Keep most important and recent
      this.memory.shortTerm.sort((a, b) => {
        const importanceScore = b.importance - a.importance;
        const recencyScore = (b.timestamp.getTime() - a.timestamp.getTime()) / 1000000;
        return importanceScore + recencyScore;
      });
      
      this.memory.shortTerm = this.memory.shortTerm.slice(0, MAX_SHORT_TERM);
    }
    
    // Prune long-term memory if too large
    if (this.memory.longTerm.length > MAX_LONG_TERM) {
      this.memory.longTerm.sort((a, b) => b.importance - a.importance);
      this.memory.longTerm = this.memory.longTerm.slice(0, MAX_LONG_TERM);
    }
  }

  private async pruneMemories(): Promise<void> {
    const cutoffDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // 90 days ago
    
    // Remove old, unimportant memories
    this.memory.shortTerm = this.memory.shortTerm.filter(m => 
      m.timestamp > cutoffDate || m.importance > 0.5
    );
  }

  private async updateSearchIndex(entry: MemoryEntry): Promise<void> {
    const words = entry.content.toLowerCase().split(/\s+/);
    
    for (const word of words) {
      if (word.length > 2) { // Skip very short words
        if (!this.searchIndex.has(word)) {
          this.searchIndex.set(word, []);
        }
        this.searchIndex.get(word)!.push(entry.id);
      }
    }
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public API
  getMemoryStats(): any {
    return {
      shortTermCount: this.memory.shortTerm.length,
      longTermCount: this.memory.longTerm.length,
      conversationCount: this.memory.conversationHistory.length,
      patternsLearned: this.memory.patternLearning.length,
      feedbackCount: this.memory.feedbackHistory.length,
      clustersCount: this.clusters.size,
      vectorsCount: this.vectors.size
    };
  }

  async exportMemory(): Promise<any> {
    return {
      memory: this.memory,
      clusters: Array.from(this.clusters.entries()),
      statistics: this.getMemoryStats()
    };
  }

  async importMemory(data: any): Promise<void> {
    this.memory = data.memory;
    this.clusters = new Map(data.clusters);
    
    // Rebuild vectors and index
    for (const entry of [...this.memory.shortTerm, ...this.memory.longTerm]) {
      const embedding = await this.generateEmbedding(entry.content);
      this.vectors.set(entry.id, {
        id: entry.id,
        embedding,
        metadata: entry.metadata
      });
      await this.updateSearchIndex(entry);
    }
  }
}

export { AdvancedMemorySystem };