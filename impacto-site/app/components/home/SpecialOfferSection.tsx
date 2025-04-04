'use client';

import React from 'react';

export default function SpecialOfferSection() {
  return (
    <section className="py-14 bg-gradient-to-br from-amber-50 to-yellow-100 border-y border-amber-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">🎉 Starter Offer for New Clients</h2>
            <p className="text-lg text-gray-800">
              For a limited time, new Impacto clients receive <span className="font-bold text-amber-700">20% off</span> their first automation project.
            </p>
            <p className="text-lg text-gray-800">
              Kickstart your AI automation journey and save on initial costs!
            </p>
          </div>
          <div>
            <a
              href="https://calendly.com/rba-aus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-md transition-colors duration-200 min-w-[200px]"
            >
              Claim Your Offer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 