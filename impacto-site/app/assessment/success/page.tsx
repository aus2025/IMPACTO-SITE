'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AssessmentSuccessPage() {
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we have a stored assessment ID that we can use to redirect
    const assessmentId = sessionStorage.getItem('last_assessment_id');
    
    if (assessmentId) {
      // Set a short delay to ensure the page loads completely first
      const timer = setTimeout(() => {
        setRedirecting(true);
        // Redirect to user results page which will handle fetching data
        router.push(`/assessment/success/user_result?assessmentId=${assessmentId}`);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-green-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Submitted Successfully!</h1>
              <p className="text-lg text-gray-600">
                Thank you for taking the time to complete our business assessment.
              </p>
            </div>
            
            {redirecting ? (
              <div className="text-center mb-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                <p className="mt-4">Preparing your assessment results...</p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">What Happens Next?</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3">
                        1
                      </div>
                      <div>
                        <p className="text-gray-600">Your responses will be analyzed by our automation experts.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3">
                        2
                      </div>
                      <div>
                        <p className="text-gray-600">You'll receive a personalized automation blueprint based on your needs.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3">
                        3
                      </div>
                      <div>
                        <p className="text-gray-600">Our team will reach out to schedule a consultation to discuss your options.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <Link
                    href="/assessment/success/user_result"
                    className="inline-block px-8 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition duration-150 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Get Your Assessment NOW
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 