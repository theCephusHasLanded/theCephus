'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);
  
  const phases = [
    'INITIALIZING QUANTUM CORE',
    'LOADING NEURAL NETWORKS',
    'CALIBRATING SPACE TECH',
    'SYNCING ALIEN PROTOCOLS',
    'ESTABLISHING CONNECTION'
  ];

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const particleData = [...Array(20)].map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }));
    setParticles(particleData);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 3 + 1;
        const newProgress = prev + increment;
        
        // Update phase based on progress
        const phaseIndex = Math.floor((newProgress / 100) * phases.length);
        setCurrentPhase(Math.min(phaseIndex, phases.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete, phases.length]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-loading cursor-pointer"
      onClick={onComplete}
      title="Click to skip loading"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent">
        {/* Floating Particles */}
        <div className="particles-container">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>

        {/* Rotating Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loading-ring ring-1"></div>
          <div className="loading-ring ring-2"></div>
          <div className="loading-ring ring-3"></div>
        </div>

        {/* Central Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loading-core">
            <div className="core-inner">
              <div className="alien-icon">👾</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading UI */}
      <div className="relative z-10 text-center max-w-lg mx-auto p-8">
        {/* Logo/Title */}
        <h1 className="text-display font-display font-extrabold text-glow mb-8 animate-pulse-glow">
          THE CEPHUS
        </h1>
        
        {/* Phase Text */}
        <div className="mb-8">
          <p className="text-tech font-tech text-glow-primary mb-2 animate-fade-in">
            {phases[currentPhase]}
          </p>
          <div className="flex justify-center items-center space-x-2">
            <div className="loading-dot"></div>
            <div className="loading-dot" style={{ animationDelay: '0.2s' }}></div>
            <div className="loading-dot" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="progress-glow" style={{ left: `${progress}%` }}></div>
          </div>
          <div className="text-caption text-tech-cyan mt-4 font-mono">
            {Math.floor(progress)}% COMPLETE
          </div>
          <div className="text-xs text-tech-cyan/60 mt-2 font-mono animate-pulse">
            Click anywhere to skip
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-loading {
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 200, 255, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(120, 100, 255, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(0, 255, 255, 0.1) 0%, transparent 40%),
            linear-gradient(135deg, rgb(8, 10, 20) 0%, rgb(15, 20, 35) 50%, rgb(8, 10, 20) 100%);
          animation: bgShift 8s ease-in-out infinite;
        }

        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(0, 200, 255, 0.8);
          border-radius: 50%;
          animation: float linear infinite;
          box-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
        }

        .loading-ring {
          position: absolute;
          border: 2px solid transparent;
          border-radius: 50%;
          animation: rotate linear infinite;
        }

        .ring-1 {
          width: 200px;
          height: 200px;
          border-top-color: rgba(0, 200, 255, 0.8);
          border-right-color: rgba(0, 200, 255, 0.4);
          animation-duration: 3s;
        }

        .ring-2 {
          width: 280px;
          height: 280px;
          border-top-color: rgba(120, 100, 255, 0.6);
          border-left-color: rgba(120, 100, 255, 0.3);
          animation-duration: 4s;
          animation-direction: reverse;
        }

        .ring-3 {
          width: 360px;
          height: 360px;
          border-top-color: rgba(0, 255, 255, 0.4);
          border-bottom-color: rgba(0, 255, 255, 0.2);
          animation-duration: 5s;
        }

        .loading-core {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(0, 200, 255, 0.3) 0%, rgba(120, 100, 255, 0.2) 70%, transparent 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse-core 2s ease-in-out infinite;
          box-shadow: 
            0 0 40px rgba(0, 200, 255, 0.5),
            0 0 80px rgba(0, 200, 255, 0.3),
            inset 0 0 40px rgba(0, 200, 255, 0.2);
        }

        .core-inner {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(0, 200, 255, 0.6), rgba(120, 100, 255, 0.4));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: counter-rotate 6s linear infinite;
          border: 2px solid rgba(0, 255, 255, 0.5);
        }

        .alien-icon {
          font-size: 2.5rem;
          animation: alien-glow 1.5s ease-in-out infinite alternate, pixelate-projection 3s ease-in-out infinite;
          filter: 
            drop-shadow(0 0 10px rgba(0, 200, 255, 0.8))
            contrast(1.5)
            brightness(1.3)
            saturate(1.4);
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          text-shadow: 
            0 0 5px rgba(0, 200, 255, 0.9),
            0 0 10px rgba(0, 255, 255, 0.7),
            0 0 15px rgba(120, 100, 255, 0.5),
            2px 2px 0px rgba(0, 150, 200, 0.8),
            -2px -2px 0px rgba(100, 200, 255, 0.6);
          position: relative;
        }

        .alien-icon::before {
          content: '👾';
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.3;
          transform: scale(1.1);
          filter: 
            blur(1px)
            contrast(2)
            brightness(0.7);
          animation: hologram-flicker 0.3s ease-in-out infinite;
        }

        .alien-icon::after {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(0, 200, 255, 0.1) 1px,
              rgba(0, 200, 255, 0.1) 2px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 1px,
              rgba(120, 100, 255, 0.08) 1px,
              rgba(120, 100, 255, 0.08) 2px
            );
          pointer-events: none;
          animation: scan-lines 2s linear infinite;
        }

        .progress-container {
          width: 300px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(0, 200, 255, 0.3);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, 
            rgba(0, 200, 255, 0.8) 0%, 
            rgba(0, 255, 255, 1) 50%, 
            rgba(120, 100, 255, 0.8) 100%);
          transition: width 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shine 2s ease-in-out infinite;
        }

        .progress-glow {
          position: absolute;
          top: -2px;
          width: 10px;
          height: 10px;
          background: rgba(0, 255, 255, 1);
          border-radius: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
          animation: glow-pulse 1s ease-in-out infinite;
        }

        .loading-dot {
          width: 8px;
          height: 8px;
          background: rgba(0, 200, 255, 0.8);
          border-radius: 50%;
          animation: dot-bounce 1.4s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
        }

        @keyframes bgShift {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(30deg); }
        }

        @keyframes float {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes counter-rotate {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes pulse-core {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(0, 200, 255, 0.5); }
          50% { transform: scale(1.1); box-shadow: 0 0 60px rgba(0, 200, 255, 0.8); }
        }

        @keyframes alien-glow {
          0% { text-shadow: 0 0 10px rgba(0, 200, 255, 0.8); }
          100% { text-shadow: 0 0 20px rgba(0, 255, 255, 1), 0 0 30px rgba(0, 200, 255, 0.6); }
        }

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.7; transform: translateX(-50%) scale(1.2); }
        }

        @keyframes dot-bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(0, 200, 255, 0.5); }
          50% { text-shadow: 0 0 20px rgba(0, 200, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.6); }
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes pixelate-projection {
          0%, 100% { 
            transform: scale(1) perspective(1000px) rotateX(0deg);
            filter: 
              drop-shadow(0 0 10px rgba(0, 200, 255, 0.8))
              contrast(1.5)
              brightness(1.3)
              saturate(1.4);
          }
          25% { 
            transform: scale(1.05) perspective(1000px) rotateX(2deg);
            filter: 
              drop-shadow(0 0 15px rgba(0, 200, 255, 1))
              contrast(1.8)
              brightness(1.5)
              saturate(1.6)
              blur(0.5px);
          }
          50% { 
            transform: scale(0.98) perspective(1000px) rotateX(-1deg);
            filter: 
              drop-shadow(0 0 8px rgba(0, 200, 255, 0.6))
              contrast(1.3)
              brightness(1.1)
              saturate(1.2)
              hue-rotate(10deg);
          }
          75% { 
            transform: scale(1.02) perspective(1000px) rotateX(1.5deg);
            filter: 
              drop-shadow(0 0 12px rgba(120, 100, 255, 0.9))
              contrast(1.6)
              brightness(1.4)
              saturate(1.5)
              blur(0.3px);
          }
        }

        @keyframes hologram-flicker {
          0%, 100% { opacity: 0.3; transform: scale(1.1) skewX(0deg); }
          25% { opacity: 0.1; transform: scale(1.15) skewX(0.5deg); }
          50% { opacity: 0.4; transform: scale(1.08) skewX(-0.3deg); }
          75% { opacity: 0.2; transform: scale(1.12) skewX(0.2deg); }
        }

        @keyframes scan-lines {
          0% { transform: translateY(-100%); opacity: 0.8; }
          50% { opacity: 0.4; }
          100% { transform: translateY(100%); opacity: 0.8; }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}