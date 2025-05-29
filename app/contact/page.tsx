export const metadata = {
  title: 'Contact - Christina Cephus | Get in Touch for AI & Development Projects',
  description: 'Contact Christina Cephus (theCephus) for AI engineering, software development projects, and technology consulting.',
};

import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 md:py-40">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <Typography variant="display" color="primary" className="mb-8 text-glow-subtle" balance>
                Let's Build Something Amazing
              </Typography>
              
              <Typography variant="body-lg" color="secondary" className="leading-relaxed mb-12 max-w-2xl mx-auto">
                Ready to transform your ideas into intelligent, high-performance applications? 
                I'm here to help bring your vision to life with cutting-edge AI and software engineering.
              </Typography>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-32 bg-glow">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <ScrollReveal>
              <div className="glow-card p-12">
                <Typography variant="headline" color="primary" className="mb-8 text-glow-subtle">
                  Send a Message
                </Typography>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-body font-medium text-primary mb-2">
                        Name <span className="text-glow-primary">*</span>
                      </label>
                      <input
                        type="text"
                        className="input-editorial w-full"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-body font-medium text-primary mb-2">
                        Email <span className="text-glow-primary">*</span>
                      </label>
                      <input
                        type="email"
                        className="input-editorial w-full"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-body font-medium text-primary mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      className="input-editorial w-full"
                      placeholder="Your company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-body font-medium text-primary mb-2">
                      Project Type
                    </label>
                    <select className="input-editorial w-full">
                      <option value="">Select project type</option>
                      <option value="ai-development">AI Development</option>
                      <option value="web-application">Web Application</option>
                      <option value="consulting">Technology Consulting</option>
                      <option value="prompt-engineering">Prompt Engineering</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-body font-medium text-primary mb-2">
                      Message <span className="text-glow-primary">*</span>
                    </label>
                    <textarea
                      className="input-editorial w-full h-32 resize-none"
                      placeholder="Tell me about your project, goals, and how I can help..."
                      required
                    ></textarea>
                  </div>
                  
                  <Button variant="primary" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Info & CTA */}
            <ScrollReveal delay={200}>
              <div className="space-y-8">
                {/* Direct Contact */}
                <div className="glow-card p-8">
                  <Typography variant="subhead" color="primary" className="mb-6 text-glow-subtle">
                    Direct Contact
                  </Typography>
                  
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-glow-primary/20 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-glow-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                      </div>
                      <div>
                        <Typography variant="body" color="primary" className="font-medium">
                          Quick Response
                        </Typography>
                        <Typography variant="caption" color="secondary">
                          Typically respond within 24 hours
                        </Typography>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-glow-secondary/20 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-glow-secondary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19A2 2 0 0 0 5 21H19A2 2 0 0 0 21 19V9M19 19H5V3H13V9H19V19Z"/>
                        </svg>
                      </div>
                      <div>
                        <Typography variant="body" color="primary" className="font-medium">
                          Professional Consultation
                        </Typography>
                        <Typography variant="caption" color="secondary">
                          Free initial project discussion
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Process */}
                <div className="glow-card p-8">
                  <Typography variant="subhead" color="primary" className="mb-6 text-glow-subtle">
                    How We Work Together
                  </Typography>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-glow-primary/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <span className="text-glow-primary font-bold text-body">1</span>
                      </div>
                      <div>
                        <Typography variant="body" color="primary" className="font-medium mb-1">
                          Discovery Call
                        </Typography>
                        <Typography variant="caption" color="secondary">
                          We discuss your goals, requirements, and project scope
                        </Typography>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-glow-primary/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <span className="text-glow-primary font-bold text-body">2</span>
                      </div>
                      <div>
                        <Typography variant="body" color="primary" className="font-medium mb-1">
                          Proposal & Planning
                        </Typography>
                        <Typography variant="caption" color="secondary">
                          Detailed project plan with timelines and deliverables
                        </Typography>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-glow-primary/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <span className="text-glow-primary font-bold text-body">3</span>
                      </div>
                      <div>
                        <Typography variant="body" color="primary" className="font-medium mb-1">
                          Development & Delivery
                        </Typography>
                        <Typography variant="caption" color="secondary">
                          Regular updates and milestone reviews throughout development
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="glow-card p-8">
                  <Typography variant="subhead" color="primary" className="mb-6 text-glow-subtle">
                    Connect With Me
                  </Typography>
                  
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      href="https://github.com/theCephusHasLanded" 
                      external
                      className="flex-1"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      href="https://linkedin.com/in/christina-cephus" 
                      external
                      className="flex-1"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="glow-card p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop" 
                    alt="Team Collaboration" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <Typography variant="headline" color="primary" className="mb-6 text-glow-subtle">
                    Ready to Start Your Project?
                  </Typography>
                  <Typography variant="body-lg" color="secondary" className="leading-relaxed mb-8 max-w-2xl mx-auto">
                    Whether you need AI integration, high-performance web applications, or strategic technology consulting, 
                    I'm here to help turn your vision into reality.
                  </Typography>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="primary" size="lg">
                      Start a Project
                    </Button>
                    <Button variant="outline" size="lg" href="/prompts">
                      Explore AI Prompts
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}