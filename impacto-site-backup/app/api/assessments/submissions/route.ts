import { createClientForApp as createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// Simple no-op ratelimit implementation
const noopRateLimit = {
  limit: async () => ({ success: true, remaining: 10, limit: 10, reset: Date.now() + 60000 }),
  reset: () => {},
};

// Replace actual ratelimit with no-op
const ratelimit = noopRateLimit;

// Helper function to check authorization
async function isAuthorized(supabase: any) {
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }
  
  // Check if user has admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  return profile?.role === 'admin';
}

// Validation functions similar to BusinessAssessmentForm.tsx
function validateContactInformation(data: any) {
  const errors: {[key: string]: string} = {};
  
  if (!data.fullName) errors.fullName = 'Full name is required';
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!data.phone) errors.phone = 'Phone number is required';
  if (!data.company) errors.company = 'Company name is required';
  if (!data.role) errors.role = 'Role is required';
  
  return errors;
}

function validateBusinessInformation(data: any) {
  const errors: {[key: string]: string} = {};
  
  if (!data.industry) errors.industry = 'Industry is required';
  if (!data.employees) errors.employees = 'Number of employees is required';
  if (!data.goals || data.goals.length === 0) errors.goals = 'At least one business goal is required';
  
  return errors;
}

function validateAutomationNeeds(data: any) {
  const errors: {[key: string]: string} = {};
  
  if (!data.automation_areas || data.automation_areas.length === 0) {
    errors.automation_areas = 'At least one automation area is required';
  }
  if (!data.automation_experience) errors.automation_experience = 'Current automation experience is required';
  if (!data.automation_timeline) errors.automation_timeline = 'Implementation timeline is required';
  
  return errors;
}

function validateFormSubmission(data: any, form: any) {
  const errors: {[key: string]: string} = {};
  
  // Check if form exists and has sections
  if (!form || !form.sections || !Array.isArray(form.sections)) {
    return { _form: 'Invalid form structure' };
  }
  
  // Validate each section based on its questions
  form.sections.forEach((section: any) => {
    if (section.questions && Array.isArray(section.questions)) {
      section.questions.forEach((question: any) => {
        const fieldId = question.id;
        
        // Skip validation if not required and value is empty
        if (!question.required && (!data[fieldId] || 
            (Array.isArray(data[fieldId]) && data[fieldId].length === 0))) {
          return;
        }
        
        // Required field validation
        if (question.required) {
          if (data[fieldId] === undefined || data[fieldId] === null || data[fieldId] === '') {
            errors[fieldId] = `${question.label} is required`;
          }
          
          // Array fields (checkboxes, multi-select)
          if (Array.isArray(data[fieldId]) && data[fieldId].length === 0) {
            errors[fieldId] = `Please select at least one option for ${question.label}`;
          }
        }
        
        // Email validation
        if (question.type === 'email' && data[fieldId] && 
            !/\S+@\S+\.\S+/.test(data[fieldId])) {
          errors[fieldId] = 'Please enter a valid email address';
        }
        
        // Phone validation (basic)
        if (question.type === 'phone' && data[fieldId] && 
            !/^[\d\s\+\-\(\)]{7,20}$/.test(data[fieldId])) {
          errors[fieldId] = 'Please enter a valid phone number';
        }
        
        // Number validation
        if (question.type === 'number' && data[fieldId]) {
          const num = Number(data[fieldId]);
          if (isNaN(num)) {
            errors[fieldId] = 'Please enter a valid number';
          }
          if (question.config?.min !== undefined && num < question.config.min) {
            errors[fieldId] = `Value must be at least ${question.config.min}`;
          }
          if (question.config?.max !== undefined && num > question.config.max) {
            errors[fieldId] = `Value must be at most ${question.config.max}`;
          }
        }
      });
    }
  });
  
  // Add consent validation if needed
  if (data.consent_required && !data.consent_terms) {
    errors.consent_terms = 'You must agree to the terms and conditions';
  }
  
  return errors;
}

