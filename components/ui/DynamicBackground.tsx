"use client";

import { useEffect, useState } from 'react';

const backgrounds = [
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=crop", // Cyberpunk city
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=crop", // Futuristic technology
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=crop", // Tech abstract
  "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=crop", // Cyber aesthetics
  "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=crop", // Sci-fi landscape
];

export default function DynamicBackground() {
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");

  useEffect(() => {
    // Select a random background on component mount
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBackgroundUrl(backgrounds[randomIndex]);
  }, []);

  if (!backgroundUrl) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      
      {/* Sepia overlay */}
      <div className="absolute inset-0 bg-sepia-900/70 mix-blend-multiply" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-sepia-900/60 via-transparent to-sepia-900/70" />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[url('/images/scanlines.png')] opacity-10" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient opacity-60" />
      
      {/* Cyber glow */}
      <div className="absolute inset-0 bg-cyber-glow opacity-30" />
    </div>
  );
}