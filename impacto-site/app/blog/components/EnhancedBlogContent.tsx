'use client';

import React, { useEffect, useRef } from 'react';
import BlogContent from './BlogContent';
import BlogPullQuote from './BlogPullQuote';

interface EnhancedBlogContentProps {
  content: string;
  className?: string;
}

export default function EnhancedBlogContent({ content, className = '' }: EnhancedBlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!contentRef.current) return;
    
    // Process and enhance images for better responsiveness
    const images = contentRef.current.querySelectorAll('img');
    images.forEach(img => {
      // Add responsive classes to images
      img.classList.add('rounded-lg', 'shadow-md', 'my-6', 'hover:shadow-lg', 'transition-shadow', 'duration-300');
      
      // Wrap image in a figure with caption if there's an alt text
      if (img.alt && !img.parentElement?.matches('figure')) {
        const figure = document.createElement('figure');
        figure.classList.add('my-8');
        
        const figcaption = document.createElement('figcaption');
        figcaption.classList.add('text-center', 'text-sm', 'text-gray-500', 'mt-2');
        figcaption.textContent = img.alt;
        
        // Replace img with figure containing the img and caption
        img.parentNode?.replaceChild(figure, img);
        figure.appendChild(img);
        figure.appendChild(figcaption);
      }
    });
    
    // Convert special markup to enhanced elements
    const contentHtml = contentRef.current.innerHTML;
    
    // Process pull quotes [pullquote author="Name"]Quote text[/pullquote]
    const pullQuoteRegex = /\[pullquote(\s+author="([^"]*)")?\s*(\s+position="(left|right|center)")?\s*\]([\s\S]*?)\[\/pullquote\]/g;
    
    let newHtml = contentHtml.replace(pullQuoteRegex, (match, authorAttr, author, positionAttr, position, quote) => {
      const quoteElement = document.createElement('div');
      quoteElement.className = 'blog-pull-quote';
      quoteElement.setAttribute('data-quote', quote.trim());
      
      if (author) {
        quoteElement.setAttribute('data-author', author);
      }
      
      if (position) {
        quoteElement.setAttribute('data-position', position);
      }
      
      return quoteElement.outerHTML;
    });
    
    // Process highlights [highlight]Highlighted text[/highlight]
    const highlightRegex = /\[highlight\]([\s\S]*?)\[\/highlight\]/g;
    
    newHtml = newHtml.replace(highlightRegex, (match, text) => {
      return `<span class="bg-yellow-100 px-1 rounded">$${text.trim()}</span>`;
    });
    
    // Update content with processed HTML
    if (newHtml !== contentHtml) {
      contentRef.current.innerHTML = newHtml;
      
      // Replace pull quote placeholders with actual components
      const pullQuoteElements = contentRef.current.querySelectorAll('.blog-pull-quote');
      pullQuoteElements.forEach(element => {
        const quote = element.getAttribute('data-quote') || '';
        const author = element.getAttribute('data-author') || undefined;
        const position = (element.getAttribute('data-position') || 'center') as 'left' | 'right' | 'center';
        
        const pullQuoteElement = document.createElement('div');
        pullQuoteElement.className = 'my-8';
        
        // Create the pull quote structure
        pullQuoteElement.innerHTML = `
          <figure class="my-8 p-6 
                      ${position === 'center' ? 'max-w-2xl mx-auto' : position === 'left' ? 'float-left mr-8 ml-0 md:ml-0 md:w-64' : 'float-right ml-8 mr-0 md:mr-0 md:w-64'} 
                      ${position === 'center' ? 'max-w-2xl' : 'max-w-xs'} 
                      bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <blockquote class="relative text-lg font-medium text-gray-800">
              <svg class="absolute -top-4 -left-4 w-10 h-10 text-blue-300 opacity-30" 
                   fill="currentColor" 
                   viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p class="relative z-10">${quote}</p>
            </blockquote>
            ${author ? `<figcaption class="mt-3 text-sm italic text-gray-600">— ${author}</figcaption>` : ''}
          </figure>
        `;
        
        // Replace the placeholder with the actual pull quote
        element.replaceWith(pullQuoteElement);
      });
    }
    
    // Add clearfix after floated elements
    const floatedElements = contentRef.current.querySelectorAll('figure[class*="float-"]');
    if (floatedElements.length > 0) {
      const clearfix = document.createElement('div');
      clearfix.className = 'clearfix';
      clearfix.style.clear = 'both';
      contentRef.current.appendChild(clearfix);
    }
  }, [content]);
  
  return (
    <div className={`enhanced-blog-content ${className}`} ref={contentRef}>
      <BlogContent content={content} />
    </div>
  );
} 