'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import AssessmentResults from '@/components/AssessmentResults';
import AutomationServices from '@/components/AutomationServices';
import AutomationUpgrade from '@/components/AutomationUpgrade';

export default function AssessmentResultsContent() {
  const searchParams = useSearchParams();
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [automationScore, setAutomationScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showServices, setShowServices] = useState(false);
  const [hasExistingAutomation, setHasExistingAutomation] = useState(false);

  useEffect(() => {
    // Initialize Supabase client on client side
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Get assessment ID from URL query params
    const assessmentId = searchParams?.get('assessmentId');
    
    const fetchAssessmentData = async (id: string) => {
      try {
        // Fetch from your Supabase client
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setAssessmentData(data);
          
          // Calculate automation score based on assessment responses
          const score = calculateAutomationScore(data);
          setAutomationScore(score);
          
          // Determine if we should show services section
          // For example, if they selected social media or workflow automation
          const showServicesSections = data.automation_areas?.some((area: string) => 
            area.includes('social') || area.includes('workflow') || area.includes('marketing')
          );
          setShowServices(showServicesSections || false);
          
          // Check if they already have automation in place
          // This could be based on their experience level or tools they're using
          const hasAutomation = 
            data.current_automation === 'moderate' || 
            data.current_automation === 'advanced' || 
            (data.current_tools && data.current_tools.length > 1);
          
          setHasExistingAutomation(hasAutomation);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching assessment data:', error);
        setIsLoading(false);
      }
    };

    if (assessmentId) {
      // Fetch the submission data from Supabase
      fetchAssessmentData(assessmentId);
    } else {
      // If no ID provided, just show the not found state
      setIsLoading(false);
    }
  }, [searchParams]);

  // Return appropriate UI based on loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <h1 className="text-3xl font-bold mb-4">Analyzing your responses...</h1>
          <p className="text-gray-600">We're preparing your personalized automation blueprint</p>
        </div>
      </div>
    );
  }

  // If no assessment data found
  if (!assessmentData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Assessment Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't locate your assessment results.</p>
        <a 
          href="/assessment" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start a New Assessment
        </a>
      </div>
    );
  }

  return (
    <>
      <AssessmentResults 
        automationScore={automationScore!} 
        assessmentData={assessmentData}
      />
      
      {/* Show options based on assessment results */}
      <div className="mt-16 space-y-16">
        {/* Title for recommendations section */}
        <h2 className="text-3xl font-bold text-center mb-8">Recommended Solutions</h2>
        
        {/* Show services section if relevant to their assessment responses */}
        {showServices && <AutomationServices />}
        
        {/* Show upgrade options if they have existing automation */}
        {hasExistingAutomation && <AutomationUpgrade />}
      </div>
    </>
  );
}

function calculateAutomationScore(assessmentData: any): number {
  // Extract relevant responses from the assessment data
  const {
    automation_experience,
    current_tools,
    pain_points,
    company_size,
    business_goals,
    automation_needs,
    document_volume,
    timeline,
    budget_range
  } = assessmentData;
  
  // Initialize score components
  let knowledgeScore = 0;
  let needsScore = 0;
  let complexityScore = 0;
  let readinessScore = 0;
  
  // 1. Evaluate automation knowledge/experience (weighted most heavily)
  // Scale: 0-10, higher = more experience
  if (automation_experience === 'none') {
    knowledgeScore = 0;
  } else if (automation_experience === 'basic') {
    knowledgeScore = 3;
  } else if (automation_experience === 'moderate') {
    knowledgeScore = 6;
  } else if (automation_experience === 'advanced') {
    knowledgeScore = 10;
  }
  
  // Check for current tools usage (indicates experience)
  if (current_tools && current_tools.length > 0) {
    // Add points for each tool they're already using
    knowledgeScore += Math.min(current_tools.length, 5); // Cap at 5 extra points
  }
  
  // 2. Evaluate business needs for automation
  // More pain points and needs = higher score (more opportunity for automation)
  if (pain_points && pain_points.length > 0) {
    needsScore += Math.min(pain_points.length * 2, 10);
  }
  
  if (automation_needs && automation_needs.length > 0) {
    needsScore += Math.min(automation_needs.length * 2, 10);
  }
  
  // 3. Evaluate complexity factors
  // Company size affects complexity
  if (company_size === 'solo') {
    complexityScore += 2;
  } else if (company_size === 'small') {
    complexityScore += 5;
  } else if (company_size === 'medium') {
    complexityScore += 8;
  } else if (company_size === 'large') {
    complexityScore += 10;
  }
  
  // Document volume affects complexity
  if (document_volume === 'low') {
    complexityScore += 3;
  } else if (document_volume === 'medium') {
    complexityScore += 6;
  } else if (document_volume === 'high') {
    complexityScore += 10;
  }
  
  // 4. Evaluate readiness factors
  // Timeline - shorter timeline indicates more readiness
  if (timeline === 'immediate') {
    readinessScore += 10;
  } else if (timeline === '1-3months') {
    readinessScore += 7;
  } else if (timeline === '3-6months') {
    readinessScore += 4;
  } else if (timeline === '6months+') {
    readinessScore += 2;
  }
  
  // Budget - higher budget indicates more readiness
  if (budget_range === 'under5k') {
    readinessScore += 3;
  } else if (budget_range === '5k-15k') {
    readinessScore += 6;
  } else if (budget_range === '15k-50k') {
    readinessScore += 8;
  } else if (budget_range === '50k+') {
    readinessScore += 10;
  }
  
  // Calculate weighted total score (knowledge is weighted most heavily)
  const weightedTotal = (knowledgeScore * 0.4) + (needsScore * 0.25) + 
                        (complexityScore * 0.2) + (readinessScore * 0.15);
  
  // Convert to percentage (0-100)
  const finalScore = Math.round((weightedTotal / 20) * 100);
  
  // Ensure score is within bounds
  return Math.max(0, Math.min(finalScore, 100));
} 