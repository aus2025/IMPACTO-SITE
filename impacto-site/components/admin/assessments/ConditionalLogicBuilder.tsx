'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Type definitions
type QuestionType = 'text' | 'select' | 'multiselect' | 'boolean';

interface Question {
  id: string;
  label: string;
  type: QuestionType;
  options?: string[]; // For select and multiselect questions
}

// Operator types based on question type
const operatorsByType: Record<QuestionType, string[]> = {
  text: ['equals', 'contains', 'starts with', 'ends with', 'is empty', 'is not empty'],
  select: ['equals', 'not equals', 'is empty', 'is not empty'],
  multiselect: ['contains', 'does not contain', 'contains any', 'contains all', 'is empty', 'is not empty'],
  boolean: ['is true', 'is false']
};

// Numeric operators for fields that might contain numbers
const numericOperators = ['equals', 'not equals', 'greater than', 'less than', 'greater than or equal to', 'less than or equal to'];

// Action types
type ActionType = 'show' | 'hide';

// Condition structure
interface Condition {
  id: string;
  questionId: string;
  operator: string;
  value: string | string[] | boolean;
}

// Rule structure
interface Rule {
  id: string;
  conditions: Condition[];
  operator: 'AND' | 'OR';
  action: ActionType;
  targetQuestionId: string;
}

// Main component props
interface ConditionalLogicBuilderProps {
  questions: Question[];
  initialRules?: Rule[];
  onChange: (rules: Rule[]) => void;
}

