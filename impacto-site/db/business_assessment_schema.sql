-- Table for business assessment form submissions
-- Check if table exists first, only create if it doesn't
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_assessments') THEN
    CREATE TABLE public.business_assessments (
      id bigint generated always as identity primary key,
      
      -- Contact info
      full_name text not null,
      email text not null,
      phone text not null,
      company text,
      role text,
      
      -- Business info
      industry text,
      employees text,
      goals text[],
      compliance_concerns text[],
      patient_data text,
      inventory_management text,
      sales_channels text[],
      customer_loyalty text,
      owner_involvement text,
      growth_challenges text,
      departments_involved text[],
      integration_complexity text,
      decision_makers text,
      
      -- Automation needs
      automation_areas text[],
      document_types text[],
      document_volume text,
      cs_channels text[],
      cs_ticket_volume text,
      automation_experience text,
      existing_systems text[],
      specific_challenges text,
      automation_timeline text,
      
      -- Budget & Investment
      budget_range text,
      funding_source text,
      decision_timeline text,
      investment_factors text[],
      expected_roi text,
      previous_investments text,
      budget_constraints text,
      
      -- Final
      referral_source text,
      consultation_preference text,
      additional_stakeholders text[],
      preferred_timeline text,
      additional_comments text,
      consent_marketing boolean,
      consent_terms boolean,
      
      -- Metadata
      created_at timestamptz default now() not null,
      status text default 'new',
      assigned_to text,
      
      -- Enable RLS
      constraint form_submissions_consent_check check (consent_terms = true)
    );
    
    -- Add table comment
    COMMENT ON TABLE public.business_assessments IS 'Form submissions from the business automation assessment';
  ELSE 
    -- If table exists, check if consent_terms column exists and add it if missing
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'business_assessments'
                  AND column_name = 'consent_terms') THEN
      ALTER TABLE public.business_assessments ADD COLUMN consent_terms boolean DEFAULT FALSE;
    END IF;
    
    -- Check if consent_marketing column exists and add it if missing
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'business_assessments'
                  AND column_name = 'consent_marketing') THEN
      ALTER TABLE public.business_assessments ADD COLUMN consent_marketing boolean DEFAULT FALSE;
    END IF;
  END IF;
END $$;

-- Set up Row Level Security (RLS) - will update if policy already exists
ALTER TABLE IF EXISTS public.business_assessments ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist to avoid errors on recreation
DROP POLICY IF EXISTS "Allow authenticated users to view form submissions" ON public.business_assessments;
DROP POLICY IF EXISTS "Allow anyone to submit forms with consent" ON public.business_assessments;

-- Recreate policies
CREATE POLICY "Allow authenticated users to view form submissions"
  ON public.business_assessments
  FOR SELECT
  TO authenticated
  USING (true);

-- Check if consent_terms column exists before creating policy with that condition
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.columns 
              WHERE table_schema = 'public' 
              AND table_name = 'business_assessments'
              AND column_name = 'consent_terms') THEN
    -- Create policy with consent_terms check
    EXECUTE 'CREATE POLICY "Allow anyone to submit forms with consent"
      ON public.business_assessments
      FOR INSERT
      TO anon
      WITH CHECK (consent_terms = true)';
  ELSE
    -- Create policy without consent_terms check
    EXECUTE 'CREATE POLICY "Allow anyone to submit forms with consent"
      ON public.business_assessments
      FOR INSERT
      TO anon
      WITH CHECK (true)';
  END IF;
END $$;

-- Create or replace indexes
DROP INDEX IF EXISTS business_assessments_created_at_idx;
DROP INDEX IF EXISTS business_assessments_status_idx;

CREATE INDEX business_assessments_created_at_idx ON public.business_assessments (created_at desc);
CREATE INDEX business_assessments_status_idx ON public.business_assessments (status); 