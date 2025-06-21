export const metadata = {
  title: 'AI Agent Guide | Christina Cephus - Master AI Communication',
  description: 'Complete guide to using AI agents effectively. Learn best practices, get real-time AI model updates, and master the art of AI communication.',
};

import Typography from '@/components/ui/Typography';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PromptEngineerForm from '@/components/PromptEngineerForm';

import AINewsRSSFeed from '@/components/AINewsRSSFeed';

export default function PromptEngineerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 md:py-40">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <Typography variant="display" color="primary" className="mb-8 text-glow-subtle" balance>
                AI Agent Mastery Guide
              </Typography>
              
              <Typography variant="body-lg" color="secondary" className="leading-relaxed mb-12 max-w-3xl mx-auto">
                Master the art of AI communication with our comprehensive agent guide. Learn to use the prompt optimizer 
                in the corner, stay updated with latest AI models, and discover advanced techniques for better results.
              </Typography>
              
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                <span className="px-4 py-2 bg-glow-primary/20 border border-glow-primary/40 rounded-full text-glow-primary text-body font-medium">
                  🤖 AI Agent Guide
                </span>
                <span className="px-4 py-2 bg-glow-secondary/20 border border-glow-secondary/40 rounded-full text-glow-secondary text-body font-medium">
                  📡 Live AI Updates
                </span>
                <span className="px-4 py-2 bg-glow-primary/20 border border-glow-primary/40 rounded-full text-glow-primary text-body font-medium">
                  ⚡ Pro Techniques
                </span>
                <span className="px-4 py-2 bg-glow-secondary/20 border border-glow-secondary/40 rounded-full text-glow-secondary text-body font-medium">
                  🎯 Expert Tips
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Agent Guide Overview */}
      <section className="py-16 bg-glow">
        <div className="container-custom">
          <ScrollReveal>
            <Typography variant="headline" color="primary" className="mb-12 text-center text-glow-subtle">
              How to Use the AI Agent
            </Typography>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500">
                <div className="text-4xl mb-4">🎯</div>
                <Typography variant="subhead" color="primary" className="mb-4">
                  Find the Agent
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Look for the prompt optimizer widget in the bottom-right corner of any page. 
                  It's your direct access to professional AI assistance.
                </Typography>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500">
                <div className="text-4xl mb-4">⚡</div>
                <Typography variant="subhead" color="primary" className="mb-4">
                  Quick Optimization
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Type your rough prompt, select an AI model (Claude, GPT-4, Gemini, or Free), 
                  and get instant professional optimization with explanations.
                </Typography>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500">
                <div className="text-4xl mb-4">📋</div>
                <Typography variant="subhead" color="primary" className="mb-4">
                  Copy & Apply
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Use the copy buttons to get your optimized prompt instantly. 
                  Apply it to any AI model for dramatically improved results.
                </Typography>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Comprehensive Guide & Live Updates */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* Agent Usage Guide */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <Typography variant="headline" color="primary" className="mb-8 text-glow-subtle">
                  Complete Agent Usage Guide
                </Typography>
                
                <div className="space-y-8">
                  {/* Step-by-step Guide */}
                  <div className="glow-card p-8">
                    <Typography variant="subhead" color="primary" className="mb-6">
                      🚀 Step-by-Step Agent Usage
                    </Typography>
                    
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-glow-primary/20 rounded-full flex items-center justify-center text-glow-primary font-bold">
                          1
                        </div>
                        <div>
                          <Typography variant="body" className="font-semibold text-glow-primary mb-2">
                            Locate the Agent Widget
                          </Typography>
                          <Typography variant="body" color="secondary">
                            Find the floating prompt optimizer in the bottom-right corner. It's available on every page and follows you as you navigate.
                          </Typography>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-glow-secondary/20 rounded-full flex items-center justify-center text-glow-secondary font-bold">
                          2
                        </div>
                        <div>
                          <Typography variant="body" className="font-semibold text-glow-primary mb-2">
                            Choose Your AI Model
                          </Typography>
                          <Typography variant="body" color="secondary">
                            Select from Claude (your API), GPT-4 (your API), Gemini (your API), or the free local optimizer. Each has different strengths.
                          </Typography>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-glow-primary/20 rounded-full flex items-center justify-center text-glow-primary font-bold">
                          3
                        </div>
                        <div>
                          <Typography variant="body" className="font-semibold text-glow-primary mb-2">
                            Enter Your Rough Prompt
                          </Typography>
                          <Typography variant="body" color="secondary">
                            Type your basic idea or rough prompt. Don't worry about perfection - the agent will analyze and improve it professionally.
                          </Typography>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-glow-secondary/20 rounded-full flex items-center justify-center text-glow-secondary font-bold">
                          4
                        </div>
                        <div>
                          <Typography variant="body" className="font-semibold text-glow-primary mb-2">
                            Watch Real-Time Analysis
                          </Typography>
                          <Typography variant="body" color="secondary">
                            See the AI analyze your prompt, identify missing elements, and build an optimized version step-by-step with explanations.
                          </Typography>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-glow-primary/20 rounded-full flex items-center justify-center text-glow-primary font-bold">
                          5
                        </div>
                        <div>
                          <Typography variant="body" className="font-semibold text-glow-primary mb-2">
                            Copy & Apply Results
                          </Typography>
                          <Typography variant="body" color="secondary">
                            Use the copy buttons to get your optimized prompt instantly. Apply it to ChatGPT, Claude, or any AI for better results.
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Advanced Techniques */}
                  <div className="glow-card p-8">
                    <Typography variant="subhead" color="primary" className="mb-6">
                      🧠 Advanced Techniques
                    </Typography>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Typography variant="body" className="font-semibold text-glow-primary mb-2">
                          Smart Auto-Detection
                        </Typography>
                        <Typography variant="body" color="secondary" className="text-sm">
                          The agent automatically detects prompt types (code, writing, analysis) and suggests appropriate settings.
                        </Typography>
                      </div>
                      
                      <div>
                        <Typography variant="body" className="font-semibold text-glow-primary mb-2">
                          Model-Specific Optimization
                        </Typography>
                        <Typography variant="body" color="secondary" className="text-sm">
                          Each AI model gets custom optimization based on their unique strengths and capabilities.
                        </Typography>
                      </div>
                      
                      <div>
                        <Typography variant="body" className="font-semibold text-glow-primary mb-2">
                          Before/After Analysis
                        </Typography>
                        <Typography variant="body" color="secondary" className="text-sm">
                          See detailed metrics showing improvement in clarity, specificity, and completeness scores.
                        </Typography>
                      </div>
                      
                      <div>
                        <Typography variant="body" className="font-semibold text-glow-primary mb-2">
                          Copy Options
                        </Typography>
                        <Typography variant="body" color="secondary" className="text-sm">
                          Get just the optimized prompt, or copy the full analysis with explanations and reasoning.
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* AI News RSS Feed */}
            <div className="lg:col-span-1">
              <ScrollReveal delay={200}>
                <AINewsRSSFeed />
              </ScrollReveal>
              
              {/* Quick Tips */}
              <ScrollReveal delay={300}>
                <div className="mt-8 bg-glow-secondary/5 border border-glow-secondary/20 rounded-lg p-6">
                  <Typography variant="subhead" className="text-glow-secondary mb-4">
                    💡 Pro Tips
                  </Typography>
                  
                  <div className="space-y-4">
                    <div>
                      <Typography variant="caption" className="font-semibold text-glow-secondary">
                        Flying Alien Coach
                      </Typography>
                      <Typography variant="caption" color="secondary" className="block text-sm">
                        Watch for the 👾 alien on this page - it shares random prompt engineering tips!
                      </Typography>
                    </div>
                    
                    <div>
                      <Typography variant="caption" className="font-semibold text-glow-secondary">
                        API Key Security
                      </Typography>
                      <Typography variant="caption" color="secondary" className="block text-sm">
                        Your API keys stay local and secure. They're never logged or stored remotely.
                      </Typography>
                    </div>
                    
                    <div>
                      <Typography variant="caption" className="font-semibold text-glow-secondary">
                        Free Alternative
                      </Typography>
                      <Typography variant="caption" color="secondary" className="block text-sm">
                        No API keys? Use the "AI Optimizer (Always Free)" model for intelligent analysis.
                      </Typography>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use the Agent */}
      <section className="py-32 bg-glow">
        <div className="container-custom">
          <ScrollReveal>
            <Typography variant="headline" color="primary" className="mb-16 text-center text-glow-subtle">
              Why Use Our AI Agent?
            </Typography>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto space-y-12">
            <ScrollReveal delay={100}>
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-glow-primary/20 rounded-full flex items-center justify-center text-glow-primary font-bold text-lg">
                  ⚡
                </div>
                <div>
                  <Typography variant="subhead" color="primary" className="mb-3 text-glow-subtle">
                    Instant Professional Results
                  </Typography>
                  <Typography variant="body" color="secondary" className="leading-relaxed">
                    Transform rough ideas into professional prompts in seconds. No need to study prompt engineering - 
                    the agent applies expert techniques automatically.
                  </Typography>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-glow-secondary/20 rounded-full flex items-center justify-center text-glow-secondary font-bold text-lg">
                  🎯
                </div>
                <div>
                  <Typography variant="subhead" color="primary" className="mb-3 text-glow-subtle">
                    Multi-Model Support
                  </Typography>
                  <Typography variant="body" color="secondary" className="leading-relaxed">
                    Works with your existing API keys for Claude, GPT-4, and Gemini. Plus a free intelligent 
                    optimizer that requires no API keys or signup.
                  </Typography>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-glow-primary/20 rounded-full flex items-center justify-center text-glow-primary font-bold text-lg">
                  🧠
                </div>
                <div>
                  <Typography variant="subhead" color="primary" className="mb-3 text-glow-subtle">
                    Smart Analysis & Learning
                  </Typography>
                  <Typography variant="body" color="secondary" className="leading-relaxed">
                    Real-time analysis shows you what makes prompts effective. Learn prompt engineering 
                    principles while getting better results.
                  </Typography>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-glow-secondary/20 rounded-full flex items-center justify-center text-glow-secondary font-bold text-lg">
                  🔒
                </div>
                <div>
                  <Typography variant="subhead" color="primary" className="mb-3 text-glow-subtle">
                    Privacy & Security First
                  </Typography>
                  <Typography variant="body" color="secondary" className="leading-relaxed">
                    Your prompts and API keys never leave your browser. Everything is processed locally 
                    or through your own secure API connections.
                  </Typography>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-32">
        <div className="container-custom">
          <ScrollReveal>
            <Typography variant="headline" color="primary" className="mb-16 text-center text-glow-subtle">
              Prompt Engineering Principles
            </Typography>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500">
                <div className="w-16 h-16 bg-glow-primary/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🎭</span>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4 text-glow-subtle">
                  Role Definition
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Clear role assignments help AI understand the expertise and perspective needed 
                  for optimal responses.
                </Typography>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500">
                <div className="w-16 h-16 bg-glow-secondary/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4 text-glow-subtle">
                  Specificity
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Detailed, specific instructions eliminate ambiguity and lead to more 
                  accurate, targeted results.
                </Typography>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500">
                <div className="w-16 h-16 bg-glow-primary/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">📋</span>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4 text-glow-subtle">
                  Format Structure
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Specifying output format ensures consistent, usable results that match 
                  your workflow needs.
                </Typography>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500">
                <div className="w-16 h-16 bg-glow-secondary/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🔍</span>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4 text-glow-subtle">
                  Context Setting
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Providing relevant background information helps AI understand the situation 
                  and deliver contextually appropriate responses.
                </Typography>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500">
                <div className="w-16 h-16 bg-glow-primary/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">💡</span>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4 text-glow-subtle">
                  Examples & Constraints
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Examples show desired outcomes while constraints prevent unwanted results, 
                  creating clear boundaries for AI responses.
                </Typography>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500">
                <div className="w-16 h-16 bg-glow-secondary/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4 text-glow-subtle">
                  Token Efficiency
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Optimized prompts balance detail with brevity, maximizing effectiveness 
                  while minimizing token usage and costs.
                </Typography>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}