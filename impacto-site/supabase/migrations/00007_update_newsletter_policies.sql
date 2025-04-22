-- Add public insert policy for newsletter_subscriptions
DO $$ 
BEGIN
  -- First make sure RLS is enabled on the table
  ALTER TABLE IF EXISTS public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
  
  -- Check if policy exists before creating
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'newsletter_subscriptions' 
    AND policyname = 'newsletter_subscriptions_public_insert'
  ) THEN
    CREATE POLICY newsletter_subscriptions_public_insert ON newsletter_subscriptions
      FOR INSERT
      TO public
      WITH CHECK (TRUE);
  END IF;
  
  -- Also create a policy for authenticated users to view all subscriptions
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'newsletter_subscriptions' 
    AND policyname = 'newsletter_subscriptions_auth_read'
  ) THEN
    CREATE POLICY newsletter_subscriptions_auth_read ON newsletter_subscriptions
      FOR SELECT
      TO authenticated
      USING (TRUE);
  END IF;
  
  -- Allow authenticated users to update and delete subscriptions
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'newsletter_subscriptions' 
    AND policyname = 'newsletter_subscriptions_auth_update'
  ) THEN
    CREATE POLICY newsletter_subscriptions_auth_update ON newsletter_subscriptions
      FOR UPDATE
      TO authenticated
      USING (TRUE);
  END IF;
  
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'newsletter_subscriptions' 
    AND policyname = 'newsletter_subscriptions_auth_delete'
  ) THEN
    CREATE POLICY newsletter_subscriptions_auth_delete ON newsletter_subscriptions
      FOR DELETE
      TO authenticated
      USING (TRUE);
  END IF;
END
$$; 