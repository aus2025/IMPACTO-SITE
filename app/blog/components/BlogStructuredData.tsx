'use client';

import React from 'react';
import { BlogPost } from '@/types/blog';

interface BlogStructuredDataProps {
  post: BlogPost;
  url: string;
}

export default function BlogStructuredData({ post, url }: BlogStructuredDataProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: post.title,
    description: post.excerpt || '',
    image: post.featured_image ? [post.featured_image] : [],
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.author?.full_name || 'Impacto Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Impacto',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png' // Local path to the logo in the public directory
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
} 