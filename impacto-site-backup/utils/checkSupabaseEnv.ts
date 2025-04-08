/**
 * Utility to check if the Supabase environment variables are properly set
 * Can be imported and called in development to help debug issues
 */

export function checkSupabaseEnvironment() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  const issues = [];
  
  if (!supabaseUrl) {
    issues.push('NEXT_PUBLIC_SUPABASE_URL is not set');
  } else if (!supabaseUrl.startsWith('https://')) {
    issues.push('NEXT_PUBLIC_SUPABASE_URL should start with https://');
  }
  
  if (!supabaseAnonKey) {
    issues.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  } else if (supabaseAnonKey === 'your-supabase-anon-key') {
    issues.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is still using the placeholder value');
  }
  
  if (issues.length > 0) {
    console.error('⚠️ Supabase Environment Issues Detected:');
    issues.forEach(issue => console.error(`- ${issue}`));
    console.error('\nPlease create/update your .env.local file with the correct values from your Supabase project.');
    return false;
  }
  
  console.log('✅ Supabase environment variables are properly set.');
  return true;
}

// Automatically check environment in development
if (process.env.NODE_ENV === 'development') {
  checkSupabaseEnvironment();
} 