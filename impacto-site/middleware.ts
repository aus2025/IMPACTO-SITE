import { NextResponse, type NextRequest } from 'next/server'

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