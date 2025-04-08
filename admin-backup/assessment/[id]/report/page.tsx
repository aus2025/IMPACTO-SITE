'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { generateWorkflowDiagram, generateIntegrationsDiagram } from '@/utils/assessmentDiagramGenerator';

// This would typically be imported, but we're showing it inline since we couldn't install mermaid
const DiagramCode = ({ code, title }: { code: string; title: string }) => (
  <div className="my-6">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 overflow-auto">
      <pre className="text-sm text-gray-800">{code}</pre>
    </div>
  </div>
);

export default function AssessmentReportPage() {
  const params = useParams();
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [workflowDiagram, setWorkflowDiagram] = useState<string>('');
  const [integrationDiagram, setIntegrationDiagram] = useState<string>('');
  
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const id = params.id as string;
        if (!id) {
          setError('Assessment ID not provided');
          setLoading(false);
          return;
        }
        
        const supabase = createClient();
        const { data, error } = await supabase
          .from('business_assessments')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (!data) {
          setError('Assessment not found');
          setLoading(false);
          return;
        }
        
        setAssessment(data);
        
        // Generate diagrams
        const workflow = generateWorkflowDiagram(data);
        const integration = generateIntegrationsDiagram(data);
        
        setWorkflowDiagram(workflow);
        setIntegrationDiagram(integration);
      } catch (err) {
        console.error('Error fetching assessment:', err);
        setError('Failed to load assessment details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssessment();
  }, [params.id]);
  
  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-700"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto py-12">
        <div className="bg-red-50 border border-red-300 rounded-md p-6 text-center">
          <h2 className="text-red-800 text-xl font-semibold">Error</h2>
          <p className="text-red-700 mt-2">{error}</p>
        </div>
      </div>
    );
  }
  
  if (!assessment) {
    return (
      <div className="container mx-auto py-12">
        <div className="bg-yellow-50 border border-yellow-300 rounded-md p-6 text-center">
          <h2 className="text-yellow-800 text-xl font-semibold">Assessment Not Found</h2>
          <p className="text-yellow-700 mt-2">The assessment you're looking for could not be found.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Automation Assessment Report</h1>
        <p className="text-gray-600 mb-8">Reference ID: {assessment.reference_id || assessment.id}</p>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Business Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p className="text-gray-600 text-sm">Company</p>
              <p className="font-medium">{assessment.company}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Industry</p>
              <p className="font-medium">{assessment.industry}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Company Size</p>
              <p className="font-medium">{assessment.employees}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Contact</p>
              <p className="font-medium">{assessment.fullName}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Automation Insights</h2>
          
          {assessment.automation_areas && assessment.automation_areas.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {assessment.automation_areas.map((area: string) => (
                  <span 
                    key={area} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {formatLabel(area)}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {assessment.existing_systems && assessment.existing_systems.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Existing Systems</h3>
              <div className="flex flex-wrap gap-2">
                {assessment.existing_systems.map((system: string) => (
                  <span 
                    key={system} 
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {formatLabel(system)}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mt-6">
            <div>
              <p className="text-gray-600 text-sm">Automation Timeline</p>
              <p className="font-medium">{formatTimelineLabel(assessment.automation_timeline)}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Budget Range</p>
              <p className="font-medium">{formatBudgetLabel(assessment.budget_range)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Workflow Diagrams</h2>
          <p className="text-gray-600 mb-6">
            These diagrams visualize your automation opportunities and system integrations.
            To view these diagrams, you can copy the code below into any Mermaid-compatible viewer.
          </p>
          
          <DiagramCode code={workflowDiagram} title="Workflow Automation Diagram" />
          
          {assessment.existing_systems && assessment.existing_systems.length > 0 && (
            <DiagramCode code={integrationDiagram} title="Systems Integration Diagram" />
          )}
          
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-8">
            <h3 className="text-blue-800 font-semibold mb-1">How to use these diagrams</h3>
            <p className="text-blue-700 text-sm">
              You can paste the diagram code into any Mermaid-compatible editor or viewer, such as:
            </p>
            <ul className="text-blue-700 text-sm list-disc list-inside mt-2">
              <li>Mermaid Live Editor: <a href="https://mermaid.live" className="underline" target="_blank" rel="noopener noreferrer">https://mermaid.live</a></li>
              <li>GitHub Markdown (in code blocks with mermaid syntax)</li>
              <li>VS Code with Mermaid extension</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
          <p className="text-gray-700">
            Our team will contact you soon to discuss the detailed findings of this assessment
            and provide recommendations for implementing these automation solutions.
          </p>
          
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
            <h3 className="text-lg font-semibold mb-2">Your Consultation Preference</h3>
            <p className="text-gray-700">
              {formatConsultationPreference(assessment.consultation_preference)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions for formatting labels
function formatLabel(value: string): string {
  // Convert snake_case to Title Case
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatTimelineLabel(timeline: string): string {
  const timelineMap: Record<string, string> = {
    'immediate': 'As soon as possible',
    '3months': 'Within 3 months',
    '6months': 'Within 6 months',
    '12months': 'Within 12 months',
    'exploring': 'Just exploring options'
  };
  
  return timelineMap[timeline] || timeline;
}

function formatBudgetLabel(budget: string): string {
  const budgetMap: Record<string, string> = {
    'under5k': 'Under $5,000',
    '5k-15k': '$5,000 - $15,000',
    '15k-50k': '$15,000 - $50,000',
    '50k-100k': '$50,000 - $100,000',
    '100k+': 'Over $100,000',
    'undecided': 'Not yet determined'
  };
  
  return budgetMap[budget] || budget;
}

function formatConsultationPreference(preference: string): string {
  const preferenceMap: Record<string, string> = {
    'email': 'Email consultation',
    'call': 'Phone call',
    'video': 'Video call',
    'in_person': 'In-person meeting'
  };
  
  return preferenceMap[preference] || preference || 'Not specified';
} 