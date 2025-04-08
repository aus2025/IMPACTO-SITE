-- Create assessment_templates table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.assessment_templates (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  form_schema JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_by TEXT
);

-- Add comment on table
COMMENT ON TABLE public.assessment_templates IS 'Assessment templates for business automation assessments';

-- Make sure business_assessments table has all necessary fields to match template structure

-- First, update or create the table to ensure it has basic columns
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_assessments') THEN
    CREATE TABLE public.business_assessments (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    );
  END IF;
END $$;

-- Add all the fields based on the structure seen in the template
ALTER TABLE public.business_assessments
  -- Contact info section
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS role TEXT,
  
  -- Business info section
  ADD COLUMN IF NOT EXISTS industry TEXT,
  ADD COLUMN IF NOT EXISTS employees TEXT,
  ADD COLUMN IF NOT EXISTS goals TEXT[],
  ADD COLUMN IF NOT EXISTS compliance_concerns TEXT[],
  ADD COLUMN IF NOT EXISTS patient_data TEXT,
  ADD COLUMN IF NOT EXISTS inventory_management TEXT,
  ADD COLUMN IF NOT EXISTS sales_channels TEXT[],
  
  -- Automation needs section
  ADD COLUMN IF NOT EXISTS automation_areas TEXT[],
  ADD COLUMN IF NOT EXISTS document_types TEXT[],
  ADD COLUMN IF NOT EXISTS document_volume TEXT,
  ADD COLUMN IF NOT EXISTS cs_channels TEXT[],
  ADD COLUMN IF NOT EXISTS automation_experience TEXT,
  ADD COLUMN IF NOT EXISTS existing_systems TEXT[],
  ADD COLUMN IF NOT EXISTS automation_timeline TEXT,
  
  -- Budget section
  ADD COLUMN IF NOT EXISTS budget_range TEXT,
  ADD COLUMN IF NOT EXISTS funding_source TEXT,
  ADD COLUMN IF NOT EXISTS decision_timeline TEXT,
  ADD COLUMN IF NOT EXISTS investment_factors TEXT[],
  ADD COLUMN IF NOT EXISTS budget_constraints TEXT,
  
  -- Additional info section
  ADD COLUMN IF NOT EXISTS referral_source TEXT,
  ADD COLUMN IF NOT EXISTS consultation_preference TEXT,
  ADD COLUMN IF NOT EXISTS additional_comments TEXT,
  ADD COLUMN IF NOT EXISTS consent_terms BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS consent_marketing BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS assigned_to TEXT,
  ADD COLUMN IF NOT EXISTS template_id BIGINT REFERENCES public.assessment_templates(id);

-- Handle potential discrepancies in column names
DO $$ 
BEGIN
  -- Check if company_name exists but company doesn't
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'business_assessments'
    AND column_name = 'company_name'
  ) AND NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'business_assessments'
    AND column_name = 'company'
  ) THEN
    -- Add column alias via view for compatibility
    EXECUTE 'ALTER TABLE public.business_assessments ADD COLUMN company TEXT';
    EXECUTE 'UPDATE public.business_assessments SET company = company_name WHERE company IS NULL';
  END IF;
END $$;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS business_assessments_created_at_idx ON public.business_assessments (created_at DESC);
CREATE INDEX IF NOT EXISTS business_assessments_email_idx ON public.business_assessments (email);
CREATE INDEX IF NOT EXISTS assessment_templates_active_idx ON public.assessment_templates (is_active);

