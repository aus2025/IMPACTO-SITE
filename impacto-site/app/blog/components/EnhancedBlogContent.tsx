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
      return `<span class="bg-yellow-100 px-1 rounded text-gray-800">$${text.trim()}</span>`;
    });
    
    // Enhance headings with decorative elements
    const h2Regex = /<h2>(.*?)<\/h2>/g;
    newHtml = newHtml.replace(h2Regex, (match, content) => {
      return `<h2><span class="inline-block w-12 h-1 bg-blue-500 mb-2"></span><br>${content}</h2>`;
    });
    
    // Add icon to lists for better visual hierarchy
    const ulRegex = /<ul>([\s\S]*?)<\/ul>/g;
    newHtml = newHtml.replace(ulRegex, (match, listContent) => {
      const enhancedListContent = listContent.replace(/<li>/g, '<li class="flex items-start gap-2"><span class="inline-flex mt-1 items-center justify-center flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></span>');
      return `<ul class="space-y-3 my-6">${enhancedListContent}</ul>`;
    });
    
    // Enhance blockquotes with a nicer style
    const blockquoteRegex = /<blockquote>([\s\S]*?)<\/blockquote>/g;
    newHtml = newHtml.replace(blockquoteRegex, (match, quoteContent) => {
      return `<blockquote class="relative pl-8 pr-4 py-3 italic border-l-4 border-blue-500 bg-blue-50 rounded-r-lg my-6">
                <svg class="absolute left-2 top-2 w-4 h-4 text-blue-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                ${quoteContent}
              </blockquote>`;
    });
    
    // Add table styling
    const tableRegex = /<table>([\s\S]*?)<\/table>/g;
    newHtml = newHtml.replace(tableRegex, (match, tableContent) => {
      return `<div class="overflow-x-auto rounded-lg border border-gray-200 my-6">
                <table class="min-w-full divide-y divide-gray-200">
                  ${tableContent}
                </table>
              </div>`;
    });
    
    // Style table headers
    newHtml = newHtml.replace(/<thead>([\s\S]*?)<\/thead>/g, 
      '<thead class="bg-gray-50">\$1</thead>'
    );
    
    newHtml = newHtml.replace(/<th>([\s\S]*?)<\/th>/g, 
      '<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">\$1</th>'
    );
    
    // Style table cells
    newHtml = newHtml.replace(/<tbody>([\s\S]*?)<\/tbody>/g, 
      '<tbody class="bg-white divide-y divide-gray-200">\$1</tbody>'
    );
    
    newHtml = newHtml.replace(/<td>([\s\S]*?)<\/td>/g, 
      '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\$1</td>'
    );
    
    // Ensure paragraph text is visible
    const paragraphs = contentRef.current.querySelectorAll('p:not([class])');
    paragraphs.forEach(p => {
      p.classList.add('text-gray-700');
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
      
      // Apply text color to all elements without explicit color
      const textElements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6, li, td, th');
      textElements.forEach(el => {
        if (!el.classList.contains('text-gray-700') && 
            !el.classList.contains('text-gray-800') && 
            !el.classList.contains('text-gray-900') &&
            !el.classList.contains('text-blue-600')) {
          if (el.tagName.toLowerCase().startsWith('h')) {
            el.classList.add('text-gray-900');
          } else {
            el.classList.add('text-gray-700');
          }
        }
      });
      
      // Add dividers after sections for visual separation
      const h2Elements = contentRef.current.querySelectorAll('h2');
      h2Elements.forEach((h2, index) => {
        if (index > 0) {
          const divider = document.createElement('hr');
          divider.className = 'my-12 border-t border-gray-200';
          h2.parentNode?.insertBefore(divider, h2);
        }
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
    
    // Add a table of contents if there are at least 3 headings
    const headings = contentRef.current.querySelectorAll('h2, h3');
    if (headings.length >= 3) {
      const tocContainer = document.createElement('div');
      tocContainer.className = 'bg-gray-50 rounded-lg p-5 my-8 border border-gray-200';
      
      const tocTitle = document.createElement('h4');
      tocTitle.className = 'text-lg font-bold mb-3 text-gray-900';
      tocTitle.textContent = 'Table of Contents';
      tocContainer.appendChild(tocTitle);
      
      const tocList = document.createElement('ul');
      tocList.className = 'space-y-2';
      
      headings.forEach((heading, index) => {
        // Add IDs to headings for anchor links
        const headingId = `heading-${index}`;
        heading.id = headingId;
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${headingId}`;
        link.className = heading.tagName === 'H2' 
          ? 'text-blue-600 hover:text-blue-800 font-medium' 
          : 'text-blue-600 hover:text-blue-800 ml-4 text-sm';
        link.textContent = heading.textContent || '';
        listItem.appendChild(link);
        tocList.appendChild(listItem);
      });
      
      tocContainer.appendChild(tocList);
      
      // Insert table of contents after the first paragraph
      const firstParagraph = contentRef.current.querySelector('p');
      if (firstParagraph) {
        firstParagraph.parentNode?.insertBefore(tocContainer, firstParagraph.nextSibling);
      }
    }
  }, [content]);
  
  return (
    <div className={`enhanced-blog-content ${className} text-gray-700`} ref={contentRef}>
      <BlogContent content={content} />
    </div>
  );
} 