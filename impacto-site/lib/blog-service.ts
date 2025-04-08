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
};

export type PaginatedPosts = {
  posts: BlogPost[];
  totalCount: number;
  totalPages: number;
};

// Map of blog numbers to titles and dates
const blogMeta = {
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
    // Make sure the directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.error(`Blog posts directory not found: ${postsDirectory}`);
      return [];
    }
    
    // Get all markdown files from the posts directory
    const fileNames = fs.readdirSync(postsDirectory);
    
    // Read each file and extract metadata
    const allPostsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async (fileName) => {
          try {
            // Remove ".md" from file name to get slug
            const slug = fileName.replace(/\.md$/, '');
            
            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            
            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);
            
            // Extract title from content (first h1)
            const titleMatch = fileContents.match(/^# (.*)/m);
            const title = titleMatch ? titleMatch[1] : slug;
            
            // Get metadata or use defaults
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
          } catch (fileError) {
            console.error(`Error processing blog file ${fileName}:`, fileError);
            return null;
          }
        })
    );
    
    // Filter out nulls and sort posts by date
    return allPostsData
      .filter(Boolean)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

/**
 * Get a paginated list of published blog posts
 */
export async function getBlogPosts(filters: BlogPostFilters = {}): Promise<PaginatedPosts> {
  try {
    // Make sure the directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.error(`Blog posts directory not found: ${postsDirectory}`);
      return { posts: [], totalCount: 0, totalPages: 0, page: 1, perPage: DEFAULT_PAGE_SIZE };
    }
    
    // ... rest of the function ...
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

    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    // Check if file exists before reading
    if (!fs.existsSync(fullPath)) {
      console.error(`Blog post file not found: ${fullPath}`);
      return null;
    }
    
    // Safe file reading with proper error handling
    let fileContents;
    try {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } catch (readError) {
      console.error(`Error reading blog post file ${fullPath}:`, readError);
      return null;
    }
    
    // Use gray-matter to parse the post metadata section
    let matterResult;
    try {
      matterResult = matter(fileContents);
    } catch (parseError) {
      console.error(`Error parsing blog post frontmatter in ${fullPath}:`, parseError);
      // Try to recover with empty frontmatter
      matterResult = { data: {}, content: fileContents };
    }
    
    // Extract title from content (first h1) with fallback
    const titleMatch = fileContents.match(/^# (.*)/m);
    const title = titleMatch ? titleMatch[1] : (slug || 'Untitled Post');
    
    // Get metadata with robust fallbacks
    const meta = blogMeta[slug] || { 
      date: new Date().toISOString().split('T')[0],
      tags: ['AI', 'Automation'],
      category: 'Technology'
    };
    
    // Convert markdown to HTML with error handling
    let htmlContent = '';
    try {
      const processedContent = await remark()
        .use(html)
        .use(remarkGfm)
        .process(matterResult.content);
      htmlContent = processedContent.toString();
    } catch (markdownError) {
      console.error(`Error converting markdown to HTML for ${slug}:`, markdownError);
      // Fallback to simple HTML
      htmlContent = `<p>${matterResult.content.replace(/\n/g, '<br>')}</p>`;
    }
    
    // Calculate reading time
    const readingTime = calculateReadingTime(matterResult.content);
    
    // Extract excerpt with fallback
    let excerpt = '';
    try {
      excerpt = extractExcerpt(matterResult.content);
    } catch (excerptError) {
      console.error(`Error extracting excerpt for ${slug}:`, excerptError);
      excerpt = matterResult.content.slice(0, 150) + '...';
    }
    
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
      tags: meta.tags || [],
      category: meta.category,
      readingTime
    };
  } catch (error) {
    console.error(`Unexpected error fetching blog post ${slug}:`, error);
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