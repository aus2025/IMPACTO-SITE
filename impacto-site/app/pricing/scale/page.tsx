'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckIcon, ArrowLeft } from 'lucide-react';
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

export default function ScalePackagePage() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-400/40 to-red-500/40 text-gray-800 w-full">
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
                Scale Package
              </h1>
              <p className="text-xl md:text-2xl mb-4 font-medium text-gray-700 text-center max-w-3xl mx-auto">
                Enterprise-level Automation for Growing Teams
              </p>
              <p className="text-lg md:text-xl mb-6 text-gray-600 text-center max-w-3xl mx-auto">
                Custom solutions for businesses ready to transform operations and scale efficiently.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8 justify-center">
                <motion.a 
                  href="https://calendly.com/rba-aus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 bg-red-600 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Strategy Session
                </motion.a>
                <motion.a 
                  href="https://calendly.com/rba-aus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-6 border-2 border-red-600 text-red-700 hover:bg-red-100/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request Custom Quote
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
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
              🚀 Enterprise-Grade Solutions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-red-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-bold mb-2">Workflow Automation</h3>
                <p className="text-gray-800 flex-grow">End-to-end business process automation across multiple departments and systems.</p>
                <div className="mt-4 text-red-600 font-medium">Eliminates operational bottlenecks</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-red-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-2">Advanced AI Assistants</h3>
                <p className="text-gray-800 flex-grow">Custom-trained AI assistants that understand your business processes and can handle complex tasks.</p>
                <div className="mt-4 text-red-600 font-medium">Reduces manual work by 70%+</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-red-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-2">Analytics & Reporting</h3>
                <p className="text-gray-800 flex-grow">Custom dashboards and reporting systems that provide real-time insights into your business.</p>
                <div className="mt-4 text-red-600 font-medium">Data-driven decision making</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-red-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">🔌</div>
                <h3 className="text-xl font-bold mb-2">System Integrations</h3>
                <p className="text-gray-800 flex-grow">Connect all your business tools and systems into a unified operational ecosystem.</p>
                <div className="mt-4 text-red-600 font-medium">Seamless data flow across platforms</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-red-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
                <p className="text-gray-800 flex-grow">Industry-leading security protocols and compliance measures for your automated systems.</p>
                <div className="mt-4 text-red-600 font-medium">SOC 2 & GDPR compliant</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-red-100 flex flex-col"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold mb-2">Dedicated Support Team</h3>
                <p className="text-gray-800 flex-grow">A team of experts assigned to your account for ongoing support, optimization, and training.</p>
                <div className="mt-4 text-red-600 font-medium">Proactive assistance & optimization</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Process Section */}
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
              🔄 Our Process
            </h2>
            
            <div className="relative">
              {/* Process timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-red-200 hidden md:block"></div>
              
              {/* Step 1 */}
              <motion.div 
                className="md:flex items-start mb-16 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right">
                  <h3 className="text-2xl font-bold text-red-600">1. Discovery & Assessment</h3>
                  <p className="text-gray-800 mt-2">We analyze your current processes, pain points, and goals to identify the highest-impact opportunities.</p>
                </div>
                <div className="flex-shrink-0 z-10 mx-auto md:mx-0">
                  <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow-lg">1</div>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  <div className="w-full md:w-48 h-48 bg-red-100 rounded-lg flex items-center justify-center">
                    <div className="text-5xl">🔍</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div 
                className="md:flex items-start mb-16 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right hidden md:block">
                  <div className="w-full md:w-48 h-48 ml-auto bg-red-100 rounded-lg flex items-center justify-center">
                    <div className="text-5xl">📝</div>
                  </div>
                </div>
                <div className="flex-shrink-0 z-10 mx-auto md:mx-0">
                  <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow-lg">2</div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <h3 className="text-2xl font-bold text-red-600">2. Strategic Planning</h3>
                  <p className="text-gray-800 mt-2">We design a comprehensive automation roadmap tailored to your business needs and growth objectives.</p>
                </div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div 
                className="md:flex items-start mb-16 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right">
                  <h3 className="text-2xl font-bold text-red-600">3. Implementation</h3>
                  <p className="text-gray-800 mt-2">Our expert team builds custom automations, integrations, and AI solutions tailored to your business.</p>
                </div>
                <div className="flex-shrink-0 z-10 mx-auto md:mx-0">
                  <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow-lg">3</div>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  <div className="w-full md:w-48 h-48 bg-red-100 rounded-lg flex items-center justify-center">
                    <div className="text-5xl">⚙️</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div 
                className="md:flex items-start relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right hidden md:block">
                  <div className="w-full md:w-48 h-48 ml-auto bg-red-100 rounded-lg flex items-center justify-center">
                    <div className="text-5xl">📈</div>
                  </div>
                </div>
                <div className="flex-shrink-0 z-10 mx-auto md:mx-0">
                  <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow-lg">4</div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <h3 className="text-2xl font-bold text-red-600">4. Ongoing Optimization</h3>
                  <p className="text-gray-800 mt-2">Continuous improvement of your systems with data-driven insights and emerging technologies.</p>
                </div>
              </motion.div>
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
              💰 Scale Package Pricing
            </h2>
            
            <div className="bg-red-50 rounded-xl p-8 md:p-12 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Enterprise Package</h3>
                  <p className="text-gray-600">Complete automation for growing businesses</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-3xl font-bold text-red-600">$1,499<span className="text-lg font-normal text-gray-600">/mo</span></div>
                  <div className="text-gray-600">Custom pricing for annual plans</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">Core Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Custom Workflow Automation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Enterprise AI Assistants</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Advanced Analytics Dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Multi-System Integrations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Custom API Development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Enterprise Security Protocols</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">Additional Benefits</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Monthly strategy sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Priority 24/7 support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Custom training for your team</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">Quarterly performance reviews</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">ROI optimization insights</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* ROI Calculator */}
              <div className="bg-white p-6 rounded-lg mb-8">
                <h4 className="font-bold text-lg mb-4 text-center">Enterprise ROI Analysis</h4>
                <p className="mb-4 text-center">On average, our Scale Package clients achieve operational cost reduction of 35% and productivity increases of 40%.</p>
                <div className="flex flex-col md:flex-row justify-center items-center bg-red-50 p-6 rounded-lg">
                  <div className="text-center mb-4 md:mb-0 md:mr-10">
                    <div className="text-sm text-gray-600 mb-2 font-medium">Annual savings</div>
                    <div className="text-2xl font-bold text-green-600">$120,000+</div>
                  </div>
                  <div className="text-center mb-4 md:mb-0 md:mx-10">
                    <div className="text-sm text-gray-600 mb-2 font-medium">Productivity gain</div>
                    <div className="text-2xl font-bold text-green-600">40%</div>
                  </div>
                  <div className="text-center md:ml-10">
                    <div className="text-sm text-gray-600 mb-2 font-medium">Typical ROI</div>
                    <div className="text-2xl font-bold text-green-600">10-15x</div>
                  </div>
                </div>
              </div>
              
              {/* Optional Add-ons */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4 text-center">Enterprise Add-ons</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="font-medium mb-2 text-red-600">Custom ML/AI Models</div>
                    <div className="text-gray-800 mb-2">Specialized machine learning models trained on your data</div>
                    <div className="font-bold text-gray-800">Custom pricing</div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="font-medium mb-2 text-red-600">White-label Solutions</div>
                    <div className="text-gray-800 mb-2">Branded customer-facing automation tools</div>
                    <div className="font-bold text-gray-800">Custom pricing</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <motion.a 
                  href="https://calendly.com/rba-aus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 bg-red-600 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Strategy Session
                </motion.a>
                <motion.a 
                  href="https://calendly.com/rba-aus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-6 border border-red-600 text-red-700 hover:bg-red-50"
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
      <section className="py-20 bg-gradient-to-br from-red-400/40 to-red-500/40 text-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Ready to Transform Your Business Operations?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-center">
              Our Scale Package offers enterprise-grade automation tailored specifically to your business needs.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a 
                href="https://calendly.com/rba-aus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 bg-red-600 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Strategy Session
              </motion.a>
              <motion.a 
                href="https://calendly.com/rba-aus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-6 border-2 border-red-600 text-red-700 hover:bg-red-100/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Custom Quote
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-red-500 text-white p-4 flex justify-between z-50">
        <a
          href="https://calendly.com/rba-aus"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium"
        >
          Book Session
        </a>
        <a
          href="https://calendly.com/rba-aus"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium"
        >
          Get Quote
        </a>
      </div>
    </main>
  );
} 