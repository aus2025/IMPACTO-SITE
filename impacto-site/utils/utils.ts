/**
 * Utility functions for form handling and data manipulation
 */

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