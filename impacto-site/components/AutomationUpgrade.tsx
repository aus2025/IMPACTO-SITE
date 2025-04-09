import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowUpRight, Zap } from 'lucide-react';

const AutomationUpgrade = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
        <div className="text-4xl mb-4">⚡</div>
        <h3 className="text-2xl font-bold mb-3 text-gray-800">Already Automating</h3>
        <p className="text-gray-800 mb-6">
          Take your existing automation to the next level with our expert solutions
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-teal-500 text-lg font-bold mb-2">Audit</div>
            <p className="text-gray-800 mb-4">Review your current automation setup to identify gaps and opportunities</p>
            <Zap className="h-8 w-8 text-teal-500 mx-auto" />
          </div>
          
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-teal-500 text-lg font-bold mb-2">Optimize</div>
            <p className="text-gray-800 mb-4">Refine and enhance your existing workflows for maximum efficiency</p>
            <Zap className="h-8 w-8 text-teal-500 mx-auto" />
          </div>
          
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-teal-500 text-lg font-bold mb-2">Scale</div>
            <p className="text-gray-800 mb-4">Expand your automation capabilities to handle growing business needs</p>
            <Zap className="h-8 w-8 text-teal-500 mx-auto" />
          </div>
        </div>
        
        <Link 
          href="/pricing" 
          className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
        >
          View Upgrade Options
          <ArrowUpRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default AutomationUpgrade; 