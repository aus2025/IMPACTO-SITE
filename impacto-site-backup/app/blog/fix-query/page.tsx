import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

// Add dynamic flag for server components that need dynamic rendering
export const dynamic = 'force-dynamic';

export default async function FixQueryPage() {
  const supabase = createClient();
  
  // Check existing tables
  let blogTables = null;
  let tablesError = null;
  
  try {
    const { data, error } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
      .ilike('tablename', 'blog%');
      
    if (error) {
      tablesError = error;
    } else {
      blogTables = data?.map(t => t.tablename) || [];
    }
  } catch (err: any) {
    tablesError = err;
  }
  
  // Check blog_posts structure
  let columnIssues = [];
  let columnFixSQL = [];
  
  const requiredColumns = [
    { name: 'id', type: 'uuid', constraint: 'PRIMARY KEY DEFAULT uuid_generate_v4()' },
    { name: 'title', type: 'text', constraint: 'NOT NULL' },
    { name: 'slug', type: 'text', constraint: 'NOT NULL UNIQUE' },
    { name: 'content', type: 'text', constraint: '' },
    { name: 'excerpt', type: 'text', constraint: '' },
    { name: 'featured_image', type: 'text', constraint: '' },
    { name: 'status', type: 'text', constraint: "DEFAULT 'draft'" },
    { name: 'published_at', type: 'timestamp with time zone', constraint: '' },
    { name: 'created_at', type: 'timestamp with time zone', constraint: 'DEFAULT CURRENT_TIMESTAMP' },
    { name: 'updated_at', type: 'timestamp with time zone', constraint: 'DEFAULT CURRENT_TIMESTAMP' },
    { name: 'category_id', type: 'integer', constraint: 'REFERENCES blog_categories(id)' },
    { name: 'author_id', type: 'uuid', constraint: '' }
  ];
  
  if (blogTables && blogTables.includes('blog_posts')) {
    try {
      // Check columns in blog_posts
      const { data: columns, error } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable')
        .eq('table_name', 'blog_posts')
        .eq('table_schema', 'public');
      
      if (error) throw error;
      
      // Find missing columns
      for (const required of requiredColumns) {
        const found = columns?.find(col => col.column_name === required.name);
        if (!found) {
          columnIssues.push(`Missing column: ${required.name} (${required.type})`);
          columnFixSQL.push(`ALTER TABLE blog_posts ADD COLUMN ${required.name} ${required.type} ${required.constraint};`);
        } else if (found.data_type !== required.type.replace(/ with time zone$/, '')) {
          // Special case for timestamp columns
          if (
            !(found.data_type === 'timestamp' && required.type === 'timestamp with time zone') &&
            !(found.data_type === 'timestamptz' && required.type === 'timestamp with time zone')
          ) {
            columnIssues.push(`Column type mismatch: ${required.name} is ${found.data_type}, should be ${required.type}`);
            columnFixSQL.push(`ALTER TABLE blog_posts ALTER COLUMN ${required.name} TYPE ${required.type};`);
          }
        }
      }
    } catch (err: any) {
      columnIssues.push(`Error checking columns: ${err.message}`);
    }
  }
  
  // Check for missing blog_categories table
  const missingCategoriesTable = blogTables && !blogTables.includes('blog_categories');
  
  // Generate SQL to fix issues
  const createCategoriesSQL = `
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add a default category
INSERT INTO public.blog_categories (name, slug, description)
VALUES ('Uncategorized', 'uncategorized', 'Default category') 
ON CONFLICT (slug) DO NOTHING;
  `;
  
  // Attempt to fix column issues if needed
  let fixResult = null;
  let fixError = null;
  
  if (columnIssues.length > 0 || missingCategoriesTable) {
    try {
      // Create categories table first if missing
      if (missingCategoriesTable) {
        await supabase.rpc('execute_sql', { sql_query: createCategoriesSQL });
      }
      
      // Fix column issues
      for (const sql of columnFixSQL) {
        await supabase.rpc('execute_sql', { sql_query: sql });
      }
      
      fixResult = "Fixed database issues successfully";
    } catch (err: any) {
      fixError = err;
    }
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Database Fix</h1>
      
      {tablesError ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error checking blog tables:</p>
          <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(tablesError, null, 2)}</pre>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Blog Tables</h2>
          <div className="bg-gray-100 p-3 rounded">
            <p className="mb-2">Found blog tables:</p>
            <ul className="list-disc pl-5">
              {blogTables?.map((table, index) => (
                <li key={index} className={table === 'blog_posts' ? 'font-bold' : ''}>
                  {table} {table === 'blog_posts' && '(main table)'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {columnIssues.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Column Issues</h2>
          <div className="bg-yellow-100 p-3 rounded">
            <p className="mb-2">Found {columnIssues.length} issues with blog_posts columns:</p>
            <ul className="list-disc pl-5">
              {columnIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {missingCategoriesTable && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Missing Categories Table</h2>
          <div className="bg-yellow-100 p-3 rounded">
            <p>The blog_categories table is missing and needs to be created.</p>
          </div>
        </div>
      )}
      
      {(columnIssues.length > 0 || missingCategoriesTable) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Fix Result</h2>
          {fixError ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">Error fixing issues:</p>
              <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(fixError, null, 2)}</pre>
            </div>
          ) : (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p className="font-bold">Success!</p>
              <p>{fixResult}</p>
            </div>
          )}
        </div>
      )}
      
      {columnIssues.length === 0 && !missingCategoriesTable && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">No Issues Found</h2>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p>Your blog database structure looks good! If you're still having issues, check:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Blog posts query code in lib/blog.ts</li>
              <li>Data types in types/blog.ts</li>
              <li>Network or permissions issues</li>
            </ul>
          </div>
        </div>
      )}
      
      <div className="flex gap-4 mt-6">
        <Link href="/blog" className="cta-button-global">
          Return to Blog
        </Link>
        <Link href="/blog/static-debug" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Debug Static Version
        </Link>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Fix Blog Database | Impacto ONG',
  description: 'Fix database issues in the blog system',
}; 