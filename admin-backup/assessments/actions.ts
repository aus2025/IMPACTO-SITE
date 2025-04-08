'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createBusinessAssessmentsTable() {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );

    // Execute SQL to create the table
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_query: `
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
          sales_volume TEXT,
          sales_pain_points JSONB,
          marketing_channels JSONB,
          marketing_budget TEXT,
          marketing_pain_points JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );
      `
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error creating business assessments table:', error);
    return { success: false, error };
  }
}

export async function executeSQL(sqlQuery: string) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );

    const { data, error } = await supabase.rpc('execute_sql', {
      sql_query: sqlQuery
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error executing SQL:', error);
    return { success: false, error };
  }
} 