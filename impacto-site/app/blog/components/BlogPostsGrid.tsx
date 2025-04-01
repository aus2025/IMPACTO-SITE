'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';

interface BlogPostsGridProps {
  posts: BlogPost[];
}

export function BlogPostsGrid({ posts }: BlogPostsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map(post => (
        <article 
          key={post.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {post.featured_image && (
            <Link href={`/blog/${post.slug}`} className="block h-48 overflow-hidden">
              <img 
                src={post.featured_image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </Link>
          )}
          <div className="p-6">
            {post.category && (
              <Link 
                href={`/blog?category=${post.category.slug}`}
                className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold mb-3 hover:bg-blue-200 transition-colors"
              >
                {post.category.name}
              </Link>
            )}
            
            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-700 transition-colors">
                {post.title}
              </Link>
            </h2>
            
            {post.published_at && (
              <p className="text-gray-600 text-sm mb-3">
                {formatDate(post.published_at)}
              </p>
            )}
            
            {post.excerpt && (
              <p className="text-gray-700 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
            )}
            
            <Link 
              href={`/blog/${post.slug}`} 
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              Read More
              <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path 
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
} 