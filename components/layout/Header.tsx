import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-primary/80 border-b border-subtle">
      <div className="container-custom py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-headline font-display font-bold flex items-center group">
            <span className="mr-2 text-tech transition-colors group-hover:text-glow-primary font-tech">THE</span>
            <span className="text-glow-subtle transition-colors group-hover:text-glow font-display">CEPHUS</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-tech font-medium text-secondary hover:text-glow-primary transition-colors duration-200 relative group uppercase tracking-wide">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-px bg-glow-primary transition-all duration-200 group-hover:w-full shadow-glow"></span>
            </Link>
            <Link href="/projects" className="font-tech font-medium text-secondary hover:text-glow-primary transition-colors duration-200 relative group uppercase tracking-wide">
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-px bg-glow-primary transition-all duration-200 group-hover:w-full shadow-glow"></span>
            </Link>
            <Link href="/github-activity" className="font-tech font-medium text-secondary hover:text-glow-primary transition-colors duration-200 relative group uppercase tracking-wide">
              Activity
              <span className="absolute bottom-0 left-0 w-0 h-px bg-glow-primary transition-all duration-200 group-hover:w-full shadow-glow"></span>
            </Link>
            <Link href="/prompts" className="font-tech font-medium text-secondary hover:text-glow-primary transition-colors duration-200 relative group uppercase tracking-wide">
              Prompts
              <span className="absolute bottom-0 left-0 w-0 h-px bg-glow-primary transition-all duration-200 group-hover:w-full shadow-glow"></span>
            </Link>
            <Link href="/prompt-engineer" className="font-tech font-medium text-secondary hover:text-glow-secondary transition-colors duration-200 relative group uppercase tracking-wide">
              AI Engineer
              <span className="absolute bottom-0 left-0 w-0 h-px bg-glow-secondary transition-all duration-200 group-hover:w-full shadow-glow"></span>
            </Link>
            <Link href="/about" className="font-tech font-medium text-secondary hover:text-glow-primary transition-colors duration-200 relative group uppercase tracking-wide">
              About
              <span className="absolute bottom-0 left-0 w-0 h-px bg-glow-primary transition-all duration-200 group-hover:w-full shadow-glow"></span>
            </Link>
            <Link href="/contact" className="font-tech font-medium text-secondary hover:text-glow-primary transition-colors duration-200 relative group uppercase tracking-wide">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-px bg-glow-primary transition-all duration-200 group-hover:w-full shadow-glow"></span>
            </Link>
            <a 
              href="https://github.com/theCephusHasLanded" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-tech font-medium text-secondary hover:text-glow-primary transition-colors duration-200 flex items-center relative group uppercase tracking-wide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
              <span className="absolute bottom-0 left-0 w-0 h-px bg-glow-primary transition-all duration-200 group-hover:w-full shadow-glow"></span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-secondary hover:text-glow-primary transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}