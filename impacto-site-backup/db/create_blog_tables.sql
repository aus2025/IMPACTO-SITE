-- Function to create all blog tables if they don't exist
CREATE OR REPLACE FUNCTION create_blog_tables_if_not_exist()
RETURNS VOID AS $$
BEGIN
  -- Check if blog_categories table exists
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_categories') THEN
    -- Create blog categories table
    CREATE TABLE blog_categories (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Insert default category
    INSERT INTO blog_categories (name, slug, description)
    VALUES ('Uncategorized', 'uncategorized', 'Default category for blog posts');
  END IF;

  -- Check if blog_tags table exists
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_tags') THEN
    -- Create blog tags table
    CREATE TABLE blog_tags (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;

  -- Check if blog_posts table exists
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_posts') THEN
    -- Create blog posts table
    CREATE TABLE blog_posts (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT,
      content TEXT,
      featured_image TEXT,
      author_id UUID REFERENCES auth.users(id),
      category_id BIGINT REFERENCES blog_categories(id),
      status TEXT NOT NULL DEFAULT 'draft',
      view_count BIGINT DEFAULT 0,
      published_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;

  -- Check if blog_post_tags table exists
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_post_tags') THEN
    -- Create junction table for many-to-many relationship between posts and tags
    CREATE TABLE blog_post_tags (
      post_id BIGINT REFERENCES blog_posts(id) ON DELETE CASCADE,
      tag_id BIGINT REFERENCES blog_tags(id) ON DELETE CASCADE,
      PRIMARY KEY (post_id, tag_id)
    );
  END IF;

  -- Create function to increment post view count if it doesn't exist
  IF NOT EXISTS (
    SELECT FROM pg_proc
    WHERE proname = 'increment_blog_post_view_count'
    AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
  ) THEN
    EXECUTE $FUNC$
    CREATE FUNCTION increment_blog_post_view_count(post_id BIGINT)
    RETURNS VOID AS $INNER$
    BEGIN
      UPDATE blog_posts 
      SET view_count = view_count + 1 
      WHERE id = post_id;
    END;
    $INNER$ LANGUAGE plpgsql;
    $FUNC$;
  END IF;

  -- Create function to generate a unique slug if it doesn't exist
  IF NOT EXISTS (
    SELECT FROM pg_proc
    WHERE proname = 'generate_slug'
    AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
  ) THEN
    EXECUTE $FUNC$
    CREATE FUNCTION generate_slug(title TEXT)
    RETURNS TEXT AS $INNER$
    DECLARE
      base_slug TEXT;
      final_slug TEXT;
      counter INTEGER := 1;
    BEGIN
      -- Convert to lowercase, replace non-alphanumeric with dash
      base_slug := lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'));
      -- Remove leading/trailing dashes
      base_slug := trim(both '-' from base_slug);
      
      -- Start with the base slug
      final_slug := base_slug;
      
      -- Check if slug exists and append counter if needed
      WHILE EXISTS (SELECT 1 FROM blog_posts WHERE slug = final_slug) LOOP
        final_slug := base_slug || '-' || counter;
        counter := counter + 1;
      END LOOP;
      
      RETURN final_slug;
    END;
    $INNER$ LANGUAGE plpgsql;
    $FUNC$;
  END IF;

END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION create_blog_tables_if_not_exist() TO authenticated;
GRANT EXECUTE ON FUNCTION create_blog_tables_if_not_exist() TO anon; 