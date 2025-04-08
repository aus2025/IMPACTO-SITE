-- Public policies
-- Blog posts: public can only read published posts
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'blog_posts_read_published'
  ) THEN
    CREATE POLICY blog_posts_read_published ON blog_posts
      FOR SELECT
      TO public
      USING (is_published = TRUE);
  END IF;
END
$$;

-- Services: public can read all services
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'services' 
    AND policyname = 'services_read'
  ) THEN
    CREATE POLICY services_read ON services
      FOR SELECT
      TO public
      USING (TRUE);
  END IF;
END
$$;

-- Case studies: public can read all case studies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'case_studies' 
    AND policyname = 'case_studies_read'
  ) THEN
    CREATE POLICY case_studies_read ON case_studies
      FOR SELECT
      TO public
      USING (TRUE);
  END IF;
END
$$;

-- Authenticated policies
-- Leads: only authenticated users can view leads
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'leads' 
    AND policyname = 'leads_auth_read'
  ) THEN
    CREATE POLICY leads_auth_read ON leads
      FOR SELECT
      TO authenticated
      USING (TRUE);
  END IF;
END
$$;

-- Blog posts: authenticated users (admins) can read all posts and modify them
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'blog_posts_auth_read'
  ) THEN
    CREATE POLICY blog_posts_auth_read ON blog_posts
      FOR SELECT
      TO authenticated
      USING (TRUE);
  END IF;
END
$$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'blog_posts_auth_insert'
  ) THEN
    CREATE POLICY blog_posts_auth_insert ON blog_posts
      FOR INSERT
      TO authenticated
      WITH CHECK (TRUE);
  END IF;
END
$$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'blog_posts_auth_update'
  ) THEN
    CREATE POLICY blog_posts_auth_update ON blog_posts
      FOR UPDATE
      TO authenticated
      USING (TRUE);
  END IF;
END
$$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'blog_posts_auth_delete'
  ) THEN
    CREATE POLICY blog_posts_auth_delete ON blog_posts
      FOR DELETE
      TO authenticated
      USING (TRUE);
  END IF;
END
$$;

-- Services: authenticated users (admins) can modify services
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'services' 
    AND policyname = 'services_auth_insert'
  ) THEN
    CREATE POLICY services_auth_insert ON services
      FOR INSERT
      TO authenticated
      WITH CHECK (TRUE);
  END IF;
END
$$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'services' 
    AND policyname = 'services_auth_update'
  ) THEN
    CREATE POLICY services_auth_update ON services
      FOR UPDATE
      TO authenticated
      USING (TRUE);
  END IF;
END
$$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'services' 
    AND policyname = 'services_auth_delete'
  ) THEN
    CREATE POLICY services_auth_delete ON services
      FOR DELETE
      TO authenticated
      USING (TRUE);
  END IF;
END
$$;

-- Case studies: authenticated users (admins) can modify case studies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'case_studies' 
    AND policyname = 'case_studies_auth_insert'
  ) THEN
    CREATE POLICY case_studies_auth_insert ON case_studies
      FOR INSERT
      TO authenticated
      WITH CHECK (TRUE);
  END IF;
END
$$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'case_studies' 
    AND policyname = 'case_studies_auth_update'
  ) THEN
    CREATE POLICY case_studies_auth_update ON case_studies
      FOR UPDATE
      TO authenticated
      USING (TRUE);
  END IF;
END
$$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'case_studies' 
    AND policyname = 'case_studies_auth_delete'
  ) THEN
    CREATE POLICY case_studies_auth_delete ON case_studies
      FOR DELETE
      TO authenticated
      USING (TRUE);
  END IF;
END
$$;

-- Business assessments: public can insert (submit form), but only authenticated can read
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'business_assessments' 
    AND policyname = 'business_assessments_public_insert'
  ) THEN
    CREATE POLICY business_assessments_public_insert ON business_assessments
      FOR INSERT
      TO public
      WITH CHECK (TRUE);
  END IF;
END
$$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'business_assessments' 
    AND policyname = 'business_assessments_auth_read'
  ) THEN
    CREATE POLICY business_assessments_auth_read ON business_assessments
      FOR SELECT
      TO authenticated
      USING (TRUE);
  END IF;
END
$$;

-- Leads: public can insert (submit form), but only authenticated can read
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'leads' 
    AND policyname = 'leads_public_insert'
  ) THEN
    CREATE POLICY leads_public_insert ON leads
      FOR INSERT
      TO public
      WITH CHECK (TRUE);
  END IF;
END
$$; 