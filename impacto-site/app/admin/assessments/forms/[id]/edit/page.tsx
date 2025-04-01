'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { createClient } from '@/utils/supabase/client';
import { ChevronLeft, Plus, Save, Trash2, MoveVertical, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

// Component imports
import FormSidebar from './components/FormSidebar';
import FormCanvas from './components/FormCanvas';
import PropertiesPanel from './components/PropertiesPanel';
import DraggableItem from './components/DraggableItem';
import SortableItem from './components/SortableItem';

// Type definitions
export type QuestionType = 
  | 'text' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'radio' 
  | 'rating' 
  | 'date';

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  description?: string;
  defaultValue?: string | string[];
  conditionalLogic?: ConditionalLogic;
  score?: number;
}

export interface ConditionalLogic {
  questionId: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
  value: string | string[];
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface FormData {
  id: string;
  title: string;
  description?: string;
  sections: Section[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Initial empty form structure
const initialForm: FormData = {
  id: '',
  title: 'New Assessment Form',
  description: 'Add a description for your form',
  sections: [],
  published: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Section templates
const sectionTemplates = {
  contactInfo: {
    id: 'contact-section',
    title: 'Contact Information',
    description: 'Collect basic contact information',
    questions: [
      {
        id: 'full-name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
      },
      {
        id: 'email',
        type: 'text',
        label: 'Email Address',
        placeholder: 'example@email.com',
        required: true,
      },
      {
        id: 'phone',
        type: 'text',
        label: 'Phone Number',
        placeholder: '(123) 456-7890',
        required: true,
      },
    ],
  },
  businessInfo: {
    id: 'business-section',
    title: 'Business Information',
    description: 'Tell us about your business',
    questions: [
      {
        id: 'company',
        type: 'text',
        label: 'Company Name',
        placeholder: 'Enter your company name',
        required: true,
      },
      {
        id: 'industry',
        type: 'select',
        label: 'Industry',
        options: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Other'],
        required: true,
      },
      {
        id: 'employees',
        type: 'select',
        label: 'Number of Employees',
        options: ['1-10', '11-50', '51-200', '201-500', '500+'],
        required: true,
      },
    ],
  },
  automationNeeds: {
    id: 'automation-section',
    title: 'Automation Needs',
    description: 'Help us understand your automation requirements',
    questions: [
      {
        id: 'goals',
        type: 'checkbox',
        label: 'Business Goals',
        options: [
          'Increase efficiency',
          'Reduce costs',
          'Improve customer experience',
          'Scale operations',
          'Enhance data analytics',
        ],
        required: true,
      },
      {
        id: 'automation-level',
        type: 'radio',
        label: 'Current Automation Level',
        options: ['None', 'Basic', 'Moderate', 'Advanced'],
        required: true,
      },
      {
        id: 'challenges',
        type: 'rating',
        label: 'Rate your current challenges (1-5)',
        required: true,
      },
    ],
  },
  budget: {
    id: 'budget-section',
    title: 'Budget Information',
    description: 'Help us understand your budget constraints',
    questions: [
      {
        id: 'budget-range',
        type: 'radio',
        label: 'Budget Range',
        options: [
          'Under $5,000',
          '$5,000 - $15,000',
          '$15,000 - $50,000',
          '$50,000 - $100,000',
          'Over $100,000',
        ],
        required: true,
      },
      {
        id: 'timeline',
        type: 'select',
        label: 'Implementation Timeline',
        options: [
          'Immediately',
          '1-3 months',
          '3-6 months',
          '6+ months',
        ],
        required: true,
      },
    ],
  },
  additionalInfo: {
    id: 'additional-section',
    title: 'Additional Information',
    description: 'Any other information you would like to share',
    questions: [
      {
        id: 'specific-requirements',
        type: 'textarea',
        label: 'Specific Requirements',
        placeholder: 'Please describe any specific requirements or pain points',
        required: false,
      },
      {
        id: 'preferred-contact',
        type: 'radio',
        label: 'Preferred Contact Method',
        options: ['Email', 'Phone', 'Video Call'],
        required: true,
      },
      {
        id: 'start-date',
        type: 'date',
        label: 'Preferred Start Date',
        required: false,
      },
    ],
  },
};

export default function EditFormPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formName, setFormName] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  
  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from your database
        // const { data, error } = await supabase
        //   .from('assessment_forms')
        //   .select('*')
        //   .eq('id', params.id)
        //   .single()
        
        // For demo purposes, we'll just create mock data based on the ID
        const mockForm = getMockForm(params.id as string);
        
        setFormName(mockForm.title);
        setSections(mockForm.sections);
      } catch (error) {
        console.error('Error fetching form:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchForm();
  }, [params.id]);
  
  // Mock data generator
  const getMockForm = (id: string) => {
    return {
      id,
      title: `Form ${id}`,
      sections: [
        {
          id: crypto.randomUUID(),
          title: 'Contact Information',
          description: 'Please provide your contact details.',
          questions: [
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
          ]
        },
        {
          id: crypto.randomUUID(),
          title: 'Business Information',
          description: 'Tell us about your business.',
          questions: [
            {
              id: crypto.randomUUID(),
              type: 'select',
              label: 'Industry',
              required: true,
              options: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Other'],
            },
          ]
        }
      ]
    };
  };
  
  const addSection = () => {
    setSections([
      ...sections,
      {
        id: crypto.randomUUID(),
        title: 'New Section',
        description: 'Section description',
        questions: []
      }
    ]);
  };
  
  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };
  
  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };
  
  const addField = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: [
            ...section.questions,
            {
              id: crypto.randomUUID(),
              type: 'text',
              label: 'New Question',
              required: false,
            }
          ]
        };
      }
      return section;
    }));
  };
  
  const updateField = (sectionId: string, questionId: string, updates: Partial<Question>) => {
    setSections(sections.map(section => 
      section.id === sectionId ? {
        ...section,
        questions: section.questions.map(question => 
          question.id === questionId ? { ...question, ...updates } : question
        )
      } : section
    ));
  };
  
  const deleteField = (sectionId: string, questionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? {
        ...section,
        questions: section.questions.filter(question => question.id !== questionId)
      } : section
    ));
  };
  
  const handleAddFieldOption = (sectionId: string, questionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.map(question => {
            if (question.id === questionId) {
              return {
                ...question,
                options: [...(question.options || []), 'New Option']
              };
            }
            return question;
          })
        };
      }
      return section;
    }));
  };
  
  const updateFieldOption = (sectionId: string, questionId: string, index: number, value: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.map(question => {
            if (question.id === questionId && question.options) {
              const updatedOptions = [...question.options];
              updatedOptions[index] = value;
              return {
                ...question,
                options: updatedOptions
              };
            }
            return question;
          })
        };
      }
      return section;
    }));
  };
  
  const deleteFieldOption = (sectionId: string, questionId: string, index: number) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.map(question => {
            if (question.id === questionId && question.options) {
              const updatedOptions = [...question.options];
              updatedOptions.splice(index, 1);
              return {
                ...question,
                options: updatedOptions
              };
            }
            return question;
          })
        };
      }
      return section;
    }));
  };
  
  const saveForm = async () => {
    setSaving(true);
    try {
      // In a real implementation, this would save to your database
      // For now, we'll just simulate saving and redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would save the form to your database
      // const { data, error } = await supabase
      //   .from('assessment_forms')
      //   .update({
      //     name: formName,
      //     sections: sections,
      //   })
      //   .eq('id', params.id)
      
      router.push('/admin/assessments/forms');
    } catch (error) {
      console.error('Error saving form:', error);
    } finally {
      setSaving(false);
    }
  };
  
  const previewForm = () => {
    // In a real implementation, this would redirect to preview
    // For now, we'll just show an alert
    alert('Preview functionality would be implemented in production.');
  };
  
  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-6xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-4">Loading form...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/assessments/forms')}
          className="mr-4"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold flex-1">Edit Assessment Form</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={previewForm}
            className="flex items-center"
          >
            <Eye size={16} className="mr-1" /> Preview
          </Button>
          <Button
            onClick={saveForm}
            disabled={saving}
            className="flex items-center"
          >
            <Save size={16} className="mr-1" /> {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Form Name</label>
          <Input 
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Enter form name"
            className="max-w-md"
          />
        </div>
      </div>
      
      {sections.map((section) => (
        <Card key={section.id} className="mb-8 p-6 relative">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-gray-100 rounded-full mr-3">
              <MoveVertical size={16} className="text-gray-500" />
            </div>
            <div className="flex-1">
              <Input
                value={section.title}
                onChange={(e) => updateSection(section.id, { title: e.target.value })}
                placeholder="Section Title"
                className="font-medium text-lg"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteSection(section.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
          
          <div className="mb-6">
            <Textarea
              value={section.description || ''}
              onChange={(e) => updateSection(section.id, { description: e.target.value })}
              placeholder="Section description (optional)"
              className="resize-none"
            />
          </div>
          
          <div className="space-y-6">
            {section.questions.map((question) => (
              <div key={question.id} className="p-4 border rounded-md relative">
                <div className="flex items-center mb-4">
                  <div className="p-1 bg-gray-100 rounded-full mr-2">
                    <MoveVertical size={14} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <Input
                      value={question.label}
                      onChange={(e) => updateField(section.id, question.id, { label: e.target.value })}
                      placeholder="Question Label"
                      className="font-medium"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteField(section.id, question.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Question Type</label>
                    <Select
                      value={question.type}
                      onValueChange={(value: any) => updateField(section.id, question.id, { type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text Input</SelectItem>
                        <SelectItem value="textarea">Text Area</SelectItem>
                        <SelectItem value="select">Dropdown</SelectItem>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                        <SelectItem value="radio">Radio Buttons</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {(question.type === 'text' || question.type === 'textarea') && (
                    <div>
                      <label className="text-sm font-medium mb-1 block">Placeholder</label>
                      <Input
                        value={question.placeholder || ''}
                        onChange={(e) => updateField(section.id, question.id, { placeholder: e.target.value })}
                        placeholder="Enter placeholder text"
                      />
                    </div>
                  )}
                </div>
                
                {(question.type === 'select' || question.type === 'radio' || question.type === 'checkbox') && (
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Options</label>
                    <div className="space-y-2 mb-2">
                      {(question.options || []).map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center">
                          <Input
                            value={option}
                            onChange={(e) => updateFieldOption(section.id, question.id, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                            className="mr-2"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteFieldOption(section.id, question.id, optionIndex)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddFieldOption(section.id, question.id)}
                      className="text-sm"
                    >
                      <Plus size={14} className="mr-1" /> Add Option
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Checkbox
                    id={`required-${question.id}`}
                    checked={question.required}
                    onCheckedChange={(checked) => 
                      updateField(section.id, question.id, { required: checked === true })
                    }
                  />
                  <label htmlFor={`required-${question.id}`} className="ml-2 text-sm font-medium">
                    Required question
                  </label>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => addField(section.id)}
            className="mt-4"
          >
            <Plus size={16} className="mr-1" /> Add Question
          </Button>
        </Card>
      ))}
      
      <Button
        variant="outline"
        onClick={addSection}
        className="w-full py-6 border-dashed"
      >
        <Plus size={16} className="mr-2" /> Add New Section
      </Button>
      
      <div className="mt-8 flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => router.push('/admin/assessments/forms')}
        >
          Cancel
        </Button>
        <Button
          onClick={saveForm}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
} 