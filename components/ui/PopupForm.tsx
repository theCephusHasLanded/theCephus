'use client';

import { useState, useEffect } from 'react';
import Button from './Button';
import Typography from './Typography';

interface PopupFormProps {
  isVisible: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  name: string;
  interests: string[];
}

const interestOptions = [
  'AI Newsletter Agent',
  'Tech Industry Insights',
  'Startup Intelligence',
  'AI Development Tools',
  'Future Tech Trends',
  'Investment Opportunities'
];

export default function PopupForm({ isVisible, onClose }: PopupFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    interests: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (works without database)
    try {
      // Log the data for demonstration
      console.log('AI Newsletter Agent Signup:', formData);
      
      // Store in localStorage as backup
      const submissions = JSON.parse(localStorage.getItem('ai-newsletter-signups') || '[]');
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('ai-newsletter-signups', JSON.stringify(submissions));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = formData.email.trim() !== '' && formData.name.trim() !== '' && formData.interests.length > 0;

  if (!isVisible) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="glow-card p-8 max-w-md mx-4 text-center">
          <div className="text-6xl mb-4">✨</div>
          <Typography variant="headline" color="primary" className="mb-4 text-glow-subtle">
            Welcome to the Future!
          </Typography>
          <Typography variant="body" color="secondary" className="mb-4">
            You're now on the waitlist for the AI Newsletter Agent launching in 2 weeks.
          </Typography>
          <Typography variant="caption" color="accent">
            Prepare for intelligence beyond imagination...
          </Typography>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="glow-card p-8 max-w-md mx-4 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-glow-primary border-t-transparent rounded-full mx-auto mb-6"></div>
          <Typography variant="headline" color="primary" className="mb-4 text-glow-subtle">
            Initializing AI Protocols
          </Typography>
          <Typography variant="body" color="secondary">
            Adding you to the neural network...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glow-card p-8 max-w-lg mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">👾</div>
          <Typography variant="headline" color="primary" className="mb-2 text-glow-subtle">
            AI NEWSLETTER AGENT
          </Typography>
          <Typography variant="body-lg" color="primary" className="text-glow mb-2">
            LAUNCHING IN 2 WEEKS
          </Typography>
          <Typography variant="body" color="secondary">
            Join the waitlist for the world's first intelligent newsletter agent
          </Typography>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-body font-medium text-primary mb-2">
              Your Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your name"
              className="input-editorial w-full"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-body font-medium text-primary mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              className="input-editorial w-full"
              required
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-body font-medium text-primary mb-4">
              What interests you most? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map(interest => {
                const isSelected = formData.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-3 rounded border text-sm transition-all duration-300 ${
                      isSelected
                        ? 'border-glow-primary bg-glow-primary/10 text-primary shadow-glow'
                        : 'border-subtle text-secondary hover:border-glow-primary/50'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            variant="primary"
            className="w-full"
            disabled={!isValid}
          >
            Join the AI Revolution
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <Typography variant="caption" color="accent">
            No spam. Unsubscribe anytime. Agent-powered intelligence awaits.
          </Typography>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}