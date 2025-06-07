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
    // Check if user has seen the loading screen
    const hasSeenLoading = localStorage.getItem('hasSeenLoading');
    
    if (hasSeenLoading) {
      // Skip loading for returning users
      setAppState('main');
      setShowAlienGuide(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    localStorage.setItem('hasSeenLoading', 'true');
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