'use client';

import React, { useState } from 'react';
import { FormData, Section, Question, ConditionalLogic } from '../page';
import { X, Plus, Trash2 } from 'lucide-react';

interface PropertiesPanelProps {
  form: FormData;
  selectedSectionId: string | null;
  selectedQuestionId: string | null;
  onUpdateSection: (sectionId: string, updates: Partial<Section>) => void;
  onUpdateQuestion: (sectionId: string, questionId: string, updates: Partial<Question>) => void;
  allSections: Section[];
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  form,
  selectedSectionId,
  selectedQuestionId,
  onUpdateSection,
  onUpdateQuestion,
  allSections,
}) => {
  const [newOption, setNewOption] = useState('');

  const selectedSection = selectedSectionId
    ? form.sections.find(section => section.id === selectedSectionId)
    : null;

  const selectedQuestion = selectedSection && selectedQuestionId
    ? selectedSection.questions.find(question => question.id === selectedQuestionId)
    : null;

  // Handle adding a new option to select, radio, or checkbox
  const handleAddOption = () => {
    if (!selectedSection || !selectedQuestion || !newOption.trim()) return;
    
    const currentOptions = selectedQuestion.options || [];
    onUpdateQuestion(
      selectedSection.id,
      selectedQuestion.id,
      { options: [...currentOptions, newOption.trim()] }
    );
    setNewOption('');
  };

  // Handle removing an option
  const handleRemoveOption = (optionToRemove: string) => {
    if (!selectedSection || !selectedQuestion) return;
    
    const currentOptions = selectedQuestion.options || [];
    onUpdateQuestion(
      selectedSection.id,
      selectedQuestion.id,
      { options: currentOptions.filter(option => option !== optionToRemove) }
    );
  };

  // Handle updating conditional logic
  const handleUpdateConditionalLogic = (updates: Partial<ConditionalLogic>) => {
    if (!selectedSection || !selectedQuestion) return;
    
    const currentLogic = selectedQuestion.conditionalLogic || {
      questionId: '',
      operator: 'equals',
      value: ''
    };
    
    onUpdateQuestion(
      selectedSection.id,
      selectedQuestion.id,
      { conditionalLogic: { ...currentLogic, ...updates } }
    );
  };

  // Get all questions from all sections that appear before the selected question
  const getPreviousQuestions = (): Question[] => {
    if (!selectedSectionId || !selectedQuestionId) return [];
    
    const questions: Question[] = [];
    let foundCurrentQuestion = false;
    
    for (const section of form.sections) {
      for (const question of section.questions) {
        if (section.id === selectedSectionId && question.id === selectedQuestionId) {
          foundCurrentQuestion = true;
          break;
        }
        questions.push(question);
      }
      if (foundCurrentQuestion) break;
    }
    
    return questions;
  };

  const previousQuestions = getPreviousQuestions();

  return (
    <div className="w-80 border-l bg-white p-4 overflow-y-auto">
      <h2 className="font-semibold text-lg mb-4">Properties</h2>
      
      {!selectedSection && !selectedQuestion && (
        <p className="text-gray-500 text-sm">Select a section or question to edit its properties</p>
      )}
      
      {selectedSection && !selectedQuestion && (
        <div className="space-y-4">
          <h3 className="font-medium">Section Properties</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={selectedSection.title}
              onChange={(e) => onUpdateSection(selectedSection.id, { title: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={selectedSection.description || ''}
              onChange={(e) => onUpdateSection(selectedSection.id, { description: e.target.value })}
              className="w-full p-2 border rounded-md h-24"
            />
          </div>
        </div>
      )}
      
      {selectedSection && selectedQuestion && (
        <div className="space-y-4">
          <h3 className="font-medium">Question Properties</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
            <input
              type="text"
              value={selectedQuestion.label}
              onChange={(e) => onUpdateQuestion(selectedSection.id, selectedQuestion.id, { label: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={selectedQuestion.description || ''}
              onChange={(e) => onUpdateQuestion(selectedSection.id, selectedQuestion.id, { description: e.target.value })}
              className="w-full p-2 border rounded-md h-24"
            />
          </div>
          
          {(selectedQuestion.type === 'text' || selectedQuestion.type === 'textarea') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
              <input
                type="text"
                value={selectedQuestion.placeholder || ''}
                onChange={(e) => onUpdateQuestion(selectedSection.id, selectedQuestion.id, { placeholder: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          )}
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="required"
              checked={selectedQuestion.required}
              onChange={(e) => onUpdateQuestion(selectedSection.id, selectedQuestion.id, { required: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="required" className="text-sm font-medium text-gray-700">Required</label>
          </div>
          
          {(selectedQuestion.type === 'select' || selectedQuestion.type === 'checkbox' || selectedQuestion.type === 'radio') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
              <div className="space-y-2 mb-2">
                {selectedQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(selectedQuestion.options || [])];
                        newOptions[index] = e.target.value;
                        onUpdateQuestion(selectedSection.id, selectedQuestion.id, { options: newOptions });
                      }}
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button
                      onClick={() => handleRemoveOption(option)}
                      className="ml-2 p-1 text-gray-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add new option"
                  className="flex-1 p-2 border rounded-md"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                />
                <button
                  onClick={handleAddOption}
                  className="ml-2 p-1 text-blue-500 hover:text-blue-700"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}
          
          {/* Scoring for answers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Score Value</label>
            <input
              type="number"
              value={selectedQuestion.score || 0}
              onChange={(e) => onUpdateQuestion(selectedSection.id, selectedQuestion.id, { score: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
              min="0"
              step="1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Score value for automatic assessment calculations
            </p>
          </div>
          
          {/* Conditional Logic */}
          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-2">Conditional Logic</h4>
            <p className="text-xs text-gray-500 mb-2">
              Show this question only when a previous answer meets certain criteria
            </p>
            
            {previousQuestions.length === 0 ? (
              <p className="text-sm text-gray-500">No previous questions available for conditional logic</p>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">If answer to</label>
                  <select
                    value={selectedQuestion.conditionalLogic?.questionId || ''}
                    onChange={(e) => handleUpdateConditionalLogic({ questionId: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">-- Select a question --</option>
                    {previousQuestions.map((question) => (
                      <option key={question.id} value={question.id}>
                        {question.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Operator</label>
                  <select
                    value={selectedQuestion.conditionalLogic?.operator || 'equals'}
                    onChange={(e) => handleUpdateConditionalLogic({ operator: e.target.value as any })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="equals">Equals</option>
                    <option value="not_equals">Does not equal</option>
                    <option value="contains">Contains</option>
                    <option value="not_contains">Does not contain</option>
                    <option value="greater_than">Greater than</option>
                    <option value="less_than">Less than</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input
                    type="text"
                    value={typeof selectedQuestion.conditionalLogic?.value === 'string' 
                      ? selectedQuestion.conditionalLogic?.value 
                      : (selectedQuestion.conditionalLogic?.value as string[])?.join(', ') || ''}
                    onChange={(e) => handleUpdateConditionalLogic({ value: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                {selectedQuestion.conditionalLogic?.questionId && (
                  <button
                    onClick={() => onUpdateQuestion(selectedSection.id, selectedQuestion.id, { conditionalLogic: undefined })}
                    className="flex items-center text-sm text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Remove conditional logic
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel; 