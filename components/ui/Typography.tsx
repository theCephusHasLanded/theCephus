import { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  variant?: 'display-lg' | 'display' | 'headline' | 'subhead' | 'body-lg' | 'body' | 'caption';
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  balance?: boolean;
}

export default function Typography({ 
  children, 
  variant = 'body', 
  color = 'primary',
  className = '',
  as,
  balance = false
}: TypographyProps) {
  const variantClasses = {
    'display-lg': 'text-display-lg font-display font-extrabold text-display',
    'display': 'text-display font-display font-bold text-display',
    'headline': 'text-headline font-display font-bold text-headline',
    'subhead': 'text-subhead font-tech font-semibold text-subhead',
    'body-lg': 'text-body-lg font-body text-body',
    'body': 'text-body font-body text-body',
    'caption': 'text-caption font-body text-caption'
  };
  
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent'
  };
  
  const balanceClass = balance ? 'text-balance' : '';
  
  const classes = `${variantClasses[variant]} ${colorClasses[color]} ${balanceClass} ${className}`;
  
  // Auto-select semantic HTML element based on variant if not specified
  const getDefaultElement = () => {
    switch (variant) {
      case 'display-lg':
      case 'display':
        return 'h1';
      case 'headline':
        return 'h2';
      case 'subhead':
        return 'h3';
      case 'caption':
        return 'span';
      default:
        return 'p';
    }
  };
  
  const Element = as || getDefaultElement();
  
  return (
    <Element className={classes}>
      {children}
    </Element>
  );
}