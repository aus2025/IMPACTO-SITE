'use client';

import React, { useState } from 'react';
import { 
  Trash2, 
  Copy, 
  Plus, 
  Minus, 
  ArrowUp, 
  ArrowDown,
  X,
  Info 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { FormQuestion, FormSection, ConditionalOperator } from '../FormBuilder';

interface QuestionSettingsProps {
  question: FormQuestion;
  sections: FormSection[];
  onUpdate: (updates: Partial<FormQuestion>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const QuestionSettings: React.FC<QuestionSettingsProps> = ({
  question,
  sections,
  onUpdate,
  onDelete,
  onDuplicate
}) => {
  const [activeTab, setActiveTab] = useState<string>('basic');

  // Helper function to update options
  const updateOption = (index: number, field: 'label' | 'value', value: string) => {
    if (!question.options) return;
    
    const newOptions = [...question.options];
    newOptions[index] = { 
      ...newOptions[index], 
      [field]: value 
    };
    
    onUpdate({ options: newOptions });
  };

  // Add a new option
  const addOption = () => {
    const newOptions = [
      ...(question.options || []),
      { label: `Option ${(question.options?.length || 0) + 1}`, value: `option${(question.options?.length || 0) + 1}` }
    ];
    
    onUpdate({ options: newOptions });
  };

  // Remove an option
  const removeOption = (index: number) => {
    if (!question.options) return;
    
    const newOptions = [...question.options];
    newOptions.splice(index, 1);
    
    onUpdate({ options: newOptions });
  };

  // Move option up
  const moveOptionUp = (index: number) => {
    if (!question.options || index === 0) return;
    
    const newOptions = [...question.options];
    [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
    
    onUpdate({ options: newOptions });
  };

  // Move option down
  const moveOptionDown = (index: number) => {
    if (!question.options || index === question.options.length - 1) return;
    
    const newOptions = [...question.options];
    [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
    
    onUpdate({ options: newOptions });
  };

  // Add conditional logic
  const addConditionalLogic = () => {
    onUpdate({
      conditionalLogic: {
        logicType: 'show',
        conditions: [{
          questionId: '',
          operator: 'equals',
          value: ''
        }],
        conditionRelation: 'AND'
      }
    });
  };

  // Remove conditional logic
  const removeConditionalLogic = () => {
    onUpdate({ conditionalLogic: undefined });
  };

  // Update conditional logic type
  const updateLogicType = (logicType: 'show' | 'hide') => {
    if (!question.conditionalLogic) return;
    
    onUpdate({
      conditionalLogic: {
        ...question.conditionalLogic,
        logicType
      }
    });
  };

  // Update condition relation
  const updateConditionRelation = (relation: 'AND' | 'OR') => {
    if (!question.conditionalLogic) return;
    
    onUpdate({
      conditionalLogic: {
        ...question.conditionalLogic,
        conditionRelation: relation
      }
    });
  };

  // Update a condition
  const updateCondition = (index: number, field: keyof typeof question.conditionalLogic.conditions[0], value: string) => {
    if (!question.conditionalLogic) return;
    
    const newConditions = [...question.conditionalLogic.conditions];
    newConditions[index] = { 
      ...newConditions[index], 
      [field]: field === 'questionId' ? value : 
               field === 'operator' ? value as ConditionalOperator : 
               value
    };
    
    onUpdate({
      conditionalLogic: {
        ...question.conditionalLogic,
        conditions: newConditions
      }
    });
  };

  // Add a condition
  const addCondition = () => {
    if (!question.conditionalLogic) return;
    
    onUpdate({
      conditionalLogic: {
        ...question.conditionalLogic,
        conditions: [
          ...question.conditionalLogic.conditions,
          {
            questionId: '',
            operator: 'equals',
            value: ''
          }
        ]
      }
    });
  };

  // Remove a condition
  const removeCondition = (index: number) => {
    if (!question.conditionalLogic) return;
    
    const newConditions = [...question.conditionalLogic.conditions];
    newConditions.splice(index, 1);
    
    onUpdate({
      conditionalLogic: {
        ...question.conditionalLogic,
        conditions: newConditions
      }
    });
  };

  // Add scoring rules
  const addScoring = () => {
    onUpdate({
      scoring: {
        scoreType: 'value',
        defaultScore: 0
      }
    });
  };

  // Remove scoring
  const removeScoring = () => {
    onUpdate({ scoring: undefined });
  };

  // Update score type
  const updateScoreType = (scoreType: 'value' | 'options') => {
    if (!question.scoring) return;
    
    let updatedScoring = {
      ...question.scoring,
      scoreType
    };
    
    if (scoreType === 'options' && !question.scoring.optionScores && question.options) {
      const optionScores: Record<string, number> = {};
      question.options.forEach(opt => {
        optionScores[opt.value] = 0;
      });
      updatedScoring.optionScores = optionScores;
    }
    
    onUpdate({ scoring: updatedScoring });
  };

  // Update default score
  const updateDefaultScore = (score: number) => {
    if (!question.scoring) return;
    
    onUpdate({
      scoring: {
        ...question.scoring,
        defaultScore: score
      }
    });
  };

  // Update option score
  const updateOptionScore = (optionValue: string, score: number) => {
    if (!question.scoring || !question.scoring.optionScores) return;
    
    onUpdate({
      scoring: {
        ...question.scoring,
        optionScores: {
          ...question.scoring.optionScores,
          [optionValue]: score
        }
      }
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Question Settings</h3>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onDuplicate}
            className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
          >
            <Copy size={16} className="mr-1" />
            Duplicate
          </Button>
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
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="options" disabled={!['select', 'multiselect', 'radio', 'checkbox'].includes(question.type)}>
            Options
          </TabsTrigger>
          <TabsTrigger value="logic">Logic</TabsTrigger>
          <TabsTrigger value="scoring">Scoring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4 pt-4">
          <div>
            <Label htmlFor="question-label">Question Label</Label>
            <Input
              id="question-label"
              value={question.label}
              onChange={(e) => onUpdate({ label: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="question-placeholder">Placeholder Text</Label>
            <Input
              id="question-placeholder"
              value={question.placeholder || ''}
              onChange={(e) => onUpdate({ placeholder: e.target.value })}
              className="mt-1"
              placeholder="Enter placeholder text..."
            />
          </div>

          <div>
            <Label htmlFor="question-help">Help Text</Label>
            <Textarea
              id="question-help"
              value={question.helpText || ''}
              onChange={(e) => onUpdate({ helpText: e.target.value })}
              className="mt-1"
              placeholder="Add additional instructions or context..."
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="question-required"
              checked={question.required}
              onCheckedChange={(checked) => onUpdate({ required: checked })}
            />
            <Label htmlFor="question-required">Required</Label>
          </div>
        </TabsContent>
        
        <TabsContent value="options" className="space-y-4 pt-4">
          {['select', 'multiselect', 'radio', 'checkbox'].includes(question.type) && (
            <>
              <div className="space-y-2">
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-grow flex gap-2">
                      <Input
                        value={option.label}
                        onChange={(e) => updateOption(index, 'label', e.target.value)}
                        placeholder="Option label"
                        className="flex-grow"
                      />
                      <Input
                        value={option.value}
                        onChange={(e) => updateOption(index, 'value', e.target.value)}
                        placeholder="Value"
                        className="w-24"
                      />
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveOptionUp(index)}
                        disabled={index === 0}
                        className="h-8 w-8"
                      >
                        <ArrowUp size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveOptionDown(index)}
                        disabled={index === (question.options?.length || 0) - 1}
                        className="h-8 w-8"
                      >
                        <ArrowDown size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={addOption}
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                Add Option
              </Button>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="logic" className="space-y-4 pt-4">
          {!question.conditionalLogic ? (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">No conditional logic applied to this question.</p>
              <Button variant="outline" onClick={addConditionalLogic}>
                <Plus size={16} className="mr-1" />
                Add Conditional Logic
              </Button>
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-4">
                <div className="flex-1">
                  <Label>Logic Type</Label>
                  <Select
                    value={question.conditionalLogic.logicType}
                    onValueChange={(value) => updateLogicType(value as 'show' | 'hide')}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="show">Show this question if</SelectItem>
                      <SelectItem value="hide">Hide this question if</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <Label>Condition Relation</Label>
                  <Select
                    value={question.conditionalLogic.conditionRelation}
                    onValueChange={(value) => updateConditionRelation(value as 'AND' | 'OR')}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AND">All conditions match (AND)</SelectItem>
                      <SelectItem value="OR">Any condition matches (OR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                {question.conditionalLogic.conditions.map((condition, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex gap-2 items-center mb-2">
                      <h4 className="text-sm font-medium">Condition {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCondition(index)}
                        className="ml-auto h-6 w-6 text-red-500"
                        disabled={question.conditionalLogic?.conditions.length === 1}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs">When Question</Label>
                        <Select
                          value={condition.questionId}
                          onValueChange={(value) => updateCondition(index, 'questionId', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a question" />
                          </SelectTrigger>
                          <SelectContent>
                            {sections.flatMap(section => section.questions)
                              .filter(q => q.id !== question.id && q.order < question.order)
                              .map(q => (
                                <SelectItem key={q.id} value={q.id}>
                                  {q.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-xs">Operator</Label>
                        <Select
                          value={condition.operator}
                          onValueChange={(value) => updateCondition(index, 'operator', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="not_equals">Does not equal</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="not_contains">Does not contain</SelectItem>
                            <SelectItem value="greater_than">Is greater than</SelectItem>
                            <SelectItem value="less_than">Is less than</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-xs">Value</Label>
                        <Input
                          value={condition.value as string}
                          onChange={(e) => updateCondition(index, 'value', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addCondition}
                  className="flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add Condition
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeConditionalLogic}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 ml-auto"
                >
                  Remove Logic
                </Button>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="scoring" className="space-y-4 pt-4">
          {!question.scoring ? (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">No scoring defined for this question.</p>
              <Button variant="outline" onClick={addScoring}>
                <Plus size={16} className="mr-1" />
                Add Scoring
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Label>Scoring Method</Label>
                <Select
                  value={question.scoring.scoreType}
                  onValueChange={(value) => updateScoreType(value as 'value' | 'options')}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="value">Single Value</SelectItem>
                    <SelectItem value="options" disabled={!question.options?.length}>Per Option</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {question.scoring.scoreType === 'value' ? (
                <div>
                  <Label>Default Score</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateDefaultScore(Math.max(0, (question.scoring?.defaultScore || 0) - 1))}
                      disabled={(question.scoring?.defaultScore || 0) <= 0}
                      className="h-8 w-8"
                    >
                      <Minus size={16} />
                    </Button>
                    <Input
                      type="number"
                      value={question.scoring.defaultScore}
                      onChange={(e) => updateDefaultScore(parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateDefaultScore((question.scoring?.defaultScore || 0) + 1)}
                      className="h-8 w-8"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                question.options && (
                  <div className="space-y-2 mt-2">
                    <Label>Option Scores</Label>
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center gap-2">
                        <span className="text-sm w-1/2">{option.label}</span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateOptionScore(
                              option.value, 
                              Math.max(0, ((question.scoring?.optionScores || {})[option.value] || 0) - 1)
                            )}
                            disabled={((question.scoring?.optionScores || {})[option.value] || 0) <= 0}
                            className="h-7 w-7"
                          >
                            <Minus size={14} />
                          </Button>
                          <Input
                            type="number"
                            value={(question.scoring?.optionScores || {})[option.value] || 0}
                            onChange={(e) => updateOptionScore(option.value, parseInt(e.target.value) || 0)}
                            className="w-16 text-center h-8"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateOptionScore(
                              option.value, 
                              ((question.scoring?.optionScores || {})[option.value] || 0) + 1
                            )}
                            className="h-7 w-7"
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={removeScoring}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 mt-2"
              >
                Remove Scoring
              </Button>
              
              <Card className="p-3 bg-yellow-50 border-yellow-200 mt-2">
                <div className="flex gap-2">
                  <Info size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-700">
                    Scores will be calculated based on user responses and can be used for assessment results or conditional logic in form flow.
                  </p>
                </div>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestionSettings; 