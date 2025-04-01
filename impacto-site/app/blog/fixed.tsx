'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  TempBlogPostsGrid,
  TempBlogSearch,
  TempBlogSidebar,
  TempBlogPagination,
  TempBlogCategoriesFilter,
  TempBlogTagsFilter 
} from './components/TempBlogComponents';
import Link from 'next/link';
import InitBlogTables from './init-tables';

export default function FixedBlogPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState<{
    category?: string;
    tag?: string;
    search?: string;
  }>({});
  const [tablesExist, setTablesExist] = useState<boolean | null>(null);
  const [missingTables, setMissingTables] = useState<string[]>([]);

  // Parse URL search params on initial load
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    
    setCurrentPage(parseInt(params.get('page') || '1'));
    setSearchParams({
      category: params.get('category') || undefined,
      tag: params.get('tag') || undefined,
      search: params.get('search') || undefined,
    });
  }, []);

  // Check if blog tables exist
  useEffect(() => {
    async function checkTables() {
      try {
        const supabase = createClient();
        
        // Check if the main blog tables exist
        const { data: tablesData, error } = await supabase
          .from('pg_catalog.pg_tables')
          .select('tablename')
          .eq('schemaname', 'public')
          .in('tablename', ['blog_posts', 'blog_categories', 'blog_tags', 'blog_post_tags']);
        
        if (error) {
          console.error('Error checking tables:', error);
          setError('Error checking for blog tables: ' + error.message);
          setLoading(false);
          setTablesExist(false);
          return;
        }
        
        // Check if all required tables exist
        const tableNames = new Set(tablesData?.map(t => t.tablename) || []);
        const requiredTables = ['blog_posts', 'blog_categories', 'blog_tags', 'blog_post_tags'];
        const missing = requiredTables.filter(table => !tableNames.has(table));
        
        setTablesExist(missing.length === 0);
        setMissingTables(missing);
        
        if (missing.length === 0) {
          await fetchBlogData();
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

  // Fetch blog data using the safer approach
  async function fetchBlogData() {
    try {
      const supabase = createClient();
      
      setLoading(true);
      setError(null);
      
      // Fetch blog posts
      const POSTS_PER_PAGE = 5;
      const from = (currentPage - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;
      
      let query = supabase
        .from('blog_posts')
        .select('*', { count: 'exact' });
      
      // Apply any filters
      if (searchParams.category) {
        // For simplicity, we'll need to query categories first to get the id
        const { data: categoryData } = await supabase
          .from('blog_categories')
          .select('id')
          .eq('slug', searchParams.category)
          .single();
          
        if (categoryData?.id) {
          query = query.eq('category_id', categoryData.id);
        }
      }
      
      if (searchParams.search) {
        query = query.or(`title.ilike.%${searchParams.search}%,excerpt.ilike.%${searchParams.search}%`);
      }
      
      // Apply pagination
      query = query
        .order('created_at', { ascending: false })
        .range(from, to);
      
      const { data: postsData, count, error: postsError } = await query;
      
      if (postsError) {
        throw new Error('Error fetching posts: ' + postsError.message);
      }
      
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');
        
      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
      }
      
      // Fetch tags
      const { data: tagsData, error: tagsError } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name');
        
      if (tagsError) {
        console.error('Error fetching tags:', tagsError);
      }
      
      // Update state
      setPosts(postsData || []);
      setCategories(categoriesData || []);
      setTags(tagsData || []);
      
      // Calculate pagination
      const totalCount = count || 0;
      setTotalPages(Math.ceil(totalCount / POSTS_PER_PAGE));
      
    } catch (err) {
      console.error('Error fetching blog data:', err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  // Create page URL for pagination
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (searchParams.category) params.set('category', searchParams.category);
    if (searchParams.tag) params.set('tag', searchParams.tag);
    if (searchParams.search) params.set('search', searchParams.search);
    return `?${params.toString()}`;
  };

  // If tables don't exist, show initialization UI
  if (tablesExist === false) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Our Blog
        </h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Blog System Setup</h2>
          <p className="text-blue-700 mb-4">
            It looks like the blog system tables don't exist yet. You need to initialize the blog system.
          </p>
          
          <div className="bg-white p-4 rounded-md border border-blue-100 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">Setup Instructions:</h3>
            <ol className="list-decimal ml-5 text-blue-800 space-y-2">
              <li>Go to your Supabase dashboard and open the SQL Editor</li>
              <li>Create the <code className="bg-blue-50 px-1">execute_sql</code> function (see below)</li>
              <li>Return here and click the "Initialize Blog System" button</li>
              <li>Refresh this page after initialization completes</li>
            </ol>
            
            <div className="mt-4">
              <details>
                <summary className="cursor-pointer font-medium text-blue-700 hover:text-blue-900">
                  View SQL for execute_sql function
                </summary>
                <pre className="mt-2 p-2 bg-gray-50 text-gray-800 rounded text-xs overflow-auto whitespace-pre-wrap">
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
              </details>
            </div>
          </div>
          
          <InitBlogTables />
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-sm text-blue-600">
              If you're experiencing issues, you can <Link href="/blog/test" className="underline font-medium">test your Supabase connection</Link>.
            </p>
            
            {missingTables.length > 0 && (
              <p className="text-sm text-blue-600 mt-2">
                Missing tables: {missingTables.join(', ')}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-600 mt-2">
                Error: {error}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Our Blog
        </h1>
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading blog content...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Our Blog
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-md p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-3">Error Loading Blog</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => fetchBlogData()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show the blog page with posts
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Our Blog
      </h1>
      
      <div className="mb-8">
        <TempBlogSearch initialValue={searchParams.search} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with filters */}
        <div className="lg:col-span-1 order-last lg:order-first">
          <TempBlogSidebar>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <TempBlogCategoriesFilter 
              categories={categories} 
              currentCategory={searchParams.category} 
            />
            
            <h3 className="text-lg font-semibold mb-4 mt-8">Tags</h3>
            <TempBlogTagsFilter 
              tags={tags} 
              currentTag={searchParams.tag} 
            />
          </TempBlogSidebar>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <TempBlogPostsGrid posts={posts} />
          
          {totalPages > 1 && (
            <div className="mt-12">
              <TempBlogPagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                createPageUrl={createPageUrl} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 