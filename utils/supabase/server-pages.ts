import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/dist/compiled/cookie'

export async function createClient() {
  // Simple implementation for Pages Router that doesn't use next/headers
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // This is for server-side rendering in Pages Router
          // In a real implementation, you would access cookies from the request
          return []
        },
        setAll(cookiesToSet) {
          // For Pages Router, cookies are typically set via response
          // This is a no-op implementation that allows the client to function
        }
      },
    }
  )
} 