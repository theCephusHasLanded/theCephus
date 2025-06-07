'use client';

import { useState } from 'react';
import PrivacyPolicyModal from '@/components/ui/PrivacyPolicyModal';

export default function Footer() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <>
      <footer className="relative z-10 bg-primary/80 backdrop-blur-md border-t border-subtle">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-caption">
              © {new Date().getFullYear()} Christina Cephus. All rights reserved.
            </div>
            <div className="flex gap-6 text-caption">
              <button
                onClick={() => setShowPrivacyPolicy(true)}
                className="hover:text-glow-primary transition-colors"
              >
                Privacy Policy
              </button>
              <a 
                href="https://linkedin.com/in/christinacephus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-glow-primary transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/theCephusHasLanded" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-glow-primary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <PrivacyPolicyModal 
        isOpen={showPrivacyPolicy} 
        onClose={() => setShowPrivacyPolicy(false)} 
      />
    </>
  );
}