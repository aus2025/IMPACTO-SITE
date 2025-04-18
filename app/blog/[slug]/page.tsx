import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog-service';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaCalendarAlt, FaUser, FaClock, FaTags } from 'react-icons/fa';
import { Newsletter } from '../components/Newsletter';
import BlogImage from '../components/BlogImage';

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }
    
    return {
      title: `${post.title} | Impacto Blog`,
      description: post.excerpt || 'Impacto Blog',
      openGraph: {
        title: post.title,
        description: post.excerpt || 'Impacto Blog',
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
      },
    };
  } catch (error) {
    console.error(`Error generating metadata for blog post: ${params.slug}`, error);
    // Provide fallback metadata
    return {
      title: 'Impacto Blog',
      description: 'Explore our blog articles on automation and AI',
    };
  }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for blog posts:', error);
    return []; // Return empty array in case of error
  }
}

// Function to get blog image source
function getBlogImageSrc(slug: string) {
  try {
    // Extract the blog number from the slug (e.g., "blog-1-title" => "1")
    const match = slug.match(/^blog-(\d+)/);
    if (match && match[1]) {
      return `/images/blog/blog-${match[1]}.svg`;
    }
  } catch (error) {
    console.error(`Error getting blog image for ${slug}:`, error);
  }
  return '/images/blog/default.svg';
}

// Server component that can use async/await directly
export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  try {
    // Validate slug parameter
    if (!params?.slug) {
      console.error('Blog post page called with empty slug');
      notFound();
    }
    
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      console.error(`Blog post not found: ${params.slug}`);
      notFound();
    }
    
    // Safely get related posts with fallback to empty array
    let relatedPosts = [];
    try {
      relatedPosts = await getRelatedPosts(params.slug, 3);
    } catch (error) {
      console.error(`Error fetching related posts for ${params.slug}:`, error);
      // Continue with empty related posts
    }
    
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Hero section with post title */}
        <section className="py-24 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <Link 
                  href="/blog" 
                  className="text-blue-200 hover:text-white transition-colors duration-200"
                >
                  Blog
                </Link>
                <span className="mx-2">›</span>
                {post.category && (
                  <>
                    <Link 
                      href={`/blog?category=${encodeURIComponent(post.category.toLowerCase())}`}
                      className="text-blue-200 hover:text-white transition-colors duration-200"
                    >
                      {post.category}
                    </Link>
                    <span className="mx-2">›</span>
                  </>
                )}
                <span className="text-white line-clamp-1">{post.title}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-blue-100 text-sm md:text-base gap-4 md:gap-6">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>{post.formattedDate}</span>
                </div>
                
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  <span>{post.author}</span>
                </div>
                
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article content */}
            <article className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 md:p-8">
              {/* Featured image */}
              <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <BlogImage 
                  src={getBlogImageSrc(post.slug)}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 800px"
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Article content */}
              <div 
                className="prose prose-lg max-w-none 
                  prose-headings:font-bold 
                  prose-h1:text-3xl prose-h1:text-blue-900 prose-h1:mb-6 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
                  prose-h2:text-2xl prose-h2:text-blue-800 prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:text-blue-700 prose-h3:mt-6 prose-h3:mb-3
                  prose-a:text-blue-600 
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-li:text-gray-700 
                  prose-strong:text-gray-800
                  prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-md
                  prose-img:rounded-lg prose-img:shadow-md
                  prose-ul:my-4 prose-ol:my-4 prose-li:ml-4
                  prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-hr:my-8 prose-hr:border-gray-200"
                dangerouslySetInnerHTML={{ __html: post.htmlContent || '<p>Content unavailable</p>' }}
              />
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-6 border-t border-gray-200">
                  <div className="flex items-center flex-wrap gap-2">
                    <FaTags className="text-gray-500 mr-2" />
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* CTA */}
              <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-100 text-center">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Ready to transform your business?</h3>
                <p className="text-blue-700 mb-4">
                  Discover how Impacto's automation solutions can help your organization
                  thrive in the digital era.
                </p>
                <Link
                  href="/services"
                  className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Automate Now!
                </Link>
              </div>
            </article>
            
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Author info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-center mb-4">
                  <Image 
                    src="/images/impacto-logo-small.svg" 
                    alt="Impacto Automation"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">{post.author}</span>
                    <p className="text-sm text-gray-600">Automation Expert</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Our team of automation specialists brings decades of combined experience in 
                  implementing cutting-edge solutions for businesses of all sizes.
                </p>
              </div>
              
              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.slug} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <Link 
                          href={`/blog/${relatedPost.slug}`}
                          className="block"
                        >
                          <h4 className="font-semibold text-blue-700 hover:text-blue-800 line-clamp-2 mb-1">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Newsletter signup */}
              <Newsletter />
            </aside>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error(`Error rendering blog post page for slug ${params?.slug}:`, error);
    
    // Generic error UI for production
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sorry, we couldn't load this blog post
            </h1>
            <p className="text-gray-600 mb-6">
              There was a problem loading this content. Please try again later or browse our other articles.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Return to Blog
            </Link>
          </div>
        </div>
      </main>
    );
  }
} 