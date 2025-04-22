'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type BudgetSectionProps = {
  formData: {
    budget_range?: string;
    funding_source?: string;
    timeline?: string;
    roi_expectations?: string;
    budget_constraints?: string;
    additional_budget_notes?: string;
    decision_timeline?: string;
    investment_factors?: string[];
    competitor_automation?: string;
  };
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onCheckboxChange: (name: string, value: string, checked: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function BudgetSection({ 
  formData, 
  errors,
  onInputChange, 
  onSelectChange, 
  onCheckboxChange,
  onPrev,
  onNext 
}: BudgetSectionProps) {
  const budgetRanges = [
    { value: 'under5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k+', label: 'Over $100,000' },
    { value: 'undecided', label: 'Not yet determined' },
  ];
  
  const fundingSources = [
    { value: 'operating_budget', label: 'Operating budget' },
    { value: 'capital_budget', label: 'Capital budget' },
    { value: 'special_allocation', label: 'Special project allocation' },
    { value: 'external_funding', label: 'External funding/investment' },
    { value: 'undecided', label: 'Not yet determined' },
  ];
  
  const decisionTimelines = [
    { value: 'immediate', label: 'Ready to decide immediately' },
    { value: '1month', label: 'Within 1 month' },
    { value: '3months', label: 'Within 3 months' },
    { value: '6months', label: 'Within 6 months' },
    { value: 'exploring', label: 'Just exploring options for now' },
  ];
  
  const investmentFactors = [
    { value: 'roi', label: 'Return on investment' },
    { value: 'time_savings', label: 'Time savings' },
    { value: 'cost_reduction', label: 'Cost reduction' },
    { value: 'quality_improvement', label: 'Quality improvement' },
    { value: 'competitive_advantage', label: 'Competitive advantage' },
    { value: 'scalability', label: 'Scalability' },
    { value: 'compliance', label: 'Regulatory compliance' },
  ];
  
  const competitorLevels = [
    { value: 'unknown', label: "I'm not sure what competitors are doing" },
    { value: 'none', label: 'No competitors using significant automation' },
    { value: 'some', label: 'Some competitors have basic automation' },
    { value: 'most', label: 'Most competitors have some automation' },
    { value: 'advanced', label: 'Leading competitors have advanced automation' },
  ];
  
  return (
    <div className="space-y-6" data-section="4">
      <h2 className="text-xl font-semibold text-gray-900">Budget & Investment</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="budget_range" className="required text-gray-900 font-medium">Budget Range</Label>
          <Select 
            value={formData.budget_range} 
            onValueChange={(value) => onSelectChange('budget_range', value)}
          >
            <SelectTrigger id="budget_range" className={`mt-1 text-gray-900 ${errors.budget_range ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range.value} value={range.value} className="text-gray-900">
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.budget_range && (
            <div className="text-red-500 text-sm mt-1">{errors.budget_range}</div>
          )}
        </div>
        
        <div>
          <Label htmlFor="funding_source" className="text-gray-900 font-medium">Funding Source</Label>
          <Select 
            value={formData.funding_source} 
            onValueChange={(value) => onSelectChange('funding_source', value)}
          >
            <SelectTrigger id="funding_source" className="mt-1 text-gray-900">
              <SelectValue placeholder="Select funding source" />
            </SelectTrigger>
            <SelectContent>
              {fundingSources.map((source) => (
                <SelectItem key={source.value} value={source.value} className="text-gray-900">
                  {source.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="decision_timeline" className="required text-gray-900 font-medium">Decision Timeline</Label>
          <Select 
            value={formData.decision_timeline} 
            onValueChange={(value) => onSelectChange('decision_timeline', value)}
          >
            <SelectTrigger id="decision_timeline" className={`mt-1 text-gray-900 ${errors.decision_timeline ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {decisionTimelines.map((timeline) => (
                <SelectItem key={timeline.value} value={timeline.value} className="text-gray-900">
                  {timeline.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.decision_timeline && (
            <div className="text-red-500 text-sm mt-1">{errors.decision_timeline}</div>
          )}
        </div>
        
        <div>
          <Label className="text-gray-900 font-medium">Investment Decision Factors</Label>
          <p className="text-gray-800 mb-2">
            What factors are most important when making automation investment decisions?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            {investmentFactors.map((factor) => (
              <div key={factor.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`factor-${factor.value}`} 
                  checked={formData.investment_factors?.includes(factor.value)}
                  onCheckedChange={(checked) => 
                    onCheckboxChange('investment_factors', factor.value, checked as boolean)
                  }
                  className="text-gray-900 border-gray-700"
                />
                <label
                  htmlFor={`factor-${factor.value}`}
                  className="text-gray-900 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {factor.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="competitor_automation" className="text-gray-900 font-medium">Competitor Automation Level</Label>
          <p className="text-gray-800 mb-2">
            How would you describe your competitors' use of automation?
          </p>
          <Select 
            value={formData.competitor_automation} 
            onValueChange={(value) => onSelectChange('competitor_automation', value)}
          >
            <SelectTrigger id="competitor_automation" className="mt-1 text-gray-900">
              <SelectValue placeholder="Select competitor automation level" />
            </SelectTrigger>
            <SelectContent>
              {competitorLevels.map((level) => (
                <SelectItem key={level.value} value={level.value} className="text-gray-900">
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="budget_constraints" className="text-gray-900 font-medium">Budget Constraints</Label>
          <Textarea 
            id="budget_constraints" 
            name="budget_constraints"
            value={formData.budget_constraints || ''}
            onChange={onInputChange}
            placeholder="Please describe any budget constraints or considerations"
            className="mt-1 text-gray-900 h-24"
          />
          <p className="text-gray-800 text-sm mt-1">
            This helps us understand your financial limitations and tailor our recommendations accordingly.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          onClick={onPrev}
          variant="outline"
          className="text-gray-900"
        >
          Previous
        </Button>
        <Button 
          type="button" 
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
} 