'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Create a motion-enabled Link component using newer API
const MotionLink = motion(Link, { forwardMotionProps: true });

export default function HeroSection() {
  return (
    <section className="py-16 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Streamline Your Business with AI Automation
          </h1>
          <p className="text-xl mb-8">
            Cut costs, save time, and grow faster.<br />
            Smart automation tailored for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {/* Start Free button removed as requested */}
          </div>
          
          {/* Promotion Banner */}
          <div className="mt-8 bg-yellow-400 text-gray-900 rounded-lg p-4 inline-block animate-pulse">
            <p className="font-bold">Special Offer for First-Time Clients!</p>
            <p className="text-sm mb-2">Sign up this month and get 20% OFF your first automation package.</p>
            <Link href="/blueprint-assessment" className="inline-block bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
              Claim Your Offer Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 