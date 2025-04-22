'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FaPaperPlane } from 'react-icons/fa';

// Create a direct Supabase client (client-side)
const getSupabaseClient = () => {
  // Use window object to guarantee we're on client-side
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables not found');
    return null;
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [supabase, setSupabase] = useState<any>(null);
  
  // Initialize Supabase client on component mount
  useEffect(() => {
    // Set supabase client only on client-side
    setSupabase(getSupabaseClient());
  }, []);
  
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
    
    if (!supabase) {
      setError('Database connection not available. Please try again later.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('Attempting to subscribe with email:', email);
      
      // Direct Supabase insert - no fetch call, no API
      const { error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: email,
          source: 'direct_component',
          status: 'subscribed',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (insertError) {
        console.error('Supabase insert error:', insertError);
        throw new Error(insertError.message || 'Failed to save subscription');
      }
      
      console.log('Subscription successful!');
      setIsSubmitted(true);
      setEmail('');
      
    } catch (err: any) {
      console.error('Newsletter error:', err);
      setError(err.message || 'Failed to subscribe. Please try again.');
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
          <p className="text-sm mt-1">We'll keep you updated!.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800"
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