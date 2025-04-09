export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  featured_image?: string | null;
  category_id?: number | null;
  author_id?: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  meta_title?: string | null;
  meta_description?: string | null;
  view_count: number;
  
  // Joined fields (not in the actual database table)
  category?: BlogCategory;
  author?: Author;
  tags?: BlogTag[];
  blog_post_tags?: BlogPostTag[];
};

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  created_at: string;
};

export type BlogTag = {
  id: number;
  name: string;
  slug: string;
  created_at: string;
};

// Join table between posts and tags
export type BlogPostTag = {
  id: number;
  post_id: number;
  tag_id: number;
  created_at: string;
  // Joined fields
  tag?: BlogTag;
  tags?: BlogTag; // Some queries return this field name instead
};

export type BlogComment = {
  id: number;
  post_id: number;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'spam';
  created_at: string;
  approved_at?: string | null;
  parent_id?: number | null;
  
  // For nested comments
  replies?: BlogComment[];
};

export type Author = {
  id: string;
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
};

export type BlogPostInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  category_id?: number;
  author_id?: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  tagIds?: number[];
};

export type BlogPostUpdate = Partial<BlogPostInput> & {
  view_count?: number;
};

export type BlogPostFilters = {
  page?: number;
  perPage?: number;
  category?: string;
  tag?: string;
  search?: string;
  status?: 'draft' | 'published' | 'archived';
  authorId?: string;
  excludeId?: number;
};

export type PaginatedBlogPosts = {
  posts: BlogPost[];
  totalCount: number;
  page: number;
  perPage: number;
  totalPages: number;
}; 