-- Add Row Level Security to assessment_templates table
ALTER TABLE public.assessment_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for assessment_templates
CREATE POLICY "Allow authenticated users to view templates" 
  ON public.assessment_templates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to create templates" 
  ON public.assessment_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update templates" 
  ON public.assessment_templates
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete templates" 
  ON public.assessment_templates
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert the template from the JSON file if not exists
INSERT INTO public.assessment_templates (name, is_active, form_schema)
SELECT 
  'Business Automation Assessment',
  TRUE,
  '{
    "steps": [
      {"id": 1, "title": "Contact Info"},
      {"id": 2, "title": "Business Info"},
      {"id": 3, "title": "Automation Needs"},
      {"id": 4, "title": "Budget"},
      {"id": 5, "title": "Additional Info"}
    ],
    "fields": {
      "fullName": {"label": "Full Name", "type": "text", "required": true, "section": 1},
      "email": {"label": "Email Address", "type": "email", "required": true, "section": 1},
      "phone": {"label": "Phone Number", "type": "tel", "required": true, "section": 1},
      "company": {"label": "Company Name", "type": "text", "required": true, "section": 1},
      "role": {"label": "Your Role", "type": "select", "required": true, "section": 1, 
        "options": [
          {"value": "owner", "label": "Business Owner"},
          {"value": "executive", "label": "Executive/C-Level"},
          {"value": "manager", "label": "Manager"},
          {"value": "director", "label": "Director"},
          {"value": "other", "label": "Other"}
        ]
      },
      "industry": {"label": "Industry", "type": "select", "required": true, "section": 2, 
        "options": [
          {"value": "healthcare", "label": "Healthcare"},
          {"value": "financial", "label": "Financial Services"},
          {"value": "retail", "label": "Retail & E-commerce"},
          {"value": "manufacturing", "label": "Manufacturing"},
          {"value": "professional_services", "label": "Professional Services"},
          {"value": "education", "label": "Education"},
          {"value": "hospitality", "label": "Hospitality & Tourism"},
          {"value": "construction", "label": "Construction"},
          {"value": "technology", "label": "Technology"},
          {"value": "other", "label": "Other"}
        ]
      },
      "employees": {"label": "Number of Employees", "type": "select", "required": true, "section": 2, 
        "options": [
          {"value": "1-10", "label": "1-10 employees"},
          {"value": "11-50", "label": "11-50 employees"},
          {"value": "51-200", "label": "51-200 employees"},
          {"value": "201-500", "label": "201-500 employees"},
          {"value": "501-1000", "label": "501-1000 employees"},
          {"value": "1000+", "label": "More than 1000 employees"}
        ]
      },
      "goals": {"label": "Business Goals", "type": "checkbox-group", "required": true, "section": 2, 
        "options": [
          {"value": "cost_reduction", "label": "Cost reduction"},
          {"value": "growth", "label": "Business growth"},
          {"value": "efficiency", "label": "Operational efficiency"},
          {"value": "customer_experience", "label": "Improved customer experience"},
          {"value": "competitive_advantage", "label": "Competitive advantage"},
          {"value": "compliance", "label": "Regulatory compliance"},
          {"value": "digital_transformation", "label": "Digital transformation"}
        ]
      },
      "compliance_concerns": {"label": "Compliance Concerns", "type": "checkbox-group", "required": false, "section": 2, 
        "options": [
          {"value": "hipaa", "label": "HIPAA"},
          {"value": "gdpr", "label": "GDPR"},
          {"value": "ccpa", "label": "CCPA"},
          {"value": "pci", "label": "PCI DSS"},
          {"value": "sox", "label": "Sarbanes-Oxley"},
          {"value": "iso", "label": "ISO 27001"},
          {"value": "other", "label": "Other"}
        ]
      },
      "patient_data": {"label": "Patient Data Handling", "type": "select", "required": false, "section": 2, 
        "options": [
          {"value": "none", "label": "We don''t handle patient data"},
          {"value": "limited", "label": "Limited patient data"},
          {"value": "extensive", "label": "Extensive patient data"},
          {"value": "primary", "label": "Primary focus of our business"}
        ]
      },
      "inventory_management": {"label": "Inventory Management", "type": "select", "required": false, "section": 2, 
        "options": [
          {"value": "none", "label": "We don''t manage inventory"},
          {"value": "manual", "label": "Manual tracking"},
          {"value": "basic_software", "label": "Basic software solution"},
          {"value": "advanced_software", "label": "Advanced inventory system"},
          {"value": "integrated", "label": "Fully integrated with other systems"}
        ]
      },
      "sales_channels": {"label": "Sales Channels", "type": "checkbox-group", "required": false, "section": 2, 
        "options": [
          {"value": "in_person", "label": "In-person retail"},
          {"value": "ecommerce", "label": "E-commerce website"},
          {"value": "marketplace", "label": "Online marketplaces"},
          {"value": "wholesale", "label": "Wholesale/B2B"},
          {"value": "phone", "label": "Phone sales"},
          {"value": "partners", "label": "Partner/affiliate sales"}
        ]
      },
      "automation_areas": {"label": "Areas for Automation", "type": "checkbox-group", "required": true, "section": 3, 
        "options": [
          {"value": "document_processing", "label": "Document processing & management"},
          {"value": "customer_service", "label": "Customer service automation"},
          {"value": "accounting", "label": "Accounting & bookkeeping"},
          {"value": "hr", "label": "HR & recruitment"},
          {"value": "inventory", "label": "Inventory management"},
          {"value": "sales", "label": "Sales & marketing"},
          {"value": "data_entry", "label": "Data entry & processing"},
          {"value": "workflow", "label": "General workflow automation"}
        ]
      },
      "document_types": {"label": "Document Types", "type": "checkbox-group", "required": false, "section": 3, 
        "options": [
          {"value": "invoices", "label": "Invoices"},
          {"value": "receipts", "label": "Receipts"},
          {"value": "contracts", "label": "Contracts"},
          {"value": "forms", "label": "Forms"},
          {"value": "reports", "label": "Reports"},
          {"value": "hr_documents", "label": "HR documents"}
        ]
      },
      "document_volume": {"label": "Document Volume", "type": "select", "required": false, "section": 3, 
        "options": [
          {"value": "low", "label": "Low (< 100 documents/month)"},
          {"value": "medium", "label": "Medium (100-500 documents/month)"},
          {"value": "high", "label": "High (500-1000 documents/month)"},
          {"value": "very_high", "label": "Very high (1000+ documents/month)"}
        ]
      },
      "cs_channels": {"label": "Customer Service Channels", "type": "checkbox-group", "required": false, "section": 3, 
        "options": [
          {"value": "email", "label": "Email"},
          {"value": "phone", "label": "Phone"},
          {"value": "chat", "label": "Live chat"},
          {"value": "social", "label": "Social media"},
          {"value": "ticketing", "label": "Ticketing system"}
        ]
      },
      "automation_experience": {"label": "Current Automation Experience", "type": "select", "required": true, "section": 3, 
        "options": [
          {"value": "none", "label": "No automation in place"},
          {"value": "basic", "label": "Basic automation (email, simple workflows)"},
          {"value": "moderate", "label": "Moderate automation (some processes automated)"},
          {"value": "advanced", "label": "Advanced automation (multiple integrated systems)"}
        ]
      },
      "existing_systems": {"label": "Existing Systems", "type": "checkbox-group", "required": false, "section": 3, 
        "options": [
          {"value": "crm", "label": "CRM (Customer Relationship Management)"},
          {"value": "erp", "label": "ERP (Enterprise Resource Planning)"},
          {"value": "accounting", "label": "Accounting Software"},
          {"value": "hrms", "label": "HR Management System"},
          {"value": "ecommerce", "label": "E-commerce Platform"},
          {"value": "pos", "label": "Point of Sale (POS)"},
          {"value": "project", "label": "Project Management"}
        ]
      },
      "automation_timeline": {"label": "Implementation Timeline", "type": "select", "required": true, "section": 3, 
        "options": [
          {"value": "immediate", "label": "As soon as possible"},
          {"value": "3months", "label": "Within 3 months"},
          {"value": "6months", "label": "Within 6 months"},
          {"value": "12months", "label": "Within 12 months"},
          {"value": "exploring", "label": "Just exploring options for now"}
        ]
      },
      "budget_range": {"label": "Budget Range", "type": "select", "required": true, "section": 4, 
        "options": [
          {"value": "under5k", "label": "Under $5,000"},
          {"value": "5k-15k", "label": "$5,000 - $15,000"},
          {"value": "15k-50k", "label": "$15,000 - $50,000"},
          {"value": "50k-100k", "label": "$50,000 - $100,000"},
          {"value": "100k+", "label": "Over $100,000"},
          {"value": "undecided", "label": "Not yet determined"}
        ]
      },
      "funding_source": {"label": "Funding Source", "type": "select", "required": false, "section": 4, 
        "options": [
          {"value": "operating_budget", "label": "Operating budget"},
          {"value": "capital_budget", "label": "Capital budget"},
          {"value": "special_allocation", "label": "Special project allocation"},
          {"value": "external_funding", "label": "External funding/investment"},
          {"value": "undecided", "label": "Not yet determined"}
        ]
      },
      "decision_timeline": {"label": "Decision Timeline", "type": "select", "required": true, "section": 4, 
        "options": [
          {"value": "immediate", "label": "Ready to decide immediately"},
          {"value": "1month", "label": "Within 1 month"},
          {"value": "3months", "label": "Within 3 months"},
          {"value": "6months", "label": "Within 6 months"},
          {"value": "exploring", "label": "Just exploring options for now"}
        ]
      },
      "investment_factors": {"label": "Investment Decision Factors", "type": "checkbox-group", "required": false, "section": 4, 
        "options": [
          {"value": "roi", "label": "Return on investment"},
          {"value": "time_savings", "label": "Time savings"},
          {"value": "cost_reduction", "label": "Cost reduction"},
          {"value": "quality_improvement", "label": "Quality improvement"},
          {"value": "competitive_advantage", "label": "Competitive advantage"},
          {"value": "scalability", "label": "Scalability"},
          {"value": "compliance", "label": "Regulatory compliance"}
        ]
      },
      "referral_source": {"label": "How did you hear about us?", "type": "select", "required": false, "section": 5, 
        "options": [
          {"value": "search", "label": "Search engine"},
          {"value": "social", "label": "Social media"},
          {"value": "recommendation", "label": "Recommendation"},
          {"value": "advertisement", "label": "Advertisement"},
          {"value": "event", "label": "Event or conference"},
          {"value": "other", "label": "Other"}
        ]
      },
      "consultation_preference": {"label": "Consultation Preference", "type": "select", "required": false, "section": 5, 
        "options": [
          {"value": "email", "label": "Email consultation"},
          {"value": "call", "label": "Phone call"},
          {"value": "video", "label": "Video call"},
          {"value": "in_person", "label": "In-person meeting (if available)"}
        ]
      },
      "additional_comments": {"label": "Additional Comments", "type": "textarea", "required": false, "section": 5},
      "consent_terms": {"label": "Terms and Conditions", "type": "checkbox", "required": true, "section": 5, "text": "I agree to the terms and conditions"},
      "consent_marketing": {"label": "Marketing Consent", "type": "checkbox", "required": false, "section": 5, "text": "I consent to receiving marketing communications"}
    }
  }'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.assessment_templates WHERE name = 'Business Automation Assessment'
);

-- Create function to auto-update timestamps
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at functionality
DROP TRIGGER IF EXISTS update_assessment_templates_timestamp ON public.assessment_templates;
CREATE TRIGGER update_assessment_templates_timestamp
BEFORE UPDATE ON public.assessment_templates
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column(); 