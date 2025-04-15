'use client';

import React from 'react';
import Link from 'next/link';

export default function SocialMediaMarketingClient() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Automate Your Social Media Marketing & Grow Your Brand Effortlessly
            </h1>
            <p className="text-xl mb-8">
              Take back your time and boost your online presence with AI-powered solutions designed for businesses of all sizes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/assessment" className="cta-button-global">
                Start Your Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is Social Media Automation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              What is Social Media Marketing Automation?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Social Media Marketing Automation is the process of using smart tools to handle repetitive social media tasks automatically, freeing you to focus on strategy and growth.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Instead of spending hours every day manually creating posts, scheduling content, responding to mentions, and generating performance reports, our automation solutions do it all for you.
                </p>
                <p className="text-lg text-gray-700">
                  This means consistent posting across LinkedIn, Instagram, Facebook, and other platforms, timely responses to your audience, and data-driven insights—all without the daily grind.
                </p>
              </div>
              <div className="bg-gray-100 p-8 rounded-xl">
                <div className="text-7xl mb-4 text-center">📱</div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Key Automation Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">✓</span>
                    <span className="text-black">Content creation and scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">✓</span>
                    <span className="text-black">Automated posting across platforms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">✓</span>
                    <span className="text-black">Audience monitoring and engagement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">✓</span>
                    <span className="text-black">Performance analytics and reporting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">✓</span>
                    <span className="text-black">AI-powered content optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why Your Business Needs Social Media Automation
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Save Precious Time</h3>
                <p className="text-gray-700">
                  Reclaim 10+ hours every week that you'd normally spend on manual posting, content creation, and engagement. Our clients typically save 40-60 hours monthly.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Consistent Posting</h3>
                <p className="text-gray-700">
                  Maintain a steady stream of content even when you're busy with other aspects of your business. Consistency is key to social media success and algorithm favor.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Improved Reach & Engagement</h3>
                <p className="text-gray-700">
                  Reach more of your target audience at optimal times with data-driven posting schedules and engagement strategies that boost visibility and interaction.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Valuable Data Insights</h3>
                <p className="text-gray-700">
                  Gain actionable intelligence through automated reporting and analytics that help you understand what's working and where to adjust your strategy.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a href="https://calendly.com/impactoautomation-ai" className="cta-button-global">Book a Free Discovery Call</a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              How Our Social Media Automation Works
            </h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Strategy Session</h3>
                  <p className="text-gray-700">
                    We start by understanding your brand, audience, and goals. Our team works with you to develop a customized social media strategy that aligns with your business objectives.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Platform Setup & Integration</h3>
                  <p className="text-gray-700">
                    Our team configures your automation tools and integrates them with your social media platforms. We handle all the technical aspects so you don't have to worry about the setup.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Content Creation & Scheduling</h3>
                  <p className="text-gray-700">
                    Using AI and human creativity, we develop a content calendar and create posts that resonate with your audience. These are automatically scheduled for optimal engagement times.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Monitoring & Optimization</h3>
                  <p className="text-gray-700">
                    Our system continuously monitors performance and engagement, making data-driven adjustments to improve results over time. You'll receive regular reports on your social media performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 text-white" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Social Media Strategy?</h2>
            <p className="text-xl mb-8">
              Join businesses that have increased their social engagement by 240% and saved 40+ hours per month with our automation solutions.
            </p>
            <Link href="/contact" className="cta-button-global">
              Get In Touch To Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 