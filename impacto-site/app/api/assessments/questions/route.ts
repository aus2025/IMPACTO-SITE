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

// GET: Get question types and configuration options
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      {
        errors: [{
          status: '429',
          title: 'Too Many Requests',
          detail: 'Rate limit exceeded'
        }]
      },
      { status: 429 }
    );
  }
  
  const supabase = await createClient();
  
  try {
    // Define available question types and their configurations
    const questionTypes = {
      text: {
        type: 'text',
        config: {
          minLength: { type: 'number', description: 'Minimum text length' },
          maxLength: { type: 'number', description: 'Maximum text length' },
          placeholder: { type: 'string', description: 'Placeholder text' },
          defaultValue: { type: 'string', description: 'Default value' }
        }
      },
      textarea: {
        type: 'textarea',
        config: {
          minLength: { type: 'number', description: 'Minimum text length' },
          maxLength: { type: 'number', description: 'Maximum text length' },
          rows: { type: 'number', description: 'Number of visible rows' },
          placeholder: { type: 'string', description: 'Placeholder text' },
          defaultValue: { type: 'string', description: 'Default value' }
        }
      },
      select: {
        type: 'select',
        config: {
          options: { type: 'array', description: 'Array of options' },
          multiple: { type: 'boolean', description: 'Allow multiple selections' },
          placeholder: { type: 'string', description: 'Placeholder text' },
          defaultValue: { type: 'string|array', description: 'Default selected value(s)' }
        }
      },
      radio: {
        type: 'radio',
        config: {
          options: { type: 'array', description: 'Array of options' },
          defaultValue: { type: 'string', description: 'Default selected value' }
        }
      },
      checkbox: {
        type: 'checkbox',
        config: {
          options: { type: 'array', description: 'Array of options' },
          defaultValue: { type: 'array', description: 'Default selected values' }
        }
      },
      date: {
        type: 'date',
        config: {
          minDate: { type: 'date', description: 'Minimum allowed date' },
          maxDate: { type: 'date', description: 'Maximum allowed date' },
          defaultValue: { type: 'date', description: 'Default date' }
        }
      },
      number: {
        type: 'number',
        config: {
          min: { type: 'number', description: 'Minimum value' },
          max: { type: 'number', description: 'Maximum value' },
          step: { type: 'number', description: 'Step increment' },
          defaultValue: { type: 'number', description: 'Default value' }
        }
      },
      rating: {
        type: 'rating',
        config: {
          max: { type: 'number', description: 'Maximum rating value' },
          defaultValue: { type: 'number', description: 'Default rating' }
        }
      },
      email: {
        type: 'email',
        config: {
          placeholder: { type: 'string', description: 'Placeholder text' },
          defaultValue: { type: 'string', description: 'Default value' }
        }
      },
      phone: {
        type: 'phone',
        config: {
          placeholder: { type: 'string', description: 'Placeholder text' },
          defaultValue: { type: 'string', description: 'Default value' }
        }
      },
      file: {
        type: 'file',
        config: {
          maxSize: { type: 'number', description: 'Maximum file size in bytes' },
          acceptedTypes: { type: 'array', description: 'Accepted file types' }
        }
      }
    };
    
    // Get question templates from the database
    const { data: templates, error } = await supabase
      .from('assessment_question_templates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    // Return both question types and templates
    return NextResponse.json({
      data: {
        questionTypes,
        templates: templates || []
      }
    });
  } catch (error: any) {
    console.error('Error retrieving question types:', error);
    return NextResponse.json(
      {
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: error.message || 'Failed to retrieve question types'
        }]
      },
      { status: 500 }
    );
  }
}

// POST: Create question templates for reuse
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      {
        errors: [{
          status: '429',
          title: 'Too Many Requests',
          detail: 'Rate limit exceeded'
        }]
      },
      { status: 429 }
    );
  }
  
  const supabase = await createClient();
  
  // Check authorization
  if (!await isAuthorized(supabase)) {
    return NextResponse.json(
      {
        errors: [{
          status: '403',
          title: 'Forbidden',
          detail: 'You do not have permission to create question templates'
        }]
      },
      { status: 403 }
    );
  }
  
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.type) {
      return NextResponse.json(
        {
          errors: [{
            status: '400',
            title: 'Bad Request',
            detail: 'Question type is required',
            source: { pointer: '/data/attributes/type' }
          }]
        },
        { status: 400 }
      );
    }
    
    if (!body.label) {
      return NextResponse.json(
        {
          errors: [{
            status: '400',
            title: 'Bad Request',
            detail: 'Question label is required',
            source: { pointer: '/data/attributes/label' }
          }]
        },
        { status: 400 }
      );
    }
    
    // Create question template
    const { data, error } = await supabase
      .from('assessment_question_templates')
      .insert({
        type: body.type,
        label: body.label,
        description: body.description || '',
        config: body.config || {},
        created_by: (await supabase.auth.getUser()).data.user?.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating question template:', error);
    return NextResponse.json(
      {
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: error.message || 'Failed to create question template'
        }]
      },
      { status: 500 }
    );
  }
} 