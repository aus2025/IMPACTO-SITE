export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: number
          created_at: string
          title: string
          slug: string
          description: string
          icon: string | null
          content: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          slug: string
          description: string
          icon?: string | null
          content: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          slug?: string
          description?: string
          icon?: string | null
          content?: string
          updated_at?: string | null
        }
      }
      blog_posts: {
        Row: {
          id: number
          created_at: string
          title: string
          slug: string
          content: string
          featured_image: string | null
          published_at: string | null
          is_published: boolean
          author: string
          tags: string[] | null
          meta_description: string | null
          updated_at: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          slug: string
          content: string
          featured_image?: string | null
          published_at?: string | null
          is_published?: boolean
          author: string
          tags?: string[] | null
          meta_description?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          slug?: string
          content?: string
          featured_image?: string | null
          published_at?: string | null
          is_published?: boolean
          author?: string
          tags?: string[] | null
          meta_description?: string | null
          updated_at?: string | null
        }
      }
      case_studies: {
        Row: {
          id: number
          created_at: string
          title: string
          client: string
          challenge: string
          solution: string
          results: string
          featured_image: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          client: string
          challenge: string
          solution: string
          results: string
          featured_image?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          client?: string
          challenge?: string
          solution?: string
          results?: string
          featured_image?: string | null
          slug?: string
          updated_at?: string | null
        }
      }
      leads: {
        Row: {
          id: number
          created_at: string
          name: string
          email: string
          phone: string | null
          service_interest: string | null
          message: string
          status: string | null
          notes: string | null
          last_contacted: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          email: string
          phone?: string | null
          service_interest?: string | null
          message: string
          status?: string | null
          notes?: string | null
          last_contacted?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          service_interest?: string | null
          message?: string
          status?: string | null
          notes?: string | null
          last_contacted?: string | null
        }
      }
      business_assessments: {
        Row: {
          id: number
          created_at: string
          company_name: string
          contact_name: string
          contact_email: string
          contact_phone: string | null
          company_size: string | null
          industry: string
          current_challenges: string[] | null
          automation_interest: string[] | null
          current_tools: string[] | null
          budget_range: string | null
          timeline: string | null
          goals: string | null
          additional_info: string | null
          status: string | null
          review_notes: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          company_name: string
          contact_name: string
          contact_email: string
          contact_phone?: string | null
          company_size?: string | null
          industry: string
          current_challenges?: string[] | null
          automation_interest?: string[] | null
          current_tools?: string[] | null
          budget_range?: string | null
          timeline?: string | null
          goals?: string | null
          additional_info?: string | null
          status?: string | null
          review_notes?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          company_name?: string
          contact_name?: string
          contact_email?: string
          contact_phone?: string | null
          company_size?: string | null
          industry?: string
          current_challenges?: string[] | null
          automation_interest?: string[] | null
          current_tools?: string[] | null
          budget_range?: string | null
          timeline?: string | null
          goals?: string | null
          additional_info?: string | null
          status?: string | null
          review_notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 