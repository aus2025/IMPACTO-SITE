/**
 * Performance monitoring utilities to measure and track core web vitals and other metrics
 */

interface PerformanceMetrics {
  FCP?: number;   // First Contentful Paint
  LCP?: number;   // Largest Contentful Paint
  FID?: number;   // First Input Delay
  CLS?: number;   // Cumulative Layout Shift
  TTFB?: number;  // Time to First Byte
  TTI?: number;   // Time to Interactive
}

/**
 * Initialize performance monitoring
 * This captures web vitals and other performance metrics
 */
export const initPerformanceMonitor = (): void => {
  if (
    typeof window === 'undefined' || 
    !window.performance || 
    process.env.NODE_ENV === 'development'
  ) {
    return;
  }

  // Store metrics
  const metrics: PerformanceMetrics = {};

  // Observe Time to First Byte (TTFB)
  if (performance.getEntriesByType('navigation').length > 0) {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    metrics.TTFB = navigationEntry.responseStart;
  }

  // Observe First Contentful Paint (FCP)
  const observeFCP = (): void => {
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    
    if (fcpEntry) {
      metrics.FCP = fcpEntry.startTime;
      reportMetrics(metrics);
    }
  };

  // Observe Largest Contentful Paint (LCP)
  const observeLCP = (): void => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        metrics.LCP = lastEntry.startTime;
        reportMetrics(metrics);
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  };

  // Observe First Input Delay (FID)
  const observeFID = (): void => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const firstEntry = entries[0];
      
      if (firstEntry) {
        metrics.FID = firstEntry.processingStart - firstEntry.startTime;
        reportMetrics(metrics);
      }
    }).observe({ type: 'first-input', buffered: true });
  };

  // Observe Cumulative Layout Shift (CLS)
  const observeCLS = (): void => {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];
    let sessionValue = 0;
    let sessionEntries: PerformanceEntry[] = [];
    let initialized = false;

    const entryHandler = (entries: PerformanceEntry[]): void => {
      entries.forEach(entry => {
        // Only count layout shifts without recent user input
        if (
          !entry.hadRecentInput && 
          entry instanceof PerformanceLayoutShift
        ) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
          
          // If the entry occurred less than 1 second after the previous entry
          // and less than 5 seconds after the first entry, include it in the session
          if (
            sessionValue > 0 &&
            entry.startTime - lastSessionEntry.startTime < 1000 &&
            entry.startTime - firstSessionEntry.startTime < 5000
          ) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }
          
          // If the current session value is larger than the CLS value, update it
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            clsEntries = sessionEntries;
            
            metrics.CLS = clsValue;
            reportMetrics(metrics);
          }
        }
      });
    };
    
    const observer = new PerformanceObserver(entryList => {
      if (!initialized) {
        initialized = true;
      }
      entryHandler(entryList.getEntries());
    });
    
    observer.observe({ type: 'layout-shift', buffered: true });
  };

  // Report collected metrics
  // In a real app, you might send this to an analytics service
  const reportMetrics = (metrics: PerformanceMetrics): void => {
    // For now, just log to console in production
    if (process.env.NODE_ENV === 'production') {
      console.log('Performance metrics:', metrics);
      
      // Here you would typically send metrics to analytics
      // Example: sendToAnalytics(metrics);
    }
  };

  // Initialize observers when the page is fully loaded
  window.addEventListener('load', () => {
    // Use requestIdleCallback to avoid impacting page performance
    const requestIdleCallback = window.requestIdleCallback || 
      ((cb) => setTimeout(cb, 1));
    
    requestIdleCallback(() => {
      observeFCP();
      observeLCP();
      observeFID();
      observeCLS();
    });
  });
};

/**
 * Mark a performance timestamp for custom measurements
 * 
 * @param markName Name of the performance mark
 */
export const markPerformance = (markName: string): void => {
  if (typeof performance === 'undefined') return;
  performance.mark(markName);
};

/**
 * Measure time between two performance marks
 * 
 * @param measureName Name for the performance measure
 * @param startMarkName Name of the starting mark
 * @param endMarkName Name of the ending mark (optional, defaults to now)
 */
export const measurePerformance = (
  measureName: string,
  startMarkName: string,
  endMarkName?: string
): PerformanceMeasure | undefined => {
  if (typeof performance === 'undefined') return;
  
  try {
    return performance.measure(measureName, startMarkName, endMarkName);
  } catch (e) {
    console.error('Error measuring performance:', e);
    return undefined;
  }
}; 