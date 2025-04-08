'use server';

import { createClient } from '@/utils/supabase/server';
import { isValidEmail, isValidPhone } from '@/utils/utils';
import { revalidatePath } from 'next/cache';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  // Additional fields from the form
  [key: string]: any;
};

/**
 * Server action to submit the business assessment form data to Supabase
 */
export async function submitBusinessAssessment(formData: FormData) {
  // Validate required fields
  if (!formData.fullName || !formData.email || !formData.company) {
    return {
      success: false,
      error: 'Missing required fields'
    };
  }

  // Validate email format
  if (!isValidEmail(formData.email)) {
    return {
      success: false,
      error: 'Invalid email address'
    };
  }

  // Validate phone format if provided
  if (formData.phone && !isValidPhone(formData.phone)) {
    return {
      success: false,
      error: 'Invalid phone number'
    };
  }

  try {
    // Map form data to match the Supabase table schema
    const submissionData = {
      contact_name: formData.fullName,
      contact_email: formData.email,
      contact_phone: formData.phone,
      company_name: formData.company,
      company_size: formData.employees,
      industry: formData.industry,
      current_challenges: formData.automation_areas || [],
      automation_interest: formData.goals || [],
      current_tools: formData.existing_systems || [],
      budget_range: formData.budget_range,
      timeline: formData.automation_timeline,
      goals: formData.specific_challenges,
      additional_info: formData.additional_comments,
      // Add any other fields needed
    };

    const supabase = createClient();
    const { error } = await supabase
      .from('business_assessments')
      .insert([submissionData]);

    if (error) {
      console.error('Error submitting assessment:', error);
      return {
        success: false,
        error: 'Failed to submit assessment'
      };
    }

    // Revalidate the path to update any data displayed on the page
    revalidatePath('/assessment');

    return {
      success: true
    };
  } catch (error) {
    console.error('Error in submitBusinessAssessment:', error);
    return {
      success: false,
      error: 'An unexpected error occurred'
    };
  }
} 