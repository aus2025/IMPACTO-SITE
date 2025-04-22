// Script to directly apply newsletter subscription policies to Supabase
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function applyNewsletterPolicies() {
  console.log('Starting to apply newsletter policies...');
  
  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Error: Missing Supabase environment variables.');
    console.log('Make sure .env.local file exists with:');
    console.log('- NEXT_PUBLIC_SUPABASE_URL');
    console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
    return;
  }
  
  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  try {
    // Simple direct SQL execution - enable RLS and create policy
    const sql = `
      -- First make sure RLS is enabled on the table
      ALTER TABLE IF EXISTS public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
      
      -- Remove any existing policies to avoid conflicts
      DROP POLICY IF EXISTS newsletter_subscriptions_public_insert ON newsletter_subscriptions;
      
      -- Create insert policy for public
      CREATE POLICY newsletter_subscriptions_public_insert ON newsletter_subscriptions
        FOR INSERT
        TO public
        WITH CHECK (TRUE);
    `;
    
    console.log('Executing SQL:');
    console.log(sql);
    
    // Execute the SQL directly against Supabase
    // NOTE: This requires admin privileges which may not be available with the anon key
    // You might need to use the Supabase Dashboard SQL Editor instead
    const { error } = await supabase.rpc('pgexecute', { query: sql });
    
    if (error) {
      console.error('❌ Error applying policy:', error);
      console.log('\nIMPORTANT: You may need to apply this SQL manually through the Supabase Dashboard:');
      console.log(sql);
    } else {
      console.log('✅ Successfully applied newsletter subscription policies!');
    }
    
    // Test the policy with a subscription
    const testEmail = `test_policy_${Date.now()}@example.com`;
    const { data, error: insertError } = await supabase
      .from('newsletter_subscriptions')
      .insert([
        {
          email: testEmail,
          source: 'policy_test',
          status: 'subscribed'
        }
      ])
      .select();
    
    if (insertError) {
      console.error('❌ Test subscription failed:', insertError);
    } else {
      console.log('✅ Test subscription successful!', data);
    }
    
  } catch (error) {
    console.error('Error applying newsletter policies:', error);
    console.log('You may need to apply the policies manually through the Supabase Dashboard.');
  }
}

// Run the function
applyNewsletterPolicies(); 