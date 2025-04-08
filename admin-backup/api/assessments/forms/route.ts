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

// GET: List forms with pagination, sorting, and filtering
export async function GET(request: NextRequest) {
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
  
  // Check authorization
  if (!await isAuthorized(supabase)) {
    return NextResponse.json(
      {
        errors: [{
          status: '403',
          title: 'Forbidden',
          detail: 'You do not have permission to access this resource'
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
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    
    // Calculate pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    // Build the base query
    let query = supabase
      .from('assessment_forms')
      .select('*', { count: 'exact' });
    
    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
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
    console.error('Error fetching forms:', error);
    return NextResponse.json(
      {
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: error.message || 'Failed to fetch assessment forms'
        }]
      },
      { status: 500 }
    );
  }
}

// POST: Create a new form template
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
  
  // Check authorization
  if (!await isAuthorized(supabase)) {
    return NextResponse.json(
      {
        errors: [{
          status: '403',
          title: 'Forbidden',
          detail: 'You do not have permission to access this resource'
        }]
      },
      { status: 403 }
    );
  }
  
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.title) {
      return NextResponse.json(
        {
          errors: [{
            status: '400',
            title: 'Bad Request',
            detail: 'Title is required',
            source: { pointer: '/data/attributes/title' }
          }]
        },
        { status: 400 }
      );
    }
    
    // If sections are provided, validate them
    if (body.sections && !Array.isArray(body.sections)) {
      return NextResponse.json(
        {
          errors: [{
            status: '400',
            title: 'Bad Request',
            detail: 'Sections must be an array',
            source: { pointer: '/data/attributes/sections' }
          }]
        },
        { status: 400 }
      );
    }
    
    // Create the form
    const { data, error } = await supabase
      .from('assessment_forms')
      .insert({
        title: body.title,
        description: body.description || '',
        sections: body.sections || [],
        status: body.status || 'draft',
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
    console.error('Error creating form:', error);
    return NextResponse.json(
      {
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: error.message || 'Failed to create assessment form'
        }]
      },
      { status: 500 }
    );
  }
} 