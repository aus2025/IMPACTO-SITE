'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ProgressBarProps {
  percentage: number;
  label: string;
  duration?: number;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  duration = 2,
  height = 12,
  primaryColor = 'bg-blue-600',
  secondaryColor = 'bg-blue-100',
  className = '',
  showPercentage = true,
}) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      // Start the animation
      const steps = 60; // 60 steps per second
      const stepDuration = (duration * 1000) / steps;
      let currentStep = 0;

      // Create smooth easing function (easeOutExpo)
      const easeOutExpo = (t: number): number => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };

      const interval = setInterval(() => {
        currentStep++;
        const progressRatio = currentStep / steps;
        const easedProgress = easeOutExpo(progressRatio);
        
        setProgress(Math.min(easedProgress * percentage, percentage));
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      // Start the container animation
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.5, 
          ease: [0.23, 1, 0.32, 1]
        }
      });

      return () => clearInterval(interval);
    }
  }, [isInView, percentage, duration, controls]);

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // If reduced motion is preferred, just show the end value
  useEffect(() => {
    if (prefersReducedMotion && isInView) {
      setProgress(percentage);
    }
  }, [prefersReducedMotion, isInView, percentage]);

  return (
    <motion.div 
      ref={ref}
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showPercentage && (
          <span className="text-sm font-medium text-blue-800">{Math.round(progress)}%</span>
        )}
      </div>
      <div 
        className={`w-full rounded-full ${secondaryColor}`}
        style={{ height: `${height}px` }}
      >
        <motion.div
          className={`h-full rounded-full ${primaryColor}`}
          style={{ width: `${progress}%` }}
          initial={{ width: '0%' }}
        />
      </div>
    </motion.div>
  );
};

export default ProgressBar; 