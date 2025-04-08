import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { isEnvConfigured } from '@/utils/env'

/**
 * Creates a Supabase client for use in server components
 * with enhanced error handling to prevent 500 errors in production
 */
export async function createClient() {
  try {
    // Check if environment variables are properly configured
    if (!isEnvConfigured()) {
      console.error('⚠️ Supabase environment variables are not configured correctly');
      // Return a mock client that won't crash but won't work correctly
      // This prevents 500 errors in production due to missing env vars
      return createMockClient();
    }

    const cookieStore = cookies()

    return createServerClient(
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
            } catch (error) {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
              console.warn('Error setting cookies in server component:', error);
            }
          },
        },
      }
    )
  } catch (error) {
    console.error('Critical error creating Supabase client:', error);
    // Return a mock client to prevent crashes
    return createMockClient();
  }
}

/**
 * Creates a mock Supabase client that won't crash but returns empty data
 * Used as a fallback when environment variables are missing
 */
function createMockClient() {
  // Return an object that mimics the Supabase client API but returns empty results
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signOut: async () => ({ error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          maybeSingle: async () => ({ data: null, error: null }),
          execute: async () => ({ data: [], error: null })
        }),
        execute: async () => ({ data: [], error: null })
      }),
      insert: () => ({
        select: () => ({
          single: async () => ({ data: null, error: null })
        })
      }),
      update: () => ({
        eq: () => ({
          execute: async () => ({ data: null, error: null })
        })
      })
    }),
    rpc: () => ({ data: null, error: null })
  };
} 