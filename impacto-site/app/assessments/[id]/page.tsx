'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

// Define a proper type for the assessment
interface BusinessAssessment {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  industry: string;
  employees: string;
  goals: string[];
  challenges: Record<string, number>;
  created_at: string;
  // Add other fields as needed
}

export default function ViewAssessmentPage() {
  const [assessment, setAssessment] = useState<BusinessAssessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const assessmentId = params.id as string;

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchAssessment = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();

      if (error) throw error;
      
      if (!data) {
        setError('Assessment not found');
      } else {
        setAssessment(data as BusinessAssessment);
      }
    } catch (error: unknown) {
      console.error('Error fetching assessment:', error);
      setError(error instanceof Error ? error.message : 'Error fetching assessment');
    } finally {
      setLoading(false);
    }
  }, [supabase, assessmentId]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          router.push('/login');
          return;
        }
        
        await fetchAssessment();
      } catch (error) {
        console.error('Error checking authentication:', error);
        router.push('/login');
      }
    };

    checkUser();
  }, [assessmentId, fetchAssessment, router, supabase.auth]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div>
              <p className="text-red-700 font-medium">Error</p>
              <p className="text-red-600">{error || 'Assessment not found'}</p>
            </div>
          </div>
        </div>
        <Link href="/assessments" className="text-blue-600 hover:underline">
          ← Back to Assessments
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/assessments" className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Assessments
          </Link>
          <h1 className="text-2xl font-bold">Business Assessment Details</h1>
        </div>
        <div>
          <span className="text-black">Submitted: {formatDate(assessment.created_at)}</span>
        </div>
      </div>

      <div className={`max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden ${styles.assessmentContainer}`}>
        {/* Contact Information Section */}
        <div className="border-b border-gray-200 p-6">
          <h2 className={`text-xl font-semibold mb-4 ${styles.sectionTitle}`}>Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-black">Full Name</p>
              <p className="font-medium">{assessment.full_name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-black">Email</p>
              <p className="font-medium">{assessment.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-black">Phone</p>
              <p className="font-medium">{assessment.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-black">Company</p>
              <p className="font-medium">{assessment.company || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-black">Role</p>
              <p className="font-medium">{assessment.role || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Business Information Section */}
        <div className="border-b border-gray-200 p-6">
          <h2 className={`text-xl font-semibold mb-4 ${styles.sectionTitle}`}>Business Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-black">Industry</p>
              <p className="font-medium">{assessment.industry || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-black">Number of Employees</p>
              <p className="font-medium">{assessment.employees || 'N/A'}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-black">Business Goals</p>
            {assessment.goals && assessment.goals.length > 0 ? (
              <ul className="list-disc pl-5 mt-2">
                {assessment.goals.map((goal: string, index: number) => (
                  <li key={index} className={`font-medium ${styles.listItem}`}>
                    {goal.replace(/_/g, ' ').split(' ').map((word: string) => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-medium">No goals specified</p>
            )}
          </div>
        </div>

        {/* Challenges Section */}
        <div className="border-b border-gray-200 p-6">
          <h2 className={`text-xl font-semibold mb-4 ${styles.sectionTitle}`}>Business Challenges</h2>
          
          {assessment.challenges ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(assessment.challenges).map(([key, value]: [string, any]) => (
                <div key={key} className="mr-8 mb-4">
                  <div className={`font-medium ${styles.listItem}`}>{key.replace(/_challenge/g, '').replace(/_/g, ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
                  <div className="flex items-center mt-1">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      {value || '0'}
                    </div>
                    <span className={`ml-2 ${styles.ratingLabel}`}>
                      {!value ? 'Not Rated' :
                       value == 1 ? 'No Issues' : 
                       value == 2 ? 'Minor Issues' : 
                       value == 3 ? 'Moderate' : 
                       value == 4 ? 'Significant' : 'Critical'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No challenge ratings provided</p>
          )}
        </div>

        {/* Technology Section */}
        <div className="border-b border-gray-200 p-6">
          <h2 className={`text-xl font-semibold mb-4 ${styles.sectionTitle}`}>Current Technology</h2>
          
          <div className="mb-4">
            <p className="text-sm text-black">Software & Tools Used</p>
            {assessment.software && assessment.software.length > 0 ? (
              <ul className="list-disc pl-5 mt-2">
                {assessment.software.map((item: string, index: number) => (
                  <li key={index} className={`font-medium ${styles.listItem}`}>
                    {item.replace(/_/g, ' ').split(' ').map((word: string) => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-medium">No software specified</p>
            )}
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-black">Other Software</p>
            <p className="font-medium">{assessment.other_software || 'None specified'}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-black">Current Automation Level</p>
            <p className="font-medium">{assessment.automation_level || 'Not specified'}</p>
          </div>
          
          <div>
            <p className="text-sm text-black">Integration Challenges</p>
            <p className="font-medium">{assessment.integration_challenges || 'None specified'}</p>
          </div>
        </div>

        {/* Priorities & Pain Points */}
        <div className="border-b border-gray-200 p-6">
          <h2 className={`text-xl font-semibold mb-4 ${styles.sectionTitle}`}>Priorities & Pain Points</h2>
          
          <div className="mb-4">
            <p className="text-sm text-black">Priority Areas</p>
            {assessment.priorities && assessment.priorities.length > 0 ? (
              <ul className="list-disc pl-5 mt-2">
                {assessment.priorities.map((item: string, index: number) => (
                  <li key={index} className={`font-medium ${styles.listItem}`}>
                    {item.replace(/_/g, ' ').split(' ').map((word: string) => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-medium">No priorities specified</p>
            )}
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-black">Specific Pain Points</p>
            <p className="font-medium">{assessment.specific_pain || 'None specified'}</p>
          </div>
          
          <div>
            <p className="text-sm text-black">Success Criteria</p>
            <p className="font-medium">{assessment.success_criteria || 'None specified'}</p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="p-6">
          <h2 className={`text-xl font-semibold mb-4 ${styles.sectionTitle}`}>Additional Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-black">Previous Automation Attempts</p>
              <p className="font-medium">{assessment.previous_automation || 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-sm text-black">Decision Timeline</p>
              <p className="font-medium">{assessment.decision_timeline || 'Not specified'}</p>
            </div>
          </div>
          
          {assessment.previous_experience && (
            <div className="mt-4">
              <p className="text-sm text-black">Previous Experience with Automation</p>
              <p className="font-medium">{assessment.previous_experience}</p>
            </div>
          )}
          
          {assessment.additional_info && (
            <div className="mt-4">
              <p className="text-sm text-black">Additional Comments</p>
              <p className="font-medium">{assessment.additional_info}</p>
            </div>
          )}
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-black">Consent Given</p>
              <p className="font-medium">{assessment.consent ? 'Yes' : 'No'}</p>
            </div>
            
            <div>
              <p className="text-sm text-black">Requested Consultation</p>
              <p className="font-medium">{assessment.consultation_requested ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 