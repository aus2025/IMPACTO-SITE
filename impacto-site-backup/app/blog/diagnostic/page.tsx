import React from 'react';
import BlogDiagnosticNav from '../diagnostic-nav';
import Link from 'next/link';
import { FiAlertTriangle, FiDatabase, FiCode, FiCheck, FiInfo } from 'react-icons/fi';

export default function DiagnosticPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Blog System Diagnostics
      </h1>
      
      <BlogDiagnosticNav />
      
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mr-3">
            <FiInfo className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">About This Page</h2>
            <p className="mt-1 text-gray-600">
              This diagnostics center helps you identify and fix issues with the blog system. 
              Follow the step-by-step instructions below to resolve common problems.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mr-3">
              <FiAlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-red-800">Common Issues</h2>
            </div>
          </div>
          
          <ul className="space-y-3 text-red-700">
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 bg-red-200 rounded-full mr-2 mt-1"></span>
              <span><strong>Missing Tables</strong>: Blog tables don't exist in your Supabase database.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 bg-red-200 rounded-full mr-2 mt-1"></span>
              <span><strong>Connection Issues</strong>: Problems connecting to Supabase due to incorrect credentials.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 bg-red-200 rounded-full mr-2 mt-1"></span>
              <span><strong>Missing Functions</strong>: Required database functions like <code>execute_sql</code> are not set up.</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mr-3">
              <FiCheck className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-green-800">Solution Steps</h2>
            </div>
          </div>
          
          <ol className="space-y-3 text-green-700 list-decimal ml-6">
            <li>
              <Link href="/blog/test-connection" className="underline hover:text-green-900">Test your Supabase connection</Link>
            </li>
            <li>
              <Link href="/blog/debug-tables" className="underline hover:text-green-900">Check if blog tables exist</Link>
            </li>
            <li>
              <Link href="/blog/init-tables" className="underline hover:text-green-900">Initialize blog tables</Link> if they're missing
            </li>
            <li>
              <Link href="/blog/fixed" className="underline hover:text-green-900">Try the fixed blog implementation</Link>
            </li>
          </ol>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center">
            <FiDatabase className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Required Database Setup</h2>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-md font-medium text-gray-700 mb-3">Creating the <code>execute_sql</code> Function</h3>
          <p className="text-gray-600 mb-4">
            Before initializing the blog system, you need to create this helper function in your Supabase SQL editor:
          </p>
          
          <div className="bg-gray-50 rounded-md p-4 overflow-auto">
            <pre className="text-sm text-gray-800">
{`-- Create a function to execute SQL statements dynamically
CREATE OR REPLACE FUNCTION execute_sql(sql_query TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE sql_query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION execute_sql(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION execute_sql(TEXT) TO anon;`}
            </pre>
          </div>
          
          <div className="mt-4">
            <h3 className="text-md font-medium text-gray-700 mb-3">Blog System Tables</h3>
            <p className="text-gray-600 mb-4">
              The following tables will be created during initialization:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-3">
                <h4 className="font-medium text-gray-800">blog_categories</h4>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>id (PRIMARY KEY)</li>
                  <li>name</li>
                  <li>slug (UNIQUE)</li>
                  <li>description</li>
                  <li>created_at</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-md p-3">
                <h4 className="font-medium text-gray-800">blog_tags</h4>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>id (PRIMARY KEY)</li>
                  <li>name</li>
                  <li>slug (UNIQUE)</li>
                  <li>created_at</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-md p-3">
                <h4 className="font-medium text-gray-800">blog_posts</h4>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>id (PRIMARY KEY)</li>
                  <li>title</li>
                  <li>slug (UNIQUE)</li>
                  <li>excerpt</li>
                  <li>content</li>
                  <li>featured_image</li>
                  <li>author_id</li>
                  <li>category_id (FOREIGN KEY)</li>
                  <li>status</li>
                  <li>view_count</li>
                  <li>published_at</li>
                  <li>created_at</li>
                  <li>updated_at</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-md p-3">
                <h4 className="font-medium text-gray-800">blog_post_tags</h4>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>post_id (FOREIGN KEY)</li>
                  <li>tag_id (FOREIGN KEY)</li>
                  <li>PRIMARY KEY (post_id, tag_id)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <FiCode className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-blue-800">Additional Resources</h2>
            <p className="mt-1 text-blue-700">
              For more detailed information, check out the <Link href="/blog/README.md" className="underline font-medium">README.md</Link> file 
              or visit the <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="underline font-medium">Supabase documentation</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Blog Diagnostics | Impacto ONG',
  description: 'Diagnose and fix issues with the blog system',
}; 