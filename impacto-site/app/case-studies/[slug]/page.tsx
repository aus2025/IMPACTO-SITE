import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { constructMetadata } from '@/utils/seo';
import StructuredData from '@/components/seo/StructuredData';
import { PlaceholderImage } from '@/components/ui/placeholder-image';

// Mock function to get case study by slug
// In a real app, you would fetch this from your database
function getCaseStudy(slug: string) {
  const caseStudies = [
    {
      id: 'retail-automation',
      title: 'Retail Chain Automation: 30% Stockout Reduction',
      industry: 'Retail',
      solutionType: 'Automation',
      description: 'How we helped a national retail chain automate their inventory management process, resulting in 30% reduction in stockouts and 25% improvement in inventory turnover.',
      longDescription: `
        Our client, a national retail chain with over 200 locations, was struggling with inventory management issues.
        Stockouts were causing lost sales while excess inventory tied up capital and warehouse space.
        
        We implemented our AI-powered inventory management solution that uses machine learning algorithms to predict demand patterns
        based on historical sales data, seasonal trends, and external factors like weather and local events.
        
        The system automatically adjusts reorder points and quantities, sending recommendations to purchasing teams and
        automatically processing routine orders. Real-time inventory visibility across all locations allows for efficient
        stock transfers between stores.
      `,
      challenge: 'The client was experiencing frequent stockouts (over 15% of SKUs at any given time) while simultaneously dealing with excess inventory in other product categories. Manual inventory processes were time-consuming and error-prone, with staff spending over 20 hours per week per location on inventory-related tasks.',
      solution: 'We implemented our AI Inventory Management System customized for their specific retail needs. The solution included demand forecasting, automated reordering, real-time inventory visibility, cross-location stock transfers, and performance analytics.',
      implementation: 'The implementation was phased over 12 weeks, starting with a pilot in 10 stores before rolling out company-wide. We integrated with their existing ERP and POS systems, trained staff on the new workflow, and provided ongoing support during the transition.',
      results: [
        '30% reduction in stockouts across all locations',
        '25% improvement in inventory turnover ratio',
        '15% increase in staff productivity',
        '12% reduction in overall inventory holding costs',
        'ROI achieved within 8 months of full implementation'
      ],
      testimonial: {
        quote: "Impacto's AI solution transformed our inventory management from a constant challenge to a competitive advantage. Our customers can now reliably find what they need, and our operations team has been freed up to focus on customer service rather than manual inventory counts.",
        author: "Operations Director",
        position: "Operations Director, Retail Chain"
      },
      clientName: 'Retail Chain',
      clientIndustry: 'Multi-location retail',
      dateCompleted: '2023-06-15',
      technologies: ['AI demand forecasting', 'Machine learning', 'Inventory optimization', 'Real-time analytics'],
      metrics: {
        stockoutsReduction: '30%',
        inventoryTurnover: '25%',
        productivityImprovement: '15%',
        inventoryCostReduction: '12%'
      }
    },
    {
      id: 'saas-social-media',
      title: 'SaaS Company Social Media Strategy',
      industry: 'Technology',
      solutionType: 'Social Media',
      description: 'A comprehensive social media marketing strategy that helped a SaaS startup increase their lead generation by 45% and improve customer engagement across all platforms.',
      longDescription: `
        Our client, a growing SaaS company, was struggling to gain traction in a competitive market. 
        Despite having an innovative product, they were unable to effectively communicate their value proposition to potential customers.
        
        We implemented a comprehensive social media strategy focusing on content creation, community engagement, and targeted advertising.
        Our approach included detailed audience analysis, competitor research, and platform-specific strategies.
      `,
      challenge: 'The client was spending significant resources on digital marketing with minimal returns. Their social media presence was fragmented and inconsistent, with low engagement rates and poor conversion to leads.',
      solution: 'We developed a comprehensive social media strategy with platform-specific content calendars, targeted advertising campaigns, and an analytics framework to measure performance and ROI.',
      implementation: 'The implementation was conducted over 16 weeks, beginning with a complete audit of existing social media activities. We created optimized profiles, developed branded content templates, and established a consistent posting schedule across platforms.',
      results: [
        '45% increase in lead generation from social channels',
        '120% growth in social media followers across platforms',
        '3x improvement in content engagement rates',
        '28% reduction in cost per acquisition',
        'Establishment of the client as a thought leader in their industry'
      ],
      testimonial: {
        quote: "Impacto's strategic approach to social media transformed our online presence. We're now generating quality leads consistently and have built a valuable community around our brand.",
        author: "Marketing Executive",
        position: "CMO, SaaS Company"
      },
      clientName: 'SaaS Company',
      clientIndustry: 'B2B Software',
      dateCompleted: '2023-08-22',
      technologies: ['Social media management', 'Content strategy', 'Marketing automation', 'Analytics dashboard'],
      metrics: {
        leadGeneration: '45%',
        followerGrowth: '120%',
        engagementRate: '300%',
        costReduction: '28%'
      }
    },
    {
      id: 'healthcare-workflow',
      title: 'Healthcare Workflow Optimization',
      industry: 'Healthcare',
      solutionType: 'Workflow',
      description: 'Streamlining administrative processes for a healthcare provider using our AI workflow automation tools, resulting in more time for patient care and reduced operational costs.',
      longDescription: `
        Our client, a regional healthcare provider with multiple facilities, was facing increasing administrative burden
        on their medical staff, reducing the time available for patient care.
        
        We implemented a suite of AI-powered workflow automation tools designed specifically for healthcare environments,
        focusing on patient intake, documentation, billing, and follow-up processes.
      `,
      challenge: 'Medical staff were spending over 40% of their time on administrative tasks rather than patient care. Manual data entry was causing errors, compliance issues, and staff burnout.',
      solution: 'We deployed our Healthcare Workflow Suite with AI-powered document processing, intelligent form automation, and predictive scheduling tools integrated with their existing EMR system.',
      implementation: 'The implementation was conducted over 5 months with a phased approach that minimized disruption to ongoing operations. We provided comprehensive training and created custom workflows tailored to each department\'s needs.',
      results: [
        '40% reduction in administrative tasks for medical staff',
        '22% decrease in operational costs',
        'Improved patient satisfaction scores by 18%',
        '35% reduction in documentation errors',
        'Compliance reporting time reduced from days to hours'
      ],
      testimonial: {
        quote: "The workflow automation solution from Impacto has transformed how our staff operates. Our doctors and nurses can now focus on what they do best - patient care - while administrative processes run smoothly in the background.",
        author: "Medical Director",
        position: "Chief Medical Officer, Healthcare Provider"
      },
      clientName: 'Healthcare Provider',
      clientIndustry: 'Healthcare Services',
      dateCompleted: '2023-05-10',
      technologies: ['AI document processing', 'Workflow automation', 'EMR integration', 'HIPAA-compliant cloud architecture'],
      metrics: {
        adminTaskReduction: '40%',
        operationalCostSavings: '22%',
        patientSatisfaction: '18%',
        errorReduction: '35%'
      }
    },
    {
      id: 'finance-data-analytics',
      title: 'Financial Services Data Analytics',
      industry: 'Finance',
      solutionType: 'Data Analytics',
      description: 'Implementing advanced data analytics solutions for a financial services firm to improve decision-making and client service delivery.',
      longDescription: `
        Our client, an international financial services firm, was struggling to extract meaningful insights
        from their vast amounts of data across disparate systems.
        
        We implemented a comprehensive data analytics platform that unified data sources, provided
        real-time analytics, and enabled predictive modeling for portfolio management and client service.
      `,
      challenge: 'The client had data spread across multiple legacy systems, making comprehensive analysis difficult. Reporting was manual, time-consuming, and often contained inconsistencies that affected decision-making.',
      solution: 'We created a centralized data lake with automated ETL processes, real-time dashboards, and AI-powered analytics tools tailored to financial services requirements.',
      implementation: 'The implementation spanned 6 months, beginning with data source integration and ETL development, followed by dashboard creation and finally predictive analytics model deployment.',
      results: [
        '35% faster reporting cycles from weeks to days',
        '27% increase in client retention through data-driven service improvements',
        'Improved regulatory compliance with automated reporting',
        '$2.4M annual cost savings from operational efficiencies',
        'New revenue streams from data-driven financial products'
      ],
      testimonial: {
        quote: "The data analytics solution from Impacto has fundamentally changed how we operate and serve our clients. We now have a comprehensive view of our business and can make decisions based on actual data rather than assumptions.",
        author: "Senior Executive",
        position: "CTO, Financial Services Company"
      },
      clientName: 'Financial Services Company',
      clientIndustry: 'Financial Services',
      dateCompleted: '2023-03-18',
      technologies: ['Data lake architecture', 'AI analytics', 'Predictive modeling', 'Secure cloud infrastructure'],
      metrics: {
        reportingSpeed: '35%',
        clientRetention: '27%',
        costSavings: '$2.4M',
        newRevenue: '15%'
      }
    },
    {
      id: 'manufacturing-ai',
      title: 'Manufacturing Process Optimization',
      industry: 'Manufacturing',
      solutionType: 'Automation',
      description: 'AI-driven process optimization for a manufacturing company that reduced waste and improved production efficiency.',
      longDescription: `
        Our client, an industrial manufacturing corporation, was facing challenges with production efficiency,
        material waste, and quality control issues that were affecting their competitiveness.
        
        We implemented AI-powered process optimization and predictive maintenance systems that monitored
        production in real-time and made automatic adjustments to optimize operations.
      `,
      challenge: 'The client was experiencing high material waste rates, frequent equipment downtime, and inconsistent product quality, leading to increased costs and customer dissatisfaction.',
      solution: 'We deployed IoT sensors throughout the production line connected to our AI optimization platform, which analyzed data in real-time and made automatic adjustments to production parameters.',
      implementation: 'The implementation was conducted over 14 weeks, starting with sensor installation, followed by data collection and model training, and culminating in the deployment of the optimization system with operator dashboards.',
      results: [
        '18% reduction in material waste across all production lines',
        '23% improvement in production efficiency',
        '12% decrease in quality issues and defects',
        '34% reduction in unplanned equipment downtime',
        '8-month ROI on the entire project investment'
      ],
      testimonial: {
        quote: "The AI optimization system has transformed our production floor. We're now operating at higher efficiency with less waste and fewer quality issues than ever before. The predictive maintenance has been particularly valuable in preventing costly downtime.",
        author: "Operations VP",
        position: "VP of Operations, Manufacturing Company"
      },
      clientName: 'Manufacturing Company',
      clientIndustry: 'Manufacturing',
      dateCompleted: '2023-07-05',
      technologies: ['IoT sensors', 'AI optimization', 'Predictive maintenance', 'Real-time monitoring'],
      metrics: {
        wasteReduction: '18%',
        efficiencyImprovement: '23%',
        qualityImprovement: '12%',
        downtimeReduction: '34%'
      }
    },
    {
      id: 'education-platform',
      title: 'Educational Platform Enhancement',
      industry: 'Education',
      solutionType: 'Platform Development',
      description: 'Creating an enhanced digital learning platform for an educational institution, improving student engagement and learning outcomes.',
      longDescription: `
        Our client, an online learning institute, was struggling with low student engagement and course
        completion rates on their existing learning platform.
        
        We redesigned and enhanced their learning platform with personalized learning paths, interactive
        content, gamification elements, and robust analytics to track student progress and identify
        learning gaps.
      `,
      challenge: 'The client was experiencing low course completion rates (under 40%), poor student engagement, and difficulty demonstrating learning outcomes to accreditation bodies.',
      solution: 'We developed a comprehensive platform enhancement including personalized learning paths, interactive assessments, gamification elements, and a robust analytics dashboard for educators.',
      implementation: 'The implementation was phased over 20 weeks, with incremental updates to minimize disruption to ongoing courses. We incorporated educator feedback at each stage and provided comprehensive training.',
      results: [
        '42% increase in student engagement metrics',
        '31% improvement in course completion rates',
        'Higher student satisfaction scores (from 3.4 to 4.7/5)',
        '28% increase in new student enrollment',
        'Improved learning outcomes with data-driven teaching adjustments'
      ],
      testimonial: {
        quote: "The enhanced platform has revolutionized how we deliver education. Our students are more engaged, they're completing courses at much higher rates, and our educators have valuable insights into the learning process that were previously unavailable.",
        author: "Academic Director",
        position: "Academic Director, Education Institute"
      },
      clientName: 'Education Institute',
      clientIndustry: 'Education Technology',
      dateCompleted: '2023-09-30',
      technologies: ['Adaptive learning algorithms', 'Interactive content framework', 'Gamification', 'Learning analytics'],
      metrics: {
        studentEngagement: '42%',
        courseCompletion: '31%',
        studentSatisfaction: '38%',
        enrollment: '28%'
      }
    }
  ];

  return caseStudies.find(study => study.id === slug);
}

