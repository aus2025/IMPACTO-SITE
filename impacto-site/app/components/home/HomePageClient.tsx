'use client';

import React from 'react';
import ProcessTimeline from '@/components/ProcessTimeline';

// Import the newly created components
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import ServicesSection from './ServicesSection';
import ImpactSection from './ImpactSection';
import SpecialOfferSection from './SpecialOfferSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import PricingTeaser from './PricingTeaser';
import CTASection from './CTASection';

export default function HomePageClient() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <HeroSection />

      {/* Why Choose Us */}
      <FeaturesSection />

      {/* Services section */}
      <ServicesSection />

      {/* Proven Business Impact section */}
      <ImpactSection />

      {/* How We Achieve These Results: Our 4-Step Method */}
      <div className="relative z-10 mb-0">
        <ProcessTimeline />
      </div>

      {/* Starter Offer Section */}
      <SpecialOfferSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Pricing Plan Teaser */}
      <PricingTeaser />

      {/* CTA */}
      <CTASection />
    </main>
  );
} 