"use client";

import React from 'react';

interface JsonLdProps {
  type: string;
  data: Record<string, any>;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type,
          ...data,
        }),
      }}
    />
  );
} 