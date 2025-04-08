-- Fix all column issues in the business_assessments table
DO $$ 
BEGIN
  -- First ensure the table exists
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_assessments') THEN
    CREATE TABLE public.business_assessments (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      contact_name TEXT,
      contact_email TEXT,
      company TEXT,
      company_name TEXT,
      phone TEXT
    );
  END IF;

  -- Essential columns used by the assessment form
  -- Contact info section
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
                AND column_name = 'company') THEN
    ALTER TABLE public.business_assessments ADD COLUMN company TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'role') THEN
    ALTER TABLE public.business_assessments ADD COLUMN role TEXT;
  END IF;

  -- Old column names used in legacy schema
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'contact_name') THEN
    ALTER TABLE public.business_assessments ADD COLUMN contact_name TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'contact_email') THEN
    ALTER TABLE public.business_assessments ADD COLUMN contact_email TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'company_name') THEN
    ALTER TABLE public.business_assessments ADD COLUMN company_name TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'contact_phone') THEN
    ALTER TABLE public.business_assessments ADD COLUMN contact_phone TEXT;
  END IF;
  
  -- Business info section columns
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
                AND column_name = 'patient_data') THEN
    ALTER TABLE public.business_assessments ADD COLUMN patient_data TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'inventory_management') THEN
    ALTER TABLE public.business_assessments ADD COLUMN inventory_management TEXT;
  END IF;
  
  -- Automation needs section
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
                AND column_name = 'document_volume') THEN
    ALTER TABLE public.business_assessments ADD COLUMN document_volume TEXT;
  END IF;
  
  -- Budget section
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'budget_range') THEN
    ALTER TABLE public.business_assessments ADD COLUMN budget_range TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'funding_source') THEN
    ALTER TABLE public.business_assessments ADD COLUMN funding_source TEXT;
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
                AND column_name = 'budget_constraints') THEN
    ALTER TABLE public.business_assessments ADD COLUMN budget_constraints TEXT;
  END IF;
  
  -- Additional info section
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'referral_source') THEN
    ALTER TABLE public.business_assessments ADD COLUMN referral_source TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'consultation_preference') THEN
    ALTER TABLE public.business_assessments ADD COLUMN consultation_preference TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'additional_comments') THEN
    ALTER TABLE public.business_assessments ADD COLUMN additional_comments TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'consent_terms') THEN
    ALTER TABLE public.business_assessments ADD COLUMN consent_terms BOOLEAN DEFAULT FALSE;
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'consent_marketing') THEN
    ALTER TABLE public.business_assessments ADD COLUMN consent_marketing BOOLEAN DEFAULT FALSE;
  END IF;

  -- Array fields
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'goals') THEN
    ALTER TABLE public.business_assessments ADD COLUMN goals TEXT[];
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'compliance_concerns') THEN
    ALTER TABLE public.business_assessments ADD COLUMN compliance_concerns TEXT[];
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'sales_channels') THEN
    ALTER TABLE public.business_assessments ADD COLUMN sales_channels TEXT[];
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
                AND column_name = 'document_types') THEN
    ALTER TABLE public.business_assessments ADD COLUMN document_types TEXT[];
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'cs_channels') THEN
    ALTER TABLE public.business_assessments ADD COLUMN cs_channels TEXT[];
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
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'additional_stakeholders') THEN
    ALTER TABLE public.business_assessments ADD COLUMN additional_stakeholders TEXT[];
  END IF;
  
  -- Meta columns
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'status') THEN
    ALTER TABLE public.business_assessments ADD COLUMN status TEXT DEFAULT 'new';
  END IF;
  
  IF NOT EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'assigned_to') THEN
    ALTER TABLE public.business_assessments ADD COLUMN assigned_to TEXT;
  END IF;

  -- Set up column mappings and defaults
  -- Handle contact_name and full_name sync
  IF EXISTS (SELECT FROM information_schema.columns 
              WHERE table_schema = 'public' 
              AND table_name = 'business_assessments'
              AND column_name = 'contact_name') 
     AND EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'full_name') THEN
    
    -- Update contact_name with values from full_name where contact_name is null
    EXECUTE 'UPDATE public.business_assessments SET contact_name = full_name WHERE contact_name IS NULL AND full_name IS NOT NULL';
    
    -- Update full_name with values from contact_name where full_name is null
    EXECUTE 'UPDATE public.business_assessments SET full_name = contact_name WHERE full_name IS NULL AND contact_name IS NOT NULL';
  END IF;
  
  -- Handle contact_email and email sync
  IF EXISTS (SELECT FROM information_schema.columns 
              WHERE table_schema = 'public' 
              AND table_name = 'business_assessments'
              AND column_name = 'contact_email') 
     AND EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'email') THEN
    
    -- Update contact_email with values from email where contact_email is null
    EXECUTE 'UPDATE public.business_assessments SET contact_email = email WHERE contact_email IS NULL AND email IS NOT NULL';
    
    -- Update email with values from contact_email where email is null
    EXECUTE 'UPDATE public.business_assessments SET email = contact_email WHERE email IS NULL AND contact_email IS NOT NULL';
  END IF;
  
  -- Handle company_name and company sync
  IF EXISTS (SELECT FROM information_schema.columns 
              WHERE table_schema = 'public' 
              AND table_name = 'business_assessments'
              AND column_name = 'company_name') 
     AND EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'company') THEN
    
    -- Update company_name with values from company where company_name is null
    EXECUTE 'UPDATE public.business_assessments SET company_name = company WHERE company_name IS NULL AND company IS NOT NULL';
    
    -- Update company with values from company_name where company is null
    EXECUTE 'UPDATE public.business_assessments SET company = company_name WHERE company IS NULL AND company_name IS NOT NULL';
  END IF;
  
  -- Handle contact_phone and phone sync
  IF EXISTS (SELECT FROM information_schema.columns 
              WHERE table_schema = 'public' 
              AND table_name = 'business_assessments'
              AND column_name = 'contact_phone') 
     AND EXISTS (SELECT FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'business_assessments'
                AND column_name = 'phone') THEN
    
    -- Update contact_phone with values from phone where contact_phone is null
    EXECUTE 'UPDATE public.business_assessments SET contact_phone = phone WHERE contact_phone IS NULL AND phone IS NOT NULL';
    
    -- Update phone with values from contact_phone where phone is null
    EXECUTE 'UPDATE public.business_assessments SET phone = contact_phone WHERE phone IS NULL AND contact_phone IS NOT NULL';
  END IF;

  -- Make sure NOT NULL constraints are properly managed (if needed)
  -- First we need to check if there are NOT NULL constraints causing issues
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'business_assessments'
    AND column_name = 'contact_name'
    AND is_nullable = 'NO'
  ) THEN
    -- Try to ensure we have data before enforcing constraint
    EXECUTE 'UPDATE public.business_assessments SET contact_name = full_name WHERE contact_name IS NULL AND full_name IS NOT NULL';
    EXECUTE 'UPDATE public.business_assessments SET contact_name = ''Unknown'' WHERE contact_name IS NULL';
  END IF;
END $$; 