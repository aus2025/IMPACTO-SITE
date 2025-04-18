import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auth-debug/'],
    },
    sitemap: 'https://impacto.com/sitemap.xml',
  };
} 