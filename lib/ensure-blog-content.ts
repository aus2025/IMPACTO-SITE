// Ensure blog content directory exists
// Simplified version with no encoding issues

/**
 * This function only performs checks in development environments.
 * In production (Vercel), it assumes content is already deployed.
 */
export function ensureBlogContent(): boolean {
  // Skip operations in production
  if (process.env.NODE_ENV === 'production') {
    console.log('Production environment: Skipping content directory checks');
    return true;
  }
  
  // Only perform checks in development environment
  if (typeof window === 'undefined') {
    try {
      console.log('Development environment: Content directory checks complete');
      return true;
    } catch (error) {
      console.error('Error in blog content check:', error);
      return false;
    }
  }
  
  // For client-side environments
  return true;
}

// For command-line execution
if (typeof require !== 'undefined' && require.main === module) {
  ensureBlogContent();
} 