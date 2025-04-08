import React from 'react';

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Placeholder for blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Placeholder for featured image */}
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              {/* Placeholder for category */}
              <div className="w-24 h-6 bg-gray-200 rounded mb-3"></div>
              {/* Placeholder for title */}
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
              {/* Placeholder for date */}
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              {/* Placeholder for excerpt */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              {/* Placeholder for read more link */}
              <div className="h-6 bg-gray-200 rounded w-28 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Placeholder for pagination */}
      <div className="flex justify-center mt-10">
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-10 h-10 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
  );
} 