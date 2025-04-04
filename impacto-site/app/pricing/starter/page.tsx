'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckIcon, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StarterPackagePage() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-16 md:py-24 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Link 
              href="/pricing" 
              className="inline-flex items-center text-blue-100 hover:text-white mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pricing
            </Link>
            
            <div className="md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Starter Package
              </h1>
              <p className="text-xl md:text-2xl mb-4 font-medium text-blue-100">
                Essential Automation for New Businesses
              </p>
              <p className="text-lg md:text-xl mb-6 text-blue-50">
                Ideal for solopreneurs and small teams ready to take the first step into automation.
              </p>
              <p className="text-lg mb-10 text-blue-50 max-w-3xl">
                Launch fast with plug-and-play automations for social media and customer follow-ups — no tech skills needed.
              </p>
              <a 
                href="https://calendly.com/rba-aus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-4 bg-white text-blue-700"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* What You Get section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              What You Get With The Starter Package
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6 h-full shadow-sm border-blue-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">AI-Generated Social Posts</h3>
                    <p className="text-gray-600">
                      We create engaging posts for you. Automated content creation and scheduling for up to 2 social media platforms, so you stay active on social without effort.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>AI content generation based on your brand voice</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Automated scheduling to your preferred platforms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Regular posting to maintain audience engagement</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-blue-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Lead Capture to CRM</h3>
                    <p className="text-gray-600">
                      Auto-capture leads from your website into your CRM. When someone fills out your contact form, their info is instantly added to your CRM with no manual entry.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Seamless integration with your existing CRM</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Automatic contact creation and organization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Basic lead qualification tagging</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-blue-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Automated Email Follow-ups</h3>
                    <p className="text-gray-600">
                      Basic email sequence to nurture new leads. Every new contact gets a pre-written welcome email and a follow-up a few days later – keeping prospects warm automatically.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Personalized welcome sequence</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Timed follow-up messages to increase engagement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Basic performance tracking and analytics</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-blue-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Appointment Scheduling</h3>
                    <p className="text-gray-600">
                      Integrated calendar link that lets leads book meetings with you 24/7. No back-and-forth emails; booked appointments show up in your calendar.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom booking page with your branding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Automatic calendar syncing and updates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Automated reminder emails to reduce no-shows</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-blue-100 hover:shadow-md transition-shadow md:col-span-2">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Basic Chatbot (Q&A)</h3>
                    <p className="text-gray-600">
                      A simple chatbot for your website page that can answer common questions and collect inquiries. It's pre-configured with FAQs to help customers even when you're offline.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 ml-12">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>24/7 automated customer assistance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Pre-programmed responses to common questions</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Lead capture functionality</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Easy integration with your website</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="font-medium text-base"
                onClick={() => {
                  const element = document.getElementById('pricing');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Breakdown */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Pricing Details
            </h2>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-12">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-blue-700">Starter Package</h3>
                  <p className="text-gray-600 mt-2">Monthly automation service</p>
                </div>
                <div className="text-center mt-4 md:mt-0">
                  <div className="text-4xl font-bold text-blue-700">$300<span className="text-xl font-normal text-gray-500">/mo</span></div>
                  <p className="text-sm text-gray-500 mt-1">14-day free trial, no setup fees</p>
                </div>
              </div>
              
              <div className="border-t border-blue-200 pt-6">
                <h4 className="font-bold text-lg mb-4">What's Included:</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Social Media Automation (4 weekly posts to 1-2 platforms)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Lead Capture to CRM Integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Automated Email Sequence (welcome series + follow-ups)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Email Technical Support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Month-to-month flexibility (no long-term contracts)</span>
                  </li>
                </ul>
                <p className="text-gray-600 text-sm italic mb-6">
                  * Works with most popular platforms including Facebook, Instagram, LinkedIn, Mailchimp, HubSpot, and more.
                </p>
                
                <div className="bg-white rounded-lg p-6 border border-blue-100 mb-6">
                  <h4 className="font-bold text-lg mb-4">Billing Terms:</h4>
                  <p className="text-gray-700 mb-4">
                    Billed monthly, cancel anytime. No long-term contracts – upgrade or pause whenever you need.
                  </p>
                  <h4 className="font-bold text-lg mb-4">Optional Add-ons:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <span>Add another social media platform integration: <strong>+$50/mo</strong></span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <span>Additional chatbot customization or Q&A pack: <strong>+$100 one-time</strong></span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    All core features included at one simple price. You get full access to the automation modules and our support.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-gray-700 mb-2">
                <strong>Return on Investment:</strong> Most Starter Package clients save 5-10 hours per week on manual tasks.
              </p>
              <p className="text-gray-600">
                At just $300/month, that's as little as $7.50 per hour saved - far less than hiring help.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Save Time and Grow Your Business?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Start your automation journey today with our risk-free trial.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="font-medium text-base bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => router.push('/contact?package=starter')}
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="font-medium text-base bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => window.open("https://calendly.com/rba-aus", "_blank")}
              >
                Schedule a Demo
              </Button>
            </div>
            <p className="text-sm mt-6 text-blue-100">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 