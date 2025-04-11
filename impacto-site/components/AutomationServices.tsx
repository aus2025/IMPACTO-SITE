import React from 'react';
import Link from 'next/link';

const AutomationServices = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Social Media Marketing Automation */}
        <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div className="text-5xl mb-4">🌐</div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Social Media Marketing Automation</h3>
          <p className="text-gray-800 mb-6">
            Save time and boost your online visibility with AI-crafted content that engages your audience effectively—without manual effort.
          </p>
          
          <ul className="text-left mb-6 space-y-3">
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-2">•</span>
              <span className="text-gray-800"><strong>Automated content creation & scheduling:</strong> Post consistently without daily input.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-2">•</span>
              <span className="text-gray-800"><strong>AI-driven audience targeting:</strong> Reach exactly who matters most.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-2">•</span>
              <span className="text-gray-800"><strong>Real-time analytics:</strong> Continuously optimize your performance.</span>
            </li>
          </ul>
          
          <Link href="/services/social-media-marketing" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Explore Social Media Automation
          </Link>
        </div>
        
        {/* Business Workflow Automation */}
        <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div className="text-5xl mb-4">🤖</div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Business Workflow Automation</h3>
          <p className="text-gray-800 mb-6">
            Simplify your daily operations and eliminate manual tasks—allowing your business to scale effortlessly.
          </p>
          
          <ul className="text-left mb-6 space-y-3">
            <li className="flex items-start">
              <span className="text-purple-500 font-bold mr-2">•</span>
              <span className="text-gray-800"><strong>Tailored workflow solutions:</strong> Built to fit your exact business processes.</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 font-bold mr-2">•</span>
              <span className="text-gray-800"><strong>Easy integration:</strong> Connect smoothly with your existing tools (CRM, Email, ERP, and more).</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 font-bold mr-2">•</span>
              <span className="text-gray-800"><strong>Reduce costs, minimize errors:</strong> Increase efficiency and profitability.</span>
            </li>
          </ul>
          
          <Link href="/services/automation-services" className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
            Explore Workflow Automation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AutomationServices; 