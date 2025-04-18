import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // For debugging - log all requests
  console.log('Middleware processing:', request.nextUrl.pathname)
  
  // In production, completely disable all protected routes
  if (process.env.NODE_ENV === 'production') {
    // Redirect all admin routes to home page
    if (request.nextUrl.pathname.startsWith('/admin')) {
      console.log('Admin routes disabled in production')
      const url = request.nextUrl.clone()
      url.pathname = '/'
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
      console.log('API routes blocked in production')
      return new NextResponse('Not Found', { status: 404 })
    }
  }
  
  // For development only - below code won't run in production
  if (process.env.NODE_ENV !== 'production') {
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

    // For admin routes, require authentication only (temporarily skip role check)
    // Exclude login and forgot-password pages from this check
    if (
      request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login') &&
      !request.nextUrl.pathname.startsWith('/admin/forgot-password')
    ) {
      if (!user) {
        console.log('Redirecting to admin login (no user)')
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
      }

      // TEMPORARILY SKIP DATABASE ROLE CHECK DUE TO RLS ISSUES
      // We'll implement proper role checking after fixing the database policies
      console.log('Admin access granted to:', request.nextUrl.pathname)
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