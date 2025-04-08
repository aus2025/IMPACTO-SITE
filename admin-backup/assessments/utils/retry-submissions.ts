/**
 * Utility to retry submitting pending business assessments
 */

import { createBrowserClient } from '@supabase/ssr';
import { 
  getPendingSubmissions, 
  removePendingSubmission 
} from './local-storage';

/**
 * Attempt to submit all pending assessments stored in localStorage
 * @returns Object containing counts of successful and failed submissions
 */
export async function retryPendingSubmissions() {
  const pendingSubmissions = getPendingSubmissions();
  
  if (pendingSubmissions.length === 0) {
    return { successful: 0, failed: 0, remaining: 0 };
  }
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  let successCount = 0;
  let failCount = 0;
  
  // Process each pending submission
  for (let i = 0; i < pendingSubmissions.length; i++) {
    const submission = pendingSubmissions[i];
    
    // Remove the timestamp property we added
    if (submission._pendingTimestamp) {
      delete submission._pendingTimestamp;
    }
    
    try {
      // Attempt to insert the data
      const { error } = await supabase
        .from('business_assessments')
        .insert([submission]);
      
      if (error) {
        console.error(`Failed to submit pending assessment ${i}:`, error);
        failCount++;
        continue;
      }
      
      // If successful, remove from pending list
      removePendingSubmission(i);
      successCount++;
      
      // Adjust the index since we removed an item
      i--;
    } catch (error) {
      console.error(`Error submitting pending assessment ${i}:`, error);
      failCount++;
    }
  }
  
  // Get the updated count of remaining submissions
  const remainingCount = getPendingSubmissions().length;
  
  return {
    successful: successCount,
    failed: failCount,
    remaining: remainingCount
  };
}

/**
 * Add an automatic retry mechanism to try submitting pending assessments
 * when the page loads
 */
export function setupAutomaticRetry() {
  if (typeof window !== 'undefined') {
    // Wait until the page is fully loaded and idle
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        retryPendingSubmissions()
          .then(result => {
            if (result.successful > 0) {
              console.log(`Successfully submitted ${result.successful} pending assessments.`);
            }
            if (result.failed > 0) {
              console.log(`Failed to submit ${result.failed} pending assessments.`);
            }
          })
          .catch(error => {
            console.error('Error during automatic retry:', error);
          });
      });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(() => {
        retryPendingSubmissions()
          .then(result => {
            if (result.successful > 0) {
              console.log(`Successfully submitted ${result.successful} pending assessments.`);
            }
            if (result.failed > 0) {
              console.log(`Failed to submit ${result.failed} pending assessments.`);
            }
          })
          .catch(error => {
            console.error('Error during automatic retry:', error);
          });
      }, 5000); // Wait 5 seconds after page load
    }
  }
} 