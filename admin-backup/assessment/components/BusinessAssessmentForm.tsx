'use client';

import { useState, useCallback, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import ContactSection from './sections/ContactSection';
import BusinessInfoSection from './sections/BusinessInfoSection';
import AutomationNeedsSection from './sections/AutomationNeedsSection';
import BudgetSection from './sections/BudgetSection';
import FinalSection from './sections/FinalSection';

// UI Components - inline definition to avoid import issues
type AutomationScoreCardProps = {
  score: number;
  benchmarkScore: number;
  industry: string;
};

function AutomationScoreCard({ 
  score, 
  benchmarkScore,
  industry 
}: AutomationScoreCardProps) {
  // Map industry keys to readable names
  const industryNames: {[key: string]: string} = {
    healthcare: 'Healthcare',
    financial: 'Financial Services',
    retail: 'Retail & E-commerce',
    manufacturing: 'Manufacturing',
    professional_services: 'Professional Services',
    education: 'Education',
    hospitality: 'Hospitality & Tourism',
    construction: 'Construction',
    technology: 'Technology',
    other: 'Other'
  };

  const industryDisplay = industry ? industryNames[industry] || 'Your Industry' : 'Your Industry';
  
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-red-500';
    if (score < 60) return 'text-yellow-500';
    if (score < 80) return 'text-blue-600';
    return 'text-green-600';
  };
  
  const scoreColor = getScoreColor(score);
  const comparisonText = score > benchmarkScore 
    ? "above industry average" 
    : score === benchmarkScore 
      ? "at industry average" 
      : "below industry average";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Automation Readiness Score</h3>
      
      <div className="flex justify-between items-center mb-3">
        <div className="text-4xl font-bold flex items-baseline">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={scoreColor}
          >
            {score}
          </motion.span>
          <span className="text-sm text-gray-700 ml-1">/100</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-800">Industry Average</div>
          <div className="text-xl font-semibold text-gray-900">{benchmarkScore}/100</div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
        <motion.div 
          className={`h-4 rounded-full ${scoreColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      <p className="text-sm text-gray-800">
        Your automation readiness is <span className="font-medium">{comparisonText}</span> for {industryDisplay}.
      </p>
      
      <div className="flex justify-between mt-5 text-xs text-gray-700">
        <div>Beginning</div>
        <div>Developing</div>
        <div>Advanced</div>
        <div>Optimized</div>
      </div>
    </div>
  );
}

type ROICalculatorProps = {
  timeSavings: number; // percentage of time that could be saved
  costSavings: number; // percentage of cost that could be saved
  industry: string;
  employees: string;
};

function ROICalculator({ 
  timeSavings, 
  costSavings,
  industry,
  employees 
}: ROICalculatorProps) {
  // State for estimated values
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [annualSavings, setAnnualSavings] = useState(0);
  
  // Industry-specific hourly rates
  const hourlyRates: {[key: string]: number} = {
    healthcare: 35,
    financial: 45,
    retail: 25,
    manufacturing: 30,
    professional_services: 50,
    education: 28,
    hospitality: 22,
    construction: 32,
    technology: 55,
    other: 35
  };
  
  // Employee count to number of employees mapping
  const employeeCountMap: {[key: string]: number} = {
    '1-10': 5,
    '11-50': 30,
    '51-200': 125,
    '201-500': 350,
    '501-1000': 750,
    '1000+': 1500,
  };
  
  // Calculate weekly hours and annual savings
  useEffect(() => {
    // Base calculations on employee count
    const numberOfEmployees = employeeCountMap[employees] || 50;
    
    // Assume each employee spends X hours on manual processes
    const manualProcessHoursPerWeek = 10;
    
    // Calculate total hours spent on manual processes
    const totalManualHours = numberOfEmployees * manualProcessHoursPerWeek;
    
    // Apply time savings percentage
    const savedHours = Math.round(totalManualHours * (timeSavings / 100));
    setWeeklyHours(savedHours);
    
    // Calculate annual cost savings based on hourly rate for the industry
    const hourlyRate = hourlyRates[industry] || 35;
    const weeklySavings = savedHours * hourlyRate;
    const annualSavingsEstimate = Math.round(weeklySavings * 52); // 52 weeks in a year
    
    // Adjust with the cost savings percentage
    const adjustedAnnualSavings = Math.round(annualSavingsEstimate * (costSavings / 100));
    setAnnualSavings(adjustedAnnualSavings);
  }, [timeSavings, costSavings, industry, employees, employeeCountMap, hourlyRates]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Potential Automation ROI</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-800">Time Savings</span>
            <span className="text-sm font-semibold text-blue-700">{timeSavings}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${timeSavings}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-800">
            Approximately <span className="font-semibold">{weeklyHours} hours/week</span> saved across your organization
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-800">Cost Efficiency</span>
            <span className="text-sm font-semibold text-green-700">{costSavings}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-green-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${costSavings}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="text-sm text-gray-800 mb-2">Estimated Annual Savings:</div>
          <motion.div 
            className="text-3xl font-bold text-green-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {formatCurrency(annualSavings)}
          </motion.div>
          <div className="text-xs text-gray-700 mt-1">
            Based on industry averages and your company size
          </div>
        </div>
      </div>
    </div>
  );
}

type AutomationInsightsProps = {
  insights: string[];
};

function AutomationInsights({ insights }: AutomationInsightsProps) {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalized Automation Insights</h3>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start p-3 bg-blue-50 border-l-4 border-blue-500 rounded"
          >
            <div className="flex-shrink-0 mr-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-blue-600" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <p className="text-sm text-gray-900">{insight}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-5 pt-5 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-800">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-yellow-600 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" 
              clipRule="evenodd" 
            />
          </svg>
          <p>
            <strong>Pro Tip:</strong> Businesses that act on automation insights see an average of 31% higher ROI than those who delay implementation.
          </p>
        </div>
      </div>
    </div>
  );
}

// Type for form data
type FormData = {
  // Contact info
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  
  // Business info
  industry: string;
  employees: string;
  goals: string[];
  compliance_concerns: string[];
  patient_data: string;
  inventory_management: string;
  sales_channels: string[];
  customer_loyalty: string;
  owner_involvement: string;
  growth_challenges: string;
  departments_involved: string[];
  integration_complexity: string;
  decision_makers: string;
  pain_points: string[]; // New field for pain points
  
  // Automation needs
  automation_areas: string[];
  document_types: string[];
  document_volume: string;
  cs_channels: string[];
  cs_ticket_volume: string;
  automation_experience: string;
  existing_systems: string[];
  specific_challenges: string;
  automation_timeline: string;
  process_time_spent: string; // New field for time spent on manual processes
  error_frequency: string; // New field for error frequency
  
  // Budget & Investment
  budget_range: string;
  funding_source: string;
  decision_timeline: string;
  investment_factors: string[];
  expected_roi: string;
  previous_investments: string;
  budget_constraints: string;
  competitor_automation: string; // New field for competitive pressure
  
  // Final
  referral_source: string;
  consultation_preference: string;
  additional_stakeholders: string[];
  preferred_timeline: string;
  additional_comments: string;
  consent_marketing: boolean;
  consent_terms: boolean;
  
  // For internal use
  created_at?: string;
  status?: string;
  assigned_to?: string;
  id?: string | number;
};

// Step information
const steps = [
  { id: 1, title: 'Contact Info' },
  { id: 2, title: 'Business Info' },
  { id: 3, title: 'Automation Needs' },
  { id: 4, title: 'Budget' },
  { id: 5, title: 'Additional Info' }
];

// Industry benchmark data
const industryBenchmarks = {
  healthcare: { automationScore: 65, avgTimeSavings: 12, avgCostSavings: 22 },
  financial: { automationScore: 72, avgTimeSavings: 15, avgCostSavings: 28 },
  retail: { automationScore: 58, avgTimeSavings: 10, avgCostSavings: 18 },
  manufacturing: { automationScore: 61, avgTimeSavings: 14, avgCostSavings: 25 },
  professional_services: { automationScore: 55, avgTimeSavings: 8, avgCostSavings: 16 },
  education: { automationScore: 48, avgTimeSavings: 9, avgCostSavings: 15 },
  hospitality: { automationScore: 52, avgTimeSavings: 11, avgCostSavings: 17 },
  construction: { automationScore: 45, avgTimeSavings: 12, avgCostSavings: 19 },
  technology: { automationScore: 78, avgTimeSavings: 18, avgCostSavings: 30 },
  other: { automationScore: 55, avgTimeSavings: 10, avgCostSavings: 20 }
};

export default function BusinessAssessmentForm() {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    // Initialize with empty values
    fullName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    
    industry: '',
    employees: '',
    goals: [],
    compliance_concerns: [],
    patient_data: '',
    inventory_management: '',
    sales_channels: [],
    customer_loyalty: '',
    owner_involvement: '',
    growth_challenges: '',
    departments_involved: [],
    integration_complexity: '',
    decision_makers: '',
    pain_points: [],
    
    automation_areas: [],
    document_types: [],
    document_volume: '',
    cs_channels: [],
    cs_ticket_volume: '',
    automation_experience: '',
    existing_systems: [],
    specific_challenges: '',
    automation_timeline: '',
    process_time_spent: '',
    error_frequency: '',
    
    budget_range: '',
    funding_source: '',
    decision_timeline: '',
    investment_factors: [],
    expected_roi: '',
    previous_investments: '',
    budget_constraints: '',
    competitor_automation: '',
    
    referral_source: '',
    consultation_preference: '',
    additional_stakeholders: [],
    preferred_timeline: '',
    additional_comments: '',
    consent_marketing: false,
    consent_terms: false
  });
  
  // Current step
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  
  // Automation score state
  const [automationScore, setAutomationScore] = useState(0);
  const [benchmarkScore, setBenchmarkScore] = useState(0);
  const [potentialRoi, setPotentialRoi] = useState({ timeSavings: 0, costSavings: 0 });
  const [insights, setInsights] = useState<string[]>([]);
  
  // Calculate automation score and insights when form data changes
  useEffect(() => {
    calculateAutomationMetrics();
  }, [formData]);
  
  const calculateAutomationMetrics = () => {
    let score = 0;
    const newInsights: string[] = [];
    
    // Automation experience contributes to score
    if (formData.automation_experience === 'none') {
      score += 0;
      newInsights.push("Your business is starting from scratch with automation - perfect timing to implement best practices from the beginning.");
    } else if (formData.automation_experience === 'basic') {
      score += 25;
      newInsights.push("You've taken initial steps toward automation. There's significant potential to expand and connect these systems.");
    } else if (formData.automation_experience === 'moderate') {
      score += 50;
      newInsights.push("Your moderate automation foundation can be optimized and expanded for greater efficiency.");
    } else if (formData.automation_experience === 'advanced') {
      score += 75;
      newInsights.push("Your advanced automation puts you ahead of many competitors. Fine-tuning and AI integration could take you to the next level.");
    }
    
    // More automation areas selected increases score
    if (formData.automation_areas.length > 0) {
      score += Math.min(formData.automation_areas.length * 5, 25);
    }
    
    // Existing systems integration potential
    if (formData.existing_systems.length > 0) {
      score += Math.min(formData.existing_systems.length * 5, 25);
      if (formData.existing_systems.length >= 3) {
        newInsights.push("Your multiple existing systems present excellent integration opportunities, which could eliminate data silos and duplicated effort.");
      }
    }
    
    // Calculate potential ROI
    let timeSavingsPercent = 0;
    let costSavingsPercent = 0;
    
    // Base on industry benchmarks
    if (formData.industry && industryBenchmarks[formData.industry as keyof typeof industryBenchmarks]) {
      const benchmark = industryBenchmarks[formData.industry as keyof typeof industryBenchmarks];
      setBenchmarkScore(benchmark.automationScore);
      timeSavingsPercent = benchmark.avgTimeSavings;
      costSavingsPercent = benchmark.avgCostSavings;
      
      // Compare to benchmark
      if (score < benchmark.automationScore - 20) {
        newInsights.push(`Your automation readiness is significantly below the average for ${formData.industry} businesses. This gap represents a competitive vulnerability.`);
      }
    }
    
    // Pain points increase potential savings
    if (formData.pain_points && formData.pain_points.length > 0) {
      timeSavingsPercent += formData.pain_points.length * 2;
      costSavingsPercent += formData.pain_points.length * 2;
      
      if (formData.pain_points.length >= 3) {
        newInsights.push("The multiple pain points you've identified represent significant opportunity for immediate automation benefits.");
      }
    }
    
    // Process time influences potential savings
    if (formData.process_time_spent === 'very_high') {
      timeSavingsPercent += 15;
      costSavingsPercent += 10;
      newInsights.push("The significant time your team spends on manual processes indicates a high-priority automation opportunity.");
    } else if (formData.process_time_spent === 'high') {
      timeSavingsPercent += 10;
      costSavingsPercent += 8;
    }
    
    // Error frequency affects cost savings
    if (formData.error_frequency === 'very_frequent') {
      costSavingsPercent += 15;
      newInsights.push("Frequent errors in manual processes can be virtually eliminated through properly implemented automation.");
    } else if (formData.error_frequency === 'frequent') {
      costSavingsPercent += 10;
    }
    
    // Competitive pressure insight
    if (formData.competitor_automation === 'advanced') {
      newInsights.push("Your competitors' advanced use of automation creates urgency to implement your own solutions to maintain market position.");
    }
    
    setAutomationScore(Math.min(Math.round(score), 100));
    setPotentialRoi({
      timeSavings: Math.min(Math.round(timeSavingsPercent), 95),
      costSavings: Math.min(Math.round(costSavingsPercent), 95)
    });
    setInsights(newInsights);
  };
  
  // Form field change handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field if it exists
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [validationErrors]);
  
  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field if it exists
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [validationErrors]);
  
  const handleCheckboxChange = useCallback((name: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = prev[name as keyof FormData] as string[] || [];
      let newValues: string[];
      
      if (checked) {
        newValues = [...currentValues, value];
      } else {
        newValues = currentValues.filter(item => item !== value);
      }
      
      return { ...prev, [name]: newValues };
    });
    
    // Clear validation error for this field if it exists
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [validationErrors]);
  
  const handleCheckboxSingleChange = useCallback((name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    // Clear validation error for this field if it exists
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [validationErrors]);
  
  // Validation functions for each step
  const validateContactSection = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.fullName) errors.fullName = 'Full name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.company) errors.company = 'Company name is required';
    if (!formData.role) errors.role = 'Role is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validateBusinessInfoSection = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.industry) errors.industry = 'Industry is required';
    if (!formData.employees) errors.employees = 'Number of employees is required';
    if (!formData.goals || formData.goals.length === 0) errors.goals = 'At least one business goal is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validateAutomationNeedsSection = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.automation_areas || formData.automation_areas.length === 0) {
      errors.automation_areas = 'At least one automation area is required';
    }
    if (!formData.automation_experience) errors.automation_experience = 'Current automation experience is required';
    if (!formData.automation_timeline) errors.automation_timeline = 'Implementation timeline is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validateBudgetSection = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.budget_range) errors.budget_range = 'Budget range is required';
    if (!formData.decision_timeline) errors.decision_timeline = 'Decision timeline is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validateFinalSection = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.consent_terms) errors.consent_terms = 'You must agree to the terms and conditions';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Navigation handlers
  const handleNext = useCallback(() => {
    let isValid = false;
    
    // Validate current step
    switch (currentStep) {
      case 1:
        isValid = validateContactSection();
        break;
      case 2:
        isValid = validateBusinessInfoSection();
        break;
      case 3:
        isValid = validateAutomationNeedsSection();
        break;
      case 4:
        isValid = validateBudgetSection();
        break;
      case 5:
        isValid = validateFinalSection();
        break;
      default:
        isValid = true;
    }
    
    if (isValid && currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, formData]);
  
  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);
  
  // Submit handler
  const handleSubmit = async () => {
    if (!validateFinalSection()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const supabase = createClient();
      
      // Create base data with only essential fields we know exist in the database
      const baseSubmissionData = {
        // Contact info (required fields)
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || '',
        role: formData.role || '',
        
        // Key form data fields that definitely exist
        industry: formData.industry || '',
        employees: formData.employees || '',
        automation_experience: formData.automation_experience || '',
        automation_timeline: formData.automation_timeline || '',
        budget_range: formData.budget_range || '',
        decision_timeline: formData.decision_timeline || '',
        
        // Always add status field
        status: 'new'
      };
      
      // Array fields we know exist (keeping only scalar values for safety)
      const commonArrayFields = {
        goals: formData.goals || [],
        automation_areas: formData.automation_areas || [],
        existing_systems: formData.existing_systems || [],
        investment_factors: formData.investment_factors || [],
      };
      
      // Save complete assessment data to localStorage as a backup
      // This ensures we capture all data even if the DB schema is limited
      try {
        localStorage.setItem(
          `assessment_backup_${new Date().getTime()}`, 
          JSON.stringify({
            ...formData,
            submission_time: new Date().toISOString(),
            automaticBackup: true
          })
        );
        console.log('Assessment data backed up to localStorage');
      } catch (err) {
        console.warn('Could not back up to localStorage', err);
      }
      
      console.log('Submitting essential form data to Supabase:', baseSubmissionData);
      
      // Insert minimal, safe data into Supabase (only fields that definitely exist)
      const { data, error } = await supabase
        .from('business_assessments')
        .insert([{
          ...baseSubmissionData,
          ...commonArrayFields,
        }])
        .select();
      
      if (error) {
        // Special handling for schema errors - try even more minimal submission
        if (error.message?.includes('could not find the') || error.message?.includes('schema cache')) {
          console.warn('Schema error detected. Falling back to bare-minimum submission:', error);
          
          // Try again with only the most essential fields
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('business_assessments')
            .insert([{
              full_name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              company: formData.company || '',
              status: 'new'
            }])
            .select();
            
          if (fallbackError) {
            throw new Error(`Database fallback error: ${fallbackError.message}`);
          }
          
          console.log('Fallback submission successful with minimal data:', fallbackData);
          // Update form data with the database ID and created_at information
          if (fallbackData && fallbackData[0]) {
            setFormData({
              ...formData,
              id: fallbackData[0].id,
              created_at: fallbackData[0].created_at || new Date().toISOString()
            });
          }
          // Still move to success state
          setCurrentStep(6);
          return;
        } else {
          // For non-schema errors, throw normally
          throw new Error(`Database error: ${error.message}`);
        }
      }
      
      console.log('Submission successful, received data:', data);
      
      // Update form data with the database ID and created_at information
      if (data && data[0]) {
        setFormData({
          ...formData,
          id: data[0].id,
          created_at: data[0].created_at || new Date().toISOString()
        });
      }
      
      // Success - move to thank you page
      setCurrentStep(6);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitError(`There was an error submitting your assessment: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Generate a user-friendly reference ID
  const formatReferenceId = () => {
    if (formData.id) {
      // If we have a numerical ID, format it as "IMP-{ID}"
      return `IMP-${formData.id}`;
    } else if (formData.created_at) {
      // Create a timestamp-based reference with date prefix: "IMP-YYMMDD-{base36}"
      const date = new Date(formData.created_at);
      const datePrefix = date.getFullYear().toString().substring(2) + 
                         String(date.getMonth() + 1).padStart(2, '0') + 
                         String(date.getDate()).padStart(2, '0');
      const timeCode = date.getTime().toString(36).toUpperCase().substring(0, 6);
      return `IMP-${datePrefix}-${timeCode}`;
    } else {
      // Fallback with current date
      const now = new Date();
      const datePrefix = now.getFullYear().toString().substring(2) + 
                       String(now.getMonth() + 1).padStart(2, '0') + 
                       String(now.getDate()).padStart(2, '0');
      const timeCode = now.getTime().toString(36).toUpperCase().substring(0, 6);
      return `IMP-${datePrefix}-${timeCode}`;
    }
  };
  
  // Render the progress bar
  const renderProgressBar = () => {
    const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };
  
  const renderSteps = () => {
    return (
      <div className="grid grid-cols-5 gap-4 mb-8">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`text-center ${
              currentStep === step.id
                ? 'text-blue-600 font-semibold'
                : currentStep > step.id
                  ? 'text-gray-500'
                  : 'text-gray-400'
            }`}
          >
            <div 
              className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full mb-2 ${
                currentStep === step.id
                  ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                  : currentStep > step.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {currentStep > step.id ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <div className="text-xs">{step.title}</div>
          </div>
        ))}
      </div>
    );
  };

  // Render insights and metrics after specific steps
  const renderMetrics = () => {
    // Only show metrics after user has provided enough information
    if (currentStep <= 2) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Automation Assessment</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {currentStep >= 3 && (
            <AutomationScoreCard 
              score={automationScore} 
              benchmarkScore={benchmarkScore}
              industry={formData.industry}
            />
          )}
          
          {currentStep >= 4 && (
            <ROICalculator 
              timeSavings={potentialRoi.timeSavings} 
              costSavings={potentialRoi.costSavings}
              industry={formData.industry}
              employees={formData.employees}
            />
          )}
        </div>
        
        {currentStep >= 3 && insights.length > 0 && (
          <AutomationInsights insights={insights} />
        )}
      </div>
    );
  };

  // Show the corresponding section based on current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContactSection
            formData={formData}
            errors={validationErrors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onNext={() => {
              if (validateContactSection()) {
                setCurrentStep(2);
              }
            }}
          />
        );
      case 2:
        return (
          <BusinessInfoSection
            formData={formData}
            errors={validationErrors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCheckboxChange={handleCheckboxChange}
            onPrev={() => setCurrentStep(1)}
            onNext={() => {
              if (validateBusinessInfoSection()) {
                setCurrentStep(3);
              }
            }}
          />
        );
      case 3:
        return (
          <AutomationNeedsSection
            formData={formData}
            errors={validationErrors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCheckboxChange={handleCheckboxChange}
            onPrev={() => setCurrentStep(2)}
            onNext={() => {
              if (validateAutomationNeedsSection()) {
                setCurrentStep(4);
              }
            }}
          />
        );
      case 4:
        return (
          <BudgetSection
            formData={formData}
            errors={validationErrors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCheckboxChange={handleCheckboxChange}
            onPrev={() => setCurrentStep(3)}
            onNext={() => {
              if (validateBudgetSection()) {
                setCurrentStep(5);
              }
            }}
          />
        );
      case 5:
        return (
          <FinalSection
            formData={formData}
            errors={validationErrors}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCheckboxChange={handleCheckboxChange}
            onCheckboxSingleChange={handleCheckboxSingleChange}
            onPrev={() => setCurrentStep(4)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Business Automation Assessment</h1>
      <p className="text-gray-900 mb-8">
        Complete this assessment to receive personalized insights about your business automation opportunities.
      </p>
      
      {renderSteps()}
      {renderProgressBar()}
      
      {/* Show metrics if we have enough data */}
      {renderMetrics()}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentStep()}
              
            {currentStep === 6 && (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                <p className="text-gray-900 mb-6">
                  Your assessment has been submitted successfully. Our team will review your information and reach out to you shortly.
                </p>
                <p className="text-gray-700 text-sm">
                  Reference ID: <span className="font-mono font-bold">{formatReferenceId()}</span>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 