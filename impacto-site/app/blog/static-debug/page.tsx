import { createClient } from '@/utils/supabase/server';

// Add dynamic flag for server components that need dynamic rendering
export const dynamic = 'force-dynamic';

export default async function StaticDebugPage() {
  const supabase = createClient();
  
  // Try to get simple info about the blog_posts table
  let postsInfo = null;
  let postsError = null;
  let simpleQuery = null;
  let queryError = null;
  
  try {
    // Simple query to check if blog_posts exists and what's in it
    const { data, error, count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .limit(5);
      
    if (error) {
      queryError = error;
    } else {
      simpleQuery = {
        count,
        data
      };
    }
  } catch (err: any) {
    queryError = err;
  }
  
  // Get full details about blog tables to analyze structure
  let blogTables = null;
  let tablesError = null;
  
  try {
    const { data, error } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
      .ilike('tablename', 'blog%');
      
    if (error) {
      tablesError = error;
    } else {
      blogTables = data;
    }
  } catch (err: any) {
    tablesError = err;
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog System Diagnostic</h1>
      
      <p className="mb-4">This page runs simple server-side queries to diagnose issues with your blog system.</p>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Blog Tables Check</h2>
        {tablesError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error checking blog tables:</p>
            <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(tablesError, null, 2)}</pre>
          </div>
        ) : (
          <div>
            <p className="mb-2">Found {blogTables?.length || 0} blog-related tables:</p>
            <div className="bg-gray-100 p-4 rounded">
              <pre>{JSON.stringify(blogTables, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Blog Posts Query Test</h2>
        {queryError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error querying blog posts:</p>
            <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(queryError, null, 2)}</pre>
          </div>
        ) : (
          <div>
            <p className="mb-2">Successfully queried blog_posts. Found {simpleQuery?.count || 0} posts:</p>
            <div className="bg-gray-100 p-4 rounded">
              <pre>{JSON.stringify(simpleQuery?.data, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-4 mt-6">
        <a href="/blog" className="cta-button-global">
          Return to Blog
        </a>
        <a href="/blog/direct-fix" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Go to Fix Page
        </a>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Static Blog Diagnostics | Impacto ONG',
  description: 'Server-side diagnostics for blog system',
}; 