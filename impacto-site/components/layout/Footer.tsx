import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
                <Link href="/pricing" className="text-gray-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300">
                  About
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
              <a 
                href="https://www.facebook.com/share/12JPDhyARMb/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="text-gray-300 transition-transform hover:scale-110"
              >
                <Image 
                  src="/images/facebook.png" 
                  alt="Facebook" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                />
              </a>
              <a 
                href="https://www.linkedin.com/in/impacto-automation?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="text-gray-300 transition-transform hover:scale-110"
              >
                <Image 
                  src="/images/linkedin.png" 
                  alt="LinkedIn" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                />
              </a>
              <a 
                href="https://www.threads.net/@impactoautomation.com.au" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Threads" 
                className="text-gray-300 transition-transform hover:scale-110"
              >
                <Image 
                  src="/images/Threads_logo.png" 
                  alt="Threads" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                />
              </a>
              <a 
                href="https://www.instagram.com/impactoautomation.com.au/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="text-gray-300 transition-transform hover:scale-110"
              >
                <Image 
                  src="/images/instagram.png" 
                  alt="Instagram" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                />
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