'use client';

import { useState } from 'react';
import PromptEngineerBot from '@/components/ui/PromptEngineerBot';
import Typography from '@/components/ui/Typography';
import ScrollReveal from '@/components/ui/ScrollReveal';

type MothershipState = 'closed' | 'intro' | 'engineer' | 'feedback';

export default function FeedbackWidget() {
  const [state, setState] = useState<MothershipState>('closed');

  const openLinkedInMessage = () => {
    // LinkedIn messaging URL - using your actual LinkedIn profile
    const linkedInUrl = 'https://www.linkedin.com/in/thecephus/';
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
    setState('closed');
  };

  return (
    <>
      {/* The Mothership Button */}
      <button
        onClick={() => setState('intro')}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-glow-primary to-glow-secondary text-white p-4 rounded-full shadow-glow-lg hover:shadow-glow transition-all duration-500 z-40 group hover:scale-110"
        aria-label="Open The Mothership - AI Prompt Engineering"
        title="The Mothership - AI Prompt Engineering"
      >
        <div className="relative">
          <div className="text-2xl">🛸</div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-glow-secondary rounded-full animate-pulse group-hover:animate-ping"></div>
        </div>
      </button>

      {/* The Mothership Modal System */}
      {state !== 'closed' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          {/* Intro Modal */}
          {state === 'intro' && (
            <ScrollReveal>
              <div className="bg-gradient-to-br from-primary via-secondary to-accent max-w-2xl w-full p-8 rounded-xl border border-glow-primary/40 shadow-glow-lg">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl">🛸</div>
                    <div>
                      <Typography variant="headline" color="primary" className="text-glow-subtle">
                        Welcome to The Mothership
                      </Typography>
                      <Typography variant="body" color="secondary" className="opacity-80">
                        Advanced AI Prompt Engineering Station
                      </Typography>
                    </div>
                  </div>
                  <button
                    onClick={() => setState('closed')}
                    className="text-glow-secondary hover:text-glow-primary transition-colors p-2 hover:bg-glow-primary/10 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-glow-primary/10 border border-glow-primary/30 rounded-lg p-6">
                    <Typography variant="subhead" color="primary" className="mb-4 text-glow-subtle">
                      🎯 What is Proper Prompt Engineering?
                    </Typography>
                    <Typography variant="body" color="secondary" className="leading-relaxed mb-4">
                      Effective AI prompts are like precise mission briefings. They should include:
                    </Typography>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="text-glow-primary">🎭</span>
                        <Typography variant="body" color="secondary">
                          <strong>Clear Role:</strong> Define who the AI should be (expert, assistant, analyst)
                        </Typography>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-glow-secondary">🎯</span>
                        <Typography variant="body" color="secondary">
                          <strong>Specific Task:</strong> Exact outcome you want to achieve
                        </Typography>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-glow-primary">📋</span>
                        <Typography variant="body" color="secondary">
                          <strong>Context & Constraints:</strong> Background info and limitations
                        </Typography>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-glow-secondary">✨</span>
                        <Typography variant="body" color="secondary">
                          <strong>Output Format:</strong> How you want the response structured
                        </Typography>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <Typography variant="body" color="primary" className="font-medium mb-2 text-red-400">
                        ❌ Weak Prompt:
                      </Typography>
                      <Typography variant="caption" color="secondary" className="italic">
                        "Help me write code"
                      </Typography>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <Typography variant="body" color="primary" className="font-medium mb-2 text-green-400">
                        ✅ Strong Prompt:
                      </Typography>
                      <Typography variant="caption" color="secondary" className="italic">
                        "As a senior React developer, help me create a responsive navigation component with TypeScript, including hover animations and mobile menu functionality. Provide clean, documented code with accessibility features."
                      </Typography>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setState('engineer')}
                      className="flex-1 bg-gradient-to-r from-glow-primary to-glow-secondary text-white px-6 py-4 rounded-lg hover:shadow-glow-lg transition-all duration-300 font-medium"
                    >
                      🚀 Launch Prompt Engineer
                    </button>
                    <button
                      onClick={() => setState('feedback')}
                      className="bg-glow-secondary/20 border border-glow-secondary/40 text-glow-secondary px-6 py-4 rounded-lg hover:bg-glow-secondary/30 transition-all duration-300"
                    >
                      💬 Send Feedback
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Prompt Engineer Modal */}
          {state === 'engineer' && (
            <div className="max-w-7xl w-full h-[90vh] bg-gradient-to-br from-primary via-secondary to-accent rounded-xl border border-glow-primary/40 shadow-glow-lg overflow-hidden">
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-glow-primary/30">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">🛸</div>
                    <div>
                      <Typography variant="subhead" color="primary" className="text-glow-subtle">
                        The Mothership
                      </Typography>
                      <Typography variant="caption" color="secondary" className="opacity-70">
                        AI Prompt Engineering Station
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setState('intro')}
                      className="text-glow-secondary hover:text-glow-primary transition-colors p-2 hover:bg-glow-primary/10 rounded-lg"
                      title="Back to intro"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setState('closed')}
                      className="text-glow-secondary hover:text-glow-primary transition-colors p-2 hover:bg-glow-primary/10 rounded-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Prompt Engineer Content */}
                <div className="flex-1 overflow-hidden">
                  <PromptEngineerBot className="h-full" />
                </div>
              </div>
            </div>
          )}

          {/* Feedback Modal */}
          {state === 'feedback' && (
            <ScrollReveal>
              <div className="bg-gradient-to-br from-primary via-secondary to-accent max-w-md w-full p-6 rounded-xl border border-glow-primary/40 shadow-glow-lg">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">💬</div>
                    <Typography variant="subhead" color="primary" className="text-glow-subtle">
                      Send Feedback
                    </Typography>
                  </div>
                  <button
                    onClick={() => setState('closed')}
                    className="text-glow-secondary hover:text-glow-primary transition-colors p-2 hover:bg-glow-primary/10 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <Typography variant="body" color="secondary">
                    I'd love to hear your thoughts about The Mothership and this portfolio! Click below to send me a private message on LinkedIn.
                  </Typography>
                  
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={openLinkedInMessage}
                      className="bg-gradient-to-r from-glow-primary to-glow-secondary text-white px-4 py-3 rounded-lg hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Message on LinkedIn
                    </button>
                    
                    <button
                      onClick={() => setState('intro')}
                      className="bg-glow-secondary/20 border border-glow-secondary/40 text-glow-secondary px-4 py-3 rounded-lg hover:bg-glow-secondary/30 transition-all duration-300"
                    >
                      Back to Mothership
                    </button>
                  </div>
                  
                  <Typography variant="caption" color="secondary" className="text-center opacity-70">
                    Your feedback helps me improve this portfolio and future projects.
                  </Typography>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      )}
    </>
  );
}