import { Suspense } from 'react';
import { getBlogPosts, getBlogCategories, getBlogTags } from '@/lib/blog';
import { BlogPostsGrid } from './components/BlogPostsGrid';
import BlogSearch from './components/BlogSearch';
import BlogSidebar from './components/BlogSidebar';
import BlogPagination from './components/BlogPagination';
import BlogCategoriesFilter from './components/BlogCategoriesFilter';
import BlogTagsFilter from './components/BlogTagsFilter';
import Loading from './loading';
import { Metadata } from 'next';
import InitBlogTables from './init-tables';
import Link from 'next/link';

// Add dynamic flag to indicate this route will be dynamically rendered
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | Impacto - Business Automation Solutions',
  description: 'Explore the latest articles and insights on business automation, process optimization, and digital transformation.',
};

// Default number of posts per page
const POSTS_PER_PAGE = 5;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { 
    page?: string; 
    category?: string; 
    tag?: string; 
    search?: string; 
  };
}) {
  // Setup empty structures for our data
  let postsData = { posts: [], totalCount: 0, totalPages: 0 };
  let categories = [];
  let tags = [];
  let hasError = false;
  let errorMessage = '';
  
  try {
    // Get current page number from the URL, or default to 1
    const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
    const category = searchParams?.category;
    const tag = searchParams?.tag;
    const search = searchParams?.search;
    
    // Try to get blog posts with pagination and filters
    postsData = await getBlogPosts({
      page: currentPage,
      perPage: POSTS_PER_PAGE,
      category,
      tag,
      search,
    });

    // Try to get categories and tags for filtering
    categories = await getBlogCategories();
    tags = await getBlogTags();
  } catch (error: any) {
    console.error('Error fetching blog data:', error);
    hasError = true;
    errorMessage = error.message || 'An error occurred fetching blog data';
    
    // Check if this is likely a database initialization issue
    if (
      error.message?.includes('does not exist') || 
      error.message?.includes('relation') ||
      error.message?.includes('undefined') ||
      error.message?.includes('blog_posts') ||
      error.message?.includes('42P01')  // PostgreSQL "table does not exist" error code
    ) {
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
            </div>
          </div>
        </div>
      );
    }
  }
  
  const { posts, totalCount, totalPages } = postsData;

  // Create URLs for pagination and filters
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (searchParams?.category) params.set('category', searchParams.category);
    if (searchParams?.tag) params.set('tag', searchParams.tag);
    if (searchParams?.search) params.set('search', searchParams.search);
    return `?${params.toString()}`;
  };

  // If we have an error but couldn't determine if it was a missing table
  if (hasError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Our Blog
        </h1>
        
        <div className="bg-red-50 border border-red-200 rounded-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-red-800 mb-3">Error Loading Blog</h2>
          <p className="text-red-700 mb-4">{errorMessage}</p>
          <p className="text-gray-600 mb-6">
            The blog system might not be properly initialized. Please check your Supabase database configuration.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/blog/test" 
              className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
            >
              Test Connection
            </Link>
            
            <div>
              <InitBlogTables />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-blue-700 text-white w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-xl mb-8">
              Explore the latest articles and insights on business automation, process 
              optimization, and digital transformation.
            </p>
          </div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <BlogSearch initialValue={searchParams?.search} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1 order-last lg:order-first">
            <BlogSidebar>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <BlogCategoriesFilter 
                categories={categories} 
                currentCategory={searchParams?.category} 
              />
              
              <h3 className="text-lg font-semibold mb-4 mt-8">Tags</h3>
              <BlogTagsFilter 
                tags={tags} 
                currentTag={searchParams?.tag} 
              />
            </BlogSidebar>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <Suspense fallback={<Loading />}>
              <BlogPostsGrid posts={posts} />
              
              {totalPages > 1 && (
                <div className="mt-12">
                  <BlogPagination 
                    currentPage={searchParams?.page ? parseInt(searchParams.page) : 1} 
                    totalPages={totalPages} 
                    createPageUrl={createPageUrl} 
                  />
                </div>
              )}
              
              {posts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-3">No posts found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
} 