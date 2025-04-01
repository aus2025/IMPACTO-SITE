/**
 * Utility functions for form handling and data manipulation
 */

/**
 * Ensures that an array value is initialized properly
 * 
 * @param value The value to check and initialize if needed
 * @returns The value as an array
 */
export function ensureArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

/**
 * Safely toggles an item in an array:
 * - Adds the item if it doesn't exist and checked is true
 * - Removes the item if it exists and checked is false
 * 
 * @param array The source array
 * @param item The item to toggle
 * @param checked Whether to add or remove the item
 * @returns A new array with the item added or removed
 */
export function toggleArrayItem<T>(array: T[], item: T, checked: boolean): T[] {
  const currentArray = [...array];
  
  if (checked && !currentArray.includes(item)) {
    return [...currentArray, item];
  }
  
  if (!checked && currentArray.includes(item)) {
    return currentArray.filter(i => i !== item);
  }
  
  return currentArray;
}

/**
 * Formats a date to a localized string
 * 
 * @param date The date to format
 * @param options Formatting options
 * @returns The formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(undefined, options);
}

/**
 * Validates an email address format
 * 
 * @param email The email address to validate
 * @returns Whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number (simple format validation)
 * 
 * @param phone The phone number to validate
 * @returns Whether the phone number is valid
 */
export function isValidPhone(phone: string): boolean {
  // This is a simple validation that ensures the phone has at least 10 digits
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 10;
}

/**
 * Truncates text to a specified length and adds an ellipsis
 * 
 * @param text The text to truncate
 * @param maxLength The maximum length
 * @returns The truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Creates a debounced version of a function
 * 
 * @param func The function to debounce
 * @param wait The wait time in milliseconds
 * @returns The debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
} 