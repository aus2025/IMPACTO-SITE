/**
 * Utility function to generate Mermaid diagrams based on assessment form submissions
 * Visualizes client workflows, automation opportunities, and integration requirements
 */

type AssessmentData = {
  // Business info
  departments_involved?: string[];
  integration_complexity?: string;
  
  // Automation needs
  automation_areas?: string[];
  document_types?: string[];
  existing_systems?: string[];
  workflow_automation_areas?: string[];
  automation_timeline?: string;
  
  // Budget info
  budget_range?: string;

  // Additional info
  specific_challenges?: string;
  
  // Any other fields from the assessment
  [key: string]: any;
};

/**
 * Generates a Mermaid flowchart diagram from assessment data
 */
export function generateWorkflowDiagram(assessmentData: AssessmentData): string {
  try {
    if (!assessmentData) {
      return 'flowchart TD\n  nodata["No assessment data available"]';
    }
    
    const { 
      departments_involved = [], 
      integration_complexity = 'minimal',
      automation_areas = [],
      document_types = [],
      existing_systems = [],
      workflow_automation_areas = [],
      automation_timeline = '',
      budget_range = '',
      specific_challenges = ''
    } = assessmentData;

    // Start building the diagram
    let diagram = 'flowchart TD\n';
    
    // Define node styles based on priorities
    diagram += '  %% Node styles\n';
    diagram += '  classDef department fill:#e1f5fe,stroke:#0288d1,stroke-width:1px\n';
    diagram += '  classDef system fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px\n';
    diagram += '  classDef automation fill:#e8f5e9,stroke:#388e3c,stroke-width:1px\n';
    diagram += '  classDef document fill:#fff8e1,stroke:#ffa000,stroke-width:1px\n';
    
    // Define timeline/priority colors
    diagram += '  classDef highPriority fill:#ffebee,stroke:#c62828,stroke-width:2px\n';
    diagram += '  classDef mediumPriority fill:#fff3e0,stroke:#ef6c00,stroke-width:1.5px\n';
    diagram += '  classDef lowPriority fill:#f1f8e9,stroke:#558b2f,stroke-width:1px\n';
    
    // Define complexity levels
    const complexityLevel = getComplexityLevel(integration_complexity);
    
    // Define priority level based on timeline
    const priorityLevel = getPriorityLevel(automation_timeline);
    
    // Define budget constraints
    const budgetConstraint = getBudgetConstraint(budget_range);
    
    // Add departments as nodes
    diagram += '\n  %% Departments\n';
    if (Array.isArray(departments_involved)) {
      departments_involved.forEach((dept, index) => {
        if (dept) { // Only process if dept exists
          const deptId = `dept_${dept.replace(/\s+/g, '_').toLowerCase()}`;
          diagram += `  ${deptId}["${capitalizeName(dept)} Department"]\n`;
          
          // Apply department style
          diagram += `  class ${deptId} department\n`;
        }
      });
    }
    
    // Add existing systems as nodes
    if (Array.isArray(existing_systems) && existing_systems.length > 0) {
      diagram += '\n  %% Existing Systems\n';
      existing_systems.forEach((system) => {
        if (system) { // Only process if system exists
          const systemId = `system_${system.replace(/\s+/g, '_').toLowerCase()}`;
          diagram += `  ${systemId}["${capitalizeName(system)}"]\n`;
          
          // Apply system style
          diagram += `  class ${systemId} system\n`;
        }
      });
    }
    
    // Add automation areas as nodes
    if (Array.isArray(automation_areas) && automation_areas.length > 0) {
      diagram += '\n  %% Automation Areas\n';
      automation_areas.forEach((area) => {
        if (area) { // Only process if area exists
          const areaId = `auto_${area.replace(/\s+/g, '_').toLowerCase()}`;
          diagram += `  ${areaId}["${capitalizeName(area)}"]\n`;
          
          // Apply automation style with priority
          diagram += `  class ${areaId} automation,${priorityLevel}\n`;
        }
      });
    }
    
    // Add document types if document processing is selected
    if (Array.isArray(automation_areas) && 
        automation_areas.includes('document_processing') && 
        Array.isArray(document_types) && 
        document_types.length > 0) {
      diagram += '\n  %% Document Types\n';
      document_types.forEach((docType) => {
        if (docType) { // Only process if docType exists
          const docId = `doc_${docType.replace(/\s+/g, '_').toLowerCase()}`;
          diagram += `  ${docId}["${capitalizeName(docType)}"]\n`;
          
          // Apply document style
          diagram += `  class ${docId} document\n`;
        }
      });
    }
    
    // Connect departments to automation areas
    diagram += '\n  %% Connections\n';
    
    // Connect departments to each other based on workflow
    if (Array.isArray(departments_involved) && departments_involved.length > 1) {
      for (let i = 0; i < departments_involved.length - 1; i++) {
        if (!departments_involved[i] || !departments_involved[i+1]) continue; // Skip if either department is null
        const deptId1 = `dept_${departments_involved[i].replace(/\s+/g, '_').toLowerCase()}`;
        const deptId2 = `dept_${departments_involved[i + 1].replace(/\s+/g, '_').toLowerCase()}`;
        diagram += `  ${deptId1} -->|"Workflow"| ${deptId2}\n`;
      }
    }
    
    // Connect departments to automation areas
    if (Array.isArray(departments_involved) && Array.isArray(automation_areas)) {
      departments_involved.forEach((dept) => {
        if (!dept) return; // Skip null/undefined departments
        const deptId = `dept_${dept.replace(/\s+/g, '_').toLowerCase()}`;
        
        // Connect to relevant automation areas
        automation_areas.forEach((area) => {
          if (!area) return; // Skip null/undefined areas
          // Only connect if it's relevant to this department
          if (isDepartmentRelevantToArea(dept, area)) {
            const areaId = `auto_${area.replace(/\s+/g, '_').toLowerCase()}`;
            diagram += `  ${deptId} -->|"${getConnectionLabel(area, complexityLevel)}"| ${areaId}\n`;
          }
        });
      });
    }
    
    // Connect automation areas to systems
    if (Array.isArray(automation_areas) && Array.isArray(existing_systems)) {
      automation_areas.forEach((area) => {
        if (!area) return; // Skip null/undefined areas
        const areaId = `auto_${area.replace(/\s+/g, '_').toLowerCase()}`;
        
        // Connect to relevant systems
        existing_systems.forEach((system) => {
          if (!system) return; // Skip null/undefined systems
          // Only connect if it's relevant to this automation area
          if (isSystemRelevantToArea(system, area)) {
            const systemId = `system_${system.replace(/\s+/g, '_').toLowerCase()}`;
            diagram += `  ${areaId} -->|"Integrates"| ${systemId}\n`;
          }
        });
        
        // Connect to relevant document types if document processing
        if (area === 'document_processing' && Array.isArray(document_types)) {
          document_types.forEach((docType) => {
            if (!docType) return; // Skip null/undefined document types
            const docId = `doc_${docType.replace(/\s+/g, '_').toLowerCase()}`;
            diagram += `  ${areaId} -->|"Processes"| ${docId}\n`;
          });
        }
      });
    }
    
    // Add subgraph for workflow automation areas if present
    if (Array.isArray(workflow_automation_areas) && workflow_automation_areas.length > 0) {
      diagram += '\n  %% Workflow Automation Subgraph\n';
      diagram += '  subgraph Workflow_Automation\n';
      workflow_automation_areas.forEach((workflow) => {
        if (!workflow) return; // Skip null/undefined workflows
        const workflowId = `workflow_${workflow.replace(/\s+/g, '_').toLowerCase()}`;
        diagram += `    ${workflowId}["${capitalizeName(workflow)}"]\n`;
        diagram += `    class ${workflowId} automation\n`;
      });
      diagram += '  end\n';
      
      // Connect relevant departments to workflow automation
      if (Array.isArray(departments_involved)) {
        departments_involved.forEach((dept) => {
          if (!dept) return; // Skip null/undefined departments
          const deptId = `dept_${dept.replace(/\s+/g, '_').toLowerCase()}`;
          diagram += `  ${deptId} -->|"Optimizes"| Workflow_Automation\n`;
        });
      }
    }
    
    // Add diagram title and metadata
    diagram += '\n  %% Diagram Metadata\n';
    
    // Add legend
    diagram += '\n  %% Legend\n';
    diagram += '  subgraph Legend\n';
    diagram += '    l_dept["Department"]:::department\n';
    diagram += '    l_system["System"]:::system\n';
    diagram += '    l_auto["Automation Area"]:::automation\n';
    diagram += '    l_doc["Document Type"]:::document\n';
    diagram += '    l_high["High Priority"]:::highPriority\n';
    diagram += '    l_med["Medium Priority"]:::mediumPriority\n';
    diagram += '    l_low["Low Priority"]:::lowPriority\n';
    diagram += '  end\n';
    
    // Add a note about budget/complexity constraints
    diagram += '\n  %% Constraints\n';
    diagram += '  subgraph Constraints\n';
    diagram += `    budget["Budget: ${budgetConstraint}"]\n`;
    diagram += `    complexity["Integration Complexity: ${complexityLevel}"]\n`;
    diagram += `    timeline["Timeline: ${priorityLevel.replace('Priority', '')}"]\n`;
    diagram += '  end\n';
    
    return diagram;
  } catch (error) {
    console.error('Error generating workflow diagram:', error);
    return 'flowchart TD\n  error["Error generating diagram"]';
  }
}

