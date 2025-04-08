/**
 * Consolidated Blog Service
 * 
 * This module provides a unified API for all blog-related functionality,
 * consolidating the various blog-related files into a single service.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

// Core types
export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  readingTime: string;
  htmlContent?: string;
  category?: string;
};

export type BlogFilter = {
  category?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  search?: string;
};

export type PaginatedPosts = {
  posts: BlogPost[];
  totalCount: number;
  totalPages: number;
  page?: number;
  perPage?: number;
};

const DEFAULT_PAGE_SIZE = 6;

// Map of blog numbers to titles and dates
type BlogMetaType = {
  [slug: string]: {
    date: string;
    tags: string[];
    category: string;
  }
};

const blogMeta: BlogMetaType = {
  'blog-1-autonomous-ai-agents': {
    date: '2025-01-05',
    tags: ['AI', 'Automation', 'Business Strategy'],
    category: 'AI Technology'
  },
  'blog-2-orchestration': {
    date: '2025-01-15', 
    tags: ['Hyperautomation', 'Process Optimization', 'Workflow'],
    category: 'Process Automation'
  },
  'blog-3-embedded-ai': {
    date: '2025-01-25',
    tags: ['AI', 'Product Development', 'Innovation'],
    category: 'AI Technology'
  },
  'blog-4-data-centric-ai': {
    date: '2025-02-05',
    tags: ['Data Science', 'AI', 'Information Management'],
    category: 'Data Strategy'
  },
  'blog-5-responsible-ai': {
    date: '2025-02-12',
    tags: ['AI Ethics', 'Compliance', 'Risk Management'],
    category: 'Governance'
  },
  'blog-6-workforce-augmentation': {
    date: '2025-02-18',
    tags: ['Workplace Transformation', 'Human Resources', 'Productivity'],
    category: 'Future of Work'
  },
  'blog-7-autonomous-ai-implementation': {
    date: '2025-02-27',
    tags: ['AI Implementation', 'Change Management', 'Digital Transformation'],
    category: 'Implementation'
  },
  'blog-8-hyperautomation-details': {
    date: '2025-03-08',
    tags: ['Hyperautomation', 'RPA', 'Business Process'],
    category: 'Process Automation'
  },
  'blog-9-embedded-ai-strategies': {
    date: '2025-03-19',
    tags: ['AI Strategy', 'Product Development', 'Technology Integration'],
    category: 'AI Technology'
  },
  'blog-10-data-centric-implementation': {
    date: '2025-03-29',
    tags: ['Data Architecture', 'AI Implementation', 'Information Systems'],
    category: 'Data Strategy'
  },
  'blog-11-ai-trends-implementation': {
    date: '2025-04-10',
    tags: ['AI Trends', 'Technology Forecasting', 'Strategic Planning'],
    category: 'Future of AI'
  }
};

// Path to the blog posts
const postsDirectory = path.join(process.cwd(), 'public/blog-content');

// Utility functions
// -----------------

// Format date to DD/MM/YYYY
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

// Calculate reading time based on word count
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
}

// Extract excerpt from content (first paragraph)
function extractExcerpt(content: string): string {
  // Get the first paragraph after the title
  const paragraphs = content.split('\n\n');
  // Skip the title and get the first non-empty paragraph
  for (let i = 1; i < paragraphs.length; i++) {
    if (paragraphs[i].trim() && !paragraphs[i].startsWith('#')) {
      // Remove any markdown formatting
      const excerpt = paragraphs[i].replace(/[*_`]/g, '');
      return excerpt.length > 150 ? excerpt.substring(0, 147) + '...' : excerpt;
    }
  }
  return '';
}

// API: Content Fetching
// --------------------

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Check if the directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.error(`Blog posts directory not found: ${postsDirectory}`);
      return Object.keys(blogMeta).map(slug => createFallbackPost(slug));
    }
    
    // Read all .md files from the blog content directory
    const fileNames = fs.readdirSync(postsDirectory)
      .filter(fileName => fileName.endsWith('.md'));
    
    // If no markdown files found, fallback to slugs from blogMeta
    const slugs = fileNames.length > 0 
      ? fileNames.map(fileName => fileName.replace(/\.md$/, '')) 
      : Object.keys(blogMeta);
    
    // Process each blog post
    const allPostsData = await Promise.all(
      slugs.map(async (slug) => {
        try {
          const fullPath = path.join(postsDirectory, `${slug}.md`);
          
          // Check if file exists
          if (!fs.existsSync(fullPath)) {
            console.error(`Markdown file not found: ${fullPath}`);
            return createFallbackPost(slug);
          }
          
          // Read file content
          const rawMarkdown = fs.readFileSync(fullPath, 'utf8');
          
          // Use gray-matter to parse the post metadata section
          const matterResult = matter(rawMarkdown);
          
          // Extract title from content (first h1)
          const titleMatch = rawMarkdown.match(/^# (.*)/m);
          const title = titleMatch ? titleMatch[1] : slug.split('-').slice(1).join(' ').replace(/-/g, ' ');
          
          // Get metadata or use defaults
          const meta = blogMeta[slug] || { 
            date: new Date().toISOString().split('T')[0],
            tags: ['AI', 'Automation'],
            category: 'Technology'
          };
          
          // Convert markdown to HTML
          let htmlContent;
          try {
            const processedContent = await remark()
              .use(html)
              .use(remarkGfm)
              .process(matterResult.content);
            htmlContent = processedContent.toString();
          } catch (markdownError) {
            console.error(`Error converting markdown for ${slug}:`, markdownError);
            htmlContent = `<p>Error rendering content for ${slug}.</p>`;
          }
          
          // Calculate reading time
          const readingTime = calculateReadingTime(matterResult.content);
          
          // Extract excerpt
          const excerpt = extractExcerpt(matterResult.content);
          
          // Return the blog post data
          return {
            slug,
            title,
            date: meta.date,
            formattedDate: formatDate(meta.date),
            content: matterResult.content,
            htmlContent,
            excerpt,
            author: "Impacto Automation",
            tags: meta.tags,
            category: meta.category,
            readingTime
          };
        } catch (error) {
          console.error(`Error processing blog post ${slug}:`, error);
          return createFallbackPost(slug);
        }
      })
    );
    
    // Filter out nulls and sort posts by date
    return allPostsData
      .filter(Boolean)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('Error fetching all posts:', error);
    // Provide fallback content based on blogMeta
    return Object.keys(blogMeta).map(slug => createFallbackPost(slug));
  }
}

// Helper function to create fallback post data
function createFallbackPost(slug: string): BlogPost {
  const meta = blogMeta[slug] || {
    date: new Date().toISOString().split('T')[0],
    tags: ['AI', 'Automation'],
    category: 'Technology'
  };
  
  return {
    slug,
    title: slug.split('-').slice(1).join(' ').replace(/-/g, ' '),
    date: meta.date,
    formattedDate: formatDate(meta.date),
    content: 'Content temporarily unavailable. Please check back later.',
    htmlContent: '<p>Content temporarily unavailable. Please check back later.</p>',
    excerpt: 'Content temporarily unavailable. Please check back later.',
    author: "Impacto Automation",
    tags: meta.tags || [],
    category: meta.category || 'Technology',
    readingTime: '1 min read'
  };
}

/**
 * Get a paginated list of published blog posts
 */
