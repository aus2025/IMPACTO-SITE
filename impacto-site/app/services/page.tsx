import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Our Services | Impacto Automation AI',
  description: 'AI-powered automation solutions for Australian small businesses. Simplify workflows, boost productivity, and accelerate growth.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-24 bg-blue-700 text-white w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transform Your Business with AI-Powered Automation
            </h1>
            <p className="text-xl mb-8">
              Harness AI-driven solutions to simplify your workflows, supercharge productivity, and accelerate growth—tailored specifically for Australian small businesses.
            </p>
            <p className="text-lg italic mb-8">
              Discover how effortless automation can be.
            </p>
            <div>
              <a 
                href="https://calendly.com/rba-aus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white hover:bg-blue-50 text-blue-600 px-8 py-4 rounded-md font-semibold text-lg transition duration-300"
              >
                Book Your Free AI Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Impacto Automation AI?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <span className="text-green-500 text-2xl mr-3">✅</span>
                <div>
                  <h3 className="font-bold text-lg mb-2">Effortless Efficiency</h3>
                  <p className="text-gray-700">Automate repetitive tasks and reclaim valuable time.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <span className="text-green-500 text-2xl mr-3">✅</span>
                <div>
                  <h3 className="font-bold text-lg mb-2">Affordable Solutions</h3>
                  <p className="text-gray-700">Scalable packages for any budget—big results at small-business prices.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <span className="text-green-500 text-2xl mr-3">✅</span>
                <div>
                  <h3 className="font-bold text-lg mb-2">Proven Results</h3>
                  <p className="text-gray-700">Real clients report up to <strong>87%</strong> efficiency gains and up to <strong>35%</strong> cost reduction.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <span className="text-green-500 text-2xl mr-3">✅</span>
                <div>
                  <h3 className="font-bold text-lg mb-2">Seamless Integration</h3>
                  <p className="text-gray-700">Our solutions effortlessly blend with your existing systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our AI-Powered Solutions</h2>
          
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Social Media Marketing */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="text-blue-600 mr-3">🌐</span>
                Social Media Marketing Automation
              </h3>
              <p className="text-gray-700 mb-6">
                Save time and boost your online visibility with AI-crafted content that engages your audience effectively—without manual effort.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800"><strong>Automated content creation & scheduling:</strong> Post consistently without daily input.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800"><strong>AI-driven audience targeting:</strong> Reach exactly who matters most.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800"><strong>Real-time analytics:</strong> Continuously optimize your performance.</span>
                </li>
              </ul>
              <Link 
                href="/services/social-media-marketing" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
              >
                Explore Social Media Automation
              </Link>
            </div>

            <div className="border-t border-gray-200 w-full my-8"></div>

            {/* Business Workflow Automation */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="text-blue-600 mr-3">🤖</span>
                Business Workflow Automation
              </h3>
              <p className="text-gray-700 mb-6">
                Simplify your daily operations and eliminate manual tasks—allowing your business to scale effortlessly.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800"><strong>Tailored workflow solutions:</strong> Built to fit your exact business processes.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800"><strong>Easy integration:</strong> Connect smoothly with your existing tools (CRM, Email, ERP, and more).</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800"><strong>Reduce costs, minimize errors:</strong> Increase efficiency and profitability.</span>
                </li>
              </ul>
              <Link 
                href="/services/automation-services" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
              >
                Explore Workflow Automation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Impact You Can Measure</h2>
          <p className="text-center text-xl mb-10 max-w-3xl mx-auto">Our clients experience tangible results—fast:</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="text-blue-600 mb-2 text-lg font-medium">Increased Productivity</h3>
              <p className="text-4xl font-bold text-gray-900">+60%</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="text-blue-600 mb-2 text-lg font-medium">Faster Task Completion</h3>
              <p className="text-4xl font-bold text-gray-900">3x Faster</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="text-blue-600 mb-2 text-lg font-medium">Improved Team Efficiency</h3>
              <p className="text-4xl font-bold text-gray-900">+87%</p>
            </div>
          </div>
          
          <p className="text-center text-gray-700 mt-8 italic">
            Join other Australian businesses already benefiting from AI automation.
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Hear from Our Clients</h2>
          
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm">
            <div className="text-center">
              <svg className="w-12 h-12 text-blue-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-xl mb-6 text-gray-700 italic">
                "Impacto Automation AI made automation easy and affordable. Our productivity skyrocketed and costs dropped significantly. Best business decision we've made!"
              </blockquote>
              <div className="font-semibold text-gray-900">David L.</div>
              <div className="text-gray-700">Local Business Owner</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Getting Started is Easy:</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-bold text-xl mb-3">Book a Free Consultation</h3>
                <p className="text-gray-700">Schedule a no-obligation call with our team.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-bold text-xl mb-3">Get Your Custom Plan</h3>
                <p className="text-gray-700">Receive a personalized automation strategy tailored to your business.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-bold text-xl mb-3">Enjoy Immediate Results</h3>
                <p className="text-gray-700">We implement solutions fast, so you see ROI quickly.</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="https://calendly.com/rba-aus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-300"
              >
                Schedule Your Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Is automation right for small businesses?</h3>
              <p className="text-gray-700">Absolutely! Our solutions are specifically designed to help small and medium-sized businesses operate more efficiently and profitably.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">How quickly will I see results?</h3>
              <p className="text-gray-700">Most clients see noticeable improvements within weeks and significant ROI within just 3–6 months.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Do I need tech skills to start?</h3>
              <p className="text-gray-700">No technical skills required. Our team handles everything from setup to training, ensuring smooth adoption.</p>
            </div>
            
            <div className="text-center mt-10">
              <a 
                href="https://calendly.com/rba-aus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-300"
              >
                More questions? Chat with us today!
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">🎉 Special Offer for First-Time Clients!</h2>
            <p className="text-xl italic mb-8">Sign up this month and get <strong>20% OFF</strong> your first automation package.</p>
            <a 
              href="https://calendly.com/rba-aus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-blue-50 text-blue-600 font-medium py-3 px-8 rounded-md transition duration-300"
            >
              Claim Your Offer Now
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Revolutionize Your Business?</h2>
            <p className="text-xl mb-8 text-gray-700">
              Take the first step towards simpler, smarter business operations.<br />
              Schedule your free, no-pressure call and discover exactly how AI can transform your day-to-day.
            </p>
            <a 
              href="https://calendly.com/rba-aus" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-md text-lg transition duration-300"
            >
              Book Your Free AI Consultation
            </a>
          </div>
        </div>
      </section>
    </main>
  );
} 