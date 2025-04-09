/**
 * Script optimizer for managing third-party scripts and deferred loading
 */

interface ScriptConfig {
  src: string;
  id?: string;
  async?: boolean;
  defer?: boolean;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  onLoad?: () => void;
  attrs?: Record<string, string>;
}

/**
 * Loads a script dynamically
 * 
 * @param config Script configuration
 * @returns Promise that resolves when the script loads or rejects on error
 */
export const loadScript = (config: ScriptConfig): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Document not available'));
      return;
    }
    
    // Check if script is already loaded
    const existingScript = config.id && document.getElementById(config.id);
    if (existingScript) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = config.src;
    
    if (config.id) script.id = config.id;
    if (config.async) script.async = true;
    if (config.defer) script.defer = true;
    
    // Add custom attributes
    if (config.attrs) {
      Object.entries(config.attrs).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
    }
    
    // Define event handlers
    const handleLoad = () => {
      // Clean up event listeners to prevent memory leaks
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
      
      if (config.onLoad) config.onLoad();
      resolve();
    };
    
    const handleError = () => {
      // Clean up event listeners to prevent memory leaks
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
      
      reject(new Error(`Failed to load script: ${config.src}`));
      // Cleanup failed script
      script.remove();
    };
    
    // Add event listeners
    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);
    
    document.body.appendChild(script);
  });
};

/**
 * Loads a script when the browser is idle
 * 
 * @param config Script configuration 
 */
export const loadScriptOnIdle = (config: ScriptConfig): void => {
  if (typeof window === 'undefined') return;
  
  const requestIdleCallback = 
    window.requestIdleCallback || 
    ((cb) => setTimeout(cb, 1));
  
  requestIdleCallback(() => {
    loadScript(config).catch(err => {
      console.warn('Error loading script:', err);
    });
  });
};

/**
 * Loads a script when the user interacts with the page
 */
export const loadScriptOnInteraction = (config: ScriptConfig): void => {
  if (typeof window === 'undefined') return;
  
  const loadOnInteraction = () => {
    loadScript(config).catch(err => {
      console.warn('Error loading script:', err);
    });
    
    // Remove listeners after loading
    ['mousedown', 'touchstart', 'scroll', 'keydown'].forEach(event => {
      window.removeEventListener(event, loadOnInteraction);
    });
  };
  
  // Add event listeners
  ['mousedown', 'touchstart', 'scroll', 'keydown'].forEach(event => {
    window.addEventListener(event, loadOnInteraction, { once: true, passive: true });
  });
  
  // Fallback: Load after 5 seconds even if no interaction
  setTimeout(loadOnInteraction, 5000);
};

/**
 * Loads a script when the element is in viewport
 * 
 * @param config Script configuration
 * @param targetSelector CSS selector for the target element
 */
export const loadScriptOnVisible = (config: ScriptConfig, targetSelector: string): void => {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    // Fallback if IntersectionObserver is not supported
    loadScriptOnIdle(config);
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadScript(config).catch(err => {
          console.warn('Error loading script:', err);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });
  
  // Start observing the target element
  const target = document.querySelector(targetSelector);
  if (target) {
    observer.observe(target);
  } else {
    // If target doesn't exist, load script when idle
    loadScriptOnIdle(config);
  }
}; 