/**
 * Generates a Mermaid entity-relationship diagram showing system integrations
 */
export function generateIntegrationsDiagram(assessmentData: AssessmentData): string {
  try {
    if (!assessmentData) {
      return 'erDiagram\n  NO_DATA {\n    string message "No assessment data available"\n  }';
    }
    
    const { 
      existing_systems = [],
      integration_complexity = 'minimal',
      automation_areas = [],
    } = assessmentData;
    
    // Start building the diagram
    let diagram = 'erDiagram\n';
    
    // Add existing systems as entities
    if (Array.isArray(existing_systems) && existing_systems.length > 0) {
      // Create relationships between systems based on automation needs
      for (let i = 0; i < existing_systems.length; i++) {
        if (!existing_systems[i]) continue; // Skip null/undefined systems
        
        for (let j = i + 1; j < existing_systems.length; j++) {
          if (!existing_systems[j]) continue; // Skip null/undefined systems
          
          const system1 = capitalizeName(existing_systems[i]);
          const system2 = capitalizeName(existing_systems[j]);
          
          // Determine relationship type based on integration complexity
          const relationshipType = getRelationshipType(integration_complexity);
          const relationshipLabel = getIntegrationDescription(
            existing_systems[i], 
            existing_systems[j], 
            Array.isArray(automation_areas) ? automation_areas : []
          );
          
          diagram += `  ${system1} ${relationshipType} ${system2} : "${relationshipLabel}"\n`;
        }
      }
    } else {
      diagram += '  %% No existing systems to display\n';
      diagram += '  NO_SYSTEMS {\n';
      diagram += '    string message "No systems to integrate"\n';
      diagram += '  }\n';
    }
    
    return diagram;
  } catch (error) {
    console.error('Error generating integration diagram:', error);
    return 'erDiagram\n  ERROR {\n    string message "Error generating diagram"\n  }';
  }
}

