'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface BlogTableOfContentsProps {
  contentSelector: string;
}

export default function BlogTableOfContents({ contentSelector }: BlogTableOfContentsProps) {
  const [headings, setHeadings] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    // Find all headings (h2, h3, h4) in the content
    const headingElements = contentElement.querySelectorAll('h2, h3, h4');
    
    // Make sure all headings have IDs for scrolling
    const headingItems: TableOfContentsItem[] = [];
    
    headingElements.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1));
      
      // Generate an ID if none exists
      if (!heading.id) {
        const headingText = heading.textContent || '';
        const id = headingText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        heading.id = id;
      }
      
      headingItems.push({
        id: heading.id,
        title: heading.textContent || '',
        level
      });
    });
    
    setHeadings(headingItems);
    
    // Set up intersection observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -80% 0px'
      }
    );
    
    headingElements.forEach((heading) => {
      observer.observe(heading);
    });
    
    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, [contentSelector]);
  
  // If no headings, don't render the component
  if (headings.length < 3) {
    return null;
  }
  
  return (
    <div className="bg-gray-50 p-5 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li 
              key={heading.id}
              className={`
                ${heading.level === 2 ? 'pl-0' : heading.level === 3 ? 'pl-4' : 'pl-6'} 
                ${activeId === heading.id ? 'font-medium text-blue-600' : 'text-gray-700'}
              `}
            >
              <a 
                href={`#${heading.id}`}
                className="hover:text-blue-700 transition-colors text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 