import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/static-blog';
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
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | Impacto Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Function to get blog image source
function getBlogImageSrc(slug: string) {
  // Extract the blog number from the slug (e.g., "blog-1-title" => "1")
  const match = slug.match(/^blog-(\d+)/);
  if (match && match[1]) {
    return `/images/blog/blog-${match[1]}.svg`;
  }
  return '/images/blog/default.svg';
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = await getRelatedPosts(params.slug, 3);
  
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
              dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
            />
            
            {/* Tags */}
            {post.tags.length > 0 && (
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
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{post.author}</h4>
                  <p className="text-sm text-gray-600">Automation Expert</p>
                </div>
              </div>
              <p className="text-gray-700">
                Our team of experts brings years of experience in business process automation,
                AI implementation, and digital transformation strategy.
              </p>
            </div>
            
            {/* Newsletter signup */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <Newsletter />
            </div>
            
            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.slug} className="group">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-1">
                          {relatedPost.title}
                        </h4>
                      </Link>
                      <p className="text-sm text-gray-500">{relatedPost.formattedDate}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link 
                    href="/blog" 
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View all articles &rarr;
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
        
        {/* More Articles section */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">More Articles</h2>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-40 bg-gray-200">
                  <BlogImage 
                    src={getBlogImageSrc(post.slug)}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-blue-600 text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {post.formattedDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors duration-200">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {post.readingTime}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Read more &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 