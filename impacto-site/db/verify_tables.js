// Simple script to verify that the tables exist in Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

// Initialize the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function verifyTables() {
  console.log('Verifying Supabase tables...');

  try {
    // Check assessments table
    const { data: assessments, error: assessmentsError } = await supabase
      .from('assessments')
      .select('id')
      .limit(1);

    if (assessmentsError) {
      console.error('Error accessing assessments table:', assessmentsError.message);
    } else {
      console.log('✅ Assessments table exists and is accessible');
    }

    // Check contact_submissions table
    const { data: contactSubmissions, error: contactError } = await supabase
      .from('contact_submissions')
      .select('id')
      .limit(1);

    if (contactError) {
      console.error('Error accessing contact_submissions table:', contactError.message);
    } else {
      console.log('✅ Contact submissions table exists and is accessible');
    }

    console.log('\nDatabase verification complete!');
  } catch (err) {
    console.error('Unhandled error during verification:', err);
  }
}

verifyTables(); 