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
                Perfect for growing businesses ready for multi-channel automation.
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
                href="https://calendly.com/impactoautomation-ai"
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
                <h3 className="text-xl font-bold mb-2">Multi-Platform Social Media</h3>
                <p className="text-gray-800 flex-grow">AI-generated posts & scheduling across multiple platforms to maintain a consistent presence.</p>
                <div className="mt-4 text-green-600 font-medium">Save 10+ hours per week</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-green-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-2">Advanced CRM Integration</h3>
                <p className="text-gray-800 flex-grow">Real-time data synchronization for improved lead tracking and conversion optimization.</p>
                <div className="mt-4 text-green-600 font-medium">Boost conversion rates by 30%</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-green-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-bold mb-2">Client Onboarding Automation</h3>
                <p className="text-gray-800 flex-grow">Welcome emails, digital contracts and scheduling to create a seamless client experience.</p>
                <div className="mt-4 text-green-600 font-medium">Improved client satisfaction</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-green-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">📆</div>
                <h3 className="text-xl font-bold mb-2">Administrative Automation</h3>
                <p className="text-gray-800 flex-grow">Streamlined scheduling, invoicing, and reporting to reduce manual back-office tasks.</p>
                <div className="mt-4 text-green-600 font-medium">Eliminate administrative headaches</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-green-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-2">Multi-Step Email & SMS Sequences</h3>
                <p className="text-gray-800 flex-grow">Automated nurture campaigns that engage prospects across multiple channels for higher conversion.</p>
                <div className="mt-4 text-green-600 font-medium">2x higher engagement rates</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-green-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">Priority Support & Optimization</h3>
                <p className="text-gray-800 flex-grow">Email & chat support with quarterly workflow optimizations to ensure your systems keep improving.</p>
                <div className="mt-4 text-green-600 font-medium">Continuous improvement</div>
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
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              💸 Growth Package Pricing
            </h2>
            
            <div className="bg-green-50 rounded-xl p-8 md:p-12 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Growth Package</h3>
                  <p className="text-gray-600">Perfect for growing businesses ready for multi-channel automation</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-3xl font-bold text-green-600">$3,000–$5,000<span className="text-lg font-normal text-gray-600"> (one-time setup)</span></div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">Core Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">3–5 integrated workflows tailored to your needs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Social Media Automation (AI-generated posts & scheduling across multiple platforms)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Advanced CRM integration with real-time data synchronization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Client onboarding automation (welcome emails, digital contracts, scheduling)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Administrative & back-office automation (scheduling, invoicing, reporting)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">Additional Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Automated multi-step email & SMS nurture sequences</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Priority support with quarterly workflow optimizations (email & chat)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Integration with your existing tools and systems</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Detailed documentation and team training</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-green-600 font-medium">Comprehensive solution to streamline multiple business operations simultaneously</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <motion.a 
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 bg-green-600 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
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
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-6 border-2 border-green-600 text-green-700 hover:bg-green-100/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-green-500 text-white p-4 flex justify-center z-50">
        <a
          href="/contact"
          className="font-medium"
        >
          Contact Us
        </a>
      </div>
    </main>
  );
} 