import { createBrowserClient } from '@supabase/ssr';

// Types for our database tables
export type Lead = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
  created_at?: string;
};

export type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  content: string;
  featured_image: string;
  published_at?: string;
  is_published: boolean;
  author: string;
  tags: string[];
  meta_description: string;
};

export type Service = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  content: string;
};

export type CaseStudy = {
  id?: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  featured_image: string;
  slug: string;
};

export type BusinessAssessment = {
  id?: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  company_size: string;
  industry: string;
  current_challenges: string[];
  automation_interest: string[];
  current_tools: string[];
  budget_range: string;
  timeline: string;
  goals: string;
  additional_info: string;
  created_at?: string;
};

// Initialize Supabase client
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Database helper functions

// Leads
export async function submitLead(lead: Lead) {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select();
  
  return { data, error };
}

// Blog posts
export async function getBlogPosts(limit = 10, startFrom = 0, onlyPublished = true) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .range(startFrom, startFrom + limit - 1);
  
  if (onlyPublished) {
    query = query.eq('is_published', true);
  }
  
  const { data, error } = await query;
  return { data, error };
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  return { data, error };
}

export async function createOrUpdateBlogPost(post: BlogPost, id?: string) {
  if (id) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(post)
      .eq('id', id)
      .select();
    
    return { data, error };
  } else {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select();
    
    return { data, error };
  }
}

// Services
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('title');
  
  return { data, error };
}

export async function getServiceBySlug(slug: string) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();
  
  return { data, error };
}

export async function createOrUpdateService(service: Service, id?: string) {
  if (id) {
    const { data, error } = await supabase
      .from('services')
      .update(service)
      .eq('id', id)
      .select();
    
    return { data, error };
  } else {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select();
    
    return { data, error };
  }
}

// Case studies
export async function getCaseStudies() {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('title');
  
  return { data, error };
}

export async function getCaseStudyBySlug(slug: string) {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .single();
  
  return { data, error };
}

export async function createOrUpdateCaseStudy(caseStudy: CaseStudy, id?: string) {
  if (id) {
    const { data, error } = await supabase
      .from('case_studies')
      .update(caseStudy)
      .eq('id', id)
      .select();
    
    return { data, error };
  } else {
    const { data, error } = await supabase
      .from('case_studies')
      .insert([caseStudy])
      .select();
    
    return { data, error };
  }
}

// Safe database helper functions with better error handling
export async function safeGetCaseStudies() {
  try {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching case studies:', error);
      return { data: [], error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error('Exception when fetching case studies:', err);
    return { data: [], error: err };
  }
}

// Business assessments
export async function submitBusinessAssessment(assessment: BusinessAssessment) {
  const { data, error } = await supabase
    .from('business_assessments')
    .insert([assessment])
    .select();
  
  return { data, error };
}

export async function getBusinessAssessments() {
  const { data, error } = await supabase
    .from('business_assessments')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
}

// Authentication helpers
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Sign in error:', error.message);
    }
    
    return { data, error };
  } catch (err) {
    console.error('Exception during sign in:', err);
    return { data: null, error: err };
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return { user: null };
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  return { user };
}

export async function safeGetServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('title', { ascending: true });
    
    if (error) {
      console.error('Error fetching services:', error);
      return { data: [], error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error('Exception when fetching services:', err);
    return { data: [], error: err };
  }
}

export async function safeGetBusinessAssessments() {
  try {
    const { data, error } = await supabase
      .from('business_assessments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching business assessments:', error);
      return { data: [], error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error('Exception when fetching business assessments:', err);
    return { data: [], error: err };
  }
} 