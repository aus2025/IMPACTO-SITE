'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function DirectFix() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [tablesExist, setTablesExist] = useState<boolean | null>(null);
  const [missingTables, setMissingTables] = useState<string[]>([]);

  // Check if blog tables exist
  useEffect(() => {
    async function checkTables() {
      try {
        const supabase = createClient();
        
        // Try a simpler approach - check directly if the blog_posts table exists
        // by attempting to query it (with a limit 0 to avoid fetching data)
        const { error: postsTableError } = await supabase
          .from('blog_posts')
          .select('id')
          .limit(0);
          
        const { error: categoriesTableError } = await supabase
          .from('blog_categories')
          .select('id')
          .limit(0);
          
        const { error: tagsTableError } = await supabase
          .from('blog_tags')
          .select('id')
          .limit(0);
          
        const { error: postTagsTableError } = await supabase
          .from('blog_post_tags')
          .select('post_id')
          .limit(0);
        
        // Collect missing tables based on errors
        const missingTablesList = [];
        if (postsTableError && postsTableError.message.includes('does not exist')) {
          missingTablesList.push('blog_posts');
        }
        if (categoriesTableError && categoriesTableError.message.includes('does not exist')) {
          missingTablesList.push('blog_categories');
        }
        if (tagsTableError && tagsTableError.message.includes('does not exist')) {
          missingTablesList.push('blog_tags');
        }
        if (postTagsTableError && postTagsTableError.message.includes('does not exist')) {
          missingTablesList.push('blog_post_tags');
        }
        
        setMissingTables(missingTablesList);
        setTablesExist(missingTablesList.length === 0);
        
        if (missingTablesList.length === 0) {
          await fetchBlogPosts();
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error checking tables:', err);
        setError('Failed to check for blog tables: ' + String(err));
        setLoading(false);
        setTablesExist(false);
      }
    }
    
    checkTables();
  }, []);

  // Fetch blog posts
  async function fetchBlogPosts() {
    try {
      setLoading(true);
      const supabase = createClient();
      
      const { data, error, count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts: ' + error.message);
      } else {
        setPosts(data || []);
        setMessage(`Successfully fetched ${data?.length || 0} posts`);
      }
    } catch (err) {
      console.error('Error in fetchBlogPosts:', err);
      setError('Unexpected error: ' + String(err));
    } finally {
      setLoading(false);
    }
  }

  // Initialize tables
  async function initializeTables() {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      
      const supabase = createClient();
      
      // First, test connection
      const { error: connectError } = await supabase.rpc('version');
      if (connectError) {
        throw new Error('Connection error: ' + connectError.message);
      }
      
      // Create blog categories table
      const { error: categoriesError } = await supabase.rpc('execute_sql', {
        sql_query: `
          CREATE TABLE IF NOT EXISTS blog_categories (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          -- Insert default category if none exists
          INSERT INTO blog_categories (name, slug, description)
          SELECT 'Uncategorized', 'uncategorized', 'Default category for blog posts'
          WHERE NOT EXISTS (SELECT 1 FROM blog_categories WHERE slug = 'uncategorized');
        `
      });
      
      if (categoriesError) {
        if (categoriesError.message.includes('execute_sql')) {
          throw new Error(`The 'execute_sql' function doesn't exist in your Supabase instance. You need to create this function in the SQL editor first.`);
        } else {
          throw new Error(`Error creating blog_categories table: ${categoriesError.message}`);
        }
      }
      
      // Create blog tags table
      const { error: tagsError } = await supabase.rpc('execute_sql', {
        sql_query: `
          CREATE TABLE IF NOT EXISTS blog_tags (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      if (tagsError) {
        throw new Error(`Error creating blog_tags table: ${tagsError.message}`);
      }
      
      // Create blog posts table
      const { error: postsError } = await supabase.rpc('execute_sql', {
        sql_query: `
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
        `
      });
      
      if (postsError) {
        throw new Error(`Error creating blog_posts table: ${postsError.message}`);
      }
      
      // Create blog post tags junction table
      const { error: postTagsError } = await supabase.rpc('execute_sql', {
        sql_query: `
          CREATE TABLE IF NOT EXISTS blog_post_tags (
            post_id BIGINT REFERENCES blog_posts(id) ON DELETE CASCADE,
            tag_id BIGINT REFERENCES blog_tags(id) ON DELETE CASCADE,
            PRIMARY KEY (post_id, tag_id)
          );
        `
      });
      
      if (postTagsError) {
        throw new Error(`Error creating blog_post_tags table: ${postTagsError.message}`);
      }
      
      setMessage('Blog tables created successfully! Refreshing...');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (err) {
      console.error('Error initializing tables:', err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold mb-4">Blog System Fix</h1>
        <div className="bg-gray-50 p-4 rounded flex justify-center">
          <div className="animate-spin h-5 w-5 mr-3 rounded-full border-t-2 border-blue-500 border-r-2 border-blue-500"></div>
          <span>Working...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-4">Blog System Fix</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          <p>{message}</p>
        </div>
      )}
      
      {!tablesExist && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-4">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Blog Tables Missing</h2>
          <p className="text-yellow-700 mb-4">
            The following tables are missing: {missingTables.join(', ')}
          </p>
          
          <div className="bg-white p-4 rounded border border-yellow-100 mb-4">
            <h3 className="font-medium mb-2">Required SQL Function</h3>
            <p className="mb-2">Before initializing, make sure you've created this function in Supabase SQL editor:</p>
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
          
          <button
            onClick={initializeTables}
            disabled={loading}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            Initialize Blog Tables
          </button>
        </div>
      )}
      
      {tablesExist && (
        <div className="bg-white border border-gray-200 p-4 rounded mb-4">
          <h2 className="text-lg font-semibold mb-2">Blog Posts</h2>
          
          <button
            onClick={fetchBlogPosts}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-4"
          >
            Refresh Posts
          </button>
          
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="border border-gray-100 p-3 rounded">
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    Status: {post.status} | Created: {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  {post.excerpt && (
                    <p className="mt-2 text-gray-700">{post.excerpt}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No posts found in the database.</p>
          )}
        </div>
      )}
      
      <div className="mt-4">
        <Link href="/blog" className="text-blue-500 hover:underline">
          Return to Blog
        </Link>
      </div>
    </div>
  );
} 