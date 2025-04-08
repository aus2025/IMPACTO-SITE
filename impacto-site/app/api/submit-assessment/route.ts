import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase client
    const supabase = await createServerSupabaseClient();
    
    // Parse the request body
    const data = await request.json();
    
    // Insert data into Supabase
    const { data: assessment, error } = await supabase
      .from('assessments')
      .insert([
        {
          name: data.full_name,
          email: data.email,
          company: data.company_name,
          job_title: data.job_title,
          phone: data.phone,
          industry: data.industry,
          company_size: data.employee_count,
          business_goals: data.business_goals,
          pain_points: data.pain_points,
          automation_experience: data.current_automation,
          current_tools: data.current_tools || [],
          automation_needs: data.automation_areas,
          document_types: data.document_types,
          document_volume: data.document_volume,
          timeline: data.implementation_timeline,
          budget_range: data.budget_range,
          referral_source: data.referral_source,
          additional_comments: data.additional_comments,
          consent: data.consent_terms,
          created_at: new Date(),
        }
      ])
      .select();
      
    if (error) throw error;
    
    // Return success with the assessment ID
    return NextResponse.json({ 
      success: true, 
      message: 'Assessment submitted successfully', 
      assessmentId: assessment[0].id 
    });
    
  } catch (error) {
    console.error('Error processing assessment submission:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process assessment submission' 
      },
      { status: 500 }
    );
  }
} 