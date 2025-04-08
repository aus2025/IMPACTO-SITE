/**
 * Environment variable validation utility
 * 
 * This file ensures that all required environment variables are present
 * and provides type-safe access to them.
 */

type EnvVariables = {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  // Add other required environment variables as needed
};

/**
 * Validates environment variables and provides defaults if missing
 * Logs warnings instead of throwing errors to prevent app crashes
 */
export function validateEnv(): EnvVariables {
  // Required variables with validation
  const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('NEXT_PUBLIC_SUPABASE_URL is missing - check your environment variables');
  }
  
  const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing - check your environment variables');
  }

  return {
    NEXT_PUBLIC_SUPABASE_URL: NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  };
}

/**
 * Validated environment variables
 * Use this object to access environment variables throughout the application
 */
export const env = validateEnv(); 