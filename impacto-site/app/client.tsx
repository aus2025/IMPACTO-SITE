'use client';

import React from 'react';
import Link from 'next/link';
import ProcessTimeline from '@/components/ProcessTimeline';
import QuickConsultationForm from '@/components/QuickConsultationForm';
import StatisticsSection from '@/components/stats/StatisticsSection';
import CounterCard from '@/components/stats/CounterCard';
import { TrendingUp, AlertTriangle, Calendar } from 'lucide-react';

/**
 * Design & Formatting Instructions:
 * 1. Clearly distinguish sections with ample whitespace and subtle separators or background color variations.
 * 2. Use consistent bold headlines (H2) and smaller subtitles (H3) as shown.
 * 3. Style all CTAs as vibrant, clickable buttons matching the website's primary accent color.
 * 4. Ensure responsive design, optimized for desktop and mobile views.
 * 5. Enhance bullet points and numbered lists for readability and quick scanning.
 */

export default function HomePageClient() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-blue-700 text-white w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Streamline Your Business with AI Automation
            </h1>
            <p className="text-xl mb-8">
              Leverage cutting-edge AI to save time, reduce costs, and boost growth. Our automation solutions are designed for Australian small businesses to see fast returns and lasting efficiency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://calendly.com/rba-aus"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button-global"
              >
                Book Your Free Consultation
              </a>
              <Link href="/services" className="cta-button-global">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Impacto</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Cutting-Edge Technology</h3>
              <p className="text-gray-800">
                We leverage the latest AI and machine learning innovations to deliver powerful results for your business.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Rapid Implementation</h3>
              <p className="text-gray-800">
                Get up and running quickly. Our streamlined process means you see results (and ROI) in weeks, not months.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Measurable Results</h3>
              <p className="text-gray-800">
                Track productivity gains, error reductions, and cost savings easily. We deliver transparent ROI reports to show your business growth.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Accessible & Affordable</h3>
              <p className="text-gray-800">
                Designed for Australian small businesses – our solutions are budget-friendly and easy to implement, making AI automation accessible to companies of all sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services section - MOVED UP */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our AI-Powered Solutions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Social Media Marketing */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 shadow-sm">
              <div className="mb-4">
                <span className="inline-block p-3 bg-purple-100 text-purple-700 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Social Media Marketing Automation</h3>
              <p className="text-gray-700 mb-4">
                Automate your social media presence with AI. Save hours on content creation and scheduling while boosting your online engagement and reach.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800">Posts go out consistently without manual effort</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800">Automatically reach the right audience through smart analytics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800">Continuous optimization to improve results every month</span>
                </li>
              </ul>
              <Link href="/services/social-media" className="text-purple-700 hover:text-purple-900 font-medium flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Business Automation */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 shadow-sm">
              <div className="mb-4">
                <span className="inline-block p-3 bg-blue-100 text-blue-700 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Business Process Automation</h3>
              <p className="text-gray-700 mb-4">
                Streamline your operations by automating repetitive tasks. Our intelligent workflows cut costs and eliminate manual errors, so your team can focus on growth.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800">Solutions tailored to your business processes for maximum efficiency</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800">Easily connects with your existing tools and systems – no disruption</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800">Reduces operational costs and minimizes mistakes</span>
                </li>
              </ul>
              <Link href="/services/automation-services" className="text-blue-700 hover:text-blue-900 font-medium flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
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

      {/* Starter Offer CTA Banner */}
      <section className="mt-0 py-12 bg-gradient-to-br from-amber-50 to-yellow-100 border-y border-amber-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <path d="M12 8l6-3-6-3v6" />
                    <path d="M12 16l-6-3 6-3v6" />
                    <path d="M12 22l6-3-6-3v6" />
                    <path d="M12 14l6-3-6-3v6" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">🎉 Starter Offer for New Clients</h2>
              </div>
              <p className="text-lg text-gray-800 mb-6">
                For a limited time, new Impacto clients receive <span className="font-bold text-amber-700">20% off</span> their first automation project. Kickstart your AI automation journey and save on initial costs!
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://calendly.com/rba-aus?utm_source=starter-offer"
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
              <footer className="font-medium">
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
              <footer className="font-medium">
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
              <footer className="font-medium">
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
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Is AI automation suitable for a small business like mine?</h3>
              <p className="text-gray-700">
                Absolutely. Our AI solutions are scalable and can be tailored to businesses of any size. We have successfully implemented automation for solo entrepreneurs up to mid-sized companies. <span className="font-medium">No big IT department is required</span> – if you have processes that consume time, we can likely automate them and free you up to focus on your business.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">How quickly will I see a return on investment (ROI)?</h3>
              <p className="text-gray-700">
                Most of our clients start noticing improvements immediately, and many see a full <span className="font-medium">ROI within the first 4&ndash;6 months</span> of implementation. We focus on quick wins – like reducing manual work and errors – which translates into fast savings. Our goal is to have the automation pay for itself as soon as possible for you.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Do I need any technical expertise or an IT team to use your solutions?</h3>
              <p className="text-gray-700">
                No technical expertise is needed on your part. The Impacto team handles all the heavy lifting – from setting up the AI tools to integrating with your systems. We also provide training to you and your staff. If you can use everyday business software, you can use our AI solutions. We're here to support you at every step.
              </p>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-gray-700 mb-4">Still have questions? We're happy to help.</p>
              <a 
                href="https://calendly.com/rba-aus" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Book a free call with our team
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
            <Link 
              href="/pricing" 
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View Pricing
            </Link>
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
              <a
                href="https://calendly.com/rba-aus"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button-global"
              >
                Book Your Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 