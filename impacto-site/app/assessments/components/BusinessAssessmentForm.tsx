'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { createBusinessAssessmentsTable, executeSQL } from '../../actions';
import { 
  saveFormToLocalStorage, 
  getFormFromLocalStorage, 
  clearFormLocalStorage,
  addPendingSubmission
} from '../utils/local-storage';
import {
  logFormError,
  getUserFriendlyErrorMessage,
  isOfflineError
} from '../utils/error-handling';

interface BusinessAssessmentFormProps {
  isAuthenticated?: boolean;
  onSubmit?: (data: any) => void;
}

const BusinessAssessmentForm: React.FC<BusinessAssessmentFormProps> = ({ isAuthenticated = false, onSubmit }) => {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showThankYou, setShowThankYou] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    industry: '',
    employees: '',
    goals: [] as string[],
    compliance_concerns: [] as string[],
    patient_data: '',
    inventory_management: '',
    sales_channels: [] as string[],
    customer_loyalty: '',
    owner_involvement: '',
    growth_challenges: '',
    departments_involved: [] as string[],
    integration_complexity: '',
    decision_makers: '',
    challenges: {
      financial_challenge: 1,
      onboarding_challenge: 1,
      pipeline_challenge: 1,
      proposal_challenge: 1,
      project_challenge: 1,
      crm_challenge: 1,
      reporting_challenge: 1,
      communication_challenge: 1,
      workflow_challenge: 1,
      hr_challenge: 1
    },
    invoice_volume: '',
    financial_pain_points: [] as string[],
    crm_pain_points: [] as string[],
    proposal_volume: '',
    proposal_approval: '',
    proposal_time: '',
    onboarding_client_volume: '',
    onboarding_pain_points: [] as string[],
    onboarding_duration: '',
    pipeline_lead_source: [] as string[],
    pipeline_conversion_rate: '',
    pipeline_tracking_method: '',
    project_management_method: '',
    project_team_size: '',
    project_pain_points: [] as string[],
    communication_channels: [] as string[],
    communication_frequency: '',
    communication_pain_points: [] as string[],
    workflow_bottlenecks: [] as string[],
    workflow_automation_areas: [] as string[],
    workflow_collaboration_tools: [] as string[],
    hr_team_size: '',
    hr_pain_points: [] as string[],
    hr_hiring_volume: '',
    software: [] as string[],
    other_software: '',
    automation_level: '',
    integration_challenges: '',
    priorities: [] as string[],
    specific_pain: '',
    success_criteria: '',
    previous_automation: '',
    previous_experience: '',
    decision_timeline: '',
    additional_info: '',
    consent: false,
    consultation_requested: false,
    reporting_tools: [] as string[]
  });
  
  const showHealthcareQuestions = formData.industry === 'healthcare';
  const showRetailQuestions = formData.industry === 'retail';
  const showSmallBusinessQuestions = ['1-10', '11-50'].includes(formData.employees);
  const showLargeBusinessQuestions = ['201-500', '500+'].includes(formData.employees);
  const showPreviousExperience = formData.previous_automation === 'yes';

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const totalSections = 7;
    setProgress(((currentSection - 1) / (totalSections - 1)) * 100);
  }, [currentSection]);

  const handleNextSection = () => {
    if (currentSection === 1 && !validateSection(1)) return;
    setCurrentSection(currentSection + 1);
  };

  const handlePrevSection = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      
      if (name === 'consent' || name === 'consultation_requested') {
        setFormData({
          ...formData,
          [name]: isChecked
        });
      } else {
        // Handle checkbox arrays (like goals, software, priorities)
        const currentArray = [...(formData[name as keyof typeof formData] as string[])];
        
        if (isChecked) {
          // Add to array if not present
          if (!currentArray.includes(value)) {
            setFormData({
              ...formData,
              [name]: [...currentArray, value]
            });
          }
        } else {
          // Remove from array
          setFormData({
            ...formData,
            [name]: currentArray.filter(item => item !== value)
          });
        }
      }
    } else if (name.includes('challenge') && name !== 'integration_challenges') {
      // Handle challenge ratings
      setFormData({
        ...formData,
        challenges: {
          ...formData.challenges,
          [name]: Number(value)
        }
      });
    } else {
      // Handle text, select, etc.
      console.log(`Setting ${name} to "${value}"`);
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field if any
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleRatingSelect = (name: string, value: number) => {
    console.log(`Setting ${name} to rating ${value}`);
    setFormData({
      ...formData,
      challenges: {
        ...formData.challenges,
        [name]: value
      }
    });
  };

  const validateSection = (section: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (section === 1) {
      if (!formData.full_name.trim()) {
        newErrors.full_name = 'Full name is required';
        isValid = false;
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
        isValid = false;
      }
    } else if (section === 6) {
      if (formData.priorities.length > 3) {
        newErrors.priorities = 'Please select a maximum of 3 priorities';
        isValid = false;
      }
    } else if (section === 7) {
      if (!formData.consent) {
        newErrors.consent = 'You must provide consent to submit the form';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Add this function at the top level of the component, before handleSubmit
  
  const createAssessmentTableIfNeeded = async () => {
    try {
      // Check if business_assessments table exists
      const { data, error } = await supabase
        .from('business_assessments')
        .select('id')
        .limit(1);

      if (error) {
        console.log('Table might not exist, attempting to create it');
        // Execute the SQL to create the table
        const { error: createError } = await supabase.rpc('create_business_assessments_table');
        
        if (createError) {
          console.error('Error creating table:', createError);
          return false;
        }
        
        console.log('Table created successfully');
        return true;
      }
      
      return true; // Table exists
    } catch (e) {
      console.error('Error checking/creating table:', e);
      return false;
    }
  };

  // Add this code after the supabase client initialization
  useEffect(() => {
    // Check for saved form data in localStorage when component mounts
    const savedData = getFormFromLocalStorage();
    if (savedData) {
      console.log('Restored form data from local storage');
      setFormData(prevData => ({
        ...prevData,
        ...savedData
      }));
    }
  }, []);
  
  // In the handleInputChange function, add this at the end:
  // This ensures form data is saved incrementally
  useEffect(() => {
    if (Object.values(formData).some(value => 
      (typeof value === 'string' && value.length > 0) || 
      (Array.isArray(value) && value.length > 0)
    )) {
      saveFormToLocalStorage(formData);
    }
  }, [formData]);

  // Update the handleSubmit function to add localStorage fallback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSection(currentSection)) {
      return;
    }
    
    setIsSubmitting(true);
    console.log("Submitting form data:", formData);
    
    try {
      if (onSubmit) {
        onSubmit(formData);
        setSubmitSuccess(true);
        clearFormLocalStorage(); // Clear saved form data on successful submission
        return;
      }
      
      // Prepare the data for submission with explicit type conversion
      const submissionData: Record<string, any> = {
        full_name: formData.full_name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        company: formData.company || '',
        role: formData.role || '',
        industry: formData.industry || '',
        employees: formData.employees || '',
        challenges: formData.challenges || {},
        goals: formData.goals || [],
        compliance_concerns: formData.compliance_concerns || [],
        sales_channels: formData.sales_channels || [],
        departments_involved: formData.departments_involved || [],
        financial_pain_points: formData.financial_pain_points || [],
        crm_pain_points: formData.crm_pain_points || [],
        onboarding_pain_points: formData.onboarding_pain_points || [],
        pipeline_lead_source: formData.pipeline_lead_source || [],
        project_pain_points: formData.project_pain_points || [],
        communication_channels: formData.communication_channels || [],
        communication_pain_points: formData.communication_pain_points || [],
        workflow_bottlenecks: formData.workflow_bottlenecks || [],
        workflow_automation_areas: formData.workflow_automation_areas || [],
        workflow_collaboration_tools: formData.workflow_collaboration_tools || [],
        hr_pain_points: formData.hr_pain_points || [],
        software: formData.software || [],
        priorities: formData.priorities || [],
        reporting_tools: formData.reporting_tools || [],
        patient_data: formData.patient_data || '',
        inventory_management: formData.inventory_management || '',
        customer_loyalty: formData.customer_loyalty || '',
        owner_involvement: formData.owner_involvement || '',
        growth_challenges: formData.growth_challenges || '',
        integration_complexity: formData.integration_complexity || '',
        decision_makers: formData.decision_makers || '',
        invoice_volume: formData.invoice_volume || '',
        proposal_volume: formData.proposal_volume || '',
        proposal_approval: formData.proposal_approval || '',
        proposal_time: formData.proposal_time || '',
        onboarding_client_volume: formData.onboarding_client_volume || '',
        onboarding_duration: formData.onboarding_duration || '',
        pipeline_conversion_rate: formData.pipeline_conversion_rate || '',
        pipeline_tracking_method: formData.pipeline_tracking_method || '',
        project_management_method: formData.project_management_method || '',
        project_team_size: formData.project_team_size || '',
        communication_frequency: formData.communication_frequency || '',
        hr_team_size: formData.hr_team_size || '',
        hr_hiring_volume: formData.hr_hiring_volume || '',
        other_software: formData.other_software || '',
        automation_level: formData.automation_level || '',
        integration_challenges: formData.integration_challenges || '',
        specific_pain: formData.specific_pain || '',
        success_criteria: formData.success_criteria || '',
        previous_automation: formData.previous_automation || '',
        previous_experience: formData.previous_experience || '',
        decision_timeline: formData.decision_timeline || '',
        additional_info: formData.additional_info || '',
        consent: formData.consent || false,
        consultation_requested: formData.consultation_requested || false
      };
      
      // Remove any undefined values - Supabase doesn't handle them well
      Object.keys(submissionData).forEach(key => {
        if (submissionData[key] === undefined) {
          delete submissionData[key];
        }
      });
      
      console.log("Prepared submission data:", submissionData);
      
      // Save to localStorage as a backup
      saveFormToLocalStorage(formData);
      
      // Directly try to insert into the table
      try {
        const { data, error } = await supabase
          .from('business_assessments')
          .insert([submissionData]);
        
        if (error) {
          console.error('Insert error:', error);
          
          // Always save to pending submissions as a fallback
          addPendingSubmission(submissionData);
          throw error;
        }
        
        console.log("Submission successful!");
        setSubmitSuccess(true);
        clearFormLocalStorage(); // Clear saved form data on successful submission
        
        // Handle success
        if (isAuthenticated) {
          setTimeout(() => {
            router.push('/assessments');
          }, 2000);
        } else {
          setShowThankYou(true);
        }
      } catch (dbError) {
        logFormError(dbError, 'database operation', submissionData);
        
        // Check if it's an offline/network error
        if (isOfflineError(dbError)) {
          console.log('Detected offline/network error - storing submission for later');
        }
        
        // Always save to pending submissions as a fallback
        addPendingSubmission(submissionData);
        throw dbError;
      }
    } catch (error) {
      logFormError(error, 'form submission', formData);
      const errorMessage = getUserFriendlyErrorMessage(error);
      
      // For admin view, show the error
      if (isAuthenticated) {
        setErrors({
          ...errors,
          submit: errorMessage
        });
      } else {
        // For public form, still show success if it's an offline error
        if (isOfflineError(error)) {
          setSubmitSuccess(true);
          setShowThankYou(true);
        } else {
          setErrors({
            ...errors,
            submit: errorMessage
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render form sections
  const renderContactSection = () => {
    return (
      <div className={`space-y-6 ${currentSection === 1 ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-semibold mb-4 text-black">Contact Information</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-black mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-black mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-black mb-1">
              Your Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Select your role</option>
              <option value="owner">Business Owner</option>
              <option value="executive">Executive/C-Level</option>
              <option value="manager">Manager</option>
              <option value="director">Director</option>
              <option value="other">Other</option>
            </select>
            <p className="mt-1 text-xs text-black">
              Knowing your role helps us tailor our recommendations to your specific needs and authority level.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleNextSection}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  const renderBusinessSection = () => {
    return (
      <div className={`space-y-6 ${currentSection === 2 ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-semibold mb-4 text-black">About Your Business</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-black mb-1">
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Select your industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance/Banking</option>
              <option value="retail">Retail/E-commerce</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="professional">Professional Services</option>
              <option value="education">Education</option>
              <option value="construction">Construction</option>
              <option value="hospitality">Hospitality</option>
              <option value="other">Other</option>
            </select>
            <p className="mt-1 text-xs text-black">
              Different industries have unique automation needs and requirements.
            </p>
          </div>
          
          {/* Healthcare-specific questions */}
          {showHealthcareQuestions && (
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
              <h3 className="font-semibold mb-3 text-black">Healthcare-Specific Questions</h3>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-black mb-1">
                  Which compliance regulations affect your operations? (Select all that apply)
                </label>
                <div className="space-y-2 mt-1">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="compliance_hipaa"
                      name="compliance_concerns"
                      value="hipaa"
                      checked={formData.compliance_concerns.includes('hipaa')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="compliance_hipaa" className="text-black font-medium">HIPAA</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="compliance_hitrust"
                      name="compliance_concerns"
                      value="hitrust"
                      checked={formData.compliance_concerns.includes('hitrust')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="compliance_hitrust" className="text-black font-medium">HITRUST</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="compliance_gdpr"
                      name="compliance_concerns"
                      value="gdpr"
                      checked={formData.compliance_concerns.includes('gdpr')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="compliance_gdpr" className="text-black font-medium">GDPR</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="compliance_other"
                      name="compliance_concerns"
                      value="other_compliance"
                      checked={formData.compliance_concerns.includes('other_compliance')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="compliance_other" className="text-black font-medium">Other</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="patient_data" className="block text-sm font-medium text-black mb-1">
                  Do your automation needs include patient data management?
                </label>
                <select
                  id="patient_data"
                  name="patient_data"
                  value={formData.patient_data}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                >
                  <option value="">Please select</option>
                  <option value="yes">Yes, extensively</option>
                  <option value="partial">Yes, partially</option>
                  <option value="no">No, not directly</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Retail-specific questions */}
          {showRetailQuestions && (
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
              <h3 className="font-semibold mb-3 text-black">Retail-Specific Questions</h3>
              
              <div className="mb-3">
                <label htmlFor="inventory_management" className="block text-sm font-medium text-black mb-1">
                  How do you currently manage inventory?
                </label>
                <select
                  id="inventory_management"
                  name="inventory_management"
                  value={formData.inventory_management}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                >
                  <option value="">Please select</option>
                  <option value="manual">Manual tracking (spreadsheets)</option>
                  <option value="basic_software">Basic inventory software</option>
                  <option value="erp">ERP system</option>
                  <option value="specialized">Specialized inventory system</option>
                  <option value="none">No formal system</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-black mb-1">
                  Which sales channels do you use? (Select all that apply)
                </label>
                <div className="space-y-2 mt-1">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sales_physical"
                      name="sales_channels"
                      value="physical"
                      checked={formData.sales_channels.includes('physical')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="sales_physical" className="text-black font-medium">Physical store(s)</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sales_website"
                      name="sales_channels"
                      value="own_website"
                      checked={formData.sales_channels.includes('own_website')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="sales_website" className="text-black font-medium">Own website</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sales_amazon"
                      name="sales_channels"
                      value="amazon"
                      checked={formData.sales_channels.includes('amazon')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="sales_amazon" className="text-black font-medium">Amazon</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sales_marketplace"
                      name="sales_channels"
                      value="other_marketplace"
                      checked={formData.sales_channels.includes('other_marketplace')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="sales_marketplace" className="text-black font-medium">Other marketplaces</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sales_wholesale"
                      name="sales_channels"
                      value="wholesale"
                      checked={formData.sales_channels.includes('wholesale')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="sales_wholesale" className="text-black font-medium">Wholesale/B2B</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="customer_loyalty" className="block text-sm font-medium text-black mb-1">
                  Do you have a customer loyalty program?
                </label>
                <select
                  id="customer_loyalty"
                  name="customer_loyalty"
                  value={formData.customer_loyalty}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                >
                  <option value="">Please select</option>
                  <option value="yes_automated">Yes, fully automated</option>
                  <option value="yes_manual">Yes, manually managed</option>
                  <option value="planning">Planning to implement one</option>
                  <option value="no">No loyalty program</option>
                </select>
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="employees" className="block text-sm font-medium text-black mb-1">
              Number of Employees
            </label>
            <select
              id="employees"
              name="employees"
              value={formData.employees}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Select range</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="500+">500+</option>
            </select>
          </div>
          
          {/* Small business questions */}
          {showSmallBusinessQuestions && (
            <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
              <h3 className="font-semibold mb-3 text-black">Small Business Automation Foundations</h3>
              
              <div className="mb-3">
                <label htmlFor="owner_involvement" className="block text-sm font-medium text-black mb-1">
                  How involved is the owner in day-to-day operations?
                </label>
                <select
                  id="owner_involvement"
                  name="owner_involvement"
                  value={formData.owner_involvement}
                  onChange={(e) => {
                    console.log('Selected owner involvement:', e.target.value);
                    setFormData({
                      ...formData,
                      owner_involvement: e.target.value
                    });
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                >
                  <option value="">Please select</option>
                  <option value="highly_involved">Highly involved in all aspects</option>
                  <option value="moderately">Moderately involved in key areas</option>
                  <option value="limited">Limited involvement in daily operations</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="growth_challenges" className="block text-sm font-medium text-black mb-1">
                  What's your biggest challenge to growth right now?
                </label>
                <select
                  id="growth_challenges"
                  name="growth_challenges"
                  value={formData.growth_challenges}
                  onChange={(e) => {
                    console.log('Selected growth challenge:', e.target.value);
                    setFormData({
                      ...formData,
                      growth_challenges: e.target.value
                    });
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                >
                  <option value="">Please select</option>
                  <option value="time">Not enough time in the day</option>
                  <option value="staff">Limited staff resources</option>
                  <option value="processes">Inconsistent processes</option>
                  <option value="technology">Limited technology/tools</option>
                  <option value="knowledge">Limited expertise in certain areas</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Large organization questions */}
          {showLargeBusinessQuestions && (
            <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
              <h3 className="font-semibold mb-3 text-black">Enterprise Integration Questions</h3>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-black mb-1">
                  Which departments would be involved in this automation initiative? (Select all that apply)
                </label>
                <div className="space-y-2 mt-1">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dept_it"
                      name="departments_involved"
                      value="it"
                      checked={formData.departments_involved.includes('it')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="dept_it" className="text-black font-medium">IT</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dept_operations"
                      name="departments_involved"
                      value="operations"
                      checked={formData.departments_involved.includes('operations')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="dept_operations" className="text-black font-medium">Operations</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dept_sales"
                      name="departments_involved"
                      value="sales"
                      checked={formData.departments_involved.includes('sales')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="dept_sales" className="text-black font-medium">Sales/Marketing</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dept_finance"
                      name="departments_involved"
                      value="finance"
                      checked={formData.departments_involved.includes('finance')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="dept_finance" className="text-black font-medium">Finance</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dept_hr"
                      name="departments_involved"
                      value="hr"
                      checked={formData.departments_involved.includes('hr')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="dept_hr" className="text-black font-medium">HR</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dept_executive"
                      name="departments_involved"
                      value="executive"
                      checked={formData.departments_involved.includes('executive')}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="dept_executive" className="text-black font-medium">Executive</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="integration_complexity" className="block text-sm font-medium text-black mb-1">
                  How complex are your current system integrations?
                </label>
                <select
                  id="integration_complexity"
                  name="integration_complexity"
                  value={formData.integration_complexity}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                >
                  <option value="">Please select</option>
                  <option value="minimal">Minimal - Systems mostly operate independently</option>
                  <option value="moderate">Moderate - Some key systems are integrated</option>
                  <option value="complex">Complex - Multiple integrated systems</option>
                  <option value="very_complex">Very complex - Extensive integration ecosystem</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="decision_makers" className="block text-sm font-medium text-black mb-1">
                  Who makes the final decision on technology investments?
                </label>
                <select
                  id="decision_makers"
                  name="decision_makers"
                  value={formData.decision_makers}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                >
                  <option value="">Please select</option>
                  <option value="cio">CIO/CTO</option>
                  <option value="ceo">CEO</option>
                  <option value="committee">Technology committee</option>
                  <option value="department">Department head</option>
                  <option value="board">Board approval required</option>
                </select>
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-black">
              What are your primary business goals for the next 12 months?
            </label>
            <div className="space-y-2 mt-1">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="goal_revenue"
                  name="goals"
                  value="increase_revenue"
                  checked={formData.goals.includes('increase_revenue')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="goal_revenue" className="text-black font-medium">Increase revenue</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="goal_costs"
                  name="goals"
                  value="reduce_costs"
                  checked={formData.goals.includes('reduce_costs')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="goal_costs" className="text-black font-medium">Reduce operational costs</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="goal_efficiency"
                  name="goals"
                  value="improve_efficiency"
                  checked={formData.goals.includes('improve_efficiency')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="goal_efficiency" className="text-black font-medium">Improve operational efficiency</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="goal_scale"
                  name="goals"
                  value="scale_business"
                  checked={formData.goals.includes('scale_business')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="goal_scale" className="text-black font-medium">Scale the business</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="goal_experience"
                  name="goals"
                  value="customer_experience"
                  checked={formData.goals.includes('customer_experience')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="goal_experience" className="text-black font-medium">Enhance customer experience</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="goal_satisfaction"
                  name="goals"
                  value="employee_satisfaction"
                  checked={formData.goals.includes('employee_satisfaction')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="goal_satisfaction" className="text-black font-medium">Improve employee satisfaction</label>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Select all that apply. Your goals help us prioritize which automation solutions will deliver the most value.
            </p>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevSection}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-black"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextSection}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  // RatingScale component for challenges
  const RatingScale = ({ 
    name, 
    value, 
    onChange 
  }: { 
    name: string; 
    value: number; 
    onChange: (name: string, value: number) => void; 
  }) => {
    return (
      <div className="flex justify-between items-center mt-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button 
            key={rating}
            type="button"
            onClick={() => onChange(name, rating)}
            className={`w-16 h-16 rounded-full flex flex-col items-center justify-center mb-1 text-black border focus:outline-none ${
              value === rating 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-gray-100 text-black border-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="text-lg font-semibold">{rating}</span>
            <span className="text-xs mt-1 font-medium">
              {rating === 1 && 'No Issues'}
              {rating === 2 && 'Minor'}
              {rating === 3 && 'Moderate'}
              {rating === 4 && 'Significant'}
              {rating === 5 && 'Critical'}
            </span>
          </button>
        ))}
      </div>
    );
  };

  const renderChallengesSection = () => {
    return (
      <div className={`space-y-6 ${currentSection === 3 ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-semibold mb-4 text-black">Business Challenges</h2>
        <p className="text-black mb-4">Rate each area based on your current level of challenge or frustration:</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black">
              Financial Processing & Contract Management
            </label>
            <RatingScale 
              name="financial_challenge"
              value={formData.challenges.financial_challenge}
              onChange={handleRatingSelect}
            />
            <p className="mt-1 text-xs text-black">
              Consider how much time is spent processing payments, managing contracts, and tracking financial documents.
            </p>
            
            {/* Financial follow-up questions */}
            {formData.challenges.financial_challenge >= 4 && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <p className="font-semibold mb-3 text-black">We noticed this is a significant challenge area. A few more details will help us craft the right solution:</p>
                
                <div className="mb-3">
                  <label htmlFor="invoice_volume" className="block text-sm font-medium text-black mb-1">
                    Approximately how many invoices/payments do you process monthly?
                  </label>
                  <select
                    id="invoice_volume"
                    name="invoice_volume"
                    value={formData.invoice_volume}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="1-25">1-25</option>
                    <option value="26-100">26-100</option>
                    <option value="101-500">101-500</option>
                    <option value="500+">More than 500</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    What are your biggest financial processing pain points? (Select all that apply)
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="fin_pain_manual"
                        name="financial_pain_points"
                        value="manual_entry"
                        checked={formData.financial_pain_points.includes('manual_entry')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="fin_pain_manual" className="text-black font-medium">Manual data entry</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="fin_pain_approval"
                        name="financial_pain_points"
                        value="approval_delays"
                        checked={formData.financial_pain_points.includes('approval_delays')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="fin_pain_approval" className="text-black font-medium">Approval delays</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="fin_pain_tracking"
                        name="financial_pain_points"
                        value="document_tracking"
                        checked={formData.financial_pain_points.includes('document_tracking')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="fin_pain_tracking" className="text-black font-medium">Document tracking/retrieval</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="fin_pain_reconciliation"
                        name="financial_pain_points"
                        value="reconciliation"
                        checked={formData.financial_pain_points.includes('reconciliation')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="fin_pain_reconciliation" className="text-black font-medium">Reconciliation challenges</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="fin_pain_reporting"
                        name="financial_pain_points"
                        value="reporting"
                        checked={formData.financial_pain_points.includes('reporting')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="fin_pain_reporting" className="text-black font-medium">Financial reporting</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black">
              Client Onboarding Process
            </label>
            <RatingScale 
              name="onboarding_challenge"
              value={formData.challenges.onboarding_challenge}
              onChange={handleRatingSelect}
            />
            <p className="mt-1 text-xs text-gray-500">
              Consider how smooth, consistent and efficient your process is for setting up new clients.
            </p>
            
            {/* Onboarding follow-up questions */}
            {formData.challenges.onboarding_challenge >= 4 && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <p className="font-semibold mb-3 text-black">We noticed this is a significant challenge area. A few more details will help us craft the right solution:</p>
                
                <div className="mb-3">
                  <label htmlFor="onboarding_client_volume" className="block text-sm font-medium text-black mb-1">
                    How many new clients do you onboard in a typical month?
                  </label>
                  <select
                    id="onboarding_client_volume"
                    name="onboarding_client_volume"
                    value={formData.onboarding_client_volume}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="1-3">1-3 clients</option>
                    <option value="4-10">4-10 clients</option>
                    <option value="11-25">11-25 clients</option>
                    <option value="26+">More than 25 clients</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-black mb-1">
                    What are your biggest pain points in the onboarding process? (Select all that apply)
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="onboarding_pain_paperwork"
                        name="onboarding_pain_points"
                        value="paperwork"
                        checked={formData.onboarding_pain_points.includes('paperwork')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="onboarding_pain_paperwork" className="text-black font-medium">Excessive paperwork</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="onboarding_pain_data_entry"
                        name="onboarding_pain_points"
                        value="data_entry"
                        checked={formData.onboarding_pain_points.includes('data_entry')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="onboarding_pain_data_entry" className="text-black font-medium">Manual data entry</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="onboarding_pain_communication"
                        name="onboarding_pain_points"
                        value="communication_gaps"
                        checked={formData.onboarding_pain_points.includes('communication_gaps')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="onboarding_pain_communication" className="text-black font-medium">Communication gaps</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="onboarding_pain_tracking"
                        name="onboarding_pain_points"
                        value="tracking_progress"
                        checked={formData.onboarding_pain_points.includes('tracking_progress')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="onboarding_pain_tracking" className="text-black font-medium">Tracking onboarding progress</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="onboarding_pain_inconsistent"
                        name="onboarding_pain_points"
                        value="inconsistent_process"
                        checked={formData.onboarding_pain_points.includes('inconsistent_process')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="onboarding_pain_inconsistent" className="text-black font-medium">Inconsistent processes</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="onboarding_duration" className="block text-sm font-medium text-black mb-1">
                    On average, how long does your client onboarding process take from start to finish?
                  </label>
                  <select
                    id="onboarding_duration"
                    name="onboarding_duration"
                    value={formData.onboarding_duration}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="1-2_days">1-2 days</option>
                    <option value="3-7_days">3-7 days</option>
                    <option value="1-2_weeks">1-2 weeks</option>
                    <option value="3-4_weeks">3-4 weeks</option>
                    <option value="more_than_month">More than a month</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black">
              Sales/Revenue Pipeline Management
            </label>
            <RatingScale 
              name="pipeline_challenge"
              value={formData.challenges.pipeline_challenge}
              onChange={handleRatingSelect}
            />
            <p className="mt-1 text-xs text-gray-500">
              Consider how effectively you track leads, opportunities, and forecast revenue.
            </p>
            
            {/* Pipeline follow-up questions */}
            {formData.challenges.pipeline_challenge >= 4 && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <p className="font-semibold mb-3 text-black">We noticed this is a significant challenge area. A few more details will help us craft the right solution:</p>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-black mb-1">
                    Where do most of your leads come from? (Select all that apply)
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="lead_referrals"
                        name="pipeline_lead_source"
                        value="referrals"
                        checked={formData.pipeline_lead_source.includes('referrals')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="lead_referrals" className="text-black font-medium">Referrals</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="lead_website"
                        name="pipeline_lead_source"
                        value="website"
                        checked={formData.pipeline_lead_source.includes('website')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="lead_website" className="text-black font-medium">Website/organic search</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="lead_advertising"
                        name="pipeline_lead_source"
                        value="advertising"
                        checked={formData.pipeline_lead_source.includes('advertising')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="lead_advertising" className="text-black font-medium">Paid advertising</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="lead_social"
                        name="pipeline_lead_source"
                        value="social_media"
                        checked={formData.pipeline_lead_source.includes('social_media')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="lead_social" className="text-black font-medium">Social media</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="lead_outbound"
                        name="pipeline_lead_source"
                        value="outbound"
                        checked={formData.pipeline_lead_source.includes('outbound')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="lead_outbound" className="text-black font-medium">Outbound sales</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="lead_events"
                        name="pipeline_lead_source"
                        value="events"
                        checked={formData.pipeline_lead_source.includes('events')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="lead_events" className="text-black font-medium">Events/trade shows</label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="pipeline_conversion_rate" className="block text-sm font-medium text-black mb-1">
                    What's your approximate lead-to-customer conversion rate?
                  </label>
                  <select
                    id="pipeline_conversion_rate"
                    name="pipeline_conversion_rate"
                    value={formData.pipeline_conversion_rate}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="less_than_5">Less than 5%</option>
                    <option value="5_to_10">5-10%</option>
                    <option value="11_to_20">11-20%</option>
                    <option value="21_to_40">21-40%</option>
                    <option value="over_40">Over 40%</option>
                    <option value="unknown">I don't know</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="pipeline_tracking_method" className="block text-sm font-medium text-black mb-1">
                    How do you currently track your sales pipeline?
                  </label>
                  <select
                    id="pipeline_tracking_method"
                    name="pipeline_tracking_method"
                    value={formData.pipeline_tracking_method}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="spreadsheets">Spreadsheets</option>
                    <option value="basic_crm">Basic CRM</option>
                    <option value="advanced_crm">Advanced CRM with pipeline features</option>
                    <option value="custom_system">Custom-built system</option>
                    <option value="manual">Manual tracking/notes</option>
                    <option value="no_system">No formal tracking system</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black">
              Proposal Development Process
            </label>
            <RatingScale 
              name="proposal_challenge"
              value={formData.challenges.proposal_challenge}
              onChange={handleRatingSelect}
            />
            <p className="mt-1 text-xs text-gray-500">
              Consider how long it takes to create proposals and how consistent they are in quality.
            </p>
            
            {/* Proposal follow-up questions */}
            {formData.challenges.proposal_challenge >= 4 && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <p className="font-semibold mb-3 text-black">We noticed this is a significant challenge area. A few more details will help us craft the right solution:</p>
                
                <div className="mb-3">
                  <label htmlFor="proposal_volume" className="block text-sm font-medium text-black mb-1">
                    How many proposals does your team create monthly?
                  </label>
                  <select
                    id="proposal_volume"
                    name="proposal_volume"
                    value={formData.proposal_volume}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="1-5">1-5 proposals</option>
                    <option value="6-15">6-15 proposals</option>
                    <option value="16-30">16-30 proposals</option>
                    <option value="30+">More than 30 proposals</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="proposal_approval" className="block text-sm font-medium text-black mb-1">
                    What does your current approval process look like?
                  </label>
                  <select
                    id="proposal_approval"
                    name="proposal_approval"
                    value={formData.proposal_approval}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="none">No formal approval process</option>
                    <option value="single">Single approver (e.g., manager)</option>
                    <option value="multi">Multiple approvers (sequential)</option>
                    <option value="committee">Committee review</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="proposal_time" className="block text-sm font-medium text-black mb-1">
                    On average, how long does it take to create a proposal?
                  </label>
                  <select
                    id="proposal_time"
                    name="proposal_time"
                    value={formData.proposal_time}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="hours">A few hours</option>
                    <option value="day">About a day</option>
                    <option value="days">2-3 days</option>
                    <option value="week">A week or more</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black">
              Project Management & Task Coordination
            </label>
            <RatingScale 
              name="project_challenge"
              value={formData.challenges.project_challenge}
              onChange={handleRatingSelect}
            />
            <p className="mt-1 text-xs text-gray-500">
              Consider how effectively you manage deadlines, resources, and project communications.
            </p>
            
            {/* Project management follow-up questions */}
            {formData.challenges.project_challenge >= 4 && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <p className="font-semibold mb-3 text-black">We noticed this is a significant challenge area. A few more details will help us craft the right solution:</p>
                
                <div className="mb-3">
                  <label htmlFor="project_management_method" className="block text-sm font-medium text-black mb-1">
                    How do you currently manage projects and tasks?
                  </label>
                  <select
                    id="project_management_method"
                    name="project_management_method"
                    value={formData.project_management_method}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="pm_software">Project management software</option>
                    <option value="spreadsheets">Spreadsheets</option>
                    <option value="email_calendar">Email and calendar</option>
                    <option value="manual">Manual systems/notebooks</option>
                    <option value="meetings">Regular meetings/verbal updates</option>
                    <option value="mixed">Mixed approach</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="project_team_size" className="block text-sm font-medium text-black mb-1">
                    What's the typical size of your project teams?
                  </label>
                  <select
                    id="project_team_size"
                    name="project_team_size"
                    value={formData.project_team_size}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="1-2">1-2 people</option>
                    <option value="3-5">3-5 people</option>
                    <option value="6-10">6-10 people</option>
                    <option value="11-20">11-20 people</option>
                    <option value="20+">More than 20 people</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    What are your biggest project management pain points? (Select all that apply)
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="project_pain_deadlines"
                        name="project_pain_points"
                        value="missed_deadlines"
                        checked={formData.project_pain_points.includes('missed_deadlines')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="project_pain_deadlines" className="text-black font-medium">Missed deadlines</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="project_pain_visibility"
                        name="project_pain_points"
                        value="lack_visibility"
                        checked={formData.project_pain_points.includes('lack_visibility')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="project_pain_visibility" className="text-black font-medium">Lack of visibility into project status</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="project_pain_communication"
                        name="project_pain_points"
                        value="poor_communication"
                        checked={formData.project_pain_points.includes('poor_communication')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="project_pain_communication" className="text-black font-medium">Poor team communication</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="project_pain_resources"
                        name="project_pain_points"
                        value="resource_allocation"
                        checked={formData.project_pain_points.includes('resource_allocation')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="project_pain_resources" className="text-black font-medium">Resource allocation challenges</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="project_pain_documentation"
                        name="project_pain_points"
                        value="poor_documentation"
                        checked={formData.project_pain_points.includes('poor_documentation')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="project_pain_documentation" className="text-black font-medium">Poor documentation</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="project_pain_client"
                        name="project_pain_points"
                        value="client_updates"
                        checked={formData.project_pain_points.includes('client_updates')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="project_pain_client" className="text-black font-medium">Client status updates</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevSection}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-black"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextSection}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderMoreChallengesSection = () => {
    return (
      <div className={`space-y-6 ${currentSection === 4 ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-semibold mb-4 text-black">More Business Challenges</h2>
        <p className="text-black mb-4">Continue rating each area:</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black">
              Client Relationship Management
            </label>
            <RatingScale 
              name="crm_challenge"
              value={formData.challenges.crm_challenge}
              onChange={handleRatingSelect}
            />
            <p className="mt-1 text-xs text-black">
              Consider how well you track client interactions and maintain strong relationships.
            </p>
            
            {/* CRM follow-up questions */}
            {formData.challenges.crm_challenge >= 4 && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <p className="font-semibold mb-3 text-black">We noticed this is a significant challenge area. A few more details will help us craft the right solution:</p>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-black mb-1">
                    What are your biggest challenges with client relationship management?
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="crm_pain_tracking"
                        name="crm_pain_points"
                        value="interaction_tracking"
                        checked={formData.crm_pain_points.includes('interaction_tracking')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="crm_pain_tracking" className="text-black font-medium">Tracking client interactions</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="crm_pain_history"
                        name="crm_pain_points"
                        value="history_access"
                        checked={formData.crm_pain_points.includes('history_access')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="crm_pain_history" className="text-black font-medium">Accessing client history</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="crm_pain_follow_up"
                        name="crm_pain_points"
                        value="follow_up"
                        checked={formData.crm_pain_points.includes('follow_up')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="crm_pain_follow_up" className="text-black font-medium">Timely follow-ups</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="crm_pain_insights"
                        name="crm_pain_points"
                        value="client_insights"
                        checked={formData.crm_pain_points.includes('client_insights')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="crm_pain_insights" className="text-black font-medium">Getting client insights</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black">
              Analytics & Reporting
            </label>
            <RatingScale 
              name="reporting_challenge"
              value={formData.challenges.reporting_challenge}
              onChange={handleRatingSelect}
            />
            <p className="mt-1 text-xs text-gray-500">
              Consider how difficult it is to compile reports and get meaningful insights.
            </p>
            
            {/* Reporting follow-up questions */}
            {formData.challenges.reporting_challenge >= 4 && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <p className="font-semibold mb-3 text-black">We noticed this is a significant challenge area. A few more details will help us craft the right solution:</p>
                
                <div className="mb-3">
                  <label htmlFor="report_tool_spreadsheets" className="block text-sm font-medium text-black mb-1">
                    What reporting tools do you currently use? (Select all that apply)
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="report_tool_spreadsheets"
                        name="reporting_tools"
                        value="spreadsheets"
                        checked={formData.reporting_tools.includes('spreadsheets')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="report_tool_spreadsheets" className="text-black font-medium">Spreadsheets</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="report_tool_dashboards"
                        name="reporting_tools"
                        value="dashboards"
                        checked={formData.reporting_tools.includes('dashboards')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="report_tool_dashboards" className="text-black font-medium">Built-in dashboards</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="report_tool_bi"
                        name="reporting_tools"
                        value="bi_tools"
                        checked={formData.reporting_tools.includes('bi_tools')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="report_tool_bi" className="text-black font-medium">Business intelligence tools</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="report_tool_manual"
                        name="reporting_tools"
                        value="manual"
                        checked={formData.reporting_tools.includes('manual')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="report_tool_manual" className="text-black font-medium">Manual methods</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black">
              Client Communication
            </label>
            <RatingScale 
              name="communication_challenge"
              value={formData.challenges.communication_challenge}
              onChange={handleRatingSelect}
            />
            <p className="mt-1 text-xs text-gray-500">
              Consider how effectively you communicate updates and milestones to clients.
            </p>
            
            {/* Communication follow-up questions */}
            {formData.challenges.communication_challenge >= 4 && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <p className="font-semibold mb-3 text-black">We noticed this is a significant challenge area. A few more details will help us craft the right solution:</p>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-black mb-1">
                    Which communication channels do you typically use with clients? (Select all that apply)
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_channel_email"
                        name="communication_channels"
                        value="email"
                        checked={formData.communication_channels.includes('email')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_channel_email" className="text-black font-medium">Email</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_channel_phone"
                        name="communication_channels"
                        value="phone"
                        checked={formData.communication_channels.includes('phone')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_channel_phone" className="text-black font-medium">Phone calls</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_channel_meetings"
                        name="communication_channels"
                        value="meetings"
                        checked={formData.communication_channels.includes('meetings')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_channel_meetings" className="text-black font-medium">Video/in-person meetings</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_channel_portal"
                        name="communication_channels"
                        value="client_portal"
                        checked={formData.communication_channels.includes('client_portal')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_channel_portal" className="text-black">Client portal</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_channel_chat"
                        name="communication_channels"
                        value="chat"
                        checked={formData.communication_channels.includes('chat')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_channel_chat" className="text-black">Chat/messaging platforms</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_channel_pm"
                        name="communication_channels"
                        value="pm_tools"
                        checked={formData.communication_channels.includes('pm_tools')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_channel_pm" className="text-black">Project management tools</label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="communication_frequency" className="block text-sm font-medium text-black mb-1">
                    How frequently do you typically communicate with clients during projects?
                  </label>
                  <select
                    id="communication_frequency"
                    name="communication_frequency"
                    value={formData.communication_frequency}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="daily">Daily</option>
                    <option value="several_week">Several times a week</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="as_needed">As needed/no regular schedule</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    What are your biggest client communication pain points? (Select all that apply)
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_pain_consistency"
                        name="communication_pain_points"
                        value="inconsistent"
                        checked={formData.communication_pain_points.includes('inconsistent')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_pain_consistency" className="text-black font-medium">Inconsistent communication</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_pain_delays"
                        name="communication_pain_points"
                        value="delayed_responses"
                        checked={formData.communication_pain_points.includes('delayed_responses')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_pain_delays" className="text-black font-medium">Delayed responses</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_pain_clarity"
                        name="communication_pain_points"
                        value="clarity_issues"
                        checked={formData.communication_pain_points.includes('clarity_issues')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_pain_clarity" className="text-black font-medium">Unclear or confusing communications</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_pain_expectation"
                        name="communication_pain_points"
                        value="expectation_mismatch"
                        checked={formData.communication_pain_points.includes('expectation_mismatch')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_pain_expectation" className="text-black font-medium">Expectation mismatches</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_pain_tracking"
                        name="communication_pain_points"
                        value="tracking_issues"
                        checked={formData.communication_pain_points.includes('tracking_issues')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_pain_tracking" className="text-black font-medium">Difficulty tracking conversation history</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="comm_pain_time"
                        name="communication_pain_points"
                        value="time_consuming"
                        checked={formData.communication_pain_points.includes('time_consuming')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="comm_pain_time" className="text-black font-medium">Time-consuming updates</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black">
              Internal Workflow Efficiency
            </label>
            <RatingScale 
              name="workflow_challenge"
              value={formData.challenges.workflow_challenge}
              onChange={handleRatingSelect}
            />
            <p className="mt-1 text-xs text-gray-500">
              Consider how many manual processes or redundancies exist in your operations.
            </p>
            
            {/* Workflow follow-up questions */}
            {formData.challenges.workflow_challenge >= 4 && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <p className="font-semibold mb-3 text-black">We noticed this is a significant challenge area. A few more details will help us craft the right solution:</p>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-black mb-1">
                    Where are your biggest workflow bottlenecks? (Select all that apply)
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="workflow_bottleneck_approvals"
                        name="workflow_bottlenecks"
                        value="approvals"
                        checked={formData.workflow_bottlenecks.includes('approvals')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="workflow_bottleneck_approvals" className="text-black font-medium">Approval processes</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="workflow_bottleneck_handoffs"
                        name="workflow_bottlenecks"
                        value="handoffs"
                        checked={formData.workflow_bottlenecks.includes('handoffs')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="workflow_bottleneck_handoffs" className="text-black font-medium">Team/department handoffs</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="workflow_bottleneck_data"
                        name="workflow_bottlenecks"
                        value="data_entry"
                        checked={formData.workflow_bottlenecks.includes('data_entry')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="workflow_bottleneck_data" className="text-black font-medium">Manual data entry</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="workflow_bottleneck_docs"
                        name="workflow_bottlenecks"
                        value="document_management"
                        checked={formData.workflow_bottlenecks.includes('document_management')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="workflow_bottleneck_docs" className="text-black font-medium">Document management</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="workflow_bottleneck_communication"
                        name="workflow_bottlenecks"
                        value="internal_communication"
                        checked={formData.workflow_bottlenecks.includes('internal_communication')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="workflow_bottleneck_communication" className="text-black font-medium">Internal communication</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="workflow_bottleneck_duplication"
                        name="workflow_bottlenecks"
                        value="duplicate_effort"
                        checked={formData.workflow_bottlenecks.includes('duplicate_effort')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="workflow_bottleneck_duplication" className="text-black">Duplicate effort</label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-black mb-1">
                    Which areas of your business would benefit most from automation? (Select all that apply)
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="automation_data"
                        name="workflow_automation_areas"
                        value="data_transfer"
                        checked={formData.workflow_automation_areas.includes('data_transfer')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="automation_data" className="text-black">Data transfer between systems</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="automation_reminders"
                        name="workflow_automation_areas"
                        value="reminders_followups"
                        checked={formData.workflow_automation_areas.includes('reminders_followups')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="automation_reminders" className="text-black">Reminders and follow-ups</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="automation_documents"
                        name="workflow_automation_areas"
                        value="document_generation"
                        checked={formData.workflow_automation_areas.includes('document_generation')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="automation_documents" className="text-black">Document generation</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="automation_reporting"
                        name="workflow_automation_areas"
                        value="reporting"
                        checked={formData.workflow_automation_areas.includes('reporting')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="automation_reporting" className="text-black">Reporting</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="automation_approvals"
                        name="workflow_automation_areas"
                        value="approval_flows"
                        checked={formData.workflow_automation_areas.includes('approval_flows')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="automation_approvals" className="text-black">Approval workflows</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="automation_scheduling"
                        name="workflow_automation_areas"
                        value="scheduling"
                        checked={formData.workflow_automation_areas.includes('scheduling')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="automation_scheduling" className="text-black">Scheduling</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    What collaboration tools do you currently use? (Select all that apply)
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="collab_shared_docs"
                        name="workflow_collaboration_tools"
                        value="shared_docs"
                        checked={formData.workflow_collaboration_tools.includes('shared_docs')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="collab_shared_docs" className="text-black">Shared documents (Google Docs, Office 365)</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="collab_project"
                        name="workflow_collaboration_tools"
                        value="project_management"
                        checked={formData.workflow_collaboration_tools.includes('project_management')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="collab_project" className="text-black">Project management tools</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="collab_chat"
                        name="workflow_collaboration_tools"
                        value="chat_platforms"
                        checked={formData.workflow_collaboration_tools.includes('chat_platforms')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="collab_chat" className="text-black">Chat platforms (Slack, Teams)</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="collab_video"
                        name="workflow_collaboration_tools"
                        value="video_conferencing"
                        checked={formData.workflow_collaboration_tools.includes('video_conferencing')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="collab_video" className="text-black">Video conferencing tools</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="collab_email"
                        name="workflow_collaboration_tools"
                        value="email_only"
                        checked={formData.workflow_collaboration_tools.includes('email_only')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="collab_email" className="text-black">Email only</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="collab_none"
                        name="workflow_collaboration_tools"
                        value="no_tools"
                        checked={formData.workflow_collaboration_tools.includes('no_tools')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="collab_none" className="text-black">No formal collaboration tools</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black">
              Talent/HR Management
            </label>
            <RatingScale 
              name="hr_challenge"
              value={formData.challenges.hr_challenge}
              onChange={handleRatingSelect}
            />
            <p className="mt-1 text-xs text-gray-500">
              Consider your recruiting, onboarding, and employee management processes.
            </p>
            
            {/* HR follow-up questions */}
            {formData.challenges.hr_challenge >= 4 && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <p className="font-semibold mb-3 text-black">We noticed this is a significant challenge area. A few more details will help us craft the right solution:</p>
                
                <div className="mb-3">
                  <label htmlFor="hr_team_size" className="block text-sm font-medium text-black mb-1">
                    What is the size of your HR team?
                  </label>
                  <select
                    id="hr_team_size"
                    name="hr_team_size"
                    value={formData.hr_team_size}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="no_dedicated">No dedicated HR staff</option>
                    <option value="part_time">Part-time HR (1 person)</option>
                    <option value="one_person">One full-time HR person</option>
                    <option value="small_team">Small team (2-5 people)</option>
                    <option value="medium_team">Medium team (6-15 people)</option>
                    <option value="large_team">Large team (15+ people)</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-black mb-1">
                    What are your biggest HR challenges? (Select all that apply)
                  </label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hr_pain_recruiting"
                        name="hr_pain_points"
                        value="recruiting"
                        checked={formData.hr_pain_points.includes('recruiting')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="hr_pain_recruiting" className="text-black">Recruiting/talent acquisition</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hr_pain_onboarding"
                        name="hr_pain_points"
                        value="onboarding"
                        checked={formData.hr_pain_points.includes('onboarding')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="hr_pain_onboarding" className="text-black">Employee onboarding</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hr_pain_documentation"
                        name="hr_pain_points"
                        value="documentation"
                        checked={formData.hr_pain_points.includes('documentation')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="hr_pain_documentation" className="text-black">HR documentation/paperwork</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hr_pain_time"
                        name="hr_pain_points"
                        value="time_tracking"
                        checked={formData.hr_pain_points.includes('time_tracking')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="hr_pain_time" className="text-black">Time tracking/attendance</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hr_pain_benefits"
                        name="hr_pain_points"
                        value="benefits_admin"
                        checked={formData.hr_pain_points.includes('benefits_admin')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="hr_pain_benefits" className="text-black">Benefits administration</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hr_pain_performance"
                        name="hr_pain_points"
                        value="performance_mgmt"
                        checked={formData.hr_pain_points.includes('performance_mgmt')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="hr_pain_performance" className="text-black">Performance management</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hr_pain_compliance"
                        name="hr_pain_points"
                        value="compliance"
                        checked={formData.hr_pain_points.includes('compliance')}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="hr_pain_compliance" className="text-black">Compliance/regulations</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="hr_hiring_volume" className="block text-sm font-medium text-black mb-1">
                    How many new employees do you typically hire in a year?
                  </label>
                  <select
                    id="hr_hiring_volume"
                    name="hr_hiring_volume"
                    value={formData.hr_hiring_volume}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="">Please select</option>
                    <option value="1-5">1-5 employees</option>
                    <option value="6-20">6-20 employees</option>
                    <option value="21-50">21-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="over_100">Over 100 employees</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevSection}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-black"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextSection}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderCurrentSystemsSection = () => {
    return (
      <div className={`space-y-6 ${currentSection === 5 ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-semibold mb-4 text-black">Current Systems & Software</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Which software or tools do you currently use? (Select all that apply)
            </label>
            <div className="space-y-2 mt-1">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="software_crm"
                  name="software"
                  value="crm"
                  checked={formData.software.includes('crm')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="software_crm" className="text-black">CRM (Salesforce, HubSpot, etc.)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="software_accounting"
                  name="software"
                  value="accounting"
                  checked={formData.software.includes('accounting')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="software_accounting" className="text-black">Accounting Software (QuickBooks, Xero, etc.)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="software_project"
                  name="software"
                  value="project"
                  checked={formData.software.includes('project')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="software_project" className="text-black">Project Management (Asana, Monday, Trello, etc.)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="software_communication"
                  name="software"
                  value="communication"
                  checked={formData.software.includes('communication')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="software_communication" className="text-black">Communication Tools (Slack, Teams, etc.)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="software_marketing"
                  name="software"
                  value="marketing"
                  checked={formData.software.includes('marketing')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="software_marketing" className="text-black">Marketing Automation (Mailchimp, Marketo, etc.)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="software_hr"
                  name="software"
                  value="hr"
                  checked={formData.software.includes('hr')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="software_hr" className="text-black">HR Software (BambooHR, Workday, etc.)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="software_erp"
                  name="software"
                  value="erp"
                  checked={formData.software.includes('erp')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="software_erp" className="text-black">ERP Systems (SAP, Oracle, NetSuite, etc.)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="software_documents"
                  name="software"
                  value="documents"
                  checked={formData.software.includes('documents')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="software_documents" className="text-black">Document Management (DocuSign, etc.)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="software_spreadsheets"
                  name="software"
                  value="spreadsheets"
                  checked={formData.software.includes('spreadsheets')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="software_spreadsheets" className="text-black">Spreadsheets & Documents (Excel, Google Sheets, etc.)</label>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="other_software" className="block text-sm font-medium text-black mb-1">
              Other software or tools not listed above:
            </label>
            <textarea
              id="other_software"
              name="other_software"
              value={formData.other_software}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              Please list any custom or industry-specific tools you use.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              How would you rate your current level of automation?
            </label>
            <div className="flex justify-between items-center mt-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button 
                  key={rating}
                  type="button"
                  onClick={() => setFormData({...formData, automation_level: String(rating)})}
                  className={`w-16 h-16 rounded-full flex flex-col items-center justify-center mb-1 text-black border focus:outline-none ${
                    formData.automation_level === String(rating) 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-gray-100 text-black border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg font-semibold">{rating}</span>
                  <span className="text-xs mt-1">
                    {rating === 1 && 'Manual'}
                    {rating === 2 && 'Basic'}
                    {rating === 3 && 'Moderate'}
                    {rating === 4 && 'Significant'}
                    {rating === 5 && 'Highly'}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="integration_challenges" className="block text-sm font-medium text-black mb-1">
              What are your biggest challenges with integrating your current systems?
            </label>
            <textarea
              id="integration_challenges"
              name="integration_challenges"
              value={formData.integration_challenges}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              For example: data syncing issues, manual data transfer, duplicate entries, etc.
            </p>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevSection}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-black"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextSection}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  const renderPrioritiesSection = () => {
    return (
      <div className={`space-y-6 ${currentSection === 6 ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-semibold mb-4 text-black">Priority Improvement Areas</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Which areas would you most like to improve with automation? (Select top 3)
            </label>
            <div className="space-y-2 mt-1">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority_financial"
                  name="priorities"
                  value="financial_processing"
                  checked={formData.priorities.includes('financial_processing')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="priority_financial" className="text-black">Financial Processing & Contract Administration</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority_onboarding"
                  name="priorities"
                  value="client_onboarding"
                  checked={formData.priorities.includes('client_onboarding')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="priority_onboarding" className="text-black">Client Onboarding & Integration</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority_revenue"
                  name="priorities"
                  value="revenue_optimization"
                  checked={formData.priorities.includes('revenue_optimization')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="priority_revenue" className="text-black">Revenue Pipeline Optimization</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority_proposal"
                  name="priorities"
                  value="proposal_development"
                  checked={formData.priorities.includes('proposal_development')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="priority_proposal" className="text-black">Strategic Proposal Development</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority_talent"
                  name="priorities"
                  value="talent_acquisition"
                  checked={formData.priorities.includes('talent_acquisition')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="priority_talent" className="text-black">Talent Acquisition & Orientation</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority_project"
                  name="priorities"
                  value="project_management"
                  checked={formData.priorities.includes('project_management')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="priority_project" className="text-black">Project Lifecycle Management</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority_crm"
                  name="priorities"
                  value="client_relationship"
                  checked={formData.priorities.includes('client_relationship')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="priority_crm" className="text-black">Client Relationship Management</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority_analytics"
                  name="priorities"
                  value="performance_analytics"
                  checked={formData.priorities.includes('performance_analytics')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="priority_analytics" className="text-black">Performance Analytics & Reporting</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority_communication"
                  name="priorities"
                  value="client_communication"
                  checked={formData.priorities.includes('client_communication')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="priority_communication" className="text-black">Client Communication Systems</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority_workflow"
                  name="priorities"
                  value="workflow_enhancement"
                  checked={formData.priorities.includes('workflow_enhancement')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="priority_workflow" className="text-black">Operational Workflow Enhancement</label>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Choose the areas that would have the biggest positive impact on your business.
            </p>
            {errors.priorities && (
              <p className="mt-1 text-sm text-red-600">{errors.priorities}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="specific_pain" className="block text-sm font-medium text-black mb-1">
              What specific pain point or manual process takes up the most time in your business?
            </label>
            <textarea
              id="specific_pain"
              name="specific_pain"
              value={formData.specific_pain}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              The more specific you can be, the better we can target our solutions.
            </p>
          </div>
          
          <div>
            <label htmlFor="success_criteria" className="block text-sm font-medium text-black mb-1">
              How would you measure success in an automation project? What specific metrics or outcomes are you hoping to achieve?
            </label>
            <textarea
              id="success_criteria"
              name="success_criteria"
              value={formData.success_criteria}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              Example: "Reduce proposal creation time from 3 days to 1 day" or "Eliminate manual data entry errors"
            </p>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevSection}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-black"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextSection}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  const renderFinalQuestionsSection = () => {
    return (
      <div className={`space-y-6 ${currentSection === 7 ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-semibold mb-4 text-black">Final Questions</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Have you tried implementing automation solutions before?
            </label>
            <div className="flex space-x-4 mt-1">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="previous_yes"
                  name="previous_automation"
                  value="yes"
                  checked={formData.previous_automation === 'yes'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="previous_yes" className="text-black">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="previous_no"
                  name="previous_automation"
                  value="no"
                  checked={formData.previous_automation === 'no'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="previous_no" className="text-black">No</label>
              </div>
            </div>
          </div>
          
          {showPreviousExperience && (
            <div>
              <label htmlFor="previous_experience" className="block text-sm font-medium text-black mb-1">
                What was your experience with previous automation attempts?
              </label>
              <textarea
                id="previous_experience"
                name="previous_experience"
                value={formData.previous_experience}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">
                Let us know what worked well and what challenges you faced.
              </p>
            </div>
          )}
          
          <div>
            <label htmlFor="decision_timeline" className="block text-sm font-medium text-black mb-1">
              How soon would you like to start saving time and money with automation?
            </label>
            <select
              id="decision_timeline"
              name="decision_timeline"
              value={formData.decision_timeline}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Select your ideal start date</option>
              <option value="immediate">As soon as possible - ready to transform my business now</option>
              <option value="near_term">Within the next 30 days - eager to see quick results</option>
              <option value="medium_term">Next quarter - planning ahead for upcoming projects</option>
              <option value="exploring">Still researching, but interested in moving forward soon</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Businesses that implement automation sooner typically see ROI within weeks, not months.
            </p>
          </div>
          
          <div>
            <label htmlFor="additional_info" className="block text-sm font-medium text-black mb-1">
              Is there anything else you'd like us to know?
            </label>
            <textarea
              id="additional_info"
              name="additional_info"
              value={formData.additional_info}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            ></textarea>
          </div>
          
          <div className="pt-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="consent" className="font-medium text-black">
                  I consent to having my information processed to receive business solutions recommendations.
                </label>
                <p className="text-black">We respect your privacy and will protect your information.</p>
                {errors.consent && (
                  <p className="mt-1 text-sm text-red-600">{errors.consent}</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="consultation"
                  name="consultation_requested"
                  type="checkbox"
                  checked={formData.consultation_requested}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="consultation" className="font-medium text-black">
                  I'm interested in booking a FREE 30-minute strategy session to discuss automation opportunities for my business.
                </label>
              </div>
            </div>
          </div>
          
          {errors.submit && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
              <p className="text-red-700">{errors.submit}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevSection}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-black"
          >
            Previous
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
          </button>
        </div>
      </div>
    );
  };
  
  const renderThankYouSection = () => {
    return (
      <div className={`py-16 text-center ${submitSuccess ? 'block' : 'hidden'}`}>
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg 
            className="h-6 w-6 text-green-600" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-6 text-2xl font-bold">Thank You for Completing the Assessment!</h2>
        <p className="mt-4 text-black">
          {isAuthenticated 
            ? 'Update Assessment'
            : 'Assessment saved successfully!'}
        </p>
        <p className="mt-2 text-black">
          {formData.consultation_requested && !isAuthenticated
            ? 'Thank you for your submission! We will contact you shortly.'
            : ''}
        </p>
        
        {isAuthenticated && (
          <div className="mt-8">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={() => router.push('/assessments')}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress bar */}
      {!submitSuccess && (
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-black">
            <div>Business Assessment</div>
            <div>{Math.round(progress)}% Complete</div>
          </div>
        </div>
      )}
      
      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {renderContactSection()}
        {renderBusinessSection()}
        {renderChallengesSection()}
        {renderMoreChallengesSection()}
        {renderCurrentSystemsSection()}
        {renderPrioritiesSection()}
        {renderFinalQuestionsSection()}
        {renderThankYouSection()}
      </form>
    </div>
  );
};

export default BusinessAssessmentForm; 