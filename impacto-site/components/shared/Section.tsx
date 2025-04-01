import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  backgroundColor?: 'white' | 'gray' | 'blue' | 'darkBlue' | 'transparent';
  paddingY?: 'small' | 'medium' | 'large' | 'none';
}

export default function Section({
  children,
  className = '',
  id,
  backgroundColor = 'white',
  paddingY = 'medium',
}: SectionProps) {
  // Background color classes
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    darkBlue: 'bg-blue-700 text-white',
    transparent: 'bg-transparent',
  };

  // Padding classes
  const paddingClasses = {
    none: 'py-0',
    small: 'py-8',
    medium: 'py-12',
    large: 'py-16',
  };

  // Combine classes
  const combinedClasses = `${backgroundClasses[backgroundColor]} ${paddingClasses[paddingY]} ${className}`;

  return (
    <section id={id} className={combinedClasses}>
      {children}
    </section>
  );
} 