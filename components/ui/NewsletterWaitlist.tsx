'use client';

import { useState } from 'react';
import Button from './Button';
import Typography from './Typography';

interface NewsletterWaitlistProps {
  onComplete: () => void;
}

interface FormData {
  email: string;
  name: string;
  company?: string;
  role?: string;
  interests: string[];
  contentPreferences: string[];
}

const questions = [
  {
    id: 'basic',
    title: 'Join the AI Revolution! 🚀',
    subtitle: 'Get early access to the groundbreaking Newsletter Agent',
    fields: [
      { name: 'name', label: 'Your Name', type: 'text', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true }
    ]
  },
  {
    id: 'professional',
    title: 'Tell us about your tech journey',
    subtitle: 'Help us customize your AI agent experience',
    fields: [
      { name: 'company', label: 'Company/Organization', type: 'text', required: false },
      { name: 'role', label: 'Your Role/Title', type: 'text', required: false }
    ]
  },
  {
    id: 'interests',
    title: 'What excites you about AI technology?',
    subtitle: 'Your interests shape your AI agent\'s intelligence',
    type: 'checkbox',
    options: [
      'Artificial Intelligence & Machine Learning',
      'Autonomous AI Agents & Automation',
      'Large Language Models (LLMs)',
      'Computer Vision & Image Recognition',
      'Natural Language Processing',
      'AI in Software Development',
      'AI Ethics & Safety Research',
      'Generative AI & Creative Tools',
      'AI in Business & Finance',
      'Robotics & Physical AI'
    ]
  },
  {
    id: 'content',
    title: 'How would you like your AI agent to serve you?',
    subtitle: 'Design your perfect AI assistant experience',
    type: 'checkbox',
    options: [
      'Curated Daily AI News Briefings',
      'Personalized Research & Analysis',
      'Technical Deep-Dives & Tutorials',
      'Industry Trend Predictions',
      'Startup & Investment Intelligence',
      'AI Tool Recommendations & Reviews',
      'Code Examples & Implementation Guides',
      'Executive Insights & Strategy',
      'Real-time AI Breakthrough Alerts',
      'Custom AI Project Assistance'
    ]
  }
];

export default function NewsletterWaitlist({ onComplete }: NewsletterWaitlistProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    interests: [],
    contentPreferences: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentStep];

  const handleInputChange = (field: string, value: string) => {
    console.log('Input changed:', field, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof FormData] as string[]), value]
        : (prev[field as keyof FormData] as string[]).filter(item => item !== value)
    }));
  };

  const isStepValid = () => {
    if (currentQuestion.fields) {
      return currentQuestion.fields.every(field => {
        if (!field.required) return true;
        const value = formData[field.name as keyof FormData] as string;
        return value && value.trim() !== '';
      });
    }
    if (currentQuestion.type === 'checkbox') {
      const fieldName = currentQuestion.id === 'interests' ? 'interests' : 'contentPreferences';
      return (formData[fieldName] as string[]).length > 0;
    }
    return true;
  };

  const handleNext = () => {
    console.log('Next button clicked, currentStep:', currentStep, 'isValid:', isStepValid());
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would normally send to your backend/newsletter service
    console.log('Newsletter signup data:', formData);
    
    setIsSubmitting(false);
    onComplete();
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-animated-gradient">
        <div className="text-center">
          <div className="glow-card p-12 max-w-md mx-auto">
            <div className="animate-spin w-16 h-16 border-4 border-glow-primary border-t-transparent rounded-full mx-auto mb-6"></div>
            <Typography variant="headline" color="primary" className="mb-4">
              Processing Your Preferences
            </Typography>
            <Typography variant="body" color="secondary">
              Our AI is analyzing your interests to create the perfect newsletter experience...
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-animated-gradient p-6">
      <div className="glow-card p-8 md:p-12 max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-caption text-secondary mb-2">
            <span>Step {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-accent/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-glow-primary to-glow-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="mb-8">
          <Typography variant="headline" color="primary" className="mb-3 text-glow-subtle">
            {currentQuestion.title}
          </Typography>
          <Typography variant="body-lg" color="secondary" className="mb-8">
            {currentQuestion.subtitle}
          </Typography>

          {/* Form Fields */}
          {currentQuestion.fields && (
            <div className="space-y-6">
              {currentQuestion.fields.map(field => (
                <div key={field.name}>
                  <label className="block text-body font-medium text-primary mb-2">
                    {field.label}
                    {field.required && <span className="text-glow-primary ml-1">*</span>}
                  </label>
                  <input
                    type={field.type}
                    value={formData[field.name as keyof FormData] as string || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.label}
                    className="input-editorial w-full"
                    required={field.required}
                    autoComplete={field.type === 'email' ? 'email' : field.name}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Checkbox Options */}
          {currentQuestion.type === 'checkbox' && currentQuestion.options && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map(option => {
                const fieldName = currentQuestion.id === 'interests' ? 'interests' : 'contentPreferences';
                const isChecked = (formData[fieldName] as string[]).includes(option);
                
                return (
                  <label 
                    key={option}
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                      isChecked 
                        ? 'border-glow-primary bg-glow-primary/10 shadow-glow' 
                        : 'border-subtle hover:border-glow-primary/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(fieldName, option, e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                      isChecked ? 'border-glow-primary bg-glow-primary' : 'border-subtle'
                    }`}>
                      {isChecked && (
                        <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <Typography variant="body" color="primary" className="flex-1">
                      {option}
                    </Typography>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            className={currentStep === 0 ? 'invisible' : ''}
          >
            Previous
          </Button>
          
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {currentStep === questions.length - 1 ? 'Join Waitlist' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}