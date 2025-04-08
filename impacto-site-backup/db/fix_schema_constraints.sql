-- Fix NOT NULL constraints on the business_assessments table
DO $$ 
BEGIN
  -- Check if contact_name has a NOT NULL constraint and alter it if needed
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'business_assessments'
    AND column_name = 'contact_name'
    AND is_nullable = 'NO'
  ) THEN
    -- Make column nullable
    ALTER TABLE public.business_assessments ALTER COLUMN contact_name DROP NOT NULL;
  END IF;

  -- Check if company_name has a NOT NULL constraint and alter it if needed
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'business_assessments'
    AND column_name = 'company_name'
    AND is_nullable = 'NO'
  ) THEN
    -- Make column nullable
    ALTER TABLE public.business_assessments ALTER COLUMN company_name DROP NOT NULL;
  END IF;
  
  -- Check if contact_email has a NOT NULL constraint and alter it if needed
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'business_assessments'
    AND column_name = 'contact_email'
    AND is_nullable = 'NO'
  ) THEN
    -- Make column nullable
    ALTER TABLE public.business_assessments ALTER COLUMN contact_email DROP NOT NULL;
  END IF;
  
  -- Check if any other NOT NULL constraint is causing issues
  -- First fix the full_name and email columns if they're not nullable
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'business_assessments'
    AND column_name = 'full_name'
    AND is_nullable = 'NO'
  ) AND EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'business_assessments'
    AND column_name = 'contact_name'
  ) THEN
    -- Update full_name from contact_name where possible
    EXECUTE 'UPDATE public.business_assessments SET full_name = contact_name WHERE full_name IS NULL AND contact_name IS NOT NULL';
    -- Then make nullable if we still have null values
    IF EXISTS (SELECT 1 FROM public.business_assessments WHERE full_name IS NULL) THEN
      ALTER TABLE public.business_assessments ALTER COLUMN full_name DROP NOT NULL;
    END IF;
  END IF;
  
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'business_assessments'
    AND column_name = 'email'
    AND is_nullable = 'NO'
  ) AND EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'business_assessments'
    AND column_name = 'contact_email'
  ) THEN
    -- Update email from contact_email where possible
    EXECUTE 'UPDATE public.business_assessments SET email = contact_email WHERE email IS NULL AND contact_email IS NOT NULL';
    -- Then make nullable if we still have null values
    IF EXISTS (SELECT 1 FROM public.business_assessments WHERE email IS NULL) THEN
      ALTER TABLE public.business_assessments ALTER COLUMN email DROP NOT NULL;
    END IF;
  END IF;
END $$; 