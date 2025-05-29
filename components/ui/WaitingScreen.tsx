'use client';

import { useState, useEffect } from 'react';
import Typography from './Typography';
import Button from './Button';

interface WaitingScreenProps {
  onComplete: () => void;
}

const loadingSteps = [
  'Initializing AI Agent Core...',
  'Training neural pathways...',
  'Calibrating intelligence protocols...',
  'Syncing with AI networks...',
  'Agent deployment ready...'
];

const insights = [
  {
    title: 'Revolutionary AI Agent Technology',
    description: 'The world\'s first intelligent newsletter agent that learns, adapts, and evolves with your interests in real-time.'
  },
  {
    title: 'Autonomous Intelligence',
    description: 'Your personal AI agent will autonomously research, analyze, and curate content while you focus on what matters most.'
  },
  {
    title: 'Predictive Content Discovery',
    description: 'Advanced machine learning algorithms predict what you need to know before you even realize you need it.'
  },
  {
    title: 'Launch in 2 Weeks',
    description: 'Be among the first to experience the future of information consumption when our AI agents go live.'
  }
];

export default function WaitingScreen({ onComplete }: WaitingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 150);

    const insightInterval = setInterval(() => {
      setCurrentInsight(prev => (prev + 1) % insights.length);
    }, 3000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearInterval(insightInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-animated-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-glow-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-glow-secondary/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-24 h-24 bg-glow-primary/30 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto p-6">
        {/* Main Content */}
        <div className="glow-card p-12 mb-8">
          {/* Logo/Brand */}
          <div className="mb-8">
            <Typography variant="display" color="primary" className="text-glow-subtle mb-4">
              AI NEWSLETTER AGENT
            </Typography>
            <div className="mb-2">
              <Typography variant="body-lg" color="primary" className="text-glow">
                LAUNCHING IN 2 WEEKS
              </Typography>
            </div>
            <Typography variant="body-lg" color="secondary">
              Preparing your intelligent agent deployment system
            </Typography>
          </div>

          {/* Progress Circle */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="rgba(120, 120, 255, 0.2)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(progress / 100) * 314} 314`}
                className="transition-all duration-300 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(120, 120, 255)" />
                  <stop offset="100%" stopColor="rgb(180, 120, 255)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Typography variant="headline" color="primary" className="text-glow">
                {Math.round(progress)}%
              </Typography>
            </div>
          </div>

          {/* Current Step */}
          <Typography variant="body-lg" color="primary" className="mb-2 text-glow-subtle">
            {loadingSteps[currentStep]}
          </Typography>
          
          {/* Progress Bar */}
          <div className="w-full bg-accent/20 rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-glow-primary to-glow-secondary h-2 rounded-full transition-all duration-300 shadow-glow"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Rotating Insights */}
        <div className="glow-card p-8 transition-all duration-500 min-h-[200px] flex items-center">
          <div className="w-full">
            <Typography variant="subhead" color="primary" className="mb-4 text-glow-subtle">
              {insights[currentInsight].title}
            </Typography>
            <Typography variant="body" color="secondary" className="leading-relaxed">
              {insights[currentInsight].description}
            </Typography>
          </div>
        </div>

        {/* Skip Option */}
        <div className="mt-8">
          <Button variant="minimal" onClick={onComplete}>
            Skip waiting and continue →
          </Button>
        </div>
      </div>
    </div>
  );
}