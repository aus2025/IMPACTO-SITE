'use client';

import React from 'react';
import CounterCard from './CounterCard';
import ProgressCircle from './ProgressCircle';
import ProgressBar from './ProgressBar';
import { motion } from 'framer-motion';
import { 
  Users,
  BarChart2,
  DollarSign,
  TrendingUp,
  Clock,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

const StatisticsSection: React.FC = () => {
  // Before & After comparison data
  const comparisonData = [
    { 
      label: 'Productivity', 
      beforeValue: 45, 
      afterValue: 92,
      percentChange: '+104%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Task Completion Time', 
      beforeValue: 85, 
      afterValue: 32,
      percentChange: '-62%',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      isReversed: true
    },
    { 
      label: 'Employee Satisfaction', 
      beforeValue: 62, 
      afterValue: 94,
      percentChange: '+52%',
      icon: <UserCheck className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Error Rate', 
      beforeValue: 28, 
      afterValue: 4,
      percentChange: '-86%',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'from-amber-500 to-amber-600',
      isReversed: true
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Before & After Impact Visualization */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">AI Automation: Before & After Impact</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="col-span-full lg:col-span-2">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
                  <span className="text-gray-700 font-medium">Before Implementation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
                  <span className="text-gray-700 font-medium">After Implementation</span>
                </div>
              </div>
            </div>
            
            {comparisonData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px 0px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{item.label}</h3>
                </div>
                
                <div className="relative mb-6 h-10">
                  {/* Before and After bars */}
                  <div className="absolute h-5 bottom-0 left-0 w-full bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-gray-400 rounded-full"
                      style={{ 
                        width: `${(item.beforeValue / (item.isReversed ? 100 : 100)) * 100}%`,
                        maxWidth: '100%'
                      }}
                    ></div>
                  </div>
                  <div className="absolute h-5 top-0 left-0 w-full bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ 
                        width: `${(item.afterValue / (item.isReversed ? 100 : 100)) * 100}%`, 
                        maxWidth: '100%'
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-500">{item.beforeValue}</span>
                    <span className="text-sm text-gray-500">Before</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className={`text-lg font-bold ${
                      item.percentChange.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.percentChange}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-600">{item.afterValue}</span>
                    <span className="text-sm text-blue-600">After</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Circles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ProgressCircle 
            percentage={96}
            label="Client Satisfaction Rate"
            icon={<Users className="text-blue-700 w-8 h-8" />}
            size={160}
          />
          
          <ProgressCircle 
            percentage={78}
            label="Average Cost Reduction"
            icon={<DollarSign className="text-green-700 w-8 h-8" />}
            size={160}
            primaryColor="#16A34A"
            secondaryColor="#DCFCE7"
          />
          
          <ProgressCircle 
            percentage={91}
            label="Process Optimization"
            icon={<BarChart2 className="text-purple-700 w-8 h-8" />}
            size={160}
            primaryColor="#7E22CE"
            secondaryColor="#F3E8FF"
          />
        </div>

        {/* Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto">
          <ProgressBar 
            percentage={94}
            label="Customer Retention"
            primaryColor="bg-blue-600"
          />
          
          <ProgressBar 
            percentage={82}
            label="Employee Productivity"
            primaryColor="bg-green-600"
            secondaryColor="bg-green-100"
          />
          
          <ProgressBar 
            percentage={68}
            label="Market Expansion"
            primaryColor="bg-amber-600"
            secondaryColor="bg-amber-100"
          />
          
          <ProgressBar 
            percentage={73}
            label="Revenue Growth"
            primaryColor="bg-purple-600"
            secondaryColor="bg-purple-100"
          />
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px 0px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Join hundreds of businesses that have transformed their operations with AI solutions
          </p>
          <motion.a 
            href="https://calendly.com/impactoautomation-ai" 
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button-global"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Your Free Assessment
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection; 