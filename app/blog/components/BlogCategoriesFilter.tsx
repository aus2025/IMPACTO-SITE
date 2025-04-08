'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface SimpleBlogCategory {
  name: string;
  slug: string;
}

interface BlogCategoriesFilterProps {
  categories: SimpleBlogCategory[];
  currentCategory?: string;
}

export default function BlogCategoriesFilter({
  categories,
  currentCategory,
}: BlogCategoriesFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create a URL for a category filter
  const createCategoryUrl = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }
    
    // Reset to page 1 when changing category
    params.delete('page');
    
    return `${pathname}?${params.toString()}`;
  };

  // Create URL to clear the category filter
  const clearCategoryUrl = () => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('category');
    params.delete('page');
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="space-y-2">
      <div className="mb-3">
        <Link
          href={clearCategoryUrl()}
          className={`inline-block px-3 py-1.5 rounded-full text-sm ${
            !currentCategory
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </Link>
      </div>
      
      {categories.map((category) => (
        <div key={category.slug} className="mb-1">
          <Link
            href={createCategoryUrl(category.slug)}
            className={`inline-block px-3 py-1.5 rounded-full text-sm ${
              currentCategory === category.slug
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </Link>
        </div>
      ))}
      
      {categories.length === 0 && (
        <p className="text-gray-500 text-sm">
          No categories available
        </p>
      )}
    </div>
  );
} 