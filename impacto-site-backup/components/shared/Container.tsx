import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export default function Container({
  children,
  className = '',
  as: Component = 'div',
  maxWidth = 'xl',
}: ContainerProps) {
  // Map maxWidth to Tailwind classes
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  const baseClasses = 'mx-auto px-4';
  const combinedClasses = `${baseClasses} ${maxWidthClasses[maxWidth]} ${className}`;

  return (
    <Component className={combinedClasses}>
      {children}
    </Component>
  );
} 