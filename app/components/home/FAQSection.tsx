'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {/* FAQ Item 1 */}
            <div className="py-4">
              <button 
                className="flex justify-between items-center w-full text-left focus:outline-none" 
                onClick={() => toggleFaq(0)}
              >
                <h3 className="text-xl font-semibold text-gray-800">Is AI automation suitable for a small business like mine?</h3>
                <svg 
                  className={`w-6 h-6 text-gray-500 transform ${openFaq === 0 ? 'rotate-180' : ''} transition-transform duration-200`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 0 && (
                <div className="mt-3 text-gray-700">
                  <p>
                    Absolutely. Our AI solutions are scalable and can be tailored to businesses of any size. We have successfully implemented automation for solo entrepreneurs up to mid-sized companies. <span className="font-medium">No big IT department is required</span> – if you have processes that consume time, we can likely automate them and free you up to focus on your business.
                  </p>
                </div>
              )}
            </div>
            
            {/* FAQ Item 2 */}
            <div className="py-4">
              <button 
                className="flex justify-between items-center w-full text-left focus:outline-none" 
                onClick={() => toggleFaq(1)}
              >
                <h3 className="text-xl font-semibold text-gray-800">How quickly will I see a return on investment (ROI)?</h3>
                <svg 
                  className={`w-6 h-6 text-gray-500 transform ${openFaq === 1 ? 'rotate-180' : ''} transition-transform duration-200`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 1 && (
                <div className="mt-3 text-gray-700">
                  <p>
                    Most of our clients start noticing improvements immediately, and many see a full <span className="font-medium">ROI within the first 4&ndash;6 months</span> of implementation. We focus on quick wins – like reducing manual work and errors – which translates into fast savings. Our goal is to have the automation pay for itself as soon as possible for you.
                  </p>
                </div>
              )}
            </div>
            
            {/* FAQ Item 3 */}
            <div className="py-4">
              <button 
                className="flex justify-between items-center w-full text-left focus:outline-none" 
                onClick={() => toggleFaq(2)}
              >
                <h3 className="text-xl font-semibold text-gray-800">Do I need any technical expertise or an IT team to use your solutions?</h3>
                <svg 
                  className={`w-6 h-6 text-gray-500 transform ${openFaq === 2 ? 'rotate-180' : ''} transition-transform duration-200`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 2 && (
                <div className="mt-3 text-gray-700">
                  <p>
                    No technical expertise is needed on your part. The Impacto team handles all the heavy lifting – from setting up the AI tools to integrating with your systems. We also provide training to you and your staff. If you can use everyday business software, you can use our AI solutions. We're here to support you at every step.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-700 mb-4">Still have questions? We're happy to help.</p>
            <Link 
              href="/contact" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              More Questions? Send us a message!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 