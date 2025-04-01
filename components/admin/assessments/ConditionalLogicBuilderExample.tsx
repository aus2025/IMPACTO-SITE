'use client';

import { useState } from 'react';
import ConditionalLogicBuilder from './ConditionalLogicBuilder';

// Import types from the ConditionalLogicBuilder
type QuestionType = 'text' | 'select' | 'multiselect' | 'boolean';

interface Question {
  id: string;
  label: string;
  type: QuestionType;
  options?: string[];
}

// Rule structure matching the one in ConditionalLogicBuilder
interface Condition {
  id: string;
  questionId: string;
  operator: string;
  value: string | string[] | boolean;
}

interface Rule {
  id: string;
  conditions: Condition[];
  operator: 'AND' | 'OR';
  action: 'show' | 'hide';
  targetQuestionId: string;
}

export default function ConditionalLogicBuilderExample() {
  // Sample questions representing fields from BusinessAssessmentForm
  const sampleQuestions: Question[] = [
    // Contact info
    { id: 'fullName', label: 'Full Name', type: 'text' },
    { id: 'email', label: 'Email Address', type: 'text' },
    { id: 'phone', label: 'Phone Number', type: 'text' },
    { id: 'company', label: 'Company Name', type: 'text' },
    { id: 'role', label: 'Your Role', type: 'select', options: ['CEO', 'CTO', 'Manager', 'Director', 'Other'] },
    
    // Business info
    { id: 'industry', label: 'Industry', type: 'select', options: [
      'Healthcare', 'Manufacturing', 'Retail', 'Technology', 'Finance', 'Education', 'Other'
    ] },
    { id: 'employees', label: 'Number of Employees', type: 'select', options: [
      '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
    ] },
    { id: 'goals', label: 'Business Goals', type: 'multiselect', options: [
      'Increase Efficiency', 'Reduce Costs', 'Improve Customer Experience', 
      'Increase Revenue', 'Scale Operations', 'Compliance'
    ] },
    { id: 'patient_data', label: 'Handle Patient Data', type: 'select', options: ['Yes', 'No'] },
    { id: 'sales_channels', label: 'Sales Channels', type: 'multiselect', options: [
      'E-commerce', 'Retail Stores', 'Wholesale', 'Direct Sales', 'Marketplaces'
    ] },
    
    // Automation areas
    { id: 'automation_areas', label: 'Automation Areas', type: 'multiselect', options: [
      'Document Processing', 'Customer Service', 'Sales', 'Accounting', 
      'Inventory Management', 'HR'
    ] },
    { id: 'document_types', label: 'Document Types', type: 'multiselect', options: [
      'Invoices', 'Purchase Orders', 'Contracts', 'Receipts', 'Medical Records'
    ] },
    { id: 'automation_experience', label: 'Automation Experience', type: 'select', options: [
      'None', 'Limited', 'Moderate', 'Advanced'
    ] },
    
    // Budget
    { id: 'budget_range', label: 'Budget Range', type: 'select', options: [
      'Under $10,000', '$10,000-$50,000', '$50,000-$100,000', '$100,000-$250,000', '$250,000+'
    ] },
    { id: 'decision_timeline', label: 'Decision Timeline', type: 'select', options: [
      'Immediately', '1-3 months', '3-6 months', '6-12 months', '12+ months'
    ] },
    
    // Consent
    { id: 'consent_marketing', label: 'Marketing Consent', type: 'boolean' },
    { id: 'consent_terms', label: 'Terms Agreement', type: 'boolean' }
  ];
  
  // State to store the rules
  const [rules, setRules] = useState<Rule[]>([]);
  
  // Handle rules change
  const handleRulesChange = (newRules: Rule[]) => {
    setRules(newRules);
    console.log('Updated rules:', JSON.stringify(newRules, null, 2));
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Form Conditional Logic Builder</h1>
      
      <p className="mb-4 text-gray-600">
        Create logic rules to control when questions appear or hide based on answers to other questions.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <ConditionalLogicBuilder
          questions={sampleQuestions}
          onChange={handleRulesChange}
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Generated Logic (JSON)</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
          {JSON.stringify(rules, null, 2)}
        </pre>
      </div>
    </div>
  );
} 