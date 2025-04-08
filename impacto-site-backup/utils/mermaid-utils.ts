import { BusinessAssessment } from '@/types/assessment';

export function generateMermaidFlow(assessment: BusinessAssessment): string {
  if (!assessment) {
    return 'graph TD\n  A[No Assessment Data]';
  }

  let diagram = 'graph TD\n';
  
  // Basic flow for business assessment
  diagram += '  User[User/Client] -->|Submits| Assessment[Business Assessment]\n';
  diagram += '  Assessment -->|Generates| Report[Assessment Report]\n';
  diagram += '  Report -->|Identifies| Opportunities[Automation Opportunities]\n';
  
  // Add custom nodes based on assessment data
  if (assessment.business_info) {
    diagram += '  Assessment -->|Contains| BusinessInfo[Business Information]\n';
  }
  
  if (assessment.automation_needs) {
    diagram += '  Assessment -->|Defines| AutomationNeeds[Automation Needs]\n';
    diagram += '  AutomationNeeds -->|Influences| Opportunities\n';
  }
  
  if (assessment.budget) {
    diagram += '  Budget[Budget Constraints] -->|Affects| Implementation[Implementation Plan]\n';
    diagram += '  Opportunities -->|Leads to| Implementation\n';
  }
  
  return diagram;
}

export function generateMermaidSequence(assessment: BusinessAssessment): string {
  if (!assessment) {
    return 'sequenceDiagram\n  participant User\n  participant System\n  Note over User,System: No assessment data available';
  }

  let diagram = 'sequenceDiagram\n';
  diagram += '  participant User as Client\n';
  diagram += '  participant AS as Assessment System\n';
  diagram += '  participant CS as Consultation Service\n';
  diagram += '  participant IS as Implementation Service\n\n';
  
  diagram += '  User->>AS: Submit business information\n';
  diagram += '  AS->>AS: Process assessment data\n';
  diagram += '  AS->>User: Generate initial report\n';
  diagram += '  User->>CS: Request consultation\n';
  diagram += '  CS->>User: Provide recommendations\n';
  diagram += '  User->>IS: Approve implementation plan\n';
  diagram += '  IS->>User: Deliver automation solution\n';
  
  // Add notes based on assessment data
  if (assessment.company) {
    diagram += `  Note over User: ${assessment.company}\n`;
  }
  
  if (assessment.budget) {
    diagram += '  Note over User,IS: Budget considerations apply\n';
  }
  
  return diagram;
}

export function generateMermaidERD(assessment: BusinessAssessment): string {
  return `erDiagram
    BUSINESS_ASSESSMENT ||--o{ AUTOMATION_NEEDS : contains
    BUSINESS_ASSESSMENT ||--o{ BUDGET_INFO : has
    BUSINESS_ASSESSMENT ||--|| BUSINESS_INFO : describes
    BUSINESS_ASSESSMENT ||--o{ CONTACT_INFO : provides
    
    BUSINESS_ASSESSMENT {
        string id PK
        string full_name
        string company
        string email
        date created_at
        date updated_at
        string status
        bool completed
    }
    
    BUSINESS_INFO {
        string id PK
        string assessment_id FK
        string industry
        int employee_count
        string current_systems
    }
    
    AUTOMATION_NEEDS {
        string id PK
        string assessment_id FK
        string areas
        string processes
        string challenges
    }
    
    BUDGET_INFO {
        string id PK
        string assessment_id FK
        string range
        string timeline
        string roi_expectations
    }
    
    CONTACT_INFO {
        string id PK
        string assessment_id FK
        string name
        string email
        string phone
        string preferred_contact
    }`;
} 