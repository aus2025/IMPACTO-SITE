'use client';

import React, { useState, useCallback } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { 
  GripVertical,
  Plus,
  Settings,
  Trash2,
  Eye,
  Save,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import SectionItem from './FormBuilder/SectionItem';
import QuestionItem from './FormBuilder/QuestionItem';
import FormPreview from './FormBuilder/FormPreview';
import SectionSettings from './FormBuilder/SectionSettings';
import QuestionSettings from './FormBuilder/QuestionSettings';
import { v4 as uuidv4 } from 'uuid';

// Types
export type QuestionType = 
  | 'text' 
  | 'textarea' 
  | 'select' 
  | 'multiselect' 
  | 'checkbox' 
  | 'radio' 
  | 'scale' 
  | 'date';

export type ValidationOperator = 
  | 'required' 
  | 'min_length' 
  | 'max_length' 
  | 'min_value' 
  | 'max_value' 
  | 'pattern' 
  | 'email';

export type ConditionalOperator = 
  | 'equals' 
  | 'not_equals' 
  | 'contains' 
  | 'not_contains' 
  | 'greater_than' 
  | 'less_than';

export interface FormQuestion {
  id: string;
  sectionId: string;
  type: QuestionType;
  label: string;
  placeholder?: string;
  helpText?: string;
  required: boolean;
  order: number;
  options?: Array<{ label: string; value: string }>;
  conditionalLogic?: ConditionalLogic;
  validations?: FormValidation[];
  scoring?: QuestionScoring;
}

export interface ConditionalLogic {
  logicType: 'show' | 'hide';
  conditions: Array<{
    questionId: string;
    operator: ConditionalOperator;
    value: string | string[];
  }>;
  conditionRelation: 'AND' | 'OR';
}

export interface FormValidation {
  type: ValidationOperator;
  value?: string | number;
  message: string;
}

export interface QuestionScoring {
  scoreType: 'value' | 'options';
  defaultScore: number;
  optionScores?: Record<string, number>;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  questions: FormQuestion[];
  order: number;
}

export interface FormData {
  id: string;
  title: string;
  description?: string;
  sections: FormSection[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  version?: number;
}

// Props interface
interface FormBuilderProps {
  initialForm?: FormData;
  onSave?: (form: FormData) => Promise<void>;
  onPublish?: (form: FormData) => Promise<void>;
}

const initialFormData: FormData = {
  id: uuidv4(),
  title: 'New Assessment Form',
  description: 'Add a description for your assessment form',
  sections: [],
  published: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1
};

const FormBuilder: React.FC<FormBuilderProps> = ({ 
  initialForm = initialFormData,
  onSave,
  onPublish 
}) => {
  // State
  const [form, setForm] = useState<FormData>(initialForm);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Setup drag-and-drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle form details update
  const updateFormDetails = useCallback((updates: Partial<FormData>) => {
    setForm(prevForm => ({
      ...prevForm,
      ...updates,
      updatedAt: new Date().toISOString()
    }));
  }, []);

  // Add a new section
  const addSection = useCallback(() => {
    const newSection: FormSection = {
      id: uuidv4(),
      title: 'New Section',
      description: 'Add a description for this section',
      questions: [],
      order: form.sections.length
    };

    setForm(prevForm => ({
      ...prevForm,
      sections: [...prevForm.sections, newSection],
      updatedAt: new Date().toISOString()
    }));

    setSelectedSectionId(newSection.id);
    setSelectedQuestionId(null);
  }, [form.sections.length]);

  // Update a section
  const updateSection = useCallback((sectionId: string, updates: Partial<FormSection>) => {
    setForm(prevForm => ({
      ...prevForm,
      sections: prevForm.sections.map(section => 
        section.id === sectionId ? { ...section, ...updates } : section
      ),
      updatedAt: new Date().toISOString()
    }));
  }, []);

  // Delete a section
  const deleteSection = useCallback((sectionId: string) => {
    setForm(prevForm => ({
      ...prevForm,
      sections: prevForm.sections.filter(section => section.id !== sectionId),
      updatedAt: new Date().toISOString()
    }));

    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null);
      setSelectedQuestionId(null);
    }
  }, [selectedSectionId]);

  // Add a question to a section
  const addQuestion = useCallback((sectionId: string, type: QuestionType) => {
    const newQuestion: FormQuestion = {
      id: uuidv4(),
      sectionId,
      type,
      label: 'New Question',
      required: false,
      order: form.sections.find(s => s.id === sectionId)?.questions.length || 0
    };

    // Add default options for certain question types
    if (['select', 'multiselect', 'checkbox', 'radio'].includes(type)) {
      newQuestion.options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
      ];
    }

    setForm(prevForm => ({
      ...prevForm,
      sections: prevForm.sections.map(section => 
        section.id === sectionId ? {
          ...section,
          questions: [...section.questions, newQuestion]
        } : section
      ),
      updatedAt: new Date().toISOString()
    }));

    setSelectedSectionId(sectionId);
    setSelectedQuestionId(newQuestion.id);
  }, [form.sections]);

  // Update a question
  const updateQuestion = useCallback((sectionId: string, questionId: string, updates: Partial<FormQuestion>) => {
    setForm(prevForm => ({
      ...prevForm,
      sections: prevForm.sections.map(section => 
        section.id === sectionId ? {
          ...section,
          questions: section.questions.map(question => 
            question.id === questionId ? { ...question, ...updates } : question
          )
        } : section
      ),
      updatedAt: new Date().toISOString()
    }));
  }, []);

  // Delete a question
  const deleteQuestion = useCallback((sectionId: string, questionId: string) => {
    setForm(prevForm => ({
      ...prevForm,
      sections: prevForm.sections.map(section => 
        section.id === sectionId ? {
          ...section,
          questions: section.questions.filter(question => question.id !== questionId)
        } : section
      ),
      updatedAt: new Date().toISOString()
    }));

    if (selectedQuestionId === questionId) {
      setSelectedQuestionId(null);
    }
  }, [selectedQuestionId]);

  // Duplicate a question
  const duplicateQuestion = useCallback((sectionId: string, questionId: string) => {
    const section = form.sections.find(s => s.id === sectionId);
    const questionToDuplicate = section?.questions.find(q => q.id === questionId);
    
    if (!questionToDuplicate) return;
    
    const newQuestion: FormQuestion = {
      ...questionToDuplicate,
      id: uuidv4(),
      label: `${questionToDuplicate.label} (Copy)`,
      order: (section?.questions.length || 0)
    };

    setForm(prevForm => ({
      ...prevForm,
      sections: prevForm.sections.map(section => 
        section.id === sectionId ? {
          ...section,
          questions: [...section.questions, newQuestion]
        } : section
      ),
      updatedAt: new Date().toISOString()
    }));
  }, [form.sections]);

  // Handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // If dragging sections
      if (active.id.toString().includes('section-')) {
        setForm(prevForm => {
          const oldIndex = prevForm.sections.findIndex(s => s.id === active.id);
          const newIndex = prevForm.sections.findIndex(s => s.id === over.id);
          
          return {
            ...prevForm,
            sections: arrayMove(prevForm.sections, oldIndex, newIndex).map((section, index) => ({
              ...section,
              order: index
            })),
            updatedAt: new Date().toISOString()
          };
        });
      } 
      // If dragging questions within the same section
      else if (active.id.toString().includes('question-') && over.id.toString().includes('question-')) {
        const activeSection = form.sections.find(s => 
          s.questions.some(q => q.id === active.id)
        );
        
        if (activeSection) {
          setForm(prevForm => {
            const updatedSections = prevForm.sections.map(section => {
              if (section.id === activeSection.id) {
                const oldIndex = section.questions.findIndex(q => q.id === active.id);
                const newIndex = section.questions.findIndex(q => q.id === over.id);
                
                return {
                  ...section,
                  questions: arrayMove(section.questions, oldIndex, newIndex).map((question, index) => ({
                    ...question,
                    order: index
                  }))
                };
              }
              return section;
            });
            
            return {
              ...prevForm,
              sections: updatedSections,
              updatedAt: new Date().toISOString()
            };
          });
        }
      }
    }
    
    setActiveId(null);
  };

  // Handle save form
  const handleSave = async () => {
    if (onSave) {
      setIsSaving(true);
      try {
        await onSave(form);
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Handle publish form
  const handlePublish = async () => {
    if (onPublish) {
      setIsPublishing(true);
      try {
        await onPublish({
          ...form,
          published: true,
          updatedAt: new Date().toISOString()
        });
      } finally {
        setIsPublishing(false);
      }
    }
  };

  // Toggle preview mode
  const togglePreview = () => {
    setShowPreview(prev => !prev);
  };

  // Render settings panel
  const renderSettingsPanel = () => {
    if (selectedQuestionId) {
      const section = form.sections.find(s => s.id === selectedSectionId);
      const question = section?.questions.find(q => q.id === selectedQuestionId);
      
      if (question) {
        return (
          <QuestionSettings
            question={question}
            sections={form.sections}
            onUpdate={(updates) => updateQuestion(question.sectionId, question.id, updates)}
            onDelete={() => deleteQuestion(question.sectionId, question.id)}
            onDuplicate={() => duplicateQuestion(question.sectionId, question.id)}
          />
        );
      }
    } else if (selectedSectionId) {
      const section = form.sections.find(s => s.id === selectedSectionId);
      
      if (section) {
        return (
          <SectionSettings
            section={section}
            onUpdate={(updates) => updateSection(section.id, updates)}
            onDelete={() => deleteSection(section.id)}
            onAddQuestion={(type) => addQuestion(section.id, type)}
          />
        );
      }
    }
    
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Form Settings</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="form-title">Form Title</Label>
            <Input
              id="form-title"
              value={form.title}
              onChange={(e) => updateFormDetails({ title: e.target.value })}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="form-description">Form Description</Label>
            <Textarea
              id="form-description"
              value={form.description || ''}
              onChange={(e) => updateFormDetails({ description: e.target.value })}
              className="mt-1 h-24"
            />
          </div>
        </div>
      </div>
    );
  };

  // If in preview mode, render the preview component
  if (showPreview) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{form.title} Preview</h2>
          <Button variant="outline" onClick={togglePreview}>
            Exit Preview
          </Button>
        </div>
        <FormPreview form={form} />
      </div>
    );
  }

  // Render the form builder
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full">
        {/* Left Sidebar - Form Canvas */}
        <div className="flex-1 border-r p-4 overflow-auto h-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">{form.title}</h1>
              {form.description && (
                <p className="text-gray-500 mt-1">{form.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={togglePreview} className="flex items-center gap-1">
                <Eye size={16} />
                Preview
              </Button>
              <Button variant="outline" onClick={handleSave} disabled={isSaving} className="flex items-center gap-1">
                <Save size={16} />
                Save
              </Button>
              <Button variant="default" onClick={handlePublish} disabled={isPublishing} className="flex items-center gap-1">
                Publish
              </Button>
            </div>
          </div>

          {form.sections.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <p className="text-gray-500 mb-2">No sections added yet</p>
              <Button onClick={addSection} className="mt-2">Add Section</Button>
            </div>
          ) : (
            <div>
              <SortableContext items={form.sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                {form.sections.map((section) => (
                  <SectionItem
                    key={section.id}
                    section={section}
                    isSelected={selectedSectionId === section.id}
                    onSelect={() => {
                      setSelectedSectionId(section.id);
                      setSelectedQuestionId(null);
                    }}
                    onSelectQuestion={(questionId) => {
                      setSelectedSectionId(section.id);
                      setSelectedQuestionId(questionId);
                    }}
                    selectedQuestionId={selectedQuestionId}
                    onDelete={() => deleteSection(section.id)}
                    onAddQuestion={(type) => addQuestion(section.id, type)}
                  />
                ))}
              </SortableContext>
              
              <Button 
                variant="outline" 
                onClick={addSection} 
                className="mt-6 w-full border-dashed flex items-center justify-center gap-1"
              >
                <Plus size={16} />
                Add Section
              </Button>
            </div>
          )}
        </div>
        
        {/* Right Sidebar - Settings */}
        <div className="w-80 bg-gray-50 overflow-y-auto">
          {renderSettingsPanel()}
        </div>
        
        {/* Drag Overlay */}
        <DragOverlay>
          {activeId && activeId.toString().includes('section-') && (
            <div className="bg-white border rounded-lg p-4 shadow-lg opacity-80 w-full">
              <div className="font-semibold">
                {form.sections.find(s => s.id === activeId)?.title || 'Section'}
              </div>
            </div>
          )}
          {activeId && activeId.toString().includes('question-') && (
            <div className="bg-white border rounded-lg p-3 shadow-lg opacity-80">
              <div className="font-semibold">
                {form.sections.flatMap(s => s.questions).find(q => q.id === activeId)?.label || 'Question'}
              </div>
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default FormBuilder; 