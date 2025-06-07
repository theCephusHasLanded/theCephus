'use client';

import { useState } from 'react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-glow max-w-4xl max-h-[90vh] overflow-y-auto p-8 rounded-lg border border-glow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headline text-2xl">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6 text-body">
          <section>
            <h3 className="text-subhead text-lg mb-3">Information Collection</h3>
            <p>
              This website may collect certain information about your visit, including pages viewed, 
              time spent on the site, and technical information about your device and browser.
            </p>
          </section>
          
          <section>
            <h3 className="text-subhead text-lg mb-3">Cookies</h3>
            <p>
              We use cookies and similar technologies to enhance your browsing experience, 
              analyze site traffic, and provide personalized content. You can control cookie 
              settings through your browser preferences.
            </p>
          </section>
          
          <section>
            <h3 className="text-subhead text-lg mb-3">Third-Party Services</h3>
            <p>
              This site may integrate with third-party services such as GitHub API, LinkedIn, 
              and analytics providers. These services have their own privacy policies governing 
              the use of your information.
            </p>
          </section>
          
          <section>
            <h3 className="text-subhead text-lg mb-3">Data Security</h3>
            <p>
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>
          
          <section>
            <h3 className="text-subhead text-lg mb-3">Contact Information</h3>
            <p>
              If you have any questions about this privacy policy or our data practices, 
              please contact Christina Cephus through the contact form or LinkedIn.
            </p>
          </section>
          
          <section>
            <h3 className="text-subhead text-lg mb-3">Updates</h3>
            <p>
              This privacy policy may be updated from time to time. We encourage you to 
              review this policy periodically for any changes.
            </p>
            <p className="text-caption mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}