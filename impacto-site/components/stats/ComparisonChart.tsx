'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ComparisonDataItem {
  label: string;
  beforeValue: number;
  afterValue: number;
}

interface ComparisonChartProps {
  title?: string;
  data: ComparisonDataItem[];
  duration?: number;
  className?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeColor?: string;
  afterColor?: string;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  title = 'Before & After Comparison',
  data,
  duration = 2,
  className = '',
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeColor = 'bg-gray-400',
  afterColor = 'bg-blue-600',
}) => {
  const [animatedData, setAnimatedData] = useState<ComparisonDataItem[]>(
    data.map(item => ({ ...item, beforeValue: 0, afterValue: 0 }))
  );
  
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });
  const controls = useAnimation();

  // Find the maximum value to normalize bars
  const maxValue = Math.max(
    ...data.map(item => Math.max(item.beforeValue, item.afterValue))
  );

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
        
        setAnimatedData(
          data.map(item => ({
            ...item,
            beforeValue: Math.min(easedProgress * item.beforeValue, item.beforeValue),
            afterValue: Math.min(easedProgress * item.afterValue, item.afterValue),
          }))
        );
        
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
  }, [isInView, data, duration, controls]);

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // If reduced motion is preferred, just show the final values
  useEffect(() => {
    if (prefersReducedMotion && isInView) {
      setAnimatedData(data);
    }
  }, [prefersReducedMotion, isInView, data]);

  return (
    <motion.div
      ref={ref}
      className={`bg-white rounded-xl shadow-sm p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      {title && <h3 className="text-xl font-semibold mb-6">{title}</h3>}
      
      {/* Legend */}
      <div className="flex items-center justify-end mb-6 space-x-6">
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded ${beforeColor} mr-2`}></div>
          <span className="text-sm text-gray-600">{beforeLabel}</span>
        </div>
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded ${afterColor} mr-2`}></div>
          <span className="text-sm text-gray-600">{afterLabel}</span>
        </div>
      </div>
      
      {/* Bars */}
      <div className="space-y-6">
        {animatedData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <div className="flex space-x-4">
                <span className="text-sm font-medium text-gray-500">{Math.round(item.beforeValue)}</span>
                <span className="text-sm font-medium text-blue-600">{Math.round(item.afterValue)}</span>
              </div>
            </div>
            <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
              {/* Before bar */}
              <motion.div
                className={`absolute top-0 left-0 h-full ${beforeColor} rounded-l-full`}
                style={{ width: `${(item.beforeValue / maxValue) * 100}%` }}
                initial={{ width: '0%' }}
              />
              {/* After bar */}
              <motion.div
                className={`absolute top-0 left-0 h-full ${afterColor} rounded-l-full`}
                style={{ 
                  width: `${(item.afterValue / maxValue) * 100}%`,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                  opacity: 0.85
                }}
                initial={{ width: '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Axis line */}
      <div className="w-full h-px bg-gray-200 my-4"></div>
      
      {/* Percentage improvement annotation */}
      <div className="space-y-3 mt-4">
        {animatedData.map((item, index) => {
          const improvement = item.afterValue - item.beforeValue;
          const percentImprovement = item.beforeValue > 0 
            ? Math.round((improvement / item.beforeValue) * 100) 
            : 0;
          
          return (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{item.label}</span>
              <span className={percentImprovement > 0 ? 'text-green-600' : 'text-red-600'}>
                {percentImprovement > 0 ? '+' : ''}{percentImprovement}%
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ComparisonChart; 