import { NextRequest, NextResponse } from 'next/server'
import { createClientForApp } from '@/utils/supabase/server'

// GET /api/case-studies/[id]/tags - Get all tags for a case study
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClientForApp()
    
    // Get tags for the specified case study
    const { data, error } = await supabase
      .from('case_study_to_tags')
      .select(`
        tag_id,
        case_study_tags (
          id,
          name
        )
      `)
      .eq('case_study_id', params.id)
    
    if (error) {
      throw error
    }
    
    // Format the response data
    const tags = (data || []).map(item => ({
      id: item.tag_id,
      name: item.case_study_tags.name
    }))
    
    return NextResponse.json({ tags })
  } catch (error: any) {
    console.error('Error fetching case study tags:', error.message || error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch case study tags' },
      { status: 500 }
    )
  }
}

// POST /api/case-studies/[id]/tags - Add tags to a case study
export async function POST(
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
    const { tags } = await request.json()
    
    if (!Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { error: 'At least one tag ID is required' },
        { status: 400 }
      )
    }
    
    // Check if the case study exists
    const { data: caseStudy, error: caseStudyError } = await supabase
      .from('case_studies')
      .select('id')
      .eq('id', params.id)
      .single()
    
    if (caseStudyError) {
      if (caseStudyError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Case study not found' },
          { status: 404 }
        )
      }
      throw caseStudyError
    }
    
    // Prepare tag mappings
    const tagMappings = tags.map(tagId => ({
      case_study_id: params.id,
      tag_id: tagId
    }))
    
    // First, remove existing tag mappings
    const { error: deleteError } = await supabase
      .from('case_study_to_tags')
      .delete()
      .eq('case_study_id', params.id)
    
    if (deleteError) {
      throw deleteError
    }
    
    // Then, insert new tag mappings
    const { data, error: insertError } = await supabase
      .from('case_study_to_tags')
      .insert(tagMappings)
      .select()
    
    if (insertError) {
      throw insertError
    }
    
    return NextResponse.json({ 
      message: 'Tags updated successfully',
      count: tagMappings.length
    })
  } catch (error: any) {
    console.error('Error updating case study tags:', error.message || error)
    return NextResponse.json(
      { error: error.message || 'Failed to update case study tags' },
      { status: 500 }
    )
  }
}

// DELETE /api/case-studies/[id]/tags - Remove all tags from a case study
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
    const { data: caseStudy, error: caseStudyError } = await supabase
      .from('case_studies')
      .select('id')
      .eq('id', params.id)
      .single()
    
    if (caseStudyError) {
      if (caseStudyError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Case study not found' },
          { status: 404 }
        )
      }
      throw caseStudyError
    }
    
    // Remove all tag mappings for this case study
    const { error: deleteError } = await supabase
      .from('case_study_to_tags')
      .delete()
      .eq('case_study_id', params.id)
    
    if (deleteError) {
      throw deleteError
    }
    
    return NextResponse.json({ 
      message: 'All tags removed successfully' 
    })
  } catch (error: any) {
    console.error('Error removing case study tags:', error.message || error)
    return NextResponse.json(
      { error: error.message || 'Failed to remove case study tags' },
      { status: 500 }
    )
  }
} 