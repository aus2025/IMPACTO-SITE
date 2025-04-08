# Database Setup for Impacto AI

This directory contains database schema files and scripts for the Impacto AI application.

## Setting up the Business Assessment Form in Supabase

### Prerequisites
- A Supabase account and project
- Access to the Supabase SQL Editor

### Steps to Set Up the Business Assessment Table

1. Log in to your Supabase account and open your project
2. Navigate to the SQL Editor in the Supabase dashboard
3. Click "New Query"
4. Copy the entire contents of `business_assessment_schema.sql` into the SQL editor
5. Click "Run" to execute the SQL and create the table

### Environment Variables

After setting up your Supabase project, you need to add your Supabase credentials to the `.env.local` file in the root of the project. Use the `.env.local.example` file as a template.

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase URL and anon key:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

You can find these values in your Supabase project settings under "API".

### Testing the Form Submission

After setting up the table and environment variables:

1. Start the development server: `npm run dev`
2. Navigate to `/assessment` in your browser
3. Fill out and submit the form
4. Check your Supabase project's "Table Editor" to see if the data was inserted into the `business_assessments` table

### Troubleshooting

If submissions are failing, check:

1. The browser console for detailed error messages
2. Ensure your Supabase anon key has permissions to insert records
3. Verify that the `business_assessments` table has the correct structure
4. Check that your Row Level Security (RLS) policies are correctly configured

For more details about the database schema and design, refer to the `business_assessment_schema.sql` file. 