/**
 * Generates a complete Mermaid diagram report combining multiple diagram types
 */
export function generateCompleteDiagramReport(assessmentData: AssessmentData): string {
  // Generate both workflow and integrations diagrams
  const workflowDiagram = generateWorkflowDiagram(assessmentData);
  const integrationsDiagram = generateIntegrationsDiagram(assessmentData);
  
  // Combine diagrams with section headers
  let report = '# Assessment Automation & Integration Diagram\n\n';
  report += '## Workflow and Automation Opportunities\n\n';
  report += '```mermaid\n';
  report += workflowDiagram;
  report += '```\n\n';
  
  report += '## System Integrations\n\n';
  report += '```mermaid\n';
  report += integrationsDiagram;
  report += '```\n\n';
  
  // Add recommendations section based on assessment data
  report += '## Automation Recommendations\n\n';
  report += generateRecommendations(assessmentData);
  
  return report;
}

/**
 * Helper function to generate text recommendations based on assessment data
 */
function generateRecommendations(assessmentData: AssessmentData): string {
  const { 
    automation_areas = [],
    integration_complexity = 'minimal',
    budget_range = '',
    automation_timeline = '',
    departments_involved = [],
  } = assessmentData;
  
  let recommendations = '';
  
  // Budget-based recommendations
  const budgetConstraint = getBudgetConstraint(budget_range);
  recommendations += `Based on your ${budgetConstraint} budget constraints:\n`;
  
  if (budgetConstraint === 'Low') {
    recommendations += '- Focus on automation with high ROI in single departments first\n';
    recommendations += '- Consider phased implementation approach\n';
  } else if (budgetConstraint === 'Medium') {
    recommendations += '- Implement cross-department automation for high-value processes\n';
    recommendations += '- Include essential system integrations\n';
  } else {
    recommendations += '- Comprehensive automation strategy across all departments\n';
    recommendations += '- Full system integration ecosystem\n';
  }
  
  // Timeline recommendations
  recommendations += `\nBased on your ${automation_timeline} implementation timeline:\n`;
  const priorityLevel = getPriorityLevel(automation_timeline).replace('Priority', '');
  
  if (priorityLevel === 'high') {
    recommendations += '- Utilize rapid deployment methodologies\n';
    recommendations += '- Consider pre-built integration solutions\n';
  } else if (priorityLevel === 'medium') {
    recommendations += '- Balance custom and pre-built solutions\n';
    recommendations += '- Implement core functionality first, then expand\n';
  } else {
    recommendations += '- Develop comprehensive custom solutions\n';
    recommendations += '- Focus on long-term scalability\n';
  }
  
  return recommendations;
}

