'use client';

import React, { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BusinessAssessmentForm from '../components/BusinessAssessmentForm';
import { setupAutomaticRetry } from '../utils/retry-submissions';

export default function NewAssessmentPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          // Redirect to login if not authenticated
          router.push('/login');
          return;
        }
        
        setUser(user);
      } catch (error) {
        console.error('Error checking authentication:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
    
    // Setup automatic retry for any pending submissions
    setupAutomaticRetry();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-black">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/assessments" className="text-blue-600 hover:underline mb-2 inline-block">
          ← Back to Assessments
        </Link>
        <h1 className="text-2xl font-bold">Create New Business Assessment</h1>
        <p className="text-black mt-1">
          Use this form to manually create a new business assessment entry
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <BusinessAssessmentForm isAuthenticated={true} />
      </div>
    </div>
  );
} 