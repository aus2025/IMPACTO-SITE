import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

// Add dynamic flag for server components that need dynamic rendering
export const dynamic = 'force-dynamic';

export default async function StepByStepFixPage() {
  const supabase = await createClient();
  
  // Define the exact expected schema
  const expectedSchema = {
    tableName: 'blog_posts',
    columns: [
      { name: 'id', type: 'uuid', constraint: 'PRIMARY KEY DEFAULT uuid_generate_v4()' },
      { name: 'title', type: 'text', constraint: 'NOT NULL' },
      { name: 'slug', type: 'text', constraint: 'NOT NULL UNIQUE' },
      { name: 'excerpt', type: 'text', constraint: '' },
      { name: 'content', type: 'text', constraint: '' },
      { name: 'featured_image', type: 'text', constraint: '' },
      { name: 'author_id', type: 'uuid', constraint: '' },
      { name: 'category_id', type: 'integer', constraint: 'REFERENCES blog_categories(id)' },
      { name: 'status', type: 'text', constraint: "DEFAULT 'draft'" },
      { name: 'published_at', type: 'timestamp with time zone', constraint: '' },
      { name: 'created_at', type: 'timestamp with time zone', constraint: 'DEFAULT CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'timestamp with time zone', constraint: 'DEFAULT CURRENT_TIMESTAMP' },
    ]
  };
  
  // Generate SQL to create the table from scratch
  const fullCreateTableSQL = `
-- Extension for UUID support
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop and recreate blog_posts with the correct schema
DROP TABLE IF EXISTS blog_post_tags;
DROP TABLE IF EXISTS blog_posts;

-- Create blog_categories if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add a default category
INSERT INTO blog_categories (name, slug, description)
VALUES ('Uncategorized', 'uncategorized', 'Default category')
ON CONFLICT (slug) DO NOTHING;

-- Create blog_tags if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_tags (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts with the exact expected schema
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    author_id UUID,
    category_id INTEGER REFERENCES blog_categories(id),
    status TEXT DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_post_tags junction table
CREATE TABLE blog_post_tags (
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Add a sample blog post
INSERT INTO blog_posts (title, slug, excerpt, content, status, published_at)
VALUES (
    'Welcome to our blog', 
    'welcome-to-our-blog',
    'This is our first blog post',
    'Welcome to our blog! This is a sample post created automatically.',
    'published',
    CURRENT_TIMESTAMP
)
ON CONFLICT (slug) DO NOTHING;
`;

  // Run fix if requested
  let fixResult = null;
  let fixError = null;
  let shouldFix = false;
  
  // Check if executeSQL function exists
  let functionExists = false;
  
  try {
    const { data, error } = await supabase
      .from('pg_catalog.pg_proc')
      .select('proname')
      .eq('proname', 'execute_sql')
      .limit(1);
      
    functionExists = !error && data && data.length > 0;
  } catch (err) {
    // Ignore error and assume function doesn't exist
  }
  
  // If executeSQL function exists and fix is requested, run it
  if (functionExists && shouldFix) {
    try {
      const { error } = await supabase.rpc('execute_sql', { sql_query: fullCreateTableSQL });
      
      if (error) throw error;
      
      fixResult = "Successfully recreated blog tables with the correct schema";
    } catch (err: any) {
      fixError = err;
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Step-by-Step Blog Fix</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Step 1: Create Reset Schema SQL</h2>
        <p className="mb-4">Copy this SQL script and run it in your Supabase SQL Editor to completely reset and fix your blog tables:</p>
        
        <div className="bg-gray-100 p-4 rounded-lg overflow-auto mb-4">
          <pre className="text-sm whitespace-pre-wrap">{fullCreateTableSQL}</pre>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <p className="font-bold text-blue-700">Important Note:</p>
          <p className="text-blue-700">This script will drop and recreate your blog tables. Existing data will be lost. If you have valuable data, backup your tables first.</p>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Step 2: Run the Script</h2>
        <ol className="list-decimal pl-5 mb-4">
          <li className="mb-2">Go to the Supabase dashboard</li>
          <li className="mb-2">Navigate to the SQL Editor</li>
          <li className="mb-2">Create a new query</li>
          <li className="mb-2">Paste the SQL script from Step 1</li>
          <li className="mb-2">Click "Run" to execute the script</li>
        </ol>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Step 3: Test Your Blog</h2>
        <p className="mb-4">After running the script, try accessing your blog page again. Your blog should now work correctly since the database schema exactly matches what your Next.js code expects.</p>
        
        <Link href="/blog" className="cta-button-global">
          Go to Blog
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Expected Schema</h2>
        <p className="mb-4">Your blog_posts table should have these exact columns:</p>
        
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Column Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Data Type
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Constraints
              </th>
            </tr>
          </thead>
          <tbody>
            {expectedSchema.columns.map((column, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {column.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {column.type}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {column.constraint}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Step-by-Step Blog Fix | Impacto ONG',
  description: 'Reset and fix your blog database schema',
}; 