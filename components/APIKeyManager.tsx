'use client';

import { useState, useEffect } from 'react';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';

interface APIKeys {
  anthropicKey: string;
  openaiKey: string;
  geminiKey: string;
}

interface APIKeyManagerProps {
  onKeysUpdated: (keys: APIKeys) => void;
  className?: string;
}

export default function APIKeyManager({ onKeysUpdated, className = '' }: APIKeyManagerProps) {
  const [keys, setKeys] = useState<APIKeys>({
    anthropicKey: '',
    openaiKey: '',
    geminiKey: ''
  });
  const [showKeys, setShowKeys] = useState(false);
  const [hasKeys, setHasKeys] = useState(false);

  // Load keys from localStorage on mount
  useEffect(() => {
    const savedKeys = {
      anthropicKey: localStorage.getItem('anthropic_api_key') || '',
      openaiKey: localStorage.getItem('openai_api_key') || '',
      geminiKey: localStorage.getItem('gemini_api_key') || ''
    };
    
    setKeys(savedKeys);
    setHasKeys(Object.values(savedKeys).some(key => key.length > 0));
    onKeysUpdated(savedKeys);
  }, [onKeysUpdated]);

  const handleKeyChange = (keyType: keyof APIKeys, value: string) => {
    const updatedKeys = { ...keys, [keyType]: value };
    setKeys(updatedKeys);
    
    // Save to localStorage
    const storageKey = keyType.replace('Key', '_api_key');
    if (value) {
      localStorage.setItem(storageKey, value);
    } else {
      localStorage.removeItem(storageKey);
    }
    
    setHasKeys(Object.values(updatedKeys).some(key => key.length > 0));
    onKeysUpdated(updatedKeys);
  };

  const clearAllKeys = () => {
    const emptyKeys = { anthropicKey: '', openaiKey: '', geminiKey: '' };
    setKeys(emptyKeys);
    localStorage.removeItem('anthropic_api_key');
    localStorage.removeItem('openai_api_key');
    localStorage.removeItem('gemini_api_key');
    setHasKeys(false);
    onKeysUpdated(emptyKeys);
  };

  const maskKey = (key: string) => {
    if (!key || key.length <= 8) return key;
    return key.substring(0, 8) + '•'.repeat(Math.min(key.length - 8, 20));
  };

  return (
    <div className={`bg-glow-secondary/5 border border-glow-secondary/20 rounded-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="subhead" className="text-glow-secondary">
          🔑 API Key Configuration
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="minimal"
            size="sm"
            onClick={() => setShowKeys(!showKeys)}
          >
            {showKeys ? '🙈 Hide' : '👁️ Show'} Keys
          </Button>
          {hasKeys && (
            <Button
              variant="minimal"
              size="sm"
              onClick={clearAllKeys}
              className="text-red-400 hover:text-red-300"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      <Typography variant="caption" color="secondary" className="mb-4 block">
        Your API keys are stored locally in your browser and never sent to our servers. 
        They're used directly to call AI APIs from your browser.
      </Typography>

      <div className="space-y-4">
        {/* Anthropic Claude */}
        <div>
          <label className="block text-sm font-medium mb-2 text-glow-primary">
            Anthropic API Key (Claude)
          </label>
          <div className="flex gap-2">
            <input
              type={showKeys ? 'text' : 'password'}
              value={keys.anthropicKey}
              onChange={(e) => handleKeyChange('anthropicKey', e.target.value)}
              placeholder="sk-ant-api03-..."
              className="flex-1 p-3 bg-glow-primary/5 border border-glow-primary/20 rounded focus:ring-2 focus:ring-glow-primary/50 focus:border-glow-primary text-sm"
            />
            {keys.anthropicKey && (
              <Button
                variant="minimal"
                size="sm"
                onClick={() => handleKeyChange('anthropicKey', '')}
                className="text-red-400"
              >
                ✕
              </Button>
            )}
          </div>
          {keys.anthropicKey && !showKeys && (
            <Typography variant="caption" color="secondary" className="mt-1">
              Key saved: {maskKey(keys.anthropicKey)}
            </Typography>
          )}
        </div>

        {/* OpenAI */}
        <div>
          <label className="block text-sm font-medium mb-2 text-glow-primary">
            OpenAI API Key (GPT-4)
          </label>
          <div className="flex gap-2">
            <input
              type={showKeys ? 'text' : 'password'}
              value={keys.openaiKey}
              onChange={(e) => handleKeyChange('openaiKey', e.target.value)}
              placeholder="sk-proj-..."
              className="flex-1 p-3 bg-glow-primary/5 border border-glow-primary/20 rounded focus:ring-2 focus:ring-glow-primary/50 focus:border-glow-primary text-sm"
            />
            {keys.openaiKey && (
              <Button
                variant="minimal"
                size="sm"
                onClick={() => handleKeyChange('openaiKey', '')}
                className="text-red-400"
              >
                ✕
              </Button>
            )}
          </div>
          {keys.openaiKey && !showKeys && (
            <Typography variant="caption" color="secondary" className="mt-1">
              Key saved: {maskKey(keys.openaiKey)}
            </Typography>
          )}
        </div>

        {/* Google Gemini */}
        <div>
          <label className="block text-sm font-medium mb-2 text-glow-primary">
            Google AI API Key (Gemini)
          </label>
          <div className="flex gap-2">
            <input
              type={showKeys ? 'text' : 'password'}
              value={keys.geminiKey}
              onChange={(e) => handleKeyChange('geminiKey', e.target.value)}
              placeholder="AIzaSy..."
              className="flex-1 p-3 bg-glow-primary/5 border border-glow-primary/20 rounded focus:ring-2 focus:ring-glow-primary/50 focus:border-glow-primary text-sm"
            />
            {keys.geminiKey && (
              <Button
                variant="minimal"
                size="sm"
                onClick={() => handleKeyChange('geminiKey', '')}
                className="text-red-400"
              >
                ✕
              </Button>
            )}
          </div>
          {keys.geminiKey && !showKeys && (
            <Typography variant="caption" color="secondary" className="mt-1">
              Key saved: {maskKey(keys.geminiKey)}
            </Typography>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-glow-primary/5 border border-glow-primary/20 rounded">
        <Typography variant="caption" className="font-semibold text-glow-primary mb-2 block">
          💡 How to get API keys:
        </Typography>
        <div className="space-y-1 text-xs">
          <div>
            <strong>Anthropic:</strong> <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-glow-primary hover:underline">console.anthropic.com</a>
          </div>
          <div>
            <strong>OpenAI:</strong> <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-glow-primary hover:underline">platform.openai.com/api-keys</a>
          </div>
          <div>
            <strong>Google:</strong> <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-glow-primary hover:underline">makersuite.google.com/app/apikey</a>
          </div>
        </div>
      </div>

      {!hasKeys && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
          <Typography variant="caption" className="text-yellow-300">
            ⚠️ No API keys configured. You can still use the free local optimizer, or add your API keys above for enhanced AI-powered optimization.
          </Typography>
        </div>
      )}
    </div>
  );
}