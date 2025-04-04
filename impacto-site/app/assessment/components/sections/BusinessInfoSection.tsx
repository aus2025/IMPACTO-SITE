'use client';

import { Input } from '@/components/ui/input';
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

export type BusinessInfoSectionProps = {
  formData: any;
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onCheckboxChange: (name: string, value: string, checked: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function BusinessInfoSection({ 
  formData, 
  errors,
  onInputChange, 
  onSelectChange, 
  onCheckboxChange,
  onPrev,
  onNext 
}: BusinessInfoSectionProps) {
  const industries = [
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'financial', label: 'Financial Services' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'professional_services', label: 'Professional Services' },
    { value: 'education', label: 'Education' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'construction', label: 'Construction' },
    { value: 'technology', label: 'Technology' },
    { value: 'other', label: 'Other' },
  ];
  
  const employeeSizes = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: 'More than 1000 employees' },
  ];
  
  const businessGoals = [
    { value: 'cost_reduction', label: 'Cost reduction' },
    { value: 'growth', label: 'Business growth' },
    { value: 'efficiency', label: 'Operational efficiency' },
    { value: 'customer_experience', label: 'Improved customer experience' },
    { value: 'competitive_advantage', label: 'Competitive advantage' },
    { value: 'compliance', label: 'Regulatory compliance' },
    { value: 'digital_transformation', label: 'Digital transformation' },
  ];
  
  const complianceConcerns = [
    { value: 'hipaa', label: 'HIPAA' },
    { value: 'gdpr', label: 'GDPR' },
    { value: 'ccpa', label: 'CCPA' },
    { value: 'pci', label: 'PCI DSS' },
    { value: 'sox', label: 'Sarbanes-Oxley' },
    { value: 'iso', label: 'ISO 27001' },
    { value: 'other', label: 'Other' },
  ];
  
  const painPoints = [
    { value: 'manual_data_entry', label: 'Manual data entry consumes too much time' },
    { value: 'communication_gaps', label: 'Communication gaps between departments' },
    { value: 'duplicate_work', label: 'Duplicate work across systems' },
    { value: 'customer_response_time', label: 'Slow customer response times' },
    { value: 'reporting_challenges', label: 'Manual reporting is time-consuming' },
    { value: 'data_errors', label: 'Frequent data errors and inconsistencies' },
    { value: 'process_bottlenecks', label: 'Process bottlenecks causing delays' },
    { value: 'compliance_tracking', label: 'Difficulty tracking compliance requirements' },
  ];
  
  return (
    <div className="space-y-6" data-section="2">
      <h2 className="text-xl font-semibold text-gray-800">Business Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="industry" className="required text-gray-900 font-medium">Industry</Label>
          <Select 
            value={formData.industry} 
            onValueChange={(value) => onSelectChange('industry', value)}
          >
            <SelectTrigger id="industry" className={`mt-1 text-gray-900 ${errors.industry ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.value} value={industry.value} className="text-gray-900">
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <div className="text-red-500 text-sm mt-1">{errors.industry}</div>
          )}
        </div>
        
        <div>
          <Label htmlFor="employee_count" className="required text-gray-900 font-medium">Number of Employees</Label>
          <Select 
            value={formData.employee_count} 
            onValueChange={(value) => onSelectChange('employee_count', value)}
          >
            <SelectTrigger id="employee_count" className={`mt-1 text-gray-900 ${errors.employee_count ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              {employeeSizes.map((size) => (
                <SelectItem key={size.value} value={size.value} className="text-gray-900">
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.employee_count && (
            <div className="text-red-500 text-sm mt-1">{errors.employee_count}</div>
          )}
        </div>
        
        <div>
          <Label className="required text-gray-900 font-medium">Business Goals</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            {businessGoals.map((goal) => (
              <div key={goal.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`goal-${goal.value}`} 
                  checked={formData.business_goals?.includes(goal.value)}
                  onCheckedChange={(checked) => 
                    onCheckboxChange('business_goals', goal.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`goal-${goal.value}`}
                  className="text-gray-900 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {goal.label}
                </label>
              </div>
            ))}
          </div>
          {errors.business_goals && (
            <div className="text-red-500 text-sm mt-1">{errors.business_goals}</div>
          )}
        </div>
        
        <div>
          <Label className="text-gray-900 font-medium">Pain Points</Label>
          <p className="text-gray-700 text-sm mb-2">
            Select the challenges that your business currently faces with manual processes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            {painPoints.map((point) => (
              <div key={point.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`pain-${point.value}`} 
                  checked={formData.pain_points?.includes(point.value)}
                  onCheckedChange={(checked) => 
                    onCheckboxChange('pain_points', point.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`pain-${point.value}`}
                  className="text-gray-900 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {point.label}
                </label>
              </div>
            ))}
          </div>
          <p className="text-blue-700 text-xs italic mt-2">
            The more specific your pain points, the more accurately we can assess your automation needs.
          </p>
        </div>
        
        {formData.industry === 'healthcare' && (
          <div>
            <Label htmlFor="patient_data" className="text-gray-900 font-medium">Patient Data Handling</Label>
            <Select 
              value={formData.patient_data} 
              onValueChange={(value) => onSelectChange('patient_data', value)}
            >
              <SelectTrigger id="patient_data" className="mt-1 text-gray-900">
                <SelectValue placeholder="Select patient data level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none" className="text-gray-900">We don't handle patient data</SelectItem>
                <SelectItem value="limited" className="text-gray-900">Limited patient data</SelectItem>
                <SelectItem value="extensive" className="text-gray-900">Extensive patient data</SelectItem>
                <SelectItem value="primary" className="text-gray-900">Primary focus of our business</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div>
          <Label className="text-gray-900 font-medium">Compliance Concerns</Label>
          <p className="text-gray-700 text-sm mb-2">
            Select any regulations your business needs to comply with. If you're not familiar with these, you can skip this section.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            {complianceConcerns.map((concern) => (
              <div key={concern.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`compliance-${concern.value}`} 
                  checked={formData.compliance_concerns?.includes(concern.value)}
                  onCheckedChange={(checked) => 
                    onCheckboxChange('compliance_concerns', concern.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`compliance-${concern.value}`}
                  className="text-gray-900 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {concern.label}
                </label>
              </div>
            ))}
          </div>
          <p className="text-blue-700 text-xs italic mt-2">
            This helps us understand if your business has specific compliance requirements, but is completely optional.
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