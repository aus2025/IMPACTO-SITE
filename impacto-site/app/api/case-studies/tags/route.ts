import { NextRequest, NextResponse } from 'next/server'
import { createClientForApp } from '@/utils/supabase/server'

// GET /api/case-studies/tags - Get all tags
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClientForApp()
    
    const { data, error } = await supabase
      .from('case_study_tags')
      .select('*')
      .order('name')
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({ tags: data || [] })
  } catch (error: any) {
    console.error('Error fetching tags:', error.message || error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch tags' },
      { status: 500 }
    )
  }
}

// POST /api/case-studies/tags - Create a new tag
export async function POST(request: NextRequest) {
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
    const { name } = await request.json()
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Tag name is required' },
        { status: 400 }
      )
    }
    
    // Check if the tag already exists
    const { data: existingTag, error: checkError } = await supabase
      .from('case_study_tags')
      .select('id')
      .ilike('name', name.trim())
      .single()
    
    if (existingTag) {
      return NextResponse.json(
        { error: 'A tag with this name already exists' },
        { status: 400 }
      )
    }
    
    // Insert the tag
    const { data, error: insertError } = await supabase
      .from('case_study_tags')
      .insert({ name: name.trim() })
      .select()
      .single()
    
    if (insertError) {
      throw insertError
    }
    
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error creating tag:', error.message || error)
    return NextResponse.json(
      { error: error.message || 'Failed to create tag' },
      { status: 500 }
    )
  }
} 