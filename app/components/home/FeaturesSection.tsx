'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Rocket, BarChart2, DollarSign } from 'lucide-react';
import { staggerContainer, cardVariants, iconAnimation } from './animations';

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Impacto
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            variants={cardVariants}
            whileHover={{ 
              y: -10, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              backgroundColor: "rgba(243, 244, 255, 1)"
            }}
          >
            <motion.div 
              className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4"
              variants={iconAnimation}
            >
              <Zap className="h-6 w-6 text-blue-600" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">Cutting-Edge Technology</h3>
            <p className="text-gray-800">
              We leverage the latest AI and machine learning innovations to deliver powerful results for your business.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            variants={cardVariants}
            whileHover={{ 
              y: -10, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              backgroundColor: "rgba(240, 253, 244, 1)"
            }}
          >
            <motion.div 
              className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4"
              variants={iconAnimation}
            >
              <Rocket className="h-6 w-6 text-green-600" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">Rapid Implementation</h3>
            <p className="text-gray-800">
              Get up and running quickly. Our streamlined process means you see results (and ROI) in weeks, not months.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            variants={cardVariants}
            whileHover={{ 
              y: -10, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              backgroundColor: "rgba(245, 243, 255, 1)"
            }}
          >
            <motion.div 
              className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4"
              variants={iconAnimation}
            >
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">Measurable Results</h3>
            <p className="text-gray-800">
              Track productivity gains, error reductions, and cost savings easily. We deliver transparent ROI reports to show your business growth.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            variants={cardVariants}
            whileHover={{ 
              y: -10, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              backgroundColor: "rgba(254, 252, 232, 1)"
            }}
          >
            <motion.div 
              className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4"
              variants={iconAnimation}
            >
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">Accessible & Affordable</h3>
            <p className="text-gray-800">
              Designed for Australian small businesses – our solutions are budget-friendly and easy to implement, making AI automation accessible to companies of all sizes.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 