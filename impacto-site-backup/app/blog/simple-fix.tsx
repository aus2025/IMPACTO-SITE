'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function SimpleFix() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [tableInfo, setTableInfo] = useState<{[key: string]: boolean}>({});

  // Simple check for one table
  async function checkTable(tableName: string) {
    try {
      setLoading(true);
      setError(null);
      setMessage(`Checking if ${tableName} exists...`);
      
      const supabase = createClient();
      const { error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);
      
      const exists = !error || !error.message.includes('does not exist');
      
      // Update table status
      setTableInfo(prev => ({
        ...prev,
        [tableName]: exists
      }));
      
      return exists;
    } catch (err) {
      console.error(`Error checking ${tableName}:`, err);
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Check all blog tables
  async function checkAllTables() {
    setLoading(true);
    setError(null);
    setMessage('Checking tables...');
    
    try {
      const tables = ['blog_posts', 'blog_categories', 'blog_tags', 'blog_post_tags'];
      const tableStatus: {[key: string]: boolean} = {};
      
      for (const table of tables) {
        const exists = await checkTable(table);
        tableStatus[table] = exists;
      }
      
      setTableInfo(tableStatus);
      
      const allExist = Object.values(tableStatus).every(Boolean);
      setStatus(allExist ? 'tables_exist' : 'tables_missing');
      setMessage(allExist ? 'All required tables exist' : 'Some tables are missing');
    } catch (err) {
      console.error('Error checking tables:', err);
      setError('Error checking tables: ' + String(err));
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  // Initialize one table
  async function createTable(tableName: string, sqlQuery: string) {
    try {
      setMessage(`Creating ${tableName}...`);
      const supabase = createClient();
      
      const { error } = await supabase.rpc('execute_sql', { sql_query: sqlQuery });
      
      if (error) {
        if (error.message.includes('execute_sql')) {
          throw new Error('The execute_sql function does not exist in your database. Please create it first using the SQL provided below.');
        }
        throw new Error(`Error creating ${tableName}: ${error.message}`);
      }
      
      return true;
    } catch (err) {
      console.error(`Error creating ${tableName}:`, err);
      setError(String(err));
      return false;
    }
  }

  // Initialize all tables
  async function initializeTables() {
    setLoading(true);
    setError(null);
    setMessage('Initializing blog tables...');
    
    try {
      // Create categories
      await createTable('blog_categories', `
        CREATE TABLE IF NOT EXISTS blog_categories (
          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Insert default category
        INSERT INTO blog_categories (name, slug, description)
        SELECT 'Uncategorized', 'uncategorized', 'Default category for blog posts'
        WHERE NOT EXISTS (SELECT 1 FROM blog_categories WHERE slug = 'uncategorized');
      `);
      
      // Create tags
      await createTable('blog_tags', `
        CREATE TABLE IF NOT EXISTS blog_tags (
          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      
      // Create posts
      await createTable('blog_posts', `
        CREATE TABLE IF NOT EXISTS blog_posts (
          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          excerpt TEXT,
          content TEXT,
          featured_image TEXT,
          author_id UUID,
          category_id BIGINT REFERENCES blog_categories(id),
          status TEXT NOT NULL DEFAULT 'draft',
          view_count BIGINT DEFAULT 0,
          published_at TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      
      // Create post_tags junction
      await createTable('blog_post_tags', `
        CREATE TABLE IF NOT EXISTS blog_post_tags (
          post_id BIGINT REFERENCES blog_posts(id) ON DELETE CASCADE,
          tag_id BIGINT REFERENCES blog_tags(id) ON DELETE CASCADE,
          PRIMARY KEY (post_id, tag_id)
        );
      `);
      
      setMessage('All tables created successfully!');
      setStatus('initialized');
      
      // Check tables again
      setTimeout(() => {
        checkAllTables();
      }, 1000);
      
    } catch (err) {
      console.error('Error initializing tables:', err);
      setError(String(err));
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-4">Simple Blog System Fix</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      
      {message && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4">
          <p>{message}</p>
        </div>
      )}
      
      {/* Table Status */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Table Status</h2>
        <div className="bg-white rounded border border-gray-200 p-4">
          {Object.keys(tableInfo).length > 0 ? (
            <ul className="space-y-2">
              {Object.entries(tableInfo).map(([table, exists]) => (
                <li key={table} className="flex items-center">
                  <span className={`inline-block w-4 h-4 rounded-full mr-2 ${exists ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="font-mono">{table}</span>
                  <span className="ml-2 text-sm text-gray-500">{exists ? 'Exists' : 'Missing'}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No table information available yet. Click "Check Tables" to scan your database.</p>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={checkAllTables}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Working...' : 'Check Tables'}
        </button>
        
        <button
          onClick={initializeTables}
          disabled={loading || status === 'tables_exist'}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          {loading ? 'Working...' : 'Initialize Tables'}
        </button>
      </div>
      
      {/* SQL Function Info */}
      <div className="bg-white p-4 rounded border border-gray-200 mb-6">
        <h3 className="font-medium mb-2">Required SQL Function</h3>
        <p className="mb-2 text-gray-600">Before initializing, create this function in your Supabase SQL editor:</p>
        <pre className="bg-gray-50 p-2 rounded text-sm overflow-auto">
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
        <Link href="/blog" className="text-blue-500 hover:underline mr-4">
          Return to Blog
        </Link>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
} 