"use client";

import React from 'react';
import JsonLd from './JsonLd';
import { generateStructuredData } from '@/utils/seo';

interface StructuredDataProps {
  type: string;
  data: Record<string, any>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = generateStructuredData(type, data);
  
  return <JsonLd type={type} data={structuredData} />;
} 