import { MetadataRoute } from 'next';

// This function generates the sitemap for your website
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL for your website
  const baseUrl = 'https://impactoautomation.com';

  // Static routes to include in the sitemap
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/login',
    '/assessment',
    '/pricing',
    '/pricing/kickstart',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // For dynamic routes like blog posts and case studies
  // In a real implementation, you would fetch these from your database
  // Here's a placeholder:
  const blogPosts = [
    { slug: 'getting-started-with-ai', updatedAt: new Date() },
    { slug: 'automation-best-practices', updatedAt: new Date() },
    // Add more dummy blog posts if needed
  ];

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const caseStudies = [
    { slug: 'e-commerce-transformation', updatedAt: new Date() },
    { slug: 'retail-automation', updatedAt: new Date() },
    // Add more dummy case studies if needed
  ];

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: study.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Combine all routes
  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
} 