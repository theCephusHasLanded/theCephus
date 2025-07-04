// Conversation Parser for Prompt Engineering Bot
import { ConversationTurn } from '@/lib/prompt-engineering';

export interface ParsedConversation {
  originalPrompt: string;
  userResponses: Record<string, string>;
  conversationText: string;
  modelSelected: string;
}

export function parseConversation(turns: ConversationTurn[]): ParsedConversation {
  let originalPrompt = '';
  let modelSelected = '';
  const userResponses: Record<string, string> = {};
  const conversationParts: string[] = [];
  
  // Track the question-answer flow
  let awaitingResponse = false;
  let currentQuestionKey = '';
  
  for (let i = 0; i < turns.length; i++) {
    const turn = turns[i];
    const timestamp = new Date(turn.timestamp || Date.now()).toLocaleTimeString();
    
    // Add to conversation text
    const sender = turn.type === 'user' ? 'You' : '🤖 AI Assistant';
    conversationParts.push(`${sender}\n${turn.content}\n${timestamp}\n`);
    
    // Parse content based on turn type
    if (turn.type === 'user') {
      const content = turn.content.toLowerCase().trim();
      
      // Check if this is a model selection
      if (content === 'claude' || content === 'openai' || content === 'gemini') {
        modelSelected = content;
      }
      // Check if this is the original prompt (first substantial user message after greeting)
      else if (!originalPrompt && content.length > 10 && !awaitingResponse) {
        originalPrompt = turn.content;
      }
      // Check if this is a response to a question
      else if (awaitingResponse && currentQuestionKey) {
        userResponses[currentQuestionKey] = turn.content;
        awaitingResponse = false;
        currentQuestionKey = '';
      }
    } else if (turn.type === 'bot') {
      // Detect when bot is asking a question
      if (turn.content.includes('What role') || turn.content.includes('What format') || 
          turn.content.includes('Are there any specific')) {
        awaitingResponse = true;
        
        // Determine question type
        if (turn.content.includes('What role')) {
          currentQuestionKey = 'role_definition';
        } else if (turn.content.includes('What format')) {
          currentQuestionKey = 'output_format';
        } else if (turn.content.includes('specific requirements')) {
          currentQuestionKey = 'constraints';
        }
      }
    }
  }
  
  return {
    originalPrompt,
    userResponses,
    conversationText: conversationParts.join('\n'),
    modelSelected
  };
}

export function generateConversationCopy(turns: ConversationTurn[]): string {
  const parsed = parseConversation(turns);
  
  return `# AI Prompt Engineering Session

## Original Prompt
${parsed.originalPrompt}

## Model Selected
${parsed.modelSelected}

## User Responses
${Object.entries(parsed.userResponses).map(([key, value]) => 
  `- ${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: ${value}`
).join('\n')}

## Full Conversation
${parsed.conversationText}

---
Generated by AI Prompt Engineering Assistant
Session Date: ${new Date().toLocaleDateString()}
`;
}

export function createOptimizedRequestFromConversation(turns: ConversationTurn[]): any {
  const parsed = parseConversation(turns);
  
  // Create a mock analysis based on the questions asked
  const analysis = {
    category: 'general',
    complexity: 'moderate',
    tokenCount: parsed.originalPrompt.length / 4, // rough estimate
    missingElements: Object.keys(parsed.userResponses),
    strengths: [],
    suggestions: []
  };
  
  return {
    originalPrompt: parsed.originalPrompt,
    userResponses: parsed.userResponses,
    category: analysis.category,
    model: parsed.modelSelected || 'claude',
    analysis
  };
}