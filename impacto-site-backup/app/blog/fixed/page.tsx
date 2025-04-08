import React from 'react';
import FixedBlogPage from '../fixed';
import BlogDiagnosticNav from '../diagnostic-nav';

export default function Page() {
  return (
    <>
      <BlogDiagnosticNav />
      <FixedBlogPage />
    </>
  );
}

export const metadata = {
  title: 'Fixed Blog | Impacto ONG',
  description: 'Read our latest blog posts - fixed version',
}; 