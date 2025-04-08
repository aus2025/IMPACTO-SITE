/**
 * Error handling utilities for the business assessment form
 */

/**
 * Log detailed error information for form submission failures
 * @param error The error object
 * @param context Additional context about where the error occurred
 * @param formData The form data being submitted (optional)
 */
export function logFormError(
  error: unknown, 
  context: string,
  formData?: Record<string, any>
) {
  console.error(`Error in ${context}:`, error);
  
  // Log error details based on error type
  if (error instanceof Error) {
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }
  
  // For Supabase errors which typically have code, message and details
  if (error && typeof error === 'object' && 'code' in error) {
    console.error('Error code:', (error as any).code);
    
    if ('message' in error) {
      console.error('Error message:', (error as any).message);
    }
    
    if ('details' in error) {
      console.error('Error details:', (error as any).details);
    }
  }
  
  // Log a sanitized version of the form data for debugging
  // (removing any sensitive information)
  if (formData) {
    const sanitizedData = {...formData};
    
    // Remove potentially sensitive fields for logging
    if (sanitizedData.email) sanitizedData.email = '[REDACTED]';
    if (sanitizedData.phone) sanitizedData.phone = '[REDACTED]';
    if (sanitizedData.full_name) sanitizedData.full_name = '[REDACTED]';
    
    console.error('Form data at time of error:', sanitizedData);
  }
}

/**
 * Generate user-friendly error message from various error types
 * @param error The error object
 * @returns A user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  let message = 'There was an error submitting your assessment. Please try again.';
  
  if (error instanceof Error) {
    message += ` Error: ${error.message}`;
  } else if (error && typeof error === 'object') {
    if ('message' in error) {
      message += ` Error: ${(error as any).message}`;
    } else if ('error' in error) {
      message += ` Error: ${(error as any).error}`;
    }
  }
  
  return message;
}

/**
 * Determine if an error is related to offline status or network issues
 * @param error The error to check
 * @returns True if it's a network/offline error
 */
export function isOfflineError(error: unknown): boolean {
  // Check navigator.onLine status
  if (typeof window !== 'undefined' && !window.navigator.onLine) {
    return true;
  }
  
  // Check error messages that could indicate network issues
  if (error instanceof Error) {
    const errorMsg = error.message.toLowerCase();
    if (
      errorMsg.includes('network') ||
      errorMsg.includes('offline') ||
      errorMsg.includes('internet') ||
      errorMsg.includes('connection') ||
      errorMsg.includes('timeout') ||
      errorMsg.includes('disconnected')
    ) {
      return true;
    }
  }
  
  return false;
} 