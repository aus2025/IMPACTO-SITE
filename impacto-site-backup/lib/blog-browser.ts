import { createPagesBrowserClient } from '@/utils/supabase/pages-browser';
import { 
  BlogPost, 
  BlogCategory, 
  BlogTag, 
  BlogPostFilters, 
  PaginatedBlogPosts,
  BlogPostInput,
  BlogPostUpdate
} from '@/types/blog';

// Default pagination values
const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_PAGE = 1;

/**
 * Get a paginated list of published blog posts
 */
export async function getBlogPosts(filters: BlogPostFilters = {}): Promise<PaginatedBlogPosts> {
  const supabase = createPagesBrowserClient();
  const {
    page = DEFAULT_PAGE,
    perPage = DEFAULT_PAGE_SIZE,
    category,
    tag,
    search,
    status = 'published',
    authorId
  } = filters;
  
  // Calculate pagination
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  
  // Start building the query
  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(*),
      tags:blog_post_tags(tag:blog_tags(*))
    `, { count: 'exact' });
  
  // Apply filters
  if (status) {
    query = query.eq('status', status);
  }
  
  if (status === 'published') {
    query = query.lte('published_at', new Date().toISOString());
  }
  
  if (authorId) {
    query = query.eq('author_id', authorId);
  }
  
  if (category) {
    query = query.eq('blog_categories.slug', category);
  }
  
  if (tag) {
    query = query.eq('blog_post_tags.blog_tags.slug', tag);
  }
  
  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
  }
  
  // Apply pagination and ordering
  query = query
    .order('published_at', { ascending: false })
    .range(from, to);
  
  // Execute the query
  const { data: posts, count, error } = await query;
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
  
  // Process the response to format the nested tags array
  const formattedPosts = posts?.map(post => {
    // Extract tags from the nested structure
    const tags = post.tags
      ? post.tags.map((tagItem: any) => tagItem.tag)
      : [];
    
    // Return the post with a clean tags array
    return {
      ...post,
      tags
    };
  }) || [];
  
  // Calculate total pages
  const totalCount = count || 0;
  const totalPages = Math.ceil(totalCount / perPage);
  
  return {
    posts: formattedPosts as BlogPost[],
    page,
    perPage,
    totalCount,
    totalPages
  };
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createPagesBrowserClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(*),
      tags:blog_post_tags(tag:blog_tags(*))
    `)
    .eq('slug', slug)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching blog post:', error);
    throw new Error('Failed to fetch blog post');
  }
  
  if (!data) return null;
  
  // Format the tags array
  const tags = data.tags
    ? data.tags.map((tagItem: any) => tagItem.tag)
    : [];
  
  return {
    ...data,
    tags
  } as BlogPost;
}

/**
 * Increment the view count for a blog post
 */
export async function incrementBlogPostViewCount(id: number): Promise<void> {
  const supabase = createPagesBrowserClient();
  
  const { error } = await supabase.rpc('increment_blog_post_view_count', { post_id: id });
  
  if (error) {
    console.error('Error incrementing view count:', error);
    // Don't throw, this is not a critical operation
  }
}

/**
 * Get all blog categories
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  const supabase = createPagesBrowserClient();
  
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching blog categories:', error);
    throw new Error('Failed to fetch blog categories');
  }
  
  return data as BlogCategory[];
}

/**
 * Get all blog tags
 */
export async function getBlogTags(): Promise<BlogTag[]> {
  const supabase = createPagesBrowserClient();
  
  const { data, error } = await supabase
    .from('blog_tags')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching blog tags:', error);
    throw new Error('Failed to fetch blog tags');
  }
  
  return data as BlogTag[];
}

/**
 * Get related posts
 */
export async function getRelatedPosts(
  postId: number,
  categoryId?: number | null,
  tagIds: number[] = [],
  limit: number = 3
): Promise<BlogPost[]> {
  const supabase = createPagesBrowserClient();
  
  // If we don't have category or tags, we can't find related posts
  if (!categoryId && tagIds.length === 0) {
    return [];
  }
  
  // Start building the query for related posts
  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(*),
      tags:blog_post_tags(tag:blog_tags(*))
    `)
    .neq('id', postId) // Exclude the current post
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString());
  
  if (categoryId) {
    // First try to find posts in the same category
    query = query.eq('category_id', categoryId);
  } else if (tagIds.length > 0) {
    // If no category, try to find posts with the same tags
    // This is complex in Supabase, so we'll get posts and filter locally
  }
  
  // Get the posts
  const { data: posts, error } = await query.limit(limit * 2); // Get more than needed for filtering
  
  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
  
  // Process and filter posts
  let relatedPosts = posts || [];
  
  // Format the posts to have clean tags arrays
  relatedPosts = relatedPosts.map(post => ({
    ...post,
    tags: post.tags ? post.tags.map((tagItem: any) => tagItem.tag) : []
  })) as BlogPost[];
  
  // If we have tag IDs and we need more posts, filter by matching tags
  if (tagIds.length > 0 && (!categoryId || relatedPosts.length < limit)) {
    // Sort by number of matching tags
    relatedPosts.sort((a, b) => {
      const aMatches = a.tags?.filter(tag => tagIds.includes(tag.id)).length || 0;
      const bMatches = b.tags?.filter(tag => tagIds.includes(tag.id)).length || 0;
      return bMatches - aMatches;
    });
  }
  
  // Return only the requested number of posts
  return relatedPosts.slice(0, limit) as BlogPost[];
}

// Get recent posts
export async function getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
  const supabase = createPagesBrowserClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(*),
      tags:blog_post_tags(tag:blog_tags(*))
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching recent posts:', error);
    throw new Error('Failed to fetch recent posts');
  }
  
  // Process the posts to format the nested tags array
  return data.map(post => {
    // Extract tags from the nested structure
    const tags = post.tags
      ? post.tags.map((tagItem: any) => tagItem.tag)
      : [];
    
    return {
      ...post,
      tags
    } as BlogPost;
  });
} 