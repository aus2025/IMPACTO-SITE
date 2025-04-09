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
    
    // In production, log more details to help debug
    if (process.env.NODE_ENV === 'production') {
      console.error('⚠️ Environment variable NEXT_PUBLIC_SUPABASE_URL is missing in production');
      console.error('This may cause unexpected behavior in database operations');
      console.error('Available environment variables:', Object.keys(process.env).filter(k => k.startsWith('NEXT_')));
    }
  }
  
  const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing - check your environment variables');
    
    // In production, log more details to help debug
    if (process.env.NODE_ENV === 'production') {
      console.error('⚠️ Environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in production');
      console.error('This may cause authentication failures in database operations');
    }
  }

  // In development, provide placeholder values to prevent crashes
  // In production, we'll still return empty strings to avoid crashes, but log an error
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    // Use fallback placeholders in development, empty strings in production (still won't work but won't crash)
    NEXT_PUBLIC_SUPABASE_URL: NEXT_PUBLIC_SUPABASE_URL || (isDevelopment ? 'https://example.supabase.co' : ''),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: NEXT_PUBLIC_SUPABASE_ANON_KEY || (isDevelopment ? 'placeholder_key' : ''),
  };
}

/**
 * Validated environment variables
 * Use this object to access environment variables throughout the application
 */
export const env = validateEnv();

/**
 * Check if environment is properly configured
 * @returns boolean indicating if essential environment variables are configured
 */
export function isEnvConfigured(): boolean {
  return !!(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
} 