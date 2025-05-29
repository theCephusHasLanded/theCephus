export const metadata = {
  title: 'About - Christina Cephus | AI Engineering & Software Development',
  description: 'Learn about Christina Cephus (theCephus), AI engineer and software developer specializing in rapid content generation and intelligent systems.',
};

import EditorialCard from '@/components/ui/EditorialCard';
import Typography from '@/components/ui/Typography';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 md:py-40">
        <div className="container-custom">
          <div className="asymmetric-grid items-center">
            <ScrollReveal>
              <Typography variant="display" color="primary" className="mb-8 text-glow-subtle" balance>
                Building the Future with AI
              </Typography>
              
              <Typography variant="body-lg" color="secondary" className="leading-relaxed mb-12 max-w-2xl">
                I'm Christina Cephus, an AI engineer and software developer passionate about creating 
                intelligent systems that transform ideas into reality. My work focuses on ultra-fast 
                content generation, prompt engineering, and AI-powered applications that solve real-world problems.
              </Typography>
              
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-glow-primary/20 border border-glow-primary/40 rounded-full text-glow-primary text-body font-medium">
                  AI Engineering
                </span>
                <span className="px-4 py-2 bg-glow-secondary/20 border border-glow-secondary/40 rounded-full text-glow-secondary text-body font-medium">
                  Prompt Design
                </span>
                <span className="px-4 py-2 bg-glow-primary/20 border border-glow-primary/40 rounded-full text-glow-primary text-body font-medium">
                  Full-Stack Development
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="glow-card p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face" 
                    alt="Christina Cephus" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10 text-center">
                  <Typography variant="subhead" color="primary" className="mb-4 text-glow-subtle">
                    Christina Cephus
                  </Typography>
                  <Typography variant="body" color="secondary">
                    AI Engineer & Software Developer
                  </Typography>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-32 bg-glow">
        <div className="container-custom">
          <ScrollReveal>
            <header className="mb-16 text-center">
              <Typography variant="headline" color="primary" className="mb-6 text-glow-subtle">
                Expertise & Capabilities
              </Typography>
              <Typography variant="body-lg" color="secondary" className="max-w-3xl mx-auto leading-relaxed">
                Combining deep technical knowledge with creative problem-solving to deliver 
                innovative AI solutions and high-performance applications.
              </Typography>
            </header>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal delay={100}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500 group">
                <div className="w-16 h-16 bg-glow-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-glow-primary/30 transition-colors">
                  <svg className="w-8 h-8 text-glow-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  </svg>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4 group-hover:text-glow-primary transition-colors">
                  AI & Machine Learning
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed mb-6">
                  Advanced prompt engineering, model fine-tuning, and intelligent system architecture 
                  for next-generation applications.
                </Typography>
                <ul className="text-caption text-accent space-y-2">
                  <li>• Large Language Model Integration</li>
                  <li>• Prompt Engineering & Optimization</li>
                  <li>• AI Agent Development</li>
                  <li>• Model Training & Fine-tuning</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500 group">
                <div className="w-16 h-16 bg-glow-secondary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-glow-secondary/30 transition-colors">
                  <svg className="w-8 h-8 text-glow-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3L4 14h7v8l9-11h-7V3z"/>
                  </svg>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4 group-hover:text-glow-secondary transition-colors">
                  High-Performance Development
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed mb-6">
                  Ultra-fast content generation systems and optimized applications built for 
                  speed, scalability, and reliability.
                </Typography>
                <ul className="text-caption text-accent space-y-2">
                  <li>• React/Next.js Applications</li>
                  <li>• TypeScript & Modern JavaScript</li>
                  <li>• API Design & Integration</li>
                  <li>• Performance Optimization</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="glow-card p-8 hover:shadow-glow-lg transition-all duration-500 group">
                <div className="w-16 h-16 bg-glow-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-glow-primary/30 transition-colors">
                  <svg className="w-8 h-8 text-glow-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M11 7h2v2h-2zM11 11h2v6h-2z"/>
                  </svg>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4 group-hover:text-glow-primary transition-colors">
                  Strategic Technology
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed mb-6">
                  Business strategy, technology consulting, and implementation planning 
                  for AI-driven digital transformation.
                </Typography>
                <ul className="text-caption text-accent space-y-2">
                  <li>• AI Strategy & Implementation</li>
                  <li>• Technical Architecture</li>
                  <li>• Digital Transformation</li>
                  <li>• Product Development</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Journey & Philosophy */}
      <section className="py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <Typography variant="headline" color="primary" className="mb-12 text-center text-glow-subtle">
                My Journey in AI & Technology
              </Typography>
            </ScrollReveal>
            
            <div className="space-y-16">
              <ScrollReveal delay={100}>
                <div className="glow-card p-12 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=400&fit=crop" 
                      alt="AI Technology Background" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <Typography variant="subhead" color="primary" className="mb-6 text-glow-subtle">
                      The AI Revolution
                    </Typography>
                    <Typography variant="body-lg" color="secondary" className="leading-relaxed mb-6">
                      My fascination with artificial intelligence began with a simple question: How can we make 
                      technology more intuitive and helpful? This led me down a path of exploring language models, 
                      prompt engineering, and the intersection of human creativity with machine intelligence.
                    </Typography>
                    <Typography variant="body" color="secondary" className="leading-relaxed">
                      Today, I specialize in creating AI-powered systems that don't just automate tasks, 
                      but actually enhance human creativity and productivity. From ultra-fast content generation 
                      to intelligent business applications, my work focuses on practical AI implementations 
                      that solve real problems.
                    </Typography>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="glow-card p-12 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop" 
                      alt="Software Development" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <Typography variant="subhead" color="primary" className="mb-6 text-glow-subtle">
                      Engineering Excellence
                    </Typography>
                    <Typography variant="body-lg" color="secondary" className="leading-relaxed mb-6">
                      Beyond AI, I'm passionate about creating exceptional software experiences. My development 
                      philosophy centers on performance, user experience, and maintainable code that scales 
                      with business needs.
                    </Typography>
                    <Typography variant="body" color="secondary" className="leading-relaxed">
                      Whether it's building lightning-fast web applications, designing robust APIs, or 
                      implementing complex business logic, I approach each project with attention to detail 
                      and a commitment to excellence that drives tangible results.
                    </Typography>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Approach */}
      <section className="py-32 bg-glow">
        <div className="container-custom">
          <ScrollReveal>
            <Typography variant="headline" color="primary" className="mb-16 text-center text-glow-subtle">
              Values & Approach
            </Typography>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="text-center">
                <div className="w-20 h-20 bg-glow-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-glow-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4">
                  Innovation First
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Constantly exploring cutting-edge technologies and methodologies to deliver 
                  solutions that push the boundaries of what's possible.
                </Typography>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="text-center">
                <div className="w-20 h-20 bg-glow-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-glow-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4">
                  Speed & Quality
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Delivering high-quality solutions rapidly without compromising on reliability, 
                  security, or user experience.
                </Typography>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="text-center">
                <div className="w-20 h-20 bg-glow-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-glow-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a3 3 0 01-3-3v-2a3 3 0 013-3h3a3 3 0 013 3v2a3 3 0 01-3 3H7zM16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4">
                  Human-Centered
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Technology should enhance human capabilities, not replace them. Every solution 
                  is designed with the end user's needs and experience in mind.
                </Typography>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="text-center">
                <div className="w-20 h-20 bg-glow-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-glow-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <Typography variant="subhead" color="primary" className="mb-4">
                  Scalable Solutions
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Building systems that grow with your business, from prototype to enterprise scale, 
                  with maintainable and extensible architectures.
                </Typography>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}