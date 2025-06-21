'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: '/', label: 'Home', color: 'glow-primary' },
    { href: '/projects', label: 'Projects', color: 'glow-primary' },
    { href: '/github-activity', label: 'Activity', color: 'glow-primary' },
    { href: '/prompts', label: 'Prompts', color: 'glow-primary' },
    { href: '/prompt-engineer', label: 'AI Engineer', color: 'glow-secondary' },
    { href: '/about', label: 'About', color: 'glow-primary' },
    { href: '/contact', label: 'Contact', color: 'glow-primary' },
  ];

  return (
    <>
      <header className="sticky top-0 z-[100] backdrop-blur-md bg-primary/90 border-b border-subtle">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-lg sm:text-xl lg:text-2xl font-display font-bold flex items-center group z-[110]"
              onClick={closeMenu}
            >
              <span className="mr-1 sm:mr-2 text-tech transition-colors group-hover:text-glow-primary font-tech">
                THE
              </span>
              <span className="text-glow-subtle transition-colors group-hover:text-glow font-display">
                CEPHUS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-tech font-medium text-secondary hover:text-${link.color} transition-colors duration-200 relative group uppercase tracking-wide text-sm xl:text-base`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-0 h-px bg-${link.color} transition-all duration-200 group-hover:w-full shadow-glow`}></span>
                </Link>
              ))}
              <a 
                href="https://github.com/theCephusHasLanded" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-tech font-medium text-secondary hover:text-glow-primary transition-colors duration-200 flex items-center relative group uppercase tracking-wide text-sm xl:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub
                <span className="absolute bottom-0 left-0 w-0 h-px bg-glow-primary transition-all duration-200 group-hover:w-full shadow-glow"></span>
              </a>
            </nav>

            {/* Mobile/Tablet Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-secondary hover:text-glow-primary transition-colors duration-200 z-[110] relative touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-6">
                {isMobileMenuOpen ? (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="absolute inset-0 w-full h-full animate-in spin-in-90 duration-200"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="absolute inset-0 w-full h-full animate-in fade-in duration-200"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Navigation Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[90] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-lg animate-in fade-in duration-300"
            onClick={closeMenu}
            aria-hidden="true"
          />
          
          {/* Menu Content */}
          <div className="relative z-[95] flex flex-col items-center justify-center min-h-screen p-6 animate-in slide-in-from-top duration-300">
            {/* Navigation Links */}
            <nav className="flex flex-col items-center space-y-6 sm:space-y-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`text-2xl sm:text-3xl md:text-4xl font-tech font-medium text-secondary hover:text-${link.color} transition-all duration-300 uppercase tracking-wide transform hover:scale-105 animate-in slide-in-from-top duration-500`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* GitHub Link */}
              <a 
                href="https://github.com/theCephusHasLanded" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-2xl sm:text-3xl md:text-4xl font-tech font-medium text-secondary hover:text-glow-primary transition-all duration-300 flex items-center uppercase tracking-wide transform hover:scale-105 animate-in slide-in-from-top duration-500"
                style={{ animationDelay: `${navLinks.length * 100}ms` }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 sm:mr-4">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub
              </a>
            </nav>
            
            {/* Close instruction */}
            <div className="mt-12 sm:mt-16 text-center animate-in fade-in duration-700 delay-500">
              <p className="text-sm sm:text-base text-secondary/60 uppercase tracking-wide font-tech">
                Press ESC or tap outside to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}