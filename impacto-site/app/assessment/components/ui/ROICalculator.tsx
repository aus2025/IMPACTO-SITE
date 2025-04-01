'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type ROICalculatorProps = {
  timeSavings: number; // percentage of time that could be saved
  costSavings: number; // percentage of cost that could be saved
  industry: string;
  employees: string;
};

export default function ROICalculator({ 
  timeSavings, 
  costSavings,
  industry,
  employees 
}: ROICalculatorProps) {
  // State for estimated values
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [annualSavings, setAnnualSavings] = useState(0);
  
  // Industry-specific hourly rates
  const hourlyRates: {[key: string]: number} = {
    healthcare: 35,
    financial: 45,
    retail: 25,
    manufacturing: 30,
    professional_services: 50,
    education: 28,
    hospitality: 22,
    construction: 32,
    technology: 55,
    other: 35
  };
  
  // Employee count to number of employees mapping
  const employeeCountMap: {[key: string]: number} = {
    '1-10': 5,
    '11-50': 30,
    '51-200': 125,
    '201-500': 350,
    '501-1000': 750,
    '1000+': 1500,
  };
  
  // Calculate weekly hours and annual savings
  useEffect(() => {
    // Base calculations on employee count
    const numberOfEmployees = employeeCountMap[employees] || 50;
    
    // Assume each employee spends X hours on manual processes
    const manualProcessHoursPerWeek = 10;
    
    // Calculate total hours spent on manual processes
    const totalManualHours = numberOfEmployees * manualProcessHoursPerWeek;
    
    // Apply time savings percentage
    const savedHours = Math.round(totalManualHours * (timeSavings / 100));
    setWeeklyHours(savedHours);
    
    // Calculate annual cost savings based on hourly rate for the industry
    const hourlyRate = hourlyRates[industry] || 35;
    const weeklySavings = savedHours * hourlyRate;
    const annualSavingsEstimate = Math.round(weeklySavings * 52); // 52 weeks in a year
    
    // Adjust with the cost savings percentage
    const adjustedAnnualSavings = Math.round(annualSavingsEstimate * (costSavings / 100));
    setAnnualSavings(adjustedAnnualSavings);
  }, [timeSavings, costSavings, industry, employees]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Potential Automation ROI</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-600">Time Savings</span>
            <span className="text-sm font-semibold text-blue-600">{timeSavings}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${timeSavings}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Approximately <span className="font-semibold">{weeklyHours} hours/week</span> saved across your organization
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-600">Cost Efficiency</span>
            <span className="text-sm font-semibold text-green-600">{costSavings}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-green-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${costSavings}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="text-sm text-gray-600 mb-2">Estimated Annual Savings:</div>
          <motion.div 
            className="text-3xl font-bold text-green-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {formatCurrency(annualSavings)}
          </motion.div>
          <div className="text-xs text-gray-500 mt-1">
            Based on industry averages and your company size
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mt-4">
          <p>This ROI calculator provides an estimate based on industry benchmarks and the information you've provided. Actual results may vary based on your specific business processes and implementation strategy.</p>
        </div>
      </div>
    </div>
  );
} 