'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DynamicBackground from '@/components/ui/DynamicBackground';
import LoadingScreen from '@/components/ui/LoadingScreen';
import AlienGuide from '@/components/ui/AlienGuide';
import CookiesModal from '@/components/ui/CookiesModal';
import FeedbackWidget from '@/components/ui/FeedbackWidget';

interface LayoutClientProps {
  children: React.ReactNode;
}

type AppState = 'loading' | 'main';

export default function LayoutClient({ children }: LayoutClientProps) {
  const [appState, setAppState] = useState<AppState>('loading');
  const [showAlienGuide, setShowAlienGuide] = useState(false);

  useEffect(() => {
    // Check if user has seen the loading screen recently
    const hasSeenLoading = localStorage.getItem('hasSeenLoading');
    const lastSeen = localStorage.getItem('loadingLastSeen');
    const now = Date.now();
    
    // For development: always skip loading on localhost if URL has skip param
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.search.includes('skip=true'))) {
      setAppState('main');
      setShowAlienGuide(true);
      return;
    }
    
    // Show loading screen if never seen or if it's been more than 1 hour
    if (!hasSeenLoading || !lastSeen || (now - parseInt(lastSeen)) > 3600000) {
      // Show loading screen
      setAppState('loading');
    } else {
      // Skip loading for recent visitors
      setAppState('main');
      setShowAlienGuide(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    localStorage.setItem('hasSeenLoading', 'true');
    localStorage.setItem('loadingLastSeen', Date.now().toString());
    setAppState('main');
    setShowAlienGuide(true);
  };

  // Loading Screen
  if (appState === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  // Main Application
  return (
    <>
      <DynamicBackground />
      <div className="absolute inset-0 scanlines pointer-events-none z-0"></div>
      <Header />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
      <AlienGuide isActive={showAlienGuide} />
      <CookiesModal />
      <FeedbackWidget />
    </>
  );
}