'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  threshold = 0.1,
  className = ''
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );
    
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, threshold]);
  
  return (
    <div 
      ref={elementRef}
      className={`fade-in-up ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}