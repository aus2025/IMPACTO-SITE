import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';

interface BlogRelatedPostsProps {
  posts: BlogPost[];
}

export default function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {post.featured_image && (
            <Link href={`/blog/${post.slug}`} className="block h-40 overflow-hidden">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </Link>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-700 transition-colors">
                {post.title}
              </Link>
            </h3>
            
            <div className="flex items-center text-gray-500 text-xs mb-2">
              {post.published_at && (
                <span>
                  {formatDate(post.published_at)}
                </span>
              )}
              
              {post.category && (
                <>
                  <span className="mx-2">•</span>
                  <Link
                    href={`/blog?category=${post.category.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.category.name}
                  </Link>
                </>
              )}
            </div>
            
            {post.excerpt && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 