'use client';

import React, { useEffect, useRef, useState } from 'react';

type MermaidProps = {
  chart: string;
  className?: string;
  config?: any;
  onError?: (error: Error) => void;
};

/**
 * A component that renders Mermaid diagrams
 * 
 * @param chart - The Mermaid diagram syntax to render
 * @param className - Optional CSS class name for styling the container
 * @param config - Optional Mermaid configuration object
 * @param onError - Optional error handler function
 */
export default function Mermaid({ chart, className = '', config = {}, onError }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Only run client-side
    if (typeof window === 'undefined') return;
    
    // Reset state when chart changes
    setLoading(true);
    setError(null);
    setSvg('');

    const renderDiagram = async () => {
      try {
        // Dynamically import mermaid
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;

        // Initialize mermaid with default config and any user-provided overrides
        const defaultConfig = {
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'neutral',
        };

        mermaid.initialize({
          ...defaultConfig,
          ...config,
        });

        // Generate SVG
        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${Date.now()}`, // Unique ID for the diagram
          chart
        );

        // Set the SVG content
        setSvg(renderedSvg);
      } catch (err) {
        console.error('Error rendering Mermaid diagram:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        if (onError) {
          onError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        setLoading(false);
      }
    };

    renderDiagram();
  }, [chart, config, onError]);

  if (loading) {
    return (
      <div className={`mermaid-container ${className}`}>
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`mermaid-error ${className} p-4 border border-red-300 bg-red-50 text-red-800 rounded`}>
        <h3 className="text-lg font-medium mb-2">Error rendering diagram</h3>
        <pre className="text-sm overflow-auto">{error.message}</pre>
        <div className="mt-3 p-3 bg-gray-100 rounded">
          <h4 className="text-sm font-medium mb-1">Diagram code:</h4>
          <pre className="text-xs overflow-auto whitespace-pre-wrap">{chart}</pre>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`mermaid-container ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/**
 * Example usage:
 * 
 * import Mermaid from '@/components/Mermaid';
 * 
 * // In your component:
 * const diagram = `
 *   graph TD
 *     A[Client] --> B[Server]
 *     B --> C[Database]
 * `;
 * 
 * return <Mermaid chart={diagram} />;
 */ 