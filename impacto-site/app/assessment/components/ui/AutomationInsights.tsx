'use client';

import { motion } from 'framer-motion';

type AutomationInsightsProps = {
  insights: string[];
};

export default function AutomationInsights({ insights }: AutomationInsightsProps) {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personalized Automation Insights</h3>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start p-3 bg-blue-50 border-l-4 border-blue-500 rounded"
          >
            <div className="flex-shrink-0 mr-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-blue-600" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <p className="text-sm text-gray-700">{insight}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-5 pt-5 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-600">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-yellow-500 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" 
              clipRule="evenodd" 
            />
          </svg>
          <p>
            <strong>Pro Tip:</strong> Businesses that act on automation insights see an average of 31% higher ROI than those who delay implementation.
          </p>
        </div>
      </div>
    </div>
  );
} 