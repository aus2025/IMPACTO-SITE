'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Zap, Heart } from 'lucide-react';
import AutomationServices from '@/components/AutomationServices';
import AutomationUpgrade from '@/components/AutomationUpgrade';

// This metadata export needs to be moved to a separate layout.tsx file since 
// this is now a client component
const metadata = {
  title: 'Our Services | Impacto Automation AI',
  description: 'AI-powered automation solutions for Australian small businesses. Simplify workflows, boost productivity, and accelerate growth.',
};

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const iconVariants = {
    initial: { rotateY: 0 },
    flip: { rotateY: 360, transition: { duration: 0.8 } }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-16 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transform Your Business with AI Automation
            </h1>
            <p className="text-xl mb-8">
              Simplify workflows, boost productivity, and grow faster — built for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a 
                href="/contact" 
                className="cta-button-global"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Free Consultation
              </motion.a>
            </div>
            
            {/* Promotion Banner */}
            <motion.div 
              className="mt-8 bg-yellow-400 text-gray-900 rounded-lg p-4 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              <p className="font-bold">Special Offer for First-Time Clients!</p>
              <p className="text-sm mb-2">Sign up this month and get 20% OFF your first automation package.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/blueprint-assessment" className="inline-block bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                  Claim Your Offer Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What You're Really Getting Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl font-bold text-center mb-12 text-gray-900"
              variants={itemVariants}
            >
              What You're Really Getting
            </motion.h2>
            <motion.p 
              className="text-xl text-center mb-10 text-gray-700 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Our automation is about more than just tech—it's about transforming your business and life.
            </motion.p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-sm"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4"
                    initial="initial"
                    whileHover="flip"
                    variants={iconVariants}
                  >
                    <Clock className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-blue-800">Time Freedom</h3>
                  <p className="text-gray-700">
                    Reclaim hours every week by automating repetitive tasks so you can focus on strategy and growth.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-sm"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mb-4"
                    initial="initial"
                    whileHover="flip"
                    variants={iconVariants}
                  >
                    <DollarSign className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-green-800">Lower Payroll Costs</h3>
                  <p className="text-gray-700">
                    Do more with your existing team by eliminating manual busywork and reducing the need for additional hires.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-sm"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4"
                    initial="initial"
                    whileHover="flip"
                    variants={iconVariants}
                  >
                    <Zap className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-purple-800">Faster Response Time</h3>
                  <p className="text-gray-700">
                    Instantly engage with leads and customers 24/7, even when you're offline or focusing elsewhere.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-xl shadow-sm"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center mb-4"
                    initial="initial"
                    whileHover="flip"
                    variants={iconVariants}
                  >
                    <Heart className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-amber-800">Peace of Mind</h3>
                  <p className="text-gray-700">
                    Know your business runs smoothly in the background while you tackle bigger challenges or enjoy your life.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Automation Services Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Featured Automation Solutions</h2>
            <p className="text-xl text-gray-700">
              Our most popular automation services designed to transform your business operations
            </p>
          </motion.div>
          
          <AutomationServices />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            <AutomationUpgrade />
          </motion.div>
          
          {/* Assessment Promotion */}
          <motion.div 
            className="max-w-3xl mx-auto mt-16 text-center bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xl font-medium text-white mb-4">
              Complete this quick assessment to receive your personalized automation blueprint—and unlock an automatic 20% discount.
            </p>
            <motion.a 
              href="/assessment" 
              className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Assessment
            </motion.a>
          </motion.div>
          
          <div className="text-center mt-12">
            <motion.a 
              href="/assessment" 
              className="cta-button-global"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Take Our Automation Readiness Assessment
            </motion.a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Impacto Automation AI?
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-start mb-4">
                <motion.span 
                  className="text-green-500 text-2xl mr-3"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  ✅
                </motion.span>
                <div>
                  <h3 className="font-bold text-lg mb-2">Effortless Efficiency</h3>
                  <p className="text-gray-700">Automate repetitive tasks and reclaim valuable time.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-start mb-4">
                <motion.span 
                  className="text-green-500 text-2xl mr-3"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2.2 }}
                >
                  ✅
                </motion.span>
                <div>
                  <h3 className="font-bold text-lg mb-2">Affordable Solutions</h3>
                  <p className="text-gray-700">Scalable packages for any budget—big results at small-business prices.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-start mb-4">
                <motion.span 
                  className="text-green-500 text-2xl mr-3"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2.4 }}
                >
                  ✅
                </motion.span>
                <div>
                  <h3 className="font-bold text-lg mb-2">Proven Results</h3>
                  <p className="text-gray-700">Real clients report up to <strong>87%</strong> efficiency gains and up to <strong>35%</strong> cost reduction.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-start mb-4">
                <motion.span 
                  className="text-green-500 text-2xl mr-3"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2.6 }}
                >
                  ✅
                </motion.span>
                <div>
                  <h3 className="font-bold text-lg mb-2">Seamless Integration</h3>
                  <p className="text-gray-700">Our solutions effortlessly blend with your existing systems.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our AI-Powered Solutions
          </motion.h2>
          
          <motion.div 
            className="max-w-5xl mx-auto space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Social Media Marketing */}
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 shadow-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <motion.span 
                  className="text-blue-600 mr-3"
                  initial="initial"
                  whileHover="flip"
                  variants={iconVariants}
                >
                  🌐
                </motion.span>
                Social Media Marketing Automation
              </h3>
              <p className="text-gray-700 mb-6">
                Save time and boost your online visibility with AI-crafted content that engages your audience effectively—without manual effort.
              </p>
              <motion.ul 
                className="space-y-3 mb-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li 
                  className="flex items-start" 
                  variants={itemVariants}
                >
                  <motion.svg 
                    className="w-5 h-5 text-green-500 mr-2 mt-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-blue-800"><strong>Automated content creation & scheduling:</strong> Post consistently without daily input.</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.svg 
                    className="w-5 h-5 text-green-500 mr-2 mt-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-blue-800"><strong>AI-driven audience targeting:</strong> Reach exactly who matters most.</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.svg 
                    className="w-5 h-5 text-green-500 mr-2 mt-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-blue-800"><strong>Real-time analytics:</strong> Continuously optimize your performance.</span>
                </motion.li>
              </motion.ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/services/social-media-marketing" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
                >
                  Explore Social Media Automation
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="border-t border-gray-200 w-full my-8"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            ></motion.div>

            {/* Business Workflow Automation */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 shadow-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <motion.span 
                  className="text-blue-600 mr-3"
                  initial="initial"
                  whileHover="flip"
                  variants={iconVariants}
                >
                  🤖
                </motion.span>
                Business Workflow Automation
              </h3>
              <p className="text-gray-700 mb-6">
                Simplify your daily operations and eliminate manual tasks—allowing your business to scale effortlessly.
              </p>
              <motion.ul 
                className="space-y-3 mb-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.svg 
                    className="w-5 h-5 text-green-500 mr-2 mt-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-blue-800"><strong>Tailored workflow solutions:</strong> Built to fit your exact business processes.</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.svg 
                    className="w-5 h-5 text-green-500 mr-2 mt-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-blue-800"><strong>Easy integration:</strong> Connect smoothly with your existing tools (CRM, Email, ERP, and more).</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.svg 
                    className="w-5 h-5 text-green-500 mr-2 mt-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-blue-800"><strong>Reduce costs, minimize errors:</strong> Increase efficiency and profitability.</span>
                </motion.li>
              </motion.ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/services/automation-services" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
                >
                  Explore Workflow Automation
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Impact You Can Measure
          </motion.h2>
          <motion.p 
            className="text-center text-xl mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our clients experience tangible results—fast:
          </motion.p>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-sm text-center"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
                backgroundColor: "rgba(239, 246, 255, 0.8)" // light blue tint
              }}
            >
              <h3 className="text-blue-600 mb-2 text-lg font-medium">Increased Productivity</h3>
              <motion.p 
                className="text-4xl font-bold text-gray-900"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  delay: 0.3,
                  duration: 0.6
                }}
              >
                +60%
              </motion.p>
            </motion.div>
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-sm text-center"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
                backgroundColor: "rgba(239, 246, 255, 0.8)" // light blue tint
              }}
            >
              <h3 className="text-blue-600 mb-2 text-lg font-medium">Faster Task Completion</h3>
              <motion.p 
                className="text-4xl font-bold text-gray-900"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  delay: 0.4,
                  duration: 0.6
                }}
              >
                3x Faster
              </motion.p>
            </motion.div>
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-sm text-center"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
                backgroundColor: "rgba(239, 246, 255, 0.8)" // light blue tint
              }}
            >
              <h3 className="text-blue-600 mb-2 text-lg font-medium">Improved Team Efficiency</h3>
              <motion.p 
                className="text-4xl font-bold text-gray-900"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  delay: 0.5,
                  duration: 0.6
                }}
              >
                +87%
              </motion.p>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-center text-gray-700 mt-8 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Join other Australian businesses already benefiting from AI automation.
          </motion.p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Getting Started is Easy:
          </motion.h2>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm text-center relative"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.div 
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                  whileHover={{ 
                    rotate: 360, 
                    backgroundColor: "#2563EB",
                    transition: { duration: 0.6 }
                  }}
                >
                  1
                </motion.div>
                <h3 className="font-bold text-xl mb-3">Book a Free Consultation</h3>
                <p className="text-gray-700">Schedule a no-obligation call with our team.</p>
                <motion.div 
                  className="absolute -right-4 top-1/2 hidden md:block text-blue-500"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm text-center relative"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.div 
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                  whileHover={{ 
                    rotate: 360, 
                    backgroundColor: "#2563EB",
                    transition: { duration: 0.6 }
                  }}
                >
                  2
                </motion.div>
                <h3 className="font-bold text-xl mb-3">Get Your Custom Plan</h3>
                <p className="text-gray-700">Receive a personalized automation strategy tailored to your business.</p>
                <motion.div 
                  className="absolute -right-4 top-1/2 hidden md:block text-blue-500"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm text-center"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.div 
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                  whileHover={{ 
                    rotate: 360, 
                    backgroundColor: "#2563EB",
                    transition: { duration: 0.6 }
                  }}
                >
                  3
                </motion.div>
                <h3 className="font-bold text-xl mb-3">Enjoy Immediate Results</h3>
                <p className="text-gray-700">We implement solutions fast, so you see ROI quickly.</p>
              </motion.div>
            </div>
            
            <div className="text-center mt-12">
              <motion.a 
                href="https://calendly.com/rba-aus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-300"
                whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Your Free Consultation
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              <motion.div 
                className="py-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <button 
                  className="flex justify-between items-center w-full text-left focus:outline-none" 
                  onClick={() => toggleFaq(1)}
                >
                  <h3 className="text-xl font-semibold text-gray-900">How long does it take to get started?</h3>
                  <motion.svg 
                    className="w-6 h-6 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ rotate: openFaq === 1 ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openFaq === 1 ? 'auto' : 0,
                    opacity: openFaq === 1 ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-700 overflow-hidden"
                >
                  <p>For the Kickstart Plan, we can have your basic automations set up within 3-5 business days. For Growth and Scale plans, implementation typically takes 1-2 weeks depending on complexity.</p>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="py-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <button 
                  className="flex justify-between items-center w-full text-left focus:outline-none" 
                  onClick={() => toggleFaq(2)}
                >
                  <h3 className="text-xl font-semibold text-gray-900">Can I upgrade my plan later?</h3>
                  <motion.svg 
                    className="w-6 h-6 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ rotate: openFaq === 2 ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openFaq === 2 ? 'auto' : 0,
                    opacity: openFaq === 2 ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-700 overflow-hidden"
                >
                  <p>Absolutely! Our plans are designed as a growth path. Start with what you need now and upgrade as your business grows and your automation needs become more sophisticated.</p>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="py-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <button 
                  className="flex justify-between items-center w-full text-left focus:outline-none" 
                  onClick={() => toggleFaq(3)}
                >
                  <h3 className="text-xl font-semibold text-gray-900">Do I need technical skills to use your services?</h3>
                  <motion.svg 
                    className="w-6 h-6 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ rotate: openFaq === 3 ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openFaq === 3 ? 'auto' : 0,
                    opacity: openFaq === 3 ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-700 overflow-hidden"
                >
                  <p>Not at all. Our done-for-you approach means we handle all the technical aspects. You simply tell us what you need, and we implement it for you.</p>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="py-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <button 
                  className="flex justify-between items-center w-full text-left focus:outline-none" 
                  onClick={() => toggleFaq(4)}
                >
                  <h3 className="text-xl font-semibold text-gray-900">What if I need help after implementation?</h3>
                  <motion.svg 
                    className="w-6 h-6 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ rotate: openFaq === 4 ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openFaq === 4 ? 'auto' : 0,
                    opacity: openFaq === 4 ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-700 overflow-hidden"
                >
                  <p>All plans include support. Kickstart includes email support, Growth adds priority chat, and Scale includes dedicated support.</p>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="text-center mt-10">
              <motion.a 
                href="/contact" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                More Questions? Send us a message!
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-14 bg-gradient-to-br from-amber-50 to-yellow-100 border-y border-amber-200">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                animate={{ 
                  scale: [1, 1.05, 1],
                  color: ["#1e293b", "#b45309", "#1e293b"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                🎉 Special Offer for First-Time Clients!
              </motion.h2>
              <p className="text-lg text-gray-800">
                Sign up this month and get <motion.span 
                  className="font-bold text-amber-700"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                >
                  20% OFF
                </motion.span> your first automation package.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://calendly.com/rba-aus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-md transition-colors duration-200 min-w-[200px]"
              >
                Claim Your Offer Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-white" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Revolutionize Your Business?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Take the first step towards simpler, smarter business operations.<br />
              Schedule your free, no-pressure call and discover exactly how AI can transform your day-to-day.
            </motion.p>
            <motion.a 
              href="https://calendly.com/rba-aus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-gray-100 text-blue-700 font-semibold py-4 px-10 rounded-md text-lg transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Free AI Consultation
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 