'use client';

import { useState } from 'react';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const openLinkedInMessage = () => {
    // LinkedIn messaging URL - using your actual LinkedIn profile
    const linkedInUrl = 'https://www.linkedin.com/in/thecephus/';
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-glow-primary text-white p-4 rounded-full shadow-glow-lg hover:shadow-glow transition-all duration-300 z-40"
        aria-label="Provide Feedback"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-glow max-w-md w-full p-6 rounded-lg border border-glow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-headline text-xl">Send Feedback</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-body">
                I&apos;d love to hear your thoughts! Click below to send me a private message on LinkedIn.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={openLinkedInMessage}
                  className="btn-editorial-primary w-full flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Message on LinkedIn
                </button>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-editorial"
                >
                  Maybe Later
                </button>
              </div>
              
              <p className="text-caption text-center">
                Your feedback helps me improve this portfolio and future projects.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}