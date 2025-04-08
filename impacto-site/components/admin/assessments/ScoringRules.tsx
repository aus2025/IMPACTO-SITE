'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, RefreshCw, Save } from 'lucide-react';

// Types
export type ScoreCategory = {
  id: string;
  name: string;
  description: string;
  weight: number;
};

export type AnswerScoreRule = {
  id: string;
  field: string;
  condition: string;
  value: string;
  categoryId: string;
  points: number;
};

export type ScoreThreshold = {
  id: string;
  categoryId: string;
  minScore: number;
  maxScore: number;
  label: string;
  color: string;
};

export type RecommendedAction = {
  id: string;
  categoryId: string;
  thresholdId: string;
  action: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
};

export type SampleAnswer = {
  field: string;
  value: string | string[];
};

const fieldOptions = [
  { label: 'Industry', value: 'industry' },
  { label: 'Employees', value: 'employees' },
  { label: 'Business Goals', value: 'goals' },
  { label: 'Compliance Concerns', value: 'compliance_concerns' },
  { label: 'Automation Areas', value: 'automation_areas' },
  { label: 'Automation Experience', value: 'automation_experience' },
  { label: 'Existing Systems', value: 'existing_systems' },
  { label: 'Document Types', value: 'document_types' },
  { label: 'Customer Service Channels', value: 'cs_channels' },
  { label: 'Integration Complexity', value: 'integration_complexity' },
  { label: 'Budget Range', value: 'budget_range' },
  { label: 'Decision Timeline', value: 'decision_timeline' },
  { label: 'Investment Factors', value: 'investment_factors' },
];

// Default values for new items
const defaultCategory: ScoreCategory = {
  id: '',
  name: '',
  description: '',
  weight: 1,
};

const defaultRule: AnswerScoreRule = {
  id: '',
  field: '',
  condition: 'equals',
  value: '',
  categoryId: '',
  points: 0,
};

const defaultThreshold: ScoreThreshold = {
  id: '',
  categoryId: '',
  minScore: 0,
  maxScore: 0,
  label: '',
  color: '#3b82f6',
};

const defaultAction: RecommendedAction = {
  id: '',
  categoryId: '',
  thresholdId: '',
  action: '',
  description: '',
  priority: 'medium',
};

