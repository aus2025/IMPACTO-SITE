'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { FormData, QuestionType } from '../page';

interface FormCanvasProps {
  form: FormData;
  onSelectSection: (sectionId: string) => void;
  onSelectQuestion: (sectionId: string, questionId: string) => void;
  selectedSectionId: string | null;
  selectedQuestionId: string | null;
  onDeleteSection: (sectionId: string) => void;
  onDeleteQuestion: (sectionId: string, questionId: string) => void;
  onAddQuestion: (sectionId: string, questionType: QuestionType) => void;
}

const FormCanvas: React.FC<FormCanvasProps> = ({
  form,
  onSelectSection,
  onSelectQuestion,
  selectedSectionId,
  selectedQuestionId,
  onDeleteSection,
  onDeleteQuestion,
  onAddQuestion,
}) => {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div ref={setNodeRef} className="w-full min-h-full p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <textarea
            value={form.description || ''}
            readOnly
            className="w-full p-3 border border-transparent bg-transparent text-gray-600 text-sm focus:outline-none"
            placeholder="Form description will appear here..."
          />
        </div>

        {form.sections.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <p className="text-gray-500 mb-2">Drag sections here to build your form</p>
            <p className="text-sm text-gray-400">
              Start by dragging section templates from the left sidebar
            </p>
          </div>
        ) : (
          <SortableContext items={form.sections.map(section => section.id)} strategy={verticalListSortingStrategy}>
            {form.sections.map((section) => (
              <SortableItem
                key={section.id}
                id={section.id}
                section={section}
                isSelected={selectedSectionId === section.id}
                onSelect={() => onSelectSection(section.id)}
                onSelectQuestion={(questionId) => onSelectQuestion(section.id, questionId)}
                selectedQuestionId={selectedQuestionId}
                onDelete={() => onDeleteSection(section.id)}
                onAddQuestion={(questionType) => onAddQuestion(section.id, questionType)}
                onDeleteQuestion={(questionId) => onDeleteQuestion(section.id, questionId)}
              />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
};

export default FormCanvas; 