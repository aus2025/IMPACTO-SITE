import { createClient } from '@/utils/supabase/server';
import { 
  BlogPost, 
  BlogCategory,
  BlogTag,
  BlogPostInput,
  BlogPostUpdate,
  BlogPostFilters,
  PaginatedBlogPosts,
} from '@/types/blog';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get blog posts with pagination and filtering for pages router
 */
export async function getBlogPosts(filters: BlogPostFilters = {}, req?: NextApiRequest, res?: NextApiResponse): Promise<PaginatedBlogPosts> {
  try {
    const { page = 1, perPage = 5, search, category, tag, status, authorId } = filters;
    const excludeId = (filters as any).excludeId; // Type-safe access to optional property
    
    const supabase = await createClient(req, res);
    
    // Build the query
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        tags:blog_post_tags(
          tag:blog_tags(*)
        ),
        author:profiles(*)
      `, { count: 'exact' });
    
    // Apply filters
    if (status) {
      query = query.eq('status', status);
    } else {
      // If no status specified, default to published posts only
      query = query.eq('status', 'published');
    }
    
    if (authorId) {
      query = query.eq('author_id', authorId);
    }
    
    if (category) {
      query = query.eq('category_id', category);
    }
    
    if (excludeId) {
      query = query.neq('id', excludeId);
    }
    
    if (tag) {
      query = query.eq('blog_post_tags.tag_id', tag);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }
    
    // Add pagination
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    
    query = query
      .order('published_at', { ascending: false })
      .range(from, to);
    
    // Execute the query
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return {
        posts: [],
        totalCount: 0,
        totalPages: 0,
        page: 1,
        perPage
      };
    }
    
    // Format the tags array for easier use
    const formattedPosts = data.map(post => {
      // Extract tags from the nested structure
      const formattedTags = post.tags?.map((tagItem: any) => tagItem.tag) || [];
      
      return {
        ...post,
        tags: formattedTags,
      };
    });
    
    // Calculate total pages
    const totalPages = count ? Math.ceil(count / perPage) : 0;
    
    return {
      posts: formattedPosts as BlogPost[],
      totalCount: count || 0,
      totalPages,
      page,
      perPage
    };
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return {
      posts: [],
      totalCount: 0,
      totalPages: 0,
      page: 1,
      perPage: 5
    };
  }
}

/**
 * Get a blog post by ID
 */
export async function getBlogPostById(
  id: number | string,
  req?: NextApiRequest, 
  res?: NextApiResponse
): Promise<BlogPost | null> {
  try {
    const supabase = await createClient(req, res);
    const postId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    if (isNaN(postId)) {
      console.error('Invalid post ID:', id);
      return null;
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*),
        tags:blog_post_tags(
          tag:blog_tags(*)
        ),
        author:profiles(*)
      `)
      .eq('id', postId)
      .single();
    
    if (error) {
      console.error('Error fetching blog post by ID:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    // Format tags array for consistency with getBlogPosts
    const formattedTags = data.tags.map((tagItem: any) => tagItem.tag);
    
    return {
      ...data,
      tags: formattedTags
    } as BlogPost;
  } catch (error) {
    console.error('Error in getBlogPostById:', error);
    return null;
  }
}

/**
 * Get blog categories
 */
export async function getBlogCategories(
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<BlogCategory[]> {
  try {
    const supabase = await createClient(req, res);
    
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching blog categories:', error);
      return [];
    }
    
    return data as BlogCategory[];
  } catch (error) {
    console.error('Error in getBlogCategories:', error);
    return [];
  }
}

/**
 * Get blog tags
 */
export async function getBlogTags(
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<BlogTag[]> {
  try {
    const supabase = await createClient(req, res);
    
    const { data, error } = await supabase
      .from('blog_tags')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching blog tags:', error);
      return [];
    }
    
    return data as BlogTag[];
  } catch (error) {
    console.error('Error in getBlogTags:', error);
    return [];
  }
}

// Add other functions as needed for Pages Router 