// Script to execute SQL files against Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Environment variables - you'll need to set these before running the script
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY');
  process.exit(1);
}

// Initialize the Supabase client with admin privileges
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// List of schema files to execute
const schemaFiles = [
  'contact_submissions_schema.sql',
  'assessments_schema.sql'
];

async function applySchemaUpdates() {
  console.log('Starting database schema updates...');

  for (const file of schemaFiles) {
    try {
      console.log(`Applying schema from: ${file}`);
      const filePath = path.join(__dirname, file);
      const sqlContent = fs.readFileSync(filePath, 'utf8');
      
      // Execute the SQL against Supabase
      const { error } = await supabase.rpc('exec_sql', { sql: sqlContent });
      
      if (error) {
        console.error(`Error applying schema from ${file}:`, error);
      } else {
        console.log(`Successfully applied schema from: ${file}`);
      }
    } catch (err) {
      console.error(`Failed to process file ${file}:`, err);
    }
  }

  console.log('Schema update process completed.');
}

applySchemaUpdates()
  .catch(err => {
    console.error('Unhandled error in schema update process:', err);
    process.exit(1);
  }); 