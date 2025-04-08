import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Impacto Automation AI',
  description: 'Learn about our mission to make artificial intelligence and automation accessible, practical, and powerful for everyone.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 