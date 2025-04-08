'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { BlogTag } from '@/types/blog';

interface BlogTagsFilterProps {
  tags: BlogTag[];
  currentTag?: string;
}

export default function BlogTagsFilter({
  tags,
  currentTag,
}: BlogTagsFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create a URL for a tag filter
  const createTagUrl = (tagSlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (tagSlug) {
      params.set('tag', tagSlug);
      // Remove category filter when selecting a tag
      params.delete('category');
    } else {
      params.delete('tag');
    }
    
    // Reset to page 1 when changing tag
    params.delete('page');
    
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={createTagUrl(tag.slug)}
          className={`inline-block px-3 py-1 rounded-full text-xs ${
            currentTag === tag.slug
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {tag.name}
        </Link>
      ))}
      
      {currentTag && (
        <Link
          href={createTagUrl('')}
          className="inline-block px-3 py-1 rounded-full text-xs bg-red-100 text-red-800 hover:bg-red-200"
        >
          Clear Tag
        </Link>
      )}
      
      {tags.length === 0 && (
        <p className="text-gray-500 text-sm">
          No tags available
        </p>
      )}
    </div>
  );
} 