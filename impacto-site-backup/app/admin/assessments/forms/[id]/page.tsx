'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ChevronLeft, Edit, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface SectionField {
  id: string
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date'
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
}

interface FormSection {
  id: string
  title: string
  description?: string
  fields: SectionField[]
}

interface FormData {
  id: string
  name: string
  status: 'active' | 'draft' | 'archived'
  created_at: string
  updated_at: string
  created_by: string
  sections: FormSection[]
}

export default function FormPreviewPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData | null>(null)
  
  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true)
      try {
        // In a real implementation, this would fetch from your database
        // const { data, error } = await supabase
        //   .from('assessment_forms')
        //   .select('*')
        //   .eq('id', params.id)
        //   .single()
        
        // For demo purposes, we'll just create mock data based on the ID
        const mockForm = getMockForm(params.id as string)
        setFormData(mockForm)
      } catch (error) {
        console.error('Error fetching form:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchForm()
  }, [params.id])
  
  // Mock data generator
  const getMockForm = (id: string) => {
    return {
      id,
      name: `Business Assessment Form ${id}`,
      status: 'active' as const,
      created_at: '2023-12-15T09:45:00Z',
      updated_at: '2023-12-15T09:45:00Z',
      created_by: 'Admin User',
      sections: [
        {
          id: crypto.randomUUID(),
          title: 'Contact Information',
          description: 'Please provide your contact details.',
          fields: [
            {
              id: crypto.randomUUID(),
              type: 'text',
              label: 'Full Name',
              placeholder: 'Enter your full name',
              required: true,
            },
            {
              id: crypto.randomUUID(),
              type: 'text',
              label: 'Email',
              placeholder: 'Enter your email address',
              required: true,
            },
            {
              id: crypto.randomUUID(),
              type: 'text',
              label: 'Phone Number',
              placeholder: 'Enter your phone number',
              required: false,
            },
            {
              id: crypto.randomUUID(),
              type: 'text',
              label: 'Company',
              placeholder: 'Enter your company name',
              required: true,
            },
          ]
        },
        {
          id: crypto.randomUUID(),
          title: 'Business Information',
          description: 'Tell us about your business.',
          fields: [
            {
              id: crypto.randomUUID(),
              type: 'select',
              label: 'Industry',
              required: true,
              options: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Other'],
            },
            {
              id: crypto.randomUUID(),
              type: 'select',
              label: 'Company Size',
              required: true,
              options: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
            },
            {
              id: crypto.randomUUID(),
              type: 'textarea',
              label: 'Main Business Challenges',
              placeholder: 'Describe your main business challenges',
              required: false,
            },
          ]
        },
        {
          id: crypto.randomUUID(),
          title: 'Automation Needs',
          description: 'Tell us about your automation requirements.',
          fields: [
            {
              id: crypto.randomUUID(),
              type: 'checkbox',
              label: 'Areas of Interest',
              required: true,
              options: ['Customer Service', 'Marketing', 'Sales', 'Operations', 'Finance', 'HR', 'IT'],
            },
            {
              id: crypto.randomUUID(),
              type: 'radio',
              label: 'Current Automation Level',
              required: true,
              options: ['No automation', 'Basic automation', 'Moderate automation', 'Advanced automation'],
            },
            {
              id: crypto.randomUUID(),
              type: 'textarea',
              label: 'Specific Processes to Automate',
              placeholder: 'Describe specific processes you want to automate',
              required: false,
            },
          ]
        }
      ]
    }
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'draft':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Draft</Badge>
      case 'archived':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Archived</Badge>
      default:
        return null
    }
  }
  
  const renderFieldPreview = (field: SectionField) => {
    switch (field.type) {
      case 'text':
        return <Input disabled placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`} />
      
      case 'textarea':
        return <Textarea disabled placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`} className="h-24" />
      
      case 'select':
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {(field.options || []).map((option, i) => (
                <SelectItem key={i} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {(field.options || []).map((option, i) => (
              <div key={i} className="flex items-center">
                <Checkbox id={`${field.id}-option-${i}`} disabled />
                <label htmlFor={`${field.id}-option-${i}`} className="ml-2 text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )
      
      case 'radio':
        return (
          <div className="space-y-2">
            {(field.options || []).map((option, i) => (
              <div key={i} className="flex items-center">
                <div className="h-4 w-4 rounded-full border border-gray-400 mr-2"></div>
                <label className="text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )
      
      case 'date':
        return <Input disabled type="date" />
      
      default:
        return <Input disabled placeholder="Field preview" />
    }
  }
  
  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-4">Loading form...</p>
          </div>
        </div>
      </div>
    )
  }
  
  if (!formData) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-center">
          Form not found or has been deleted.
        </div>
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => router.push('/admin/assessments/forms')}
          >
            <ChevronLeft size={16} className="mr-1" /> Back to Forms
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/assessments/forms')}
          className="mr-4"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold flex-1">{formData.name}</h1>
        <Button
          onClick={() => router.push(`/admin/assessments/forms/${params.id}/edit`)}
          className="flex items-center"
        >
          <Edit size={16} className="mr-1" /> Edit Form
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-lg border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Status</div>
            <div>{getStatusBadge(formData.status)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Created By</div>
            <div className="font-medium">{formData.created_by}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Created On</div>
            <div className="font-medium">{formatDate(formData.created_at)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Last Updated</div>
            <div className="font-medium">{formatDate(formData.updated_at)}</div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Form Preview</h3>
            <div className="mt-1 text-sm text-blue-700">
              This is a preview of how the assessment form appears to users. The form fields are disabled and no data will be submitted.
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        {formData.sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-1">{section.title}</h2>
              {section.description && (
                <p className="text-gray-600 mb-6">{section.description}</p>
              )}
              
              <div className="space-y-6">
                {section.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <div className="flex items-baseline">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      {field.required && (
                        <span className="ml-1 text-red-500 text-sm">*</span>
                      )}
                    </div>
                    {renderFieldPreview(field)}
                  </div>
                ))}
              </div>
            </Card>
            
            {sectionIndex < formData.sections.length - 1 && (
              <div className="flex justify-center my-4">
                <div className="bg-gray-200 p-2 rounded-full">
                  <ArrowRight className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            )}
          </div>
        ))}
        
        <div className="mt-8 flex justify-center">
          <Button disabled className="w-full md:w-auto">
            Submit Form
          </Button>
        </div>
      </div>
    </div>
  )
} 