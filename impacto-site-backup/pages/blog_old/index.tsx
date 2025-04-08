import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { getBlogPosts, getBlogCategories, getBlogTags } from '@/lib/blog-browser';
import { BlogPost, BlogCategory, BlogTag } from '@/types/blog';
import { GetServerSideProps } from 'next';
import { createPagesServerClient } from '@/utils/supabase/pages-client';
import { formatDate } from '@/lib/utils';

// Import components
import { BlogPostsGrid } from '@/app/blog/components/BlogPostsGrid';
import BlogSearch from '@/app/blog/components/BlogSearch';
import BlogSidebar from '@/app/blog/components/BlogSidebar';
import BlogPagination from '@/app/blog/components/BlogPagination';
import BlogCategoriesFilter from '@/app/blog/components/BlogCategoriesFilter';
import BlogTagsFilter from '@/app/blog/components/BlogTagsFilter';

// Default number of posts per page
const POSTS_PER_PAGE = 5;

export default function BlogPage({ 
  posts, 
  categories 
}: { 
  posts: BlogPost[]; 
  categories: BlogCategory[];
}) {
  const router = useRouter();
  const { page, category, tag, search } = router.query;
  
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadBlogData() {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get current page number from the URL, or default to 1
        const currentPage = page ? parseInt(page as string) : 1;
        
        // Get posts
        const postsData = await getBlogPosts({
          page: currentPage,
          perPage: POSTS_PER_PAGE,
          category: category as string,
          tag: tag as string,
          search: search as string,
        });
        
        setPosts(postsData.posts);
        setTotalPages(postsData.totalPages);
        setTotalCount(postsData.totalCount);
        
        // Get categories and tags
        const categoriesData = await getBlogCategories();
        const tagsData = await getBlogTags();
        
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (err) {
        console.error('Error loading blog data:', err);
        setError('Failed to load blog data');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadBlogData();
  }, [page, category, tag, search]);
  
  // Create URLs for pagination and filters
  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (pageNum > 1) params.set('page', pageNum.toString());
    if (category) params.set('category', category as string);
    if (tag) params.set('tag', tag as string);
    if (search) params.set('search', search as string);
    return `/blog?${params.toString()}`;
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Our Blog
        </h1>
        
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Our Blog
        </h1>
        
        <div className="bg-red-50 border border-red-200 rounded-md p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-3">Error Loading Blog</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <p className="text-gray-600 mb-6">
            The blog system might not be properly initialized. Please check your Supabase database configuration.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Blog | Impacto - Business Automation Solutions</title>
        <meta 
          name="description" 
          content="Explore the latest articles and insights on business automation, process optimization, and digital transformation." 
        />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Our Blog
        </h1>
        
        <div className="mb-8">
          <BlogSearch initialValue={search as string} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1 order-last lg:order-first">
            <BlogSidebar>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <BlogCategoriesFilter 
                categories={categories} 
                currentCategory={category as string} 
              />
              
              <h3 className="text-lg font-semibold mb-4 mt-8">Tags</h3>
              <BlogTagsFilter 
                tags={tags} 
                currentTag={tag as string} 
              />
            </BlogSidebar>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <BlogPostsGrid posts={posts} />
            
            {totalPages > 1 && (
              <div className="mt-12">
                <BlogPagination 
                  currentPage={page ? parseInt(page as string) : 1} 
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
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Use the Pages Router compatible Supabase client
  const supabase = createPagesServerClient(context);
  
  try {
    // Fetch published blog posts
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        tags:blog_post_tags(tag:blog_tags(*))
      `)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(10);
    
    if (postsError) throw postsError;
    
    // Fetch categories
    const { data: categories, error: categoriesError } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');
    
    if (categoriesError) throw categoriesError;
    
    // Process the posts to format the nested tags array
    const formattedPosts = posts.map(post => {
      // Extract tags from the nested structure
      const tags = post.tags
        ? post.tags.map((tagItem: any) => tagItem.tag)
        : [];
      
      return {
        ...post,
        tags
      };
    });
    
    return {
      props: {
        posts: formattedPosts,
        categories
      }
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return {
      props: {
        posts: [],
        categories: []
      }
    };
  }
}; 