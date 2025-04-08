-- Enable UUID extension (required for Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create business_assessments table
CREATE TABLE IF NOT EXISTS public.business_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  role TEXT,
  
  -- Business Information
  industry TEXT,
  employees TEXT,
  goals TEXT[], -- Stored as array of text values
  
  -- Healthcare Specific
  compliance_concerns TEXT[], -- Array of compliance concerns
  patient_data TEXT,
  
  -- Retail Specific
  inventory_management TEXT,
  sales_channels TEXT[], -- Array of sales channels
  customer_loyalty TEXT,
  
  -- Business Size Specific
  owner_involvement TEXT,
  growth_challenges TEXT,
  departments_involved TEXT[], -- Array of department names
  integration_complexity TEXT,
  decision_makers TEXT,
  
  -- Challenges Assessment (ratings from 1-5)
  challenges JSONB DEFAULT '{
    "financial_challenge": 1,
    "onboarding_challenge": 1,
    "pipeline_challenge": 1,
    "proposal_challenge": 1,
    "project_challenge": 1,
    "crm_challenge": 1,
    "reporting_challenge": 1,
    "communication_challenge": 1,
    "workflow_challenge": 1,
    "hr_challenge": 1
  }',
  
  -- Financial Follow-up
  invoice_volume TEXT,
  financial_pain_points TEXT[], -- Array of pain points
  
  -- Proposal Follow-up
  proposal_volume TEXT,
  proposal_approval TEXT,
  proposal_time TEXT,
  
  -- Current Systems
  software TEXT[], -- Array of software names
  other_software TEXT,
  automation_level TEXT,
  integration_challenges TEXT,
  
  -- Priorities
  priorities TEXT[], -- Array of priority areas (max 3)
  specific_pain TEXT,
  success_criteria TEXT,
  
  -- Final Questions
  previous_automation TEXT,
  previous_experience TEXT,
  decision_timeline TEXT,
  additional_info TEXT,
  
  -- Consent
  consent BOOLEAN NOT NULL DEFAULT FALSE,
  consultation_requested BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.business_assessments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid errors
DROP POLICY IF EXISTS "Allow authenticated users to view all assessments" ON public.business_assessments;
DROP POLICY IF EXISTS "Allow authenticated users to insert assessments" ON public.business_assessments;
DROP POLICY IF EXISTS "Allow public users to insert assessments" ON public.business_assessments;
DROP POLICY IF EXISTS "Allow authenticated users to update assessments" ON public.business_assessments;
DROP POLICY IF EXISTS "Allow authenticated users to delete assessments" ON public.business_assessments;

-- Create policies for access control
-- Allows authenticated users to view all assessments
CREATE POLICY "Allow authenticated users to view all assessments" 
  ON public.business_assessments
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allows authenticated users to insert new assessments
CREATE POLICY "Allow authenticated users to insert assessments" 
  ON public.business_assessments
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Allow public users to insert (for frontend form submissions)
CREATE POLICY "Allow public users to insert assessments" 
  ON public.business_assessments
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to update assessments
CREATE POLICY "Allow authenticated users to update assessments" 
  ON public.business_assessments
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Allow authenticated users to delete assessments
CREATE POLICY "Allow authenticated users to delete assessments" 
  ON public.business_assessments
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create indexes for improved query performance
CREATE INDEX IF NOT EXISTS business_assessments_created_at_idx ON public.business_assessments (created_at DESC);
CREATE INDEX IF NOT EXISTS business_assessments_email_idx ON public.business_assessments (email);
CREATE INDEX IF NOT EXISTS business_assessments_company_idx ON public.business_assessments (company);

-- Set up trigger to auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_business_assessments_updated_at ON public.business_assessments;
CREATE TRIGGER update_business_assessments_updated_at
BEFORE UPDATE ON public.business_assessments
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column(); 