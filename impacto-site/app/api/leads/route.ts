import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET - List all leads with optional filtering
export async function GET(request: NextRequest) {
  const supabase = createClient()
  
  // Check if user is authenticated and admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check if user has admin role (optional additional check)
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  
  if (!profile?.is_admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')
  const status = searchParams.get('status')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const sortBy = searchParams.get('sortBy') || 'created_at'
  const sortOrder = searchParams.get('sortOrder') || 'desc'
  const page = parseInt(searchParams.get('page') || '1')
  const perPage = parseInt(searchParams.get('perPage') || '10')
  
  // Build the query
  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' })
  
  // Apply filters
  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,service_interest.ilike.%${search}%`)
  }
  
  if (status) {
    query = query.eq('status', status)
  }
  
  if (startDate) {
    query = query.gte('created_at', startDate)
  }
  
  if (endDate) {
    // Add one day to include the end date
    const nextDay = new Date(endDate)
    nextDay.setDate(nextDay.getDate() + 1)
    const endDateFormatted = nextDay.toISOString()
    query = query.lt('created_at', endDateFormatted)
  }
  
  // Apply sorting
  query = query.order(sortBy as any, { ascending: sortOrder === 'asc' })
  
  // Apply pagination
  const from = (page - 1) * perPage
  const to = from + perPage - 1
  query = query.range(from, to)
  
  // Execute the query
  const { data, error, count } = await query
  
  if (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({
    data,
    pagination: {
      page,
      perPage,
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / perPage)
    }
  })
}

// POST - Create a new lead
export async function POST(request: NextRequest) {
  const supabase = createClient()
  
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      )
    }
    
    // Insert the new lead
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        service_interest: body.service_interest || null,
        message: body.message,
        status: 'New' // Default status for new leads
      })
      .select()
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({ data }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create lead' },
      { status: 500 }
    )
  }
}

// DELETE - Delete multiple leads (batch delete)
export async function DELETE(request: NextRequest) {
  const supabase = createClient()
  
  // Check if user is authenticated and admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check if user has admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  
  if (!profile?.is_admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
      return NextResponse.json(
        { error: 'ids array is required and must not be empty' },
        { status: 400 }
      )
    }
    
    // Delete the leads
    const { error } = await supabase
      .from('leads')
      .delete()
      .in('id', body.ids)
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting leads:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete leads' },
      { status: 500 }
    )
  }
} 