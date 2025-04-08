-- Add missing columns to business_assessments table
DO $$ 
BEGIN
  -- First make sure the table exists
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_assessments') THEN
    CREATE TABLE public.business_assessments (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
      company TEXT,
      budget_constraints TEXT
    );
  ELSE
    -- Add company field if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'business_assessments'
                  AND column_name = 'company') THEN
      ALTER TABLE public.business_assessments ADD COLUMN company TEXT;
    END IF;

    -- Add budget_constraints if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'business_assessments'
                  AND column_name = 'budget_constraints') THEN
      ALTER TABLE public.business_assessments ADD COLUMN budget_constraints TEXT;
    END IF;

    -- Handle company_name to company mapping if needed
    IF EXISTS (SELECT FROM information_schema.columns 
              WHERE table_schema = 'public' 
              AND table_name = 'business_assessments'
              AND column_name = 'company_name') 
    AND EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'company') THEN
      
      -- Update company with values from company_name where company is null
      EXECUTE 'UPDATE public.business_assessments SET company = company_name WHERE company IS NULL';
    END IF;
  END IF;
  
  -- Add all other potentially missing columns that might be in templates
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'full_name') THEN
    ALTER TABLE public.business_assessments ADD COLUMN full_name TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'email') THEN
    ALTER TABLE public.business_assessments ADD COLUMN email TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'phone') THEN
    ALTER TABLE public.business_assessments ADD COLUMN phone TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'role') THEN
    ALTER TABLE public.business_assessments ADD COLUMN role TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'industry') THEN
    ALTER TABLE public.business_assessments ADD COLUMN industry TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'employees') THEN
    ALTER TABLE public.business_assessments ADD COLUMN employees TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'automation_experience') THEN
    ALTER TABLE public.business_assessments ADD COLUMN automation_experience TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'automation_timeline') THEN
    ALTER TABLE public.business_assessments ADD COLUMN automation_timeline TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'budget_range') THEN
    ALTER TABLE public.business_assessments ADD COLUMN budget_range TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'decision_timeline') THEN
    ALTER TABLE public.business_assessments ADD COLUMN decision_timeline TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'consent_terms') THEN
    ALTER TABLE public.business_assessments ADD COLUMN consent_terms BOOLEAN DEFAULT FALSE;
  END IF;

  -- Add essential array fields
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'goals') THEN
    ALTER TABLE public.business_assessments ADD COLUMN goals TEXT[];
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'automation_areas') THEN
    ALTER TABLE public.business_assessments ADD COLUMN automation_areas TEXT[];
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'existing_systems') THEN
    ALTER TABLE public.business_assessments ADD COLUMN existing_systems TEXT[];
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'investment_factors') THEN
    ALTER TABLE public.business_assessments ADD COLUMN investment_factors TEXT[];
  END IF;
  
  -- Final metadata fields
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'status') THEN
    ALTER TABLE public.business_assessments ADD COLUMN status TEXT DEFAULT 'new';
  END IF;
  
  -- Make sure created_at exists
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'created_at') THEN
    ALTER TABLE public.business_assessments ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
  END IF;
END $$; 