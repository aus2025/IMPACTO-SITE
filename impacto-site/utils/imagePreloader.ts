/**
 * A utility for preloading important images to improve performance
 */

/**
 * Preloads an image by creating a new Image object and setting its src
 * 
 * @param src The source URL of the image to preload
 * @returns A promise that resolves when the image is loaded or rejects on error
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve();
    };
    
    img.onerror = () => {
      reject(new Error(`Failed to preload image: ${src}`));
    };
    
    img.src = src;
  });
};

/**
 * Preloads an array of images in parallel
 * 
 * @param sources Array of image source URLs to preload
 * @returns A promise that resolves when all images are loaded
 */
export const preloadImages = async (sources: string[]): Promise<void[]> => {
  try {
    return await Promise.all(sources.map(src => preloadImage(src)));
  } catch (error) {
    console.warn('Error preloading images:', error);
    return [];
  }
};

/**
 * List of critical images to preload for better UX
 * Add the most important images that appear above the fold on key pages
 */
export const criticalImages = [
  '/images/logo.png',
  // Add other critical images
];

/**
 * Initializes preloading of critical images
 * This should be called in the app layout or other appropriate component
 */
export const initImagePreloader = () => {
  if (typeof window !== 'undefined') {
    // Preload after the main content has loaded
    window.addEventListener('load', () => {
      // Use requestIdleCallback if available, otherwise setTimeout
      const preloadFn = window.requestIdleCallback || setTimeout;
      preloadFn(() => {
        preloadImages(criticalImages);
      });
    });
  }
}; 