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
    if (!data.email) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email address is required' 
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
    
    // Check if subscription exists
    const { data: existingSubscription, error: lookupError } = await supabase
      .from('newsletter_subscriptions')
      .select('id, status')
      .eq('email', data.email)
      .single();
    
    if (lookupError) {
      if (lookupError.code === 'PGRST116') { // Not found
        return NextResponse.json(
          { 
            success: false, 
            message: 'No active subscription found for this email address' 
          },
          { status: 404 }
        );
      }
      
      console.error('Error checking for existing subscription:', lookupError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Error checking subscription status' 
        },
        { status: 500 }
      );
    }
    
    // If already unsubscribed, just return success
    if (existingSubscription.status === 'unsubscribed') {
      return NextResponse.json({ 
        success: true, 
        message: 'You are already unsubscribed from our newsletter.' 
      });
    }
    
    // Update subscription status to 'unsubscribed'
    const { error: updateError } = await supabase
      .from('newsletter_subscriptions')
      .update({ status: 'unsubscribed' })
      .eq('id', existingSubscription.id);
    
    if (updateError) {
      console.error('Error updating subscription status:', updateError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to update subscription status' 
        },
        { status: 500 }
      );
    }
    
    // Return success
    return NextResponse.json({ 
      success: true, 
      message: 'You have been successfully unsubscribed from our newsletter.' 
    });
    
  } catch (error) {
    console.error('Error processing unsubscribe request:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process unsubscribe request',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
} 