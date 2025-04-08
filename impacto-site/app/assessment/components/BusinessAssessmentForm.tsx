'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContactSection from './sections/ContactSection';
import BusinessInfoSection from './sections/BusinessInfoSection';
import AutomationNeedsSection from './sections/AutomationNeedsSection';
import BudgetSection from './sections/BudgetSection';
import FinalSection from './sections/FinalSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FormData {
  // Contact Info
  full_name: string;
  email: string;
  company_name: string;
  phone: string;
  job_title: string;
  
  // Business Info
  industry: string;
  employee_count: string;
  business_goals: string[];
  pain_points: string[];
  compliance_concerns: string[];
  
  // Automation Needs
  automation_areas: string[];
  document_types: string[];
  document_volume: string;
  process_complexity: string;
  integration_needs: string[];
  
  // Budget
  budget_range: string;
  funding_source: string;
  decision_timeline: string;
  investment_factors: string[];
  competitor_automation: string;
  
  // Additional Info
  consultation_preference: string;
  additional_comments: string;
  consent_terms: boolean;
  consent_marketing: boolean;
  referral_source?: string;
  consultation_preferences?: string[];
  
  // Allow string indexing
  [key: string]: string | string[] | boolean | undefined;
}

type FormErrors = Record<string, string>;

interface SectionProps {
  formData: FormData;
  errors: FormErrors;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onCheckboxChange: (name: string, value: string, checked: boolean) => void;
  onCheckboxSingleChange: (name: string, checked: boolean) => void;
}

