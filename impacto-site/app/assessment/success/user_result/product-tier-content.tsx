'use client';

import Link from 'next/link';

export interface ProductTierContentProps {
  score: number;
}

export default function ProductTierContent({ score }: ProductTierContentProps) {
  // Apply fallback for invalid scores
  const safeScore = score && score > 0 ? score : 65; // Default to Growth Plan if score is invalid
  
  // Determine which tier based on score
  if (safeScore < 41) {
    return (
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-yellow-800 mb-3">Kickstart Plan</h3>
        <p className="text-gray-700 mb-4">
          Your business is starting its automation journey. We recommend our <strong>Kickstart Plan</strong> to 
          address your foundational needs with social media scheduling, lead capture to CRM, and basic email flows.
        </p>
        
        <h2 className="text-2xl font-bold text-center mb-4">Recommended Plan</h2>
        
        <div className="bg-white rounded-lg p-6 border border-yellow-200">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-yellow-800">Kickstart Package Pricing</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Recommended</span>
            <h3 className="text-lg font-semibold mt-2">Best Fit</h3>
            <p className="text-gray-600">For businesses new to automation</p>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-3xl font-bold">$149<span className="text-base font-normal">/mo</span></p>
            <p className="text-gray-600">or $499 one-time setup</p>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Core Features</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">AI Social Posts</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Basic Lead Capture System</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Email Welcome Sequences</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Appointment Booking</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Basic Chatbot</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link
              href="/contact"
              className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition duration-150 text-center"
            >
              Send Us a Message
            </Link>
            <Link
              href="https://calendly.com/rba-aus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-white border border-yellow-500 text-yellow-600 font-bold rounded-lg hover:bg-yellow-50 transition duration-150 text-center"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (safeScore >= 41 && safeScore < 80) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-green-800 mb-3">Growth Plan</h3>
        <p className="text-gray-700 mb-4">
          Your business shows significant automation potential. Our <strong>Growth Plan</strong> will 
          help you with multi-channel automation including social media, enhanced CRM integration, and automated email sequences.
        </p>
        
        <h2 className="text-2xl font-bold text-center mb-4">Recommended Plan</h2>
        
        <div className="bg-white rounded-lg p-6 border border-green-200">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-green-800">Growth Package Pricing</h3>
            <p className="text-gray-600">Advanced Package</p>
            <p className="text-gray-600">Multi-channel automation for growing businesses</p>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-3xl font-bold">$349<span className="text-base font-normal">/mo</span></p>
            <p className="text-gray-600">or $1,199 one-time setup</p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link
              href="/contact"
              className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-150 text-center"
            >
              Send Us a Message
            </Link>
            <Link
              href="https://calendly.com/rba-aus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-white border border-green-500 text-green-600 font-bold rounded-lg hover:bg-green-50 transition duration-150 text-center"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-red-800 mb-3">Scale Plan</h3>
        <p className="text-gray-700 mb-4">
          Your business is ready for advanced automation. Our <strong>Scale Plan</strong> provides 
          enterprise-grade solutions with custom workflows, AI-powered tools, and dedicated strategy support.
        </p>
        
        <h2 className="text-2xl font-bold text-center mb-4">Recommended Plan</h2>
        
        <div className="bg-white rounded-lg p-6 border border-red-200">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-red-800">Scale Package Pricing</h3>
            <p className="text-gray-600">Enterprise Grade</p>
            <p className="text-gray-600">Custom automation for maximum ROI</p>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-3xl font-bold">Custom<span className="text-base font-normal"></span></p>
            <p className="text-gray-600">Starting at $799/mo</p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link
              href="/contact"
              className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-150 text-center"
            >
              Request a Quote
            </Link>
            <Link
              href="https://calendly.com/rba-aus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-white border border-red-500 text-red-600 font-bold rounded-lg hover:bg-red-50 transition duration-150 text-center"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </div>
    );
  }
} 