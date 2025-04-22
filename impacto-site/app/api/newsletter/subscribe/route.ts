import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Simple client with no middleware
function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON request
    const data = await request.json();
    
    // Validate email
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Create Supabase client
    const supabase = getSupabaseClient();
    
    // Try to insert the email - keep it simple
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert({
        email: data.email,
        source: data.source || 'api',
        status: 'subscribed'
      });
    
    // Handle errors
    if (error) {
      console.error('Newsletter API error:', error);
      
      // If it's a duplicate email, return success
      if (error.code === '23505') {
        return NextResponse.json(
          { success: true, message: 'You are already subscribed!' },
          { status: 200 }
        );
      }
      
      // For any other error, return an error message
      return NextResponse.json(
        { success: false, message: 'Could not complete your subscription. Please try again later.' },
        { status: 500 }
      );
    }
    
    // Return success
    return NextResponse.json(
      { success: true, message: 'Thank you for subscribing!' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Unexpected newsletter API error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// CORS handling for preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
} 