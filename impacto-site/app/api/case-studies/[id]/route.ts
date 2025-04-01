import { NextRequest, NextResponse } from 'next/server'
import { createClientForApp } from '@/utils/supabase/server'

// GET /api/case-studies/[id] - Get a specific case study
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClientForApp()
    
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('id', params.id)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Case study not found' },
          { status: 404 }
        )
      }
      throw error
    }
    
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching case study:', error.message || error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch case study' },
      { status: 500 }
    )
  }
}

// PUT /api/case-studies/[id] - Update a case study
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClientForApp()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    // Get the request body
    const updates = await request.json()
    
    // Check if the case study exists
    const { data: existingCaseStudy, error: fetchError } = await supabase
      .from('case_studies')
      .select('id, slug')
      .eq('id', params.id)
      .single()
    
    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Case study not found' },
          { status: 404 }
        )
      }
      throw fetchError
    }
    
    // If the slug is changed, check for uniqueness
    if (updates.slug && updates.slug !== existingCaseStudy.slug) {
      const { data: slugExists, error: slugCheckError } = await supabase
        .from('case_studies')
        .select('id')
        .eq('slug', updates.slug)
        .neq('id', params.id)
        .single()
      
      if (slugExists) {
        return NextResponse.json(
          { error: 'A case study with this slug already exists' },
          { status: 400 }
        )
      }
    }
    
    // Update timestamps
    updates.updated_at = new Date().toISOString()
    
    // If status is changed to published, update published_at
    if (updates.status === 'published' && !updates.published_at) {
      updates.published_at = updates.updated_at
    }
    
    // Update the case study
    const { data, error: updateError } = await supabase
      .from('case_studies')
      .update(updates)
      .eq('id', params.id)
      .select()
      .single()
    
    if (updateError) {
      throw updateError
    }
    
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error updating case study:', error.message || error)
    return NextResponse.json(
      { error: error.message || 'Failed to update case study' },
      { status: 500 }
    )
  }
}

// DELETE /api/case-studies/[id] - Delete a case study
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClientForApp()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    // Check if the case study exists
    const { data: existingCaseStudy, error: fetchError } = await supabase
      .from('case_studies')
      .select('id')
      .eq('id', params.id)
      .single()
    
    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Case study not found' },
          { status: 404 }
        )
      }
      throw fetchError
    }
    
    // Delete the case study
    const { error: deleteError } = await supabase
      .from('case_studies')
      .delete()
      .eq('id', params.id)
    
    if (deleteError) {
      throw deleteError
    }
    
    return NextResponse.json(
      { message: 'Case study deleted successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error deleting case study:', error.message || error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete case study' },
      { status: 500 }
    )
  }
} 