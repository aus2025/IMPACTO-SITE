import { createServerClient } from '@supabase/ssr'

// This is a version that works in App Router pages but without using next/headers
export async function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll(cookiesToSet) {
          // No-op implementation for pages compatibility
        }
      },
    }
  )
} 