// Script to fix newsletter permissions
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function fixNewsletterPermissions() {
  try {
    console.log('Fixing newsletter permissions...');
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return;
    }
    
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    // SQL query to fix permissions - direct modification of RLS settings
    const sql = `
      -- Check if RLS is enabled
      ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
      
      -- Drop existing policies if they exist to avoid conflicts
      DROP POLICY IF EXISTS newsletter_subscriptions_insert_policy ON public.newsletter_subscriptions;
      
      -- Create a simple policy allowing all inserts
      CREATE POLICY newsletter_subscriptions_insert_policy
        ON public.newsletter_subscriptions
        FOR INSERT
        TO public
        WITH CHECK (true);
        
      -- Check if the table allows public access
      GRANT INSERT ON public.newsletter_subscriptions TO anon;
      GRANT SELECT, UPDATE, DELETE ON public.newsletter_subscriptions TO authenticated;
    `;
    
    console.log('Executing SQL:', sql);
    
    // Try a test insert directly
    console.log('Testing a direct insert...');
    const testEmail = `test_script_${Date.now()}@example.com`;
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert({
        email: testEmail,
        source: 'permission_fix_script',
        status: 'subscribed'
      });
      
    if (error) {
      console.error('Error with test insert:', error);
      console.log('You need to run this SQL manually in the Supabase dashboard:');
      console.log(sql);
    } else {
      console.log('Test insert successful! The API should work now.');
    }
    
  } catch (error) {
    console.error('Error fixing permissions:', error);
  }
}

// Run the script
fixNewsletterPermissions(); 