'use client';

import React, { useState } from 'react';
import { FormData, FormSection, FormQuestion } from '../FormBuilder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

interface FormPreviewProps {
  form: FormData;
}

const FormPreview: React.FC<FormPreviewProps> = ({ form }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formValues, setFormValues] = useState<Record<string, string | number | boolean | null>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);

  // Sort sections by order
  const sortedSections = [...form.sections].sort((a, b) => a.order - b.order);
  
  // Calculate progress
  React.useEffect(() => {
    const progressValue = ((currentSection + 1) / Math.max(1, sortedSections.length)) * 100;
    setProgress(progressValue);
  }, [currentSection, sortedSections.length]);

  // Handle input changes
  const handleInputChange = (questionId: string, value: string | number | boolean | null) => {
    setFormValues((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Clear error when user inputs a value
    if (formErrors[questionId]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  // Navigate to next section
  const handleNext = () => {
    // Validate required fields in current section
    const currentSectionQuestions = sortedSections[currentSection].questions;
    const requiredQuestions = currentSectionQuestions.filter(q => q.required);
    const newErrors: Record<string, string> = {};
    
    for (const question of requiredQuestions) {
      const value = formValues[question.id];
      if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        newErrors[question.id] = 'This field is required';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }
    
    // Move to next section if validation passes
    if (currentSection < sortedSections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  // Navigate to previous section
  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  // Render a question based on its type
  const renderQuestion = (question: FormQuestion) => {
    // Check if this question should be shown based on conditional logic
    if (question.conditionalLogic) {
      const { logicType, conditions, conditionRelation } = question.conditionalLogic;
      const conditionResults = conditions.map(condition => {
        const targetValue = formValues[condition.questionId];
        const conditionValue = condition.value;
        
        switch (condition.operator) {
          case 'equals':
            return targetValue === conditionValue;
          case 'not_equals':
            return targetValue !== conditionValue;
          case 'contains':
            return Array.isArray(targetValue) 
              ? targetValue.includes(conditionValue as string)
              : String(targetValue).includes(String(conditionValue));
          case 'not_contains':
            return Array.isArray(targetValue) 
              ? !targetValue.includes(conditionValue as string)
              : !String(targetValue).includes(String(conditionValue));
          case 'greater_than':
            return Number(targetValue) > Number(conditionValue);
          case 'less_than':
            return Number(targetValue) < Number(conditionValue);
          default:
            return false;
        }
      });
      
      const shouldShow = conditionRelation === 'AND'
        ? conditionResults.every(Boolean)
        : conditionResults.some(Boolean);
        
      if ((logicType === 'show' && !shouldShow) || (logicType === 'hide' && shouldShow)) {
        return null;
      }
    }
    
    // Render based on question type
    switch (question.type) {
      case 'text':
        return (
          <div className="mb-4">
            <Label htmlFor={question.id} className="block mb-1">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={question.id}
              placeholder={question.placeholder}
              value={formValues[question.id] || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className={formErrors[question.id] ? 'border-red-500' : ''}
            />
            {question.helpText && <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>}
            {formErrors[question.id] && <p className="text-xs text-red-500 mt-1">{formErrors[question.id]}</p>}
          </div>
        );
        
      case 'textarea':
        return (
          <div className="mb-4">
            <Label htmlFor={question.id} className="block mb-1">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={question.id}
              placeholder={question.placeholder}
              value={formValues[question.id] || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className={`min-h-[100px] ${formErrors[question.id] ? 'border-red-500' : ''}`}
            />
            {question.helpText && <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>}
            {formErrors[question.id] && <p className="text-xs text-red-500 mt-1">{formErrors[question.id]}</p>}
          </div>
        );
        
      case 'select':
        return (
          <div className="mb-4">
            <Label htmlFor={question.id} className="block mb-1">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              value={formValues[question.id] || ''}
              onValueChange={(value) => handleInputChange(question.id, value)}
            >
              <SelectTrigger id={question.id} className={formErrors[question.id] ? 'border-red-500' : ''}>
                <SelectValue placeholder={question.placeholder || 'Select an option'} />
              </SelectTrigger>
              <SelectContent>
                {question.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {question.helpText && <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>}
            {formErrors[question.id] && <p className="text-xs text-red-500 mt-1">{formErrors[question.id]}</p>}
          </div>
        );
        
      case 'multiselect':
        // This would ideally use a proper multi-select component
        // For this example, we'll use checkboxes styled as a multiselect
        return (
          <div className="mb-4">
            <Label htmlFor={question.id} className="block mb-1">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className={`border p-2 rounded-md ${formErrors[question.id] ? 'border-red-500' : 'border-gray-300'}`}>
              {question.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 py-1">
                  <Checkbox
                    id={`${question.id}-${option.value}`}
                    checked={(formValues[question.id] || []).includes(option.value)}
                    onCheckedChange={(checked) => {
                      const currentValues = formValues[question.id] || [];
                      if (checked) {
                        handleInputChange(question.id, [...currentValues, option.value]);
                      } else {
                        handleInputChange(
                          question.id,
                          currentValues.filter((v: string) => v !== option.value)
                        );
                      }
                    }}
                  />
                  <Label
                    htmlFor={`${question.id}-${option.value}`}
                    className="text-sm font-normal"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {question.helpText && <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>}
            {formErrors[question.id] && <p className="text-xs text-red-500 mt-1">{formErrors[question.id]}</p>}
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="mb-4">
            <fieldset>
              <legend className="block text-sm font-medium mb-1">
                {question.label}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </legend>
              <div className={`space-y-2 ${formErrors[question.id] ? 'text-red-500' : ''}`}>
                {question.options?.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${option.value}`}
                      checked={(formValues[question.id] || []).includes(option.value)}
                      onCheckedChange={(checked) => {
                        const currentValues = formValues[question.id] || [];
                        if (checked) {
                          handleInputChange(question.id, [...currentValues, option.value]);
                        } else {
                          handleInputChange(
                            question.id,
                            currentValues.filter((v: string) => v !== option.value)
                          );
                        }
                      }}
                    />
                    <Label
                      htmlFor={`${question.id}-${option.value}`}
                      className="text-sm font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              {question.helpText && <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>}
              {formErrors[question.id] && <p className="text-xs text-red-500 mt-1">{formErrors[question.id]}</p>}
            </fieldset>
          </div>
        );
        
      case 'radio':
        return (
          <div className="mb-4">
            <fieldset>
              <legend className="block text-sm font-medium mb-1">
                {question.label}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </legend>
              <RadioGroup
                value={formValues[question.id] || ''}
                onValueChange={(value) => handleInputChange(question.id, value)}
                className={`space-y-2 ${formErrors[question.id] ? 'text-red-500' : ''}`}
              >
                {question.options?.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem id={`${question.id}-${option.value}`} value={option.value} />
                    <Label
                      htmlFor={`${question.id}-${option.value}`}
                      className="text-sm font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {question.helpText && <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>}
              {formErrors[question.id] && <p className="text-xs text-red-500 mt-1">{formErrors[question.id]}</p>}
            </fieldset>
          </div>
        );
        
      case 'scale':
        // Simple numeric scale
        return (
          <div className="mb-4">
            <Label htmlFor={question.id} className="block mb-1">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="flex justify-between items-center mt-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <Button
                  key={num}
                  type="button"
                  variant={formValues[question.id] === num.toString() ? "default" : "outline"}
                  className="w-10 h-10 rounded-full"
                  onClick={() => handleInputChange(question.id, num.toString())}
                >
                  {num}
                </Button>
              ))}
            </div>
            {question.helpText && <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>}
            {formErrors[question.id] && <p className="text-xs text-red-500 mt-1">{formErrors[question.id]}</p>}
          </div>
        );
        
      case 'date':
        return (
          <div className="mb-4">
            <Label htmlFor={question.id} className="block mb-1">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={question.id}
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    formErrors[question.id] ? 'border-red-500' : ''
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formValues[question.id] ? (
                    format(new Date(formValues[question.id]), 'PPP')
                  ) : (
                    <span className="text-gray-400">{question.placeholder || 'Select a date'}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formValues[question.id] ? new Date(formValues[question.id]) : undefined}
                  onSelect={(date) => handleInputChange(question.id, date?.toISOString())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {question.helpText && <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>}
            {formErrors[question.id] && <p className="text-xs text-red-500 mt-1">{formErrors[question.id]}</p>}
          </div>
        );
        
      default:
        return null;
    }
  };

  // Render the current section
  const renderCurrentSection = () => {
    if (sortedSections.length === 0) {
      return (
        <div className="text-center p-8">
          <p className="text-gray-500">This form has no sections.</p>
        </div>
      );
    }

    const currentSectionData = sortedSections[currentSection];
    const sortedQuestions = [...currentSectionData.questions].sort((a, b) => a.order - b.order);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">{currentSectionData.title}</h2>
          {currentSectionData.description && (
            <p className="text-gray-600 text-sm mb-4">{currentSectionData.description}</p>
          )}
        </div>
        
        <div className="space-y-6">
          {sortedQuestions.map((question) => (
            <div key={question.id}>
              {renderQuestion(question)}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0}
          >
            Previous
          </Button>
          
          <Button
            type="button"
            onClick={handleNext}
          >
            {currentSection === sortedSections.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="h-2 w-full bg-gray-100 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <div>Section {currentSection + 1} of {sortedSections.length}</div>
          <div>{Math.round(progress)}% Complete</div>
        </div>
      </div>
      
      {/* Form content */}
      {renderCurrentSection()}
      
      {/* Form submission would be handled here in a real implementation */}
    </div>
  );
};

export default FormPreview; 