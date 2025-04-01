'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  
  // Budget & Investment
  budget_range: string;
  funding_source: string;
  decision_timeline: string;
  investment_factors: string[];
  expected_roi: string;
  previous_investments: string;
  budget_constraints: string;
  
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
  form_name?: string;
  is_active?: boolean;
};

// Step information
const steps = [
  { id: 1, title: 'Contact Info' },
  { id: 2, title: 'Business Info' },
  { id: 3, title: 'Automation Needs' },
  { id: 4, title: 'Budget' },
  { id: 5, title: 'Additional Info' }
];

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
    
    automation_areas: [],
    document_types: [],
    document_volume: '',
    cs_channels: [],
    cs_ticket_volume: '',
    automation_experience: '',
    existing_systems: [],
    specific_challenges: '',
    automation_timeline: '',
    
    budget_range: '',
    funding_source: '',
    decision_timeline: '',
    investment_factors: [],
    expected_roi: '',
    previous_investments: '',
    budget_constraints: '',
    
    referral_source: '',
    consultation_preference: '',
    additional_stakeholders: [],
    preferred_timeline: '',
    additional_comments: '',
    consent_marketing: false,
    consent_terms: false,
    
    // Admin specific fields
    form_name: 'Business Automation Assessment',
    is_active: true,
  });
  
  // Current step
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  
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
  
  // Validation functions
  const validateFormName = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.form_name) {
      errors.form_name = 'Form name is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Submit handler
  const handleSubmit = async () => {
    if (!validateFormName()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Create a complete template object
      const templateData = {
        name: formData.form_name,
        is_active: formData.is_active,
        created_at: new Date().toISOString(),
        form_schema: {
          steps,
          fields: {
            // Contact info section
            fullName: { 
              label: 'Full Name', 
              type: 'text', 
              required: true, 
              section: 1 
            },
            email: { 
              label: 'Email Address', 
              type: 'email', 
              required: true, 
              section: 1 
            },
            phone: { 
              label: 'Phone Number', 
              type: 'tel', 
              required: true, 
              section: 1 
            },
            company: { 
              label: 'Company Name', 
              type: 'text', 
              required: true, 
              section: 1 
            },
            role: { 
              label: 'Your Role', 
              type: 'select', 
              required: true, 
              section: 1,
              options: [
                { value: 'owner', label: 'Business Owner' },
                { value: 'executive', label: 'Executive/C-Level' },
                { value: 'manager', label: 'Manager' },
                { value: 'director', label: 'Director' },
                { value: 'other', label: 'Other' }
              ]
            },
            
            // Business info section
            industry: { 
              label: 'Industry', 
              type: 'select', 
              required: true, 
              section: 2,
              options: [
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'financial', label: 'Financial Services' },
                { value: 'retail', label: 'Retail & E-commerce' },
                { value: 'manufacturing', label: 'Manufacturing' },
                { value: 'professional_services', label: 'Professional Services' },
                { value: 'education', label: 'Education' },
                { value: 'hospitality', label: 'Hospitality & Tourism' },
                { value: 'construction', label: 'Construction' },
                { value: 'technology', label: 'Technology' },
                { value: 'other', label: 'Other' }
              ]
            },
            employees: { 
              label: 'Number of Employees', 
              type: 'select', 
              required: true, 
              section: 2,
              options: [
                { value: '1-10', label: '1-10 employees' },
                { value: '11-50', label: '11-50 employees' },
                { value: '51-200', label: '51-200 employees' },
                { value: '201-500', label: '201-500 employees' },
                { value: '501-1000', label: '501-1000 employees' },
                { value: '1000+', label: 'More than 1000 employees' }
              ]
            },
            goals: { 
              label: 'Business Goals', 
              type: 'checkbox-group', 
              required: true, 
              section: 2,
              options: [
                { value: 'cost_reduction', label: 'Cost reduction' },
                { value: 'growth', label: 'Business growth' },
                { value: 'efficiency', label: 'Operational efficiency' },
                { value: 'customer_experience', label: 'Improved customer experience' },
                { value: 'competitive_advantage', label: 'Competitive advantage' },
                { value: 'compliance', label: 'Regulatory compliance' },
                { value: 'digital_transformation', label: 'Digital transformation' }
              ]
            },
            compliance_concerns: { 
              label: 'Compliance Concerns', 
              type: 'checkbox-group', 
              required: false, 
              section: 2,
              options: [
                { value: 'hipaa', label: 'HIPAA' },
                { value: 'gdpr', label: 'GDPR' },
                { value: 'ccpa', label: 'CCPA' },
                { value: 'pci', label: 'PCI DSS' },
                { value: 'sox', label: 'Sarbanes-Oxley' },
                { value: 'iso', label: 'ISO 27001' },
                { value: 'other', label: 'Other' }
              ]
            },
            patient_data: { 
              label: 'Patient Data Handling', 
              type: 'select', 
              required: false, 
              section: 2,
              options: [
                { value: 'none', label: 'We don\'t handle patient data' },
                { value: 'limited', label: 'Limited patient data' },
                { value: 'extensive', label: 'Extensive patient data' },
                { value: 'primary', label: 'Primary focus of our business' }
              ]
            },
            inventory_management: { 
              label: 'Inventory Management', 
              type: 'select', 
              required: false, 
              section: 2,
              options: [
                { value: 'none', label: 'We don\'t manage inventory' },
                { value: 'manual', label: 'Manual tracking' },
                { value: 'basic_software', label: 'Basic software solution' },
                { value: 'advanced_software', label: 'Advanced inventory system' },
                { value: 'integrated', label: 'Fully integrated with other systems' }
              ]
            },
            sales_channels: { 
              label: 'Sales Channels', 
              type: 'checkbox-group', 
              required: false, 
              section: 2,
              options: [
                { value: 'in_person', label: 'In-person retail' },
                { value: 'ecommerce', label: 'E-commerce website' },
                { value: 'marketplace', label: 'Online marketplaces' },
                { value: 'wholesale', label: 'Wholesale/B2B' },
                { value: 'phone', label: 'Phone sales' },
                { value: 'partners', label: 'Partner/affiliate sales' }
              ]
            },
            
            // Automation needs section
            automation_areas: { 
              label: 'Areas for Automation', 
              type: 'checkbox-group', 
              required: true, 
              section: 3,
              options: [
                { value: 'document_processing', label: 'Document processing & management' },
                { value: 'customer_service', label: 'Customer service automation' },
                { value: 'accounting', label: 'Accounting & bookkeeping' },
                { value: 'hr', label: 'HR & recruitment' },
                { value: 'inventory', label: 'Inventory management' },
                { value: 'sales', label: 'Sales & marketing' },
                { value: 'data_entry', label: 'Data entry & processing' },
                { value: 'workflow', label: 'General workflow automation' }
              ]
            },
            document_types: { 
              label: 'Document Types', 
              type: 'checkbox-group', 
              required: false, 
              section: 3,
              options: [
                { value: 'invoices', label: 'Invoices' },
                { value: 'receipts', label: 'Receipts' },
                { value: 'contracts', label: 'Contracts' },
                { value: 'forms', label: 'Forms' },
                { value: 'reports', label: 'Reports' },
                { value: 'hr_documents', label: 'HR documents' }
              ]
            },
            document_volume: { 
              label: 'Document Volume', 
              type: 'select', 
              required: false, 
              section: 3,
              options: [
                { value: 'low', label: 'Low (< 100 documents/month)' },
                { value: 'medium', label: 'Medium (100-500 documents/month)' },
                { value: 'high', label: 'High (500-1000 documents/month)' },
                { value: 'very_high', label: 'Very high (1000+ documents/month)' }
              ]
            },
            cs_channels: { 
              label: 'Customer Service Channels', 
              type: 'checkbox-group', 
              required: false, 
              section: 3,
              options: [
                { value: 'email', label: 'Email' },
                { value: 'phone', label: 'Phone' },
                { value: 'chat', label: 'Live chat' },
                { value: 'social', label: 'Social media' },
                { value: 'ticketing', label: 'Ticketing system' }
              ]
            },
            automation_experience: { 
              label: 'Current Automation Experience', 
              type: 'select', 
              required: true, 
              section: 3,
              options: [
                { value: 'none', label: 'No automation in place' },
                { value: 'basic', label: 'Basic automation (email, simple workflows)' },
                { value: 'moderate', label: 'Moderate automation (some processes automated)' },
                { value: 'advanced', label: 'Advanced automation (multiple integrated systems)' }
              ]
            },
            existing_systems: { 
              label: 'Existing Systems', 
              type: 'checkbox-group', 
              required: false, 
              section: 3,
              options: [
                { value: 'crm', label: 'CRM (Customer Relationship Management)' },
                { value: 'erp', label: 'ERP (Enterprise Resource Planning)' },
                { value: 'accounting', label: 'Accounting Software' },
                { value: 'hrms', label: 'HR Management System' },
                { value: 'ecommerce', label: 'E-commerce Platform' },
                { value: 'pos', label: 'Point of Sale (POS)' },
                { value: 'project', label: 'Project Management' }
              ]
            },
            automation_timeline: { 
              label: 'Implementation Timeline', 
              type: 'select', 
              required: true, 
              section: 3,
              options: [
                { value: 'immediate', label: 'As soon as possible' },
                { value: '3months', label: 'Within 3 months' },
                { value: '6months', label: 'Within 6 months' },
                { value: '12months', label: 'Within 12 months' },
                { value: 'exploring', label: 'Just exploring options for now' }
              ]
            },
            
            // Budget & Investment section
            budget_range: { 
              label: 'Budget Range', 
              type: 'select', 
              required: true, 
              section: 4,
              options: [
                { value: 'under5k', label: 'Under $5,000' },
                { value: '5k-15k', label: '$5,000 - $15,000' },
                { value: '15k-50k', label: '$15,000 - $50,000' },
                { value: '50k-100k', label: '$50,000 - $100,000' },
                { value: '100k+', label: 'Over $100,000' },
                { value: 'undecided', label: 'Not yet determined' }
              ]
            },
            funding_source: { 
              label: 'Funding Source', 
              type: 'select', 
              required: false, 
              section: 4,
              options: [
                { value: 'operating_budget', label: 'Operating budget' },
                { value: 'capital_budget', label: 'Capital budget' },
                { value: 'special_allocation', label: 'Special project allocation' },
                { value: 'external_funding', label: 'External funding/investment' },
                { value: 'undecided', label: 'Not yet determined' }
              ]
            },
            decision_timeline: { 
              label: 'Decision Timeline', 
              type: 'select', 
              required: true, 
              section: 4,
              options: [
                { value: 'immediate', label: 'Ready to decide immediately' },
                { value: '1month', label: 'Within 1 month' },
                { value: '3months', label: 'Within 3 months' },
                { value: '6months', label: 'Within 6 months' },
                { value: 'exploring', label: 'Just exploring options for now' }
              ]
            },
            investment_factors: { 
              label: 'Investment Decision Factors', 
              type: 'checkbox-group', 
              required: false, 
              section: 4,
              options: [
                { value: 'roi', label: 'Return on investment' },
                { value: 'time_savings', label: 'Time savings' },
                { value: 'cost_reduction', label: 'Cost reduction' },
                { value: 'quality_improvement', label: 'Quality improvement' },
                { value: 'competitive_advantage', label: 'Competitive advantage' },
                { value: 'scalability', label: 'Scalability' },
                { value: 'compliance', label: 'Regulatory compliance' }
              ]
            },
            
            // Final section
            referral_source: { 
              label: 'How did you hear about us?', 
              type: 'select', 
              required: false, 
              section: 5,
              options: [
                { value: 'search', label: 'Search engine' },
                { value: 'social', label: 'Social media' },
                { value: 'recommendation', label: 'Recommendation' },
                { value: 'advertisement', label: 'Advertisement' },
                { value: 'event', label: 'Event or conference' },
                { value: 'other', label: 'Other' }
              ]
            },
            consultation_preference: { 
              label: 'Consultation Preference', 
              type: 'select', 
              required: false, 
              section: 5,
              options: [
                { value: 'email', label: 'Email consultation' },
                { value: 'call', label: 'Phone call' },
                { value: 'video', label: 'Video call' },
                { value: 'in_person', label: 'In-person meeting (if available)' }
              ]
            },
            additional_comments: { 
              label: 'Additional Comments', 
              type: 'textarea', 
              required: false, 
              section: 5
            },
            consent_terms: { 
              label: 'Terms and Conditions', 
              type: 'checkbox', 
              required: true, 
              section: 5,
              text: 'I agree to the terms and conditions'
            },
            consent_marketing: { 
              label: 'Marketing Consent', 
              type: 'checkbox', 
              required: false, 
              section: 5,
              text: 'I consent to receiving marketing communications'
            }
          }
        }
      };
      
      console.log('Creating exportable template');
      
      // Convert to a downloadable JSON
      const jsonString = JSON.stringify(templateData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create filename
      const filename = `business-assessment-template-${(formData.form_name || 'untitled').toLowerCase().replace(/\s+/g, '-')}.json`;
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Also save to localStorage as a backup
      try {
        // Get existing templates or initialize empty array
        const existingTemplates = JSON.parse(localStorage.getItem('businessAssessmentTemplates') || '[]');
        
        // Add new template
        existingTemplates.push(templateData);
        
        // Save back to localStorage
        localStorage.setItem('businessAssessmentTemplates', JSON.stringify(existingTemplates));
        
        console.log('Template also saved to localStorage');
      } catch (localStorageError) {
        console.warn('Could not save to localStorage:', localStorageError);
      }
      
      // Set success state
      setSubmitSuccess(true);
    } catch (error: any) {
      console.error('Error creating template:', error);
      setSubmitError(`There was an error creating the template: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (submitSuccess) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <div className="text-center py-10">
            <div className="text-green-500 text-6xl mb-6">✓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Template Downloaded Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your Business Assessment Form template has been saved as a JSON file and downloaded to your computer.
              A backup copy has also been saved in your browser's localStorage.
            </p>
            <div className="mt-6">
              <Button 
                onClick={() => window.location.href = '/admin/assessments/forms'}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Back to Forms
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Standard Business Assessment Template</h1>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="form_name" className="required">Template Name</Label>
              <Input
                id="form_name"
                name="form_name"
                value={formData.form_name}
                onChange={handleInputChange}
                className={`mt-1 ${validationErrors.form_name ? 'border-red-500' : ''}`}
              />
              {validationErrors.form_name && (
                <div className="text-red-500 text-sm mt-1">{validationErrors.form_name}</div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox 
                id="is_active" 
                checked={formData.is_active} 
                onCheckedChange={(checked) => handleCheckboxSingleChange('is_active', checked === true)}
              />
              <Label htmlFor="is_active" className="font-medium">Active Template</Label>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Template Structure Preview</h2>
            <p className="text-gray-600 mb-4">This standard template includes the following sections:</p>
            
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.id} className="border rounded-md p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    {step.id}. {step.title}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {step.id === 1 && "Contact information fields including name, email, phone, company, and role."}
                    {step.id === 2 && "Business information including industry, size, goals, compliance needs, and operational details."}
                    {step.id === 3 && "Automation needs assessment including areas for automation, current experience, and timeline."}
                    {step.id === 4 && "Budget and investment details including range, timeline, and decision factors."}
                    {step.id === 5 && "Additional information and consent options."}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {submitError && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">
              {submitError}
            </div>
          )}
          
          <div className="flex justify-end pt-6">
            <Button 
              type="button" 
              variant="outline" 
              className="mr-4"
              onClick={() => window.location.href = '/admin/assessments/forms'}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Template'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 