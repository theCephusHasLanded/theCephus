"use client";

import { useState } from 'react';

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type CyberTabsProps = {
  tabs: Tab[];
  initialTab?: string;
};

export default function CyberTabs({ tabs, initialTab }: CyberTabsProps) {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0].id);

  return (
    <div className="w-full">
      {/* Tab navigation */}
      <div className="relative flex space-x-1 mb-6 bg-sepia-800/30 p-1 rounded-t-lg backdrop-blur-sm border-b border-accent/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 font-medium text-sm transition-all duration-200 overflow-hidden 
              ${activeTab === tab.id 
                ? 'text-sepia-100 bg-sepia-800/80 shadow-inner-cyber' 
                : 'text-sepia-300 hover:text-sepia-100 hover:bg-sepia-800/40'
              } rounded-t-md`}
          >
            {/* Tab highlight effect */}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent animate-pulse-slow"></span>
            )}
            
            {/* Glass effect */}
            <span className="absolute inset-0 opacity-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></span>
            
            {tab.label}
          </button>
        ))}
        
        {/* Tab connector line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-accent/30"></div>
      </div>

      {/* Tab content */}
      <div className="bg-sepia-900/70 backdrop-blur-sm p-4 rounded-b-lg rounded-tr-lg border border-sepia-700/40">
        {tabs.map((tab) => (
          <div 
            key={tab.id} 
            className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}