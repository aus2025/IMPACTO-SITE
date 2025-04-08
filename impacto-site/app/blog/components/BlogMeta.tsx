import React from 'react';
import Link from 'next/link';
import { BlogCategory, BlogTag } from '@/types/blog';

interface BlogMetaProps {
  publishedDate: string | null;
  category?: BlogCategory;
  tags?: BlogTag[];
  readTime?: number;
}

export default function BlogMeta({
  publishedDate,
  category,
  tags,
  readTime,
}: BlogMetaProps) {
  return (
    <div className="flex flex-wrap items-center text-gray-600 text-sm gap-x-4 gap-y-2">
      {/* Published date */}
      {publishedDate && (
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span>{publishedDate}</span>
        </div>
      )}
      
      {/* Category */}
      {category && (
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <Link
            href={`/blog?category=${category.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {category.name}
          </Link>
        </div>
      )}
      
      {/* Read time */}
      {readTime !== undefined && (
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span>{readTime} min read</span>
        </div>
      )}
    </div>
  );
} 