export async function getBlogPosts(filters: BlogFilter = {}): Promise<PaginatedPosts> {
  try {
    // Make sure the directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.error(`Blog posts directory not found: ${postsDirectory}`);
      return { posts: [], totalCount: 0, totalPages: 0, page: 1, perPage: DEFAULT_PAGE_SIZE };
    }
    
    // Get filtered posts using the filterPosts function
    return await filterPosts(filters);
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return { posts: [], totalCount: 0, totalPages: 0, page: 1, perPage: DEFAULT_PAGE_SIZE };
  }
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // First check that we have a valid slug
    if (!slug || typeof slug !== 'string') {
      console.error(`Invalid blog post slug: ${slug}`);
      return null;
    }

    // Load the markdown file from the filesystem
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.error(`Markdown file not found: ${fullPath}`);
      // Return fallback post if file is missing but we have metadata
      if (Object.keys(blogMeta).includes(slug)) {
        return createFallbackPost(slug);
      }
      return null;
    }

    // Read file content
    const rawMarkdown = fs.readFileSync(fullPath, 'utf8');
    
    // Parse frontmatter and content
    const matterResult = matter(rawMarkdown);
    
    // Extract title from content (first h1)
    const titleMatch = rawMarkdown.match(/^# (.*)/m);
    const title = titleMatch ? titleMatch[1] : slug.split('-').slice(1).join(' ').replace(/-/g, ' ');
    
    // Get metadata from our map
    const meta = blogMeta[slug] || { 
      date: new Date().toISOString().split('T')[0],
      tags: ['AI', 'Automation'],
      category: 'Technology'
    };
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .use(remarkGfm)
      .process(matterResult.content);
    const htmlContent = processedContent.toString();
    
    // Calculate reading time
    const readingTime = calculateReadingTime(matterResult.content);
    
    // Extract excerpt
    const excerpt = extractExcerpt(matterResult.content);
    
    // Return the blog post data
    return {
      slug,
      title,
      date: meta.date,
      formattedDate: formatDate(meta.date),
      content: matterResult.content,
      htmlContent,
      excerpt,
      author: "Impacto Automation",
      tags: meta.tags,
      category: meta.category,
      readingTime
    };
  } catch (error) {
    console.error(`Error reading blog post: ${slug}`, error);
    // If we have metadata for this slug, return a fallback
    if (slug && Object.keys(blogMeta).includes(slug)) {
      return createFallbackPost(slug);
    }
    return null;
  }
}

