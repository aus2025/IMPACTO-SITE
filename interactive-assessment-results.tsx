import React, { useState, useEffect } from 'react';
import { CheckCircle, Zap, TrendingUp, BarChart, ChevronRight, Award } from 'lucide-react';

const AssessmentResults = () => {
  // This would be calculated from actual assessment responses
  const [automationScore, setAutomationScore] = useState(65);
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

  useEffect(() => {
    // Trigger animations sequentially
    setTimeout(() => setAnimateGraph(true), 500);
    setTimeout(() => setShowRecommendation(true), 1500);
  }, []);

  // For demo purposes - in production this would be connected to real assessment data
  const handleScoreChange = (newScore) => {
    setAutomationScore(newScore);
  };

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
            
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Demo controls (for presentation only):</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleScoreChange(30)} 
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Automation Explorer
                </button>
                <button 
                  onClick={() => handleScoreChange(65)} 
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Automation Builder
                </button>
                <button 
                  onClick={() => handleScoreChange(85)} 
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Automation Innovator
                </button>
              </div>
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
              onClick={() => setActiveTab('recommendation')}
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
                  <a href="#" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all text-center font-medium">
                    Start Free Trial
                  </a>
                  <a href="#" className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all text-center font-medium">
                    Schedule a Demo
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
                      <span>Our Growth Plan provides the right balance of features and support for your current stage</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#" className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all text-center font-medium">
                    Book a Demo
                  </a>
                  <a href="#" className="px-6 py-3 bg-white text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-all text-center font-medium">
                    View Details
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
                <p className="text-gray-600 mb-6">Premium solution for automation-mature businesses ready to scale.</p>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900">$1,499<span className="text-lg font-normal text-gray-600">/mo</span></div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-gray-800">Why this is right for you:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Your assessment indicates you have sophisticated automation needs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>You're ready for custom workflows and advanced integrations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Our Scale Plan provides the comprehensive support and strategy you need to maximize ROI</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#" className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all text-center font-medium">
                    Book a Strategy Call
                  </a>
                  <a href="#" className="px-6 py-3 bg-white text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-all text-center font-medium">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => setActiveTab('comparison')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center mx-auto"
            >
              Compare All Plans <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col items-center">
                    <Zap className="h-5 w-5 text-blue-500 mb-1" />
                    <span>Kickstart</span>
                    <span className="text-blue-600 font-normal">$149/mo</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-purple-50">
                  <div className="flex flex-col items-center">
                    <TrendingUp className="h-5 w-5 text-purple-500 mb-1" />
                    <span>Growth</span>
                    <span className="text-purple-600 font-normal">$599/mo</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col items-center">
                    <Award className="h-5 w-5 text-green-500 mb-1" />
                    <span>Scale</span>
                    <span className="text-green-600 font-normal">$1,499/mo</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Social Media Automation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">1-2 platforms</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-purple-50">3+ platforms with AI copy</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Multi-platform + Ads</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CRM Integration</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Basic lead capture</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-purple-50">Advanced with tagging</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Full custom integration</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Email Automation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">3-step welcome flow</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-purple-50">Multi-step nurture + SMS</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Advanced sequences</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Chatbot</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">—</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-purple-50">Basic (FAQs & booking)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Advanced AI chatbot</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Support</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Email support</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-purple-50">Priority email & chat</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Dedicated strategist</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Custom Workflows</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">—</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-purple-50">Basic customization</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Fully tailored scripts</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <a href="#" className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all">
                    Start Free
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center bg-purple-50">
                  <a href="#" className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
                    Book a Demo
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <a href="#" className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all">
                    Book Strategy Call
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">What's next?</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 p-4 bg-gray-50 rounded-lg">
            <div className="font-medium mb-2 text-gray-800">Need more information?</div>
            <p className="text-sm text-gray-600 mb-3">Schedule a free consultation to discuss your specific needs.</p>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Book a Call →</a>
          </div>
          <div className="flex-1 p-4 bg-gray-50 rounded-lg">
            <div className="font-medium mb-2 text-gray-800">Ready to get started?</div>
            <p className="text-sm text-gray-600 mb-3">Begin with your recommended plan today and start saving time.</p>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Get Started →</a>
          </div>
          <div className="flex-1 p-4 bg-gray-50 rounded-lg">
            <div className="font-medium mb-2 text-gray-800">Have questions?</div>
            <p className="text-sm text-gray-600 mb-3">Our automation experts are here to help you make the right choice.</p>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Contact Us →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;
