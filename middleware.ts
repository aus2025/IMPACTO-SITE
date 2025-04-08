import { NextResponse, type NextRequest } from 'next/server'
import path from 'path'
import fs from 'fs'

// Define a fallback function in case the real module can't be imported
const fallbackEnsureBlogContent = () => {
  console.log('Using fallback blog content checker - original module unavailable')
  return true
}

// Run the blog content check once when the middleware is first imported
let blogContentChecked = false
if (!blogContentChecked) {
  try {
    console.log('Middleware startup: Running blog content check')
    
    // Use a dynamic import with a fallback to ensure resilience
    let ensureBlogContentFn = fallbackEnsureBlogContent
    try {
      // Try to dynamically import the module
      const { ensureBlogContent } = require('./lib/ensure-blog-content')
      if (typeof ensureBlogContent === 'function') {
        ensureBlogContentFn = ensureBlogContent
      }
    } catch (importError) {
      console.error('Failed to import blog content module, using fallback:', importError)
    }
    
    // Execute the function (either real or fallback)
    ensureBlogContentFn()
    
    blogContentChecked = true
    console.log('Middleware startup: Blog content check complete')
  } catch (error) {
    console.error('Middleware startup: Blog content check failed', error)
    // Continue even if check fails - we have fallbacks in place
  }
}

export async function middleware(request: NextRequest) {
  try {
    // Very simplified middleware that only handles redirects in production
    if (process.env.NODE_ENV === 'production') {
      console.log('Production middleware processing:', request.nextUrl.pathname)
      
      // Handle blueprint-assessment redirect only
      if (request.nextUrl.pathname === '/blueprint-assessment') {
        const url = request.nextUrl.clone()
        url.pathname = '/assessment'
        return NextResponse.redirect(url)
      }
      
      // Handle blog slugs with proper case sensitivity
      if (request.nextUrl.pathname.startsWith('/blog/')) {
        const segments = request.nextUrl.pathname.split('/')
        const slug = segments[2]
        
        // If slug exists and doesn't match an expected pattern, check for case issues
        if (slug && slug.match(/^blog-\d+-/)) {
          // No redirect needed here, we handle case sensitivity in getPostBySlug
        }
      }
      
      // Simply pass through all other requests
      return NextResponse.next()
    }
    
    // For development, keep all the existing code
    // Rest of development middleware code
    console.log('Development middleware processing:', request.nextUrl.pathname)
    
    if (request.nextUrl.pathname === '/blueprint-assessment') {
      const url = request.nextUrl.clone()
      url.pathname = '/assessment'
      return NextResponse.redirect(url)
    }
    
    // Simply return next() for all routes in development
    return NextResponse.next()
  } catch (error) {
    // Enhanced error logging
    console.error('Middleware critical error:', error)
    
    // Log additional context information
    console.error('Error context:', { 
      path: request.nextUrl.pathname,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries())
    })
    
    // Always return a valid response even on error
    // To ensure the application doesn't crash with a 500 error
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 