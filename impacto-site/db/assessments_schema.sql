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

-- Set up RLS policies
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to insert assessments" ON public.assessments;
DROP POLICY IF EXISTS "Allow authenticated to view assessments" ON public.assessments;

-- Allow public to insert assessments
CREATE POLICY "Allow public to insert assessments" 
  ON public.assessments
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read assessments
CREATE POLICY "Allow authenticated to view assessments" 
  ON public.assessments
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS assessments_created_at_idx ON public.assessments (created_at DESC);
CREATE INDEX IF NOT EXISTS assessments_email_idx ON public.assessments (email); 