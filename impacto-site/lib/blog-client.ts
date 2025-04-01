import { createBrowserClient } from '@supabase/ssr'
import { 
  BlogPost, 
  BlogCategory, 
  BlogTag, 
  BlogPostFilters, 
  PaginatedBlogPosts,
  BlogPostInput,
  BlogPostUpdate
} from '@/types/blog';

function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Get blog posts with pagination and filtering for client components
 */
export async function getBlogPosts(filters: BlogPostFilters = {}): Promise<PaginatedBlogPosts> {
  try {
    const { page = 1, perPage = 5, search, category, tag, status, authorId, excludeId } = filters;
    
    const supabase = createClient();
    
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
      .order('published_at', { ascending: false, nullsLast: true })
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
    };
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return {
      posts: [],
      totalCount: 0,
      totalPages: 0,
      page: 1,
    };
  }
}

/**
 * Get a blog post by ID for client components
 */
export async function getBlogPostById(id: number | string): Promise<BlogPost | null> {
  try {
    const supabase = createClient();
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
 * Get blog categories for client components
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const supabase = createClient();
    
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
 * Get blog tags for client components
 */
export async function getBlogTags(): Promise<BlogTag[]> {
  try {
    const supabase = createClient();
    
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

/**
 * Create a new blog post for client components
 */
export async function createBlogPost(postData: BlogPostInput, selectedTags?: string[]): Promise<number | null> {
  try {
    const supabase = createClient();
    
    // Create the blog post
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select('id')
      .single();
    
    if (error) {
      console.error('Error creating blog post:', error);
      return null;
    }
    
    // Add tags if provided
    if (selectedTags && selectedTags.length > 0 && data.id) {
      const tagRelations = selectedTags.map(tagId => ({
        post_id: data.id,
        tag_id: tagId
      }));
      
      const { error: tagError } = await supabase
        .from('blog_post_tags')
        .insert(tagRelations);
      
      if (tagError) {
        console.error('Error adding tags to post:', tagError);
        // We'll still return the post ID even if tag insertion fails
      }
    }
    
    return data.id;
  } catch (error) {
    console.error('Error in createBlogPost:', error);
    return null;
  }
}

/**
 * Update an existing blog post for client components
 */
export async function updateBlogPost(
  id: number, 
  postData: BlogPostUpdate, 
  selectedTags?: string[]
): Promise<void> {
  try {
    const supabase = createClient();
    
    // Update the post
    const { error } = await supabase
      .from('blog_posts')
      .update(postData)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating blog post:', error);
      throw new Error('Failed to update blog post');
    }
    
    // If tags were provided, update the post's tags
    if (selectedTags !== undefined) {
      // First, remove all existing tags
      const { error: deleteError } = await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', id);
      
      if (deleteError) {
        console.error('Error removing existing tags:', deleteError);
        // Don't throw, continue with adding new tags
      }
      
      // Then, add the new tags
      if (selectedTags.length > 0) {
        const postTags = selectedTags.map(tagId => ({
          post_id: id,
          tag_id: tagId
        }));
        
        const { error: tagError } = await supabase
          .from('blog_post_tags')
          .insert(postTags);
        
        if (tagError) {
          console.error('Error associating tags with post:', tagError);
          // Don't throw, the post was updated successfully
        }
      }
    }
  } catch (error) {
    console.error('Error in updateBlogPost:', error);
    throw error;
  }
} 