-- This script combines both table creations into one file for easy execution in Supabase SQL Editor

-- Create assessments table to match the API requirements
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Contact Information
  name TEXT,
  email TEXT,
  company TEXT,
  job_title TEXT,
  phone TEXT,
  
  -- Business Information
  industry TEXT,
  company_size TEXT,
  business_goals TEXT[],
  pain_points TEXT[],
  
  -- Automation Information
  automation_experience TEXT,
  current_tools TEXT[],
  automation_needs TEXT[],
  document_types TEXT[],
  document_volume TEXT,
  timeline TEXT,
  
  -- Budget & Investment
  budget_range TEXT,
  
  -- Additional Information
  referral_source TEXT,
  additional_comments TEXT,
  consent BOOLEAN DEFAULT FALSE
);

-- Create indexes for assessments table
CREATE INDEX IF NOT EXISTS assessments_created_at_idx ON public.assessments (created_at DESC);
CREATE INDEX IF NOT EXISTS assessments_email_idx ON public.assessments (email);

-- Create contact_submissions table for the contact form
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for contact_submissions table
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC);

-- Set up RLS (Row Level Security)
-- Enable RLS on both tables
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to insert assessments" ON public.assessments;
DROP POLICY IF EXISTS "Allow authenticated to view assessments" ON public.assessments;
DROP POLICY IF EXISTS "Allow public to insert contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated to view contact submissions" ON public.contact_submissions;

-- Create policies for assessments table
CREATE POLICY "Allow public to insert assessments" 
  ON public.assessments
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated to view assessments" 
  ON public.assessments
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for contact_submissions table
CREATE POLICY "Allow public to insert contact submissions" 
  ON public.contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated to view contact submissions" 
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Output a message to confirm completion
DO $$
BEGIN
  RAISE NOTICE 'Database schema update completed successfully!';
END $$; 