-- Add ALL missing columns to business_assessments table
-- This script adds any columns that might be missing from the original schema

DO $$ 
BEGIN
  -- Required key columns
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'status') THEN
    ALTER TABLE public.business_assessments ADD COLUMN status text DEFAULT 'new';
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'created_at') THEN
    ALTER TABLE public.business_assessments ADD COLUMN created_at timestamptz DEFAULT now() NOT NULL;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'assigned_to') THEN
    ALTER TABLE public.business_assessments ADD COLUMN assigned_to text;
  END IF;

  -- Consent columns  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'consent_terms') THEN
    ALTER TABLE public.business_assessments ADD COLUMN consent_terms boolean DEFAULT FALSE;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'consent_marketing') THEN
    ALTER TABLE public.business_assessments ADD COLUMN consent_marketing boolean DEFAULT FALSE;
  END IF;

  -- All other text columns
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'patient_data') THEN
    ALTER TABLE public.business_assessments ADD COLUMN patient_data text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'inventory_management') THEN
    ALTER TABLE public.business_assessments ADD COLUMN inventory_management text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'customer_loyalty') THEN
    ALTER TABLE public.business_assessments ADD COLUMN customer_loyalty text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'owner_involvement') THEN
    ALTER TABLE public.business_assessments ADD COLUMN owner_involvement text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'growth_challenges') THEN
    ALTER TABLE public.business_assessments ADD COLUMN growth_challenges text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'integration_complexity') THEN
    ALTER TABLE public.business_assessments ADD COLUMN integration_complexity text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'decision_makers') THEN
    ALTER TABLE public.business_assessments ADD COLUMN decision_makers text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'document_volume') THEN
    ALTER TABLE public.business_assessments ADD COLUMN document_volume text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'cs_ticket_volume') THEN
    ALTER TABLE public.business_assessments ADD COLUMN cs_ticket_volume text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'automation_experience') THEN
    ALTER TABLE public.business_assessments ADD COLUMN automation_experience text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'specific_challenges') THEN
    ALTER TABLE public.business_assessments ADD COLUMN specific_challenges text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'automation_timeline') THEN
    ALTER TABLE public.business_assessments ADD COLUMN automation_timeline text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'budget_range') THEN
    ALTER TABLE public.business_assessments ADD COLUMN budget_range text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'funding_source') THEN
    ALTER TABLE public.business_assessments ADD COLUMN funding_source text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'decision_timeline') THEN
    ALTER TABLE public.business_assessments ADD COLUMN decision_timeline text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'expected_roi') THEN
    ALTER TABLE public.business_assessments ADD COLUMN expected_roi text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'previous_investments') THEN
    ALTER TABLE public.business_assessments ADD COLUMN previous_investments text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'budget_constraints') THEN
    ALTER TABLE public.business_assessments ADD COLUMN budget_constraints text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'referral_source') THEN
    ALTER TABLE public.business_assessments ADD COLUMN referral_source text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'consultation_preference') THEN
    ALTER TABLE public.business_assessments ADD COLUMN consultation_preference text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'preferred_timeline') THEN
    ALTER TABLE public.business_assessments ADD COLUMN preferred_timeline text;
  END IF;

  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'additional_comments') THEN
    ALTER TABLE public.business_assessments ADD COLUMN additional_comments text;
  END IF;

  -- Array columns
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'goals') THEN
    ALTER TABLE public.business_assessments ADD COLUMN goals text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'compliance_concerns') THEN
    ALTER TABLE public.business_assessments ADD COLUMN compliance_concerns text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'sales_channels') THEN
    ALTER TABLE public.business_assessments ADD COLUMN sales_channels text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'departments_involved') THEN
    ALTER TABLE public.business_assessments ADD COLUMN departments_involved text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'automation_areas') THEN
    ALTER TABLE public.business_assessments ADD COLUMN automation_areas text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'document_types') THEN
    ALTER TABLE public.business_assessments ADD COLUMN document_types text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'cs_channels') THEN
    ALTER TABLE public.business_assessments ADD COLUMN cs_channels text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'existing_systems') THEN
    ALTER TABLE public.business_assessments ADD COLUMN existing_systems text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'investment_factors') THEN
    ALTER TABLE public.business_assessments ADD COLUMN investment_factors text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'additional_stakeholders') THEN
    ALTER TABLE public.business_assessments ADD COLUMN additional_stakeholders text[] DEFAULT '{}';
  END IF;
END $$;

-- Update Row Level Security (RLS)
ALTER TABLE public.business_assessments ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist to avoid errors on recreation
DROP POLICY IF EXISTS "Allow authenticated users to view form submissions" ON public.business_assessments;
DROP POLICY IF EXISTS "Allow anyone to submit forms with consent" ON public.business_assessments;

-- Recreate policies
CREATE POLICY "Allow authenticated users to view form submissions"
  ON public.business_assessments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow anyone to submit forms with consent"
  ON public.business_assessments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create or replace indexes
DROP INDEX IF EXISTS business_assessments_created_at_idx;
DROP INDEX IF EXISTS business_assessments_status_idx;

CREATE INDEX business_assessments_created_at_idx ON public.business_assessments (created_at desc);
CREATE INDEX business_assessments_status_idx ON public.business_assessments (status);
``` 