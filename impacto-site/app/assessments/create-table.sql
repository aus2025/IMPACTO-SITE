-- Create the business_assessments table
CREATE TABLE IF NOT EXISTS business_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenges JSONB,
  reporting_tools JSONB,
  communication_channels JSONB,
  communication_frequency TEXT,
  communication_pain_points JSONB,
  workflow_bottlenecks JSONB,
  workflow_automation_areas JSONB,
  workflow_collaboration_tools JSONB,
  hr_team_size TEXT,
  hr_pain_points JSONB,
  hr_hiring_volume TEXT,
  goals JSONB,
  compliance_concerns JSONB,
  sales_channels JSONB,
  departments_involved JSONB,
  financial_pain_points JSONB,
  crm_pain_points JSONB,
  onboarding_pain_points JSONB,
  pipeline_lead_source JSONB,
  project_pain_points JSONB,
  software JSONB,
  priorities JSONB,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  role TEXT,
  industry TEXT,
  employees TEXT,
  patient_data TEXT,
  inventory_management TEXT,
  customer_loyalty TEXT,
  owner_involvement TEXT,
  growth_challenges TEXT,
  integration_complexity TEXT,
  decision_makers TEXT,
  invoice_volume TEXT,
  proposal_volume TEXT,
  proposal_approval TEXT,
  proposal_time TEXT,
  onboarding_client_volume TEXT,
  onboarding_duration TEXT,
  pipeline_conversion_rate TEXT,
  pipeline_tracking_method TEXT,
  project_management_method TEXT,
  project_team_size TEXT,
  other_software TEXT,
  automation_level TEXT,
  integration_challenges TEXT,
  specific_pain TEXT,
  success_criteria TEXT,
  previous_automation TEXT,
  previous_experience TEXT,
  decision_timeline TEXT,
  additional_info TEXT,
  consent BOOLEAN DEFAULT FALSE,
  consultation_requested BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add Row Level Security (RLS) policies
ALTER TABLE business_assessments ENABLE ROW LEVEL SECURITY;

-- Allow anon users to insert data
CREATE POLICY business_assessments_insert_policy
ON business_assessments 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Allow authenticated users full access
CREATE POLICY business_assessments_all_policy
ON business_assessments 
FOR ALL 
TO authenticated
USING (true); 