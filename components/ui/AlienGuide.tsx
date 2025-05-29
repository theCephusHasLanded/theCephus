'use client';

import { useEffect, useState, useRef } from 'react';

interface AlienGuideProps {
  isActive: boolean;
}

interface Target {
  element: HTMLElement;
  message: string;
  priority: number;
}

export default function AlienGuide({ isActive }: AlienGuideProps) {
  const [currentTarget, setCurrentTarget] = useState<Target | null>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const alienRef = useRef<HTMLDivElement>(null);
  const messageTimeoutRef = useRef<NodeJS.Timeout>();

  // Find interactive elements to guide users to
  const findTargets = (): Target[] => {
    const targets: Target[] = [];
    
    // Look for buttons, links, and interactive elements
    const buttons = document.querySelectorAll('button, a[href], [role="button"]');
    
    buttons.forEach((element) => {
      if (element instanceof HTMLElement && isElementVisible(element)) {
        const text = element.textContent?.toLowerCase() || '';
        let message = 'Click here to explore! 🚀';
        let priority = 1;
        
        // Customize messages based on element content
        if (text.includes('project')) {
          message = 'Check out my AI projects! 🤖';
          priority = 3;
        } else if (text.includes('prompt')) {
          message = 'Discover advanced AI prompts! 💭';
          priority = 4;
        } else if (text.includes('about')) {
          message = 'Learn about my journey! ✨';
          priority = 2;
        } else if (text.includes('contact')) {
          message = 'Let\'s build something amazing! 📡';
          priority = 2;
        } else if (text.includes('github')) {
          message = 'Explore my code on GitHub! 💻';
          priority = 2;
        } else if (text.includes('newsletter') || text.includes('waitlist')) {
          message = 'Join the tech revolution! 📧';
          priority = 5;
        }
        
        targets.push({ element, message, priority });
      }
    });
    
    return targets.sort((a, b) => b.priority - a.priority);
  };

  const isElementVisible = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && 
           rect.top >= 0 && rect.left >= 0 &&
           rect.bottom <= window.innerHeight && 
           rect.right <= window.innerWidth;
  };

  const moveToTarget = (target: Target) => {
    const rect = target.element.getBoundingClientRect();
    const newX = rect.left + rect.width / 2 - 25;
    const newY = rect.top - 60;
    
    setPosition({ x: newX, y: newY });
    setCurrentTarget(target);
    setShowMessage(true);
    
    // Hide message after 3 seconds
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const randomFloat = () => {
    const targets = findTargets();
    if (targets.length === 0) {
      // Random floating if no targets
      const newX = Math.random() * (window.innerWidth - 100);
      const newY = Math.random() * (window.innerHeight - 100);
      setPosition({ x: newX, y: newY });
      setCurrentTarget(null);
      setShowMessage(false);
      return;
    }
    
    // Pick a random high-priority target
    const highPriorityTargets = targets.filter(t => t.priority >= 3);
    const targetList = highPriorityTargets.length > 0 ? highPriorityTargets : targets;
    const randomTarget = targetList[Math.floor(Math.random() * targetList.length)];
    
    moveToTarget(randomTarget);
  };

  useEffect(() => {
    if (!isActive) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    
    // Initial delay before showing
    const initialTimeout = setTimeout(() => {
      randomFloat();
    }, 2000);

    // Regular movement interval
    const interval = setInterval(() => {
      randomFloat();
    }, 8000);

    // Handle scroll to reposition
    const handleScroll = () => {
      if (currentTarget && isElementVisible(currentTarget.element)) {
        moveToTarget(currentTarget);
      } else {
        randomFloat();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isActive, currentTarget]);

  const handleAlienClick = () => {
    if (currentTarget) {
      currentTarget.element.click();
    } else {
      randomFloat();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Alien Guide */}
      <div
        ref={alienRef}
        className="alien-guide"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onClick={handleAlienClick}
      >
        <div className="alien-container">
          <div className="alien-glow"></div>
          <div className="alien-emoji">👾</div>
          <div className="alien-trail"></div>
        </div>
      </div>

      {/* Message Bubble */}
      {showMessage && currentTarget && (
        <div
          className="alien-message"
          style={{
            transform: `translate(${position.x - 50}px, ${position.y - 40}px)`,
          }}
        >
          <div className="message-bubble">
            {currentTarget.message}
            <div className="message-arrow"></div>
          </div>
        </div>
      )}

      <style jsx>{`
        .alien-guide {
          position: fixed;
          top: 0;
          left: 0;
          width: 50px;
          height: 50px;
          z-index: 100;
          cursor: pointer;
          transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: auto;
        }

        .alien-container {
          position: relative;
          width: 100%;
          height: 100%;
          animation: float 3s ease-in-out infinite;
        }

        .alien-glow {
          position: absolute;
          inset: -10px;
          background: radial-gradient(circle, rgba(0, 200, 255, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .alien-emoji {
          position: relative;
          font-size: 2.5rem;
          z-index: 2;
          animation: bounce 2s ease-in-out infinite;
          filter: drop-shadow(0 0 10px rgba(0, 200, 255, 0.8));
          transition: all 0.3s ease;
        }

        .alien-emoji:hover {
          transform: scale(1.2);
          filter: drop-shadow(0 0 20px rgba(0, 255, 255, 1));
        }

        .alien-trail {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 30px;
          background: linear-gradient(transparent, rgba(0, 200, 255, 0.6), transparent);
          transform: translateX(-50%) translateY(-100%);
          border-radius: 2px;
          animation: trail 3s ease-in-out infinite;
        }

        .alien-message {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99;
          animation: messageAppear 0.5s ease-out;
          pointer-events: none;
        }

        .message-bubble {
          background: linear-gradient(135deg, 
            rgba(15, 20, 35, 0.95) 0%, 
            rgba(25, 30, 50, 0.95) 100%);
          border: 1px solid rgba(0, 200, 255, 0.5);
          border-radius: 12px;
          padding: 8px 16px;
          color: rgb(180, 200, 240);
          font-family: 'Exo 2', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(0, 200, 255, 0.3);
          backdrop-filter: blur(10px);
          position: relative;
          animation: messagePulse 2s ease-in-out infinite;
        }

        .message-arrow {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid rgba(0, 200, 255, 0.5);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(0.9) rotate(5deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
          }
        }

        @keyframes trail {
          0%, 100% { opacity: 0; transform: translateX(-50%) translateY(-100%) scaleY(1); }
          50% { opacity: 1; transform: translateX(-50%) translateY(-120%) scaleY(1.5); }
        }

        @keyframes messageAppear {
          0% { 
            opacity: 0; 
            transform: translateY(-10px) scale(0.8); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }

        @keyframes messagePulse {
          0%, 100% { 
            box-shadow: 
              0 4px 20px rgba(0, 0, 0, 0.5),
              0 0 20px rgba(0, 200, 255, 0.3);
          }
          50% { 
            box-shadow: 
              0 4px 25px rgba(0, 0, 0, 0.6),
              0 0 30px rgba(0, 200, 255, 0.5);
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .alien-guide {
            width: 40px;
            height: 40px;
          }
          
          .alien-emoji {
            font-size: 2rem;
          }
          
          .message-bubble {
            font-size: 0.75rem;
            padding: 6px 12px;
            max-width: 200px;
            white-space: normal;
          }
        }
      `}</style>
    </>
  );
}