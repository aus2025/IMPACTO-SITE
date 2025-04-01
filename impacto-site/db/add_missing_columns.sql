-- Add missing columns to business_assessments table

-- Add consent_terms column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'business_assessments'
                 AND column_name = 'consent_terms') THEN
    ALTER TABLE public.business_assessments ADD COLUMN consent_terms boolean DEFAULT FALSE;
  END IF;
END $$;

-- Add consent_marketing column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'business_assessments'
                 AND column_name = 'consent_marketing') THEN
    ALTER TABLE public.business_assessments ADD COLUMN consent_marketing boolean DEFAULT FALSE;
  END IF;
END $$;

-- Check for other possibly missing columns
DO $$ 
BEGIN
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