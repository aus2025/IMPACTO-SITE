'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function TestConnection() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function testConnection() {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const supabase = createClient();
      
      // Test connection to Supabase using version() RPC
      const { data, error } = await supabase.rpc('version');
      
      if (error) {
        throw new Error(`Connection error: ${error.message}`);
      }
      
      // Try to get list of public tables
      const { data: tablesData, error: tablesError } = await supabase
        .from('pg_catalog.pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      // Prepare result data
      const resultData = {
        version: data,
        tables: tablesError ? 'Error fetching tables' : tablesData?.map((t: any) => t.tablename) || []
      };
      
      setResult(JSON.stringify(resultData, null, 2));
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <button
        onClick={testConnection}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
          <pre className="bg-white p-3 rounded text-red-600 text-sm overflow-auto whitespace-pre-wrap">{error}</pre>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800 text-sm">
              <strong>Troubleshooting tips:</strong>
            </p>
            <ul className="list-disc ml-5 mt-2 text-sm text-yellow-700 space-y-1">
              <li>Check your Supabase URL and anon key in .env.local</li>
              <li>Verify your Supabase instance is running</li>
              <li>Check network connectivity</li>
              <li>Review browser console for any CORS errors</li>
            </ul>
          </div>
        </div>
      )}
      
      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Success</h3>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <pre className="text-gray-800 text-sm overflow-auto whitespace-pre-wrap">{result}</pre>
          </div>
        </div>
      )}
    </div>
  );
} 