import { Metadata } from 'next';
import ContactForm from './components/ContactForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Impacto',
  description: 'Get in touch with our team for AI-powered solutions for your business.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-blue-700 text-white w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl mb-8">
              Have questions about our services or want to schedule a consultation? 
              Fill out the form below and our team will get back to you shortly.
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send Us a Detailed Message</h2>
            <ContactForm />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Our Address</h3>
                <p className="text-gray-600">
                  82-84 Rajah Road<br />
                  Ocean Shores - 2483<br />
                  NSW - Australia
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">
                  <a href="mailto:impactoautomation.ai@gmail.com" className="text-blue-600 hover:underline">impactoautomation.ai@gmail.com</a>
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://twitter.com/impacto" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a 
                    href="https://linkedin.com/company/impacto" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a 
                    href="https://facebook.com/impacto" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What services does Impacto offer?</h3>
              <p className="text-gray-600">
                Impacto offers a range of AI-powered business solutions including social media marketing, 
                workflow automation, data analytics, and customer service automation. Check out our 
                <Link href="/services" className="text-blue-600 hover:underline"> services page</Link> for detailed information.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How can I schedule a consultation?</h3>
              <p className="text-gray-600">
                You can schedule a free consultation by filling out our contact form or by emailing us directly.
                Our team will get back to you within 24 hours to arrange a time that works for you.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer customized solutions?</h3>
              <p className="text-gray-600">
                Yes, we believe in tailoring our solutions to meet the specific needs of your business.
                Our team will work closely with you to understand your requirements and develop a 
                customized implementation plan.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What is the typical implementation timeline?</h3>
              <p className="text-gray-600">
                Implementation timelines vary depending on the complexity of the solution and your business
                requirements. Simple automations can be implemented in as little as 2-3 weeks, while more 
                comprehensive solutions may take 1-2 months.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 