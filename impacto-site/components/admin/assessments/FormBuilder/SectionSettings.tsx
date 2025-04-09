'use client';

import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { FormSection, QuestionType } from '../FormBuilder';

interface SectionSettingsProps {
  section: FormSection;
  onUpdate: (updates: Partial<FormSection>) => void;
  onDelete: () => void;
  onAddQuestion: (type: QuestionType) => void;
}

const SectionSettings: React.FC<SectionSettingsProps> = ({
  section,
  onUpdate,
  onDelete,
  onAddQuestion
}) => {
  const questionTypes: Array<{ type: QuestionType; label: string }> = [
    { type: 'text', label: 'Text Input' },
    { type: 'textarea', label: 'Text Area' },
    { type: 'select', label: 'Dropdown' },
    { type: 'multiselect', label: 'Multi Select' },
    { type: 'checkbox', label: 'Checkboxes' },
    { type: 'radio', label: 'Radio Buttons' },
    { type: 'scale', label: 'Rating Scale' },
    { type: 'date', label: 'Date Picker' }
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Section Settings</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={onDelete}
        >
          <Trash2 size={16} className="mr-1" />
          Delete
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="section-title">Section Title</Label>
          <Input
            id="section-title"
            value={section.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="section-description">Description</Label>
          <Textarea
            id="section-description"
            value={section.description || ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="mt-1 min-h-[100px]"
            placeholder="Add a description to help users understand this section..."
          />
        </div>

        <div className="border-t pt-4 mt-6">
          <h4 className="font-medium mb-2">Add Questions</h4>
          <div className="grid grid-cols-2 gap-2">
            {questionTypes.map((qType) => (
              <Button
                key={qType.type}
                variant="outline"
                size="sm"
                onClick={() => onAddQuestion(qType.type)}
                className="text-xs justify-start"
              >
                <Plus size={14} className="mr-1" />
                {qType.label}
              </Button>
            ))}
          </div>
        </div>

        <Card className="p-3 bg-blue-50 border-blue-200 mt-4">
          <p className="text-xs text-blue-700">
            <strong>Tip:</strong> Create a clear structure by grouping related questions together in sections.
            Users are more likely to complete forms that are well-organized.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SectionSettings; 