import { NextRequest, NextResponse } from 'next/server'
import { createClientForApp } from '@/utils/supabase/server'

// GET /api/case-studies - Get a list of case studies
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get('status')
  const industry = searchParams.get('industry')
  const limit = parseInt(searchParams.get('limit') || '100')
  const offset = parseInt(searchParams.get('offset') || '0')
  
  try {
    const supabase = await createClientForApp()
    
    // Build query
    let query = supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1)
    
    // Apply filters if provided
    if (status) {
      query = query.eq('status', status)
    }
    
    if (industry) {
      query = query.eq('industry', industry)
    }
    
    const { data, error, count } = await query
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({
      case_studies: data || [],
      count,
      limit,
      offset
    })
  } catch (error: any) {
    console.error('Error fetching case studies:', error.message || error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch case studies', case_studies: [] },
      { status: 500 }
    )
  }
}

// POST /api/case-studies - Create a new case study
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
    const caseStudy = await request.json()
    
    // Check if a case study with the same slug already exists
    if (caseStudy.slug) {
      const { data: slugExists, error: slugCheckError } = await supabase
        .from('case_studies')
        .select('id')
        .eq('slug', caseStudy.slug)
        .single()
      
      if (slugExists) {
        return NextResponse.json(
          { error: 'A case study with this slug already exists' },
          { status: 400 }
        )
      }
    }
    
    // Add timestamps and user_id
    const now = new Date().toISOString()
    caseStudy.created_at = now
    caseStudy.updated_at = now
    caseStudy.user_id = user.id
    
    // If status is published, set published_at
    if (caseStudy.status === 'published') {
      caseStudy.published_at = now
    }
    
    // Insert the case study
    const { data, error: insertError } = await supabase
      .from('case_studies')
      .insert(caseStudy)
      .select()
      .single()
    
    if (insertError) {
      throw insertError
    }
    
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error creating case study:', error.message || error)
    return NextResponse.json(
      { error: error.message || 'Failed to create case study' },
      { status: 500 }
    )
  }
} 