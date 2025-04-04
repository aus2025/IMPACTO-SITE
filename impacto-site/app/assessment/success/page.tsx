import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assessment Submitted | Impacto Automation Solutions',
  description: 'Thank you for submitting your business assessment. Our team will analyze your needs and create a personalized automation blueprint.',
};

export default function AssessmentSuccessPage() {
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
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">What happens next?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-semibold text-sm mr-3 mt-0.5">
                    1
                  </div>
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Analysis:</strong> Our team will review your answers and analyze your business needs.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-semibold text-sm mr-3 mt-0.5">
                    2
                  </div>
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Blueprint creation:</strong> We'll create a personalized automation blueprint specifically for your business.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-semibold text-sm mr-3 mt-0.5">
                    3
                  </div>
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Consultation:</strong> A member of our team will contact you to discuss your automation blueprint and next steps.
                  </p>
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
          </div>
        </div>
      </div>
    </div>
  );
} 