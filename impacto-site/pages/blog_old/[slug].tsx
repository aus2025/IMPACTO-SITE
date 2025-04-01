import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { getBlogPostBySlug, incrementBlogPostViewCount, getRelatedPosts } from '@/lib/blog-browser';
import { BlogPost } from '@/types/blog';
import { GetServerSideProps } from 'next';
import { createPagesServerClient } from '@/utils/supabase/pages-client';
import { createPagesBrowserClient } from '@/utils/supabase/pages-browser';
import { BlogPost, BlogCategory } from '@/types/blog';
import { formatDate } from '@/lib/utils';

// Import components
import BlogContent from '@/app/blog/components/BlogContent';
import BlogMeta from '@/app/blog/components/BlogMeta';
import BlogRelatedPosts from '@/app/blog/components/BlogRelatedPosts';
import BlogBackButton from '@/app/blog/components/BlogBackButton';
import BlogSocialShare from '@/app/blog/components/BlogSocialShare';
import BlogSidebar from '@/app/blog/components/BlogSidebar';

// Blog post page component
export default function BlogPostPage({ 
  post, 
  relatedPosts 
}: { 
  post: BlogPost; 
  relatedPosts: BlogPost[];
}) {
  const router = useRouter();

  // Handle view count increment
  useEffect(() => {
    if (post?.id) {
      // Use the browser client to increment view count
      const supabase = createPagesBrowserClient();
      supabase.rpc('increment_blog_post_view_count', { post_id: post.id })
        .catch(err => console.error('Error incrementing view count:', err));
    }
  }, [post?.id]);

  // Calculate read time based on word count
  const readTime = post ? Math.ceil((post.content?.match(/\w+/g)?.length || 0) / 200) : 0;
  
  // Format the published date
  const publishedDate = post?.published_at 
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;
  
  // Page URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const url = `${baseUrl}/blog/${post.slug}`;
  
  // Loading state
  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
          <div className="h-10 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded mb-6 w-1/2"></div>
          <div className="h-40 bg-gray-200 rounded mb-6"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>{post.meta_title || `${post.title} | Impacto Blog`}</title>
        <meta 
          name="description" 
          content={post.meta_description || post.excerpt || 'Read this article from Impacto'} 
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta 
          property="og:description" 
          content={post.meta_description || post.excerpt || 'Read this article from Impacto'} 
        />
        {post.featured_image && (
          <meta property="og:image" content={post.featured_image} />
        )}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={post.meta_title || post.title} />
        <meta 
          property="twitter:description" 
          content={post.meta_description || post.excerpt || 'Read this article from Impacto'} 
        />
        {post.featured_image && (
          <meta property="twitter:image" content={post.featured_image} />
        )}
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt || '',
              image: post.featured_image ? [post.featured_image] : [],
              datePublished: post.published_at || post.created_at,
              dateModified: post.updated_at,
              author: {
                '@type': 'Person',
                name: post.author?.full_name || 'Impacto Team'
              },
              publisher: {
                '@type': 'Organization',
                name: 'Impacto',
                logo: {
                  '@type': 'ImageObject',
                  url: '/logo.png'
                }
              }
            })
          }}
        />
      </Head>
      
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogBackButton />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            {post.featured_image && (
              <div className="w-full h-96 relative mb-8 rounded-xl overflow-hidden">
                <img 
                  src={post.featured_image} 
                  alt={post.title} 
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <BlogMeta 
              publishedDate={publishedDate}
              category={post.category}
              tags={post.tags}
              readTime={readTime}
            />
            
            {post.excerpt && (
              <div className="mt-6 text-xl text-gray-500 font-light leading-relaxed">
                {post.excerpt}
              </div>
            )}
            
            <div className="mt-8">
              <BlogContent content={post.content || ''} />
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link
                      key={tag.id}
                      href={`/blog?tag=${tag.slug}`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 order-last">
            <BlogSidebar>
              {/* Social sharing buttons */}
              <div className="mb-8">
                <BlogSocialShare 
                  title={post.title} 
                  url={url} 
                />
              </div>
              
              {/* Author information if available */}
              {post.author && post.author.full_name && (
                <div className="mb-8 bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">About the Author</h3>
                  <div className="flex items-center">
                    {post.author.avatar_url && (
                      <div className="mr-3">
                        <img 
                          src={post.author.avatar_url} 
                          alt={post.author.full_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{post.author.full_name}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {post.category && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Category</h3>
                  <Link 
                    href={`/blog?category=${post.category.slug}`}
                    className="bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-200 transition"
                  >
                    {post.category.name}
                  </Link>
                </div>
              )}
            </BlogSidebar>
          </div>
        </div>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <BlogRelatedPosts posts={relatedPosts} />
          </div>
        )}
      </article>
    </>
  );
}

// Server-side props
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};
  
  if (typeof slug !== 'string') {
    return { notFound: true };
  }
  
  // Use the Pages Router compatible Supabase client
  const supabase = createPagesServerClient(context);
  
  try {
    // Fetch the blog post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        tags:blog_post_tags(tag:blog_tags(*))
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .single();
    
    if (postError || !post) {
      return { notFound: true };
    }
    
    // Format tags
    const formattedTags = post.tags
      ? post.tags.map((tagItem: any) => tagItem.tag)
      : [];
    
    const formattedPost = {
      ...post,
      tags: formattedTags
    };
    
    // Fetch related posts
    const { data: relatedPosts, error: relatedError } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        tags:blog_post_tags(tag:blog_tags(*))
      `)
      .eq('status', 'published')
      .neq('id', post.id)
      .eq('category_id', post.category_id)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(3);
    
    const formattedRelatedPosts = relatedPosts
      ? relatedPosts.map(relatedPost => {
          const tags = relatedPost.tags
            ? relatedPost.tags.map((tagItem: any) => tagItem.tag)
            : [];
          
          return {
            ...relatedPost,
            tags
          };
        })
      : [];
    
    return {
      props: {
        post: formattedPost,
        relatedPosts: formattedRelatedPosts
      }
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return { notFound: true };
  }
}; 