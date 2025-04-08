# Blog System Troubleshooting

This document provides instructions for resolving issues with the blog system in the Impacto site.

## Common Issues

1. **Missing Tables**: The most common issue is that the blog tables don't exist in your Supabase database.
2. **Connection Problems**: Issues connecting to the Supabase database.
3. **Missing `execute_sql` Function**: The function required for table initialization is missing.

## Diagnostic Tools

We've created several diagnostic pages to help identify and fix issues:

- **/blog/fixed**: A client-side implementation with better error handling.
- **/blog/debug-tables**: Checks if the required blog tables exist.
- **/blog/init-tables**: Initializes the blog tables in your Supabase database.
- **/blog/test-connection**: Tests the connection to your Supabase database.

## Step-by-Step Resolution

### 1. Check Your Supabase Connection

Visit `/blog/test-connection` to verify that your application can connect to Supabase.

If the connection fails:
- Verify your environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Check that your Supabase project is running.
- Verify network connectivity.

### 2. Create the `execute_sql` Function

Before you can initialize the blog tables, you need to create the `execute_sql` function in your Supabase database:

1. Open your Supabase dashboard and navigate to the SQL Editor.
2. Run the following SQL:

```sql
-- Create a function to execute SQL statements dynamically
CREATE OR REPLACE FUNCTION execute_sql(sql_query TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE sql_query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION execute_sql(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION execute_sql(TEXT) TO anon;
```

### 3. Check If Blog Tables Exist

Visit `/blog/debug-tables` to see if the required blog tables exist in your database.

If tables are missing, continue to the next step.

### 4. Initialize Blog Tables

Visit `/blog/init-tables` and click the "Initialize Blog System" button to create the necessary tables.

This will create:
- `blog_categories`: Categories for blog posts
- `blog_tags`: Tags for blog posts
- `blog_posts`: The main blog posts table
- `blog_post_tags`: Junction table for posts and tags

### 5. Try the Fixed Blog Implementation

Visit `/blog/fixed` to use the client-side implementation with better error handling.

This version:
- Checks if tables exist before trying to query them
- Provides clearer error messages
- Has a more robust implementation for handling missing tables

### 6. Return to the Original Blog

Once everything is working correctly, you can return to `/blog` to use the original server-side implementation.

## Technical Details

### Table Structure

The blog system uses the following tables:

1. **blog_categories**
   - id (PRIMARY KEY)
   - name
   - slug (UNIQUE)
   - description
   - created_at

2. **blog_tags**
   - id (PRIMARY KEY)
   - name
   - slug (UNIQUE)
   - created_at

3. **blog_posts**
   - id (PRIMARY KEY)
   - title
   - slug (UNIQUE)
   - excerpt
   - content
   - featured_image
   - author_id
   - category_id (FOREIGN KEY to blog_categories)
   - status
   - view_count
   - published_at
   - created_at
   - updated_at

4. **blog_post_tags**
   - post_id (FOREIGN KEY to blog_posts)
   - tag_id (FOREIGN KEY to blog_tags)
   - PRIMARY KEY (post_id, tag_id)

## Troubleshooting

If you continue to have issues:

1. **Check Console Errors**: Open your browser's developer tools to check for JavaScript errors.
2. **Review Server Logs**: Check your Next.js server logs for backend errors.
3. **Verify SQL Queries**: Ensure that the SQL queries being executed are correct.
4. **Check RLS Policies**: Ensure that your Supabase Row Level Security (RLS) policies allow the necessary operations.

## Need More Help?

If you're still experiencing issues, please reach out to the development team for further assistance. 