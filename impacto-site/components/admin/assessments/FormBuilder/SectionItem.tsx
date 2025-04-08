'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { GripVertical, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormSection, FormQuestion, QuestionType } from '../FormBuilder';
import QuestionItem from './QuestionItem';

interface SectionItemProps {
  section: FormSection;
  isSelected: boolean;
  onSelect: () => void;
  onSelectQuestion: (questionId: string) => void;
  selectedQuestionId: string | null;
  onDelete: () => void;
  onAddQuestion: (type: QuestionType) => void;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  isSelected,
  onSelect,
  onSelectQuestion,
  selectedQuestionId,
  onDelete,
  onAddQuestion
}) => {
  const [expanded, setExpanded] = useState(true);
  const [showQuestionMenu, setShowQuestionMenu] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-lg mb-4 shadow-sm transition-all ${
        isDragging ? 'shadow-lg' : ''
      } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div
        className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer border-b"
        onClick={onSelect}
      >
        <div className="flex items-center">
          <div
            {...attributes}
            {...listeners}
            className="mr-2 cursor-move p-1 hover:bg-gray-200 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical size={18} className="text-gray-500" />
          </div>
          <h3 className="font-semibold">{section.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-red-100 rounded text-gray-500 hover:text-red-600"
            aria-label="Delete section"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={toggleExpanded}
            className="p-1 hover:bg-gray-200 rounded text-gray-500"
            aria-label={expanded ? "Collapse section" : "Expand section"}
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="p-4">
          {section.description && (
            <p className="text-sm text-gray-600 mb-4">{section.description}</p>
          )}

          <div className="space-y-3">
            <SortableContext items={section.questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
              {section.questions.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  isSelected={selectedQuestionId === question.id}
                  onSelect={() => onSelectQuestion(question.id)}
                />
              ))}
            </SortableContext>
          </div>

          <div className="mt-4 relative">
            <Button
              variant="outline"
              className="w-full border-dashed flex items-center justify-center gap-1"
              onClick={() => setShowQuestionMenu(!showQuestionMenu)}
            >
              <Plus size={16} />
              Add Question
            </Button>

            {showQuestionMenu && (
              <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg p-2 w-full">
                <div className="grid grid-cols-2 gap-1">
                  <button
                    className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => {
                      onAddQuestion('text');
                      setShowQuestionMenu(false);
                    }}
                  >
                    Text Input
                  </button>
                  <button
                    className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => {
                      onAddQuestion('textarea');
                      setShowQuestionMenu(false);
                    }}
                  >
                    Text Area
                  </button>
                  <button
                    className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => {
                      onAddQuestion('select');
                      setShowQuestionMenu(false);
                    }}
                  >
                    Dropdown
                  </button>
                  <button
                    className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => {
                      onAddQuestion('multiselect');
                      setShowQuestionMenu(false);
                    }}
                  >
                    Multi Select
                  </button>
                  <button
                    className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => {
                      onAddQuestion('checkbox');
                      setShowQuestionMenu(false);
                    }}
                  >
                    Checkboxes
                  </button>
                  <button
                    className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => {
                      onAddQuestion('radio');
                      setShowQuestionMenu(false);
                    }}
                  >
                    Radio Buttons
                  </button>
                  <button
                    className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => {
                      onAddQuestion('scale');
                      setShowQuestionMenu(false);
                    }}
                  >
                    Rating Scale
                  </button>
                  <button
                    className="text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => {
                      onAddQuestion('date');
                      setShowQuestionMenu(false);
                    }}
                  >
                    Date Picker
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionItem; 