export default function ScoringRules() {
  // State management
  const [activeTab, setActiveTab] = useState('categories');
  
  // Sample data (would come from database in real implementation)
  const [categories, setCategories] = useState<ScoreCategory[]>([
    {
      id: 'tech_readiness',
      name: 'Technical Readiness',
      description: 'How prepared the organization is from a technical infrastructure perspective',
      weight: 1.0,
    },
    {
      id: 'process_docs',
      name: 'Process Documentation',
      description: 'Level of documentation and clarity in existing business processes',
      weight: 0.8,
    },
    {
      id: 'budget_alignment',
      name: 'Budget Alignment',
      description: 'Alignment between budget expectations and automation requirements',
      weight: 1.2,
    },
    {
      id: 'team_preparedness',
      name: 'Team Preparedness',
      description: 'How ready the team is to adopt new automation systems',
      weight: 1.0,
    },
    {
      id: 'integration_complexity',
      name: 'Integration Complexity',
      description: 'Complexity of integration with existing systems',
      weight: 0.9,
    },
  ]);
  
  const [rules, setRules] = useState<AnswerScoreRule[]>([]);
  const [thresholds, setThresholds] = useState<ScoreThreshold[]>([]);
  const [actions, setActions] = useState<RecommendedAction[]>([]);
  
  const [sampleAnswers, setSampleAnswers] = useState<SampleAnswer[]>([]);
  const [calculatedScores, setCalculatedScores] = useState<{[key: string]: number}>({});
  
  // Editing states
  const [editingCategory, setEditingCategory] = useState<ScoreCategory | null>(null);
  const [editingRule, setEditingRule] = useState<AnswerScoreRule | null>(null);
  const [editingThreshold, setEditingThreshold] = useState<ScoreThreshold | null>(null);
  const [editingAction, setEditingAction] = useState<RecommendedAction | null>(null);
  
  // Sample data initialization
  useEffect(() => {
    // Initialize some sample rules
    setRules([
      {
        id: 'rule1',
        field: 'automation_experience',
        condition: 'equals',
        value: 'Advanced',
        categoryId: 'tech_readiness',
        points: 10,
      },
      {
        id: 'rule2',
        field: 'automation_experience',
        condition: 'equals',
        value: 'Intermediate',
        categoryId: 'tech_readiness',
        points: 5,
      },
      {
        id: 'rule3',
        field: 'automation_experience',
        condition: 'equals',
        value: 'Beginner',
        categoryId: 'tech_readiness',
        points: 2,
      },
      {
        id: 'rule4',
        field: 'existing_systems',
        condition: 'contains',
        value: 'CRM',
        categoryId: 'integration_complexity',
        points: 5,
      },
      {
        id: 'rule5',
        field: 'budget_range',
        condition: 'equals',
        value: '$100,000+',
        categoryId: 'budget_alignment',
        points: 10,
      },
      {
        id: 'rule6',
        field: 'integration_complexity',
        condition: 'equals',
        value: 'High',
        categoryId: 'integration_complexity',
        points: -5,
      },
    ]);
    
    // Initialize some sample thresholds
    setThresholds([
      {
        id: 'threshold1',
        categoryId: 'tech_readiness',
        minScore: 0,
        maxScore: 30,
        label: 'Not Ready',
        color: '#ef4444',
      },
      {
        id: 'threshold2',
        categoryId: 'tech_readiness',
        minScore: 31,
        maxScore: 70,
        label: 'Partially Ready',
        color: '#f59e0b',
      },
      {
        id: 'threshold3',
        categoryId: 'tech_readiness',
        minScore: 71,
        maxScore: 100,
        label: 'Fully Ready',
        color: '#10b981',
      },
    ]);
    
    // Initialize some sample actions
    setActions([
      {
        id: 'action1',
        categoryId: 'tech_readiness',
        thresholdId: 'threshold1',
        action: 'Technical Infrastructure Assessment',
        description: 'Conduct a thorough assessment of the current technical infrastructure to identify gaps.',
        priority: 'high',
      },
      {
        id: 'action2',
        categoryId: 'process_docs',
        thresholdId: 'threshold1',
        action: 'Process Documentation Workshop',
        description: 'Facilitate workshops to document current processes and identify automation opportunities.',
        priority: 'medium',
      },
    ]);
    
    // Initialize sample answers for testing
    setSampleAnswers([
      { field: 'automation_experience', value: 'Intermediate' },
      { field: 'existing_systems', value: ['CRM', 'ERP'] },
      { field: 'budget_range', value: '$50,000-$100,000' },
      { field: 'integration_complexity', value: 'Medium' },
    ]);
  }, []);
  
  // Calculate scores based on rules and sample answers
  const calculateScores = useCallback(() => {
    // Initialize scores for each category
    const scores: {[key: string]: number} = {};
    categories.forEach(category => {
      scores[category.id] = 0;
    });
    
    // Apply scoring rules based on sample answers
    rules.forEach(rule => {
      sampleAnswers.forEach(answer => {
        if (answer.field === rule.field) {
          let match = false;
          
          if (Array.isArray(answer.value)) {
            // For array values (multi-select)
            if (rule.condition === 'contains' && answer.value.includes(rule.value)) {
              match = true;
            } else if (rule.condition === 'equals' && JSON.stringify(answer.value) === JSON.stringify([rule.value])) {
              match = true;
            }
          } else {
            // For string values
            if (rule.condition === 'equals' && answer.value === rule.value) {
              match = true;
            } else if (rule.condition === 'contains' && answer.value.includes(rule.value)) {
              match = true;
            } else if (rule.condition === 'greater_than') {
              const numericValue = parseInt(answer.value as string);
              const ruleValue = parseInt(rule.value);
              if (!isNaN(numericValue) && !isNaN(ruleValue) && numericValue > ruleValue) {
                match = true;
              }
            } else if (rule.condition === 'less_than') {
              const numericValue = parseInt(answer.value as string);
              const ruleValue = parseInt(rule.value);
              if (!isNaN(numericValue) && !isNaN(ruleValue) && numericValue < ruleValue) {
                match = true;
              }
            }
          }
          
          if (match) {
            scores[rule.categoryId] += rule.points;
          }
        }
      });
    });
    
    // Apply category weights
    categories.forEach(category => {
      scores[category.id] = Math.round(scores[category.id] * category.weight);
      // Enforce min/max limits
      scores[category.id] = Math.max(0, Math.min(100, scores[category.id]));
    });
    
    setCalculatedScores(scores);
  }, [categories, rules, sampleAnswers]);
  
  // Calculate scores on initial load or when dependencies change
  useEffect(() => {
    calculateScores();
  }, [calculateScores]);
  
  // Get threshold label for a score
  const getThresholdLabel = (categoryId: string, score: number): ScoreThreshold | null => {
    const categoryThresholds = thresholds.filter(t => t.categoryId === categoryId);
    
    for (const threshold of categoryThresholds) {
      if (score >= threshold.minScore && score <= threshold.maxScore) {
        return threshold;
      }
    }
    
    return null;
  };
  
  // Get recommended actions for a category and score
  const getRecommendedActions = (categoryId: string, score: number): RecommendedAction[] => {
    const threshold = getThresholdLabel(categoryId, score);
    if (!threshold) return [];
    
    return actions.filter(a => a.categoryId === categoryId && a.thresholdId === threshold.id);
  };
  
  // Handle sample answer change
  const handleSampleAnswerChange = (index: number, field: string, value: string | string[]) => {
    const newSampleAnswers = [...sampleAnswers];
    
    // If the field already exists, update it
    const existingIndex = newSampleAnswers.findIndex(a => a.field === field);
    if (existingIndex >= 0) {
      newSampleAnswers[existingIndex] = { field, value };
    } else {
      // Otherwise add a new entry
      newSampleAnswers.push({ field, value });
    }
    
    setSampleAnswers(newSampleAnswers);
  };
  
  // Add a new sample answer
  const addSampleAnswer = () => {
    setSampleAnswers([...sampleAnswers, { field: '', value: '' }]);
  };
  
  // Remove a sample answer
  const removeSampleAnswer = (index: number) => {
    const newSampleAnswers = [...sampleAnswers];
    newSampleAnswers.splice(index, 1);
    setSampleAnswers(newSampleAnswers);
  };
  
  // Export scoring rules configuration
  const exportConfiguration = () => {
    const configuration = {
      categories,
      rules,
      thresholds,
      actions
    };
    
    // Create a downloadable file
    const blob = new Blob([JSON.stringify(configuration, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessment-scoring-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Import scoring rules configuration
  const importConfiguration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const config = JSON.parse(result);
        
        if (config.categories && Array.isArray(config.categories)) {
          setCategories(config.categories);
        }
        if (config.rules && Array.isArray(config.rules)) {
          setRules(config.rules);
        }
        if (config.thresholds && Array.isArray(config.thresholds)) {
          setThresholds(config.thresholds);
        }
        if (config.actions && Array.isArray(config.actions)) {
          setActions(config.actions);
        }
        
        alert('Configuration imported successfully!');
      } catch (error) {
        alert('Error importing configuration: ' + (error as Error).message);
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };
  
  // Save configuration to database (would be implemented in a real app)
  const saveConfiguration = () => {
    // This would connect to your backend to save the configuration
    alert('Configuration saved successfully! (In a real implementation, this would save to the database)');
  };
  
  // Main component rendering
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Assessment Scoring Rules</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="rules">Scoring Rules</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          <TabsTrigger value="actions">Recommended Actions</TabsTrigger>
          <TabsTrigger value="preview">Score Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Scoring Categories</CardTitle>
              <CardDescription>
                Define categories for grouping assessment scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-medium text-lg">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.description}</p>
                      <div className="text-sm flex items-center mt-2">
                        <span className="mr-2">Weight:</span>
                        <span className="font-medium">{category.weight.toFixed(1)}×</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingCategory({...category})}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          if (confirm(`Delete category "${category.name}"?`)) {
                            setCategories(categories.filter(c => c.id !== category.id));
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {categories.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No categories defined yet. Add your first category to get started.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setEditingCategory({...defaultCategory, id: `cat_${Date.now()}`})}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Scoring Rules</CardTitle>
              <CardDescription>
                Assign point values to specific answer choices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {rules.map((rule) => {
                  const category = categories.find(c => c.id === rule.categoryId);
                  return (
                    <div key={rule.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {fieldOptions.find(f => f.value === rule.field)?.label || rule.field}
                          </h3>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">
                              {rule.condition === 'equals' ? 'Equals' : 
                               rule.condition === 'contains' ? 'Contains' : 
                               rule.condition === 'greater_than' ? 'Greater than' : 
                               rule.condition === 'less_than' ? 'Less than' : rule.condition}
                            </span>
                            <span className="mx-1">"</span>
                            <span>{rule.value}</span>
                            <span className="mx-1">"</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingRule({...rule})}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              if (confirm('Delete this scoring rule?')) {
                                setRules(rules.filter(r => r.id !== rule.id));
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <span>Category:</span>
                          <span className="font-medium ml-1">{category?.name || 'Unknown'}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full ${rule.points >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {rule.points >= 0 ? '+' : ''}{rule.points} points
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {rules.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No scoring rules defined yet. Add your first rule to get started.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setEditingRule({...defaultRule, id: `rule_${Date.now()}`})}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Rule
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="thresholds">
          <Card>
            <CardHeader>
              <CardTitle>Score Thresholds</CardTitle>
              <CardDescription>
                Define score ranges and their corresponding labels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {categories.map((category) => {
                  const categoryThresholds = thresholds.filter(t => t.categoryId === category.id);
                  
                  return (
                    <div key={category.id} className="border rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-3">{category.name}</h3>
                      
                      {categoryThresholds.length > 0 ? (
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm text-gray-500 px-2">
                            <span>Range</span>
                            <span>Label</span>
                          </div>
                          
                          {categoryThresholds.map((threshold) => (
                            <div key={threshold.id} className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <span className="text-sm font-medium w-16">{threshold.minScore}-{threshold.maxScore}</span>
                                  <div className="h-2 flex-1 bg-gray-200 rounded-full mx-2 overflow-hidden">
                                    <div 
                                      className="h-full rounded-full" 
                                      style={{ 
                                        width: `${threshold.maxScore}%`,
                                        backgroundColor: threshold.color 
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <div 
                                className="px-3 py-1 rounded-full text-white text-sm"
                                style={{ backgroundColor: threshold.color }}
                              >
                                {threshold.label}
                              </div>
                              
                              <div className="flex gap-2 ml-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingThreshold({...threshold})}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500"
                                  onClick={() => {
                                    if (confirm(`Delete "${threshold.label}" threshold?`)) {
                                      setThresholds(thresholds.filter(t => t.id !== threshold.id));
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500 text-sm py-2">
                          No thresholds defined for this category
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-3" 
                        onClick={() => setEditingThreshold({
                          ...defaultThreshold, 
                          id: `threshold_${Date.now()}`,
                          categoryId: category.id
                        })}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Threshold
                      </Button>
                    </div>
                  );
                })}
                
                {categories.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No categories defined yet. Please add categories first.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Green: High/Ready</span>
                <div className="w-4 h-4 rounded-full bg-yellow-500 ml-4"></div>
                <span>Yellow: Medium/Partial</span>
                <div className="w-4 h-4 rounded-full bg-red-500 ml-4"></div>
                <span>Red: Low/Not Ready</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="actions">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
              <CardDescription>
                Define recommended actions based on score ranges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {categories.map((category) => {
                  const categoryThresholds = thresholds.filter(t => t.categoryId === category.id);
                  const categoryActions = actions.filter(a => a.categoryId === category.id);
                  
                  return (
                    <div key={category.id} className="border rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-2">{category.name}</h3>
                      
                      {categoryThresholds.length > 0 ? (
                        <div className="space-y-4">
                          {categoryThresholds.map((threshold) => {
                            const thresholdActions = categoryActions.filter(a => a.thresholdId === threshold.id);
                            
                            return (
                              <div key={threshold.id} className="ml-4 mt-3">
                                <div className="flex items-center">
                                  <div 
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: threshold.color }}
                                  />
                                  <h4 className="font-medium">
                                    When {threshold.label} ({threshold.minScore}-{threshold.maxScore})
                                  </h4>
                                </div>
                                
                                {thresholdActions.length > 0 ? (
                                  <div className="ml-5 mt-2 space-y-3">
                                    {thresholdActions.map((action) => (
                                      <div key={action.id} className="border border-gray-200 rounded p-3">
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <div className="font-medium">{action.action}</div>
                                            <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                                          </div>
                                          <div className="flex gap-2">
                                            <Button 
                                              variant="ghost" 
                                              size="sm"
                                              onClick={() => setEditingAction({...action})}
                                            >
                                              Edit
                                            </Button>
                                            <Button 
                                              variant="ghost" 
                                              size="sm" 
                                              className="text-red-500"
                                              onClick={() => {
                                                if (confirm('Delete this action?')) {
                                                  setActions(actions.filter(a => a.id !== action.id));
                                                }
                                              }}
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </div>
                                        <div className="mt-2">
                                          <span 
                                            className={`text-xs px-2 py-1 rounded-full 
                                              ${action.priority === 'high' ? 'bg-red-100 text-red-800' : 
                                                action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-green-100 text-green-800'}`}
                                          >
                                            {action.priority.charAt(0).toUpperCase() + action.priority.slice(1)} Priority
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="ml-5 mt-2 text-sm text-gray-500">
                                    No actions defined for this threshold
                                  </div>
                                )}
                                
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="ml-5 mt-2" 
                                  onClick={() => setEditingAction({
                                    ...defaultAction, 
                                    id: `action_${Date.now()}`,
                                    categoryId: category.id,
                                    thresholdId: threshold.id
                                  })}
                                >
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  Add Action
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-gray-500 text-sm py-2">
                          No thresholds defined for this category. Please add thresholds first.
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {categories.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No categories defined yet. Please add categories first.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                Recommended actions will be shown based on the user's assessment scores.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Score Preview</CardTitle>
              <CardDescription>
                Preview calculated scores based on sample answers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Sample Answers</h3>
                  
                  {sampleAnswers.length > 0 ? (
                    <div className="space-y-3 mb-4">
                      {sampleAnswers.map((answer, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex-1">
                            <Select 
                              value={answer.field} 
                              onValueChange={(value) => handleSampleAnswerChange(index, value, '')}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                {fieldOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex-1">
                            <Input 
                              placeholder="Answer value"
                              value={Array.isArray(answer.value) ? answer.value.join(', ') : answer.value}
                              onChange={(e) => {
                                const value = e.target.value;
                                // If value contains commas, treat as array
                                if (value.includes(',')) {
                                  handleSampleAnswerChange(
                                    index, 
                                    answer.field, 
                                    value.split(',').map(v => v.trim()).filter(v => v)
                                  );
                                } else {
                                  handleSampleAnswerChange(index, answer.field, value);
                                }
                              }}
                            />
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => removeSampleAnswer(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No sample answers added yet
                    </div>
                  )}
                  
                  <Button variant="outline" size="sm" onClick={addSampleAnswer}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Sample Answer
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Calculated Scores</h3>
                  
                  {categories.length > 0 ? (
                    <div className="space-y-4">
                      {categories.map((category) => {
                        const score = calculatedScores[category.id] || 0;
                        const threshold = getThresholdLabel(category.id, score);
                        const actions = getRecommendedActions(category.id, score);
                        
                        return (
                          <div key={category.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-lg">{category.name}</h4>
                              <div className="flex items-center">
                                <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center mr-3"
                                  style={{ borderColor: threshold?.color || '#d1d5db' }}
                                >
                                  <span className="text-xl font-bold">{score}</span>
                                </div>
                                
                                {threshold && (
                                  <div 
                                    className="px-3 py-1 rounded-full text-white text-sm"
                                    style={{ backgroundColor: threshold.color }}
                                  >
                                    {threshold.label}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {actions.length > 0 && (
                              <div className="mt-4">
                                <h5 className="font-medium text-sm text-gray-700 mb-2">Recommended Actions:</h5>
                                <ul className="space-y-2 pl-5 list-disc">
                                  {actions.map((action) => (
                                    <li key={action.id} className="text-sm">
                                      <span className="font-medium">{action.action}</span>
                                      {action.description && (
                                        <span className="text-gray-600 ml-1">- {action.description}</span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No categories defined yet. Please add categories first.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={calculateScores}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Recalculate Scores
              </Button>
              
              <div className="ml-auto flex items-center text-sm text-gray-500">
                <span>Scoring updates automatically as you modify sample answers</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Category Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingCategory.id.startsWith('cat_') ? 'Add New Category' : 'Edit Category'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="category-name">Category Name</Label>
                <Input 
                  id="category-name"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                  placeholder="e.g., Technical Readiness"
                />
              </div>
              
              <div>
                <Label htmlFor="category-description">Description</Label>
                <Textarea
                  id="category-description"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                  placeholder="Brief description of what this category measures"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="category-weight">
                  Weight Factor: {editingCategory.weight.toFixed(1)}×
                </Label>
                <Slider
                  id="category-weight"
                  value={[editingCategory.weight * 10]}
                  min={1}
                  max={20}
                  step={1}
                  onValueChange={(value) => setEditingCategory({...editingCategory, weight: value[0] / 10})}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Higher weights give this category more impact on the final score
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setEditingCategory(null)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (!editingCategory.name) {
                    alert('Category name is required');
                    return;
                  }
                  
                  const isNew = !categories.find(c => c.id === editingCategory.id);
                  
                  if (isNew) {
                    setCategories([...categories, editingCategory]);
                  } else {
                    setCategories(categories.map(c => 
                      c.id === editingCategory.id ? editingCategory : c
                    ));
                  }
                  
                  setEditingCategory(null);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Rule Edit Modal */}
      {editingRule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingRule.id.startsWith('rule_') ? 'Add Scoring Rule' : 'Edit Scoring Rule'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="rule-field">Field</Label>
                <Select 
                  value={editingRule.field} 
                  onValueChange={(value) => setEditingRule({...editingRule, field: value})}
                >
                  <SelectTrigger id="rule-field">
                    <SelectValue placeholder="Select a field" />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="rule-condition">Condition</Label>
                <Select 
                  value={editingRule.condition} 
                  onValueChange={(value) => setEditingRule({...editingRule, condition: value})}
                >
                  <SelectTrigger id="rule-condition">
                    <SelectValue placeholder="Select a condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="greater_than">Greater than</SelectItem>
                    <SelectItem value="less_than">Less than</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="rule-value">Value</Label>
                <Input 
                  id="rule-value"
                  value={editingRule.value}
                  onChange={(e) => setEditingRule({...editingRule, value: e.target.value})}
                  placeholder="The value to match"
                />
              </div>
              
              <div>
                <Label htmlFor="rule-category">Category</Label>
                <Select 
                  value={editingRule.categoryId} 
                  onValueChange={(value) => setEditingRule({...editingRule, categoryId: value})}
                >
                  <SelectTrigger id="rule-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="rule-points">Points</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEditingRule({...editingRule, points: editingRule.points - 1})}
                    className="h-8 w-8"
                  >
                    -
                  </Button>
                  <Input
                    id="rule-points"
                    type="number"
                    value={editingRule.points}
                    onChange={(e) => setEditingRule({...editingRule, points: parseInt(e.target.value) || 0})}
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEditingRule({...editingRule, points: editingRule.points + 1})}
                    className="h-8 w-8"
                  >
                    +
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Positive points increase the score, negative points decrease it
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setEditingRule(null)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (!editingRule.field) {
                    alert('Field is required');
                    return;
                  }
                  if (!editingRule.value) {
                    alert('Value is required');
                    return;
                  }
                  if (!editingRule.categoryId) {
                    alert('Category is required');
                    return;
                  }
                  
                  const isNew = !rules.find(r => r.id === editingRule.id);
                  
                  if (isNew) {
                    setRules([...rules, editingRule]);
                  } else {
                    setRules(rules.map(r => 
                      r.id === editingRule.id ? editingRule : r
                    ));
                  }
                  
                  setEditingRule(null);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Threshold Edit Modal */}
      {editingThreshold && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingThreshold.id.startsWith('threshold_') ? 'Add Threshold' : 'Edit Threshold'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="threshold-category">Category</Label>
                <Select 
                  value={editingThreshold.categoryId} 
                  onValueChange={(value) => setEditingThreshold({...editingThreshold, categoryId: value})}
                  disabled={!editingThreshold.id.startsWith('threshold_')}
                >
                  <SelectTrigger id="threshold-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="threshold-min">Min Score</Label>
                  <Input 
                    id="threshold-min"
                    type="number"
                    min="0"
                    max="100"
                    value={editingThreshold.minScore}
                    onChange={(e) => setEditingThreshold({
                      ...editingThreshold, 
                      minScore: Math.min(parseInt(e.target.value) || 0, editingThreshold.maxScore)
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="threshold-max">Max Score</Label>
                  <Input 
                    id="threshold-max"
                    type="number"
                    min="0"
                    max="100"
                    value={editingThreshold.maxScore}
                    onChange={(e) => setEditingThreshold({
                      ...editingThreshold, 
                      maxScore: Math.max(parseInt(e.target.value) || 0, editingThreshold.minScore)
                    })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="threshold-label">Label</Label>
                <Input 
                  id="threshold-label"
                  value={editingThreshold.label}
                  onChange={(e) => setEditingThreshold({...editingThreshold, label: e.target.value})}
                  placeholder="e.g., Fully Ready"
                />
                <p className="text-xs text-gray-500 mt-1">
                  A descriptive label for this score range
                </p>
              </div>
              
              <div>
                <Label htmlFor="threshold-color">Color</Label>
                <div className="flex items-center gap-3 mt-1">
                  <input
                    type="color"
                    value={editingThreshold.color}
                    onChange={(e) => setEditingThreshold({...editingThreshold, color: e.target.value})}
                    className="h-10 w-10 rounded border p-1"
                  />
                  <div className="grid grid-cols-5 gap-2">
                    {['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#6366f1'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        className="w-8 h-8 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                        onClick={() => setEditingThreshold({...editingThreshold, color})}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setEditingThreshold(null)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (!editingThreshold.categoryId) {
                    alert('Category is required');
                    return;
                  }
                  if (!editingThreshold.label) {
                    alert('Label is required');
                    return;
                  }
                  
                  // Check for overlapping ranges within the same category
                  const overlappingThresholds = thresholds.filter(t => 
                    t.id !== editingThreshold.id && 
                    t.categoryId === editingThreshold.categoryId &&
                    ((t.minScore <= editingThreshold.minScore && t.maxScore >= editingThreshold.minScore) ||
                     (t.minScore <= editingThreshold.maxScore && t.maxScore >= editingThreshold.maxScore) ||
                     (t.minScore >= editingThreshold.minScore && t.maxScore <= editingThreshold.maxScore))
                  );
                  
                  if (overlappingThresholds.length > 0) {
                    alert('This range overlaps with existing thresholds for this category');
                    return;
                  }
                  
                  const isNew = !thresholds.find(t => t.id === editingThreshold.id);
                  
                  if (isNew) {
                    setThresholds([...thresholds, editingThreshold]);
                  } else {
                    setThresholds(thresholds.map(t => 
                      t.id === editingThreshold.id ? editingThreshold : t
                    ));
                  }
                  
                  setEditingThreshold(null);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Action Edit Modal */}
      {editingAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingAction.id.startsWith('action_') ? 'Add Recommended Action' : 'Edit Recommended Action'}
            </h2>
            
            <div className="space-y-4">
              {editingAction.id.startsWith('action_') && (
                <>
                  <div>
                    <Label htmlFor="action-category">Category</Label>
                    <Select 
                      value={editingAction.categoryId} 
                      onValueChange={(value) => {
                        setEditingAction({
                          ...editingAction, 
                          categoryId: value,
                          thresholdId: '' // Reset threshold when category changes
                        });
                      }}
                    >
                      <SelectTrigger id="action-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="action-threshold">Threshold</Label>
                    <Select 
                      value={editingAction.thresholdId} 
                      onValueChange={(value) => setEditingAction({...editingAction, thresholdId: value})}
                      disabled={!editingAction.categoryId}
                    >
                      <SelectTrigger id="action-threshold">
                        <SelectValue placeholder="Select a threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        {thresholds
                          .filter(t => t.categoryId === editingAction.categoryId)
                          .map((threshold) => (
                            <SelectItem key={threshold.id} value={threshold.id}>
                              {threshold.label} ({threshold.minScore}-{threshold.maxScore})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              <div>
                <Label htmlFor="action-title">Action Title</Label>
                <Input 
                  id="action-title"
                  value={editingAction.action}
                  onChange={(e) => setEditingAction({...editingAction, action: e.target.value})}
                  placeholder="e.g., Technical Infrastructure Assessment"
                />
              </div>
              
              <div>
                <Label htmlFor="action-description">Description</Label>
                <Textarea
                  id="action-description"
                  value={editingAction.description}
                  onChange={(e) => setEditingAction({...editingAction, description: e.target.value})}
                  placeholder="Brief description of the recommended action"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="action-priority">Priority</Label>
                <Select 
                  id="action-priority"
                  value={editingAction.priority} 
                  onValueChange={(value: 'low' | 'medium' | 'high') => setEditingAction({...editingAction, priority: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setEditingAction(null)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (!editingAction.categoryId) {
                    alert('Category is required');
                    return;
                  }
                  if (!editingAction.thresholdId) {
                    alert('Threshold is required');
                    return;
                  }
                  if (!editingAction.action) {
                    alert('Action title is required');
                    return;
                  }
                  
                  const isNew = !actions.find(a => a.id === editingAction.id);
                  
                  if (isNew) {
                    setActions([...actions, editingAction]);
                  } else {
                    setActions(actions.map(a => 
                      a.id === editingAction.id ? editingAction : a
                    ));
                  }
                  
                  setEditingAction(null);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 flex gap-3">
        <input
          type="file"
          id="import-config"
          className="hidden"
          accept=".json"
          onChange={importConfiguration}
        />
        <label htmlFor="import-config">
          <Button variant="outline" size="sm" className="cursor-pointer" asChild>
            <span>Import Config</span>
          </Button>
        </label>
        
        <Button variant="outline" size="sm" onClick={exportConfiguration}>
          Export Config
        </Button>
        
        <Button onClick={saveConfiguration}>
          <Save className="mr-2 h-4 w-4" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
} 