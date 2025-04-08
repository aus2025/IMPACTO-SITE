'use client';

import React from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-client-layout">
      {children}
    </div>
  );
} 