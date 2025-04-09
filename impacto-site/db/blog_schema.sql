-- Blog system tables schema
-- This script creates the necessary tables for the blog system

-- Check if the tables already exist before creating them
DO $$ 
BEGIN
  -- Create blog_categories table
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_categories') THEN
    CREATE TABLE public.blog_categories (
      id bigint generated always as identity primary key,
      name text not null unique,
      slug text not null unique,
      description text,
      created_at timestamptz default now() not null
    );
    
    COMMENT ON TABLE public.blog_categories IS 'Categories for blog posts';
  END IF;

  -- Create blog_tags table
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_tags') THEN
    CREATE TABLE public.blog_tags (
      id bigint generated always as identity primary key,
      name text not null unique,
      slug text not null unique,
      created_at timestamptz default now() not null
    );
    
    COMMENT ON TABLE public.blog_tags IS 'Tags for blog posts';
  END IF;

  -- Create blog_posts table
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_posts') THEN
    CREATE TABLE public.blog_posts (
      id bigint generated always as identity primary key,
      title text not null,
      slug text not null unique,
      excerpt text,
      content text,
      featured_image text,
      category_id bigint references public.blog_categories(id),
      author_id uuid references auth.users(id),
      status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
      published_at timestamptz,
      created_at timestamptz default now() not null,
      updated_at timestamptz default now() not null,
      meta_title text,
      meta_description text,
      view_count integer default 0 not null
    );
    
    COMMENT ON TABLE public.blog_posts IS 'Blog posts with content and metadata';
  END IF;

  -- Create post_tags junction table for many-to-many relationship
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_post_tags') THEN
    CREATE TABLE public.blog_post_tags (
      post_id bigint references public.blog_posts(id) on delete cascade,
      tag_id bigint references public.blog_tags(id) on delete cascade,
      primary key (post_id, tag_id)
    );
    
    COMMENT ON TABLE public.blog_post_tags IS 'Junction table for blog posts and tags';
  END IF;

  -- Create table for storing blog comments
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_comments') THEN
    CREATE TABLE public.blog_comments (
      id bigint generated always as identity primary key,
      post_id bigint references public.blog_posts(id) on delete cascade,
      author_name text not null,
      author_email text not null,
      content text not null,
      status text not null default 'pending' check (status in ('pending', 'approved', 'spam')),
      created_at timestamptz default now() not null,
      approved_at timestamptz,
      parent_id bigint references public.blog_comments(id) on delete set null
    );
    
    COMMENT ON TABLE public.blog_comments IS 'Comments on blog posts';
  END IF;
END $$;

-- Create indexes for better performance
DO $$
BEGIN
  -- Indexes for blog_posts
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'blog_posts_slug_idx') THEN
    CREATE INDEX blog_posts_slug_idx ON public.blog_posts (slug);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'blog_posts_status_idx') THEN
    CREATE INDEX blog_posts_status_idx ON public.blog_posts (status);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'blog_posts_created_at_idx') THEN
    CREATE INDEX blog_posts_created_at_idx ON public.blog_posts (created_at DESC);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'blog_posts_published_at_idx') THEN
    CREATE INDEX blog_posts_published_at_idx ON public.blog_posts (published_at DESC);
  END IF;

  -- Indexes for blog_post_tags
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'blog_post_tags_post_id_idx') THEN
    CREATE INDEX blog_post_tags_post_id_idx ON public.blog_post_tags (post_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'blog_post_tags_tag_id_idx') THEN
    CREATE INDEX blog_post_tags_tag_id_idx ON public.blog_post_tags (tag_id);
  END IF;

  -- Indexes for blog_comments
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'blog_comments_post_id_idx') THEN
    CREATE INDEX blog_comments_post_id_idx ON public.blog_comments (post_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'blog_comments_status_idx') THEN
    CREATE INDEX blog_comments_status_idx ON public.blog_comments (status);
  END IF;
END $$;

-- Set up Row Level Security (RLS)
-- For blog_posts table
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view published posts
CREATE POLICY "Allow anyone to view published posts"
  ON public.blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published' AND published_at <= now());

-- Allow authenticated users to view their drafts
CREATE POLICY "Allow users to view own posts"
  ON public.blog_posts
  FOR SELECT
  TO authenticated
  USING (author_id = auth.uid());

-- Allow authenticated users to manage their own posts
CREATE POLICY "Allow users to manage own posts"
  ON public.blog_posts
  FOR ALL
  TO authenticated
  USING (author_id = auth.uid());

-- Allow admin to manage all posts (will need to manage this through roles)
CREATE POLICY "Allow admins to manage all posts"
  ON public.blog_posts
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email LIKE '%@impacto.ai'
  ));

-- For blog_categories table
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Anyone can view categories
CREATE POLICY "Allow anyone to view categories"
  ON public.blog_categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only admins can manage categories
CREATE POLICY "Allow admins to manage categories"
  ON public.blog_categories
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email LIKE '%@impacto.ai'
  ));

-- For blog_tags table
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;

-- Anyone can view tags
CREATE POLICY "Allow anyone to view tags"
  ON public.blog_tags
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only admins can manage tags
CREATE POLICY "Allow admins to manage tags"
  ON public.blog_tags
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email LIKE '%@impacto.ai'
  ));

-- For blog_post_tags table
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Anyone can view post tags
CREATE POLICY "Allow anyone to view post tags"
  ON public.blog_post_tags
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Content authors can manage tags for their own posts
CREATE POLICY "Allow users to manage tags for own posts"
  ON public.blog_post_tags
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.blog_posts
    WHERE blog_posts.id = blog_post_tags.post_id AND blog_posts.author_id = auth.uid()
  ));

-- For blog_comments table
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved comments
CREATE POLICY "Allow anyone to view approved comments"
  ON public.blog_comments
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Anyone can add comments
CREATE POLICY "Allow anyone to add comments"
  ON public.blog_comments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can manage comments
CREATE POLICY "Allow admins to manage all comments"
  ON public.blog_comments
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email LIKE '%@impacto.ai'
  ));

-- Create two helper functions

-- Function to generate a slug from title
CREATE OR REPLACE FUNCTION generate_slug(title text) 
RETURNS text AS $$
DECLARE
  slug text;
BEGIN
  -- Convert to lowercase
  slug := lower(title);
  -- Replace non-alphanumeric characters with hyphens
  slug := regexp_replace(slug, '[^a-z0-9]+', '-', 'g');
  -- Remove leading and trailing hyphens
  slug := regexp_replace(slug, '^-+|-+$', '', 'g');
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_blog_post_view_count(post_id bigint)
RETURNS void AS $$
BEGIN
  UPDATE public.blog_posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql; 