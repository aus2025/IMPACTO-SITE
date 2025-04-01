'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { 
  Square, 
  CheckSquare, 
  AlignLeft, 
  CheckCircle, 
  List, 
  BarChart4, 
  Calendar, 
  Type, 
  SlidersHorizontal
} from 'lucide-react';
import { FormQuestion } from '../FormBuilder';

interface QuestionItemProps {
  question: FormQuestion;
  isSelected: boolean;
  onSelect: () => void;
}

// Map question types to their respective icons
const questionTypeIcons: Record<string, React.ReactNode> = {
  text: <Type size={14} />,
  textarea: <AlignLeft size={14} />,
  select: <List size={14} />,
  multiselect: <SlidersHorizontal size={14} />,
  checkbox: <CheckSquare size={14} />,
  radio: <CheckCircle size={14} />,
  scale: <BarChart4 size={14} />,
  date: <Calendar size={14} />,
};

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  isSelected,
  onSelect,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const getQuestionPreview = () => {
    // Render a preview based on question type
    switch (question.type) {
      case 'text':
        return (
          <div className="w-full border border-gray-200 rounded-md h-8 bg-gray-50"></div>
        );
        
      case 'textarea':
        return (
          <div className="w-full border border-gray-200 rounded-md h-16 bg-gray-50"></div>
        );
        
      case 'select':
        return (
          <div className="w-full border border-gray-200 rounded-md h-8 bg-gray-50 flex items-center justify-between px-2">
            <span className="text-xs text-gray-400">Select...</span>
            <span className="text-gray-400">▼</span>
          </div>
        );
        
      case 'multiselect':
        return (
          <div className="w-full border border-gray-200 rounded-md h-8 bg-gray-50 flex items-center justify-between px-2">
            <span className="text-xs text-gray-400">Select multiple...</span>
            <span className="text-gray-400">▼</span>
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="space-y-1">
            {question.options?.slice(0, 3).map((option, index) => (
              <div key={index} className="flex items-center">
                <Square size={14} className="text-gray-400 mr-2" />
                <span className="text-xs text-gray-500">{option.label}</span>
              </div>
            ))}
          </div>
        );
        
      case 'radio':
        return (
          <div className="space-y-1">
            {question.options?.slice(0, 3).map((option, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full border border-gray-400 mr-2"></div>
                <span className="text-xs text-gray-500">{option.label}</span>
              </div>
            ))}
          </div>
        );
        
      case 'scale':
        return (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(num => (
              <div key={num} className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-500">{num}</span>
              </div>
            ))}
          </div>
        );
        
      case 'date':
        return (
          <div className="w-full border border-gray-200 rounded-md h-8 bg-gray-50 flex items-center px-2">
            <span className="text-xs text-gray-400">MM/DD/YYYY</span>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`p-3 border rounded-md bg-white shadow-sm transition-all ${
        isDragging ? 'shadow-md' : ''
      } ${isSelected ? 'ring-2 ring-blue-500' : 'hover:border-gray-300'} cursor-pointer`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <div
            {...attributes}
            {...listeners}
            className="mr-2 cursor-move p-1 hover:bg-gray-200 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical size={16} className="text-gray-400" />
          </div>
          <span className="font-medium text-sm">{question.label}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-gray-100 px-2 py-0.5 rounded-full flex items-center">
            {questionTypeIcons[question.type] || <Square size={14} />}
            <span className="text-xs text-gray-500 ml-1">
              {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
            </span>
          </div>
          {question.required && (
            <div className="bg-red-50 px-2 py-0.5 rounded-full">
              <span className="text-xs text-red-500">Required</span>
            </div>
          )}
          {question.conditionalLogic && (
            <div className="bg-purple-50 px-2 py-0.5 rounded-full">
              <span className="text-xs text-purple-500">Conditional</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-1">
        {getQuestionPreview()}
      </div>
      
      {question.helpText && (
        <p className="text-xs text-gray-500 mt-2 italic">{question.helpText}</p>
      )}
    </div>
  );
};

export default QuestionItem; 