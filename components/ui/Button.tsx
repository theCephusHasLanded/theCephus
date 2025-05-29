import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'outline', 
  size = 'md', 
  href,
  onClick,
  className = '',
  external = false,
  disabled = false
}: ButtonProps) {
  const baseClasses = "font-body font-medium transition-all duration-300 inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: "btn-editorial-primary",
    outline: "btn-editorial",
    minimal: "text-primary hover:text-accent transition-colors duration-200"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-body",
    md: "px-6 py-3 text-body",
    lg: "px-8 py-4 text-body-lg"
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  const classes = variant === 'minimal' 
    ? `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`
    : `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  if (href) {
    return (
      <a 
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
        {external && (
          <svg 
            className="ml-2 w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
    );
  }
  
  return (
    <button 
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}