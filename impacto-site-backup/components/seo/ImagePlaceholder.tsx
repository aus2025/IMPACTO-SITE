import React from 'react';
import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  animate?: boolean;
}

export default function ImagePlaceholder({
  className,
  width = '100%',
  height = '100%',
  backgroundColor = '#f3f4f6',
  animate = true,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        animate && 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
        className
      )}
      style={{
        width,
        height,
        backgroundColor,
      }}
      aria-hidden="true"
    />
  );
} 