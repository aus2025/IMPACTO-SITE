'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ChevronLeft, Plus, Save, Trash2, MoveVertical, Eye, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'

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

export default function FormBuilder() {
  const router = useRouter()
  const supabase = createClient()
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false)
  const [formName, setFormName] = useState('New Business Assessment')
  const [sections, setSections] = useState<FormSection[]>([
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
    }
  ])
  
  const addSection = () => {
    setSections([
      ...sections,
      {
        id: crypto.randomUUID(),
        title: 'New Section',
        description: 'Section description',
        fields: []
      }
    ])
  }
  
  const updateSection = (sectionId: string, updates: Partial<FormSection>) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ))
  }
  
  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId))
  }
  
  const addField = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: [
            ...section.fields,
            {
              id: crypto.randomUUID(),
              type: 'text',
              label: 'New Field',
              placeholder: 'Enter value',
              required: false,
            }
          ]
        }
      }
      return section
    }))
  }
  
  const updateField = (sectionId: string, fieldId: string, updates: Partial<SectionField>) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.map(field => 
            field.id === fieldId ? { ...field, ...updates } : field
          )
        }
      }
      return section
    }))
  }
  
  const deleteField = (sectionId: string, fieldId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.filter(field => field.id !== fieldId)
        }
      }
      return section
    }))
  }
  
  const handleAddFieldOption = (sectionId: string, fieldId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.map(field => {
            if (field.id === fieldId) {
              return {
                ...field,
                options: [...(field.options || []), 'New Option']
              }
            }
            return field
          })
        }
      }
      return section
    }))
  }
  
  const updateFieldOption = (sectionId: string, fieldId: string, index: number, value: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.map(field => {
            if (field.id === fieldId && field.options) {
              const updatedOptions = [...field.options]
              updatedOptions[index] = value
              return {
                ...field,
                options: updatedOptions
              }
            }
            return field
          })
        }
      }
      return section
    }))
  }
  
  const deleteFieldOption = (sectionId: string, fieldId: string, index: number) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.map(field => {
            if (field.id === fieldId && field.options) {
              const updatedOptions = [...field.options]
              updatedOptions.splice(index, 1)
              return {
                ...field,
                options: updatedOptions
              }
            }
            return field
          })
        }
      }
      return section
    }))
  }
  
  const handleImportTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const templateData = JSON.parse(event.target?.result as string);
        
        // Validate the imported JSON has the expected structure
        if (!templateData.form_schema) {
          alert('Invalid template file: Missing form schema');
          return;
        }
        
        if (templateData.name) {
          setFormName(templateData.name);
        }
        
        // Process the form schema
        if (templateData.form_schema.fields) {
          // Convert the template data into the format expected by the form builder
          const newSections: FormSection[] = [];
          
          // Group fields by section
          const fieldsBySection: Record<number, SectionField[]> = {};
          
          // Process each field in the template
          Object.entries(templateData.form_schema.fields).forEach(([fieldId, fieldData]: [string, any]) => {
            const sectionId = fieldData.section || 1;
            
            if (!fieldsBySection[sectionId]) {
              fieldsBySection[sectionId] = [];
            }
            
            // Convert template field to SectionField format
            const newField: SectionField = {
              id: crypto.randomUUID(),
              type: mapFieldType(fieldData.type),
              label: fieldData.label,
              required: !!fieldData.required,
              placeholder: fieldData.placeholder,
            };
            
            // Handle options for select/checkbox fields
            if (fieldData.options) {
              newField.options = fieldData.options.map((opt: any) => 
                typeof opt === 'string' ? opt : opt.label
              );
            }
            
            fieldsBySection[sectionId].push(newField);
          });
          
          // Create sections based on the template's steps or default names
          const sectionNames = templateData.form_schema.steps?.map((step: any) => step.title) || [
            'Contact Information',
            'Business Info',
            'Automation Needs',
            'Budget',
            'Additional Info'
          ];
          
          // Create each section with its fields
          Object.keys(fieldsBySection)
            .sort((a, b) => Number(a) - Number(b))
            .forEach((sectionIdStr) => {
              const sectionIndex = Number(sectionIdStr) - 1;
              newSections.push({
                id: crypto.randomUUID(),
                title: sectionNames[sectionIndex] || `Section ${sectionIdStr}`,
                description: `Imported from template: ${sectionNames[sectionIndex] || `Section ${sectionIdStr}`}`,
                fields: fieldsBySection[Number(sectionIdStr)]
              });
            });
          
          // Update the form with imported sections
          if (newSections.length > 0) {
            setSections(newSections);
            alert('Template imported successfully');
          } else {
            alert('No valid sections found in template');
          }
        }
      } catch (error) {
        console.error('Error importing template:', error);
        alert('Failed to import template. Please check the file format.');
      }
    };
    
    reader.readAsText(file);
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Helper function to map template field types to form builder types
  const mapFieldType = (type: string): SectionField['type'] => {
    switch (type) {
      case 'text':
      case 'email':
      case 'tel':
        return 'text';
      case 'textarea':
        return 'textarea';
      case 'select':
        return 'select';
      case 'checkbox':
      case 'checkbox-group':
        return 'checkbox';
      case 'radio':
        return 'radio';
      case 'date':
        return 'date';
      default:
        return 'text';
    }
  };
  
  // Trigger the hidden file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const saveForm = async () => {
    setSaving(true)
    try {
      // In a real implementation, this would save to your database
      // For now, we'll just simulate saving and redirect
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would save the form to your database
      // const { data, error } = await supabase
      //   .from('assessment_forms')
      //   .insert({
      //     name: formName,
      //     sections: sections,
      //     status: 'draft',
      //   })
      
      router.push('/admin/assessments/forms')
    } catch (error) {
      console.error('Error saving form:', error)
    } finally {
      setSaving(false)
    }
  }
  
  const previewForm = () => {
    // In a real implementation, this would save the draft and redirect to preview
    // For now, we'll just show an alert
    alert('Preview functionality would be implemented in production.')
  }
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.push('/admin/assessments/forms')}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Forms
        </button>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Assessment Form</h1>
        <div className="flex space-x-3">
          {/* Add the Import Template button */}
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            className="hidden"
            onChange={handleImportTemplate}
          />
          <Button 
            variant="outline"
            className="flex items-center"
            onClick={triggerFileInput}
          >
            <Upload size={16} className="mr-2" />
            Import Template
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center"
            onClick={() => router.push('/admin/assessments/forms')}
          >
            Cancel
          </Button>
          
          <Button 
            onClick={saveForm} 
            className="flex items-center"
            disabled={saving}
          >
            <Save size={16} className="mr-2" />
            {saving ? 'Saving...' : 'Save Form'}
          </Button>
        </div>
      </div>
      
      {/* Form name input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Form Name</label>
        <Input
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="max-w-md"
          placeholder="Enter form name"
        />
      </div>
      
      {sections.map((section, sectionIndex) => (
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
            {section.fields.map((field, fieldIndex) => (
              <div key={field.id} className="p-4 border rounded-md relative">
                <div className="flex items-center mb-4">
                  <div className="p-1 bg-gray-100 rounded-full mr-2">
                    <MoveVertical size={14} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <Input
                      value={field.label}
                      onChange={(e) => updateField(section.id, field.id, { label: e.target.value })}
                      placeholder="Field Label"
                      className="font-medium"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteField(section.id, field.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Field Type</label>
                    <Select
                      value={field.type}
                      onValueChange={(value: any) => updateField(section.id, field.id, { type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select field type" />
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
                  
                  {(field.type === 'text' || field.type === 'textarea') && (
                    <div>
                      <label className="text-sm font-medium mb-1 block">Placeholder</label>
                      <Input
                        value={field.placeholder || ''}
                        onChange={(e) => updateField(section.id, field.id, { placeholder: e.target.value })}
                        placeholder="Enter placeholder text"
                      />
                    </div>
                  )}
                </div>
                
                {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Options</label>
                    <div className="space-y-2 mb-2">
                      {(field.options || []).map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center">
                          <Input
                            value={option}
                            onChange={(e) => updateFieldOption(section.id, field.id, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                            className="mr-2"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteFieldOption(section.id, field.id, optionIndex)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddFieldOption(section.id, field.id)}
                      className="text-sm"
                    >
                      <Plus size={14} className="mr-1" /> Add Option
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Checkbox
                    id={`required-${field.id}`}
                    checked={field.required}
                    onCheckedChange={(checked) => 
                      updateField(section.id, field.id, { required: checked === true })
                    }
                  />
                  <label htmlFor={`required-${field.id}`} className="ml-2 text-sm font-medium">
                    Required field
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
            <Plus size={16} className="mr-1" /> Add Field
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
          {saving ? 'Saving...' : 'Save Form'}
        </Button>
      </div>
    </div>
  )
} 