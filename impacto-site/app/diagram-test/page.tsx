'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  generateSalesWorkflowDiagram,
  generateCustomerServiceWorkflowDiagram,
  generateDocumentProcessingWorkflowDiagram,
  generateSimpleWorkflowDiagram
} from '@/utils/assessmentDiagramGenerator';

// Dynamically import the Mermaid component to prevent SSR issues
const Mermaid = dynamic(() => import('@/components/Mermaid'), { ssr: false });

export default function DiagramTestPage() {
  const [activeTemplate, setActiveTemplate] = useState<string>('sales');
  
  // Get the selected diagram based on template
  const getDiagram = (): string => {
    switch (activeTemplate) {
      case 'sales': 
        return generateSalesWorkflowDiagram();
      case 'customer_service': 
        return generateCustomerServiceWorkflowDiagram();
      case 'document_processing': 
        return generateDocumentProcessingWorkflowDiagram();
      case 'simple': 
        // Sample assessment data for testing
        const sampleData = {
          automation_areas: ['document_processing', 'workflow'],
          document_types: ['invoices', 'contracts'],
          existing_systems: ['crm', 'accounting'],
          workflow_automation_areas: ['approval_process', 'data_sync']
        };
        return generateSimpleWorkflowDiagram(sampleData);
      default:
        return generateSalesWorkflowDiagram();
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mermaid Diagram Examples</h1>
      
      <div className="mb-6">
        <label htmlFor="template-selector" className="block text-sm font-medium text-gray-700 mb-2">
          Select a template:
        </label>
        <select
          id="template-selector"
          value={activeTemplate}
          onChange={(e) => setActiveTemplate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4"
        >
          <option value="sales">Sales Process</option>
          <option value="customer_service">Customer Service</option>
          <option value="document_processing">Document Processing</option>
          <option value="simple">Auto-generated (Sample)</option>
        </select>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {activeTemplate === 'sales' && 'Sales Process Flow'}
          {activeTemplate === 'customer_service' && 'Customer Service Flow'}
          {activeTemplate === 'document_processing' && 'Document Processing Flow'}
          {activeTemplate === 'simple' && 'Auto-generated Sample Flow'}
        </h2>
        
        <div className="border rounded-lg p-4 bg-gray-50">
          <Mermaid 
            chart={getDiagram()} 
            config={{ 
              theme: 'neutral',
              flowchart: { curve: 'basis' }
            }} 
          />
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Diagram Code:</h3>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-md text-sm overflow-auto">
            {getDiagram()}
          </pre>
        </div>
      </div>
    </div>
  );
} 