'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlogImage from './BlogImage';
import BlogPagination from './BlogPagination';
import { BlogPost } from '@/lib/blog-service';

interface BlogContentProps {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  pageBaseUrl: string;
  categoryParam?: string;
  tagParam?: string;
}

export default function BlogContent({
  posts,
  totalPages,
  currentPage,
  pageBaseUrl,
  categoryParam,
  tagParam
}: BlogContentProps) {
  // Create URLs for pagination
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (categoryParam) params.set('category', categoryParam);
    if (tagParam) params.set('tag', tagParam);
    return `${pageBaseUrl}?${params.toString()}`;
  };

  // Function to get blog image source
  const getBlogImageSrc = (slug: string) => {
    // Extract the blog number from the slug (e.g., "blog-1-title" => "1")
    const match = slug.match(/^blog-(\d+)/);
    if (match && match[1]) {
      return `/images/blog/blog-${match[1]}.svg`;
    }
    return '/images/blog/default.svg';
  };

  return (
    <>
      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-56 bg-gray-200">
              <BlogImage 
                src={getBlogImageSrc(post.slug)}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-blue-600 text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">
                  {post.formattedDate}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image 
                    src="/images/impacto-logo-small.svg" 
                    alt="Impacto Automation"
                    width={30}
                    height={30}
                    className="rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    {post.author}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {post.readingTime}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-12">
          <BlogPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            createPageUrl={createPageUrl} 
          />
        </div>
      )}
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">No posts found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your filter criteria.
          </p>
        </div>
      )}
    </>
  );
} 