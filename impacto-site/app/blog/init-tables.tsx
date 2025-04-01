'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function InitBlogTables() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  async function initializeTables() {
    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const supabase = createClient();
      
      // First check connectivity
      const { error: connectError } = await supabase.rpc('version');
      
      if (connectError) {
        throw new Error(`Connection error: ${connectError.message}`);
      }
      
      // Create the function for initializing tables directly
      // We'll create a simpler version of the table structure first
      
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
          
          -- Insert default tag if none exists
          INSERT INTO blog_tags (name, slug)
          SELECT 'General', 'general'
          WHERE NOT EXISTS (SELECT 1 FROM blog_tags WHERE slug = 'general');
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
            summary TEXT,
            content TEXT,
            featured_image TEXT,
            published BOOLEAN DEFAULT false,
            category_id BIGINT REFERENCES blog_categories(id) ON DELETE SET NULL,
            published_at TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
            author_name TEXT,
            meta_title TEXT,
            meta_description TEXT,
            view_count BIGINT DEFAULT 0
          );
          
          -- Create index for performance
          CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts(published);
          CREATE INDEX IF NOT EXISTS blog_posts_category_id_idx ON blog_posts(category_id);
        `
      });
      
      if (postsError) {
        throw new Error(`Error creating blog_posts table: ${postsError.message}`);
      }
      
      // Create posts_tags junction table
      const { error: postsTagsError } = await supabase.rpc('execute_sql', {
        sql_query: `
          CREATE TABLE IF NOT EXISTS blog_posts_tags (
            post_id BIGINT REFERENCES blog_posts(id) ON DELETE CASCADE,
            tag_id BIGINT REFERENCES blog_tags(id) ON DELETE CASCADE,
            PRIMARY KEY (post_id, tag_id)
          );
        `
      });
      
      if (postsTagsError) {
        throw new Error(`Error creating blog_posts_tags table: ${postsTagsError.message}`);
      }
      
      // Create blog comments table
      const { error: commentsError } = await supabase.rpc('execute_sql', {
        sql_query: `
          CREATE TABLE IF NOT EXISTS blog_comments (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            post_id BIGINT REFERENCES blog_posts(id) ON DELETE CASCADE,
            author_name TEXT NOT NULL,
            author_email TEXT,
            author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
            content TEXT NOT NULL,
            approved BOOLEAN DEFAULT false,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          CREATE INDEX IF NOT EXISTS blog_comments_post_id_idx ON blog_comments(post_id);
        `
      });
      
      if (commentsError) {
        throw new Error(`Error creating blog_comments table: ${commentsError.message}`);
      }
      
      // Create RLS policies
      const { error: rlsError } = await supabase.rpc('execute_sql', {
        sql_query: `
          -- Enable RLS on all tables
          ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
          ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
          ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
          ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;
          ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
          
          -- Create policies for public reading
          CREATE POLICY IF NOT EXISTS "Allow public read access to published blog posts" 
            ON blog_posts FOR SELECT USING (published = true);
            
          CREATE POLICY IF NOT EXISTS "Allow public read access to categories" 
            ON blog_categories FOR SELECT USING (true);
            
          CREATE POLICY IF NOT EXISTS "Allow public read access to tags" 
            ON blog_tags FOR SELECT USING (true);
            
          CREATE POLICY IF NOT EXISTS "Allow public read access to published post tags" 
            ON blog_posts_tags FOR SELECT USING (
              EXISTS (
                SELECT 1 FROM blog_posts WHERE id = post_id AND published = true
              )
            );
            
          CREATE POLICY IF NOT EXISTS "Allow public read access to approved comments" 
            ON blog_comments FOR SELECT USING (
              approved = true AND EXISTS (
                SELECT 1 FROM blog_posts WHERE id = post_id AND published = true
              )
            );
            
          -- Create policies for authenticated users (assuming they are admins for simplicity)
          CREATE POLICY IF NOT EXISTS "Allow authenticated users to manage all blog content" 
            ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
            
          CREATE POLICY IF NOT EXISTS "Allow authenticated users to manage categories" 
            ON blog_categories FOR ALL USING (auth.role() = 'authenticated');
            
          CREATE POLICY IF NOT EXISTS "Allow authenticated users to manage tags" 
            ON blog_tags FOR ALL USING (auth.role() = 'authenticated');
            
          CREATE POLICY IF NOT EXISTS "Allow authenticated users to manage post tags" 
            ON blog_posts_tags FOR ALL USING (auth.role() = 'authenticated');
            
          CREATE POLICY IF NOT EXISTS "Allow authenticated users to manage comments" 
            ON blog_comments FOR ALL USING (auth.role() = 'authenticated');
        `
      });
      
      if (rlsError) {
        throw new Error(`Error setting up RLS policies: ${rlsError.message}`);
      }
      
      // Success!
      setStatus('success');
      setResult('Blog system successfully initialized! All tables and policies have been created.');
      
    } catch (err: any) {
      console.error('Error initializing blog tables:', err);
      setStatus('error');
      setError(err.message || 'An unknown error occurred while initializing the blog system');
    }
  }

  return (
    <div>
      <button
        onClick={initializeTables}
        disabled={status === 'loading'}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {status === 'loading' ? 'Initializing...' : 'Initialize Blog System'}
      </button>
      
      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Success!</h3>
          <p className="text-green-600">{result}</p>
          <p className="mt-2 text-sm text-green-700">
            Please refresh the page to start using the blog system.
          </p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
} 