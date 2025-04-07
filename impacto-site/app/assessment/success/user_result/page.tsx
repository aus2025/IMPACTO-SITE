'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

interface ProductTierContentProps {
  score: number;
}

const ProductTierContent = ({ score }: ProductTierContentProps) => {
  // Determine which tier based on score
  if (score < 41) {
    return (
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-yellow-800 mb-3">Kickstart Plan</h3>
        <p className="text-gray-700 mb-4">
          Your business is starting its automation journey. We recommend our <strong>Kickstart Plan</strong> to 
          address your foundational needs with social media scheduling, lead capture to CRM, and basic email flows.
        </p>
        
        <h2 className="text-2xl font-bold text-center mb-4">Recommended Plan</h2>
        
        <div className="bg-white rounded-lg p-6 border border-yellow-200">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-yellow-800">Kickstart Package Pricing</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Recommended</span>
            <h3 className="text-lg font-semibold mt-2">Best Fit</h3>
            <p className="text-gray-600">For businesses new to automation</p>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-3xl font-bold">$149<span className="text-base font-normal">/mo</span></p>
            <p className="text-gray-600">or $499 one-time setup</p>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Core Features</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">AI Social Posts</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Basic Lead Capture System</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Email Welcome Sequences</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Appointment Booking</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Basic Chatbot</span>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Additional Benefits</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">No setup fee for monthly plan</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Cancel anytime</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Free strategy session</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Basic analytics reporting</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
                <span className="text-gray-800">Email support</span>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Return on Investment</p>
            <p className="text-gray-600 mb-2">Most users save 8 hours/week — that's like hiring a $25/hr assistant for just $149/mo.</p>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="font-bold text-yellow-700">Monthly time saved</p>
                <p className="font-bold text-xl">32+ hours</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-yellow-700">Value of time saved</p>
                <p className="font-bold text-xl">$800</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-yellow-700">ROI</p>
                <p className="font-bold text-xl">8x</p>
              </div>
        </div>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Optional Add-ons</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Extra Platform Integration</p>
                  <p className="text-sm text-gray-600">Add another social media or marketing platform</p>
                </div>
                <p className="font-bold">+$50/mo</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Advanced Chatbot Config</p>
                  <p className="text-sm text-gray-600">More custom responses and advanced routing</p>
                </div>
                <p className="font-bold">+$100/mo</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link
              href="/contact"
              className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition duration-150 text-center"
            >
              Send Us a Message
            </Link>
            <Link
              href="https://calendly.com/rba-aus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-white border border-yellow-500 text-yellow-600 font-bold rounded-lg hover:bg-yellow-50 transition duration-150 text-center"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (score >= 41 && score < 80) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-green-800 mb-3">Growth Plan</h3>
        <p className="text-gray-700 mb-4">
          Your business shows significant automation potential. Our <strong>Growth Plan</strong> will 
          help you with multi-channel automation including social media, enhanced CRM integration, and automated email sequences.
        </p>
        
        <h2 className="text-2xl font-bold text-center mb-4">Recommended Plan</h2>
        
        <div className="bg-white rounded-lg p-6 border border-green-200">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-green-800">Growth Package Pricing</h3>
            <p className="text-gray-600">Advanced Package</p>
            <p className="text-gray-600">Multi-channel automation for growing businesses</p>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-3xl font-bold">$349<span className="text-base font-normal">/mo</span></p>
            <p className="text-gray-600">or $1,199 one-time setup</p>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Core Features</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Everything in Kickstart +</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Multi-Channel Content Distribution</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Advanced Email Sequences</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">CRM Integration & Automation</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Conversion-Focused Chatbot</span>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Additional Benefits</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Dedicated account manager</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Monthly strategy calls</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Advanced analytics dashboard</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
                <span className="text-gray-800">Priority email & chat support</span>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Return on Investment</p>
            <p className="text-gray-600 mb-2">Most users save 15 hours/week — that's like hiring a $25/hr assistant for just $349/mo.</p>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="font-bold text-green-700">Monthly time saved</p>
                <p className="font-bold text-xl">60+ hours</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-green-700">Value of time saved</p>
                <p className="font-bold text-xl">$1,500</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-green-700">ROI</p>
                <p className="font-bold text-xl">4.3x</p>
              </div>
        </div>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Optional Add-ons</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Custom API Integration</p>
                  <p className="text-sm text-gray-600">Connect with your existing tools</p>
                </div>
                <p className="font-bold">+$100/mo</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Advanced Analytics</p>
                  <p className="text-sm text-gray-600">Custom reporting and insights</p>
                </div>
                <p className="font-bold">+$75/mo</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link
              href="/contact"
              className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-150 text-center"
            >
              Send Us a Message
            </Link>
            <Link
              href="https://calendly.com/rba-aus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-white border border-green-500 text-green-600 font-bold rounded-lg hover:bg-green-50 transition duration-150 text-center"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-red-800 mb-3">Scale Plan</h3>
        <p className="text-gray-700 mb-4">
          Your business is primed for comprehensive automation. Our <strong>Scale Plan</strong> provides 
          advanced solutions like AI chatbots, custom workflow automation, and multi-platform social & ads integration.
        </p>
        
        <h2 className="text-2xl font-bold text-center mb-4">Recommended Plan</h2>
        
        <div className="bg-white rounded-lg p-6 border border-red-200">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-red-800">Scale Package Pricing</h3>
            <p className="text-gray-600">Enterprise Package</p>
            <p className="text-gray-600">Complete automation for established businesses</p>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-3xl font-bold">$749<span className="text-base font-normal">/mo</span></p>
            <p className="text-gray-600">or $2,499 one-time setup</p>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Core Features</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Everything in Growth +</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Advanced AI Integration</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Custom Workflow Automation</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Multi-Platform Integration</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Advanced AI-Powered Chatbot</span>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Additional Benefits</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">VIP support & priority development</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Quarterly business review</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">Enterprise-grade security</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
                <span className="text-gray-800">24/7 priority support</span>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Return on Investment</p>
            <p className="text-gray-600 mb-2">Most users save 25+ hours/week — that's like hiring a $30/hr assistant for just $749/mo.</p>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="font-bold text-red-700">Monthly time saved</p>
                <p className="font-bold text-xl">100+ hours</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-red-700">Value of time saved</p>
                <p className="font-bold text-xl">$3,000</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-red-700">ROI</p>
                <p className="font-bold text-xl">4x</p>
              </div>
        </div>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Optional Add-ons</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Custom Development</p>
                  <p className="text-sm text-gray-600">Tailor-made solutions for your business</p>
                </div>
                <p className="font-bold">Custom</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">White-Label Solution</p>
                  <p className="text-sm text-gray-600">Brand the platform as your own</p>
                </div>
                <p className="font-bold">+$250/mo</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link
              href="/contact"
              className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-150 text-center"
            >
              Send Us a Message
            </Link>
            <Link
              href="https://calendly.com/rba-aus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-white border border-red-500 text-red-600 font-bold rounded-lg hover:bg-red-50 transition duration-150 text-center"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

// Function to calculate a score based on assessment data
// Simplified version of the calculation from assessment-results page
function calculateAutomationScore(assessmentData: any): number {
  if (!assessmentData) return 70; // Default fallback score
  
  // Extract relevant responses from the assessment data
  const {
    automation_experience,
    current_tools,
    pain_points,
    company_size,
    business_goals,
    automation_areas,
    document_volume,
    implementation_timeline,
    budget_range
  } = assessmentData;
  
  // Initialize score components
  let knowledgeScore = 0;
  let needsScore = 0;
  let complexityScore = 0;
  let readinessScore = 0;
  
  // 1. Evaluate automation knowledge/experience
  if (automation_experience === 'none') {
    knowledgeScore = 0;
  } else if (automation_experience === 'basic') {
    knowledgeScore = 3;
  } else if (automation_experience === 'moderate') {
    knowledgeScore = 6;
  } else if (automation_experience === 'advanced') {
    knowledgeScore = 10;
  }
  
  // Check for current tools usage
  if (current_tools && current_tools.length > 0) {
    knowledgeScore += Math.min(current_tools.length, 5);
  }
  
  // 2. Evaluate business needs for automation
  if (pain_points && pain_points.length > 0) {
    needsScore += Math.min(pain_points.length * 2, 10);
  }
  
  if (automation_areas && automation_areas.length > 0) {
    needsScore += Math.min(automation_areas.length * 2, 10);
  }
  
  // 3. Evaluate complexity factors
  if (company_size === 'solo') {
    complexityScore += 2;
  } else if (company_size === 'small') {
    complexityScore += 5;
  } else if (company_size === 'medium') {
    complexityScore += 8;
  } else if (company_size === 'large') {
    complexityScore += 10;
  }
  
  // Document volume affects complexity
  if (document_volume === 'low') {
    complexityScore += 3;
  } else if (document_volume === 'medium') {
    complexityScore += 6;
  } else if (document_volume === 'high') {
    complexityScore += 10;
  }
  
  // 4. Evaluate readiness factors
  if (implementation_timeline === 'immediate') {
    readinessScore += 10;
  } else if (implementation_timeline === '1-3months') {
    readinessScore += 7;
  } else if (implementation_timeline === '3-6months') {
    readinessScore += 4;
  } else if (implementation_timeline === '6months+') {
    readinessScore += 2;
  }
  
  // Budget - higher budget indicates more readiness
  if (budget_range === 'under5k') {
    readinessScore += 3;
  } else if (budget_range === '5k-15k') {
    readinessScore += 6;
  } else if (budget_range === '15k-50k') {
    readinessScore += 8;
  } else if (budget_range === '50k+') {
    readinessScore += 10;
  }
  
  // Calculate weighted total score
  const weightedTotal = (knowledgeScore * 0.4) + (needsScore * 0.25) + 
                        (complexityScore * 0.2) + (readinessScore * 0.15);
  
  // Convert to percentage (0-100)
  const finalScore = Math.round((weightedTotal / 20) * 100);
  
  // Ensure score is within bounds
  return Math.max(40, Math.min(finalScore, 95));
}

export default function UserResultPage() {
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const blueprintRef = useRef<HTMLDivElement>(null);
  const consultationRef = useRef<HTMLDivElement>(null);
  const blueprintInView = useInView(blueprintRef, { once: false, amount: 0.3 });
  const consultationInView = useInView(consultationRef, { once: false, amount: 0.3 });

  useEffect(() => {
    // Check if we have the score in sessionStorage first (for refreshes)
    const savedScore = sessionStorage.getItem('user_assessment_score');
    if (savedScore) {
      const parsedScore = parseInt(savedScore, 10);
      setScore(parsedScore);
      setAnalysisComplete(true);
      return;
    }

    // Try to get the assessment ID from URL query params
    const assessmentId = searchParams?.get('assessmentId') || null;
    
    // If no assessment ID, check localStorage for last form submission
    const fetchAssessmentData = async () => {
      try {
        let assessmentData;
        
        if (assessmentId) {
          // Initialize Supabase client
          const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );
          
          // Fetch from Supabase
          const { data, error } = await supabase
            .from('assessments')
            .select('*')
            .eq('id', assessmentId)
            .single();
            
          if (error) throw error;
          
          if (data) {
            assessmentData = data;
          }
        } else {
          // Try to get from localStorage if no ID provided
          const storedData = localStorage.getItem('assessment_form_data');
          if (storedData) {
            assessmentData = JSON.parse(storedData);
          }
        }
        
        // Calculate score from assessment data
        if (assessmentData) {
          setAssessmentData(assessmentData);
          // Wait 2 seconds to show the analysis animation
          setTimeout(() => {
            const calculatedScore = calculateAutomationScore(assessmentData);
            setScore(calculatedScore);
            // Save score to sessionStorage for refreshes
            sessionStorage.setItem('user_assessment_score', calculatedScore.toString());
            setAnalysisComplete(true);
          }, 2000);
        } else {
          // If no assessment data found, use a fallback score
          setTimeout(() => {
            const fallbackScore = 70; // Middle-range score as fallback
            setScore(fallbackScore);
            sessionStorage.setItem('user_assessment_score', fallbackScore.toString());
            setAnalysisComplete(true);
          }, 2000);
        }
      } catch (err) {
        console.error('Error fetching assessment data:', err);
        setError('Failed to fetch assessment data');
        // Use fallback score on error
        setTimeout(() => {
          const fallbackScore = 70;
          setScore(fallbackScore);
          sessionStorage.setItem('user_assessment_score', fallbackScore.toString());
          setAnalysisComplete(true);
        }, 2000);
      }
    };
    
    fetchAssessmentData();
  }, [searchParams]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Section 1: Analysis Animation */}
          {!analysisComplete && (
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8 backdrop-blur-sm bg-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">Analyzing Your Business</h1>
                
                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-8 shadow-inner">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
                
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="w-20 h-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: 2, ease: "linear" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-full h-full text-blue-600 drop-shadow-md">
                      <path 
                        fill="currentColor" 
                        d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                      />
                    </svg>
                  </motion.div>
                </div>
                
                <p className="text-lg text-gray-600 animate-pulse">
                  <strong>Analysis:</strong> Our team is reviewing your answers and analyzing your business needs.
                </p>
                <p className="text-sm text-gray-500 mt-3">No technical expertise required - we handle everything</p>
              </div>
            </motion.div>
          )}
          
          {/* Section 2: Blueprint Creation */}
          {analysisComplete && score !== null && (
            <motion.div 
              ref={blueprintRef}
              className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8 backdrop-blur-sm bg-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: blueprintInView || !consultationInView ? 1 : 0.8, 
                y: 0,
                scale: blueprintInView || !consultationInView ? 1 : 0.98,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-blue-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">Your Automation Blueprint</h1>
                <p className="text-lg text-gray-600 mb-3">
                  Based on your responses, we've assessed your automation potential.
                </p>
                <p className="text-md text-blue-700 font-medium mb-8">
                  Your custom solution requires zero technical knowledge
                </p>
                
                <motion.div 
                  className="flex justify-center mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className={`relative h-48 w-48`}>
                    <div className={`absolute inset-0 rounded-full bg-white shadow-lg flex items-center justify-center`}>
                      <div className={`absolute inset-0 rounded-full overflow-hidden`}>
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br opacity-20 ${
                            score && score < 60 ? 'from-yellow-300 to-yellow-600' : 
                            score && score < 80 ? 'from-green-300 to-green-600' : 
                            'from-red-300 to-red-600'
                          }`}
                        ></div>
                      </div>
                      <div className={`h-40 w-40 rounded-full bg-white border-8 ${
                        score && score < 60 ? 'border-yellow-500' : 
                        score && score < 80 ? 'border-green-500' : 
                        'border-red-500'
                      } flex items-center justify-center`}>
                        <span className={`text-6xl font-bold ${
                          score && score < 60 ? 'text-yellow-700' : 
                          score && score < 80 ? 'text-green-700' : 
                          'text-red-700'
                        }`}>{score}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                >
                  <ProductTierContent score={score} />
                </motion.div>
              </div>
            </motion.div>
          )}
          
          {/* Section 3: Consultation CTA */}
          {analysisComplete && (
            <motion.div 
              ref={consultationRef}
              className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 backdrop-blur-sm bg-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: consultationInView ? 1 : 0.8, 
                y: 0,
                scale: consultationInView ? 1 : 0.98
              }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-green-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">Don't waste more time - speak directly with our experts</h2>
                <p className="text-lg text-gray-600 mb-4">
                  <strong>Consultation:</strong> A member of our team will contact you to discuss your automation blueprint and next steps.
                </p>
                
                <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 shadow-inner border ${
                  score && score < 60 ? 'border-yellow-200' : 
                  score && score < 80 ? 'border-green-200' : 
                  'border-red-200'
                }`}>
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-3">
                      <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-800">No tech knowledge required</h3>
                      <p className="text-gray-600">We handle 100% of implementation, setup, and maintenance</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Our automation experts are ready to walk you through your custom blueprint and answer all your questions.
                    The sooner you book, the faster you can start implementing solutions.
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/contact"
                      className={`inline-block px-8 py-4 text-white text-xl font-bold rounded-lg transition duration-150 shadow-lg hover:shadow-xl ${
                        score && score < 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700' : 
                        score && score < 80 ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' : 
                        'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                      }`}
                    >
                      {score && score < 60 ? 'Start Free' : score && score < 80 ? 'Book a Demo' : 'Talk to Us'}
                    </Link>
                  </motion.div>
                </div>
                
                <div className="text-center mt-8">
                  <Link
                    href="/assessment/success"
                    className="inline-block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Back to Assessment Confirmation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
          
        </div>
      </div>
    </div>
  );
} 