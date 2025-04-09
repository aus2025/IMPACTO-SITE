import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body with error handling
    let data;
    try {
      data = await request.json();
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid request format' 
        },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!data.full_name || !data.email) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields' 
        },
        { status: 400 }
      );
    }
    
    // Initialize Supabase client with error handling
    let supabase;
    try {
      supabase = await createServerSupabaseClient();
    } catch (supabaseError) {
      console.error('Failed to initialize Supabase client:', supabaseError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database connection error' 
        },
        { status: 503 }
      );
    }
    
    // Insert data into Supabase with detailed error tracking
    try {
      const { data: assessment, error } = await supabase
        .from('assessments')
        .insert([
          {
            name: data.full_name,
            email: data.email,
            company: data.company_name || '',
            job_title: data.job_title || '',
            phone: data.phone || '',
            industry: data.industry || '',
            company_size: data.employee_count || '',
            business_goals: data.business_goals || '',
            pain_points: data.pain_points || '',
            automation_experience: data.current_automation || '',
            current_tools: Array.isArray(data.current_tools) ? data.current_tools : [],
            automation_needs: data.automation_areas || '',
            document_types: data.document_types || '',
            document_volume: data.document_volume || '',
            timeline: data.implementation_timeline || '',
            budget_range: data.budget_range || '',
            referral_source: data.referral_source || '',
            additional_comments: data.additional_comments || '',
            consent: Boolean(data.consent_terms),
            created_at: new Date(),
          }
        ])
        .select();
        
      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }
      
      // Return success with the assessment ID
      return NextResponse.json({ 
        success: true, 
        message: 'Assessment submitted successfully', 
        assessmentId: assessment[0]?.id 
      });
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to save assessment data' 
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error processing assessment submission:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process assessment submission',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
} 