// GET: List form submissions with filtering
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  
  // Check authorization
  if (!await isAuthorized(supabase)) {
    return NextResponse.json(
      {
        errors: [{
          status: '403',
          title: 'Forbidden',
          detail: 'You do not have permission to access submissions'
        }]
      },
      { status: 403 }
    );
  }
  
  try {
    // Get query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const sortBy = url.searchParams.get('sort') || 'created_at';
    const order = url.searchParams.get('order') || 'desc';
    const formId = url.searchParams.get('form_id');
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    const startDate = url.searchParams.get('start_date');
    const endDate = url.searchParams.get('end_date');
    
    // Calculate pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    // Build the base query
    let query = supabase
      .from('assessment_submissions')
      .select('*, assessment_forms(title)', { count: 'exact' });
    
    // Apply filters
    if (formId) {
      query = query.eq('form_id', formId);
    }
    
    if (status) {
      query = query.eq('status', status);
    }
    
    if (search) {
      // Search in respondent data (email, name) and form data
      query = query.or(`respondent_email.ilike.%${search}%,respondent_name.ilike.%${search}%`);
    }
    
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate);
    }
    
    // Apply sorting
    query = query.order(sortBy, { ascending: order === 'asc' });
    
    // Apply pagination
    query = query.range(from, to);
    
    // Execute the query
    const { data, count, error } = await query;
    
    if (error) {
      throw error;
    }
    
    // Return the results with pagination metadata
    return NextResponse.json({
      data,
      meta: {
        totalItems: count || 0,
        itemsPerPage: limit,
        currentPage: page,
        totalPages: count ? Math.ceil(count / limit) : 0
      }
    });
  } catch (error: any) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      {
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: error.message || 'Failed to fetch assessment submissions'
        }]
      },
      { status: 500 }
    );
  }
}

// POST: Process new form submissions
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      {
        errors: [{
          status: '429',
          title: 'Too Many Requests',
          detail: `Rate limit exceeded. Try again in ${reset - Date.now()}ms`
        }]
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString()
        }
      }
    );
  }
  
  const supabase = await createClient();
  
  try {
    // Parse request body
    const body = await request.json();
    
    // Basic validation
    if (!body.form_id) {
      return NextResponse.json(
        {
          errors: [{
            status: '400',
            title: 'Bad Request',
            detail: 'Form ID is required',
            source: { pointer: '/data/attributes/form_id' }
          }]
        },
        { status: 400 }
      );
    }
    
    if (!body.responses || typeof body.responses !== 'object') {
      return NextResponse.json(
        {
          errors: [{
            status: '400',
            title: 'Bad Request',
            detail: 'Form responses are required',
            source: { pointer: '/data/attributes/responses' }
          }]
        },
        { status: 400 }
      );
    }
    
    // Get the form to validate against
    const { data: form, error: formError } = await supabase
      .from('assessment_forms')
      .select('*')
      .eq('id', body.form_id)
      .single();
    
    if (formError || !form) {
      return NextResponse.json(
        {
          errors: [{
            status: '404',
            title: 'Not Found',
            detail: 'Assessment form not found'
          }]
        },
        { status: 404 }
      );
    }
    
    // Validate responses against form structure
    const validationErrors = validateFormSubmission(body.responses, form);
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          errors: Object.entries(validationErrors).map(([field, message]) => ({
            status: '400',
            title: 'Validation Error',
            detail: message,
            source: { pointer: `/data/attributes/responses/${field}` }
          }))
        },
        { status: 400 }
      );
    }
    
    // Extract respondent info from the submission
    const respondentName = body.responses.fullName || body.responses.full_name || '';
    const respondentEmail = body.responses.email || '';
    const respondentPhone = body.responses.phone || '';
    const respondentCompany = body.responses.company || '';
    
    // Create the submission
    const { data, error } = await supabase
      .from('assessment_submissions')
      .insert({
        form_id: body.form_id,
        respondent_name: respondentName,
        respondent_email: respondentEmail,
        respondent_phone: respondentPhone,
        respondent_company: respondentCompany,
        responses: body.responses,
        status: 'new',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: (await supabase.auth.getUser()).data.user?.id || null
      })
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    // Handle notifications here (could send email to admin)
    
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      {
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: error.message || 'Failed to create assessment submission'
        }]
      },
      { status: 500 }
    );
  }
} 