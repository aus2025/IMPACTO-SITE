-- Update business_assessments table to add fields for challenge-specific follow-up questions
ALTER TABLE IF EXISTS public.business_assessments
-- Onboarding follow-up questions
ADD COLUMN IF NOT EXISTS onboarding_client_volume TEXT,
ADD COLUMN IF NOT EXISTS onboarding_pain_points TEXT[],
ADD COLUMN IF NOT EXISTS onboarding_duration TEXT,

-- Pipeline follow-up questions
ADD COLUMN IF NOT EXISTS pipeline_lead_source TEXT[],
ADD COLUMN IF NOT EXISTS pipeline_conversion_rate TEXT,
ADD COLUMN IF NOT EXISTS pipeline_tracking_method TEXT,

-- Project follow-up questions
ADD COLUMN IF NOT EXISTS project_management_method TEXT,
ADD COLUMN IF NOT EXISTS project_team_size TEXT,
ADD COLUMN IF NOT EXISTS project_pain_points TEXT[],

-- Reporting follow-up questions
ADD COLUMN IF NOT EXISTS reporting_frequency TEXT,
ADD COLUMN IF NOT EXISTS reporting_tools TEXT[],
ADD COLUMN IF NOT EXISTS reporting_pain_points TEXT[],

-- Communication follow-up questions
ADD COLUMN IF NOT EXISTS communication_channels TEXT[],
ADD COLUMN IF NOT EXISTS communication_frequency TEXT,
ADD COLUMN IF NOT EXISTS communication_pain_points TEXT[],

-- Workflow follow-up questions
ADD COLUMN IF NOT EXISTS workflow_bottlenecks TEXT[],
ADD COLUMN IF NOT EXISTS workflow_automation_areas TEXT[],
ADD COLUMN IF NOT EXISTS workflow_collaboration_tools TEXT[],

-- HR follow-up questions
ADD COLUMN IF NOT EXISTS hr_team_size TEXT,
ADD COLUMN IF NOT EXISTS hr_pain_points TEXT[],
ADD COLUMN IF NOT EXISTS hr_hiring_volume TEXT;

-- Add comment on table updates
COMMENT ON TABLE public.business_assessments IS 'Business assessment submissions with follow-up questions for high-rated challenge areas. Records detailed information about business challenges, goals, and automation needs.'; 