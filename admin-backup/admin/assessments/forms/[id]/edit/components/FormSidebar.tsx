'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Section } from '../page';

// Icons
import { 
  User, 
  Building2, 
  Zap, 
  DollarSign, 
  FileText,
  GripVertical
} from 'lucide-react';

interface FormSidebarProps {
  sectionTemplates: Record<string, Section>;
}

const FormSidebar: React.FC<FormSidebarProps> = ({ sectionTemplates }) => {
  return (
    <div className="w-64 border-r bg-white p-4 overflow-y-auto flex flex-col">
      <h2 className="font-semibold text-lg mb-4">Form Elements</h2>
      
      <div className="mb-6">
        <h3 className="font-medium text-sm text-gray-500 mb-2">SECTIONS</h3>
        <div className="space-y-2">
          <DraggableTemplate id="contactInfo" templateType="contactInfo" icon={<User size={18} />} title="Contact Information" />
          <DraggableTemplate id="businessInfo" templateType="businessInfo" icon={<Building2 size={18} />} title="Business Information" />
          <DraggableTemplate id="automationNeeds" templateType="automationNeeds" icon={<Zap size={18} />} title="Automation Needs" />
          <DraggableTemplate id="budget" templateType="budget" icon={<DollarSign size={18} />} title="Budget" />
          <DraggableTemplate id="additionalInfo" templateType="additionalInfo" icon={<FileText size={18} />} title="Additional Info" />
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-sm text-gray-500 mb-2">QUESTIONS</h3>
        <div className="space-y-2">
          <QuestionType type="text" name="Text Input" />
          <QuestionType type="textarea" name="Text Area" />
          <QuestionType type="select" name="Dropdown Select" />
          <QuestionType type="checkbox" name="Checkboxes" />
          <QuestionType type="radio" name="Radio Buttons" />
          <QuestionType type="rating" name="Rating Scale" />
          <QuestionType type="date" name="Date Picker" />
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t">
        <h3 className="font-medium text-sm text-gray-500 mb-2">HELP</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="hover:text-blue-600 cursor-pointer">Building Forms</li>
          <li className="hover:text-blue-600 cursor-pointer">Conditional Logic</li>
          <li className="hover:text-blue-600 cursor-pointer">Form Scoring</li>
        </ul>
      </div>
    </div>
  );
};

interface DraggableTemplateProps {
  id: string;
  templateType: string;
  icon: React.ReactNode;
  title: string;
}

const DraggableTemplate: React.FC<DraggableTemplateProps> = ({ id, templateType, icon, title }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      type: 'template',
      templateType,
    },
  });
  
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="flex items-center p-2 bg-white border rounded-md cursor-move hover:bg-gray-50 transition-colors"
    >
      <GripVertical size={16} className="text-gray-400 mr-2" />
      <span className="mr-2">{icon}</span>
      <span>{title}</span>
    </div>
  );
};

interface QuestionTypeProps {
  type: string;
  name: string;
}

const QuestionType: React.FC<QuestionTypeProps> = ({ type, name }) => {
  return (
    <div className="flex items-center p-2 bg-white border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
      <span className="text-sm">{name}</span>
    </div>
  );
};

export default FormSidebar; 