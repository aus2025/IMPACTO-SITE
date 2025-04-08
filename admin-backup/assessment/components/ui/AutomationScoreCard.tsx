'use client';

import { motion } from 'framer-motion';

type AutomationScoreCardProps = {
  score: number;
  benchmarkScore: number;
  industry: string;
};

export default function AutomationScoreCard({ 
  score, 
  benchmarkScore,
  industry 
}: AutomationScoreCardProps) {
  // Map industry keys to readable names
  const industryNames: {[key: string]: string} = {
    healthcare: 'Healthcare',
    financial: 'Financial Services',
    retail: 'Retail & E-commerce',
    manufacturing: 'Manufacturing',
    professional_services: 'Professional Services',
    education: 'Education',
    hospitality: 'Hospitality & Tourism',
    construction: 'Construction',
    technology: 'Technology',
    other: 'Other'
  };

  const industryDisplay = industry ? industryNames[industry] || 'Your Industry' : 'Your Industry';
  
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-red-600';
    if (score < 60) return 'text-yellow-600';
    if (score < 80) return 'text-blue-600';
    return 'text-green-600';
  };
  
  const scoreColor = getScoreColor(score);
  const comparisonText = score > benchmarkScore 
    ? "above industry average" 
    : score === benchmarkScore 
      ? "at industry average" 
      : "below industry average";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Automation Readiness Score</h3>
      
      <div className="flex justify-between items-center mb-3">
        <div className="text-4xl font-bold flex items-baseline">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={scoreColor}
          >
            {score}
          </motion.span>
          <span className="text-sm text-gray-900 ml-1">/100</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-900">Industry Average</div>
          <div className="text-xl font-semibold text-gray-900">{benchmarkScore}/100</div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
        <motion.div 
          className={`h-4 rounded-full ${scoreColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      <p className="text-sm text-gray-900">
        Your automation readiness is <span className="font-medium">{comparisonText}</span> for {industryDisplay}.
      </p>
      
      <div className="flex justify-between mt-5 text-xs text-gray-900">
        <div>Beginning</div>
        <div>Developing</div>
        <div>Advanced</div>
        <div>Optimized</div>
      </div>
    </div>
  );
} 