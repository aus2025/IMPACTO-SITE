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

-- Set up RLS policies
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to insert contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated to view contact submissions" ON public.contact_submissions;

-- Allow public to insert submissions
CREATE POLICY "Allow public to insert contact submissions" 
  ON public.contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read submissions
CREATE POLICY "Allow authenticated to view contact submissions" 
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC); 