'use client'

import React, { useState, useEffect } from 'react';
import { CheckCircle, Zap, TrendingUp, Award, ChevronRight } from 'lucide-react';

// Add type declaration for gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params: any) => void;
  }
}

interface AssessmentResultsProps {
  automationScore: number;
  assessmentData?: any; // Add specific type based on your data structure
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  automationScore: initialScore,
  assessmentData
}) => {
  const [automationScore, setAutomationScore] = useState(initialScore || 65);
  const [animateGraph, setAnimateGraph] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [activeTab, setActiveTab] = useState('result');
  
  // Determine recommended plan based on automation score
  const getRecommendedPlan = () => {
    if (automationScore < 40) return 'kickstart';
    if (automationScore < 75) return 'growth';
    return 'scale';
  };
  
  const recommendedPlan = getRecommendedPlan();
  const customerName = assessmentData?.name || '';

  useEffect(() => {
    // Update score if prop changes
    if (initialScore !== automationScore) {
      setAutomationScore(initialScore);
    }
    
    // Trigger animations sequentially
    setTimeout(() => setAnimateGraph(true), 500);
    setTimeout(() => setShowRecommendation(true), 1500);
    
    // Track view of results page
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_assessment_results', {
        score: automationScore,
        recommended_plan: getRecommendedPlan(),
        category: automationScore < 40 ? 'Automation Explorer' : 
                 automationScore < 75 ? 'Automation Builder' : 
                 'Automation Innovator'
      });
    }
  }, [initialScore, automationScore]);

  // Track CTA clicks
  const trackCTAClick = (planName: string, action: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'assessment_cta_click', {
        plan: planName,
        action: action,
        score: automationScore
      });
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full px-4 py-1 mb-4">
          <CheckCircle className="mr-2 h-5 w-5" />
          <span>Assessment Completed Successfully</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Your Automation Blueprint</h1>
        <p className="text-gray-600 mt-2">Based on your responses, we've analyzed your automation readiness</p>
      </div>

      <div className="flex mb-6 border-b">
        <button 
          onClick={() => setActiveTab('result')}
          className={`pb-2 px-4 font-medium ${activeTab === 'result' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Your Results
        </button>
        <button 
          onClick={() => setActiveTab('recommendation')}
          className={`pb-2 px-4 font-medium ${activeTab === 'recommendation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Recommended Plan
        </button>
        <button 
          onClick={() => setActiveTab('comparison')}
          className={`pb-2 px-4 font-medium ${activeTab === 'comparison' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Plan Comparison
        </button>
      </div>

      {activeTab === 'result' && (
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Automation Score: {automationScore}%</h2>
            
            <div className="relative h-14 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div 
                className={`absolute left-0 top-0 h-full ${
                  automationScore < 40 
                    ? 'bg-blue-500' 
                    : automationScore < 75 
                    ? 'bg-purple-500' 
                    : 'bg-green-500'
                } transition-all duration-1000 ease-out`}
                style={{ width: animateGraph ? `${automationScore}%` : '0%' }}
              ></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white drop-shadow-md">{automationScore}%</span>
              </div>
              
              {/* Score markers */}
              <div className="absolute inset-0">
                <div className="absolute left-[40%] top-0 h-full border-l-2 border-white border-dashed opacity-50"></div>
                <div className="absolute left-[75%] top-0 h-full border-l-2 border-white border-dashed opacity-50"></div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 px-2">
              <span>Automation Explorer</span>
              <span>Automation Builder</span>
              <span>Automation Innovator</span>
            </div>
          </div>

          {/* Show appropriate level card based on automation score */}
          {automationScore < 40 && (
            <div className="mb-10">
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <Zap className="h-10 w-10 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-blue-800 mb-2">Automation Explorer (0-39%)</h3>
                    <p className="text-gray-700">You're just beginning your automation journey. Our Kickstart Plan will introduce you to key automation concepts and tools that save time immediately, with no technical expertise required.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {automationScore >= 40 && automationScore < 75 && (
            <div className="mb-10">
              <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                <div className="flex items-start">
                  <TrendingUp className="h-10 w-10 text-purple-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-purple-800 mb-2">Automation Builder (40-74%)</h3>
                    <p className="text-gray-700">You've used some automation tools before and understand their value. Our Growth Plan will help you connect your existing systems and expand your capabilities with multi-channel automation.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {automationScore >= 75 && (
            <div className="mb-10">
              <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                <div className="flex items-start">
                  <Award className="h-10 w-10 text-green-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-green-800 mb-2">Automation Innovator (75-100%)</h3>
                    <p className="text-gray-700">You're experienced with automation and looking for advanced capabilities. Our Scale Plan provides custom workflows, AI-powered tools, and dedicated strategy to maximize your automation ROI.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mt-8">
            <button 
              onClick={() => {
                setActiveTab('recommendation');
                trackCTAClick(recommendedPlan, 'view_recommendation');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all flex items-center mx-auto"
            >
              View Your Recommended Plan <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'recommendation' && (
        <div className={`transition-opacity duration-500 ${showRecommendation ? 'opacity-100' : 'opacity-0'}`}>
          {recommendedPlan === 'kickstart' && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <Zap className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Kickstart Plan</h2>
                  <div className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-full text-sm">Recommended</div>
                </div>
                <p className="text-gray-600 mb-6">Perfect for solopreneurs & small teams new to automation.</p>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900">$149<span className="text-lg font-normal text-gray-600">/mo</span></div>
                  <div className="text-gray-600">or $499 one-time</div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-gray-800">Why this is right for you:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Based on your assessment, you're just beginning your automation journey</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>The Kickstart Plan provides essential automation tools to save time immediately</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>You'll establish a foundation for future growth without overwhelming your team</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/services/kickstart?source=assessment" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all text-center font-medium"
                    onClick={() => trackCTAClick('kickstart', 'free_trial')}
                  >
                    Start Free Trial
                  </a>
                  <a 
                    href="/contact?plan=kickstart&source=assessment" 
                    className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all text-center font-medium"
                    onClick={() => trackCTAClick('kickstart', 'contact')}
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
          )}
          
          {recommendedPlan === 'growth' && (
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Growth Plan</h2>
                  <div className="ml-4 px-3 py-1 bg-purple-600 text-white rounded-full text-sm">Recommended</div>
                </div>
                <p className="text-gray-600 mb-6">For businesses ready to expand with multi-channel automation.</p>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900">$599<span className="text-lg font-normal text-gray-600">/mo</span></div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-gray-800">Why this is right for you:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Your business has some automation experience and is ready for more advanced solutions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>You need multi-channel automation to connect your marketing and sales processes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>This plan includes dedicated support and implementation assistance</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/services/growth?source=assessment" 
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all text-center font-medium"
                    onClick={() => trackCTAClick('growth', 'book_demo')}
                  >
                    Book a Demo
                  </a>
                  <a 
                    href="/contact?plan=growth&source=assessment" 
                    className="px-6 py-3 bg-white text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-all text-center font-medium"
                    onClick={() => trackCTAClick('growth', 'contact')}
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
          )}
          
          {recommendedPlan === 'scale' && (
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-200 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Scale Plan</h2>
                  <div className="ml-4 px-3 py-1 bg-green-600 text-white rounded-full text-sm">Recommended</div>
                </div>
                <p className="text-gray-600 mb-6">Enterprise-grade automation for maximum efficiency.</p>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900">$1,499<span className="text-lg font-normal text-gray-600">/mo</span></div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-gray-800">Why this is right for you:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>You're an automation innovator looking for advanced capabilities and custom workflows</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>You need AI-powered tools and integration with complex business systems</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>This plan includes dedicated strategy, custom workflow design, and priority support</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/services/scale?source=assessment" 
                    className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all text-center font-medium"
                    onClick={() => trackCTAClick('scale', 'strategy_call')}
                  >
                    Book a Strategy Call
                  </a>
                  <a 
                    href="/contact?plan=scale&source=assessment" 
                    className="px-6 py-3 bg-white text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-all text-center font-medium"
                    onClick={() => trackCTAClick('scale', 'contact')}
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'comparison' && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Kickstart
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                    Growth
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Scale
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Price</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$149/mo</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$599/mo</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,499/mo</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Basic Automation Tools</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✅</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✅</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✅</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Multi-Channel Automation</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">❌</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✅</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✅</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Custom Workflows</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">❌</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Limited</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✅</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AI-Powered Features</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">❌</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Basic</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Advanced</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Support</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Email</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Email + Chat</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dedicated Manager</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => {
                setActiveTab('recommendation');
                trackCTAClick(recommendedPlan, 'view_recommendation_from_comparison');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all flex items-center mx-auto"
            >
              View Your Recommended Plan <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentResults; 