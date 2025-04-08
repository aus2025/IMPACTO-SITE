import dynamic from 'next/dynamic';
import React, { Suspense, ComponentType, ReactNode } from 'react';

interface DynamicImportProps {
  /** Component to load dynamically */
  importFn: () => Promise<{ default: ComponentType<any> }>;
  /** Props to pass to the loaded component */
  componentProps?: Record<string, any>;
  /** Loading component to show while the main component is loading */
  loading?: ReactNode;
  /** Whether to use Suspense for loading */
  useSuspense?: boolean;
  /** Prefetch the component in advance */
  prefetch?: boolean;
  /** Minimum loading time in ms (useful to prevent layout shifts) */
  minimumLoadingTime?: number;
}

/**
 * Higher-order component for dynamically importing components
 * 
 * @param importFn Function that imports the component
 * @param options Options for dynamic loading
 * @returns Dynamically imported component
 */
export const createDynamicComponent = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: {
    ssr?: boolean;
    loading?: ComponentType;
    prefetch?: boolean;
  } = {}
) => {
  return dynamic(importFn, {
    loading: options.loading,
    ssr: options.ssr ?? false,
    ...options,
  });
};

/**
 * Component for dynamically importing and rendering components
 */
export default function DynamicImport({
  importFn,
  componentProps = {},
  loading = <div className="w-full h-64 animate-pulse bg-gray-200 rounded-md" />,
  useSuspense = false,
  prefetch = false,
  minimumLoadingTime = 0,
}: DynamicImportProps) {
  // Use minimumLoadingTime to prevent flashes of loading state
  const [Component, setComponent] = React.useState<ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    
    const loadStartTime = Date.now();
    
    const loadComponent = async () => {
      try {
        const module = await importFn();
        
        if (isMounted) {
          const loadEndTime = Date.now();
          const loadDuration = loadEndTime - loadStartTime;
          
          // If minimumLoadingTime is set, ensure loading state shows for at least that duration
          if (minimumLoadingTime && loadDuration < minimumLoadingTime) {
            timer.current = setTimeout(() => {
              setComponent(() => module.default);
              setIsLoading(false);
            }, minimumLoadingTime - loadDuration);
          } else {
            setComponent(() => module.default);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error loading dynamic component:', error);
        setIsLoading(false);
      }
    };
    
    loadComponent();
    
    return () => {
      isMounted = false;
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [importFn, minimumLoadingTime]);
  
  // Prefetch in advance if specified
  React.useEffect(() => {
    if (prefetch && typeof window !== 'undefined') {
      // Use requestIdleCallback if available or setTimeout as fallback
      const requestIdleCallback = window.requestIdleCallback || setTimeout;
      requestIdleCallback(() => {
        importFn();
      });
    }
  }, [importFn, prefetch]);
  
  // If using Suspense, render with Suspense
  if (useSuspense) {
    const DynamicComponentWithSuspense = dynamic(importFn, {
      suspense: true,
      ssr: false,
    });
    
    return (
      <Suspense fallback={loading}>
        <DynamicComponentWithSuspense {...componentProps} />
      </Suspense>
    );
  }
  
  // Otherwise, manage loading state manually
  if (isLoading || !Component) {
    return <>{loading}</>;
  }
  
  return <Component {...componentProps} />;
} 