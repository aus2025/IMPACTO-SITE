import React from 'react';
import InitBlogTables from '../../blog/init-tables';
import BlogDiagnosticNav from '../diagnostic-nav';

export default function InitTablesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BlogDiagnosticNav />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Initialize Blog System
      </h1>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-yellow-800 mb-3">Important Information</h2>
        <p className="text-yellow-700 mb-4">
          This page will initialize the blog system by creating the necessary tables in your Supabase database.
          Before continuing, make sure that:
        </p>
        
        <ol className="list-decimal ml-5 text-yellow-800 space-y-2">
          <li>You have created the <code className="bg-yellow-50 px-1">execute_sql</code> function in your Supabase project.</li>
          <li>You have the necessary permissions to create tables in your Supabase database.</li>
          <li>You understand that this will create new tables in your database.</li>
        </ol>
        
        <div className="mt-6 bg-white p-4 rounded-md border border-yellow-100">
          <h3 className="font-medium text-yellow-900 mb-2">Prerequisites:</h3>
          <p className="mb-4">Create the <code>execute_sql</code> function in your Supabase SQL editor:</p>
          
          <pre className="p-3 bg-gray-50 rounded text-sm overflow-auto">
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
      </div>
      
      <InitBlogTables />
    </div>
  );
}

export const metadata = {
  title: 'Initialize Blog System | Impacto ONG',
  description: 'Setup and initialize the blog system for your Impacto website',
}; 