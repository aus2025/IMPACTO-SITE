# Required Updates to Fix Blog Functionality

## The issue:
The blog implementation is currently using `@/utils/supabase/server.ts` which tries to import `next/headers` causing build failures in the pages directory. We need to use `@/utils/supabase/server-pages.ts` instead for all page router components.

## Files that need to be updated:

1. `impacto-site/app/admin/blog/components/BlogPostForm.tsx`:
   ```tsx
   // Update line 6 from:
   import { createBlogPost, updateBlogPost } from '@/lib/blog';
   // to:
   import { createBlogPost, updateBlogPost } from '@/lib/blog-pages';
   ```

2. `impacto-site/app/admin/blog/page.tsx`:
   ```tsx
   // Update line 3 from:
   import { getBlogPosts, getBlogCategories } from '@/lib/blog';
   // to:
   import { getBlogPosts, getBlogCategories } from '@/lib/blog-pages';
   ```

3. `impacto-site/app/admin/blog/new/page.tsx`:
   ```tsx
   // Update line 3 from:
   import { getBlogCategories, getBlogTags } from '@/lib/blog';
   // to:
   import { getBlogCategories, getBlogTags } from '@/lib/blog-pages';
   ```

4. `impacto-site/app/admin/blog/[id]/edit/page.tsx`:
   ```tsx
   // Update line 4 from:
   import { getBlogPostById, getBlogCategories, getBlogTags } from '@/lib/blog';
   // to:
   import { getBlogPostBySlug, getBlogCategories, getBlogTags } from '@/lib/blog-pages';
   ```
   
   Note: `getBlogPostById` needs to be changed to `getBlogPostBySlug` as the API is different.

5. All other blog-related components in the `/app` directory need similar updates.

## API Differences Between blog.ts and blog-pages.ts

1. **Function Names**:
   - `getBlogPostById` (blog.ts) vs `getBlogPostBySlug` (blog-pages.ts)
   
2. **Parameter Differences**:
   - In blog.ts, `updateBlogPost` takes `id: number`, while in blog-pages.ts it takes `id: string`
   - In blog.ts, `deleteBlogPost` takes `id: number`, while in blog-pages.ts it takes `id: string`
   
3. **Return Types**:
   - `updateBlogPost` in blog.ts returns `Promise<void>`, while in blog-pages.ts it returns `Promise<BlogPost>`
   
4. **Method Signatures**:
   - blog.ts: `createCategory(name: string, description?: string): Promise<BlogCategory>`
   - blog-pages.ts: `createBlogCategory(category: { name: string; slug: string; description?: string }): Promise<BlogCategory>`
   
   - blog.ts: `createTag(name: string): Promise<BlogTag>`
   - blog-pages.ts: `createBlogTag(tag: { name: string; slug: string; description?: string }): Promise<BlogTag>`

5. **Additional Functions**:
   - Some functions might exist in one file but not the other.

## Next Steps

1. Update import paths in all files to use blog-pages.ts
2. Adjust function calls to match the API differences
3. Run the build to verify the fix works

The goal is to use `blog-pages.ts` for all client components and Pages Router pages, while keeping `blog.ts` for App Router server components. 

## UI/Design Standards

### Form Input Text Color
- All form input fields across the site use text-gray-900 (90% black) for better readability
- This includes:
  - Regular input fields (`components/ui/input.tsx`)
  - Textarea components (`components/ui/textarea.tsx`)
  - Select dropdowns (`components/ui/select.tsx`)
  - Admin search fields (admin section - header search and filter inputs)
- When adding new form components, ensure text color is set to text-gray-900