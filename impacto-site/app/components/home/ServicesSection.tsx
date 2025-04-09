'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Share2, Cpu } from 'lucide-react';
import { staggerContainer, cardVariants } from './animations';

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our AI-Powered Solutions
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Social Media Marketing */}
          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 shadow-sm"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
            >
              <motion.span 
                className="inline-block p-3 bg-purple-100 text-purple-700 rounded-full"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Share2 className="h-6 w-6" />
              </motion.span>
            </motion.div>
            <h3 className="text-2xl font-semibold mb-3">Social Media Marketing Automation</h3>
            <p className="text-gray-700 mb-4">
              Automate your social media presence with AI. Save hours on content creation and scheduling while boosting your online engagement and reach.
            </p>
            <motion.ul 
              className="space-y-2 mb-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li 
                className="flex items-start"
                variants={cardVariants}
              >
                <motion.svg 
                  className="w-5 h-5 text-green-500 mr-2 mt-1" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </motion.svg>
                <span className="text-blue-800">Posts go out consistently without manual effort</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                variants={cardVariants}
              >
                <motion.svg 
                  className="w-5 h-5 text-green-500 mr-2 mt-1" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </motion.svg>
                <span className="text-blue-800">Automatically reach the right audience through smart analytics</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                variants={cardVariants}
              >
                <motion.svg 
                  className="w-5 h-5 text-green-500 mr-2 mt-1" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </motion.svg>
                <span className="text-blue-800">Continuous optimization to improve results every month</span>
              </motion.li>
            </motion.ul>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/services/social-media" className="text-purple-700 hover:text-purple-900 font-medium flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Business Automation */}
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 shadow-sm"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
            >
              <motion.span 
                className="inline-block p-3 bg-blue-100 text-blue-700 rounded-full"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Cpu className="h-6 w-6" />
              </motion.span>
            </motion.div>
            <h3 className="text-2xl font-semibold mb-3">Business Process Automation</h3>
            <p className="text-gray-700 mb-4">
              Streamline your operations by automating repetitive tasks. Our intelligent workflows cut costs and eliminate manual errors, so your team can focus on growth.
            </p>
            <motion.ul 
              className="space-y-2 mb-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li 
                className="flex items-start"
                variants={cardVariants}
              >
                <motion.svg 
                  className="w-5 h-5 text-green-500 mr-2 mt-1" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </motion.svg>
                <span className="text-blue-800">Solutions tailored to your business processes for maximum efficiency</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                variants={cardVariants}
              >
                <motion.svg 
                  className="w-5 h-5 text-green-500 mr-2 mt-1" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </motion.svg>
                <span className="text-blue-800">Easily connects with your existing tools and systems – no disruption</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                variants={cardVariants}
              >
                <motion.svg 
                  className="w-5 h-5 text-green-500 mr-2 mt-1" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </motion.svg>
                <span className="text-blue-800">Reduces operational costs and minimizes mistakes</span>
              </motion.li>
            </motion.ul>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/services/automation-services" className="text-blue-700 hover:text-blue-900 font-medium flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 