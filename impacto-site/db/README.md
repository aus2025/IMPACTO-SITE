# Database Schema Updates

This directory contains SQL scripts to create and update the database schema for the Impacto application.

## Required Tables

The application requires the following tables to function properly:

1. `assessments` - For storing business assessment form submissions
2. `contact_submissions` - For storing contact form submissions

## How to Apply Schema Updates

### Option 1: Using Supabase SQL Editor (Recommended)

1. Login to your Supabase dashboard
2. Navigate to the SQL Editor
3. Open the file `manual_update_script.sql` from this directory
4. Copy and paste the entire contents into the SQL Editor
5. Click "Run" to execute the SQL

This will create both required tables with appropriate indexes and Row Level Security (RLS) policies.

### Option 2: Using the Automated Script (Node.js)

1. Make sure you have Node.js installed
2. Update the environment variables in `update_schema.bat` with your Supabase URL and service key
3. Run the batch file `update_schema.bat`

### Option 3: Manual Migration

If you prefer to apply changes manually or one at a time:

1. Execute `assessments_schema.sql` to create the assessments table
2. Execute `contact_submissions_schema.sql` to create the contact submissions table

## Verifying the Installation

After applying the schema updates, you can verify that they were applied correctly by:

1. Checking that both tables exist in the Supabase Table Editor
2. Confirming that RLS policies are enabled and configured correctly
3. Testing the forms on the website to make sure they can submit data successfully

## Troubleshooting

If you encounter issues with the forms not submitting data:

1. Check the browser console for any JavaScript errors
2. Verify that the table names in the API code match the created tables
3. Ensure that the RLS policies allow public insertion
4. Check that the environment variables for Supabase connection are set correctly

For additional help, please contact the development team. 