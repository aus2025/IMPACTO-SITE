# All Required Fixes for the Blog Feature

## Background
The current build is failing because `server.ts` imports `next/headers` which is only compatible with App Router's Server Components. This is causing issues when these components try to run in the Pages Router context. We need to update all admin blog components to use the `server-pages.ts` Supabase client instead.

## Required Changes

### 1. BlogPostForm.tsx
```tsx
// Change from:
import { createBlogPost, updateBlogPost } from '@/lib/blog';
// to:
import { createBlogPost, updateBlogPost } from '@/lib/blog-pages';
```

Note: The function signatures are different. In `blog-pages.ts`:
- `updateBlogPost` takes an ID as a string (not number)
- `updateBlogPost` returns the updated post, not void

### 2. Admin Blog Page
```tsx
// Change from:
import { getBlogPosts, getBlogCategories } from '@/lib/blog';
// to:
import { getBlogPosts, getBlogCategories } from '@/lib/blog-pages';
```

Note: The pagination parameter in `blog-pages.ts` is called `pageSize` instead of `perPage`.

### 3. New Blog Post Page
```tsx
// Change from:
import { getBlogCategories, getBlogTags } from '@/lib/blog';
// to:
import { getBlogCategories, getBlogTags } from '@/lib/blog-pages';
```

### 4. Edit Blog Post Page
```tsx
// Change from:
import { getBlogPostById, getBlogCategories, getBlogTags } from '@/lib/blog';
// to:
import { getBlogPostBySlug, getBlogCategories, getBlogTags } from '@/lib/blog-pages';
```

Also change:
```tsx
const post = await getBlogPostById(params.id);
```
to:
```tsx
const post = await getBlogPostBySlug(params.id, true); // includeUnpublished=true
```

### 5. Any components using createCategory or createTag
These functions have different signatures:

```tsx
// blog.ts
createCategory(name: string, description?: string): Promise<BlogCategory>
// blog-pages.ts
createBlogCategory(category: { name: string; slug: string; description?: string }): Promise<BlogCategory>

// blog.ts
createTag(name: string): Promise<BlogTag>
// blog-pages.ts  
createBlogTag(tag: { name: string; slug: string; description?: string }): Promise<BlogTag>
```

### 6. Other differences to be aware of:

- In blog.ts, filters for `getBlogPosts` include `status`, while in blog-pages.ts it's `includeUnpublished`
- Parameter naming: `perPage` vs `pageSize`
- The response format of `getBlogPosts` is slightly different:
  - blog.ts returns `{ posts, totalCount, page, perPage, totalPages }`
  - blog-pages.ts returns `{ posts, pagination: { total, page, pageSize, totalPages } }`

## Testing After Changes
After making these changes, run `npm run build` to verify that the build succeeds without the `next/headers` error. 