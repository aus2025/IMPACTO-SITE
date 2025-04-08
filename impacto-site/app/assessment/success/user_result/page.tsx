'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the content component with no SSR to avoid the useSearchParams error
const DynamicUserResultContent = dynamic(
  () => import('./user-result-content'),
  { ssr: false }
);

export default function UserResultPage() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Loading your results...</p>
            </div>
          </div>
        }>
          <DynamicUserResultContent />
        </Suspense>
      </div>
    </div>
  );
} 