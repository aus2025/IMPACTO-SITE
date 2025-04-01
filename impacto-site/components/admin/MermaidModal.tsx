'use client';

import React, { useEffect, useState } from 'react';
import { 
  generateSimpleWorkflowDiagram, 
  generateIntegrationsDiagram,
  generateSalesWorkflowDiagram,
  generateCustomerServiceWorkflowDiagram,
  generateDocumentProcessingWorkflowDiagram
} from '@/utils/assessmentDiagramGenerator';

type MermaidModalProps = {
  assessment: any;
  isOpen: boolean;
  onClose: () => void;
};

export default function MermaidModal({ assessment, isOpen, onClose }: MermaidModalProps) {
  const [workflowDiagram, setWorkflowDiagram] = useState<string>('');
  const [integrationDiagram, setIntegrationDiagram] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'workflow' | 'integration'>('workflow');
  const [copySuccess, setCopySuccess] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('auto');
  
  const generateSafeDiagram = (generator: Function, data: any): string => {
    try {
      if (!data) return '';
      
      // Add default empty arrays to prevent null errors
      const safeData = {
        ...data,
        automation_areas: data.automation_areas || [],
        document_types: data.document_types || [],
        existing_systems: data.existing_systems || [],
        workflow_automation_areas: data.workflow_automation_areas || [],
        departments_involved: data.departments_involved || [],
        cs_channels: data.cs_channels || [],
        goals: data.goals || [],
        compliance_concerns: data.compliance_concerns || []
      };
      
      return generator(safeData) || '';
    } catch (error: unknown) {
      console.error("Error in diagram generation:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return `flowchart TD\n  error["Error: ${errorMessage}"]\n`;
    }
  };

  useEffect(() => {
    if (isOpen && assessment) {
      generateDiagram();
    }
    
    // Reset copy status when modal opens
    setCopySuccess('');
  }, [isOpen, assessment, selectedTemplate]);
  
  const generateDiagram = () => {
    try {
      // Generate diagrams based on selected template
      let workflow = '';
      
      switch (selectedTemplate) {
        case 'sales':
          workflow = generateSalesWorkflowDiagram();
          break;
        case 'customer_service':
          workflow = generateCustomerServiceWorkflowDiagram();
          break;
        case 'document_processing':
          workflow = generateDocumentProcessingWorkflowDiagram();
          break;
        case 'auto':
        default:
          workflow = generateSafeDiagram(generateSimpleWorkflowDiagram, assessment);
          break;
      }
      
      const integration = generateSafeDiagram(generateIntegrationsDiagram, assessment);
      
      setWorkflowDiagram(workflow);
      setIntegrationDiagram(integration);
    } catch (error) {
      console.error("Error generating diagrams:", error);
      setWorkflowDiagram('');
      setIntegrationDiagram('');
    }
  };
  
  const handleCopyToClipboard = async () => {
    const textToCopy = activeTab === 'workflow' ? workflowDiagram : integrationDiagram;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess('Copied!');
      
      // Reset the success message after 2 seconds
      setTimeout(() => {
        setCopySuccess('');
      }, 2000);
    } catch (err) {
      setCopySuccess('Failed to copy');
      console.error('Failed to copy text: ', err);
    }
  };
  
  const getMermaidLiveUrl = () => {
    const diagramCode = activeTab === 'workflow' ? workflowDiagram : integrationDiagram;
    if (!diagramCode) return 'https://mermaid.live';
    
    // Encode the diagram for use in URL
    const encodedDiagram = encodeURIComponent(diagramCode);
    return `https://mermaid.live/edit#pako:${btoa(encodedDiagram)}`;
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Mermaid Diagrams for {assessment?.company || 'Assessment'}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setActiveTab('workflow');
                  setCopySuccess('');
                }}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'workflow' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Workflow Diagram
              </button>
              <button
                onClick={() => {
                  setActiveTab('integration');
                  setCopySuccess('');
                }}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'integration' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Integration Diagram
              </button>
            </div>
            
            {activeTab === 'workflow' && (
              <div className="flex items-center space-x-2">
                <label htmlFor="template-select" className="text-sm font-medium text-gray-700">
                  Template:
                </label>
                <select
                  id="template-select"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="auto">Auto-generated</option>
                  <option value="sales">Sales Process</option>
                  <option value="customer_service">Customer Service</option>
                  <option value="document_processing">Document Processing</option>
                </select>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'workflow' ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Workflow Automation Diagram</h3>
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {copySuccess || 'Copy code'}
                </button>
              </div>
              <p className="text-gray-600 text-sm">
                This diagram shows workflow automation opportunities identified from assessment data.
              </p>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 overflow-auto">
                {workflowDiagram ? (
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap">{workflowDiagram}</pre>
                ) : (
                  <div className="text-gray-500 italic py-2">
                    Not enough data to generate a workflow diagram. The assessment may be missing key fields like automation_areas or departments_involved.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">System Integration Diagram</h3>
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {copySuccess || 'Copy code'}
                </button>
              </div>
              <p className="text-gray-600 text-sm">
                This diagram shows system integration relationships identified from assessment data.
              </p>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 overflow-auto">
                {integrationDiagram ? (
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap">{integrationDiagram}</pre>
                ) : (
                  <div className="text-gray-500 italic py-2">
                    Not enough data to generate an integration diagram. The assessment may be missing the existing_systems field.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-3 md:mb-0">
              <p className="text-gray-600 text-sm mb-2">
                Paste the code in any Mermaid-compatible editor 
                (like <a href="https://mermaid.live" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mermaid.live</a>) 
                to visualize this diagram.
              </p>
              <details className="text-sm text-gray-600">
                <summary className="cursor-pointer hover:text-blue-600">How to use Mermaid diagrams</summary>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Click the "Open in Mermaid Live" button to view the diagram directly (fastest option)</li>
                  <li>Or, copy the code above using the "Copy code" button</li>
                  <li>Then go to <a href="https://mermaid.live" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mermaid.live</a> manually</li>
                  <li>Paste the code in the left editor panel</li>
                  <li>View the rendered diagram in the right panel</li>
                  <li>You can customize, save as PNG/SVG, or share the diagram with others</li>
                </ul>
              </details>
            </div>
            <div className="flex items-center">
              <a 
                href={getMermaidLiveUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
              >
                Open in Mermaid Live
              </a>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 