import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// Helper function to get file extension
function getExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

// List of allowed image extensions
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']

// Maximum file size in bytes (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient()

  try {
    // Verify user is admin
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Check if user has admin role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    // Parse the multipart form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }
    
    // Validate file type
    const fileExt = getExtension(file.name)
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return NextResponse.json(
        { error: 'File type not allowed. Please upload an image file (jpg, jpeg, png, gif, webp, svg).' },
        { status: 400 }
      )
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds the 5MB limit' },
        { status: 400 }
      )
    }
    
    // Generate a unique filename
    const uniqueFilename = `${uuidv4()}.${fileExt}`
    const path = `blog-images/${uniqueFilename}`
    
    // Convert the file to an array buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase
      .storage
      .from('public')
      .upload(path, buffer, {
        contentType: file.type,
        cacheControl: '3600'
      })
    
    if (uploadError) {
      throw uploadError
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('public')
      .getPublicUrl(path)
    
    // Return success response with the image URL
    return NextResponse.json({
      success: true,
      url: publicUrl
    })
  } catch (error: any) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    )
  }
} 