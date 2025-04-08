'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, Clock, TrendingUp, CheckCircle, Headphones, ChevronDown, DollarSign, Clock3, AlertCircle, Gift } from 'lucide-react';
import Link from 'next/link';
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const flip = {
  initial: { rotateY: 0 },
  flip: { rotateY: 180, transition: { duration: 0.6 } },
  revert: { rotateY: 0, transition: { duration: 0.6 } }
};

// Colors for gradient backgrounds
const gradientColors = [
  "from-blue-400/50 to-indigo-400/50",
  "from-purple-400/50 to-pink-400/50",
  "from-emerald-400/50 to-teal-400/50",
  "from-amber-400/50 to-orange-400/50"
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [flippedIcon, setFlippedIcon] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleIconFlip = (index: number) => {
    setFlippedIcon(flippedIcon === index ? null : index);
  };

  const benefitIcons = [
    {
      frontIcon: <Clock className="h-8 w-8" />,
      backIcon: <Gift className="h-8 w-8" />,
      title: "Time Freedom",
      description: "Reclaim hours every week by automating repetitive tasks so you can focus on strategy and growth."
    },
    {
      frontIcon: <DollarSign className="h-8 w-8" />,
      backIcon: <TrendingUp className="h-8 w-8" />,
      title: "Lower Payroll Costs",
      description: "Do more with your existing team by eliminating manual busywork and reducing the need for additional hires."
    },
    {
      frontIcon: <Clock3 className="h-8 w-8" />,
      backIcon: <CheckCircle className="h-8 w-8" />,
      title: "Faster Response Time",
      description: "Instantly engage with leads and customers 24/7, even when you're offline or focusing elsewhere."
    },
    {
      frontIcon: <AlertCircle className="h-8 w-8" />,
      backIcon: <Headphones className="h-8 w-8" />,
      title: "Peace of Mind",
      description: "Know your business runs smoothly in the background while you tackle bigger challenges or enjoy your life."
    }
  ];

  const faqs = [
    {
      question: "How long does it take to get started?",
      answer: "For the Kickstart Plan, we can have your basic automations set up within 3-5 business days. For Growth and Scale plans, implementation typically takes 1-2 weeks depending on complexity."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! Our plans are designed as a growth path. Start with what you need now and upgrade as your business grows and your automation needs become more sophisticated."
    },
    {
      question: "Do I need technical skills to use your services?",
      answer: "Not at all. Our done-for-you approach means we handle all the technical aspects. You simply tell us what you need, and we implement it for you."
    },
    {
      question: "What if I need help after implementation?",
      answer: "All plans include support. Kickstart includes email support, Growth adds priority chat, and Scale includes dedicated phone support and strategy sessions."
    }
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)', backgroundImage: 'none' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              More Time, Lower Costs, and Peace of Mind
            </h1>
            <p className="text-xl md:text-2xl mb-10">
              Automation that works for your business — so you can focus on growth without the burnout.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="font-medium text-base bg-transparent border-white text-white hover:bg-white hover:text-blue-700 cursor-pointer"
                onClick={() => window.location.href = "/assessment"}
              >
                Take the Quiz
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Plans for Your Business Growth</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the right plan based on where you are in your automation journey. Start small and scale as you grow.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Kickstart Plan */}
              <div onClick={() => window.location.href = "/pricing/kickstart"} className="cursor-pointer transform transition-all duration-300 hover:scale-105">
                <Card className="flex flex-col h-full hover:shadow-lg transition-shadow border-yellow-400/40 overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-400/40 to-yellow-500/40 py-8 px-6 border-b">
                    <CardTitle className="text-2xl">Kickstart Plan</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$149</span>
                      <span className="text-gray-600">/mo</span>
                      <span className="block text-sm text-gray-600 mt-1">or $499 one-time</span>
                    </div>
                    <CardDescription className="mt-2 italic text-gray-700">
                      Best for solopreneurs & small teams new to automation.
                    </CardDescription>
                  </div>
                  <CardContent className="pt-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Social Media Scheduling (1-2 platforms)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Lead Capture to CRM (web forms)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Email Welcome Flow (3-step)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span><strong>Support:</strong> Email support</span>
                      </li>
                      <li className="flex items-start mt-4 text-yellow-600">
                        <CheckIcon className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                        <span className="font-medium">Great first step to start seeing automation in action</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700 cursor-pointer" size="lg" onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = "/pricing/kickstart";
                    }}>
                      Start Free
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Growth Plan */}
              <div onClick={() => window.location.href = "/pricing/growth"} className="cursor-pointer transform transition-all duration-300 hover:scale-105">
                <Card className="flex flex-col h-full border-green-500 shadow-lg relative">
                  <div className="absolute top-0 inset-x-0 flex justify-center transform -translate-y-1/2">
                    <Badge className="bg-green-500 text-white px-3 py-1 text-sm">Popular</Badge>
                  </div>
                  <div className="bg-gradient-to-r from-green-400/40 to-green-500/40 py-8 px-6 border-b rounded-t-lg">
                    <CardTitle className="text-2xl">Growth Plan</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$599</span>
                      <span className="text-gray-600">/mo</span>
                    </div>
                    <CardDescription className="mt-2 italic text-gray-700">
                      For businesses ready to expand with multi-channel automation.
                    </CardDescription>
                  </div>
                  <CardContent className="pt-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Social Media Automation (AI copy & scheduling for 3+ platforms)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Enhanced CRM Integration (lead capture with advanced tagging)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Automated Email & SMS Sequences (multi-step nurture campaigns)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Appointment Scheduling Automation (sync calendars & reminders)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Basic Chatbot for Website (handles FAQs or booking)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span><strong>Support:</strong> Priority email & chat support, quarterly tune-ups</span>
                      </li>
                      <li className="flex items-start mt-4 text-green-600">
                        <CheckIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <span className="font-medium">Full execution with measurable time & cost savings</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700 cursor-pointer" size="lg" onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = "/pricing/growth";
                    }}>
                      Book a Demo
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Scale Plan */}
              <div onClick={() => window.location.href = "/pricing/scale"} className="cursor-pointer transform transition-all duration-300 hover:scale-105">
                <Card className="flex flex-col h-full hover:shadow-lg transition-shadow border-red-400/40 overflow-hidden">
                  <div className="bg-gradient-to-r from-red-400/40 to-red-500/40 py-8 px-6 border-b">
                    <CardTitle className="text-2xl">Scale Plan</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$1,499</span>
                      <span className="text-gray-600">/mo</span>
                    </div>
                    <CardDescription className="mt-2 italic text-gray-700">
                      Premium solution for automation-mature businesses ready to scale.
                    </CardDescription>
                  </div>
                  <CardContent className="pt-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-start font-medium">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>All features of Growth, plus:</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Advanced Chatbot Integration (AI chatbot tailored to your business)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Custom Workflow Automation (tailored scripts or integrations unique to your processes)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Multi-platform Social & Ads Automation (expand to advertising workflows)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>VIP Support & Strategy (dedicated automation strategist, phone support)</span>
                      </li>
                      <li className="flex items-start mt-4 text-red-600">
                        <CheckIcon className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                        <span className="font-medium">Premium solution only for automation-mature clients</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = "/pricing/scale";
                      }}
                    >
                      Talk to Us
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What You're Really Getting
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our automation is about more than just tech—it's about transforming your business and life.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {benefitIcons.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  variants={cardVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <motion.div 
                    className={`mb-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${gradientColors[index]} shadow-md cursor-pointer perspective-600`}
                    onHoverStart={() => handleIconFlip(index)}
                    onHoverEnd={() => handleIconFlip(null)}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div 
                      className="absolute w-full h-full flex items-center justify-center text-white"
                      animate={flippedIcon === index ? "flip" : "revert"}
                      variants={flip}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {benefit.frontIcon}
                    </motion.div>
                    <motion.div 
                      className="absolute w-full h-full flex items-center justify-center text-white"
                      initial={{ rotateY: 180 }}
                      animate={flippedIcon === index ? "revert" : "flip"}
                      variants={flip}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {benefit.backIcon}
                    </motion.div>
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-bold mb-2 text-blue-700"
                    whileHover={{ scale: 1.05 }}
                  >
                    {benefit.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {benefit.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* ROI Calculator CTA */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mx-4 md:mx-12 my-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Not Sure Which Plan Is Right?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Take our quick Automation Readiness Quiz to get a personalized recommendation based on your business needs.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg cursor-pointer"
                onClick={() => window.location.href = "/assessment"}
              >
                Take the Quiz
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* FAQ section */}
      <motion.section 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <motion.div 
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  variants={cardVariants}
                >
                  <motion.button 
                    className="flex justify-between items-center w-full text-left focus:outline-none"
                    onClick={() => toggleFaq(index)}
                    whileHover={{ x: 5 }}
                  >
                    <h3 className="text-xl font-semibold text-blue-700">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-6 w-6 text-blue-600" />
                    </motion.div>
                  </motion.button>
                  
                  <motion.div 
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ 
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0,
                      marginTop: openFaq === index ? 16 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Final CTA */}
      <section className="py-16 bg-blue-700 text-white" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)', backgroundImage: 'none' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Take Back Your Time?</h2>
            <p className="text-xl mb-8">
              Start with a plan that fits your business today, and grow with us as your needs evolve.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  className="bg-white text-blue-700 hover:bg-gray-100 font-semibold text-base px-8 py-6 shadow-lg"
                  size="lg"
                  onClick={() => window.location.href = "/assessment"}
                >
                  Take the Quiz
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold text-base px-8 py-6 shadow-lg"
                  size="lg"
                  onClick={() => window.location.href = "/contact"}
                >
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 