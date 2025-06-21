'use client';

import { useState, useEffect } from 'react';

export default function ConstellationBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // High-quality constellation and space images from Unsplash
  const constellationImages = [
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop&q=80', // Stars and galaxy
    'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1920&h=1080&fit=crop&q=80', // Constellation
    'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1920&h=1080&fit=crop&q=80', // Milky way
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80', // Night sky with stars
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop&q=80', // Galaxy and stars
    'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=1920&h=1080&fit=crop&q=80', // Space nebula
    'https://images.unsplash.com/photo-1435527173128-983b87201f4d?w=1920&h=1080&fit=crop&q=80', // Deep space
    'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1920&h=1080&fit=crop&q=80', // Constellation patterns
  ];

  useEffect(() => {
    // Change background every minute (60000ms)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % constellationImages.length);
    }, 60000);

    return () => clearInterval(interval);
  }, [constellationImages.length]);

  return (
    <div className="constellation-background">
      {constellationImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ease-in-out ${
            index === currentImageIndex ? 'opacity-30' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            filter: 'brightness(0.4) contrast(1.2) saturate(1.1)',
          }}
        />
      ))}
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
      
      {/* Subtle animation overlay */}
      <div className="absolute inset-0">
        <div className="stars-animation" />
      </div>

      <style jsx>{`
        .constellation-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          overflow: hidden;
        }

        .stars-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(0, 200, 255, 0.6), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.9), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(120, 100, 255, 0.7), transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(255, 255, 255, 0.6), transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: twinkle 4s ease-in-out infinite alternate;
        }

        @keyframes twinkle {
          0% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
          100% { opacity: 0.9; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}