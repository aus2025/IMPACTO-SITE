-- Check if the newsletter_subscriptions table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'newsletter_subscriptions'
) as table_exists;

-- If it exists, check the columns
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM 
  information_schema.columns
WHERE 
  table_schema = 'public' 
  AND table_name = 'newsletter_subscriptions'
ORDER BY 
  ordinal_position;

-- Check if any RLS policies are applied
SELECT
  polname as policy_name,
  polcmd as command,
  polroles as roles,
  permissive
FROM pg_policy
WHERE tablename = 'newsletter_subscriptions';

-- Check existing indexes
SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'newsletter_subscriptions';

-- Count records (if any)
SELECT 
  status,
  COUNT(*) as count
FROM 
  newsletter_subscriptions
GROUP BY
  status; 