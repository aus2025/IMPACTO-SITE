'use client';

import React from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="relative min-h-screen w-full">
      {children}
    </div>
  );
} 