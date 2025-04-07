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
 * Validates that all required environment variables are present
 * Throws an error if any are missing
 */
export function validateEnv(): EnvVariables {
  // Required variables with validation
  const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required');
  }
  
  const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required');
  }

  return {
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

/**
 * Validated environment variables
 * Use this object to access environment variables throughout the application
 */
export const env = validateEnv(); 