import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Automation Assessment | Impacto AI',
  description: 'Complete our detailed business assessment to receive a personalized automation strategy tailored to your organization\'s specific needs and challenges.',
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 