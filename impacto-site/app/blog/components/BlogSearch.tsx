'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { debounce } from '@/lib/utils';

interface BlogSearchProps {
  initialValue?: string;
}

export default function BlogSearch({ initialValue = '' }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const router = useRouter();
  const pathname = usePathname();

  // Update search params when the user submits the search form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(window.location.search);
    
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    
    // Reset to page 1 when searching
    params.delete('page');
    
    router.push(`${pathname}?${params.toString()}`);
  };

  // Debounced search function for auto-searching as the user types
  const debouncedSearch = debounce(() => {
    if (searchTerm !== initialValue) {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  }, 500);

  // Call the debounced search function when the search term changes
  useEffect(() => {
    debouncedSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors flex items-center"
          aria-label="Search"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="ml-2 hidden sm:inline">Search</span>
        </button>
      </div>
      
      {initialValue && (
        <button
          type="button"
          onClick={() => {
            setSearchTerm('');
            
            const params = new URLSearchParams(window.location.search);
            params.delete('search');
            params.delete('page');
            
            router.push(`${pathname}?${params.toString()}`);
          }}
          className="absolute right-24 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label="Clear search"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </form>
  );
} 