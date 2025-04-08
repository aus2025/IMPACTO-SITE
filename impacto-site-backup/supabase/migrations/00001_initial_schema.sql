-- Create database tables

-- Table: leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_interest TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  featured_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT FALSE,
  author TEXT NOT NULL,
  tags TEXT[],
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: case_studies
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT NOT NULL,
  featured_image TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: business_assessments
CREATE TABLE IF NOT EXISTS business_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  company_size TEXT,
  industry TEXT,
  current_challenges TEXT[],
  automation_interest TEXT[],
  current_tools TEXT[],
  budget_range TEXT,
  timeline TEXT,
  goals TEXT,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Set up Row Level Security policies

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_assessments ENABLE ROW LEVEL SECURITY;

-- Public policies
-- Blog posts: public can only read published posts
CREATE POLICY blog_posts_read_published ON blog_posts
  FOR SELECT
  TO public
  USING (is_published = TRUE);

-- Services: public can read all services
CREATE POLICY services_read ON services
  FOR SELECT
  TO public
  USING (TRUE);

-- Case studies: public can read all case studies
CREATE POLICY case_studies_read ON case_studies
  FOR SELECT
  TO public
  USING (TRUE);

-- Authenticated policies
-- Leads: only authenticated users can view leads
CREATE POLICY leads_auth_read ON leads
  FOR SELECT
  TO authenticated
  USING (TRUE);

-- Blog posts: authenticated users (admins) can read all posts and modify them
CREATE POLICY blog_posts_auth_read ON blog_posts
  FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY blog_posts_auth_insert ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY blog_posts_auth_update ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (TRUE);

CREATE POLICY blog_posts_auth_delete ON blog_posts
  FOR DELETE
  TO authenticated
  USING (TRUE);

-- Services: authenticated users (admins) can modify services
CREATE POLICY services_auth_insert ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY services_auth_update ON services
  FOR UPDATE
  TO authenticated
  USING (TRUE);

CREATE POLICY services_auth_delete ON services
  FOR DELETE
  TO authenticated
  USING (TRUE);

-- Case studies: authenticated users (admins) can modify case studies
CREATE POLICY case_studies_auth_insert ON case_studies
  FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY case_studies_auth_update ON case_studies
  FOR UPDATE
  TO authenticated
  USING (TRUE);

CREATE POLICY case_studies_auth_delete ON case_studies
  FOR DELETE
  TO authenticated
  USING (TRUE);

-- Business assessments: public can insert (submit form), but only authenticated can read
CREATE POLICY business_assessments_public_insert ON business_assessments
  FOR INSERT
  TO public
  WITH CHECK (TRUE);

CREATE POLICY business_assessments_auth_read ON business_assessments
  FOR SELECT
  TO authenticated
  USING (TRUE);

-- Leads: public can insert (submit form), but only authenticated can read
CREATE POLICY leads_public_insert ON leads
  FOR INSERT
  TO public
  WITH CHECK (TRUE); 