/**
 * Generates a simplified Mermaid flowchart diagram without complex styling
 * and with a cleaner structure similar to the sales example
 */
export function generateSimpleWorkflowDiagram(assessmentData: AssessmentData): string {
  try {
    if (!assessmentData) {
      return 'flowchart TD\n  A[No assessment data available]';
    }
    
    const { 
      departments_involved = [], 
      integration_complexity = 'minimal',
      automation_areas = [],
      document_types = [],
      existing_systems = [],
      workflow_automation_areas = [],
      specific_challenges = ''
    } = assessmentData;

    // Start building the diagram with a clean structure
    let diagram = 'flowchart TD\n';
    
    // Determine the main workflow based on existing systems and automation areas
    let nodes = [];
    let connections = [];
    
    // Build a simplified flow based on the automation areas
    if (Array.isArray(automation_areas) && automation_areas.length > 0) {
      const validAreas = automation_areas.filter(area => area); // Remove nulls
      
      if (validAreas.includes('document_processing')) {
        nodes.push('A[Document Upload]');
        nodes.push('B[Document Processing]');
        nodes.push('C{Validation Check}');
        connections.push('A --> B');
        connections.push('B --> C');
        connections.push('C -->|Valid| D[Store Document]');
        connections.push('C -->|Invalid| E[Return for Correction]');
        connections.push('E --> A');
        
        if (Array.isArray(document_types) && document_types.length > 0) {
          nodes.push('D --> F[Document Classification]');
          
          const validDocs = document_types.filter(doc => doc);
          if (validDocs.length > 0) {
            const docNode = 'G{Document Type}';
            nodes.push('F --> ' + docNode);
            
            validDocs.forEach((doc, index) => {
              const nodeId = String.fromCharCode(72 + index); // H, I, J, etc.
              nodes.push(`${docNode} -->|${capitalizeName(doc)}| ${nodeId}[Process ${capitalizeName(doc)}]`);
            });
          }
        }
      }
      
      if (validAreas.includes('workflow')) {
        if (nodes.length === 0) {
          nodes.push('A[Start Workflow]');
          nodes.push('B[Process Task]');
          nodes.push('C{Decision Point}');
          connections.push('A --> B');
          connections.push('B --> C');
          connections.push('C -->|Option 1| D[Path 1]');
          connections.push('C -->|Option 2| E[Path 2]');
          connections.push('D --> F[Complete Task]');
          connections.push('E --> F');
        }
        
        if (Array.isArray(workflow_automation_areas) && workflow_automation_areas.length > 0) {
          const validWorkflows = workflow_automation_areas.filter(wf => wf);
          if (validWorkflows.length > 0) {
            let lastNodeId = 'F';
            nodes.push('F --> G[Workflow Automation]');
            
            validWorkflows.forEach((workflow, index) => {
              const nodeId = String.fromCharCode(72 + index); // H, I, J, etc.
              nodes.push(`G --> ${nodeId}[${capitalizeName(workflow)}]`);
            });
          }
        }
      }
      
      if (validAreas.includes('data_entry')) {
        if (nodes.length === 0) {
          nodes.push('A[Data Source]');
          nodes.push('B[Data Extraction]');
          nodes.push('C[Data Validation]');
          nodes.push('D{Valid Data?}');
          connections.push('A --> B');
          connections.push('B --> C');
          connections.push('C --> D');
          connections.push('D -->|Yes| E[Data Storage]');
          connections.push('D -->|No| F[Error Handling]');
          connections.push('F --> B');
        }
      }
      
      if (validAreas.includes('customer_service')) {
        if (nodes.length === 0) {
          nodes.push('A[Customer Inquiry]');
          nodes.push('B[Automated Response]');
          nodes.push('C{Resolved?}');
          connections.push('A --> B');
          connections.push('B --> C');
          connections.push('C -->|Yes| D[Close Ticket]');
          connections.push('C -->|No| E[Escalate to Agent]');
          connections.push('E --> F[Human Resolution]');
          connections.push('F --> D');
        }
      }
    }
    
    // If we have existing systems but no nodes yet, create a simple flow
    if (Array.isArray(existing_systems) && existing_systems.length > 0 && nodes.length === 0) {
      const validSystems = existing_systems.filter(sys => sys);
      
      if (validSystems.length > 0) {
        nodes.push('A[Data Source]');
        
        if (validSystems.length === 1) {
          nodes.push(`B[${capitalizeName(validSystems[0])}]`);
          connections.push('A --> B');
          nodes.push('B --> C[Process Complete]');
        } else {
          nodes.push('B{System Selection}');
          connections.push('A --> B');
          
          validSystems.forEach((system, index) => {
            const nodeId = String.fromCharCode(67 + index); // C, D, E, etc.
            nodes.push(`B -->|${capitalizeName(system)}| ${nodeId}[Process in ${capitalizeName(system)}]`);
            nodes.push(`${nodeId} --> Z[Process Complete]`);
          });
        }
      }
    }
    
    // If we still have no nodes, create a default simple flow
    if (nodes.length === 0) {
      nodes.push('A[Start Process]');
      nodes.push('B[Automate Task]');
      nodes.push('C{Decision Point}');
      nodes.push('C -->|Option 1| D[Path 1]');
      nodes.push('C -->|Option 2| E[Path 2]');
      nodes.push('D --> F[Task Complete]');
      nodes.push('E --> F');
      
      connections.push('A --> B');
      connections.push('B --> C');
    }
    
    // Add all nodes and connections to the diagram
    nodes.forEach(node => {
      diagram += `    ${node}\n`;
    });
    
    connections.forEach(connection => {
      if (!nodes.some(node => node.includes(connection))) {
        diagram += `    ${connection}\n`;
      }
    });
    
    return diagram;
  } catch (error) {
    console.error('Error generating simple workflow diagram:', error);
    return 'flowchart TD\n    A[Error] --> B[Generating Diagram]';
  }
}

