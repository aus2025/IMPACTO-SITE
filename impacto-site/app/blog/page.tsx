import { Suspense } from 'react';
import { filterPosts, getAllCategories, getAllTags } from '@/lib/static-blog';
import BlogSearch from './components/BlogSearch';
import BlogSidebar from './components/BlogSidebar';
import BlogPagination from './components/BlogPagination';
import BlogCategoriesFilter from './components/BlogCategoriesFilter';
import BlogTagsFilter from './components/BlogTagsFilter';
import Loading from './loading';
import { Metadata } from 'next';
import Link from 'next/link';
import BlogImage from './components/BlogImage';
import Image from 'next/image';
import BlogContent from './components/BlogContent';

export const metadata: Metadata = {
  title: 'Blog | Impacto - Business Automation Solutions',
  description: 'Explore the latest articles and insights on business automation, process optimization, and digital transformation.',
};

// Default number of posts per page
const POSTS_PER_PAGE = 6;

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
  // Get current page number from the URL, or default to 1
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  const category = searchParams?.category;
  const tag = searchParams?.tag;
  const search = searchParams?.search;
  
  // Get posts with filters and pagination
  const { posts, totalCount, totalPages } = await filterPosts({
    page: currentPage,
    perPage: POSTS_PER_PAGE,
    category,
    tag,
    search,
  });

  // Get categories and tags for filtering
  const categories = await getAllCategories();
  const tags = await getAllTags();

  // Create URLs for pagination and filters
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (searchParams?.category) params.set('category', searchParams.category);
    if (searchParams?.tag) params.set('tag', searchParams.tag);
    if (searchParams?.search) params.set('search', searchParams.search);
    return `?${params.toString()}`;
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
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
          <BlogSearch initialValue={search} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters - now hidden */}
          <div className="lg:col-span-1 order-last lg:order-first hidden">
            <BlogSidebar>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <BlogCategoriesFilter 
                categories={categories.map(cat => ({ name: cat, slug: cat.toLowerCase() }))} 
                currentCategory={category} 
              />
              
              <h3 className="text-lg font-semibold mb-4 mt-8">Tags</h3>
              <BlogTagsFilter 
                tags={tags.map(tag => ({ name: tag, slug: tag.toLowerCase() }))} 
                currentTag={tag} 
              />
            </BlogSidebar>
          </div>

          {/* Main content - expanded to full width */}
          <div className="lg:col-span-4">
            <Suspense fallback={<Loading />}>
              <BlogContent 
                posts={posts} 
                totalPages={totalPages} 
                currentPage={currentPage}
                pageBaseUrl="/blog"
                categoryParam={category}
                tagParam={tag}
                searchParam={search}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
} 