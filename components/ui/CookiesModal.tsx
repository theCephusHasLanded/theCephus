'use client';

import { useState, useEffect } from 'react';

export default function CookiesModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookiesConsent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookiesConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="bg-glow w-full p-6 border-t border-glow">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-headline text-lg mb-2">Cookie Consent</h3>
              <p className="text-body text-sm">
                This website uses cookies to enhance your experience and analyze site traffic. 
                By continuing to use this site, you consent to our use of cookies.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={declineCookies}
                className="btn-editorial px-4 py-2 text-sm"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="btn-editorial-primary px-4 py-2 text-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}