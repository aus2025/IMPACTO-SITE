'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import BlogDiagnosticNav from '../diagnostic-nav';

export default function DebugTablesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tables, setTables] = useState<Record<string, boolean>>({});
  const [allTablesData, setAllTablesData] = useState<any[]>([]);
  const [debugInfo, setDebugInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    async function checkTables() {
      try {
        setLoading(true);
        const supabase = createClient();
        
        // Get all public tables
        const { data: allTables, error: allTablesError } = await supabase
          .from('pg_catalog.pg_tables')
          .select('tablename, schemaname')
          .eq('schemaname', 'public');
          
        if (allTablesError) {
          throw new Error('Could not fetch all tables: ' + allTablesError.message);
        }
        
        setAllTablesData(allTables || []);
        
        // Check specific blog tables
        const requiredTables = ['blog_posts', 'blog_categories', 'blog_tags', 'blog_post_tags'];
        const tableStatus: Record<string, boolean> = {};
        
        for (const table of requiredTables) {
          tableStatus[table] = Boolean(allTables?.some(t => t.tablename === table));
        }
        
        setTables(tableStatus);
        
        // Collect additional debug info
        const info: Record<string, any> = {};
        
        // Test connection
        try {
          const { data: connTest, error: connError } = await supabase.from('_tables').select('*').limit(1);
          info.connectionTest = {
            success: !connError,
            error: connError ? connError.message : null,
            data: connTest
          };
        } catch (err) {
          info.connectionTest = {
            success: false,
            error: String(err)
          };
        }
        
        // Check RLS policies
        try {
          const { data: rlsPolicies, error: rlsError } = await supabase
            .rpc('get_policies_for_table', { table_name: 'blog_posts' });
          
          info.rlsPolicies = {
            success: !rlsError,
            error: rlsError ? rlsError.message : null,
            data: rlsPolicies
          };
        } catch (err) {
          info.rlsPolicies = {
            success: false,
            error: String(err)
          };
        }
        
        // Check execute_sql function
        try {
          const { data: execSqlTest, error: execSqlError } = await supabase
            .rpc('execute_sql', { sql_query: 'SELECT 1 as test' });
          
          info.executeSqlTest = {
            success: !execSqlError,
            error: execSqlError ? execSqlError.message : null,
            data: execSqlTest
          };
        } catch (err) {
          info.executeSqlTest = {
            success: false,
            error: String(err)
          };
        }
        
        setDebugInfo(info);
        
      } catch (err) {
        console.error('Error in debug process:', err);
        setError(String(err));
      } finally {
        setLoading(false);
      }
    }
    
    checkTables();
  }, []);
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <BlogDiagnosticNav />
        <h1 className="text-2xl font-bold mb-4">Blog Tables Debug</h1>
        <div className="bg-gray-50 p-4 rounded">
          <div className="flex justify-center">
            <div className="animate-spin h-5 w-5 mr-3 rounded-full border-t-2 border-blue-500 border-r-2 border-blue-500"></div>
            <span>Checking tables...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <BlogDiagnosticNav />
        <h1 className="text-2xl font-bold mb-4">Blog Tables Debug</h1>
        <div className="bg-red-50 p-4 rounded border border-red-200">
          <h2 className="text-red-700 font-bold">Error</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  // Count existing tables
  const existingTables = Object.values(tables).filter(Boolean).length;
  const totalTables = Object.keys(tables).length;
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <BlogDiagnosticNav />
      <h1 className="text-2xl font-bold mb-4">Blog Tables Debug</h1>
      
      <div className="mb-8">
        <div className={`p-4 rounded ${existingTables === totalTables ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
          <h2 className={`font-bold mb-2 ${existingTables === totalTables ? 'text-green-700' : 'text-yellow-700'}`}>
            Blog Tables Status: {existingTables}/{totalTables} tables exist
          </h2>
          
          <div className="space-y-2">
            {Object.entries(tables).map(([table, exists]) => (
              <div key={table} className="flex items-center">
                <span className={`w-5 h-5 flex-shrink-0 rounded-full ${exists ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
                <span className="font-mono">{table}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex space-x-4">
              <Link 
                href="/blog/fixed"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Go to Fixed Blog
              </Link>
              
              {existingTables !== totalTables && (
                <Link 
                  href="/blog/init-tables"
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Initialize Tables
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">All Public Tables</h2>
        <div className="bg-white p-4 rounded border border-gray-200 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Table Name</th>
                <th className="px-4 py-2 text-left">Schema</th>
              </tr>
            </thead>
            <tbody>
              {allTablesData.map((table, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-4 py-2 font-mono">{table.tablename}</td>
                  <td className="px-4 py-2 font-mono">{table.schemaname}</td>
                </tr>
              ))}
              {allTablesData.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
                    No tables found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Debug Information</h2>
        
        <div className="space-y-4">
          {/* Connection Test */}
          <div className={`p-4 rounded border ${debugInfo.connectionTest?.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className="font-bold mb-2">Connection Test (_tables query)</h3>
            <div>
              <p className={debugInfo.connectionTest?.success ? 'text-green-700' : 'text-red-700'}>
                Status: {debugInfo.connectionTest?.success ? 'Success' : 'Failed'}
              </p>
              {debugInfo.connectionTest?.error && (
                <p className="text-red-600 mt-2">
                  Error: {debugInfo.connectionTest.error}
                </p>
              )}
            </div>
          </div>
          
          {/* execute_sql Function Test */}
          <div className={`p-4 rounded border ${debugInfo.executeSqlTest?.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className="font-bold mb-2">execute_sql Function Test</h3>
            <div>
              <p className={debugInfo.executeSqlTest?.success ? 'text-green-700' : 'text-red-700'}>
                Status: {debugInfo.executeSqlTest?.success ? 'Available' : 'Not Available or Not Permitted'}
              </p>
              {debugInfo.executeSqlTest?.error && (
                <p className="text-red-600 mt-2">
                  Error: {debugInfo.executeSqlTest.error}
                </p>
              )}
            </div>
          </div>
          
          {/* RLS Policies */}
          <div className={`p-4 rounded border ${debugInfo.rlsPolicies?.success ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <h3 className="font-bold mb-2">RLS Policies Check</h3>
            <div>
              <p className={debugInfo.rlsPolicies?.success ? 'text-green-700' : 'text-yellow-700'}>
                Status: {debugInfo.rlsPolicies?.success ? 'Accessible' : 'Cannot access policy info'}
              </p>
              {debugInfo.rlsPolicies?.error && (
                <p className="text-yellow-600 mt-2">
                  Note: {debugInfo.rlsPolicies.error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 