'use client';

import React from 'react';
import Link from 'next/link';
import type { BlogPost, BlogCategory, BlogTag } from '@/types/blog';

// Temporary blog posts grid
export function TempBlogPostsGrid({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold text-gray-700 mb-3">No posts found</h3>
        <p className="text-gray-500">
          There are no blog posts to display.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {post.title}
            </h2>
            
            <div className="text-gray-600 mb-4">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                {post.status}
              </span>
              {post.published_at && (
                <span>
                  Published: {new Date(post.published_at).toLocaleDateString()}
                </span>
              )}
            </div>
            
            {post.excerpt && (
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
            )}
            
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// Temporary blog search
export function TempBlogSearch({ initialValue }: { initialValue?: string }) {
  return (
    <div className="relative">
      <form action="/blog" method="get">
        <input
          type="text"
          name="search"
          defaultValue={initialValue || ''}
          placeholder="Search blog posts..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded"
        >
          Search
        </button>
      </form>
    </div>
  );
}

// Temporary blog sidebar
export function TempBlogSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      {children}
    </div>
  );
}

// Temporary blog pagination
export function TempBlogPagination({
  currentPage,
  totalPages,
  createPageUrl,
}: {
  currentPage: number;
  totalPages: number;
  createPageUrl: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center">
      <nav className="inline-flex rounded-md shadow">
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isCurrentPage = page === currentPage;
          
          return (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`px-4 py-2 border ${
                isCurrentPage 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } ${i === 0 ? 'rounded-l-md' : ''} ${
                i === totalPages - 1 ? 'rounded-r-md' : ''
              }`}
            >
              {page}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// Temporary categories filter
export function TempBlogCategoriesFilter({
  categories,
  currentCategory,
}: {
  categories: BlogCategory[];
  currentCategory?: string;
}) {
  if (!categories || categories.length === 0) {
    return <p className="text-gray-500">No categories found</p>;
  }

  return (
    <ul className="space-y-1">
      <li>
        <Link
          href="/blog"
          className={`block px-2 py-1 rounded hover:bg-gray-100 ${
            !currentCategory ? 'font-medium text-blue-600' : 'text-gray-700'
          }`}
        >
          All Categories
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/blog?category=${encodeURIComponent(category.slug)}`}
            className={`block px-2 py-1 rounded hover:bg-gray-100 ${
              currentCategory === category.slug ? 'font-medium text-blue-600' : 'text-gray-700'
            }`}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Temporary tags filter
export function TempBlogTagsFilter({
  tags,
  currentTag,
}: {
  tags: BlogTag[];
  currentTag?: string;
}) {
  if (!tags || tags.length === 0) {
    return <p className="text-gray-500">No tags found</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`inline-block px-3 py-1 rounded-full text-sm ${
          !currentTag
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/blog?tag=${encodeURIComponent(tag.slug)}`}
          className={`inline-block px-3 py-1 rounded-full text-sm ${
            currentTag === tag.slug
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
} 