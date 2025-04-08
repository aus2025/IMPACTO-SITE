'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckIcon, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function GrowthPackagePage() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-400/40 to-green-500/40 text-gray-800 w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Link 
              href="/pricing" 
              className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pricing
            </Link>
            
            <motion.div 
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
                Growth Package
              </h1>
              <p className="text-xl md:text-2xl mb-4 font-medium text-gray-700 text-center max-w-3xl mx-auto">
                Advanced Automation to Accelerate Your Business
              </p>
              <p className="text-lg md:text-xl mb-6 text-gray-600 text-center max-w-3xl mx-auto">
                Perfect for established businesses ready to scale operations and boost productivity.
              </p>
              
              {/* Simple workflow visual */}
              <div className="grid grid-cols-3 gap-3 mt-8 mb-8 bg-green-500/30 p-4 rounded-lg max-w-2xl mx-auto">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="text-sm font-medium">Automate</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-sm font-medium">Analyze</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🔄</div>
                  <div className="text-sm font-medium">Optimize</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-8 justify-center">
                <motion.a 
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 bg-green-600 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.a>
                <motion.a 
                href="https://calendly.com/rba-aus"
                target="_blank"
                rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-6 border-2 border-green-600 text-green-700 hover:bg-green-100/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                  Book a Consultation
                </motion.a>
            </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* What's Included section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              🌟 Advanced Features for Growing Businesses
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-green-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold mb-2">Multi-Platform Social Automation</h3>
                <p className="text-gray-800 flex-grow">AI content creation and scheduling across multiple social platforms with targeted audience segmentation.</p>
                <div className="mt-4 text-green-600 font-medium">Save 15+ hours per week</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-green-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-2">Advanced Lead Capture & CRM</h3>
                <p className="text-gray-800 flex-grow">Integrated lead scoring, tagging, and qualification that feeds directly into your sales process.</p>
                <div className="mt-4 text-green-600 font-medium">Increase conversion rates by 35%</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-green-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-bold mb-2">Email & SMS Nurture Sequences</h3>
                <p className="text-gray-800 flex-grow">Behavior-triggered multi-channel messaging that responds to prospect actions for higher engagement.</p>
                <div className="mt-4 text-green-600 font-medium">2.5x higher engagement rates</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-green-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">📆</div>
                <h3 className="text-xl font-bold mb-2">Team Calendar Coordination</h3>
                <p className="text-gray-800 flex-grow">Smart scheduling that routes meetings to the right team member and prevents overbooking.</p>
                <div className="mt-4 text-green-600 font-medium">Eliminate scheduling headaches</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-green-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-2">AI Chatbot (Enhanced)</h3>
                <p className="text-gray-800 flex-grow">Advanced conversational bot that can handle complex inquiries, schedule meetings, and qualify leads.</p>
                <div className="mt-4 text-green-600 font-medium">24/7 intelligent customer service</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-green-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">Monthly Optimization Reports</h3>
                <p className="text-gray-800 flex-grow">Detailed analytics and expert recommendations to continuously improve your automation performance.</p>
                <div className="mt-4 text-green-600 font-medium">Data-driven optimization</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Workflow Visualization */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              🔄 How Our Growth Automations Work
            </h2>
            
            <div className="relative bg-gray-50 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-sm text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="font-bold mb-2">Lead Generation</h3>
                  <p className="text-sm text-gray-800">Multi-channel lead capture systems</p>
                </motion.div>
                
                <div className="hidden md:flex items-center justify-center">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10H35" stroke="#10B981" strokeWidth="2"/>
                    <path d="M30 3L37 10L30 17" stroke="#10B981" strokeWidth="2"/>
                  </svg>
              </div>
              
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-sm text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="text-4xl mb-3">🤖</div>
                  <h3 className="font-bold mb-2">AI Qualification</h3>
                  <p className="text-sm text-gray-800">Automated scoring and segmentation</p>
                </motion.div>
                
                <div className="hidden md:flex items-center justify-center">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10H35" stroke="#10B981" strokeWidth="2"/>
                    <path d="M30 3L37 10L30 17" stroke="#10B981" strokeWidth="2"/>
                  </svg>
              </div>
              
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-sm text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <div className="text-4xl mb-3">📈</div>
                  <h3 className="font-bold mb-2">Conversion</h3>
                  <p className="text-sm text-gray-800">Personalized multi-channel nurturing</p>
                </motion.div>
              </div>
              
              <div className="mt-12 text-center">
                <div className="inline-block bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                  <span className="font-medium text-green-700">Average Growth Package Results:</span>
                  <div className="grid grid-cols-3 gap-8 mt-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">3.2x</div>
                      <div className="text-sm text-gray-600 mt-1">ROI</div>
                </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">45%</div>
                      <div className="text-sm text-gray-600 mt-1">More Leads</div>
              </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">20+</div>
                      <div className="text-sm text-gray-600 mt-1">Hours Saved Weekly</div>
              </div>
              </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              💰 Growth Package Pricing
            </h2>
            
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border-t-4 border-green-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Growth Package</h3>
                  <p className="text-gray-600">Advanced automation for established businesses</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-3xl font-bold text-green-600">$599<span className="text-lg font-normal text-gray-600">/mo</span></div>
                  <div className="text-gray-500">or custom quote for annual plan</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-bold mb-4 flex items-center">
                    <span className="text-green-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
                      </svg>
                    </span>
                    Core Features
                  </h4>
                  <ul className="space-y-3">
                  <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Social Media Automation (AI copy & scheduling for 3+ platforms)</span>
                  </li>
                  <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Enhanced CRM Integration (lead capture with advanced tagging)</span>
                  </li>
                  <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Automated Email & SMS Sequences (multi-step nurture campaigns)</span>
                  </li>
                  <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Appointment Scheduling Automation (sync calendars & reminders)</span>
                  </li>
                  <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Basic Chatbot for Website (handles FAQs or booking)</span>
                  </li>
                  <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Support: Priority email & chat support, quarterly tune-ups</span>
                  </li>
                </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-4 flex items-center">
                    <span className="text-green-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18ZM9 5H11V11H9V5ZM9 13H11V15H9V13Z" fill="currentColor"/>
                      </svg>
                    </span>
                    Additional Benefits
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Priority support response (under 4 hours)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Quarterly strategy sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Access to our automation template library</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Team training sessions (2 per quarter)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Custom workflow design</span>
                    </li>
                  </ul>
                </div>
                </div>
                
              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <h4 className="font-bold text-lg mb-2 text-green-700">Optional Add-ons</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-medium mb-1 text-gray-800">Custom API Integration</div>
                    <div className="text-sm text-gray-800 mb-1">Connect with specialized tools and platforms</div>
                    <div className="mt-2 text-green-600 font-bold">+$150/mo</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-medium mb-1 text-gray-800">Advanced Analytics Dashboard</div>
                    <div className="text-sm text-gray-800 mb-1">Real-time business intelligence reporting</div>
                    <div className="mt-2 text-green-600 font-bold">+$200/mo</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <motion.a 
                  href="https://calendly.com/rba-aus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 bg-green-600 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Demo
                </motion.a>
                <motion.a 
                  href="mailto:contact@impactoautomation.com"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-6 border border-green-600 text-green-700 hover:bg-green-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request Custom Quote
                </motion.a>
            </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-green-400/40 to-green-500/40 text-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Ready to Take Your Business to the Next Level?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-center">
              Our Growth Package combines powerful automations with expert support to help you scale efficiently.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a 
                href="#pricing"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 bg-green-600 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
              </motion.a>
              <motion.a 
                href="https://calendly.com/rba-aus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-6 border-2 border-green-600 text-green-700 hover:bg-green-100/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Demo
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-green-500 text-white p-4 flex justify-between z-50">
        <a
          href="#pricing"
          className="font-medium"
        >
          Get Started
        </a>
        <a
          href="https://calendly.com/rba-aus"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium"
        >
          Book Demo
        </a>
      </div>
    </main>
  );
} 