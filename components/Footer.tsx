import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">Impacto</h2>
            <p className="text-gray-600 mt-2">Business automation experts</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-600 hover:text-red-600">Home</Link></li>
                <li><Link href="/services" className="text-gray-600 hover:text-red-600">Services</Link></li>
                <li><Link href="/pricing" className="text-gray-600 hover:text-red-600">Pricing</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-red-600">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/share/12JPDhyARMb/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/impacto-automation?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="https://www.threads.net/@impactoautomation.com.au" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black"
                  aria-label="Threads"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M17.5 6.5h-11c-3 0-3 4.5 0 4.5s3 0 3 0v7c0 3 4.5 3 4.5 0 0 0 0-3 0-3h3.5c3 0 3-4.5 0-4.5s-3 0-3 0" />
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/impactoautomation.com.au/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Impacto. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-gray-600 hover:text-red-600 text-sm mr-4">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="text-gray-600 hover:text-red-600 text-sm">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 