// API: Categories and Tags
// -----------------------

/**
 * Get all unique categories from posts
 */
export async function getAllCategories(): Promise<string[]> {
  try {
    const posts = await getAllPosts();
    const categories = new Set(posts.map(post => post.category || 'Uncategorized'));
    return Array.from(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get all unique tags from posts
 */
export async function getAllTags(): Promise<string[]> {
  try {
    const posts = await getAllPosts();
    const tagsSet = new Set<string>();
    
    posts.forEach(post => {
      post.tags.forEach(tag => tagsSet.add(tag));
    });
    
    return Array.from(tagsSet);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// API: Post Filtering and Search
// -----------------------------

/**
 * Filter posts based on criteria
 */
export async function filterPosts(filter: BlogFilter): Promise<PaginatedPosts> {
  try {
    const { category, tag, page = 1, perPage = 10 } = filter;
    const allPosts = await getAllPosts();
    
    // Apply filters
    let filteredPosts = [...allPosts];
    
    // Filter by category if provided
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category && post.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by tag if provided
    if (tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }
    
    // Calculate pagination
    const totalCount = filteredPosts.length;
    const totalPages = Math.ceil(totalCount / perPage);
    const startIndex = (page - 1) * perPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + perPage);
    
    return {
      posts: paginatedPosts,
      totalCount,
      totalPages
    };
  } catch (error) {
    console.error('Error filtering posts:', error);
    return {
      posts: [],
      totalCount: 0,
      totalPages: 0
    };
  }
}

/**
 * Get related posts by category or tags
 */
export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  try {
    const posts = await getAllPosts();
    const currentPost = posts.find(post => post.slug === currentSlug);
    
    if (!currentPost) return [];
    
    const relatedPosts = posts
      .filter(post => post.slug !== currentSlug) // Exclude current post
      .sort((a, b) => {
        // Calculate relevance score based on shared categories and tags
        const aScore = (a.category === currentPost.category ? 3 : 0) + 
                      a.tags.filter(tag => currentPost.tags.includes(tag)).length;
        const bScore = (b.category === currentPost.category ? 3 : 0) + 
                      b.tags.filter(tag => currentPost.tags.includes(tag)).length;
        
        return bScore - aScore; // Sort by relevance score (highest first)
      })
      .slice(0, limit);
    
    return relatedPosts;
  } catch (error) {
    console.error('Error getting related posts:', error);
    return [];
  }
} 