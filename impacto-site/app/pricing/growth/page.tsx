'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckIcon, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GrowthPackagePage() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-gradient-to-br from-blue-800 to-blue-600 text-white w-full">
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
                Growth Package
              </h1>
              <p className="text-xl md:text-2xl mb-4 font-medium text-blue-100">
                Advanced Automation to Accelerate Your Growth
              </p>
              <p className="text-lg md:text-xl mb-6 text-blue-50">
                Ideal for growing teams ready to automate more and boost productivity across the board.
              </p>
              <p className="text-lg mb-10 text-blue-50 max-w-3xl">
                Unlock multi-channel automation designed to scale with your business. The Growth Package expands your reach – automate your marketing, sales, and customer follow-ups with ease, so your team can handle more without burning out.
              </p>
              <Button 
                size="lg" 
                className="font-medium text-base"
                onClick={() => router.push('/contact?package=growth&demo=true')}
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* What You Get section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              What You Get With The Growth Package
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6 h-full shadow-sm border-purple-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Multi-Platform Social Automation</h3>
                    <p className="text-gray-600">
                      AI content and scheduling across multiple channels (e.g., Facebook, Instagram, LinkedIn, Twitter). Stay active everywhere without extra effort.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>AI content creation for multiple platforms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Cross-platform scheduling and optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Engagement analytics and reporting</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-purple-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Advanced Lead Capture & CRM</h3>
                    <p className="text-gray-600">
                      Integration for multiple lead sources (website forms, landing pages, ads) feeding into your CRM with tagging and segmentation. No leads slip through the cracks.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Multi-source lead capture automation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Automated lead scoring and tagging</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom segments and personalized follow-ups</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-purple-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email & SMS Nurture Sequences</h3>
                    <p className="text-gray-600">
                      Automated sequences that not only send emails but also text messages for higher engagement. Keep your prospects warm through multiple touchpoints automatically.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Multi-channel communication automation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Behavior-triggered messaging</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>A/B testing capabilities for optimization</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-purple-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Calendar & Appointment Automation</h3>
                    <p className="text-gray-600">
                      Smart scheduler that handles multiple meeting types or team members. Automatically route appointments to the right team member's calendar and send reminders.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Team calendar coordination</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Intelligent meeting routing system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Multi-channel appointment reminders</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-purple-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Website Chatbot (Enhanced)</h3>
                    <p className="text-gray-600">
                      An AI-powered chatbot that can handle FAQs, capture lead info, and even schedule meetings or provide personalized responses. Available 24/7 to assist website visitors.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Advanced AI conversation capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Integrated meeting scheduling functionality</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom flows based on visitor behavior</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-purple-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Monthly Optimization Reports</h3>
                    <p className="text-gray-600">
                      A monthly summary report of your automation performance (open rates, leads captured, etc.), plus our tips to improve. Ensure you continuously get better results.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive performance analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Actionable optimization recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>ROI tracking across all automations</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-purple-100 hover:shadow-md transition-shadow md:col-span-2">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Priority Support</h3>
                    <p className="text-gray-600">
                      Faster response times via email and chat support, plus quarterly check-in calls to fine-tune your automations. We'll ensure you're getting maximum value.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 ml-12">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Priority email & chat response times</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Dedicated account specialist</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Quarterly strategy optimization calls</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Emergency support access</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="font-medium text-base"
                onClick={() => router.push('/contact?package=growth&demo=true')}
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Workflow Teaser Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              How It Works
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Our Growth Package integrates multiple channels into a powerful automation ecosystem that scales with your business.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Strategic Setup</h3>
                <p className="text-gray-600">
                  We develop a custom automation strategy across all your channels and integrate them into one cohesive system.
                </p>
              </div>
              
              <div className="text-center bg-white rounded-lg p-6 shadow-sm relative">
                <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-purple-300" />
                </div>
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Multi-Channel Execution</h3>
                <p className="text-gray-600">
                  Your social, email, SMS, chatbot, and calendar systems work together to create seamless customer journeys.
                </p>
              </div>
              
              <div className="text-center bg-white rounded-lg p-6 shadow-sm relative">
                <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-purple-300" />
                </div>
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Scale Your Results</h3>
                <p className="text-gray-600">
                  Your automation grows with your business, managing more leads and customers without requiring more of your time.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg mb-6 text-gray-700">
                "The Growth Package allowed us to scale leads per month without hiring additional staff. It's been transformative."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* See It In Action - Visual Workflow Teaser */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              See It In Action
            </h2>
            <h3 className="text-xl text-center text-gray-700 mb-6">
              How Growth Automation Works Across Channels
            </h3>
            
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              With the Growth Package, your business can deliver a seamless customer experience across multiple touchpoints. From social media to email, SMS, and even your website chatbot - everything works together to convert more leads and nurture existing customers.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
              {/* Step 1: Multi-Channel Presence */}
              <div className="flex-1 text-center">
                <div className="bg-purple-100 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Multi-Channel Presence</h4>
                <p className="text-sm text-gray-600">Content across all platforms</p>
              </div>
              
              {/* Arrow 1 */}
              <div className="hidden md:block">
                <ArrowRight className="h-8 w-8 text-purple-400" />
              </div>
              <div className="block md:hidden my-2">
                <ArrowRight className="h-8 w-8 text-purple-400 rotate-90 mx-auto" />
              </div>
              
              {/* Step 2: Advanced Lead Capture */}
              <div className="flex-1 text-center">
                <div className="bg-purple-100 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Advanced Lead Capture</h4>
                <p className="text-sm text-gray-600">Segmented in CRM with tags</p>
              </div>
              
              {/* Arrow 2 */}
              <div className="hidden md:block">
                <ArrowRight className="h-8 w-8 text-purple-400" />
              </div>
              <div className="block md:hidden my-2">
                <ArrowRight className="h-8 w-8 text-purple-400 rotate-90 mx-auto" />
              </div>
              
              {/* Step 3: Multi-Channel Nurturing */}
              <div className="flex-1 text-center">
                <div className="bg-purple-100 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Multi-Channel Nurturing</h4>
                <p className="text-sm text-gray-600">Email & SMS sequences</p>
              </div>
              
              {/* Arrow 3 */}
              <div className="hidden md:block">
                <ArrowRight className="h-8 w-8 text-purple-400" />
              </div>
              <div className="block md:hidden my-2">
                <ArrowRight className="h-8 w-8 text-purple-400 rotate-90 mx-auto" />
              </div>
              
              {/* Step 4: Team Meeting Routing */}
              <div className="flex-1 text-center">
                <div className="bg-purple-100 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Team Meeting Routing</h4>
                <p className="text-sm text-gray-600">Automated scheduling & assignment</p>
              </div>
              
              {/* Arrow 4 */}
              <div className="hidden md:block">
                <ArrowRight className="h-8 w-8 text-purple-400" />
              </div>
              <div className="block md:hidden my-2">
                <ArrowRight className="h-8 w-8 text-purple-400 rotate-90 mx-auto" />
              </div>
              
              {/* Step 5: Optimization Reports */}
              <div className="flex-1 text-center">
                <div className="bg-purple-100 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Optimization Reports</h4>
                <p className="text-sm text-gray-600">Continuous improvement</p>
              </div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 text-center">
              <p className="text-gray-700 italic">
                "The multi-channel approach has doubled our conversion rates. Leads now experience a consistent journey whether they find us on social media, through our website, or via referrals."
              </p>
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
            
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-8 mb-12">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                  <div className="inline-block bg-purple-200 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-bold text-purple-700">Growth Package</h3>
                  <p className="text-gray-600 mt-2">Multi-channel automation system</p>
                </div>
                <div className="text-center mt-4 md:mt-0">
                  <div className="text-4xl font-bold text-purple-700">$700<span className="text-xl font-normal text-gray-500">/mo</span></div>
                  <p className="text-sm text-gray-500 mt-1">No setup fees, cancel anytime</p>
                </div>
              </div>
              
              <div className="border-t border-purple-200 pt-6">
                <h4 className="font-bold text-lg mb-4">What's Included:</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Multi-Platform Social Automation (Facebook, Instagram, LinkedIn, Twitter)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Advanced Lead Capture & CRM with segmentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Email & SMS Nurture Sequences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Team Calendar & Appointment Routing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Enhanced AI Website Chatbot</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Monthly Optimization Reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Priority Support with quarterly check-in calls</span>
                  </li>
                </ul>
                <p className="text-gray-600 text-sm italic mb-6">
                  * Compatible with all major CRM, email marketing, calendar, and social media platforms.
                </p>
                
                <div className="bg-white rounded-lg p-6 border border-purple-100 mb-6">
                  <h4 className="font-bold text-lg mb-4">Billing Terms:</h4>
                  <p className="text-gray-800 mb-4">
                    Month-to-month billing with no long-term contracts – cancel anytime or switch plans easily.
                  </p>
                  <h4 className="font-bold text-lg mb-4">Optional Add-ons:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
                      <span className="text-gray-800">Additional high-volume email contacts: <strong>Contact us for pricing</strong></span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
                      <span className="text-gray-800">Extra social media accounts beyond standard package: <strong>+$75/mo per platform</strong></span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-100 rounded-lg p-4">
                  <p className="text-purple-800 font-medium">
                    Everything you need to scale your business's automation in one package – no hidden costs. The Growth Package includes all Starter features plus more, at a flat rate.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-gray-700 mb-2">
                <strong>Return on Investment:</strong> Growth Package clients typically save 15-20 hours per week in manual tasks.
              </p>
              <p className="text-gray-600">
                At $700/month, that's approximately $8.75 per hour saved - a fraction of hiring additional staff.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              See the Growth Package in Action
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Schedule a personalized demo and find out how Impacto can streamline your business. We'll show you real examples and answer all your questions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="font-medium text-base bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => router.push('/contact?package=growth&demo=true')}
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 