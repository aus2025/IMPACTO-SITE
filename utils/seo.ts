import { Metadata } from 'next';

// Default SEO values
export const defaultSEO = {
  title: 'Impacto Automation AI - AI-Powered Business Solutions',
  description: 'AI-powered automation and social media marketing solutions to grow your business efficiently.',
  keywords: ['AI', 'Automation', 'Social Media Marketing', 'Business Solutions', 'Artificial Intelligence'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://impactoautomation.com',
    siteName: 'Impacto Automation AI',
    images: [
      {
        url: 'https://impactoautomation.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Impacto Automation AI',
      },
    ],
  },
  twitter: {
    handle: '@impactoai',
    site: '@impactoai',
    cardType: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

// Function to merge custom page SEO with default SEO
export function constructMetadata({
  title,
  description,
  keywords,
  openGraph,
  twitter,
  noIndex,
  canonicalUrl,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: Partial<typeof defaultSEO.openGraph>;
  twitter?: Partial<typeof defaultSEO.twitter>;
  noIndex?: boolean;
  canonicalUrl?: string;
} = {}): Metadata {
  return {
    title: title ? title : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    openGraph: {
      ...defaultSEO.openGraph,
      title: openGraph?.title || title || defaultSEO.openGraph.title,
      description: openGraph?.description || description || defaultSEO.openGraph.description,
      url: canonicalUrl || defaultSEO.openGraph.url,
      images: openGraph?.images || defaultSEO.openGraph.images,
      ...openGraph,
    },
    twitter: {
      ...defaultSEO.twitter,
      title: twitter?.title || title || defaultSEO.twitter.handle,
      description: twitter?.title || description || defaultSEO.description,
      ...twitter,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : defaultSEO.robots,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Helper function to format structured data for JSON-LD
export function generateStructuredData(type: string, data: Record<string, any>) {
  let structuredData;

  switch (type) {
    case 'LocalBusiness':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: data.name || 'Impacto Automation AI',
        description: data.description || defaultSEO.description,
        url: data.url || defaultSEO.openGraph.url,
        logo: data.logo || `${defaultSEO.openGraph.url}/images/logo.png`,
        address: data.address || {
          '@type': 'PostalAddress',
          streetAddress: '82-84 Rajah Road',
          addressLocality: 'Ocean Shores',
          addressRegion: 'NSW',
          postalCode: '2483',
          addressCountry: 'AU',
        },
        telephone: data.telephone,
        email: data.email || 'impactoautomation.ai@gmail.com',
      };
      break;

    case 'Article':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title || defaultSEO.title,
        description: data.description || defaultSEO.description,
        image: data.image || defaultSEO.openGraph.images[0].url,
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        author: {
          '@type': 'Person',
          name: data.author || 'Impacto Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Impacto Automation AI',
          logo: {
            '@type': 'ImageObject',
            url: `${defaultSEO.openGraph.url}/images/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url || defaultSEO.openGraph.url,
        },
      };
      break;

    case 'Service':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.name || 'AI Business Solutions',
        description: data.description || defaultSEO.description,
        provider: {
          '@type': 'Organization',
          name: 'Impacto Automation AI',
          url: defaultSEO.openGraph.url,
        },
        serviceType: data.serviceType || 'Business Automation',
        areaServed: data.areaServed || 'Worldwide',
      };
      break;

    case 'FAQPage':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.questions.map((q: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })),
      };
      break;

    default:
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Impacto Automation AI',
        url: defaultSEO.openGraph.url,
        description: defaultSEO.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${defaultSEO.openGraph.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };
  }

  return structuredData;
} 