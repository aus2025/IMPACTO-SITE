-- This SQL can be run to check if the business_assessments table exists
-- and has the expected structure

-- Check if table exists
SELECT EXISTS (
  SELECT FROM pg_tables 
  WHERE schemaname = 'public' 
  AND tablename = 'business_assessments'
) AS table_exists;

-- If it exists, show its columns and types
SELECT 
  column_name, 
  data_type,
  is_nullable
FROM 
  information_schema.columns
WHERE 
  table_schema = 'public' 
  AND table_name = 'business_assessments'
ORDER BY 
  ordinal_position;

-- Check if RLS is enabled
SELECT 
  tablename,
  rowsecurity 
FROM 
  pg_tables 
WHERE 
  schemaname = 'public' 
  AND tablename = 'business_assessments';

-- Check existing policies
SELECT 
  polname,
  polcmd,
  roles
FROM 
  pg_policy 
WHERE 
  schemaname = 'public' 
  AND tablename = 'business_assessments';

-- Check existing indexes
SELECT
  indexname,
  indexdef
FROM
  pg_indexes
WHERE
  schemaname = 'public'
  AND tablename = 'business_assessments'; 