/**
 * Local storage utilities for business assessment form data
 * Provides a fallback mechanism in case the database submission fails
 */

// Key for storing assessment data
const ASSESSMENT_STORAGE_KEY = 'impacto_business_assessment_data';
const PENDING_SUBMISSIONS_KEY = 'impacto_pending_assessment_submissions';

/**
 * Save form data to local storage
 * @param formData The form data to save
 */
export function saveFormToLocalStorage(formData: Record<string, any>) {
  try {
    localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(formData));
    console.log('Form data saved to local storage');
    return true;
  } catch (error) {
    console.error('Error saving form data to local storage:', error);
    return false;
  }
}

/**
 * Retrieve form data from local storage
 * @returns The stored form data or null if not found
 */
export function getFormFromLocalStorage(): Record<string, any> | null {
  try {
    const storedData = localStorage.getItem(ASSESSMENT_STORAGE_KEY);
    if (!storedData) return null;
    
    return JSON.parse(storedData);
  } catch (error) {
    console.error('Error retrieving form data from local storage:', error);
    return null;
  }
}

/**
 * Clear form data from local storage
 */
export function clearFormLocalStorage() {
  try {
    localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing form data from local storage:', error);
    return false;
  }
}

/**
 * Add a pending submission to the queue
 * @param submissionData The data that failed to submit
 */
export function addPendingSubmission(submissionData: Record<string, any>) {
  try {
    // Get existing pending submissions
    const pendingSubmissionsStr = localStorage.getItem(PENDING_SUBMISSIONS_KEY);
    const pendingSubmissions = pendingSubmissionsStr 
      ? JSON.parse(pendingSubmissionsStr) as Record<string, any>[]
      : [];
    
    // Add this submission with a timestamp
    pendingSubmissions.push({
      ...submissionData,
      _pendingTimestamp: new Date().toISOString()
    });
    
    // Save back to local storage
    localStorage.setItem(PENDING_SUBMISSIONS_KEY, JSON.stringify(pendingSubmissions));
    
    console.log('Added submission to pending queue');
    return true;
  } catch (error) {
    console.error('Error adding to pending submissions:', error);
    return false;
  }
}

/**
 * Get all pending submissions
 * @returns Array of pending submissions
 */
export function getPendingSubmissions(): Record<string, any>[] {
  try {
    const pendingSubmissionsStr = localStorage.getItem(PENDING_SUBMISSIONS_KEY);
    if (!pendingSubmissionsStr) return [];
    
    return JSON.parse(pendingSubmissionsStr);
  } catch (error) {
    console.error('Error retrieving pending submissions:', error);
    return [];
  }
}

/**
 * Remove a specific pending submission
 * @param index The index of the submission to remove
 */
export function removePendingSubmission(index: number): boolean {
  try {
    const pendingSubmissions = getPendingSubmissions();
    if (index < 0 || index >= pendingSubmissions.length) return false;
    
    pendingSubmissions.splice(index, 1);
    localStorage.setItem(PENDING_SUBMISSIONS_KEY, JSON.stringify(pendingSubmissions));
    return true;
  } catch (error) {
    console.error('Error removing pending submission:', error);
    return false;
  }
}

/**
 * Clear all pending submissions
 */
export function clearPendingSubmissions(): boolean {
  try {
    localStorage.removeItem(PENDING_SUBMISSIONS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing pending submissions:', error);
    return false;
  }
} 