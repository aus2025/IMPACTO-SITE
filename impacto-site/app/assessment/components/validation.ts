// Validation helper functions for BusinessAssessmentForm

/**
 * Validates if a value is not empty
 */
export function validateRequired(value: string | undefined): boolean {
  return !!value && value.trim().length > 0;
}

/**
 * Validates if a value is a valid email address
 */
export function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

/**
 * Validates if a value is a valid phone number
 * This is a simple validation - for production, consider using a library
 */
export function validatePhone(phone: string): boolean {
  // Allow digits, spaces, parentheses, dashes, and plus sign
  const regex = /^[0-9\s()+\-]+$/;
  return regex.test(phone) && phone.replace(/[^0-9]/g, '').length >= 6;
}

/**
 * Ensure the number of checked items doesn't exceed maxItems
 */
export function validateMaxChecked(items: string[], maxItems: number): boolean {
  return items.length <= maxItems;
} 