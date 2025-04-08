import React from 'react';

interface BlogPullQuoteProps {
  quote: string;
  author?: string;
  position?: 'left' | 'right' | 'center';
  className?: string;
}

export default function BlogPullQuote({ 
  quote, 
  author, 
  position = 'center',
  className = ''
}: BlogPullQuoteProps) {
  
  const positionClasses = {
    left: 'float-left mr-8 ml-0 md:ml-0 md:w-64',
    right: 'float-right ml-8 mr-0 md:mr-0 md:w-64',
    center: 'mx-auto'
  };
  
  return (
    <figure className={`
      my-8 p-6 
      ${position === 'center' ? 'max-w-2xl' : 'max-w-xs'} 
      ${positionClasses[position]}
      bg-blue-50 border-l-4 border-blue-500 rounded-r-lg
      ${className}
    `}>
      <blockquote className="relative text-lg font-medium text-gray-800">
        <svg 
          className="absolute -top-4 -left-4 w-10 h-10 text-blue-300 opacity-30" 
          fill="currentColor" 
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="relative z-10">{quote}</p>
      </blockquote>
      
      {author && (
        <figcaption className="mt-3 text-sm italic text-gray-600">
          — {author}
        </figcaption>
      )}
    </figure>
  );
} 