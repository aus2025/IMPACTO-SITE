import { createClient } from '@/utils/supabase/server';
import type { BlogPost, BlogCategory, BlogTag, PaginatedBlogPosts, BlogPostFilters } from '@/types/blog';

// Safe function to check if the tables exist
export async function checkBlogTablesExist() {
  try {
    const supabase = await createClient();
    
    // Check if blog_posts table exists
    const { data: tablesData, error } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
      .in('tablename', ['blog_posts', 'blog_categories', 'blog_tags', 'blog_post_tags']);
    
    if (error) {
      console.error('Error checking tables:', error);
      return { exists: false, error: error.message };
    }
    
    // Convert to set for faster lookups
    const tableNames = new Set(tablesData?.map(t => t.tablename) || []);
    
    // Check if all required tables exist
    const requiredTables = ['blog_posts', 'blog_categories', 'blog_tags', 'blog_post_tags'];
    const missingTables = requiredTables.filter(table => !tableNames.has(table));
    
    return { 
      exists: missingTables.length === 0,
      missingTables: missingTables.length > 0 ? missingTables : undefined
    };
  } catch (error) {
    console.error('Error checking blog tables:', error);
    return { exists: false, error: String(error) };
  }
}

// Safe version of getBlogPosts that handles missing tables better
export async function safeGetBlogPosts(filters: BlogPostFilters = {}): Promise<PaginatedBlogPosts> {
  try {
    // First check if tables exist
    const { exists, missingTables } = await checkBlogTablesExist();
    
    if (!exists) {
      throw new Error(`Blog tables don't exist: ${missingTables?.join(', ') || 'unknown issue'}`);
    }
    
    const supabase = await createClient();
    
    // Default pagination values
    const page = filters.page || 1;
    const perPage = filters.perPage || 5;
    
    // Calculate pagination
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    
    // Simplified query - avoid complex joins for now
    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' });
    
    // Apply basic filters
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters.status === 'published') {
      query = query.lte('published_at', new Date().toISOString());
    }
    
    if (filters.authorId) {
      query = query.eq('author_id', filters.authorId);
    }
    
    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(from, to);
    
    // Execute the query
    const { data: posts, count, error } = await query;
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      throw new Error(`Failed to fetch blog posts: ${error.message}`);
    }
    
    // Safely extract post data
    const formattedPosts = (posts || []).map(post => ({
      ...post,
      tags: [] // Empty tags array since we're not fetching them in this simplified query
    }));
    
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
  } catch (error) {
    console.error('Error in safeGetBlogPosts:', error);
    return {
      posts: [],
      totalCount: 0,
      page: filters.page || 1,
      perPage: filters.perPage || 5,
      totalPages: 0
    };
  }
}

// Safe version of blog categories
export async function safeGetBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { exists } = await checkBlogTablesExist();
    
    if (!exists) {
      return [];
    }
    
    const supabase = await createClient();
    
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
    console.error('Error in safeGetBlogCategories:', error);
    return [];
  }
}

// Safe version of blog tags
export async function safeGetBlogTags(): Promise<BlogTag[]> {
  try {
    const { exists } = await checkBlogTablesExist();
    
    if (!exists) {
      return [];
    }
    
    const supabase = await createClient();
    
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
    console.error('Error in safeGetBlogTags:', error);
    return [];
  }
} 