import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 relative z-10">
      <div className="container mx-auto px-4 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="text-3xl font-bold mb-6 text-gray-300">Impacto</div>
            <p className="text-gray-300 mb-6 max-w-xs">
              AI-powered solutions that transform businesses and drive measurable results.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-300">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-300">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-300">Contact</h3>
            <address className="not-italic text-gray-300 mb-4 space-y-3">
              <p className="text-gray-300">82-84 Rajah Road</p>
              <p className="text-gray-300">Ocean Shores - 2483</p>
              <p className="text-gray-300">NSW - Australia</p>
              <p className="text-gray-300">impactoautomation.ai@gmail.com</p>
            </address>
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-300">Business Hours</h4>
              <p className="text-gray-300 text-sm">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
              <p className="text-gray-300 text-sm">Saturday - Sunday: Closed</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-300">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="YouTube" className="text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            &copy; {currentYear} Impacto. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="text-gray-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 