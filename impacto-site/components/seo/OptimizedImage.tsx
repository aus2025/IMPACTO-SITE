import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ImagePlaceholder from './ImagePlaceholder';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty' | 'custom'; 
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 90,
  priority = false,
  className,
  fill = false,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  loading = 'lazy',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);

  // Provide reasonable default sizes if fill is true and no sizes provided
  const imageSizes = fill && !sizes 
    ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' 
    : sizes;

  // For accessibility, ensure alt text is always present
  const imageAlt = alt || 'Image';

  // Generate a simple blur data URL if not provided
  const defaultBlurDataURL = blurDataURL || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

  // Handle image load event
  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Handle image error event
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Common props for both fill and non-fill cases
  const commonProps = {
    src,
    alt: imageAlt,
    quality,
    priority,
    loading: priority ? 'eager' : loading,
    onLoad: handleImageLoad,
    onError: handleImageError,
    className: cn(
      'transition-opacity duration-300',
      isLoading ? 'opacity-0' : 'opacity-100',
      className
    ),
    placeholder: placeholder === 'blur' ? 'blur' : undefined,
    blurDataURL: placeholder === 'blur' ? defaultBlurDataURL : undefined,
  };

  // Show placeholder while loading
  const showPlaceholder = (isLoading && placeholder !== 'blur') || hasError;

  // Return different Image component based on fill prop
  if (fill) {
    return (
      <div className={cn('relative', className)}>
        {showPlaceholder && (
          <ImagePlaceholder 
            className={cn('absolute inset-0 z-0', className)}
          />
        )}
        <Image
          {...commonProps}
          fill
          sizes={imageSizes}
          className={cn('object-cover z-10', className)}
        />
      </div>
    );
  }

  // If not fill mode, width and height are required
  if (!width || !height) {
    console.warn('OptimizedImage: width and height props are required when fill is false');
    return null;
  }

  return (
    <div className={cn('relative inline-block', className)} style={{ width, height }}>
      {showPlaceholder && (
        <ImagePlaceholder 
          width={width}
          height={height}
          className={cn('absolute inset-0 z-0')}
        />
      )}
      <Image
        {...commonProps}
        width={width}
        height={height}
        sizes={imageSizes}
        className={cn('z-10 relative', className)}
      />
    </div>
  );
} 