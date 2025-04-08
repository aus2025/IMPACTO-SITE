import { createClient } from '@/utils/supabase/server-pages';
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
    pageSize = DEFAULT_PAGE_SIZE,
    category,
    tag,
    search,
    authorId,
    includeUnpublished = false
  } = filters;

  // Calculate pagination values
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Start building the query
  let query = supabase
    .from('blog_posts')
    .select('*, blog_categories(*), blog_tags(*), author:profiles(*)', { count: 'exact' });

  // Apply filters
  if (!includeUnpublished) {
    query = query.eq('published', true);
  }

  if (category) {
    query = query.eq('blog_categories.slug', category);
  }

  if (tag) {
    query = query.eq('blog_tags.slug', tag);
  }

  if (authorId) {
    query = query.eq('author_id', authorId);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  // Apply pagination and order
  query = query
    .order('created_at', { ascending: false })
    .range(from, to);

  // Execute the query
  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }

  // Format the posts
  const posts = data.map(formatBlogPost);

  return {
    posts,
    pagination: {
      total: count || 0,
      page,
      pageSize,
      totalPages: count ? Math.ceil(count / pageSize) : 0
    }
  };
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

  return formatBlogPost(data);
}

/**
 * Get a blog post by ID (to support the admin edit page route)
 */
export async function getBlogPostById(id: string, includeUnpublished = false): Promise<BlogPost | null> {
  const supabase = await createClient();
  
  let query = supabase
    .from('blog_posts')
    .select('*, blog_categories(*), blog_tags(*), author:profiles(*)')
    .eq('id', id)
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
    console.error('Error fetching blog post by ID:', error);
    throw error;
  }

  return formatBlogPost(data);
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
    throw error;
  }

  return data.map(category => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || '',
  }));
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
    throw error;
  }

  return data.map(tag => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    description: tag.description || '',
  }));
}

/**
 * Helper function to format a blog post from the database
 */
function formatBlogPost(post: any): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content || '',
    featured_image: post.featured_image || null,
    published: post.published,
    published_at: post.published_at ? new Date(post.published_at) : null,
    created_at: new Date(post.created_at),
    updated_at: new Date(post.updated_at),
    category: post.blog_categories ? {
      id: post.blog_categories.id,
      name: post.blog_categories.name,
      slug: post.blog_categories.slug,
      description: post.blog_categories.description || '',
    } : null,
    tags: post.blog_tags ? Array.isArray(post.blog_tags) ? post.blog_tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      description: tag.description || '',
    })) : [] : [],
    author: post.author ? {
      id: post.author.id,
      name: post.author.full_name || '',
      email: post.author.email || '',
      avatar_url: post.author.avatar_url || null,
    } : null,
  };
}

/**
 * Create a new blog post
 */
export async function createBlogPost(post: BlogPostInput): Promise<BlogPost> {
  const supabase = await createClient();
  
  // Insert the post
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image,
      published: post.published,
      published_at: post.published ? new Date().toISOString() : null,
      category_id: post.category_id,
      author_id: post.author_id,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }

  // If there are tags, insert them into the junction table
  if (post.tag_ids && post.tag_ids.length > 0) {
    const tagConnections = post.tag_ids.map(tagId => ({
      post_id: data.id,
      tag_id: tagId
    }));

    const { error: tagError } = await supabase
      .from('blog_posts_tags')
      .insert(tagConnections);

    if (tagError) {
      console.error('Error connecting tags to post:', tagError);
      throw tagError;
    }
  }

  // Fetch the complete post with relations
  return getBlogPostBySlug(data.slug, true) as Promise<BlogPost>;
}

/**
 * Update an existing blog post
 */
export async function updateBlogPost(id: string, post: BlogPostUpdate): Promise<BlogPost> {
  const supabase = await createClient();
  
  // Prepare update data
  const updateData: any = {};
  
  // Only include fields that are provided
  if (post.title !== undefined) updateData.title = post.title;
  if (post.slug !== undefined) updateData.slug = post.slug;
  if (post.excerpt !== undefined) updateData.excerpt = post.excerpt;
  if (post.content !== undefined) updateData.content = post.content;
  if (post.featured_image !== undefined) updateData.featured_image = post.featured_image;
  if (post.category_id !== undefined) updateData.category_id = post.category_id;
  
  // Special handling for published status
  if (post.published !== undefined) {
    updateData.published = post.published;
    
    // If publishing for the first time, set the published_at date
    if (post.published && !post.published_at) {
      updateData.published_at = new Date().toISOString();
    }
  }
  
  if (post.published_at !== undefined) {
    updateData.published_at = post.published_at;
  }

  // Update the post
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }

  // If tag_ids are provided, update the post's tags
  if (post.tag_ids !== undefined) {
    // First, remove all existing tag connections
    const { error: deleteError } = await supabase
      .from('blog_posts_tags')
      .delete()
      .eq('post_id', id);

    if (deleteError) {
      console.error('Error removing existing tags:', deleteError);
      throw deleteError;
    }

    // Then, if there are new tags, insert them
    if (post.tag_ids.length > 0) {
      const tagConnections = post.tag_ids.map(tagId => ({
        post_id: id,
        tag_id: tagId
      }));

      const { error: insertError } = await supabase
        .from('blog_posts_tags')
        .insert(tagConnections);

      if (insertError) {
        console.error('Error connecting tags to post:', insertError);
        throw insertError;
      }
    }
  }

  // Fetch the complete updated post with relations
  return getBlogPostBySlug(data.slug, true) as Promise<BlogPost>;
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = await createClient();
  
  // First delete the tag connections (foreign key constraint)
  const { error: tagError } = await supabase
    .from('blog_posts_tags')
    .delete()
    .eq('post_id', id);

  if (tagError) {
    console.error('Error deleting post tag connections:', tagError);
    throw tagError;
  }

  // Then delete the post
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

/**
 * Create a new blog category
 */
export async function createBlogCategory(category: { name: string; slug: string; description?: string }): Promise<BlogCategory> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('blog_categories')
    .insert(category)
    .select()
    .single();

  if (error) {
    console.error('Error creating blog category:', error);
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