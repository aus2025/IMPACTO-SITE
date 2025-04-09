export interface BusinessAssessment {
  id: string;
  full_name?: string;
  company?: string;
  email?: string;
  created_at: string;
  updated_at?: string;
  form_id?: string;
  assessment_data?: Record<string, string | number | boolean | null>;
  status?: string;
  contact?: Record<string, string | number | boolean | null>;
  business_info?: Record<string, string | number | boolean | null>;
  automation_needs?: Record<string, string | number | boolean | null>;
  budget?: Record<string, string | number | boolean | null>;
  additional_info?: Record<string, string | number | boolean | null>;
  user_id?: string;
  completed?: boolean;
  score?: number;
  recommendations?: string;
  report_data?: Record<string, string | number | boolean | null>;
}

export interface AssessmentForm {
  id: string;
  title: string;
  description?: string;
  form_schema: FormSchema;
  created_at: string;
  updated_at?: string;
  status?: string;
  published_at?: string;
  slug?: string;
  version?: number;
  is_default?: boolean;
}

export interface FormSchema {
  steps?: FormStep[];
  settings?: FormSettings;
  version?: number;
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields?: FormField[];
  order?: number;
}

export interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: FormFieldOption[];
  defaultValue?: string | number | boolean | null;
  help_text?: string;
  validation?: FormFieldValidation;
  conditional_logic?: ConditionalLogic;
  properties?: Record<string, string | number | boolean | null>;
  order?: number;
}

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormFieldValidation {
  min?: number;
  max?: number;
  pattern?: string;
  custom?: string;
}

export interface ConditionalLogic {
  action: 'show' | 'hide';
  operator: 'and' | 'or';
  rules: ConditionalRule[];
}

export interface ConditionalRule {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
  value: string | number | boolean | null;
}

export interface FormSettings {
  submit_button_text?: string;
  success_message?: string;
  send_email_notification?: boolean;
  email_notification_template?: string;
  redirect_url?: string;
  enable_progress_bar?: boolean;
  allow_save_and_resume?: boolean;
  show_step_numbers?: boolean;
} 