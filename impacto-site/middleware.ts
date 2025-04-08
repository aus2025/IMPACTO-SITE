import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // For debugging - log all requests
  console.log('Middleware processing:', request.nextUrl.pathname)
  
  // Redirect old case studies URLs to the blog page - retail-automation, finance-data-analytics, etc.
  if (request.nextUrl.pathname.startsWith('/blog/retail-automation') || 
      request.nextUrl.pathname.startsWith('/blog/healthcare-workflow') ||
      request.nextUrl.pathname.startsWith('/blog/finance-data-analytics') ||
      request.nextUrl.pathname.startsWith('/blog/manufacturing-ai') ||
      request.nextUrl.pathname.startsWith('/blog/education-platform') ||
      request.nextUrl.pathname.startsWith('/blog/saas-social-media')) {
    console.log('Redirecting old case study URL to blog homepage')
    const url = request.nextUrl.clone()
    url.pathname = '/blog'
    return NextResponse.redirect(url)
  }
  
  // In production, completely disable all protected routes
  if (process.env.NODE_ENV === 'production') {
    // Redirect /pricing/starter to /pricing/kickstart
    if (request.nextUrl.pathname === '/pricing/starter') {
      console.log('Redirecting from /pricing/starter to /pricing/kickstart')
      const url = request.nextUrl.clone()
      url.pathname = '/pricing/kickstart'
      return NextResponse.redirect(url)
    }
    
    // Handle redirect from /blueprint-assessment to /assessment
    if (request.nextUrl.pathname === '/blueprint-assessment') {
      console.log('Redirecting from /blueprint-assessment to /assessment')
      const url = request.nextUrl.clone()
      url.pathname = '/assessment'
      return NextResponse.redirect(url)
    }
    
    // Also redirect assessment routes (protected) to home
    if (request.nextUrl.pathname.startsWith('/assessment') || 
        request.nextUrl.pathname.startsWith('/assessments')) {
      console.log('Assessment routes disabled in production')
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
    
    // Redirect login and auth pages
    if (request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/auth-debug')) {
      console.log('Auth routes disabled in production')
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
    
    // Block all API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
      // Allow access to the assessment submission API
      if (request.nextUrl.pathname === '/api/submit-assessment') {
        console.log('Allowing access to assessment submission API in production')
        return NextResponse.next()
      }
      
      console.log('API routes blocked in production')
      return new NextResponse('Not Found', { status: 404 })
    }
  }
  
  // For development only - below code won't run in production
  if (process.env.NODE_ENV !== 'production') {
    // Redirect /pricing/starter to /pricing/kickstart
    if (request.nextUrl.pathname === '/pricing/starter') {
      console.log('Redirecting from /pricing/starter to /pricing/kickstart')
      const url = request.nextUrl.clone()
      url.pathname = '/pricing/kickstart'
      return NextResponse.redirect(url)
    }
    
    // Handle redirect from /blueprint-assessment to /assessment
    if (request.nextUrl.pathname === '/blueprint-assessment') {
      console.log('Redirecting from /blueprint-assessment to /assessment')
      const url = request.nextUrl.clone()
      url.pathname = '/assessment'
      return NextResponse.redirect(url)
    }
    
    // Allow access to all API routes in development
    if (request.nextUrl.pathname.startsWith('/api')) {
      console.log('Allowing access to API route:', request.nextUrl.pathname)
      return NextResponse.next()
    }
    
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Get the user's session
    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    console.log('User authenticated:', !!user, 'Path:', request.nextUrl.pathname)

    // For assessment routes, require authentication
    if (
      request.nextUrl.pathname.startsWith('/assessments') ||
      request.nextUrl.pathname.startsWith('/login')
    ) {
      if (!user && !request.nextUrl.pathname.startsWith('/login')) {
        console.log('Redirecting to login (assessments route)')
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    }

    return supabaseResponse
  }
  
  // For production, allow all non-protected routes to pass through
  return NextResponse.next()
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