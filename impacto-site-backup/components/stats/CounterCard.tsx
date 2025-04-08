'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface CounterCardProps {
  endValue: number;
  label: string;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

const CounterCard: React.FC<CounterCardProps> = ({
  endValue,
  label,
  icon,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
  decimals = 0,
}) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });
  const controls = useAnimation();

  // Format the number with commas and decimal places
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

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
        const progress = currentStep / steps;
        const easedProgress = easeOutExpo(progress);
        
        setCount(Math.min(easedProgress * endValue, endValue));
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      // Start the card animation
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
  }, [isInView, endValue, duration, controls]);

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // If reduced motion is preferred, just show the end value
  useEffect(() => {
    if (prefersReducedMotion && isInView) {
      setCount(endValue);
    }
  }, [prefersReducedMotion, isInView, endValue]);

  return (
    <motion.div
      ref={ref}
      className={`bg-white rounded-xl shadow-sm p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-4xl font-bold mb-2 text-blue-800">
        {prefix}{formatNumber(count)}{suffix}
      </h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

export default CounterCard; 