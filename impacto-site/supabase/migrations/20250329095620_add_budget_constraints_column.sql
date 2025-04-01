-- This migration adds the budget_constraints column to the business_assessments table
-- This is needed to fix the form submission error

-- First check if the column already exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'business_assessments' 
    AND column_name = 'budget_constraints'
  ) THEN
    -- Add the missing column if it doesn't exist
    ALTER TABLE public.business_assessments ADD COLUMN budget_constraints TEXT;
    
    -- Add a comment to the column
    COMMENT ON COLUMN public.business_assessments.budget_constraints IS 'Specific budget constraints or considerations that might affect the investment in automation.';
  END IF;
END
$$;
