import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * 
 * @param inputs Class values to be merged
 * @returns Merged class string with resolved conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 