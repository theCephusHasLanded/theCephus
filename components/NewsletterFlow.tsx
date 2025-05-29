'use client';

import { useState } from 'react';
import NewsletterWaitlist from './ui/NewsletterWaitlist';
import WaitingScreen from './ui/WaitingScreen';

interface NewsletterFlowProps {
  onComplete: () => void;
}

export default function NewsletterFlow({ onComplete }: NewsletterFlowProps) {
  const [currentStep, setCurrentStep] = useState<'waitlist' | 'waiting' | 'complete'>('waitlist');

  const handleWaitlistComplete = () => {
    setCurrentStep('waiting');
  };

  const handleWaitingComplete = () => {
    setCurrentStep('complete');
    onComplete();
  };

  if (currentStep === 'waitlist') {
    return <NewsletterWaitlist onComplete={handleWaitlistComplete} />;
  }

  if (currentStep === 'waiting') {
    return <WaitingScreen onComplete={handleWaitingComplete} />;
  }

  return null;
}