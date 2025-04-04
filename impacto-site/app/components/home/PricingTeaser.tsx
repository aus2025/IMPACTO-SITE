'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Create a motion-enabled Link component
const MotionLink = motion(Link);

export default function PricingTeaser() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Affordable, Transparent Pricing</h2>
          <p className="text-gray-700 mb-6">
            We offer flexible plans to suit businesses of all sizes. Whether you're just starting with automation or scaling up, our pricing is straightforward and designed to deliver ROI — with no hidden costs.
          </p>
          <MotionLink 
            href="/pricing" 
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Pricing
          </MotionLink>
        </div>
      </div>
    </section>
  );
} 