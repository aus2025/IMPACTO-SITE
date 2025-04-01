'use client';

import React from 'react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl">
            Schedule a free consultation with our automation experts and discover how our AI solutions can drive your business forward.
          </p>
          <div className="w-full flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <Link href="/contact" className="cta-button-global">
              Start Your Transformation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 