'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'nav-scrolled bg-white shadow-md text-gray-700' 
          : 'nav-transparent bg-blue-700 text-white'
      }`}
      style={{ height: '80px' }}
    >
      <div className="container mx-auto px-6 h-full flex items-center max-w-7xl">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link href="/" className="transition-opacity duration-300">
            <Image 
              src="/images/impacto_logo_nobackground.png"
              alt="Impacto"
              width={180}
              height={45}
              priority
              className="opacity-95"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center space-x-1 transition duration-300 font-medium ${
                  isScrolled
                    ? (pathname === link.path ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600')
                    : (pathname === link.path ? 'text-white font-medium' : 'text-white hover:text-blue-100')
                }`}
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="https://calendly.com/rba-aus"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isScrolled 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-white hover:bg-blue-50 text-blue-600'
              } px-6 py-3 rounded-md transition duration-300 font-medium`}
            >
              Book A Call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`hover:text-blue-${isScrolled ? '600' : '100'} focus:outline-none transition duration-300`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 p-4 bg-white rounded-b-lg shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center space-x-2 py-3 px-4 transition duration-300 font-medium ${
                  pathname === link.path 
                    ? 'bg-blue-50 text-blue-600 font-medium rounded-md' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a
                href="https://calendly.com/rba-aus"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-5 py-3 rounded-md transition duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Book A Call
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}