'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function DebugQuery() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [tableInfo, setTableInfo] = useState<any>(null);
  const [queryResult, setQueryResult] = useState<any>(null);

  const supabase = createClient();

  async function checkTableStructure() {
    setLoading(true);
    setError(null);
    
    try {
      // First, get blog_posts structure
      const { data: postsStructure, error: postsError } = await supabase.rpc(
        'execute_sql', 
        { sql_query: "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'blog_posts'" }
      );
      
      if (postsError) throw postsError;

      // Get foreign key relationships
      const { data: foreignKeys, error: foreignKeysError } = await supabase.rpc(
        'execute_sql',
        { sql_query: "SELECT tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name FROM information_schema.table_constraints AS tc JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name WHERE constraint_type = 'FOREIGN KEY' AND (tc.table_name = 'blog_posts' OR tc.table_name = 'blog_post_tags')" }
      );
      
      if (foreignKeysError) throw foreignKeysError;
      
      setTableInfo({
        postsStructure,
        foreignKeys
      });
    } catch (err) {
      console.error("Error checking table structure:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function runTestQuery() {
    setLoading(true);
    setError(null);
    
    try {
      // Run a simplified query just to get blog posts
      const { data, error: queryError, count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .limit(5);
      
      if (queryError) throw queryError;
      
      setQueryResult({
        data,
        count
      });
    } catch (err) {
      console.error("Error running test query:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Query Debugger</h1>
      
      <div className="flex space-x-4 mb-4">
        <button 
          onClick={checkTableStructure}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Check Table Structure
        </button>
        
        <button 
          onClick={runTestQuery}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Run Test Query
        </button>
      </div>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error:</p>
          <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
      
      {tableInfo && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Table Structure</h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto">
            <h3 className="font-medium mb-2">blog_posts columns:</h3>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left">Column Name</th>
                  <th className="text-left">Data Type</th>
                </tr>
              </thead>
              <tbody>
                {tableInfo.postsStructure && tableInfo.postsStructure.map((col: any, i: number) => (
                  <tr key={i}>
                    <td className="border px-4 py-2">{col.column_name}</td>
                    <td className="border px-4 py-2">{col.data_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <h3 className="font-medium mt-4 mb-2">Foreign Key Relationships:</h3>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left">Table</th>
                  <th className="text-left">Column</th>
                  <th className="text-left">References Table</th>
                  <th className="text-left">References Column</th>
                </tr>
              </thead>
              <tbody>
                {tableInfo.foreignKeys && tableInfo.foreignKeys.map((fk: any, i: number) => (
                  <tr key={i}>
                    <td className="border px-4 py-2">{fk.table_name}</td>
                    <td className="border px-4 py-2">{fk.column_name}</td>
                    <td className="border px-4 py-2">{fk.foreign_table_name}</td>
                    <td className="border px-4 py-2">{fk.foreign_column_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {queryResult && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Query Results</h2>
          <p>Total records: {queryResult.count || 0}</p>
          <div className="bg-gray-100 p-4 rounded overflow-auto">
            <pre className="whitespace-pre-wrap">{JSON.stringify(queryResult.data, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
} 