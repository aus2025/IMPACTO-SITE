'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  const timelineRef = useRef(null);
  
  // Auto-advance the active step every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 3 ? 0 : prev + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: "Discovery & Analysis",
      description: "We dive into your business to find inefficiencies and opportunities for automation. This thorough analysis lets us understand your workflows and where AI can help the most.",
      additionalInfo: "Comprehensive analysis of your current processes to identify the best automation opportunities.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V16" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3H21V9" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14L21 3" />
        </svg>
      ),
      color: "bg-blue-100 border-blue-300",
      activeBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Solution Design",
      description: "We craft a custom AI automation strategy tailored to your needs. Our team selects the best tools and approaches so the solution fits your business perfectly.",
      additionalInfo: "Custom tailored solution design using the right tools for your specific business needs.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21V12M12 12V3M12 12H21M12 12H3" />
        </svg>
      ),
      color: "bg-purple-100 border-purple-300",
      activeBgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Implementation & Integration",
      description: "We build and implement your AI solutions, seamlessly integrating them with your existing systems. We also train your team to ensure smooth adoption and immediate value.",
      additionalInfo: "Seamless integration with your existing systems and thorough team training for easy adoption.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V15" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16L17 11M17 11H13M17 11V15" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16L7 11M7 11H11M7 11V15" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V3" />
        </svg>
      ),
      color: "bg-green-100 border-green-300",
      activeBgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Optimization & Growth",
      description: "After launch, we continuously monitor performance and refine your automation processes. This ongoing optimization guarantees you keep improving and achieving even better ROI over time.",
      additionalInfo: "Continuous performance monitoring and refinement to maximize your ROI over time.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21L12 12M12 12L21 3M12 12L21 21M12 12L3 3" />
        </svg>
      ),
      color: "bg-amber-100 border-amber-300",
      activeBgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  const metrics = [
    {
      value: "+60%",
      label: "Increased Productivity",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8V16M8 12H16" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"></circle>
        </svg>
      ),
    },
    {
      value: "-85%",
      label: "Error Reduction",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V10" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 20V4" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 20V16" />
        </svg>
      ),
    },
    {
      value: "3-6 Months",
      label: "ROI Timeline",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6H21" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12H21" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 18H21" />
        </svg>
      ),
    },
  ];

  return (
    <section className="pt-16 pb-0 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our 4-Step Automation Method
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-800 max-w-3xl mx-auto">
            Our proven process delivers transformative results for your business with a clear path to success.
          </p>
        </div>

        <div className="timeline-container" ref={timelineRef}>
          <div className="relative">
            {/* Timeline steps */}
            <div className="timeline-steps">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`timeline-step ${index === activeStep ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start mb-28 relative">
                    <div className="timeline-point-container relative">
                      <div className={`timeline-point ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}>
                        <span className="step-number text-gray-900">{index + 1}</span>
                      </div>
                      
                      {/* Dashed line connecting the circles */}
                      {index < steps.length - 1 && (
                        <div className="timeline-connector">
                          <div className="dashed-line" style={{ 
                            opacity: index < activeStep ? 1 : 0.3
                          }}></div>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-8 md:ml-16 flex-1">
                      {/* Animated floating box containing all content */}
                      <div 
                        className={`
                          p-6 rounded-lg border transition-all duration-500
                          ${index === activeStep ? step.activeBgColor + ' border-' + step.iconColor.replace('text-', '') : 'bg-white border-gray-200'}
                          ${index === activeStep ? 'opacity-100 shadow-lg' : 'opacity-80 shadow-sm'}
                          animate-float
                        `}
                        style={{
                          animation: index === activeStep ? 'float 3s ease-in-out infinite' : 'none',
                        }}
                      >
                        <div className="flex items-center mb-3">
                          <div className={`${index === activeStep ? step.iconColor : 'text-gray-500'}`}>
                            {step.icon}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold ml-3 text-gray-900">{step.title}</h3>
                        </div>
                        
                        <p className="text-gray-800 mb-4">{step.description}</p>
                        
                        {index === activeStep && (
                          <div className={`mt-4 pt-4 border-t ${step.color.replace('bg-', 'border-')}`}>
                            <p className="text-gray-700 font-medium">
                              {step.additionalInfo}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add the floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
            box-shadow: 0 5px 15px 0px rgba(0,0,0,0.1);
          }
          50% {
            transform: translateY(-10px);
            box-shadow: 0 15px 20px 0px rgba(0,0,0,0.15);
          }
          100% {
            transform: translateY(0px);
            box-shadow: 0 5px 15px 0px rgba(0,0,0,0.1);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .timeline-point {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: white;
          border: 2px solid #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
          transition: all 0.3s ease;
        }
        .timeline-point.active {
          background-color: #3b82f6;
          color: white;
        }
        .timeline-point.completed {
          background-color: #3b82f6;
          color: white;
        }
        .timeline-point .step-number {
          font-weight: bold;
        }
        .timeline-point.active .step-number {
          color: white;
        }
        .timeline-point.completed .step-number {
          color: white;
        }
        .timeline-point-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .timeline-connector {
          position: absolute;
          top: 36px;
          left: 50%;
          transform: translateX(-50%);
          height: 275px;
          width: 2px;
        }
        .dashed-line {
          border-left: 2px dashed #3b82f6;
          height: 100%;
          width: 0;
          position: absolute;
          transition: opacity 0.5s ease;
        }
        .timeline-steps .timeline-step:last-child .timeline-connector {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProcessTimeline; 