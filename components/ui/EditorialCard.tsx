import { ReactNode } from 'react';

interface EditorialCardProps {
  children: ReactNode;
  variant?: 'default' | 'featured' | 'minimal';
  hover?: boolean;
  className?: string;
}

export default function EditorialCard({ 
  children, 
  variant = 'default', 
  hover = true, 
  className = '' 
}: EditorialCardProps) {
  const baseClasses = "editorial-card transition-all duration-300";
  
  const variantClasses = {
    default: "p-8",
    featured: "p-12",
    minimal: "p-6"
  };
  
  const hoverClasses = hover ? "hover:shadow-editorial hover:-translate-y-1" : "";
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}