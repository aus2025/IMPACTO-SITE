"use client";

import React from 'react';
import { FaLightbulb, FaHandshake, FaTools, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import { MdOutlineEmojiPeople, MdSettings, MdDevices, MdSupportAgent } from 'react-icons/md';
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

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              About Impacto
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              AI made simple, powerful, and personal — for businesses like yours.
            </p>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Our Mission */}
        <motion.section 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center">
            <span className="mr-3 text-blue-600">🚀</span> Our Mission
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Impacto Automation AI was founded with a single mission: to make artificial intelligence and automation accessible, practical, and powerful for everyone—especially beginners and small to medium-sized businesses. We believe that AI isn&apos;t just for tech giants or experts – it&apos;s a tool that anyone can use to solve <span className="font-bold text-blue-600">real problems</span>, improve efficiency, and innovate. Our mission is to break down barriers so that <strong>you</strong> can harness the power of AI in your everyday work and projects.
            </p>
            <p>
              We're not just building smart tools — we're helping real people like you automate the stuff that slows you down, so you can focus on <span className="font-bold text-blue-600">growth, creativity, and doing what you love</span>.
            </p>
          </div>
        </motion.section>
        
        {/* Why We Exist */}
        <motion.section 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center">
            <span className="mr-3 text-blue-600">💡</span> Why We Exist
          </h2>
          <div className="prose prose-lg max-w-none">
            <p>
              We founded Impacto Automation AI because we saw a gap. So many small and medium-sized businesses want to leverage AI but feel it&apos;s too complicated, too expensive, or just out of reach. We&apos;re here to change that.
            </p>
            <p>
              By simplifying complex concepts and focusing on practical solutions, we help demystify AI for everyday people. In short, we exist to empower those who thought AI was &quot;not for me&quot; to finally say, &quot;I <em>can</em> do this with AI.&quot;
            </p>
          </div>
        </motion.section>
        
        {/* Our Story */}
        <motion.section 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center">
            <span className="mr-3 text-blue-600">📖</span> Our Story
          </h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Impacto Automation AI began in 2022 with a simple idea and a lot of passion. Rafael "Rafa" Ananias – Founder, Impacto Automation AI, has been in love with computing since the days of MS-DOS. When he started exploring the world of AI in 2022, he realized something important: most people never had the chance to access or learn about this powerful technology. Rafael taught himself AI from the ground up and brought together a team of like-minded AI enthusiasts.
            </p>
            <p>
              Together, they set out to turn that knowledge into practical tools and guidance for everyone. What started as one person&apos;s dream is now a growing team on a mission to make AI approachable and beneficial to all.
            </p>
          </div>
        </motion.section>
        
        {/* Meet the Founder */}
        <motion.section 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center">
            <span className="mr-3 text-blue-600">👋</span> Meet the Founder
          </h2>
          <div className="bg-blue-50 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
              <div className="bg-blue-100 rounded-full w-48 h-48 flex items-center justify-center shadow-md">
                <svg viewBox="0 0 200 200" className="w-40 h-40 text-blue-500">
                  <circle cx="100" cy="70" r="40" fill="currentColor" opacity="0.7" />
                  <rect x="60" y="115" width="80" height="65" rx="20" fill="currentColor" opacity="0.7" />
                </svg>
                <span className="absolute text-lg font-bold text-white">Rafa</span>
              </div>
              <div className="prose prose-lg max-w-none">
                <p>
                  Hi, I&apos;m Rafael "Rafa" Ananias – Founder, Impacto Automation AI.
                  My journey with technology started early, back when I was a curious kid experimenting with commands on a DOS computer. That spark never left. In 2022, when I began exploring the world of Artificial Intelligence, one thing became clear: AI shouldn&apos;t be exclusive to tech experts or big corporations.
                </p>
                <p>
                  I launched Impacto Automation AI with a simple mission — to make the power of AI accessible to everyone. Whether you&apos;re a small business owner, educator, or creative professional, you deserve tools that work for you — not against you.
                </p>
              </div>
            </div>
            
            {/* Video placeholder */}
            <div className="rounded-xl bg-gray-200 p-6 text-center my-6">
              <div className="rounded-xl overflow-hidden relative bg-gray-300 aspect-video flex items-center justify-center">
                <span className="text-4xl">🎥</span>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <button className="bg-white/80 text-gray-600 rounded-full w-16 h-16 flex items-center justify-center opacity-70 cursor-not-allowed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                    </svg>
                  </button>
                  <p className="mt-3 font-medium">Founder Video Coming Soon — Currently Updating</p>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Today, I lead a passionate team committed to helping people harness <span className="font-bold text-blue-600">ethical, practical AI solutions</span> that simplify workflows, spark innovation, and create real impact.
              </p>
            </div>
          </div>
        </motion.section>
        
        {/* Our Vision */}
        <motion.section 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center">
            <span className="mr-3 text-blue-600">🔭</span> Our Vision
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              We envision a future where businesses can seamlessly blend human creativity with machine intelligence to create <span className="font-bold text-blue-600">superior outcomes</span>. Our goal is to be the leading partner in this transformation, guiding organizations toward a more efficient, productive, and innovative future through thoughtful automation.
            </p>
          </div>
        </motion.section>
        
        {/* Our Values */}
        <motion.section 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center">
            <span className="mr-3 text-blue-600">🌟</span> Our Values
          </h2>
          <p className="text-lg mb-4 text-gray-700">
            Impacto Automation AI is guided by a set of core values that shape our culture and drive our decisions:
          </p>
          <ul className="space-y-6">
            <motion.li 
              className="flex gap-6 items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <FaLightbulb />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Innovation</h3>
                <p className="text-gray-700">We constantly explore new ways to use AI and automation to make life easier and businesses more efficient.</p>
              </div>
            </motion.li>
            <motion.li 
              className="flex gap-6 items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <MdOutlineEmojiPeople />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Accessibility</h3>
                <p className="text-gray-700">Technology should be for everyone. We design our tools and services so that even beginners feel welcome and supported.</p>
              </div>
            </motion.li>
            <motion.li 
              className="flex gap-6 items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <FaTools />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Practicality</h3>
                <p className="text-gray-700">We focus on <span className="font-bold text-blue-600">real-world solutions</span> that you can put to use today. No hype, just tools and results that work in daily operations.</p>
              </div>
            </motion.li>
            <motion.li 
              className="flex gap-6 items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <FaShieldAlt />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Ethical AI</h3>
                <p className="text-gray-700">We believe in using AI responsibly and transparently. Our solutions are designed to empower people while respecting privacy and human dignity.</p>
              </div>
            </motion.li>
            <motion.li 
              className="flex gap-6 items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <FaChartLine />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Real-World Results</h3>
                <p className="text-gray-700">We measure success by the <span className="font-bold text-blue-600">tangible improvements</span> we create for our clients. If it doesn&apos;t help you in the real world, we won&apos;t recommend it.</p>
              </div>
            </motion.li>
          </ul>
        </motion.section>
        
        {/* What You Can Expect */}
        <motion.section 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center">
            <span className="mr-3 text-blue-600">✨</span> What You Can Expect
          </h2>
          <ul className="space-y-6">
            <motion.li 
              className="flex gap-6 items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10.3 21.7v-1.1c0-.3-.3-.6-.6-.6H6.9c-.3 0-.6.3-.6.6v1.1c0 .3.3.6.6.6h2.8c.3 0 .6-.3.6-.6zm4.4 0v-1.1c0-.3-.3-.6-.6-.6h-2.8c-.3 0-.6.3-.6.6v1.1c0 .3.3.6.6.6h2.8c.4 0 .6-.3.6-.6zm4.4 0v-1.1c0-.3-.3-.6-.6-.6h-2.8c-.3 0-.6.3-.6.6v1.1c0 .3.3.6.6.6h2.8c.3 0 .6-.3.6-.6zM7.5 9.8h2.2v2.8H7.5V9.8zm-.6-7.5c-.3 0-.6.3-.6.6v1.1c0 .3.3.6.6.6h2.8c.3 0 .6-.3.6-.6V2.9c0-.3-.3-.6-.6-.6H6.9zm4.4 0c-.3 0-.6.3-.6.6v1.1c0 .3.3.6.6.6h2.8c.3 0 .6-.3.6-.6V2.9c0-.3-.3-.6-.6-.6h-2.8zm3.5 3.9h-9.2c-.9 0-1.7.7-1.7 1.7v9.2c0 .9.7 1.7 1.7 1.7h9.2c.9 0 1.7-.7 1.7-1.7V7.9c0-1-.8-1.7-1.7-1.7zm-5.6 11.1c-1.6 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8 2.8 1.3 2.8 2.8-1.3 2.8-2.8 2.8zm11.1-11.1h-3.9c0-1.4-1.1-2.5-2.5-2.5H8.1c-1.4 0-2.5 1.1-2.5 2.5H1.7C.8 6.2 0 7 0 7.9v12.4c0 .9.7 1.7 1.7 1.7h12.3c.9 0 1.7-.7 1.7-1.7v-2h4.5c.9 0 1.7-.7 1.7-1.7V7.9c-.1-.9-.8-1.7-1.7-1.7z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">No tech jargon</h3>
                <p className="text-gray-700">We explain everything in plain language that makes sense, <span className="font-bold text-blue-600">no matter your technical background</span>.</p>
              </div>
            </motion.li>
            <motion.li 
              className="flex gap-6 items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <MdSettings />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Done-for-you setup</h3>
                <p className="text-gray-700">We handle the technical implementation so you can focus on using AI, not configuring it.</p>
              </div>
            </motion.li>
            <motion.li 
              className="flex gap-6 items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <MdDevices />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Tools that fit your business</h3>
                <p className="text-gray-700">We customize solutions to match <span className="font-bold text-blue-600">your unique challenges and goals</span>, not one-size-fits-all packages.</p>
              </div>
            </motion.li>
            <motion.li 
              className="flex gap-6 items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <MdSupportAgent />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Friendly support — real humans, not bots</h3>
                <p className="text-gray-700">When you need help, you'll talk to real people who understand your business and care about <span className="font-bold text-blue-600">your success</span>.</p>
              </div>
            </motion.li>
          </ul>
        </motion.section>
        
        {/* Interactive Quiz */}
        <motion.section 
          className="mb-16 bg-gray-50 p-8 rounded-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Where Are You in Your Automation Journey?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a 
              href="/blueprint-assessment"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-bold text-lg mb-2">Just Curious</h3>
              <p className="text-gray-600 text-sm">Explore our assessment quiz and find your business blueprint without any commitment</p>
            </motion.a>
            <motion.a 
              href="/services#starter"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-bold text-lg mb-2">Ready to Try It</h3>
              <p className="text-gray-600 text-sm">Get started with our beginner-friendly automation packages</p>
            </motion.a>
            <motion.a 
              href="/services#advanced"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="font-bold text-lg mb-2">Already Automating</h3>
              <p className="text-gray-600 text-sm">Take your existing automation to the next level with our expert solutions</p>
            </motion.a>
          </div>
        </motion.section>
        
        {/* Call to Action */}
        <motion.section 
          className="py-20 text-white" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
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
        </motion.section>
      </div>
      
      {/* Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 text-center z-50">
        <a
          href="https://calendly.com/rba-aus"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium"
        >
          Let's Talk About Your Goals
        </a>
      </div>
    </main>
  );
} 