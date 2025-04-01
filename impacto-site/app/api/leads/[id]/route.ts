import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET - Retrieve a specific lead by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    // Get the lead by ID
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', params.id)
      .single()
    
    if (error) {
      throw error
    }
    
    if (!data) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }
    
    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error retrieving lead:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve lead' },
      { status: error.code === 'PGRST116' ? 404 : 500 }
    )
  }
}

// PUT - Update a specific lead by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Update the lead
    const { data, error } = await supabase
      .from('leads')
      .update({
        name: body.name,
        email: body.email,
        phone: body.phone,
        service_interest: body.service_interest,
        message: body.message,
        status: body.status,
        notes: body.notes,
        last_contacted: body.last_contacted
      })
      .eq('id', params.id)
      .select()
    
    if (error) {
      throw error
    }
    
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }
    
    return NextResponse.json({ data: data[0] })
  } catch (error: any) {
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update lead' },
      { status: 500 }
    )
  }
}

// PATCH - Update specific fields of a lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Only update the fields that are provided
    const updates: any = {}
    
    if (body.name !== undefined) updates.name = body.name
    if (body.email !== undefined) updates.email = body.email
    if (body.phone !== undefined) updates.phone = body.phone
    if (body.service_interest !== undefined) updates.service_interest = body.service_interest
    if (body.message !== undefined) updates.message = body.message
    if (body.status !== undefined) updates.status = body.status
    if (body.notes !== undefined) updates.notes = body.notes
    if (body.last_contacted !== undefined) updates.last_contacted = body.last_contacted
    
    // If there are no fields to update, return an error
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }
    
    // Update the lead
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', params.id)
      .select()
    
    if (error) {
      throw error
    }
    
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }
    
    return NextResponse.json({ data: data[0] })
  } catch (error: any) {
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update lead' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a specific lead by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    // Delete the lead
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', params.id)
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting lead:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete lead' },
      { status: 500 }
    )
  }
} 