export default function Home() {
  return (
    <div className="container-custom py-12">
      <section className="py-20 md:py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="block">Christina Cephus</span>
          <span className="text-accent cyber-neon">theCephus</span>
        </h1>

        <p className="text-xl text-sepia-300 max-w-3xl mx-auto mt-6">
          Software developer specializing in ultra-fast shipped content and AI-engineered web apps.
          Building the future with AI that transforms ideas into reality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <a 
            href="/projects" 
            className="btn btn-primary px-8 py-3"
          >
            View My Projects
          </a>
          <a 
            href="/prompts" 
            className="btn btn-outline px-8 py-3"
          >
            Explore Prompts
          </a>
        </div>
      </section>

      {/* GitHub Section */}
      <section className="py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center terminal-text">Latest GitHub Activity</h2>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-accent">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <h3 className="font-semibold terminal-text">thecephushaslanded</h3>
            </div>
            <a 
              href="https://github.com/thecephushaslanded" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent cyber-neon hover:text-accent-light"
            >
              View Profile →
            </a>
          </div>

          <div className="space-y-4">
            <div className="cyber-card p-4 hover:shadow-cyber transition-all duration-300">
              <h4 className="font-medium terminal-text">AI Portfolio</h4>
              <p className="text-sm text-sepia-300 mt-1">
                Modern portfolio showcasing AI projects and prompt engineering expertise
              </p>
              <div className="mt-2 flex items-center text-xs text-sepia-400">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow mr-1"></span>
                  TypeScript
                </span>
                <span className="mx-2">•</span>
                <span>Last updated 2 days ago</span>
              </div>
            </div>

            <div className="cyber-card p-4 hover:shadow-cyber transition-all duration-300">
              <h4 className="font-medium terminal-text">Ultra Fast Content Engine</h4>
              <p className="text-sm text-sepia-300 mt-1">
                AI-powered content generation tool with lightning-fast delivery
              </p>
              <div className="mt-2 flex items-center text-xs text-sepia-400">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse-slow mr-1"></span>
                  JavaScript
                </span>
                <span className="mx-2">•</span>
                <span>Last updated 1 week ago</span>
              </div>
            </div>

            <div className="cyber-card p-4 hover:shadow-cyber transition-all duration-300">
              <h4 className="font-medium terminal-text">LKHN Universal Wealth</h4>
              <p className="text-sm text-sepia-300 mt-1">
                Financial platform with AI-driven investment recommendations
              </p>
              <div className="mt-2 flex items-center text-xs text-sepia-400">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-cyber-purple animate-pulse-slow mr-1"></span>
                  React
                </span>
                <span className="mx-2">•</span>
                <span>Last updated 3 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center terminal-text">Featured AI Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 card card-hover text-center hover:shadow-cyber transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2 cyber-neon">Ultra Fast Content Engine</h3>
            <p className="text-sepia-300">AI-powered system for generating optimized content with minimal latency</p>
          </div>
          <div className="p-6 card card-hover text-center hover:shadow-cyber transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2 cyber-neon">LKHN Universal Wealth</h3>
            <p className="text-sepia-300">Financial platform with AI-powered wealth management tools</p>
          </div>
          <div className="p-6 card card-hover text-center hover:shadow-cyber transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2 cyber-neon">Final Mile Astro Logistics</h3>
            <p className="text-sepia-300">Space logistics optimization using advanced AI algorithms</p>
          </div>
        </div>
      </section>
      
      {/* Featured Prompts Section */}
      <section className="py-16">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
          <h2 className="text-2xl md:text-3xl font-bold terminal-text">Curated AI Prompts</h2>
          <a href="/prompts" className="text-accent cyber-neon hover:text-accent-light mt-2 md:mt-0">
            View all prompts →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cyber-card p-6 hover:shadow-cyber transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2 terminal-text">Professional Email Writer</h3>
            <p className="text-sepia-300 text-sm mb-4">Generate professional, concise emails for any business context</p>
          </div>
          <div className="cyber-card p-6 hover:shadow-cyber transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2 terminal-text">Creative Story Starter</h3>
            <p className="text-sepia-300 text-sm mb-4">Get help starting your next creative writing piece</p>
          </div>
          <div className="cyber-card p-6 hover:shadow-cyber transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2 terminal-text">Code Documentation</h3>
            <p className="text-sepia-300 text-sm mb-4">Create clear documentation for your code</p>
          </div>
        </div>
      </section>
    </div>
  );
}