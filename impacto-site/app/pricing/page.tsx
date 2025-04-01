'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, Clock, TrendingUp, CheckCircle, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-gradient-to-br from-blue-800 to-blue-600 text-white w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Save Time and Scale Faster with Done‑For‑You Automation
            </h1>
            <p className="text-xl md:text-2xl mb-10">
              Professional automation services for small businesses – we automate your busywork so you can focus on growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="font-medium text-base"
              >
                Book a Demo
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="font-medium text-base bg-transparent border-white text-white hover:bg-white hover:text-blue-700"
              >
                Start Free
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Automation Package</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Select the right package for your business needs. All plans include our core automation technology.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Package */}
              <div onClick={() => window.location.href = "/pricing/starter"} className="cursor-pointer">
                <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
                  <CardHeader className="border-b pb-6">
                    <CardTitle className="text-2xl">Starter Package</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$300</span>
                      <span className="text-gray-500">/mo</span>
                    </div>
                    <CardDescription className="mt-2 italic">
                      Ideal for new small businesses or solopreneurs just starting with automation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Social Media Automation (AI-written posts, scheduled to 1-2 platforms)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Lead Capture to CRM (basic web form integration to your CRM)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Automated Email Sequence (welcome & follow-up emails)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span><strong>Support:</strong> Email support, month-to-month flexibility</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button className="w-full" size="lg" onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = "/pricing/starter";
                    }}>
                      Start Free
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Growth Package */}
              <div onClick={() => window.location.href = "/pricing/growth"} className="cursor-pointer">
                <Card className="flex flex-col h-full border-blue-500 shadow-lg relative">
                  <div className="absolute top-0 inset-x-0 flex justify-center transform -translate-y-1/2">
                    <Badge className="bg-blue-500 text-white px-3 py-1 text-sm">Popular</Badge>
                  </div>
                  <CardHeader className="border-b pb-6 bg-blue-50 rounded-t-lg">
                    <CardTitle className="text-2xl">Growth Package</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$700</span>
                      <span className="text-gray-500">/mo</span>
                    </div>
                    <CardDescription className="mt-2 italic">
                      Our most popular plan, perfect for growing teams that need multi-channel automation.
                    </CardDescription>
                  </CardHeader>
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
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg" onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = "/pricing/growth";
                    }}>
                      Book a Demo
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Advanced Package */}
              <div onClick={() => window.location.href = "/pricing/advanced"} className="cursor-pointer">
                <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
                  <CardHeader className="border-b pb-6">
                    <CardTitle className="text-2xl">Advanced Package</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$1,250</span>
                      <span className="text-gray-500">/mo</span>
                    </div>
                    <CardDescription className="mt-2 italic">
                      For established businesses needing full-scale, custom automation solutions.
                    </CardDescription>
                  </CardHeader>
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
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span><strong>Support:</strong> 1-on-1 on-boarding, 24/7 priority support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-600">+$1,500 one-time setup</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button 
                      className="w-full" 
                      variant="outline" 
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = "/pricing/advanced";
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
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Work smarter, not harder – Benefits of Our Automation Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how Impacto's automation solutions can transform your business operations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {/* Benefit 1 */}
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-700">Save Hours Every Week</h3>
                <p className="text-gray-600">
                  Free up time by automating repetitive tasks. Spend more time on strategy and customers, less on admin.
                </p>
              </div>
              
              {/* Benefit 2 */}
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-700">Grow Faster</h3>
                <p className="text-gray-600">
                  Scalable systems that support your business growth without adding overhead. Turn on new automation modules as you need them.
                </p>
              </div>
              
              {/* Benefit 3 */}
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-700">No Tech Headaches</h3>
                <p className="text-gray-600">
                  We set everything up for you, no coding or IT required. You get enterprise-grade automation with zero learning curve.
                </p>
              </div>
              
              {/* Benefit 4 */}
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600">
                  <Headphones className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-700">Expert Support</h3>
                <p className="text-gray-600">
                  Dedicated automation experts guide you. We're your partners in streamlining your business, always available to help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-8 md:p-10 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 mb-6 overflow-hidden flex items-center justify-center">
                  {/* Silhouette placeholder for future client photos */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12 text-gray-400">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </div>
                <blockquote className="mb-4">
                  <p className="text-xl italic text-gray-700">
                    "Implementing Impacto's automations saved me at least 10 hours every week. It's like I hired an assistant who works 24/7, but for a fraction of the cost."
                  </p>
                </blockquote>
                <cite className="text-gray-600 font-medium not-italic">— Happy Client</cite>
              </div>
            </div>
            
            {/* Space for future testimonials when available */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">Automating business workflows with Impacto</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get answers to common questions about our automation services
              </p>
            </div>
            
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                    <span className="text-lg font-semibold text-gray-800">How do you deliver the automation services?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-700">
                    <p>
                      We handle everything for you in the cloud. Our team sets up and monitors your automations remotely – no on-site installation needed. We'll integrate with your existing tools (like your social media, CRM, and email) via secure connections. You simply enjoy the results without worrying about the tech behind it.
                    </p>
                  </div>
                </details>
              </div>
              
              {/* FAQ Item 2 */}
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                    <span className="text-lg font-semibold text-gray-800">What kind of commitment is required?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-700">
                    <p>
                      All our packages are billed month-to-month with no long-term contracts. You can start or stop at any time. We believe in earning your business every month – stay because you love the service, not because you're locked in. Upgrades or downgrades between packages are seamless as your needs change.
                    </p>
                  </div>
                </details>
              </div>
              
              {/* FAQ Item 3 */}
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                    <span className="text-lg font-semibold text-gray-800">Can I customize the automations for my business?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-700">
                    <p>
                      Absolutely. We can customize to fit your processes. In the Advanced package, we even build custom workflows from scratch. During onboarding, we discuss your exact needs and configure the automations accordingly. You'll get a tailored solution for your business necessities.
                    </p>
                  </div>
                </details>
              </div>
              
              {/* FAQ Item 4 */}
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                    <span className="text-lg font-semibold text-gray-800">Is there a free trial or demo available?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-700">
                    <p>
                      Yes! Our Starter package offers a free trial so you can experience the benefits risk-free. For the Growth and Advanced plans, we offer a personalized demo – we'll walk you through how the automations work and show you potential ROI before you commit. We want you to be confident that Impacto is right for your business.
                    </p>
                  </div>
                </details>
              </div>
              
              {/* FAQ Item 5 */}
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                    <span className="text-lg font-semibold text-gray-800">What support do I get if something goes wrong or I need help?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-700">
                    <p>
                      We pride ourselves on hands-on support. Starter comes with responsive email support. Growth adds live chat support for quicker help. Advanced includes 24/7 priority support and a dedicated account strategist. No matter your plan, we're here to ensure your automations run smoothly and to answer any questions.
                    </p>
                  </div>
                </details>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Still have questions? <a href="/contact" className="text-blue-600 font-medium hover:underline">Contact us</a> and we'll be happy to help.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 