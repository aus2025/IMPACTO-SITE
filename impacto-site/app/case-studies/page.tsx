"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import StructuredData from '@/components/seo/StructuredData';

export default function CaseStudies() {
  // Define common case studies
  const caseStudies = [
    {
      id: 'retail-automation',
      title: 'Retail Inventory Automation',
      industry: 'Retail',
      solutionType: 'Automation',
      description: 'Discover how a leading retail chain automated inventory management, achieving a 30% reduction in stockouts and improving inventory turnover by 25%.',
      clientName: 'Retail Chain'
    },
    {
      id: 'saas-social-media',
      title: 'Social Media Strategy for Technology Sector',
      industry: 'Technology',
      solutionType: 'Social Media',
      description: 'Learn about a technology sector startup\'s targeted social media strategy, leading to a 45% increase in lead generation and enhanced customer engagement across multiple platforms.',
      clientName: 'SaaS Company'
    },
    {
      id: 'healthcare-workflow',
      title: 'Healthcare Workflow Enhancement',
      industry: 'Healthcare',
      solutionType: 'Workflow',
      description: 'See how a healthcare provider streamlined administrative workflows through AI automation, significantly reducing operational costs and allowing more time for patient care.',
      clientName: 'Healthcare Provider'
    },
    {
      id: 'finance-data-analytics',
      title: 'Advanced Data Analytics in Financial Services',
      industry: 'Finance',
      solutionType: 'Data Analytics',
      description: 'Understand how a financial services firm leveraged sophisticated data analytics to enhance decision-making capabilities and improve client service delivery.',
      clientName: 'Financial Services Company'
    },
    {
      id: 'manufacturing-ai',
      title: 'Optimized Manufacturing Processes',
      industry: 'Manufacturing',
      solutionType: 'Automation',
      description: 'Explore how a manufacturing corporation utilized AI-driven automation to reduce waste and boost production efficiency.',
      clientName: 'Manufacturing Company'
    },
    {
      id: 'education-platform',
      title: 'Digital Learning Platform Development',
      industry: 'Education',
      solutionType: 'Platform Development',
      description: 'Examine the case of an educational institution that enhanced its online learning platform, resulting in improved student engagement and better educational outcomes.',
      clientName: 'Education Institute'
    }
  ];

  // Extract unique industries and solution types
  const industries = Array.from(new Set(caseStudies.map(study => study.industry)));
  const solutionTypes = Array.from(new Set(caseStudies.map(study => study.solutionType)));

  // Define states for filtering
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedSolutionType, setSelectedSolutionType] = useState('all');

  // Filter case studies based on selected filters
  const filteredCaseStudies = selectedIndustry === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedIndustry);

  return (
    <>
      <StructuredData 
        type="ItemList" 
        data={{
          itemListElement: caseStudies.map((study, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Article',
              headline: study.title,
              description: study.description,
              url: `https://impactoautomation.com/case-studies/${study.id}`,
              author: {
                '@type': 'Organization',
                name: 'Impacto Automation AI'
              },
            }
          }))
        }} 
      />
      
      <main className="min-h-screen w-full overflow-x-hidden">
        {/* Hero section */}
        <section className="py-24 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Case Studies
              </h1>
              <p className="text-xl mb-8">
                Explore how our solutions have helped businesses across different industries achieve remarkable results.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8">
          {/* Filtering Section */}
          <section className="mb-10" aria-labelledby="filter-heading">
            <h2 id="filter-heading" className="text-2xl font-semibold mb-6">Browse by Industry:</h2>
            
            <div className="space-y-6">
              {/* Industry Filter */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSelectedIndustry('All')}
                    className={`px-4 py-2 rounded-md ${selectedIndustry === 'All' ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  >
                    All Industries
                  </button>
                  {industries.map(industry => (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={`px-4 py-2 rounded-md ${selectedIndustry === industry ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Solution Type Filter */}
              <div>
                <h3 className="text-lg font-medium mb-3">Solution Types:</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSolutionType('all')}
                    className={`px-4 py-2 rounded-md ${selectedSolutionType === 'all' ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  >
                    All Solutions
                  </button>
                  {solutionTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedSolutionType(type.toLowerCase().replace(' ', '-'))}
                      className={`px-4 py-2 rounded-md ${selectedSolutionType === type.toLowerCase().replace(' ', '-') ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Case Studies Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredCaseStudies.map(study => (
              <Link 
                href={`/case-studies/${study.id}`} 
                key={study.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 bg-gray-200">
                  <PlaceholderImage className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex mb-3">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{study.industry}</span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">{study.solutionType}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Client: {study.clientName}</span>
                    <span className="text-blue-600 hover:text-blue-800 font-medium">Read more &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}