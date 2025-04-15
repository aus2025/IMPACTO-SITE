'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckIcon, ArrowLeft, MessageCircleIcon, PhoneIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdvancedPackagePage() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-gradient-to-br from-blue-800 to-blue-600 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)', backgroundImage: 'none' }}>
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
                Advanced Package
              </h1>
              <p className="text-xl md:text-2xl mb-4 font-medium text-blue-100">
                Full-Scale Automation – Maximum Impact
              </p>
              <p className="text-lg md:text-xl mb-6 text-blue-50">
                Built for established businesses ready to scale with tailored automation and expert support.
              </p>
              <p className="text-lg mb-10 text-blue-50 max-w-3xl">
                Get end-to-end automation designed around your unique processes — from AI chatbots to custom integrations.
                Includes dedicated strategy sessions, custom-built workflows, and priority support to help your business run smarter at scale.
              </p>
              <motion.a 
                href="https://calendly.com/impactoautomation-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-6 border-2 border-purple-600 text-purple-700 hover:bg-purple-100/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Solution Overview
              </motion.a>
            </div>
          </div>
        </div>
      </section>
      
      {/* What You Get section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              What You Get With The Advanced Package
            </h2>
            
            <Card className="p-6 mb-8 shadow-sm border-indigo-100 hover:shadow-md transition-shadow md:col-span-2">
              <div className="flex items-start mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">All Growth Features Included</h3>
                  <p className="text-gray-600">
                    Everything from the Growth Package is included in Advanced, so you don't lose anything by upgrading.
                  </p>
                </div>
              </div>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6 h-full shadow-sm border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Custom Automation Workflows</h3>
                    <p className="text-gray-600">
                      We design automation flows tailored to your unique business processes. If you have a special workflow or need a custom integration, we build it for you.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Bespoke process mapping and implementation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Industry-specific automations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom trigger and action sequences</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">AI Chatbot (Advanced)</h3>
                    <p className="text-gray-600">
                      A more powerful chatbot trained on your business information (e.g., your FAQs, knowledge base) to handle complex customer interactions on your website or social media.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom training on your business data</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Multi-platform deployment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Advanced conversation handling</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Extended Platform Integrations</h3>
                    <p className="text-gray-600">
                      Connect additional tools or platforms as needed (e.g., accounting software, project management tools). Advanced package supports a wider range of integrations to fit your tech stack.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Enterprise software integrations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>API customization and development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Seamless data flow between systems</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Premium Analytics Dashboard</h3>
                    <p className="text-gray-600">
                      Get a private dashboard tracking the performance of all automations (leads generated, posts scheduled, emails sent, etc.) so you have full visibility and insights into ROI.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Real-time performance monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom KPI tracking and reporting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Advanced data visualization</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Priority & 24/7 Support</h3>
                    <p className="text-gray-600">
                      Top-tier support anytime you need it. Skip the queue with priority responses by our senior team. We also offer hands-on assistance in case of any issues or changes – just call or message, and we're on it.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>24/7 emergency support access</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Direct access to senior specialists</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Guaranteed response SLAs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Dedicated Slack channel (optional)</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 h-full shadow-sm border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Dedicated Automation Strategist</h3>
                    <p className="text-gray-600">
                      A dedicated expert from our team works with you 1-on-1, providing strategy sessions each month to continuously optimize and adjust your automations as your business evolves.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 ml-12">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Monthly strategy sessions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Customized growth roadmapping</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Proactive optimization recommendations</span>
                  </li>
                </ul>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="font-medium text-base"
                onClick={() => router.push('/contact?package=advanced')}
              >
                <MessageCircleIcon className="h-4 w-4 mr-2" />
                Talk to Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tailored Automation Example Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Tailored Automation Example
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              With Advanced, your automation can be as unique as your business. Here's an example of a custom workflow we can build for you.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
              {/* Step 1: Custom Form Submission */}
              <div className="flex-1 text-center">
                <div className="bg-indigo-100 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h4 className="font-bold mb-2">1. Custom Form Submission</h4>
                <p className="text-sm text-gray-600">Customer fills out detailed questionnaire</p>
              </div>
              
              {/* Arrow 1 */}
              <div className="hidden md:block">
                <ArrowRight className="h-8 w-8 text-indigo-400" />
              </div>
              <div className="block md:hidden my-2">
                <ArrowRight className="h-8 w-8 text-indigo-400 rotate-90 mx-auto" />
              </div>
              
              {/* Step 2: Automated Proposal Generator */}
              <div className="flex-1 text-center">
                <div className="bg-indigo-100 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h4 className="font-bold mb-2">2. Automated Proposal Generator</h4>
                <p className="text-sm text-gray-600">Personalized quote PDF with your branding</p>
              </div>
              
              {/* Arrow 2 */}
              <div className="hidden md:block">
                <ArrowRight className="h-8 w-8 text-indigo-400" />
              </div>
              <div className="block md:hidden my-2">
                <ArrowRight className="h-8 w-8 text-indigo-400 rotate-90 mx-auto" />
              </div>
              
              {/* Step 3: AI Follow-up */}
              <div className="flex-1 text-center">
                <div className="bg-indigo-100 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h4 className="font-bold mb-2">3. AI Follow-up</h4>
                <p className="text-sm text-gray-600">Intelligent responses even after hours</p>
              </div>
              
              {/* Arrow 3 */}
              <div className="hidden md:block">
                <ArrowRight className="h-8 w-8 text-indigo-400" />
              </div>
              <div className="block md:hidden my-2">
                <ArrowRight className="h-8 w-8 text-indigo-400 rotate-90 mx-auto" />
              </div>
              
              {/* Step 4: Real-time Alert */}
              <div className="flex-1 text-center">
                <div className="bg-indigo-100 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h4 className="font-bold mb-2">4. Real-time Alert</h4>
                <p className="text-sm text-gray-600">Instant notifications with all info</p>
              </div>
              
              {/* Arrow 4 */}
              <div className="hidden md:block">
                <ArrowRight className="h-8 w-8 text-indigo-400" />
              </div>
              <div className="block md:hidden my-2">
                <ArrowRight className="h-8 w-8 text-indigo-400 rotate-90 mx-auto" />
              </div>
              
              {/* Step 5: Consultation Booked */}
              <div className="flex-1 text-center">
                <div className="bg-indigo-100 p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h4 className="font-bold mb-2">5. Consultation Booked</h4>
                <p className="text-sm text-gray-600">Auto-scheduled with complete context</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 text-center">
              <p className="text-gray-700 italic">
                "This is just one example – the possibilities are endless with our custom automations. We'll design workflows specifically for your business needs and industry requirements."
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
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-8 mb-12">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                  <div className="inline-block bg-indigo-200 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                    Premium Solution
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-700">Advanced Package</h3>
                  <p className="text-gray-600 mt-2">Custom-tailored automation ecosystem</p>
                </div>
                <div className="text-center mt-4 md:mt-0">
                  <div className="text-4xl font-bold text-indigo-700">
                    Starting at $1,250<span className="text-xl font-normal text-gray-500">/mo</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Custom pricing based on requirements</p>
                </div>
              </div>
              
              <div className="border-t border-indigo-200 pt-6">
                <div className="bg-white rounded-lg p-4 border border-indigo-100 mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-700 font-medium">One-time onboarding & setup fee:</p>
                    <p className="text-xl font-bold text-indigo-700">$1,500</p>
                  </div>
                </div>
                
                <h4 className="font-bold text-lg mb-4">What's Included:</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Everything from the Growth Package ($700/mo value)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Custom Automation Workflows tailored to your business</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Advanced AI Chatbot trained on your business data</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Extended Platform Integrations with your tech stack</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Premium Analytics Dashboard with custom KPIs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">Dedicated Automation Strategist with monthly sessions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-800">24/7 Priority Support with guaranteed response times</span>
                  </li>
                </ul>
                
                <div className="bg-white rounded-lg p-6 border border-indigo-100 mb-6">
                  <h4 className="font-bold text-lg mb-4">Billing Terms:</h4>
                  <p className="text-gray-800 mb-4">
                    Flexible terms: month-to-month or discounted annual plans available upon request.
                  </p>
                  <h4 className="font-bold text-lg mb-4">Customization Note:</h4>
                  <p className="text-gray-800 mb-4">
                    Given the tailored nature of Advanced, the exact pricing can vary based on complexity. We'll provide a detailed quote after understanding your needs – but our base price covers a <strong>lot</strong> of advanced functionality for established businesses.
                  </p>
                  <h4 className="font-bold text-lg mb-4">Add-ons:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" />
                      <span className="text-gray-800">Additional users, volume, or unique integrations: <strong>Custom quote</strong></span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" />
                      <span className="text-gray-800">Industry-specific automations: <strong>Quote based on requirements</strong></span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-indigo-100 rounded-lg p-4">
                  <p className="text-indigo-800 font-medium">
                    Our focus is delivering ROI. Advanced includes dedicated strategy and support to ensure you get maximum value from every dollar invested in automation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-gray-700 mb-2">
                <strong>Return on Investment:</strong> Advanced Package clients typically save 25-30+ hours per week in manual tasks and see up to 40% increase in conversion rates.
              </p>
              <p className="text-gray-600">
                The custom automations pay for themselves through increased efficiency, higher conversions, and better customer experience.
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
              Ready to Transform Your Business with AI Automation?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Let's talk about how the Advanced Package can be tailored to your needs. Schedule a consultation and we'll craft the perfect automation plan for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="font-medium text-base bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => router.push('/contact?package=advanced')}
              >
                <MessageCircleIcon className="h-4 w-4 mr-2" />
                Talk to Us
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="font-medium text-base border-white text-white hover:bg-blue-800"
                onClick={() => router.push('/contact?package=advanced&demo=true')}
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