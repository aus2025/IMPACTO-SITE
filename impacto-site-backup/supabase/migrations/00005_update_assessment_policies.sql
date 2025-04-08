-- Drop existing policies
DROP POLICY IF EXISTS "Allow admins to manage all posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow admins to manage categories" ON blog_categories;
DROP POLICY IF EXISTS "Allow admins to manage tags" ON blog_tags;
DROP POLICY IF EXISTS "Allow admins to manage all comments" ON blog_comments;

-- Update assessment policies
DROP POLICY IF EXISTS "business_assessments_insert_policy" ON business_assessments;
DROP POLICY IF EXISTS "business_assessments_all_policy" ON business_assessments;
DROP POLICY IF EXISTS "Allow authenticated users to view all assessments" ON business_assessments;
DROP POLICY IF EXISTS "Allow authenticated users to insert assessments" ON business_assessments;
DROP POLICY IF EXISTS "Allow public users to insert assessments" ON business_assessments;
DROP POLICY IF EXISTS "Allow authenticated users to update assessments" ON business_assessments;
DROP POLICY IF EXISTS "Allow authenticated users to delete assessments" ON business_assessments;

-- Create new assessment policies
CREATE POLICY "Allow public to submit assessments"
ON business_assessments
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view assessments"
ON business_assessments
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to update assessments"
ON business_assessments
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete assessments"
ON business_assessments
FOR DELETE
TO authenticated
USING (true); 