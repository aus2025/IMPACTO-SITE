import { createClient } from '@/utils/supabase/server-app';
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
 * Update an existing blog post
 */
export async function updateBlogPost(
  id: number, 
  postData: BlogPostUpdate, 
  selectedTags?: string[]
): Promise<void> {
  const supabase = await createClient();
  
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
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(id: number): Promise<void> {
  const supabase = await createClient();
  
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
  const { data: slugData, error: slugError } = await supabase
    .rpc('generate_slug', { title: name });
  
  let slug = '';
  if (slugError) {
    console.error('Error generating slug:', slugError);
    // Fallback to a client-side slug generation
    slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  } else {
    slug = slugData;
  }
  
  const { data, error } = await supabase
    .from('blog_categories')
    .insert([{ name, slug, description }])
    .select()
    .single();
  
  if (error) {
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
  const { data: slugData, error: slugError } = await supabase
    .rpc('generate_slug', { title: name });
  
  let slug = '';
  if (slugError) {
    console.error('Error generating slug:', slugError);
    // Fallback to a client-side slug generation
    slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  } else {
    slug = slugData;
  }
  
  const { data, error } = await supabase
    .from('blog_tags')
    .insert([{ name, slug }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating tag:', error);
    throw new Error('Failed to create tag');
  }
  
  return data as BlogTag;
}

/**
 * Get recent posts for sidebar or featured sections
 */
export async function getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image,
      published_at,
      category:blog_categories(id, name, slug)
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching recent posts:', error);
    throw new Error('Failed to fetch recent posts');
  }
  
  return data as BlogPost[];
}

/**
 * Get related posts based on category and tags
 */
export async function getRelatedPosts(postId: number, categoryId?: number, tagIds: number[] = [], limit: number = 3): Promise<BlogPost[]> {
  const supabase = await createClient();
  
  let query = supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image,
      published_at,
      category:blog_categories(id, name, slug)
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .neq('id', postId)
    .limit(limit);
  
  // If we have a category ID, prioritize posts from the same category
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  // Execute the query
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching related posts:', error);
    throw new Error('Failed to fetch related posts');
  }
  
  // If we don't have enough results and we have tag IDs, get more posts based on tags
  if (data.length < limit && tagIds.length > 0) {
    const neededPosts = limit - data.length;
    
    const tagQuery = supabase
      .from('blog_post_tags')
      .select(`
        post:blog_posts(
          id,
          title,
          slug,
          excerpt,
          featured_image,
          published_at,
          category:blog_categories(id, name, slug)
        )
      `)
      .in('tag_id', tagIds)
      .eq('post.status', 'published')
      .lte('post.published_at', new Date().toISOString())
      .neq('post.id', postId);
    
    // Exclude posts we already have
    if (data.length > 0) {
      const existingIds = data.map(p => p.id);
      tagQuery.not('post.id', 'in', `(${existingIds.join(',')})`);
    }
    
    // If we have a category, exclude posts from this category (since we already queried them)
    if (categoryId) {
      tagQuery.neq('post.category_id', categoryId);
    }
    
    const { data: tagData, error: tagError } = await tagQuery.limit(neededPosts);
    
    if (tagError) {
      console.error('Error fetching tag-related posts:', tagError);
      // Don't throw, return what we have
    } else if (tagData && tagData.length > 0) {
      // Extract posts from the nested structure and add to our results
      const tagPosts = tagData
        .map(item => item.post)
        .filter((post): post is BlogPost => post !== null);
      
      data.push(...tagPosts);
    }
  }
  
  return data as BlogPost[];
}

/**
 * Get a blog post by ID
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