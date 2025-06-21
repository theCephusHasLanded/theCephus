'use client';

import { useState, useEffect } from 'react';
import PopupForm from '@/components/ui/PopupForm';
import ConstellationBackground from '@/components/ui/ConstellationBackground';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenAIAgentPopup');
    
    if (!hasSeenPopup) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem('hasSeenAIAgentPopup', 'true');
  };
  return (
    <div className="min-h-screen">
      <ConstellationBackground />
      {/* Hero Section - Asymmetric Layout */}
      <section className="py-32 md:py-40 relative">
        <div className="container-custom">
          <div className="asymmetric-grid items-center">
            <div className="fade-in-up">
              <h1 className="text-display-lg md:text-display-lg font-display font-bold mb-8 text-balance">
                <span className="block text-primary text-glow-subtle">Christina Cephus</span>
                <span className="text-glow-primary italic">theCephus</span>
              </h1>
              
              <p className="text-body-lg text-secondary max-w-2xl mb-12 leading-relaxed">
                Software developer specializing in ultra-fast shipped content and AI-engineered web applications. 
                Building the future with artificial intelligence that transforms ideas into reality.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href="/projects" 
                  className="btn-primary px-8 py-4 text-body font-medium"
                >
                  View My Projects
                </a>
                <a 
                  href="/prompts" 
                  className="btn-outline px-8 py-4 text-body font-medium"
                >
                  Explore Prompts
                </a>
              </div>
            </div>
            
            <div className="fade-in-up hidden md:block">
              <div className="relative">
                <div className="w-80 h-96 bg-glow border-glow rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=800&fit=crop&crop=faces" 
                    alt="AI Technology Concept" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-80 h-96 border border-glow bg-accent/20 rounded-lg backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section className="py-32 bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <h2 className="text-headline font-display font-semibold mb-8 text-primary">Latest GitHub Activity</h2>
              <div className="flex items-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-secondary">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <h3 className="font-body font-medium text-secondary">@thecephushaslanded</h3>
              </div>
              <a 
                href="https://github.com/thecephushaslanded" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-200 font-body"
              >
                View Full Profile →
              </a>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="glow-card p-8 hover:shadow-editorial-lg transition-all duration-500 group">
                <h4 className="font-display font-medium text-subhead text-primary mb-3 group-hover:text-glow transition-colors">
                  AI Portfolio
                </h4>
                <p className="text-body text-secondary mb-6 leading-relaxed">
                  Modern portfolio showcasing AI projects and prompt engineering expertise. 
                  Built with enhanced glowing design and high-contrast typography.
                </p>
                <div className="flex items-center text-caption text-secondary">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-glow-primary mr-2 animate-glow-pulse"></span>
                    TypeScript
                  </span>
                  <span className="mx-4">•</span>
                  <span>Updated 2 days ago</span>
                </div>
              </div>

              <div className="editorial-card p-8 hover:shadow-editorial transition-all duration-300">
                <h4 className="font-display font-medium text-subhead text-primary mb-3">Ultra Fast Content Engine</h4>
                <p className="text-body text-secondary mb-6 leading-relaxed">
                  AI-powered content generation tool with lightning-fast delivery. 
                  Optimized for performance and user experience.
                </p>
                <div className="flex items-center text-caption text-secondary">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
                    JavaScript
                  </span>
                  <span className="mx-4">•</span>
                  <span>Updated 1 week ago</span>
                </div>
              </div>

              <div className="editorial-card p-8 hover:shadow-editorial transition-all duration-300">
                <h4 className="font-display font-medium text-subhead text-primary mb-3">LKHN Universal Wealth</h4>
                <p className="text-body text-secondary mb-6 leading-relaxed">
                  Financial platform with AI-driven investment recommendations. 
                  Combining fintech innovation with machine learning insights.
                </p>
                <div className="flex items-center text-caption text-secondary">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
                    React
                  </span>
                  <span className="mx-4">•</span>
                  <span>Updated 3 weeks ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-32">
        <div className="container-custom">
          <header className="mb-16">
            <h2 className="text-display font-display font-bold text-primary mb-6">Featured AI Projects</h2>
            <p className="text-body-lg text-secondary max-w-2xl leading-relaxed">
              A curated selection of artificial intelligence projects showcasing innovation, 
              performance optimization, and cutting-edge technology integration.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="glow-card p-12 hover:shadow-glow-lg transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <img 
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop" 
                  alt="AI Content Generation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-headline font-display font-semibold text-primary mb-6 group-hover:text-glow-primary transition-colors duration-300">
                  Ultra Fast Content Engine
                </h3>
                <p className="text-body text-secondary leading-relaxed mb-8">
                  Revolutionary AI-powered system engineered for generating optimized content 
                  with unprecedented speed and minimal latency. Built with performance-first architecture.
                </p>
                <div className="text-caption text-glow-primary">
                  <span>AI • Performance • Optimization</span>
                </div>
              </div>
            </div>
            
            <div className="editorial-card p-12 hover:shadow-editorial-lg transition-all duration-500 group">
              <h3 className="text-headline font-display font-semibold text-primary mb-6 group-hover:text-accent transition-colors duration-300">
                LKHN Universal Wealth
              </h3>
              <p className="text-body text-secondary leading-relaxed mb-8">
                Sophisticated financial platform integrating artificial intelligence for 
                wealth management tools and investment recommendations with real-time market analysis.
              </p>
              <div className="text-caption text-secondary">
                <span>FinTech • AI • Investment</span>
              </div>
            </div>
            
            <div className="editorial-card p-12 hover:shadow-editorial-lg transition-all duration-500 group lg:col-span-2">
              <h3 className="text-headline font-display font-semibold text-primary mb-6 group-hover:text-accent transition-colors duration-300">
                Final Mile Astro Logistics
              </h3>
              <p className="text-body text-secondary leading-relaxed mb-8">
                Advanced space logistics optimization platform utilizing machine learning algorithms 
                for efficient resource allocation and mission planning in extraterrestrial environments.
              </p>
              <div className="text-caption text-secondary">
                <span>Space Tech • Logistics • Machine Learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Prompts Section */}
      <section className="py-32 bg-secondary">
        <div className="container-custom">
          <div className="asymmetric-grid items-start mb-16">
            <div>
              <h2 className="text-display font-display font-bold text-primary mb-6">Curated AI Prompts</h2>
              <p className="text-body-lg text-secondary leading-relaxed">
                Expertly crafted prompts designed to unlock the full potential of artificial intelligence. 
                Each prompt is refined for clarity, efficiency, and optimal results.
              </p>
            </div>
            <div className="flex justify-end">
              <a href="/prompts" className="text-primary hover:text-accent transition-colors duration-200 font-body">
                View all prompts →
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="editorial-card p-8 hover:shadow-editorial transition-all duration-300 group">
              <h3 className="text-subhead font-display font-medium text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                Professional Email Writer
              </h3>
              <p className="text-body text-secondary leading-relaxed mb-6">
                Generate professional, concise emails for any business context with perfect tone and structure.
              </p>
              <div className="text-caption text-secondary">
                <span>Business • Communication • Professional</span>
              </div>
            </div>
            
            <div className="editorial-card p-8 hover:shadow-editorial transition-all duration-300 group">
              <h3 className="text-subhead font-display font-medium text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                Creative Story Starter
              </h3>
              <p className="text-body text-secondary leading-relaxed mb-6">
                Spark your imagination with compelling story beginnings tailored to your creative vision.
              </p>
              <div className="text-caption text-secondary">
                <span>Creative • Writing • Storytelling</span>
              </div>
            </div>
            
            <div className="editorial-card p-8 hover:shadow-editorial transition-all duration-300 group">
              <h3 className="text-subhead font-display font-medium text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                Code Documentation
              </h3>
              <p className="text-body text-secondary leading-relaxed mb-6">
                Create comprehensive, clear documentation that makes your code accessible and maintainable.
              </p>
              <div className="text-caption text-secondary">
                <span>Development • Documentation • Technical</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Newsletter Agent Popup */}
      <PopupForm isVisible={showPopup} onClose={handleClosePopup} />
    </div>
  );
}