'use client';

import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { 
  Input, 
  Textarea, 
  Select, 
  Checkbox, 
  Radio, 
  Slider, 
  Switch, 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui';
import { CalendarIcon, SearchIcon } from 'lucide-react';

// Define question type categories
const CATEGORIES = [
  'All',
  'Text Input',
  'Choice',
  'Advanced',
  'Other'
];

// Define all available question types with their metadata
const QUESTION_TYPES = [
  {
    id: 'single_line',
    name: 'Single Line Text',
    description: 'Best for short answers like names, titles, or simple responses.',
    category: 'Text Input',
    icon: <Input className="w-full" placeholder="Short answer text" disabled />,
    dragType: 'questionType'
  },
  {
    id: 'paragraph',
    name: 'Paragraph Text',
    description: 'Ideal for longer responses, comments, or detailed feedback.',
    category: 'Text Input',
    icon: <Textarea className="w-full resize-none" rows={3} placeholder="Long answer text..." disabled />,
    dragType: 'questionType'
  },
  {
    id: 'single_select',
    name: 'Single Select',
    description: 'For selecting one option from a list of choices.',
    category: 'Choice',
    icon: (
      <div className="w-full">
        <Select disabled>
          <option>Select an option</option>
        </Select>
      </div>
    ),
    dragType: 'questionType'
  },
  {
    id: 'multi_select',
    name: 'Multi-Select',
    description: 'Allows selection of multiple options from a list.',
    category: 'Choice',
    icon: (
      <div className="space-y-2">
        <div className="flex items-center">
          <Checkbox id="option1" disabled />
          <label htmlFor="option1" className="ml-2 text-sm text-gray-500">Option 1</label>
        </div>
        <div className="flex items-center">
          <Checkbox id="option2" disabled />
          <label htmlFor="option2" className="ml-2 text-sm text-gray-500">Option 2</label>
        </div>
      </div>
    ),
    dragType: 'questionType'
  },
  {
    id: 'rating',
    name: 'Scale/Rating',
    description: 'For collecting satisfaction scores or ratings on a scale.',
    category: 'Advanced',
    icon: (
      <div className="w-full">
        <Slider
          disabled
          defaultValue={[3]}
          max={5}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    ),
    dragType: 'questionType'
  },
  {
    id: 'date',
    name: 'Date Picker',
    description: 'For collecting date information like appointments or deadlines.',
    category: 'Advanced',
    icon: (
      <div className="relative w-full">
        <Input 
          placeholder="Select date" 
          disabled 
          className="w-full" 
        />
        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    ),
    dragType: 'questionType'
  },
  {
    id: 'yes_no',
    name: 'Yes/No Toggle',
    description: 'For simple binary choices or boolean values.',
    category: 'Other',
    icon: (
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Enabled?</span>
        <Switch disabled />
      </div>
    ),
    dragType: 'questionType'
  }
];

// Type for the question item being dragged
export type QuestionTypeItem = {
  id: string;
  type: string;
  name: string;
  category: string;
};

type QuestionTypeSelectorProps = {
  onSelectQuestionType?: (questionType: QuestionTypeItem) => void;
};

export default function QuestionTypeSelector({ onSelectQuestionType }: QuestionTypeSelectorProps) {
  // State for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter question types based on search and category
  const filteredQuestionTypes = QUESTION_TYPES.filter(type => {
    const matchesSearch = type.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        type.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || type.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Render a draggable question type card
  const QuestionTypeCard = ({ type }: { type: typeof QUESTION_TYPES[0] }) => {
    // Set up drag functionality
    const [{ isDragging }, drag] = useDrag(() => ({
      type: type.dragType,
      item: {
        id: type.id,
        type: type.dragType,
        name: type.name,
        category: type.category
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }));

    // Handle click on card
    const handleCardClick = () => {
      if (onSelectQuestionType) {
        onSelectQuestionType({
          id: type.id,
          type: type.dragType,
          name: type.name,
          category: type.category
        });
      }
    };

    return (
      <Card 
        ref={drag}
        className={`cursor-move transition-all hover:border-blue-400 hover:shadow-md ${
          isDragging ? 'opacity-50' : 'opacity-100'
        }`}
        onClick={handleCardClick}
      >
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-medium">{type.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-16 flex items-center justify-center border rounded-md p-2 bg-gray-50">
            {type.icon}
          </div>
          <CardDescription className="mt-2 text-xs">
            {type.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-xs text-gray-500">
          <p>Drag to add to form</p>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 w-full">
      <h3 className="text-lg font-semibold mb-4">Question Types</h3>
      
      {/* Search bar */}
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Search question types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Question type cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {filteredQuestionTypes.map(type => (
          <QuestionTypeCard key={type.id} type={type} />
        ))}
      </div>
      
      {filteredQuestionTypes.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No question types match your search.
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium mb-2">How to use</h4>
        <p className="text-xs text-gray-600">
          Drag and drop a question type to add it to your form, or click on a card to select it.
          Different question types are suitable for collecting different kinds of information.
        </p>
      </div>
    </div>
  );
} 