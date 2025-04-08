'use client';

import { Suspense } from 'react';
import { ClientLayout } from '@/components/layout';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import dynamic from 'next/dynamic';

// Dynamically import the content component with no SSR to avoid the useSearchParams error
const DynamicAssessmentResultsContent = dynamic(
  () => import('./assessment-results-content'),
  { ssr: false }
);

export default function AssessmentResultsPage() {
  return (
    <ClientLayout>
      <Navbar />
      <div className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <Suspense fallback={
            <div className="container mx-auto px-4 py-16 text-center">
              <div className="animate-pulse">
                <h1 className="text-3xl font-bold mb-4">Analyzing your responses...</h1>
                <p className="text-gray-600">We're preparing your personalized automation blueprint</p>
              </div>
            </div>
          }>
            <DynamicAssessmentResultsContent />
          </Suspense>
        </div>
      </div>
      <Footer />
    </ClientLayout>
  );
} 