export default function BusinessAssessmentForm(): JSX.Element {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [automationScore, setAutomationScore] = useState<number>(0);
  
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    company_name: '',
    phone: '',
    job_title: '',
    industry: '',
    employee_count: '',
    business_goals: [],
    pain_points: [],
    compliance_concerns: [],
    automation_areas: [],
    document_types: [],
    document_volume: '',
    process_complexity: '',
    integration_needs: [],
    budget_range: '',
    funding_source: '',
    decision_timeline: '',
    investment_factors: [],
    competitor_automation: '',
    consultation_preference: '',
    additional_comments: '',
    consent_terms: false,
    consent_marketing: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  
  const clearError = (name: string): void => {
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };
  
  const handleSelectChange = (name: string, value: string): void => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };
  
  const handleCheckboxChange = (name: string, value: string, checked: boolean): void => {
    setFormData((prev) => {
      const currentValues = Array.isArray(prev[name]) ? [...(prev[name] as string[])] : [];
      const newValues = checked 
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);
      return { ...prev, [name]: newValues };
    });
    clearError(name);
  };
  
  const handleCheckboxSingleChange = (name: string, checked: boolean): void => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
    if (checked) clearError(name);
  };
  
  const handleNext = (): void => {
    console.log('handleNext called, currentStep:', currentStep);
    console.log('Validating step with formData:', formData);
    const isValid = validateStep(currentStep);
    console.log('Step validation result:', isValid);
    
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrev = (): void => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log('Processing assessment submission:', formData);
      
      // Simulate API submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Calculate real automation score based on user inputs
      const score = calculateAutomationScore(formData);
      setAutomationScore(score);
      
      // Store form data and score in localStorage for the results page to access
      localStorage.setItem('assessment_form_data', JSON.stringify(formData));
      sessionStorage.setItem('user_assessment_score', score.toString());
      
      // Briefly show completion state before redirecting
      setIsCompleted(true);
      
      // After a brief delay to show success message, redirect to results page
      setTimeout(() => {
        router.push('/assessment/success/user_result');
      }, 1500);
      
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitError(err instanceof Error ? err.message : 'An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Calculate automation score based on form data to match product tiers:
  // 10-20% = Kickstart
  // 21-76% = Growth
  // 77-100% = Scale
  const calculateAutomationScore = (data: FormData): number => {
    // Initialize base score - minimum should be 10%
    let baseScore = 10;
    
    // 1. Evaluate business needs for automation (pain points, goals)
    // This can add up to 30%
    let needsScore = 0;
    if (data.pain_points && data.pain_points.length > 0) {
      needsScore += Math.min(data.pain_points.length * 3, 15);
    }
    
    if (data.business_goals && data.business_goals.length > 0) {
      needsScore += Math.min(data.business_goals.length * 3, 15);
    }
    
    // 2. Evaluate complexity factors - this can add up to 30%
    let complexityScore = 0;
    
    // Company size affects complexity
    if (data.employee_count === '1-10') {
      complexityScore += 5;
    } else if (data.employee_count === '11-50') {
      complexityScore += 10;
    } else if (data.employee_count === '51-200') {
      complexityScore += 15;
    } else if (data.employee_count === '201-500' || data.employee_count === '501-1000') {
      complexityScore += 20;
    } else if (data.employee_count === '1000+') {
      complexityScore += 30;
    }
    
    // 3. Evaluate readiness factors - this can add up to 30%
    let readinessScore = 0;
    
    // Timeline - shorter timeline indicates more readiness
    if (data.decision_timeline === 'immediate') {
      readinessScore += 15;
    } else if (data.decision_timeline === '1-3months') {
      readinessScore += 10;
    } else if (data.decision_timeline === '3-6months') {
      readinessScore += 5;
    }
    
    // Budget readiness
    if (data.budget_range === 'under5k') {
      readinessScore += 5;
    } else if (data.budget_range === '5k-15k') {
      readinessScore += 10;
    } else if (data.budget_range === '15k-50k') {
      readinessScore += 15;
    } else if (data.budget_range === '50k+') {
      readinessScore += 15;
    }
    
    // Calculate final score (base + additional scores)
    let finalScore = baseScore + needsScore + complexityScore + readinessScore;
    
    // Ensure the score is within bounds 10-100%
    return Math.min(100, Math.max(10, finalScore));
  };
  
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.full_name.trim()) {
          newErrors.full_name = 'Full name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        break;
        
      case 2:
        if (!formData.industry) {
          newErrors.industry = 'Please select your industry';
        }
        if (!formData.employee_count) {
          newErrors.employee_count = 'Please indicate company size';
        }
        if (!formData.business_goals || formData.business_goals.length === 0) {
          newErrors.business_goals = 'Please select at least one business goal';
        }
        break;
        
      case 3:
        if (!formData.automation_areas || formData.automation_areas.length === 0) {
          newErrors.automation_areas = 'Please select at least one area for automation';
        }
        break;
        
      case 4:
        if (!formData.budget_range) {
          newErrors.budget_range = 'Please select a budget range';
        }
        if (!formData.decision_timeline) {
          newErrors.decision_timeline = 'Please select a decision timeline';
        }
        break;
        
      case 5:
        if (!formData.consent_terms) {
          newErrors.consent_terms = 'You must agree to the terms and conditions to proceed';
        }
        break;
    }
    
    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const renderProgressBar = (): JSX.Element => {
    const totalSteps = 5;
    const progress = (currentStep / totalSteps) * 100;
    
    return (
      <div className="mb-6">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderStep = (): JSX.Element | null => {
    const handleSubmitWrapper = (): void => {
      const event = { preventDefault: () => {} } as React.FormEvent;
      void handleSubmit(event);
    };
    
    switch (currentStep) {
      case 1:
        return (
          <ContactSection 
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onNext={handleNext}
          />
        );
      case 2:
        console.log('Rendering step 2 with formData:', {
          industry: formData.industry,
          employee_count: formData.employee_count,
          business_goals: formData.business_goals
        });
        return (
          <BusinessInfoSection 
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCheckboxChange={handleCheckboxChange}
            onCheckboxSingleChange={handleCheckboxSingleChange}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <AutomationNeedsSection 
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCheckboxChange={handleCheckboxChange}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <BudgetSection 
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCheckboxChange={handleCheckboxChange}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 5:
        return (
          <FinalSection 
            formData={{
              referral_source: formData.referral_source,
              consultation_preferences: formData.consultation_preferences,
              additional_notes: formData.additional_comments,
              terms_accepted: formData.consent_terms,
              marketing_consent: formData.consent_marketing,
              consultation_preference: formData.consultation_preference
            }}
            errors={errors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCheckboxChange={handleCheckboxChange}
            onCheckboxSingleChange={handleCheckboxSingleChange}
            onPrev={handlePrev}
            onSubmit={handleSubmitWrapper}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        );
      default:
        return null;
    }
  };
  
  const renderCompletionState = (): JSX.Element => {
    // Determine tier based on score
    let tierName = '';
    let tierColor = '';
    
    if (automationScore <= 20) {
      tierName = 'Kickstart Plan';
      tierColor = 'text-yellow-600';
    } else if (automationScore <= 76) {
      tierName = 'Growth Plan';
      tierColor = 'text-green-600';
    } else {
      tierName = 'Scale Plan';
      tierColor = 'text-red-600';
    }
    
    // Determine message based on score range
    let scoreMessage = '';
    if (automationScore >= 77) {
      scoreMessage = 'Your business is ready for advanced automation with our Scale Plan.';
    } else if (automationScore >= 21) {
      scoreMessage = 'Your business shows significant automation potential with our Growth Plan.';
    } else {
      scoreMessage = 'Your business is starting its automation journey with our Kickstart Plan.';
    }
    
    return (
      <div className="py-8 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
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
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Assessment Submitted Successfully!</h2>
        <p className="text-gray-700 max-w-md mx-auto mb-4">
          Thank you for completing our business assessment. We've created your personalized automation blueprint.
        </p>
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <p className="text-blue-600 font-semibold text-xl">Your Automation Score: {automationScore}/100</p>
            <div className="w-64 h-4 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full ${automationScore <= 20 ? 'bg-yellow-500' : automationScore <= 76 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${automationScore}%` }}
              ></div>
            </div>
          </div>
          <p className="text-gray-600 max-w-lg mx-auto">
            {scoreMessage}
          </p>
          <div className="pt-4">
            <p className="font-medium mb-2">Redirecting you to your <span className={tierColor}>{tierName}</span> blueprint...</p>
            <div className="flex justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      {isCompleted ? (
        renderCompletionState()
      ) : (
        <>
          {renderProgressBar()}
          <form 
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              console.log('Form submission prevented');
              // Only allow explicit submit from the final step
              if (currentStep === 5) {
                void handleSubmit(e);
              }
            }} 
            className="space-y-8"
          >
            {renderStep()}
          </form>
        </>
      )}
    </div>
  );
} 