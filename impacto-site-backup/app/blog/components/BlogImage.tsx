'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function BlogImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  className = '',
  priority = false,
}: BlogImageProps) {
  // Convert any jpg paths to svg paths
  const modifiedSrc = src.replace(/\.jpg$/, '.svg');
  
  // Use default image if it doesn't match our blog pattern
  const [imgSrc, setImgSrc] = useState(() => {
    // If it's a blog image path, use SVG extension
    if (src.includes('/images/blog/') && src.match(/blog-\d+/)) {
      return modifiedSrc;
    }
    return src;
  });
  
  const handleError = () => {
    // Only handle errors for blog images
    if (imgSrc.includes('/images/blog/')) {
      setImgSrc('/images/blog/default.svg');
    }
  };
  
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={handleError}
    />
  );
} 