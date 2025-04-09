import { createClient } from '@/utils/supabase/server';
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
  const supabase = await createClient();
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
    totalCount,
    page,
    perPage,
    totalPages
  };
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  
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
  const supabase = await createClient();
  
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
  const supabase = await createClient();
  
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
  const supabase = await createClient();
  
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
 * Create a new blog post
 */
export async function createBlogPost(postData: BlogPostInput): Promise<{ id: number; slug: string }> {
  const supabase = await createClient();
  
  // Generate a slug from the title if not provided
  let slug = '';
  
  // Generate a slug using the server-side function
  const { data: slugData, error: slugError } = await supabase
    .rpc('generate_slug', { title: postData.title });
  
  if (slugError) {
    console.error('Error generating slug:', slugError);
    // Fallback to a client-side slug generation
    slug = postData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  } else {
    slug = slugData;
  }
  
  // Extract tag IDs if any
  const { tagIds, ...postDataWithoutTags } = postData;
  
  // Insert the post
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{ ...postDataWithoutTags, slug }])
    .select('id, slug')
    .single();
  
  if (error) {
    console.error('Error creating blog post:', error);
    throw new Error('Failed to create blog post');
  }
  
  // If tags were provided, associate them with the post
  if (tagIds && tagIds.length > 0 && data?.id) {
    const postTags = tagIds.map(tagId => ({
      post_id: data.id,
      tag_id: tagId
    }));
    
    const { error: tagError } = await supabase
      .from('blog_post_tags')
      .insert(postTags);
    
    if (tagError) {
      console.error('Error associating tags with post:', tagError);
      // Don't throw, the post was created successfully
    }
  }
  
  return data;
}

/**
 * Update an existing blog post
 */
export async function updateBlogPost(id: number, postData: BlogPostUpdate): Promise<void> {
  const supabase = await createClient();
  
  // Extract tag IDs if any
  const { tagIds, ...postDataWithoutTags } = postData;
  
  // Update the post
  const { error } = await supabase
    .from('blog_posts')
    .update(postDataWithoutTags)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating blog post:', error);
    throw new Error('Failed to update blog post');
  }
  
  // If tags were provided, update the post's tags
  if (tagIds !== undefined) {
    // First, remove all existing tag associations
    const { error: deleteError } = await supabase
      .from('blog_post_tags')
      .delete()
      .eq('post_id', id);
    
    if (deleteError) {
      console.error('Error removing existing tags:', deleteError);
      throw new Error('Failed to update blog post tags');
    }
    
    // Then, add the new tag associations
    if (tagIds.length > 0) {
      const postTags = tagIds.map(tagId => ({
        post_id: id,
        tag_id: tagId
      }));
      
      const { error: insertError } = await supabase
        .from('blog_post_tags')
        .insert(postTags);
      
      if (insertError) {
        console.error('Error associating new tags:', insertError);
        throw new Error('Failed to update blog post tags');
      }
    }
  }
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(id: number): Promise<void> {
  const supabase = await createClient();
  
  // Delete the post
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting blog post:', error);
    throw new Error('Failed to delete blog post');
  }
}

/**
 * Create a new category
 */
export async function createCategory(name: string, description?: string): Promise<BlogCategory> {
  const supabase = await createClient();
  
  // Generate a slug from the name
  const slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Insert the category
  const { data, error } = await supabase
    .from('blog_categories')
    .insert([
      { 
        name, 
        slug,
        description: description || '' 
      }
    ])
    .select()
    .single();
  
  if (error) {
    // Check if it's a duplicate slug error
    if (error.code === '23505') {
      throw new Error('A category with this name already exists');
    }
    
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
  }
  
  return data as BlogCategory;
}

/**
 * Create a new tag
 */
export async function createTag(name: string): Promise<BlogTag> {
  const supabase = await createClient();
  
  // Generate a slug from the name
  const slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Insert the tag
  const { data, error } = await supabase
    .from('blog_tags')
    .insert([
      { 
        name, 
        slug 
      }
    ])
    .select()
    .single();
  
  if (error) {
    // Check if it's a duplicate slug error
    if (error.code === '23505') {
      throw new Error('A tag with this name already exists');
    }
    
    console.error('Error creating tag:', error);
    throw new Error('Failed to create tag');
  }
  
  return data as BlogTag;
}

/**
 * Get recent posts
 */
export async function getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
  const supabase = await createClient();
  
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

/**
 * Get related posts for a specific post
 */
export async function getRelatedPosts(
  postId: number,
  categoryId?: number,
  tagIds: number[] = [],
  limit: number = 3
): Promise<BlogPost[]> {
  const supabase = await createClient();
  
  // Build the query
  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(*),
      tags:blog_post_tags(tag:blog_tags(*))
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .neq('id', postId)
    .order('published_at', { ascending: false })
    .limit(limit);
  
  // Add category filter if provided
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching related posts:', error);
    throw new Error('Failed to fetch related posts');
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