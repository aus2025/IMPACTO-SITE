'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ProgressCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  duration?: number;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
  icon?: React.ReactNode;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  label,
  duration = 2,
  primaryColor = '#1D4ED8', // blue-700
  secondaryColor = '#DBEAFE', // blue-100
  className = '',
  icon,
}) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });
  const controls = useAnimation();

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

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
        scale: 1,
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
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={controls}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={secondaryColor}
            strokeWidth={strokeWidth}
          />
          {/* Foreground progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={primaryColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Percentage text */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ fontSize: size / 4 }}
        >
          {icon ? (
            <div className="mb-1">{icon}</div>
          ) : (
            <span className="font-bold text-blue-800">{Math.round(progress)}%</span>
          )}
        </div>
      </div>
      <p className="mt-4 text-center font-medium text-gray-700">{label}</p>
    </motion.div>
  );
};

export default ProgressCircle; 