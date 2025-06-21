'use client';

import { useState, useEffect } from 'react';
import Typography from '@/components/ui/Typography';

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

// Simulate AI news feed - in production you'd use real RSS feeds
const AI_NEWS_SOURCES = [
  {
    name: 'OpenAI',
    items: [
      {
        title: 'GPT-4 Turbo with Vision Now Available',
        description: 'Enhanced multimodal capabilities with improved reasoning and vision understanding.',
        link: 'https://openai.com/blog/gpt-4-turbo-with-vision',
        pubDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'OpenAI'
      },
      {
        title: 'Custom GPTs for Enterprise',
        description: 'Build specialized AI assistants for your organization with enhanced security.',
        link: 'https://openai.com/enterprise',
        pubDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'OpenAI'
      }
    ]
  },
  {
    name: 'Anthropic',
    items: [
      {
        title: 'Claude 3 Haiku: Speed Meets Intelligence',
        description: 'Fastest model in the Claude 3 family with exceptional performance.',
        link: 'https://anthropic.com/claude-3-haiku',
        pubDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Anthropic'
      },
      {
        title: 'Constitutional AI Advancements',
        description: 'New breakthroughs in AI safety and alignment research.',
        link: 'https://anthropic.com/research',
        pubDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Anthropic'
      }
    ]
  },
  {
    name: 'Google AI',
    items: [
      {
        title: 'Gemini Ultra Outperforms GPT-4',
        description: 'State-of-the-art performance across text, code, and multimodal tasks.',
        link: 'https://deepmind.google/technologies/gemini/',
        pubDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Google AI'
      },
      {
        title: 'Bard Advanced with Gemini Pro',
        description: 'Enhanced reasoning capabilities and improved factual accuracy.',
        link: 'https://bard.google.com',
        pubDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Google AI'
      }
    ]
  }
];

export default function AINewsRSSFeed() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching RSS feeds
    const fetchNews = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Flatten and sort all news items
      const allNews = AI_NEWS_SOURCES.flatMap(source => source.items)
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .slice(0, 8); // Show latest 8 items
      
      setNewsItems(allNews);
      setIsLoading(false);
    };

    fetchNews();
    
    // Refresh every 30 minutes
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getSourceColor = (source: string): string => {
    switch (source) {
      case 'OpenAI': return 'text-green-400';
      case 'Anthropic': return 'text-orange-400';
      case 'Google AI': return 'text-blue-400';
      default: return 'text-glow-secondary';
    }
  };

  return (
    <div className="bg-glow-primary/5 border border-glow-primary/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="subhead" className="text-glow-primary">
          🚀 Latest AI Model Updates
        </Typography>
        <div className="flex items-center text-xs text-glow-secondary">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          Live Feed
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-glow-primary/20 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-glow-secondary/20 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {newsItems.map((item, index) => (
            <div 
              key={index}
              className="group p-3 rounded-lg border border-glow-primary/10 hover:border-glow-primary/30 hover:bg-glow-primary/5 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <Typography 
                  variant="caption" 
                  className={`font-semibold ${getSourceColor(item.source)}`}
                >
                  {item.source}
                </Typography>
                <Typography variant="caption" color="secondary" className="text-xs">
                  {formatDate(item.pubDate)}
                </Typography>
              </div>
              
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group-hover:text-glow-primary transition-colors"
              >
                <Typography variant="body" className="font-medium mb-1 line-clamp-2">
                  {item.title}
                </Typography>
                <Typography variant="caption" color="secondary" className="text-sm line-clamp-2">
                  {item.description}
                </Typography>
              </a>
              
              <div className="mt-2 flex items-center text-xs text-glow-secondary group-hover:text-glow-primary transition-colors">
                <span>Read more</span>
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-glow-primary/20">
        <Typography variant="caption" color="secondary" className="text-xs text-center">
          📡 Updates from OpenAI, Anthropic, Google AI & more
        </Typography>
      </div>
    </div>
  );
}