// Generate metadata dynamically based on the case study
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudy(params.slug);
  
  if (!caseStudy) {
    return constructMetadata({
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
      noIndex: true
    });
  }

  return constructMetadata({
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.description,
    keywords: [caseStudy.industry, caseStudy.solutionType, 'case study', 'business results', 'AI implementation', 'success story'],
    openGraph: {
      title: `${caseStudy.title} | Impacto Case Study`,
      description: caseStudy.description,
      url: `https://impactoautomation.com/case-studies/${caseStudy.id}`,
      type: 'article',
      images: [
        {
          url: `https://impactoautomation.com/images/case-studies/${caseStudy.id}.jpg`,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
    twitter: {
      title: caseStudy.title,
      description: caseStudy.description,
    },
    canonicalUrl: `https://impactoautomation.com/case-studies/${caseStudy.id}`,
  });
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudy(params.slug);
  
  if (!caseStudy) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
        <p className="mb-8">The case study you're looking for doesn't exist or has been moved.</p>
        <Link href="/case-studies" className="cta-button-global">
          View All Case Studies
        </Link>
      </div>
    );
  }

  return (
    <>
      <StructuredData
        type="Article"
        data={{
          headline: caseStudy.title,
          description: caseStudy.description,
          image: `https://impactoautomation.com/images/case-studies/${caseStudy.id}.jpg`,
          datePublished: caseStudy.dateCompleted,
          author: {
            '@type': 'Organization',
            name: 'Impacto Automation AI'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Impacto Automation AI',
            logo: {
              '@type': 'ImageObject',
              url: 'https://impactoautomation.com/images/logo.png'
            }
          }
        }}
      />

      <article className="container mx-auto px-4 py-12">
        {/* Breadcrumbs for better navigation and SEO */}
        <nav className="text-sm mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-blue-800">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>
              <Link href="/case-studies" className="text-gray-500 hover:text-blue-800">Case Studies</Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>
              <span className="text-blue-800" aria-current="page">{caseStudy.title}</span>
            </li>
          </ol>
        </nav>

        {/* Header section */}
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {caseStudy.industry}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {caseStudy.solutionType}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{caseStudy.title}</h1>
          
          <p className="text-xl text-gray-600 max-w-3xl">
            {caseStudy.description}
          </p>
        </header>

        {/* Hero image */}
        <div className="relative w-full h-[400px] mb-12 overflow-hidden rounded-xl shadow-lg">
          <PlaceholderImage 
            title={caseStudy.title}
            subtitle={caseStudy.industry}
            className="h-full w-full object-cover"
            colorFrom={caseStudy.industry === 'Technology' ? 'from-purple-500' : 
                      caseStudy.industry === 'Healthcare' ? 'from-green-500' :
                      caseStudy.industry === 'Retail' ? 'from-red-500' :
                      caseStudy.industry === 'Finance' ? 'from-yellow-500' :
                      'from-blue-500'}
            colorTo={caseStudy.industry === 'Technology' ? 'to-purple-700' : 
                    caseStudy.industry === 'Healthcare' ? 'to-green-700' :
                    caseStudy.industry === 'Retail' ? 'to-red-700' :
                    caseStudy.industry === 'Finance' ? 'to-yellow-700' :
                    'to-blue-700'}
          />
        </div>

        {/* Client and project info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Client</h2>
            <p>{caseStudy.clientName}</p>
            <p className="text-gray-600">{caseStudy.clientIndustry}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Solution Type</h2>
            <p>{caseStudy.solutionType}</p>
            <p className="text-gray-600">Completed {new Date(caseStudy.dateCompleted).toLocaleDateString()}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Technologies</h2>
            <ul className="space-y-1">
              {caseStudy.technologies.map((tech, index) => (
                <li key={index} className="text-gray-600">• {tech}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {caseStudy.challenge}
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {caseStudy.solution}
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Implementation</h2>
              <p className="text-gray-700 leading-relaxed">
                {caseStudy.implementation}
              </p>
            </section>
          </div>
          
          <div>
            <div className="bg-blue-50 border-l-4 border-blue-800 p-6 rounded-r-lg sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Key Results</h2>
              <ul className="space-y-4">
                {caseStudy.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-800 mr-3">✓</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
              
              {/* Metrics visualization */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Metrics Improvement</h3>
                {Object.entries(caseStudy.metrics).map(([key, value], index) => {
                  const label = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())
                    .replace(/([A-Z])/g, (match) => ' ' + match);
                  
                  // Calculate proper width for progress bar
                  const getProgressWidth = (val) => {
                    // Extract numeric value from strings like "45%" or "120%"
                    const numericValue = parseInt(val.toString().replace('%', ''));
                    // Cap the width at 100% for display purposes
                    return Math.min(numericValue, 100) + '%';
                  };
                  
                  return (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{label}</span>
                        <span className="text-sm font-semibold">{value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-800 h-2 rounded-full" 
                          style={{ width: getProgressWidth(value) }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <section className="bg-gray-100 p-8 rounded-xl mb-16">
            <blockquote className="text-xl italic text-gray-700 mb-4">
              "{caseStudy.testimonial.quote}"
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {caseStudy.testimonial.author.charAt(0)}
              </div>
              <div className="ml-4">
                <p className="font-semibold">{caseStudy.testimonial.author}</p>
                <p className="text-gray-600 text-sm">{caseStudy.testimonial.position}</p>
              </div>
            </div>
          </section>
        )}

        {/* Call to action */}
        <section className="bg-blue-800 text-white p-10 rounded-xl text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Ready to achieve similar results?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you implement AI-powered solutions tailored to your specific business needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="cta-button-global"
              aria-label="Contact us to discuss your project"
            >
              Contact Us
            </Link>
            <Link 
              href="/assessment" 
              className="cta-button-global"
              aria-label="Take our free assessment"
            >
              Take Free Assessment
            </Link>
          </div>
        </section>

        {/* Related case studies navigation */}
        <section>
          <h2 className="text-2xl font-bold mb-6">More Case Studies</h2>
          <div className="flex justify-between">
            <Link href="/case-studies" className="text-blue-800 hover:underline">
              ← Back to All Case Studies
            </Link>
          </div>
        </section>

        {/* New CTA section */}
        <section className="mt-12">
          <h3 className="text-lg md:text-xl font-bold text-center mb-4">Explore other case studies or get in touch</h3>
          <div className="flex justify-center space-x-4">
            <Link href="/case-studies" className="cta-button-global">
              View All Case Studies
            </Link>
          </div>
        </section>
      </article>
    </>
  );
} 