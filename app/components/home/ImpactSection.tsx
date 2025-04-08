'use client';

import React from 'react';
import StatisticsSection from '@/components/stats/StatisticsSection';

export default function ImpactSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Proven Business Impact</h2>
        <p className="text-lg text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Our AI solutions deliver measurable results for businesses, fast.
        </p>
        
        <StatisticsSection />
      </div>
    </section>
  );
} 