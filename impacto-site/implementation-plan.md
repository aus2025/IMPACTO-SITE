# Blog Fix Implementation Plan

## Problem Overview
The current blog implementation is using `@/utils/supabase/server.ts` which imports `next/headers`. This is causing the build to fail because `next/headers` is only compatible with App Router's Server Components, not with Pages Router components.

## Solution
We need to update all admin blog components to use the new `blog-pages.ts` file (which uses `server-pages.ts`) instead of `blog.ts` (which uses `server.ts`).

## Implementation Steps

### 1. Update blog-pages.ts to add missing functionality
Add the getBlogPostById function to support ID-based lookups:

```typescript
/**
 * Get a blog post by ID (to support the admin edit page route)
 */
export async function getBlogPostById(id: string, includeUnpublished = false): Promise<BlogPost | null> {
  const supabase = await createClient();
  
  let query = supabase
    .from('blog_posts')
    .select('*, blog_categories(*), blog_tags(*), author:profiles(*)')
    .eq('id', id)
    .single();

  if (!includeUnpublished) {
    query = query.eq('published', true);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === 'PGRST116') {
      // Post not found, return null instead of throwing
      return null;
    }
    console.error('Error fetching blog post by ID:', error);
    throw error;
  }

  return formatBlogPost(data);
}
```

### 2. Update BlogPostForm.tsx
1. Update the import to use blog-pages.ts
2. Update the updateBlogPost call to handle the different function signature
3. Update the createBlogPost call to handle the different parameter structure

```typescript
// Update the import
import { createBlogPost, updateBlogPost } from '@/lib/blog-pages';

// Update function calls
// From: await updateBlogPost(post.id, postData, selectedTags);
// To:
const result = await updateBlogPost(String(post.id), {
  ...postData,
  tag_ids: selectedTags,
  published: status === 'published',
});

// From: await createBlogPost(postData, selectedTags);
// To:
const result = await createBlogPost({
  ...postData,
  tag_ids: selectedTags,
  published: status === 'published',
});
```

### 3. Update Admin Blog Page
1. Update the import to use blog-pages.ts
2. Update the getBlogPosts call to handle different parameter names and return format

```typescript
// Update the import
import { getBlogPosts, getBlogCategories } from '@/lib/blog-pages';

// Update function call
const {
  posts,
  pagination: { total: totalCount, totalPages, page }
} = await getBlogPosts({
  page: currentPage,
  pageSize: 10, // "pageSize" instead of "perPage"
  includeUnpublished: status === 'all' || status !== 'published',
  search,
});
```

### 4. Update Edit Page
1. Update the import to use blog-pages.ts
2. Use the new getBlogPostById function from blog-pages.ts

```typescript
// Update the import
import { getBlogPostById, getBlogCategories, getBlogTags } from '@/lib/blog-pages';

// Keep the existing code that uses getBlogPostById
const post = await getBlogPostById(params.id, true); // includeUnpublished=true
```

### 5. Update New Blog Post Page
Update the import to use blog-pages.ts

```typescript
// Update the import
import { getBlogCategories, getBlogTags } from '@/lib/blog-pages';
```

## Testing
After implementing these changes, run `npm run build` to verify that the build succeeds without the `next/headers` error. 