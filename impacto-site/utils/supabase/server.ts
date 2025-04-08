import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Export createServerClient for use in App Router
export const createServerClient = createSupabaseServerClient

// For Pages Router API routes
export async function createClient(
  req?: NextApiRequest,
  res?: NextApiResponse
) {
  if (!req || !res) {
    throw new Error('Request and response objects are required in Pages directory')
  }
  
  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies: { name: string; value: string }[] = []
          for (const [name, value] of Object.entries(req.cookies)) {
            if (value) {
              cookies.push({ name, value })
            }
          }
          return cookies
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res!.setHeader('Set-Cookie', serialize(name, value, options))
          })
        },
      },
    }
  )
}

// App Router createClient
export async function createClientForApp() {
  const cookieStore = cookies()

  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Simple cookie serializer for Pages Router
function serialize(name: string, value: string, options: CookieOptions = {}) {
  let cookie = `${name}=${encodeURIComponent(value)}`
  
  if (options.maxAge) {
    cookie += `; Max-Age=${options.maxAge}`
  }
  
  if (options.path) {
    cookie += `; Path=${options.path}`
  } else {
    cookie += '; Path=/'
  }
  
  if (options.httpOnly) {
    cookie += '; HttpOnly'
  }
  
  if (options.secure) {
    cookie += '; Secure'
  }
  
  if (options.sameSite) {
    cookie += `; SameSite=${options.sameSite}`
  }
  
  if (options.domain) {
    cookie += `; Domain=${options.domain}`
  }
  
  return cookie
} 