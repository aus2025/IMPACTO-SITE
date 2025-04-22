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
        .from('business_assessments')
        .insert([
          {
            full_name: data.full_name,
            email: data.email,
            company_name: data.company_name || '',
            job_title: data.job_title || '',
            phone: data.phone || '',
            industry: data.industry || '',
            employee_count: data.employee_count || '',
            business_goals: Array.isArray(data.business_goals) ? data.business_goals : [],
            pain_points: Array.isArray(data.pain_points) ? data.pain_points : [],
            compliance_concerns: Array.isArray(data.compliance_concerns) ? data.compliance_concerns : [],
            automation_areas: Array.isArray(data.automation_areas) ? data.automation_areas : [],
            document_types: Array.isArray(data.document_types) ? data.document_types : [],
            document_volume: data.document_volume || '',
            process_complexity: data.process_complexity || '',
            integration_needs: Array.isArray(data.integration_needs) ? data.integration_needs : [],
            budget_range: data.budget_range || '',
            funding_source: data.funding_source || '',
            decision_timeline: data.decision_timeline || '',
            investment_factors: Array.isArray(data.investment_factors) ? data.investment_factors : [],
            competitor_automation: data.competitor_automation || '',
            budget_constraints: data.budget_constraints || '',
            consultation_preference: data.consultation_preference || '',
            additional_comments: data.additional_comments || '',
            consent_terms: Boolean(data.consent_terms),
            consent_marketing: Boolean(data.consent_marketing),
            referral_source: data.referral_source || '',
            status: 'new',
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