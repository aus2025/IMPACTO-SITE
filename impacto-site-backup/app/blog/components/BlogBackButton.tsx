'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BlogBackButton() {
  const router = useRouter();
  
  return (
    <div className="mb-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back to Blog</span>
      </button>
    </div>
  );
} 