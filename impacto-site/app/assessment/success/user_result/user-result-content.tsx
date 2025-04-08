'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import ProductTierContent from './product-tier-content';

export default function UserResultContent() {
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const blueprintRef = useRef<HTMLDivElement>(null);
  const consultationRef = useRef<HTMLDivElement>(null);
  const blueprintInView = useInView(blueprintRef, { once: false, amount: 0.3 });
  const consultationInView = useInView(consultationRef, { once: false, amount: 0.3 });

  useEffect(() => {
    // Check if we have the score in sessionStorage first (for refreshes)
    const savedScore = sessionStorage.getItem('user_assessment_score');
    if (savedScore) {
      const parsedScore = parseInt(savedScore, 10);
      setScore(parsedScore);
      setAnalysisComplete(true);
      return;
    }

    // Try to get the assessment ID from URL query params
    const assessmentId = searchParams?.get('assessmentId') || null;
    
    // If no assessment ID, check localStorage for last form submission
    const fetchAssessmentData = async () => {
      try {
        let assessmentData;
        
        if (assessmentId) {
          // Initialize Supabase client
          const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );
          
          // Fetch from Supabase
          const { data, error } = await supabase
            .from('assessments')
            .select('*')
            .eq('id', assessmentId)
            .single();
            
          if (error) throw error;
          
          if (data) {
            assessmentData = data;
          }
        } else {
          // Try to get from localStorage if no ID provided
          const storedData = localStorage.getItem('assessment_form_data');
          if (storedData) {
            assessmentData = JSON.parse(storedData);
          }
        }
        
        // Calculate score from assessment data
        if (assessmentData) {
          setAssessmentData(assessmentData);
          // Wait 2 seconds to show the analysis animation
          setTimeout(() => {
            try {
              const calculatedScore = calculateAutomationScore(assessmentData);
              setScore(calculatedScore || 70); // Ensure score is not falsy
              // Save score to sessionStorage for refreshes
              sessionStorage.setItem('user_assessment_score', (calculatedScore || 70).toString());
              setAnalysisComplete(true);
            } catch (calcError) {
              console.error('Error calculating score:', calcError);
              const fallbackScore = 70;
              setScore(fallbackScore);
              sessionStorage.setItem('user_assessment_score', fallbackScore.toString());
              setAnalysisComplete(true);
            }
          }, 2000);
        } else {
          // If no assessment data found, use a fallback score
          setTimeout(() => {
            console.log('No assessment data found, using fallback score');
            const fallbackScore = 70; // Middle-range score as fallback
            setScore(fallbackScore);
            sessionStorage.setItem('user_assessment_score', fallbackScore.toString());
            setAnalysisComplete(true);
          }, 2000);
        }
      } catch (err) {
        console.error('Error fetching assessment data:', err);
        setError('Failed to fetch assessment data');
        // Use fallback score on error
        setTimeout(() => {
          const fallbackScore = 70;
          setScore(fallbackScore);
          sessionStorage.setItem('user_assessment_score', fallbackScore.toString());
          setAnalysisComplete(true);
        }, 2000);
      }
    };
    
    fetchAssessmentData();
  }, [searchParams]);

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* Section 1: Analysis Animation */}
      {!analysisComplete && (
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8 backdrop-blur-sm bg-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">Analyzing Your Business</h1>
            
            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-8 shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            
            <div className="flex justify-center mb-6">
              <motion.div 
                className="w-20 h-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: 2, ease: "linear" }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full text-blue-600 drop-shadow-md">
                  <path 
                    fill="currentColor" 
                    d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                  />
                </svg>
              </motion.div>
            </div>
            
            <p className="text-lg text-gray-600 animate-pulse">
              <strong>Analysis:</strong> Our team is reviewing your answers and analyzing your business needs.
            </p>
            <p className="text-sm text-gray-500 mt-3">No technical expertise required - we handle everything</p>
          </div>
        </motion.div>
      )}
      
      {/* Section 2: Blueprint Creation */}
      {analysisComplete && score !== null && (
        <motion.div 
          ref={blueprintRef}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8 backdrop-blur-sm bg-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: blueprintInView || !consultationInView ? 1 : 0.8, 
            y: 0,
            scale: blueprintInView || !consultationInView ? 1 : 0.98,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">Your Automation Blueprint</h1>
            <p className="text-lg text-gray-600 mb-3">
              Based on your responses, we've assessed your automation potential.
            </p>
            <p className="text-md text-blue-700 font-medium mb-8">
              Your custom solution requires zero technical knowledge
            </p>
            
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className={`relative h-48 w-48`}>
                <div className={`absolute inset-0 rounded-full bg-white shadow-lg flex items-center justify-center`}>
                  <div className={`absolute inset-0 rounded-full overflow-hidden`}>
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br opacity-20 ${
                        score && score < 60 ? 'from-yellow-300 to-yellow-600' : 
                        score && score < 80 ? 'from-green-300 to-green-600' : 
                        'from-red-300 to-red-600'
                      }`}
                    ></div>
                  </div>
                  <div className={`h-40 w-40 rounded-full bg-white border-8 ${
                    score && score < 60 ? 'border-yellow-500' : 
                    score && score < 80 ? 'border-green-500' : 
                    'border-red-500'
                  } flex items-center justify-center`}>
                    <span className={`text-6xl font-bold ${
                      score && score < 60 ? 'text-yellow-700' : 
                      score && score < 80 ? 'text-green-700' : 
                      'text-red-700'
                    }`}>{score}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            >
              <ProductTierContent score={score} />
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Section 3: Consultation CTA */}
      {analysisComplete && (
        <motion.div 
          ref={consultationRef}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 backdrop-blur-sm bg-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: consultationInView ? 1 : 0.8, 
            y: 0,
            scale: consultationInView ? 1 : 0.98
          }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-green-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">Don't waste more time - speak directly with our experts</h2>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Consultation:</strong> A member of our team will contact you to discuss your automation blueprint and next steps.
            </p>
            
            <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 shadow-inner border ${
              score && score < 60 ? 'border-yellow-200' : 
              score && score < 80 ? 'border-green-200' : 
              'border-red-200'
            }`}>
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                  <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-800">No tech knowledge required</h3>
                  <p className="text-gray-600">We handle 100% of implementation, setup, and maintenance</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Our automation experts are ready to walk you through your custom blueprint and answer all your questions.
                The sooner you book, the faster you can start implementing solutions.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className={`inline-block px-8 py-4 text-white text-xl font-bold rounded-lg transition duration-150 shadow-lg hover:shadow-xl ${
                    score && score < 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700' : 
                    score && score < 80 ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' : 
                    'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                  }`}
                >
                  {score && score < 60 ? 'Start Free' : score && score < 80 ? 'Book a Demo' : 'Talk to Us'}
                </Link>
              </motion.div>
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/assessment/success"
                className="inline-block text-blue-600 hover:text-blue-800 hover:underline"
              >
                Back to Assessment Confirmation
              </Link>
            </div>
          </div>
        </motion.div>
      )}
      
    </div>
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
  } = assessmentData || {}; // Use empty object as fallback
  
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
  
  // If calculated score is 0 or invalid, return fallback score
  if (finalScore <= 0 || isNaN(finalScore)) {
    return 70; // Use middle-range fallback score
  }
  
  // Ensure score is within bounds
  return Math.max(0, Math.min(finalScore, 100));
} 