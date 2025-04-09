'use client';

import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // In a real implementation, you would send the email to your API
      // For now, we'll simulate a successful submission after a short delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-3">Subscribe to our Newsletter</h3>
      <p className="text-gray-600 text-sm mb-4">
        Get the latest articles and insights on business automation delivered to your inbox.
      </p>
      
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-green-800">
          <p className="font-medium">Thank you for subscribing!</p>
          <p className="text-sm mt-1">We'll send you the latest updates and insights.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
              disabled={isSubmitting}
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium flex items-center justify-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Subscribing...</span>
            ) : (
              <>
                <FaPaperPlane className="mr-2" />
                <span>Subscribe</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
} 