/**
 * Generates a sales process Mermaid flowchart similar to the provided example
 */
export function generateSalesWorkflowDiagram(): string {
  return `flowchart TD
    A[Lead Generation] --> B[Lead Qualification]
    B --> C{Qualified?}
    C -->|Yes| D[Initial Contact]
    C -->|No| E[Return to Nurturing]
    D --> F[Discovery Call]
    F --> G[Proposal Creation]
    G --> H[Proposal Presentation]
    H --> I{Client Decision}
    I -->|Accepted| J[Contract Negotiation]
    I -->|Rejected| K[Feedback Collection]
    K --> L[Adjust Approach]
    L --> G
    J --> M[Deal Closure]
    M --> N[Onboarding]
    N --> O[Account Management]`;
}

/**
 * Generates a customer service workflow diagram
 */
export function generateCustomerServiceWorkflowDiagram(): string {
  return `flowchart TD
    A[Customer Inquiry] --> B[Ticket Creation]
    B --> C[Automated Categorization]
    C --> D{Priority Level}
    D -->|High| E[Immediate Response]
    D -->|Medium| F[Same-Day Response]
    D -->|Low| G[Standard Response]
    E --> H[Resolution Process]
    F --> H
    G --> H
    H --> I{Resolved?}
    I -->|Yes| J[Ticket Closed]
    I -->|No| K[Escalation]
    K --> L[Specialist Review]
    L --> M[Advanced Solution]
    M --> N{Customer Satisfied?}
    N -->|Yes| J
    N -->|No| O[Management Review]
    O --> P[Final Resolution]
    P --> J`;
}

