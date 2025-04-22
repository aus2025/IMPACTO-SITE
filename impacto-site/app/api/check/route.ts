import { NextRequest, NextResponse } from 'next/server';

// Simple GET endpoint to check if API routes are working correctly
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}

// POST endpoint for testing request/response
export async function POST(request: NextRequest) {
  let data;
  try {
    data = await request.json();
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Invalid JSON body' 
    }, { status: 400 });
  }
  
  return NextResponse.json({ 
    success: true, 
    message: 'Data received successfully',
    received: data,
    timestamp: new Date().toISOString()
  });
} 