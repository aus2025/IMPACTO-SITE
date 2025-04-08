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
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

/**
 * Get a paginated list of blog posts
 */
export async function getBlogPosts({
  page = DEFAULT_PAGE,
  perPage = DEFAULT_PAGE_SIZE,
  category,
  tag,
  status = 'published',
  authorId
}: BlogPostFilters = {}): Promise<PaginatedBlogPosts> {
  try {
    const supabase = await createClient();
    
    // Calculate pagination
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    
    // Build the query
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories(*),
        blog_tags:blog_post_tags(blog_tags(*))
      `, { count: 'exact' });
    
    // Apply filters
    if (status === 'published') {
      query = query.eq('status', 'published');
    } else if (status === 'draft') {
      query = query.eq('status', 'draft');
    } else if (status === 'archived') {
      query = query.eq('status', 'archived');
    }
    
    if (authorId) {
      query = query.eq('author_id', authorId);
    }
    
    if (category) {
      query = query.eq('category_id', category);
    }
    
    if (tag) {
      query = query.eq('blog_post_tags.tag_id', tag);
    }
    
    // Add pagination and sorting
    query = query
      .order('published_at', { ascending: false })
      .range(from, to);
    
    // Execute query
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching blog posts', error);
      return {
        posts: [],
        totalCount: 0,
        page: 1,
        perPage,
        totalPages: 0
      };
    }
    
    // Format the posts
    const posts = data.map(formatPost);
    
    // Calculate total pages
    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / perPage);
    
    return {
      posts,
      totalCount,
      page,
      perPage,
      totalPages
    };
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return {
      posts: [],
      totalCount: 0,
      page: 1,
      perPage,
      totalPages: 0
    };
  }
}

/**
 * Get a single blog post by ID
 */
export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories(*),
        blog_tags:blog_post_tags(blog_tags(*))
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching blog post by ID:', error);
      return null;
    }
    
    return formatPost(data);
  } catch (error) {
    console.error('Error in getBlogPostById:', error);
    return null;
  }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string, includeUnpublished = false): Promise<BlogPost | null> {
  const supabase = await createClient();
  
  let query = supabase
    .from('blog_posts')
    .select('*, blog_categories(*), blog_tags(*), author:profiles(*)')
    .eq('slug', slug)
    .single();

  if (!includeUnpublished) {
    query = query.eq('published', true);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === 'PGRST116') {
      // Post not found, return null instead of throwing
      return null;
    }
    console.error('Error fetching blog post:', error);
    throw error;
  }

  return formatPost(data);
}

/**
 * Helper function to format a blog post from the database
 */
function formatPost(post: any): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || null,
    content: post.content || null,
    featured_image: post.featured_image || null,
    category_id: post.category_id || null,
    author_id: post.author_id || null,
    status: post.status || 'draft',
    published_at: post.published_at || null,
    created_at: post.created_at,
    updated_at: post.updated_at,
    meta_title: post.meta_title || null,
    meta_description: post.meta_description || null,
    view_count: post.view_count || 0,
    category: post.blog_categories ? {
      id: post.blog_categories.id,
      name: post.blog_categories.name,
      slug: post.blog_categories.slug,
      description: post.blog_categories.description || '',
      created_at: post.blog_categories.created_at
    } : undefined,
    author: post.author ? {
      id: post.author.id,
      email: post.author.email,
      full_name: post.author.full_name || null,
      avatar_url: post.author.avatar_url || null
    } : undefined,
    tags: post.blog_tags ? post.blog_tags.map((tag: any) => tag.blog_tags) : []
  };
}

/**
 * Get all blog categories
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*');

    if (error) {
      console.error('Error fetching blog categories:', error);
      throw error;
    }

    return data.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      created_at: category.created_at
    }));
  } catch (error) {
    console.error('Error in getBlogCategories:', error);
    return [];
  }
}

/**
 * Get all blog tags
 */
export async function getBlogTags(): Promise<BlogTag[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_tags')
      .select('*');

    if (error) {
      console.error('Error fetching blog tags:', error);
      throw error;
    }

    return data.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      created_at: tag.created_at
    }));
  } catch (error) {
    console.error('Error in getBlogTags:', error);
    return [];
  }
}

/**
 * Create a new blog post
 */
export async function createBlogPost(post: BlogPostInput): Promise<number> {
  try {
    const supabase = await createClient();
    
    // Create the post
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featured_image,
        category_id: post.category_id,
        author_id: post.author_id,
        status: post.status,
        published_at: post.published_at,
        meta_title: post.meta_title,
        meta_description: post.meta_description
      })
      .select('id')
      .single();
    
    if (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
    
    // If there are tags, insert them into the junction table
    if (post.tagIds && post.tagIds.length > 0) {
      const tagConnections = post.tagIds.map((tagId: number) => ({
        post_id: data.id,
        tag_id: tagId
      }));
      
      const { error: tagError } = await supabase
        .from('blog_post_tags')
        .insert(tagConnections);
      
      if (tagError) {
        console.error('Error creating tag connections:', tagError);
        // Continue despite tag error
      }
    }
    
    return data.id;
  } catch (error) {
    console.error('Error in createBlogPost:', error);
    throw error;
  }
}

/**
 * Update an existing blog post
 */
export async function updateBlogPost(id: number, post: BlogPostUpdate): Promise<boolean> {
  try {
    const supabase = await createClient();
    
    // Create an object with only the fields that should be updated
    const updateData: any = {};
    
    if (post.title !== undefined) updateData.title = post.title;
    if (post.slug !== undefined) updateData.slug = post.slug;
    if (post.excerpt !== undefined) updateData.excerpt = post.excerpt;
    if (post.content !== undefined) updateData.content = post.content;
    if (post.featured_image !== undefined) updateData.featured_image = post.featured_image;
    if (post.category_id !== undefined) updateData.category_id = post.category_id;
    if (post.status !== undefined) updateData.status = post.status;
    if (post.published_at !== undefined) updateData.published_at = post.published_at;
    if (post.meta_title !== undefined) updateData.meta_title = post.meta_title;
    if (post.meta_description !== undefined) updateData.meta_description = post.meta_description;
    if (post.view_count !== undefined) updateData.view_count = post.view_count;
    
    // Update the post
    const { error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating blog post:', error);
      return false;
    }
    
    // If tagIds are provided, update the post's tags
    if (post.tagIds !== undefined) {
      // First, remove all existing tag connections
      const { error: deleteError } = await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', id);
      
      if (deleteError) {
        console.error('Error removing existing tags:', deleteError);
        return false;
      }
      
      // Then, if there are new tags, insert them
      if (post.tagIds.length > 0) {
        const tagConnections = post.tagIds.map((tagId: number) => ({
          post_id: id,
          tag_id: tagId
        }));
        
        const { error: insertError } = await supabase
          .from('blog_post_tags')
          .insert(tagConnections);
        
        if (insertError) {
          console.error('Error adding new tags:', insertError);
          return false;
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateBlogPost:', error);
    return false;
  }
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(id: number): Promise<boolean> {
  try {
    const supabase = await createClient();
    
    // First delete all tag connections
    const { error: tagError } = await supabase
      .from('blog_post_tags')
      .delete()
      .eq('post_id', id);
    
    if (tagError) {
      console.error('Error deleting tag connections:', tagError);
      return false;
    }
    
    // Then delete the post
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteBlogPost:', error);
    return false;
  }
}

/**
 * Create a new blog category
 */
export async function createCategory(name: string, description?: string): Promise<BlogCategory> {
  try {
    const supabase = await createClient();
    
    // Generate a slug from the name
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const { data, error } = await supabase
      .from('blog_categories')
      .insert({
        name,
        slug,
        description
      })
      .select('*')
      .single();
    
    if (error) {
      console.error('Error creating category:', error);
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description || '',
      created_at: data.created_at
    };
  } catch (error) {
    console.error('Error in createCategory:', error);
    throw error;
  }
}

/**
 * Create a new blog tag
 */
export async function createBlogTag(tag: { name: string; slug: string; description?: string }): Promise<BlogTag> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('blog_tags')
    .insert(tag)
    .select()
    .single();

  if (error) {
    console.error('Error creating blog tag:', error);
    throw error;
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description || '',
  };
}

/**
 * Check if all blog tables exist in the database
 */
export async function checkBlogTablesExist(): Promise<{ exists: boolean; missing: string[] }> {
  const supabase = await createClient();
  const requiredTables = [
    'blog_posts',
    'blog_categories',
    'blog_tags',
    'blog_posts_tags',
    'profiles'
  ];
  
  const missingTables: string[] = [];
  
  for (const table of requiredTables) {
    const { error } = await supabase.from(table).select('*').limit(1);
    
    if (error && error.code === '42P01') { // Table doesn't exist
      missingTables.push(table);
    }
  }
  
  return {
    exists: missingTables.length === 0,
    missing: missingTables
  };
} 