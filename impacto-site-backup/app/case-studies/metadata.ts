import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Case Studies | Success Stories and Business Transformations',
  description: 'Explore real-world success stories showcasing how our AI automation and social media solutions have transformed businesses across industries.',
  keywords: ['AI case studies', 'business automation success', 'digital transformation', 'AI success stories'],
  openGraph: {
    title: 'Impacto Case Studies | AI Success Stories',
    description: 'See how businesses transformed operations with our AI-powered solutions. Real results, real impact.',
    images: [
      {
        url: 'https://impactoautomation.com/images/og/case-studies.jpg',
        width: 1200,
        height: 630,
        alt: 'Impacto Case Studies Collection',
      },
    ],
  },
  twitter: {
    title: 'AI Transformation Success Stories | Impacto',
    description: 'Real businesses achieving real results with AI automation. Explore our case studies.',
  },
  canonicalUrl: 'https://impactoautomation.com/case-studies',
}); 