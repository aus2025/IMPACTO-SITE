'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckIcon, ArrowLeft, SmartphoneIcon, Users, MailIcon } from 'lucide-react';
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

const flowItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

export default function KickstartPackagePage() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-400/40 to-yellow-500/40 text-gray-800 w-full">
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
                Kickstart Your Automation Journey — No Tech Skills Needed
              </h1>
              <p className="text-xl md:text-2xl mb-4 font-medium text-gray-700 max-w-3xl mx-auto text-center">
                Perfect for solopreneurs and small teams starting from scratch. We'll set it all up — you save time, reduce manual work, and learn as you go.
              </p>
              
              {/* Simple automation chain visual */}
              <div className="flex items-center flex-wrap justify-center gap-4 my-8 bg-yellow-500/30 p-6 rounded-lg max-w-xl mx-auto">
                <div className="flex flex-col items-center p-3 bg-white/30 rounded-lg w-24">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="text-sm text-center font-medium">Lead comes in</div>
                </div>
                <div className="text-2xl">→</div>
                <div className="flex flex-col items-center p-3 bg-white/30 rounded-lg w-24">
                  <div className="text-3xl mb-2">📧</div>
                  <div className="text-sm text-center font-medium">Email sent</div>
                </div>
                <div className="text-2xl">→</div>
                <div className="flex flex-col items-center p-3 bg-white/30 rounded-lg w-24">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="text-sm text-center font-medium">Appointment booked</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-8 justify-center">
                <motion.a 
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 bg-yellow-600 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try for $99
                </motion.a>
                <motion.a 
                  href="https://calendly.com/rba-aus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-6 border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-100/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book a Free Call
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              ✨ What You'll Get
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <SmartphoneIcon className="text-blue-600 mr-3 h-6 w-6" />
                  <h3 className="font-bold text-lg">Social Media Posts</h3>
                </div>
                <p className="text-gray-800">
                  AI-crafted content for consistent posting without the daily hassle.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Users className="text-blue-600 mr-3 h-6 w-6" />
                  <h3 className="font-bold text-lg">Lead Capture</h3>
                </div>
                <p className="text-gray-800">
                  Automatically collect and organize potential client information.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <MailIcon className="text-blue-600 mr-3 h-6 w-6" />
                  <h3 className="font-bold text-lg">Email Welcome Flow</h3>
                </div>
                <p className="text-gray-800">
                  Turn prospects into clients with automated email sequences.
                </p>
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
              💸 Kickstart Package Pricing
            </h2>
            
            <div className="bg-yellow-50 rounded-xl p-8 md:p-12 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Starter Package</h3>
                  <p className="text-gray-600">Perfect automation for beginners</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-3xl font-bold text-yellow-600">$149<span className="text-lg font-normal text-gray-600">/mo</span></div>
                  <div className="text-gray-600">or $499 one-time setup</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">Core Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">AI Social Posts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Basic Lead Capture System</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Email Welcome Sequences</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Appointment Booking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Basic Chatbot</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">Additional Benefits</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">No setup fee for monthly plan</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Cancel anytime</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Free strategy session</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Basic analytics reporting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Email support</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* ROI Calculator */}
              <div className="bg-white p-6 rounded-lg mb-8">
                <h4 className="font-bold text-lg mb-4 text-center">Return on Investment</h4>
                <p className="mb-4 text-center">Most users save 8 hours/week — that's like hiring a $25/hr assistant for just $149/mo.</p>
                <div className="flex flex-col md:flex-row justify-center items-center bg-yellow-50 p-6 rounded-lg">
                  <div className="text-center mb-4 md:mb-0 md:mr-10">
                    <div className="text-sm text-gray-600 mb-2 font-medium">Monthly time saved</div>
                    <div className="text-2xl font-bold text-green-600">32+ hours</div>
                  </div>
                  <div className="text-center mb-4 md:mb-0 md:mx-10">
                    <div className="text-sm text-gray-600 mb-2 font-medium">Value of time saved</div>
                    <div className="text-2xl font-bold text-green-600">$800</div>
                  </div>
                  <div className="text-center md:ml-10">
                    <div className="text-sm text-gray-600 mb-2 font-medium">ROI</div>
                    <div className="text-2xl font-bold text-green-600">8x</div>
                  </div>
                </div>
              </div>
              
              {/* Optional Add-ons */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4 text-center">Optional Add-ons</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="font-medium mb-2 text-yellow-600">Extra Platform Integration</div>
                    <div className="text-gray-600 mb-2">Add another social media or marketing platform</div>
                    <div className="font-bold text-gray-800">+$50/mo</div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="font-medium mb-2 text-yellow-600">Advanced Chatbot Config</div>
                    <div className="text-gray-600 mb-2">More custom responses and advanced routing</div>
                    <div className="font-bold text-gray-800">+$100/mo</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <motion.a 
                  href="https://calendly.com/rba-aus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 bg-yellow-600 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start for $149
                </motion.a>
                <motion.a 
                  href="https://calendly.com/rba-aus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-6 border border-yellow-600 text-yellow-700 hover:bg-yellow-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Talk to an Expert
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-yellow-400/40 to-yellow-500/40 text-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Let's Build Your First Automation — Together.
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-center">
              We'll help you set up and understand everything. No jargon, no confusion. Just results.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a 
                href="#pricing"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 bg-yellow-600 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start for $149
              </motion.a>
              <motion.a 
                href="https://calendly.com/rba-aus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-6 border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-100/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Talk to an Expert
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-yellow-500 text-white p-4 flex justify-between z-50">
        <a
          href="#pricing"
          className="font-medium"
        >
          Start for $149
        </a>
        <a
          href="https://calendly.com/rba-aus"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium"
        >
          Book Free Call
        </a>
      </div>
    </main>
  );
} 