'use client';

import React from 'react';
import Link from 'next/link';

export default function AutomationPageClient() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Streamline Your Operations with Business Workflow Automation
            </h1>
            <p className="text-xl mb-8">
              Eliminate repetitive tasks, reduce errors, and free your team to focus on what matters most.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/assessment" className="cta-button-global">
                Take Our Free Automation Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is Workflow Automation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              What is Business Workflow Automation?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Business Workflow Automation is the technology-enabled automation of complex business processes and tasks. It's about using intelligent software to handle repetitive, multi-step tasks that would otherwise require manual effort.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Our automation solutions connect your existing tools and streamline processes across your entire organization—from client onboarding and invoice processing to data entry between applications, approval workflows, and report generation.
                </p>
                <p className="text-lg text-gray-700">
                  The result? Fewer errors, massive time savings, faster processes, improved consistency, and employees freed up to focus on value-adding work that requires human creativity and judgment.
                </p>
              </div>
              <div className="bg-gray-100 p-8 rounded-xl">
                <div className="text-7xl mb-4 text-center">⚙️</div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Common Automated Workflows</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-500 font-bold mr-2">✓</span>
                    <span className="text-black">Client onboarding processes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 font-bold mr-2">✓</span>
                    <span className="text-black">Invoice processing and approvals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 font-bold mr-2">✓</span>
                    <span className="text-black">Data synchronization between apps</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 font-bold mr-2">✓</span>
                    <span className="text-black">Document generation and management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 font-bold mr-2">✓</span>
                    <span className="text-black">Approval and escalation workflows</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why Your Business Needs Workflow Automation
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Dramatic Time Savings</h3>
                <p className="text-gray-700">
                  Reduce processing times by up to 90%, freeing your team from mundane tasks and allowing them to focus on high-value work that drives growth.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Error Reduction</h3>
                <p className="text-gray-700">
                  Eliminate human errors in data entry and processing. Our clients typically see a 95% reduction in errors, leading to improved quality and customer satisfaction.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Cost Reduction</h3>
                <p className="text-gray-700">
                  Save thousands in labor costs by automating repetitive tasks. Our automation solutions typically pay for themselves within 3-6 months.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Improved Employee Satisfaction</h3>
                <p className="text-gray-700">
                  Free your team from mundane, repetitive tasks and allow them to focus on more rewarding work that uses their skills and creativity.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a href="https://calendly.com/rba-aus" className="cta-button-global">Schedule Your Automation Consultation</a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Our Workflow Automation Process
            </h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Process Analysis</h3>
                  <p className="text-gray-700">
                    We analyze your current workflows to identify bottlenecks, inefficiencies, and opportunities for automation. This includes mapping processes and documenting requirements.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Solution Design</h3>
                  <p className="text-gray-700">
                    Our team designs custom automation solutions tailored to your specific business needs, leveraging your existing tools and integrating new ones as needed.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Implementation</h3>
                  <p className="text-gray-700">
                    We handle the technical setup, configuration, and testing of your automated workflows, ensuring they integrate seamlessly with your existing systems.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Training & Support</h3>
                  <p className="text-gray-700">
                    We provide comprehensive training for your team and ongoing support to ensure your automated workflows continue to run smoothly and evolve with your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 text-white" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Remove Bottlenecks From Your Business?</h2>
            <p className="text-xl mb-8">
              Join businesses that have cut processing times by 90% and eliminated costly errors with our custom workflow automation solutions.
            </p>
            <Link href="/contact" className="cta-button-global">
              Contact Us To Streamline Your Business
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 