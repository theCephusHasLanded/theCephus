'use client';

import { useEffect, useState } from 'react';

interface EtherealTransitionProps {
  onComplete: () => void;
}

export default function EtherealTransition({ onComplete }: EtherealTransitionProps) {
  const [phase, setPhase] = useState<'entering' | 'morphing' | 'revealing' | 'complete'>('entering');

  useEffect(() => {
    const sequence = [
      { phase: 'morphing' as const, delay: 2000 },
      { phase: 'revealing' as const, delay: 4000 },
      { phase: 'complete' as const, delay: 6000 }
    ];

    sequence.forEach(({ phase: nextPhase, delay }) => {
      setTimeout(() => setPhase(nextPhase), delay);
    });

    setTimeout(onComplete, 7000);
  }, [onComplete]);

  return (
    <div className="ethereal-transition">
      {/* Particle Field */}
      <div className="particle-field">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="ethereal-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Morphing Geometric Shapes */}
      <div className="geometric-field">
        <div className="geo-shape shape-1"></div>
        <div className="geo-shape shape-2"></div>
        <div className="geo-shape shape-3"></div>
        <div className="geo-shape shape-4"></div>
      </div>

      {/* Central Portal */}
      <div className="portal-container">
        <div className="portal-ring ring-outer"></div>
        <div className="portal-ring ring-middle"></div>
        <div className="portal-ring ring-inner"></div>
        <div className="portal-core">
          <div className="alien-constellation">
            <div className="alien-main">👾</div>
            <div className="alien-orbit alien-1">👾</div>
            <div className="alien-orbit alien-2">👾</div>
            <div className="alien-orbit alien-3">👾</div>
          </div>
        </div>
      </div>

      {/* Phase-specific overlays */}
      {phase === 'entering' && (
        <div className="phase-overlay entering">
          <div className="welcome-text">
            <h1 className="ethereal-title">WELCOME TO THE NEXUS</h1>
            <p className="ethereal-subtitle">Initializing quantum bridge...</p>
          </div>
        </div>
      )}

      {phase === 'morphing' && (
        <div className="phase-overlay morphing">
          <div className="morph-text">
            <h2 className="phase-title">REALITY SHIFTING</h2>
            <div className="data-stream">
              <div className="data-line">01001000 01100101 01101100 01101100 01101111</div>
              <div className="data-line">01010100 01101000 01100101 01000011 01100101</div>
              <div className="data-line">01110000 01101000 01110101 01110011 00100001</div>
            </div>
          </div>
        </div>
      )}

      {phase === 'revealing' && (
        <div className="phase-overlay revealing">
          <div className="reveal-text">
            <h2 className="phase-title">ENTERING THE CEPHUS DIMENSION</h2>
            <p className="reveal-subtitle">Where AI meets imagination...</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .ethereal-transition {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: 
            radial-gradient(circle at 30% 30%, rgba(0, 200, 255, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(120, 100, 255, 0.1) 0%, transparent 60%),
            linear-gradient(135deg, 
              rgba(8, 10, 20, 0.95) 0%, 
              rgba(15, 20, 35, 0.98) 50%, 
              rgba(8, 10, 20, 0.95) 100%);
          overflow: hidden;
        }

        .particle-field {
          position: absolute;
          inset: 0;
        }

        .ethereal-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(0, 200, 255, 0.8);
          border-radius: 50%;
          animation: ethereal-drift linear infinite;
          box-shadow: 0 0 6px rgba(0, 200, 255, 0.6);
        }

        .geometric-field {
          position: absolute;
          inset: 0;
        }

        .geo-shape {
          position: absolute;
          border: 1px solid rgba(0, 200, 255, 0.3);
          animation: geo-float 8s ease-in-out infinite;
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 10%;
          transform: rotate(45deg);
          border-radius: 20%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 80px;
          height: 80px;
          top: 60%;
          right: 15%;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          animation-delay: 2s;
        }

        .shape-3 {
          width: 120px;
          height: 120px;
          bottom: 20%;
          left: 20%;
          border-radius: 50%;
          animation-delay: 4s;
        }

        .shape-4 {
          width: 60px;
          height: 60px;
          top: 30%;
          right: 30%;
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
          animation-delay: 1s;
        }

        .portal-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
        }

        .portal-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
        }

        .ring-outer {
          width: 100%;
          height: 100%;
          border-top-color: rgba(0, 200, 255, 0.6);
          border-right-color: rgba(0, 200, 255, 0.3);
          animation: portal-rotate 4s linear infinite;
        }

        .ring-middle {
          width: 70%;
          height: 70%;
          top: 15%;
          left: 15%;
          border-left-color: rgba(120, 100, 255, 0.5);
          border-bottom-color: rgba(120, 100, 255, 0.2);
          animation: portal-rotate 3s linear infinite reverse;
        }

        .ring-inner {
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
          border-top-color: rgba(0, 255, 255, 0.7);
          border-right-color: rgba(0, 255, 255, 0.4);
          animation: portal-rotate 2s linear infinite;
        }

        .portal-core {
          position: absolute;
          top: 40%;
          left: 40%;
          width: 20%;
          height: 20%;
          background: radial-gradient(circle, 
            rgba(0, 200, 255, 0.4) 0%, 
            rgba(120, 100, 255, 0.2) 50%, 
            transparent 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: portal-pulse 2s ease-in-out infinite;
        }

        .alien-constellation {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .alien-main {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          animation: alien-main-glow 2s ease-in-out infinite;
          filter: drop-shadow(0 0 15px rgba(0, 200, 255, 0.8));
        }

        .alien-orbit {
          position: absolute;
          font-size: 1rem;
          animation: orbit 6s linear infinite;
          filter: drop-shadow(0 0 8px rgba(0, 200, 255, 0.6));
        }

        .alien-1 {
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 0s;
        }

        .alien-2 {
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          animation-delay: 2s;
        }

        .alien-3 {
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 4s;
        }

        .phase-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .ethereal-title {
          font-family: 'Orbitron', monospace;
          font-size: 3rem;
          font-weight: 800;
          color: rgba(240, 245, 255, 0.9);
          text-shadow: 
            0 0 10px rgba(0, 200, 255, 0.6),
            0 0 20px rgba(0, 200, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          animation: title-glow 3s ease-in-out infinite;
        }

        .ethereal-subtitle {
          font-family: 'Exo 2', sans-serif;
          font-size: 1.2rem;
          color: rgba(180, 200, 240, 0.8);
          letter-spacing: 0.05em;
          animation: subtitle-fade 2s ease-in-out infinite alternate;
        }

        .phase-title {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: rgba(0, 200, 255, 0.9);
          text-shadow: 0 0 15px rgba(0, 200, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          animation: phase-pulse 1.5s ease-in-out infinite;
        }

        .data-stream {
          font-family: 'Orbitron', monospace;
          font-size: 0.8rem;
          color: rgba(0, 255, 255, 0.7);
          line-height: 1.5;
        }

        .data-line {
          animation: data-scroll 2s ease-in-out infinite;
          opacity: 0.7;
        }

        .data-line:nth-child(2) { animation-delay: 0.5s; }
        .data-line:nth-child(3) { animation-delay: 1s; }

        .reveal-subtitle {
          font-family: 'Exo 2', sans-serif;
          font-size: 1.1rem;
          color: rgba(180, 200, 240, 0.8);
          font-style: italic;
          animation: reveal-shimmer 2s ease-in-out infinite;
        }

        @keyframes ethereal-drift {
          0% { 
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% { 
            opacity: 1;
            transform: scale(1);
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translateY(-100px) translateX(100px) scale(0);
            opacity: 0;
          }
        }

        @keyframes geo-float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.7;
          }
        }

        @keyframes portal-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes portal-pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 30px rgba(0, 200, 255, 0.4);
          }
          50% { 
            transform: scale(1.2);
            box-shadow: 0 0 50px rgba(0, 200, 255, 0.7);
          }
        }

        @keyframes alien-main-glow {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            filter: drop-shadow(0 0 15px rgba(0, 200, 255, 0.8));
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.1);
            filter: drop-shadow(0 0 25px rgba(0, 255, 255, 1));
          }
        }

        @keyframes orbit {
          from { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }

        @keyframes title-glow {
          0%, 100% { 
            text-shadow: 
              0 0 10px rgba(0, 200, 255, 0.6),
              0 0 20px rgba(0, 200, 255, 0.4);
          }
          50% { 
            text-shadow: 
              0 0 20px rgba(0, 255, 255, 0.8),
              0 0 40px rgba(0, 200, 255, 0.6);
          }
        }

        @keyframes subtitle-fade {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        @keyframes phase-pulse {
          0%, 100% { 
            transform: scale(1);
            text-shadow: 0 0 15px rgba(0, 200, 255, 0.6);
          }
          50% { 
            transform: scale(1.05);
            text-shadow: 0 0 25px rgba(0, 255, 255, 0.8);
          }
        }

        @keyframes data-scroll {
          0% { 
            transform: translateX(-100%);
            opacity: 0;
          }
          50% { 
            opacity: 0.7;
          }
          100% { 
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes reveal-shimmer {
          0%, 100% { 
            opacity: 0.8;
            text-shadow: 0 0 5px rgba(180, 200, 240, 0.5);
          }
          50% { 
            opacity: 1;
            text-shadow: 0 0 15px rgba(180, 200, 240, 0.8);
          }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .portal-container {
            width: 300px;
            height: 300px;
          }
          
          .ethereal-title {
            font-size: 2rem;
          }
          
          .phase-title {
            font-size: 1.5rem;
          }
          
          .alien-main {
            font-size: 1.5rem;
          }
          
          .alien-orbit {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}