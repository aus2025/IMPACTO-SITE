# Business Assessments Module

This module provides a comprehensive system for collecting, managing, and reviewing business assessment submissions.

## Features

- **Assessment Form**: Multi-step form with progress tracking for collecting detailed business information
- **Assessment Dashboard**: Admin interface to view all submitted assessments
- **Detailed View**: View complete assessment details including client information, challenges, and automation needs
- **Admin Creation**: Create new assessments manually from the admin panel

## Database Setup

To set up the required database table in Supabase:

1. Navigate to the Supabase Dashboard
2. Go to the SQL Editor
3. Create a new query
4. Copy and paste the contents of `/db/schema_business_assessments.sql`
5. Run the query to create the table and set up security policies

## File Structure

- `/admin/assessments/page.tsx` - Main assessment dashboard (listing all assessments)
- `/admin/assessments/[id]/page.tsx` - Detailed view for a single assessment
- `/admin/assessments/new/page.tsx` - Create a new assessment 
- `/admin/assessments/components/BusinessAssessmentForm.tsx` - Reusable assessment form component

## Security

The assessments module uses Supabase authentication to ensure only authenticated admin users can access and manage assessment data. Row-level security policies are defined in the schema to protect the data.

## Form Sections

The business assessment form collects the following information:

1. **Contact Information**: Basic contact details
2. **Business Information**: Industry, size, and goals
3. **Business Challenges**: Rating of different operational challenges
4. **Current Technology**: Software in use and automation level
5. **Pain Points & Priorities**: Specific issues and desired improvements
6. **Timeline and Previous Experience**: Assessment of past automation attempts
7. **Final Questions & Consent**: Additional comments and user consent

## Data Model

The `business_assessments` table stores all assessment data with the following structure:

- Basic contact information (name, email, phone)
- Business profile (company, role, industry, employees)
- Goals and challenges (stored as arrays and JSON)
- Technology landscape (current software, automation level)
- Priorities and pain points
- Decision timeline and consent details

## Usage Guidelines

- The form can be embedded on public-facing pages for lead generation
- Assessments submitted by clients can be reviewed in the admin dashboard
- Admin users can manually create assessments from client calls or meetings 