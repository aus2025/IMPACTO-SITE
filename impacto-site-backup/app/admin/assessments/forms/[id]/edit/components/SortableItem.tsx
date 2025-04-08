'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import { Section, Question, QuestionType } from '../page';

interface SortableItemProps {
  id: string;
  section: Section;
  isSelected: boolean;
  onSelect: () => void;
  onSelectQuestion: (questionId: string) => void;
  selectedQuestionId: string | null;
  onDelete: () => void;
  onAddQuestion: (questionType: QuestionType) => void;
  onDeleteQuestion: (questionId: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ 
  id, 
  section,
  isSelected,
  onSelect,
  onSelectQuestion,
  selectedQuestionId,
  onDelete,
  onAddQuestion,
  onDeleteQuestion
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`bg-white border rounded-lg mb-4 overflow-hidden ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div 
        className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
        onClick={onSelect}
      >
        <div className="flex items-center">
          <div 
            {...attributes} 
            {...listeners}
            className="mr-2 cursor-move p-1 hover:bg-gray-200 rounded"
          >
            <GripVertical size={18} className="text-gray-500" />
          </div>
          <h3 className="font-semibold">{section.title}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 hover:bg-red-100 rounded text-gray-500 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="p-4">
        {section.description && (
          <p className="text-sm text-gray-600 mb-4">{section.description}</p>
        )}
        
        <div className="space-y-3">
          {section.questions.map((question) => (
            <QuestionItem 
              key={question.id}
              question={question}
              isSelected={selectedQuestionId === question.id}
              onSelect={() => onSelectQuestion(question.id)}
              onDelete={() => onDeleteQuestion(question.id)}
            />
          ))}
        </div>
        
        <div className="mt-4">
          <div className="relative">
            <button
              className="w-full border border-dashed border-gray-300 rounded-md p-2 text-sm text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center"
            >
              <Plus size={16} className="mr-1" />
              Add Question
            </button>
            
            <div className="absolute z-10 hidden group-hover:block mt-1 bg-white border rounded-md shadow-lg p-2 w-full">
              <button 
                className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                onClick={() => onAddQuestion('text')}
              >
                Text Input
              </button>
              <button 
                className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                onClick={() => onAddQuestion('textarea')}
              >
                Text Area
              </button>
              <button 
                className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                onClick={() => onAddQuestion('select')}
              >
                Dropdown
              </button>
              <button 
                className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                onClick={() => onAddQuestion('checkbox')}
              >
                Checkboxes
              </button>
              <button 
                className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                onClick={() => onAddQuestion('radio')}
              >
                Radio Buttons
              </button>
              <button 
                className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                onClick={() => onAddQuestion('rating')}
              >
                Rating Scale
              </button>
              <button 
                className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                onClick={() => onAddQuestion('date')}
              >
                Date Picker
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuestionItemProps {
  question: Question;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, isSelected, onSelect, onDelete }) => {
  return (
    <div 
      className={`p-3 border rounded ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="font-medium">{question.label}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 hover:bg-red-100 rounded text-gray-500 hover:text-red-600"
        >
          <Trash2 size={14} />
        </button>
      </div>
      
      <div className="text-xs text-gray-500 flex items-center">
        <span className="bg-gray-200 px-2 py-0.5 rounded">
          {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
        </span>
        {question.required && (
          <span className="ml-2 text-red-500">Required</span>
        )}
      </div>
    </div>
  );
};

export default SortableItem; 