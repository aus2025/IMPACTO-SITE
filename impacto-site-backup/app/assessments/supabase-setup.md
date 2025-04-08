# Supabase Setup for Business Assessments

To ensure the business assessment form works correctly, you need to add a custom SQL function to your Supabase project. This function will allow executing SQL statements from the client.

## Steps

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query and paste the following code:

```sql
-- Create a function to execute SQL commands
CREATE OR REPLACE FUNCTION execute_sql(sql_query TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql_query;
  RETURN jsonb_build_object('success', true);
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM,
      'error_detail', SQLSTATE
    );
END;
$$;

-- Grant usage on the function to the anon and authenticated roles
GRANT EXECUTE ON FUNCTION execute_sql TO anon;
GRANT EXECUTE ON FUNCTION execute_sql TO authenticated;

-- Create the business_assessments table directly
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
```

4. Run the query by clicking the "Run" button
5. Verify that the function and table were created successfully

## Testing the Function

You can test the function by executing:

```sql
SELECT execute_sql('SELECT 1');
```

If this returns `{"success": true}`, the function is working correctly.

## Potential Issues and Solutions

### RLS Policies

If you're having issues with table access, you may need to set up Row Level Security (RLS) policies:

```sql
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
```

### Function Not Found

If you get an error about the function not existing, make sure to run the SQL above and verify that:

1. The function name is correct (should be `execute_sql`)
2. The grants to anon and authenticated roles are present
3. There are no typos in the SQL statement

### Table Not Found

If you get a table not found error, you can manually create the table using the SQL provided above. 