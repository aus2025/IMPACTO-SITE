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

// Helper function to validate form data
function validateFormData(data: any) {
  const errors: Array<{ field: string; message: string }> = [];
  
  if (!data.title) {
    errors.push({ field: 'title', message: 'Title is required' });
  }
  
  if (data.sections && !Array.isArray(data.sections)) {
    errors.push({ field: 'sections', message: 'Sections must be an array' });
  } else if (data.sections) {
    // Validate each section
    data.sections.forEach((section: any, index: number) => {
      if (!section.title) {
        errors.push({ field: `sections[${index}].title`, message: 'Section title is required' });
      }
      
      if (!section.questions || !Array.isArray(section.questions)) {
        errors.push({ field: `sections[${index}].questions`, message: 'Questions must be an array' });
      } else {
        // Validate each question
        section.questions.forEach((question: any, qIndex: number) => {
          if (!question.type) {
            errors.push({ field: `sections[${index}].questions[${qIndex}].type`, message: 'Question type is required' });
          }
          
          if (!question.label) {
            errors.push({ field: `sections[${index}].questions[${qIndex}].label`, message: 'Question label is required' });
          }
        });
      }
    });
  }
  
  return errors;
}

// GET: Retrieve specific form details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    // Get the form by ID
    const { data, error } = await supabase
      .from('assessment_forms')
      .select('*')
      .eq('id', params.id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
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
      throw error;
    }
    
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Error retrieving form:', error);
    return NextResponse.json(
      {
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: error.message || 'Failed to retrieve assessment form'
        }]
      },
      { status: 500 }
    );
  }
}

// PUT: Update form structure and settings
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
          detail: 'You do not have permission to update this form'
        }]
      },
      { status: 403 }
    );
  }
  
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate form data
    const validationErrors = validateFormData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          errors: validationErrors.map(err => ({
            status: '400',
            title: 'Validation Error',
            detail: err.message,
            source: { pointer: `/data/attributes/${err.field}` }
          }))
        },
        { status: 400 }
      );
    }
    
    // Check if form exists
    const { data: existingForm, error: fetchError } = await supabase
      .from('assessment_forms')
      .select('id')
      .eq('id', params.id)
      .single();
    
    if (fetchError) {
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
    
    // Update the form
    const { data, error } = await supabase
      .from('assessment_forms')
      .update({
        title: body.title,
        description: body.description,
        sections: body.sections,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Error updating form:', error);
    return NextResponse.json(
      {
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: error.message || 'Failed to update assessment form'
        }]
      },
      { status: 500 }
    );
  }
}

// DELETE: Archive/delete forms
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
          detail: 'You do not have permission to delete this form'
        }]
      },
      { status: 403 }
    );
  }
  
  try {
    // Check if we should hard delete or soft delete (archive)
    const url = new URL(request.url);
    const hardDelete = url.searchParams.get('hard_delete') === 'true';
    
    if (hardDelete) {
      // Hard delete the form
      const { error } = await supabase
        .from('assessment_forms')
        .delete()
        .eq('id', params.id);
      
      if (error) {
        throw error;
      }
    } else {
      // Soft delete (archive) the form
      const { error } = await supabase
        .from('assessment_forms')
        .update({
          status: 'archived',
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id);
      
      if (error) {
        throw error;
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting form:', error);
    return NextResponse.json(
      {
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: error.message || 'Failed to delete assessment form'
        }]
      },
      { status: 500 }
    );
  }
}

// PATCH: Update form status (draft/active/archived)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
          detail: 'You do not have permission to update this form'
        }]
      },
      { status: 403 }
    );
  }
  
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate status
    const validStatuses = ['draft', 'active', 'archived'];
    if (!body.status || !validStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          errors: [{
            status: '400',
            title: 'Bad Request',
            detail: 'Invalid status. Must be one of: draft, active, archived',
            source: { pointer: '/data/attributes/status' }
          }]
        },
        { status: 400 }
      );
    }
    
    // Update the form status
    const { data, error } = await supabase
      .from('assessment_forms')
      .update({
        status: body.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
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
      throw error;
    }
    
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Error updating form status:', error);
    return NextResponse.json(
      {
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: error.message || 'Failed to update assessment form status'
        }]
      },
      { status: 500 }
    );
  }
} 