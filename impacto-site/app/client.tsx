'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProcessTimeline from '@/components/ProcessTimeline';
import StatisticsSection from '@/components/stats/StatisticsSection';
import CounterCard from '@/components/stats/CounterCard';
import { TrendingUp, AlertTriangle, Calendar, Zap, Rocket, BarChart2, DollarSign, Share2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

// Create a motion-enabled Link component
const MotionLink = motion(Link);

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const iconAnimation = {
  hidden: { scale: 0, rotate: -15 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: { 
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.1
    }
  }
};

/**
 * Design & Formatting Instructions:
 * 1. Clearly distinguish sections with ample whitespace and subtle separators or background color variations.
 * 2. Use consistent bold headlines (H2) and smaller subtitles (H3) as shown.
 * 3. Style all CTAs as vibrant, clickable buttons matching the website's primary accent color.
 * 4. Ensure responsive design, optimized for desktop and mobile views.
 * 5. Enhance bullet points and numbered lists for readability and quick scanning.
 */

export default function HomePageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-16 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Streamline Your Business with AI Automation
            </h1>
            <p className="text-xl mb-8">
              Cut costs, save time, and grow faster.<br />
              Smart automation tailored for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* Start Free button removed as requested */}
            </div>
            
            {/* Promotion Banner */}
            <div className="mt-8 bg-yellow-400 text-gray-900 rounded-lg p-4 inline-block animate-pulse">
              <p className="font-bold">Special Offer for First-Time Clients!</p>
              <p className="text-sm mb-2">Sign up this month and get 20% OFF your first automation package.</p>
              <Link href="/blueprint-assessment" className="inline-block bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                Claim Your Offer Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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

      {/* Services section - MOVED UP */}
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
                <Link href="/services/social-media-marketing" className="text-purple-700 hover:text-purple-900 font-medium flex items-center">
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

      {/* Proven Business Impact section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Proven Business Impact</h2>
          <p className="text-lg text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Our AI solutions deliver measurable results for businesses, fast.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <CounterCard 
              endValue={60}
              label="Increased Productivity"
              icon={<TrendingUp className="w-8 h-8 text-green-600" />}
              prefix="+"
              suffix="%"
              className="bg-gradient-to-br from-green-50 to-emerald-50"
            />
            
            <CounterCard 
              endValue={85}
              label="Error Reduction"
              icon={<AlertTriangle className="w-8 h-8 text-amber-600" />}
              prefix="-"
              suffix="%"
              className="bg-gradient-to-br from-amber-50 to-yellow-50"
            />
            
            <CounterCard 
              endValue={4.5}
              label="Months ROI Timeline"
              icon={<Calendar className="w-8 h-8 text-purple-600" />}
              decimals={1}
              className="bg-gradient-to-br from-purple-50 to-indigo-50"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <StatisticsSection />

      {/* How We Achieve These Results: Our 4-Step Method */}
      <div className="relative z-10 mb-0">
        <ProcessTimeline />
      </div>

      {/* Kickstart Offer Section */}
      <section className="py-14 bg-gradient-to-br from-amber-50 to-yellow-100 border-y border-amber-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">🎉 Starter Offer for New Clients</h2>
              <p className="text-lg text-gray-800">
                For a limited time, new Impacto clients receive <span className="font-bold text-amber-700">20% off</span> their first automation project.
              </p>
              <p className="text-lg text-gray-800">
                Kickstart your AI automation journey and save on initial costs!
              </p>
            </div>
            <div>
              <a
                href="https://calendly.com/impactoautomation-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-md transition-colors duration-200 min-w-[200px]"
              >
                Claim Your Offer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 mb-3">
                &quot;Impacto&apos;s AI tools helped me increase my productivity by <strong>87%</strong> while reducing the pressure I felt daily. Now I get more done in <strong>less time</strong> and finally have the space to breathe and focus on what matters.&quot;
              </blockquote>
              <footer className="font-medium text-gray-700">
                - Sarah J.
              </footer>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 mb-3">
                &quot;With Impacto&apos;s automation tools, I&apos;ve simplified my daily routine, <strong>eliminated errors</strong>, and finally feel in control of my time. I&apos;m more <strong>focused</strong>, less stressed, and way more <strong>efficient</strong>.&quot;
              </blockquote>
              <footer className="font-medium text-gray-700">
                - Michael T.
              </footer>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 mb-3">
                &quot;Impacto made it <strong>incredibly easy</strong> to bring AI into my daily life. Now I have routines that work, I&apos;m <strong>achieving more</strong>, and I feel <strong>empowered</strong> by the structure I&apos;ve built.&quot;
              </blockquote>
              <footer className="font-medium text-gray-700">
                - David L.
              </footer>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {/* FAQ Item 1 */}
              <div className="py-4">
                <button 
                  className="flex justify-between items-center w-full text-left focus:outline-none" 
                  onClick={() => toggleFaq(0)}
                >
                  <h3 className="text-xl font-semibold text-gray-800">Is AI automation suitable for a small business like mine?</h3>
                  <svg 
                    className={`w-6 h-6 text-gray-500 transform ${openFaq === 0 ? 'rotate-180' : ''} transition-transform duration-200`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === 0 && (
                  <div className="mt-3 text-gray-700">
                    <p>
                      Absolutely. Our AI solutions are scalable and can be tailored to businesses of any size. We have successfully implemented automation for solo entrepreneurs up to mid-sized companies. <span className="font-medium">No big IT department is required</span> – if you have processes that consume time, we can likely automate them and free you up to focus on your business.
                    </p>
                  </div>
                )}
              </div>
              
              {/* FAQ Item 2 */}
              <div className="py-4">
                <button 
                  className="flex justify-between items-center w-full text-left focus:outline-none" 
                  onClick={() => toggleFaq(1)}
                >
                  <h3 className="text-xl font-semibold text-gray-800">How quickly will I see a return on investment (ROI)?</h3>
                  <svg 
                    className={`w-6 h-6 text-gray-500 transform ${openFaq === 1 ? 'rotate-180' : ''} transition-transform duration-200`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === 1 && (
                  <div className="mt-3 text-gray-700">
                    <p>
                      Most of our clients start noticing improvements immediately, and many see a full <span className="font-medium">ROI within the first 4&ndash;6 months</span> of implementation. We focus on quick wins – like reducing manual work and errors – which translates into fast savings. Our goal is to have the automation pay for itself as soon as possible for you.
                    </p>
                  </div>
                )}
              </div>
              
              {/* FAQ Item 3 */}
              <div className="py-4">
                <button 
                  className="flex justify-between items-center w-full text-left focus:outline-none" 
                  onClick={() => toggleFaq(2)}
                >
                  <h3 className="text-xl font-semibold text-gray-800">Do I need any technical expertise or an IT team to use your solutions?</h3>
                  <svg 
                    className={`w-6 h-6 text-gray-500 transform ${openFaq === 2 ? 'rotate-180' : ''} transition-transform duration-200`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === 2 && (
                  <div className="mt-3 text-gray-700">
                    <p>
                      No technical expertise is needed on your part. The Impacto team handles all the heavy lifting – from setting up the AI tools to integrating with your systems. We also provide training to you and your staff. If you can use everyday business software, you can use our AI solutions. We're here to support you at every step.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-gray-700 mb-4">Still have questions? We're happy to help.</p>
              <a 
                href="/contact" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                More Questions? Send us a message!
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plan Teaser */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Affordable, Transparent Pricing</h2>
            <p className="text-gray-700 mb-6">
              We offer flexible plans to suit businesses of all sizes. Whether you're just starting with automation or scaling up, our pricing is straightforward and designed to deliver ROI — with no hidden costs.
            </p>
            <MotionLink 
              href="/pricing" 
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Pricing
            </MotionLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
            <p className="text-xl mb-8 max-w-2xl">
              Schedule a free, no-obligation consultation with our automation experts and discover how our AI solutions can drive your business forward.
            </p>
            <div className="w-full flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
              <motion.a
                href="https://calendly.com/impactoautomation-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button-global"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Free Consultation
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 