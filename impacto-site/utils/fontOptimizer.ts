/**
 * Font loading optimization utilities
 */

type FontDisplay = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

interface FontDefinition {
  family: string;
  url: string;
  weight?: string | number;
  style?: string;
  display?: FontDisplay;
}

/**
 * Preloads a font by adding a preload link to the document head
 * 
 * @param font The font definition to preload
 */
export const preloadFont = (font: FontDefinition): void => {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = font.url;
  link.as = 'font';
  link.type = 'font/woff2'; // Update this if using a different font format
  link.crossOrigin = 'anonymous';
  
  document.head.appendChild(link);
};

/**
 * Adds a stylesheet for a font to control its loading behavior
 * 
 * @param font The font definition to load
 */
export const loadFont = (font: FontDefinition): void => {
  if (typeof document === 'undefined') return;
  
  const style = document.createElement('style');
  const display = font.display || 'swap';
  const weight = font.weight || 400;
  const fontStyle = font.style || 'normal';
  
  style.textContent = `
    @font-face {
      font-family: '${font.family}';
      font-style: ${fontStyle};
      font-weight: ${weight};
      font-display: ${display};
      src: url(${font.url}) format('woff2');
    }
  `;
  
  document.head.appendChild(style);
};

/**
 * List of critical fonts to preload
 */
export const criticalFonts: FontDefinition[] = [
  // Add your critical fonts here
  // Example:
  // { family: 'Inter', url: '/fonts/inter-var.woff2', display: 'swap' }
];

/**
 * Initialize font optimization
 */
export const initFontOptimizer = (): void => {
  if (typeof window === 'undefined') return;
  
  // Preload critical fonts
  criticalFonts.forEach(preloadFont);
  
  // Load fonts with proper font-display settings
  window.addEventListener('load', () => {
    criticalFonts.forEach(loadFont);
  });
}; 