export default function ConditionalLogicBuilder({
  questions,
  initialRules = [],
  onChange
}: ConditionalLogicBuilderProps) {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewResults, setPreviewResults] = useState<Record<string, boolean>>({});
  const [previewData, setPreviewData] = useState<Record<string, string | number | boolean | null>>({});

  // When rules change, notify parent
  useEffect(() => {
    onChange(rules);
  }, [rules, onChange]);

  // Create a new empty rule
  const addRule = () => {
    const newRule: Rule = {
      id: `rule-${Date.now()}`,
      conditions: [{
        id: `condition-${Date.now()}`,
        questionId: questions[0]?.id || '',
        operator: getDefaultOperator(questions[0]?.type || 'text'),
        value: ''
      }],
      operator: 'AND',
      action: 'show',
      targetQuestionId: ''
    };
    
    setRules([...rules, newRule]);
  };

  // Get default operator based on question type
  const getDefaultOperator = (type: QuestionType): string => {
    return operatorsByType[type][0] || 'equals';
  };

  // Remove a rule
  const removeRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  // Add a condition to a rule
  const addCondition = (ruleId: string) => {
    setRules(rules.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          conditions: [...rule.conditions, {
            id: `condition-${Date.now()}`,
            questionId: questions[0]?.id || '',
            operator: getDefaultOperator(questions[0]?.type || 'text'),
            value: ''
          }]
        };
      }
      return rule;
    }));
  };

  // Remove a condition
  const removeCondition = (ruleId: string, conditionId: string) => {
    setRules(rules.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          conditions: rule.conditions.filter(condition => condition.id !== conditionId)
        };
      }
      return rule;
    }));
  };

  // Update rule's logical operator (AND/OR)
  const updateRuleOperator = (ruleId: string, operator: 'AND' | 'OR') => {
    setRules(rules.map(rule => {
      if (rule.id === ruleId) {
        return { ...rule, operator };
      }
      return rule;
    }));
  };

  // Update rule's action (show/hide)
  const updateRuleAction = (ruleId: string, action: ActionType) => {
    setRules(rules.map(rule => {
      if (rule.id === ruleId) {
        return { ...rule, action };
      }
      return rule;
    }));
  };

  // Update rule's target question
  const updateRuleTargetQuestion = (ruleId: string, targetQuestionId: string) => {
    setRules(rules.map(rule => {
      if (rule.id === ruleId) {
        return { ...rule, targetQuestionId };
      }
      return rule;
    }));
  };

  // Update condition's question
  const updateConditionQuestion = (ruleId: string, conditionId: string, questionId: string) => {
    const questionType = questions.find(q => q.id === questionId)?.type || 'text';
    
    setRules(rules.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          conditions: rule.conditions.map(condition => {
            if (condition.id === conditionId) {
              return {
                ...condition,
                questionId,
                operator: getDefaultOperator(questionType),
                value: questionType === 'multiselect' ? [] : questionType === 'boolean' ? false : ''
              };
            }
            return condition;
          })
        };
      }
      return rule;
    }));
  };

  // Update condition's operator
  const updateConditionOperator = (ruleId: string, conditionId: string, operator: string) => {
    setRules(rules.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          conditions: rule.conditions.map(condition => {
            if (condition.id === conditionId) {
              return { ...condition, operator };
            }
            return condition;
          })
        };
      }
      return rule;
    }));
  };

  // Update condition's value
  const updateConditionValue = (ruleId: string, conditionId: string, value: string | string[] | boolean) => {
    setRules(rules.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          conditions: rule.conditions.map(condition => {
            if (condition.id === conditionId) {
              return { ...condition, value };
            }
            return condition;
          })
        };
      }
      return rule;
    }));
  };

  // Helper to get question by ID
  const getQuestionById = (id: string): Question | undefined => {
    return questions.find(q => q.id === id);
  };

  // Evaluate a single condition against preview data
  const evaluateCondition = (condition: Condition, data: Record<string, string | number | boolean | null>): boolean => {
    const question = getQuestionById(condition.questionId);
    if (!question) return false;
    
    const value = data[condition.questionId];
    
    switch (condition.operator) {
      case 'equals':
        return value === condition.value;
      case 'not equals':
        return value !== condition.value;
      case 'contains':
        if (typeof value === 'string') {
          return value.includes(condition.value as string);
        }
        if (Array.isArray(value)) {
          return Array.isArray(condition.value) 
            ? condition.value.some(v => value.includes(v)) 
            : value.includes(condition.value as string);
        }
        return false;
      case 'does not contain':
        if (typeof value === 'string') {
          return !value.includes(condition.value as string);
        }
        if (Array.isArray(value)) {
          return Array.isArray(condition.value) 
            ? !condition.value.some(v => value.includes(v)) 
            : !value.includes(condition.value as string);
        }
        return false;
      case 'contains all':
        if (Array.isArray(value) && Array.isArray(condition.value)) {
          return condition.value.every(v => value.includes(v));
        }
        return false;
      case 'contains any':
        if (Array.isArray(value) && Array.isArray(condition.value)) {
          return condition.value.some(v => value.includes(v));
        }
        return false;
      case 'starts with':
        return typeof value === 'string' && value.startsWith(condition.value as string);
      case 'ends with':
        return typeof value === 'string' && value.endsWith(condition.value as string);
      case 'is empty':
        return value === '' || value === undefined || value === null || (Array.isArray(value) && value.length === 0);
      case 'is not empty':
        return !(value === '' || value === undefined || value === null || (Array.isArray(value) && value.length === 0));
      case 'greater than':
        return typeof value === 'number' && value > Number(condition.value);
      case 'less than':
        return typeof value === 'number' && value < Number(condition.value);
      case 'greater than or equal to':
        return typeof value === 'number' && value >= Number(condition.value);
      case 'less than or equal to':
        return typeof value === 'number' && value <= Number(condition.value);
      case 'is true':
        return value === true;
      case 'is false':
        return value === false;
      default:
        return false;
    }
  };

  // Evaluate a rule against preview data
  const evaluateRule = (rule: Rule, data: Record<string, string | number | boolean | null>): boolean => {
    if (rule.conditions.length === 0) return false;
    
    if (rule.operator === 'AND') {
      return rule.conditions.every(condition => evaluateCondition(condition, data));
    } else {
      return rule.conditions.some(condition => evaluateCondition(condition, data));
    }
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    if (!previewMode) {
      // Initialize preview data with default values
      const initialData: Record<string, string | number | boolean | null> = {};
      questions.forEach(question => {
        switch (question.type) {
          case 'boolean':
            initialData[question.id] = false;
            break;
          case 'multiselect':
            initialData[question.id] = [];
            break;
          default:
            initialData[question.id] = '';
        }
      });
      setPreviewData(initialData);
      
      // Evaluate rules with initial data
      updatePreviewResults(initialData);
    }
    
    setPreviewMode(!previewMode);
  };

  // Update preview results based on current data
  const updatePreviewResults = (data: Record<string, string | number | boolean | null>) => {
    const results: Record<string, boolean> = {};
    
    rules.forEach(rule => {
      if (rule.targetQuestionId) {
        const ruleResult = evaluateRule(rule, data);
        results[rule.targetQuestionId] = rule.action === 'show' ? ruleResult : !ruleResult;
      }
    });
    
    setPreviewResults(results);
  };

  // Update preview data when user changes a value
  const updatePreviewData = (questionId: string, value: string | number | boolean | null) => {
    const newData = { ...previewData, [questionId]: value };
    setPreviewData(newData);
    updatePreviewResults(newData);
  };

  // Render value input based on question type
  const renderValueInput = (ruleId: string, condition: Condition) => {
    const question = getQuestionById(condition.questionId);
    if (!question) return null;
    
    // For certain operators, we don't need a value input
    if (['is empty', 'is not empty', 'is true', 'is false'].includes(condition.operator)) {
      return null;
    }
    
    switch (question.type) {
      case 'select':
        return (
          <select
            className="border rounded p-2 w-full"
            value={condition.value as string}
            onChange={(e) => updateConditionValue(ruleId, condition.id, e.target.value)}
          >
            <option value="">Select a value</option>
            {question.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'multiselect':
        return (
          <div className="border rounded p-2 w-full">
            {question.options?.map(option => (
              <div key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`${condition.id}-${option}`}
                  checked={Array.isArray(condition.value) && condition.value.includes(option)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(condition.value) ? [...condition.value] : [];
                    if (e.target.checked) {
                      updateConditionValue(ruleId, condition.id, [...currentValues, option]);
                    } else {
                      updateConditionValue(
                        ruleId, 
                        condition.id, 
                        currentValues.filter(v => v !== option)
                      );
                    }
                  }}
                />
                <label htmlFor={`${condition.id}-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'boolean':
        return (
          <select
            className="border rounded p-2 w-full"
            value={String(condition.value)}
            onChange={(e) => updateConditionValue(ruleId, condition.id, e.target.value === 'true')}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );
      default:
        return (
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={condition.value as string}
            onChange={(e) => updateConditionValue(ruleId, condition.id, e.target.value)}
            placeholder="Enter value"
          />
        );
    }
  };

  // Render the preview section
  const renderPreview = () => {
    if (!previewMode) return null;
    
    return (
      <div className="bg-gray-50 p-4 rounded-lg mt-6 border">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        <div className="space-y-4">
          {questions.map(question => {
            const isVisible = previewResults[question.id] !== false;
            
            return (
              <div 
                key={question.id} 
                className={`p-3 border rounded transition-all ${isVisible ? 'bg-white' : 'bg-gray-200 opacity-50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium">{question.label}</label>
                  <div className="text-sm">
                    {isVisible ? 
                      <span className="text-green-600">Visible</span> : 
                      <span className="text-red-600">Hidden</span>
                    }
                  </div>
                </div>
                
                {renderPreviewInput(question)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render the appropriate input for the preview based on question type
  const renderPreviewInput = (question: Question) => {
    switch (question.type) {
      case 'select':
        return (
          <select
            className="border rounded p-2 w-full"
            value={previewData[question.id] || ''}
            onChange={(e) => updatePreviewData(question.id, e.target.value)}
          >
            <option value="">Select an option</option>
            {question.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'multiselect':
        return (
          <div className="border rounded p-2 w-full">
            {question.options?.map(option => (
              <div key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`preview-${question.id}-${option}`}
                  checked={(previewData[question.id] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = [...(previewData[question.id] || [])];
                    if (e.target.checked) {
                      updatePreviewData(question.id, [...currentValues, option]);
                    } else {
                      updatePreviewData(
                        question.id, 
                        currentValues.filter(v => v !== option)
                      );
                    }
                  }}
                />
                <label htmlFor={`preview-${question.id}-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={previewData[question.id] || false}
            onChange={(e) => updatePreviewData(question.id, e.target.checked)}
          />
        );
      default:
        return (
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={previewData[question.id] || ''}
            onChange={(e) => updatePreviewData(question.id, e.target.value)}
            placeholder="Enter value"
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Conditional Logic Rules</h2>
        <div className="space-x-2">
          <button
            type="button"
            onClick={togglePreviewMode}
            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center gap-1"
          >
            <ArrowPathIcon className="w-4 h-4" />
            {previewMode ? 'Exit Preview' : 'Preview Rules'}
          </button>
          <button
            type="button"
            onClick={addRule}
            className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
          >
            <PlusIcon className="w-4 h-4" />
            Add Rule
          </button>
        </div>
      </div>
      
      {rules.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded border border-dashed">
          <p className="text-gray-500">No logic rules created yet. Click "Add Rule" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {rules.map((rule, ruleIndex) => (
            <div key={rule.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">Rule {ruleIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeRule(rule.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Conditions */}
                <div className="space-y-2">
                  <label className="font-medium">IF</label>
                  
                  {rule.conditions.map((condition, condIndex) => (
                    <div key={condition.id} className="pl-4 border-l-2 border-blue-200">
                      {condIndex > 0 && (
                        <div className="mb-2 ml-2">
                          <select
                            className="border-none bg-blue-50 text-blue-700 p-1 text-sm rounded"
                            value={rule.operator}
                            onChange={(e) => updateRuleOperator(rule.id, e.target.value as 'AND' | 'OR')}
                          >
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                          </select>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 items-center mb-3">
                        <select
                          className="border rounded p-2"
                          value={condition.questionId}
                          onChange={(e) => updateConditionQuestion(rule.id, condition.id, e.target.value)}
                        >
                          <option value="">Select Question</option>
                          {questions.map(q => (
                            <option key={q.id} value={q.id}>{q.label}</option>
                          ))}
                        </select>
                        
                        <select
                          className="border rounded p-2"
                          value={condition.operator}
                          onChange={(e) => updateConditionOperator(rule.id, condition.id, e.target.value)}
                          disabled={!condition.questionId}
                        >
                          {condition.questionId && getQuestionById(condition.questionId)?.type && (
                            operatorsByType[getQuestionById(condition.questionId)!.type].map(op => (
                              <option key={op} value={op}>{op}</option>
                            ))
                          )}
                        </select>
                        
                        {renderValueInput(rule.id, condition)}
                        
                        {rule.conditions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCondition(rule.id, condition.id)}
                            className="p-1 text-red-600 hover:text-red-800 rounded"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addCondition(rule.id)}
                    className="ml-4 px-2 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 flex items-center gap-1"
                  >
                    <PlusIcon className="w-3 h-3" />
                    Add Condition
                  </button>
                </div>
                
                {/* Actions */}
                <div className="pt-4 border-t">
                  <label className="font-medium">THEN</label>
                  <div className="mt-2 flex flex-wrap gap-3 items-center">
                    <select
                      className="border rounded p-2"
                      value={rule.action}
                      onChange={(e) => updateRuleAction(rule.id, e.target.value as ActionType)}
                    >
                      <option value="show">Show</option>
                      <option value="hide">Hide</option>
                    </select>
                    
                    <select
                      className="border rounded p-2 flex-grow"
                      value={rule.targetQuestionId}
                      onChange={(e) => updateRuleTargetQuestion(rule.id, e.target.value)}
                    >
                      <option value="">Select Target Question</option>
                      {questions.map(q => (
                        <option key={q.id} value={q.id}>{q.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {renderPreview()}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Rules are evaluated in order. If multiple rules target the same question, the last matching rule takes precedence.</p>
      </div>
    </div>
  );
} 