/**
 * Generates a document processing workflow diagram
 */
export function generateDocumentProcessingWorkflowDiagram(): string {
  return `flowchart TD
    A[Document Upload] --> B[Document Classification]
    B --> C[Data Extraction]
    C --> D{Validation}
    D -->|Valid| E[Data Processing]
    D -->|Invalid| F[Error Handling]
    F --> G[Manual Review]
    G --> C
    E --> H[Database Update]
    H --> I[Notification]
    I --> J[Document Storage]
    J --> K[Process Complete]`;
}

/* Helper Functions */

/**
 * Capitalize the first letter of each word in a string
 */
function capitalizeName(str: string): string {
  if (!str) return '';
  
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Determine if a department is relevant to an automation area
 */
function isDepartmentRelevantToArea(department: string, area: string): boolean {
  if (!department || !area) return false;
  
  // Simplified mapping based on common relevance
  const relevanceMap: Record<string, string[]> = {
    'sales': ['sales', 'customer_service', 'document_processing'],
    'marketing': ['sales', 'customer_service', 'document_processing'],
    'operations': ['workflow', 'document_processing', 'inventory'],
    'engineering': ['workflow', 'data_entry'],
    'customer_service': ['customer_service', 'workflow'],
    'finance': ['accounting', 'document_processing', 'workflow'],
    'hr': ['hr', 'document_processing', 'workflow'],
    'it': ['workflow', 'data_entry', 'document_processing'],
    'legal': ['document_processing', 'workflow'],
    'administration': ['workflow', 'document_processing', 'data_entry'],
    'service': ['customer_service', 'workflow']
  };
  
  // Convert department to lowercase and handle variations
  const deptLower = department.toLowerCase();
  const normalizedDept = Object.keys(relevanceMap).find(key => 
    deptLower.includes(key) || key.includes(deptLower)
  ) || deptLower;
  
  // If we have a specific mapping, use it
  if (relevanceMap[normalizedDept]) {
    return relevanceMap[normalizedDept].includes(area);
  }
  
  // Otherwise, all departments can benefit from workflow automation
  return area === 'workflow';
}

/**
 * Determine if a system is relevant to an automation area
 */
function isSystemRelevantToArea(system: string, area: string): boolean {
  if (!system || !area) return false;
  
  // Simplified mapping based on common relevance
  const relevanceMap: Record<string, string[]> = {
    'crm': ['customer_service', 'sales', 'workflow'],
    'erp': ['accounting', 'inventory', 'workflow', 'hr'],
    'accounting': ['accounting', 'document_processing'],
    'hrms': ['hr', 'document_processing'],
    'ecommerce': ['sales', 'inventory', 'customer_service'],
    'pos': ['sales', 'inventory'],
    'project': ['workflow', 'document_processing'],
    'cms': ['document_processing', 'workflow'],
    'ticketing': ['customer_service', 'workflow']
  };
  
  // Convert system to lowercase and handle variations
  const sysLower = system.toLowerCase();
  const normalizedSys = Object.keys(relevanceMap).find(key => 
    sysLower.includes(key) || key.includes(sysLower)
  ) || sysLower;
  
  // If we have a specific mapping, use it
  if (relevanceMap[normalizedSys]) {
    return relevanceMap[normalizedSys].includes(area);
  }
  
  // Default to no connection if we can't determine relevance
  return false;
}

/**
 * Get appropriate connection label based on area and complexity
 */
function getConnectionLabel(area: string, complexity: string): string {
  if (!area) return 'Connects to';
  
  const areaLabels: Record<string, string> = {
    'document_processing': 'Processes documents',
    'customer_service': 'Improves service',
    'accounting': 'Manages finances',
    'hr': 'Handles HR tasks',
    'inventory': 'Tracks inventory',
    'sales': 'Supports sales',
    'data_entry': 'Automates data',
    'workflow': 'Streamlines workflow'
  };
  
  return areaLabels[area] || 'Automates';
}

/**
 * Get relationship type based on integration complexity
 */
function getRelationshipType(complexity: string): string {
  if (!complexity) return '||--o{';
  
  const complexityMap: Record<string, string> = {
    'low': '||--o{',
    'minimal': '||--o{',
    'medium': '||--||',
    'high': '}o--||',
    'very_high': '}|--|{'
  };
  
  return complexityMap[complexity] || '||--o{';
}

/**
 * Get complexity level from string
 */
function getComplexityLevel(complexity: string): string {
  if (!complexity) return 'Medium';
  
  const complexityMap: Record<string, string> = {
    'low': 'Low',
    'minimal': 'Low',
    'medium': 'Medium',
    'high': 'High',
    'very_high': 'Very High'
  };
  
  return complexityMap[complexity] || 'Medium';
}

/**
 * Get priority level based on timeline
 */
function getPriorityLevel(timeline: string): string {
  if (!timeline) return 'mediumPriority';
  
  const priorityMap: Record<string, string> = {
    'immediate': 'highPriority',
    '3months': 'highPriority',
    '6months': 'mediumPriority',
    '12months': 'lowPriority',
    'exploring': 'lowPriority'
  };
  
  return priorityMap[timeline] || 'mediumPriority';
}

/**
 * Get budget constraint label
 */
function getBudgetConstraint(budget: string): string {
  if (!budget) return 'Not specified';
  
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

/**
 * Get appropriate integration description based on systems and automation needs
 */
function getIntegrationDescription(system1: string, system2: string, automationAreas: string[]): string {
  if (!system1 || !system2) return 'connects';
  
  // If both systems are the same type, return a generic message
  if (system1 === system2) {
    return 'syncs with';
  }
  
  // Specific integrations based on common system pairs
  const integrationPairs: Record<string, Record<string, string>> = {
    'crm': {
      'erp': 'customer data sync',
      'accounting': 'billing integration',
      'ecommerce': 'customer orders',
      'pos': 'in-store purchases',
      'project': 'customer projects'
    },
    'erp': {
      'accounting': 'financial data',
      'hrms': 'employee data',
      'inventory': 'stock management',
      'pos': 'sales data'
    },
    'accounting': {
      'pos': 'transaction data',
      'hrms': 'payroll processing',
      'ecommerce': 'order financials'
    }
  };
  
  // Check if we have a specific integration pair
  if (integrationPairs[system1]?.[system2]) {
    return integrationPairs[system1][system2];
  }
  if (integrationPairs[system2]?.[system1]) {
    return integrationPairs[system2][system1];
  }
  
  // If we have automation areas, use the most relevant one
  if (Array.isArray(automationAreas) && automationAreas.length > 0) {
    if (automationAreas.includes('document_processing')) {
      return 'document flow';
    }
    if (automationAreas.includes('workflow')) {
      return 'process integration';
    }
    if (automationAreas.includes('data_entry')) {
      return 'data exchange';
    }
  }
  
  // Default generic integration
  return 'data integration';
}

/**
 * Usage Examples
 * 
 * Example 1: Basic workflow diagram generation from assessment data
 * 
 * ```typescript
 * import { generateWorkflowDiagram } from '@/utils/assessmentDiagramGenerator';
 * 
 * // Inside a component or function
 * const assessmentData = {
 *   departments_involved: ['it', 'finance', 'operations'],
 *   integration_complexity: 'moderate',
 *   automation_areas: ['document_processing', 'data_entry'],
 *   document_types: ['invoices', 'reports', 'forms'],
 *   existing_systems: ['erp', 'accounting', 'crm'],
 *   workflow_automation_areas: ['data_transfer', 'document_generation'],
 *   automation_timeline: '3-6_months',
 *   budget_range: '$15,000 - $50,000'
 * };
 * 
 * // Generate Mermaid diagram code
 * const diagramCode = generateWorkflowDiagram(assessmentData);
 * 
 * // Use with a Mermaid rendering component
 * return <MermaidDiagram code={diagramCode} />;
 * ```
 * 
 * Example 2: Generate a complete report with multiple diagrams
 * 
 * ```typescript
 * import { generateCompleteDiagramReport } from '@/utils/assessmentDiagramGenerator';
 * 
 * // When generating a report from assessment data
 * export async function generateDiagramReport(assessmentId: string) {
 *   // Fetch assessment data from API or database
 *   const assessmentData = await fetchAssessmentData(assessmentId);
 *   
 *   // Generate complete report with multiple diagrams
 *   const reportMarkdown = generateCompleteDiagramReport(assessmentData);
 *   
 *   // Return markdown content for rendering or download
 *   return reportMarkdown;
 * }
 * ```
 * 
 * Example 3: Integrating with a page to display diagrams
 * 
 * ```tsx
 * // In a page component
 * import { generateWorkflowDiagram, generateIntegrationsDiagram } from '@/utils/assessmentDiagramGenerator';
 * import dynamic from 'next/dynamic';
 * 
 * // Dynamically import a Mermaid component to render the diagrams
 * const MermaidChart = dynamic(() => import('@/components/MermaidChart'), { ssr: false });
 * 
 * export default function AssessmentVisualizationPage({ assessmentData }) {
 *   // Generate diagram code
 *   const workflowDiagram = generateWorkflowDiagram(assessmentData);
 *   const integrationsDiagram = generateIntegrationsDiagram(assessmentData);
 *   
 *   return (
 *     <div className="space-y-8">
 *       <section>
 *         <h2 className="text-xl font-bold mb-4">Workflow Automation Diagram</h2>
 *         <div className="border p-4 bg-white rounded-lg">
 *           <MermaidChart chart={workflowDiagram} />
 *         </div>
 *       </section>
 *       
 *       <section>
 *         <h2 className="text-xl font-bold mb-4">System Integrations</h2>
 *         <div className="border p-4 bg-white rounded-lg">
 *           <MermaidChart chart={integrationsDiagram} />
 *         </div>
 *       </section>
 *     </div>
 *   );
 * }
 * ```
 */ 