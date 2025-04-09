import React from 'react';

interface PlaceholderImageProps {
  title?: string;
  subtitle?: string;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
}

export function PlaceholderImage({
  title,
  subtitle,
  className = '',
  colorFrom = 'from-blue-500',
  colorTo = 'to-blue-700'
}: PlaceholderImageProps) {
  return (
    <div 
      className={`bg-gradient-to-br ${colorFrom} ${colorTo} flex items-center justify-center ${className}`}
    >
      <div className="text-white text-center p-4">
        {title && <div className="font-semibold">{title}</div>}
        {subtitle && <div className="text-sm mt-1">{subtitle}</div>}
      </div>
    </div>
  );
} 