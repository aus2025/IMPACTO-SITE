'use client';

import React from 'react';
import Link from 'next/link';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  createPageUrl: (page: number) => string;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  createPageUrl,
}: BlogPaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }
  
  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Add current page and pages around it
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    // Add ellipses where needed
    const pagesWithEllipses = [];
    let prevPage = 0;
    
    for (const page of pages) {
      if (page - prevPage > 1) {
        pagesWithEllipses.push('ellipsis' + prevPage); // Unique key for ellipsis
      }
      pagesWithEllipses.push(page);
      prevPage = page;
    }
    
    return pagesWithEllipses;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Blog pagination" className="flex justify-center">
      <ul className="flex space-x-1">
        {/* Previous page button */}
        <li>
          <Link
            href={createPageUrl(currentPage - 1)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === 1
                ? 'text-gray-300 cursor-not-allowed bg-white'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
            aria-label="Previous page"
            aria-disabled={currentPage === 1}
            onClick={(e) => {
              if (currentPage === 1) {
                e.preventDefault();
              }
            }}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((page, i) => {
          // Check if the page is an ellipsis
          if (typeof page === 'string' && page.startsWith('ellipsis')) {
            return (
              <li key={page}>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white">
                  ...
                </span>
              </li>
            );
          }
          
          // Regular page number
          return (
            <li key={page}>
              <Link
                href={createPageUrl(page as number)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </Link>
            </li>
          );
        })}

        {/* Next page button */}
        <li>
          <Link
            href={createPageUrl(currentPage + 1)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? 'text-gray-300 cursor-not-allowed bg-white'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
            aria-label="Next page"
            aria-disabled={currentPage === totalPages}
            onClick={(e) => {
              if (currentPage === totalPages) {
                e.preventDefault();
              }
            }}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
} 