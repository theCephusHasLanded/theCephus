export const metadata = {
  title: 'About - Christina Cephus | AI Engineering & Software Development',
  description: 'Learn about Christina Cephus (theCephus), AI engineer and software developer specializing in rapid content generation and intelligent systems.',
};

import EditorialCard from '@/components/ui/EditorialCard';
import Typography from '@/components/ui/Typography';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GitHubActivity from '@/components/ui/GitHubActivity';

export default function AboutPage() {
  const username = 'theCephusHasLanded';
  
  // Example Loom videos - you can add your actual video IDs here
  const loomVideos = [
    // {
    //   repoName: 'your-repo-name',
    //   videoId: 'your-loom-video-id',
    //   title: 'Project Walkthrough',
    //   description: 'Full demo and code explanation'
    // }
  ];
  
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
                Hey, I'm Christina Cephus! I build AI systems and software that actually works. 
                I'm obsessed with making things fast - whether that's content generation, optimizing prompts, 
                or building applications that solve problems people actually have.
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
                    src="https://github.com/theCephusHasLanded.png" 
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
                I combine technical depth with creative problem-solving. My goal is simple: 
                build things that work really well and make people's lives easier.
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
                  I craft prompts that actually work, fine-tune models to do exactly what they need to do, 
                  and architect systems that scale without breaking.
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
                  I build applications that are genuinely fast. Not just "fast enough" - 
                  actually fast. Speed and reliability aren't optional features.
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
                  I help businesses figure out what technology they actually need and how to implement it 
                  without getting lost in buzzwords or over-engineering.
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
                      I got into AI because I wanted to make technology that actually helps people instead of 
                      getting in their way. Started with language models and prompt engineering, then realized 
                      the real magic happens when you combine human creativity with machine intelligence.
                    </Typography>
                    <Typography variant="body" color="secondary" className="leading-relaxed">
                      Now I build AI systems that enhance what people can do rather than replace them. 
                      Whether it's generating content at lightning speed or creating business applications 
                      that actually make sense, I focus on practical implementations that solve real problems.
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
                      When I'm not working on AI stuff, I'm building software that people actually enjoy using. 
                      I care about performance, user experience, and writing code that won't make future developers 
                      want to start over from scratch.
                    </Typography>
                    <Typography variant="body" color="secondary" className="leading-relaxed">
                      Whether I'm building web applications, designing APIs, or implementing complex business logic, 
                      I pay attention to the details that make software feel smooth and reliable. 
                      The goal is always to deliver something that works really well.
                    </Typography>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <section className="py-32">
        <div className="container-custom">
          <ScrollReveal>
            <Typography variant="headline" color="primary" className="mb-12 text-center text-glow-subtle">
              Live GitHub Activity
            </Typography>
            <Typography variant="body-lg" color="secondary" className="text-center max-w-3xl mx-auto mb-16 leading-relaxed">
              Here's what I've been working on lately. This updates automatically every 5 minutes 
              so you can see my latest projects and contributions in real-time.
            </Typography>
          </ScrollReveal>
          
          <GitHubActivity 
            username={username} 
            pollInterval={5 * 60 * 1000} // 5 minutes
            className="max-w-6xl mx-auto"
            loomVideos={loomVideos}
          />
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
                  I'm always exploring new technologies and approaches. The goal is to push boundaries 
                  while building things that actually work in the real world.
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
                  I deliver high-quality work fast. Speed doesn't mean cutting corners - 
                  it means being efficient and focused on what matters.
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
                  Technology should make people more capable, not replace them. 
                  I design everything with the actual user's needs and experience in mind.
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
                  I build systems that grow with your business. From prototype to enterprise scale, 
                  the architecture should be maintainable and extensible from day one.
                </Typography>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}