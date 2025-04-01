'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type AutomationNeedsSectionProps = {
  formData: any;
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onCheckboxChange: (name: string, value: string, checked: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function AutomationNeedsSection({ 
  formData, 
  errors,
  onInputChange, 
  onSelectChange, 
  onCheckboxChange,
  onPrev,
  onNext 
}: AutomationNeedsSectionProps) {
  const automationAreas = [
    { value: 'document_processing', label: 'Document processing & management' },
    { value: 'customer_service', label: 'Customer service automation' },
    { value: 'accounting', label: 'Accounting & bookkeeping' },
    { value: 'hr', label: 'HR & recruitment' },
    { value: 'inventory', label: 'Inventory management' },
    { value: 'sales', label: 'Sales & marketing' },
    { value: 'data_entry', label: 'Data entry & processing' },
    { value: 'workflow', label: 'General workflow automation' },
  ];
  
  const documentTypes = [
    { value: 'invoices', label: 'Invoices' },
    { value: 'receipts', label: 'Receipts' },
    { value: 'contracts', label: 'Contracts' },
    { value: 'forms', label: 'Forms' },
    { value: 'reports', label: 'Reports' },
    { value: 'hr_documents', label: 'HR documents' },
  ];
  
  const documentVolumes = [
    { value: 'low', label: 'Low (< 100 documents/month)' },
    { value: 'medium', label: 'Medium (100-500 documents/month)' },
    { value: 'high', label: 'High (500-1000 documents/month)' },
    { value: 'very_high', label: 'Very high (1000+ documents/month)' },
  ];
  
  const customerServiceChannels = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'chat', label: 'Live chat' },
    { value: 'social', label: 'Social media' },
    { value: 'ticketing', label: 'Ticketing system' },
  ];
  
  const automationExperience = [
    { value: 'none', label: 'No automation in place' },
    { value: 'basic', label: 'Basic automation (email, simple workflows)' },
    { value: 'moderate', label: 'Moderate automation (some processes automated)' },
    { value: 'advanced', label: 'Advanced automation (multiple integrated systems)' },
  ];
  
  const existingSystems = [
    { value: 'crm', label: 'CRM (Customer Relationship Management)' },
    { value: 'erp', label: 'ERP (Enterprise Resource Planning)' },
    { value: 'accounting', label: 'Accounting Software' },
    { value: 'hrms', label: 'HR Management System' },
    { value: 'ecommerce', label: 'E-commerce Platform' },
    { value: 'pos', label: 'Point of Sale (POS)' },
    { value: 'project', label: 'Project Management' },
  ];
  
  const timeOptions = [
    { value: 'minimal', label: 'Minimal (< 5 hours/week)' },
    { value: 'low', label: 'Low (5-10 hours/week)' },
    { value: 'medium', label: 'Medium (10-20 hours/week)' },
    { value: 'high', label: 'High (20-40 hours/week)' },
    { value: 'very_high', label: 'Very high (40+ hours/week)' },
  ];
  
  const errorOptions = [
    { value: 'rare', label: 'Rare (once a month or less)' },
    { value: 'occasional', label: 'Occasional (a few times per month)' },
    { value: 'frequent', label: 'Frequent (weekly occurrences)' },
    { value: 'very_frequent', label: 'Very frequent (daily occurrences)' },
  ];
  
  const timelineOptions = [
    { value: 'immediate', label: 'As soon as possible' },
    { value: '3months', label: 'Within 3 months' },
    { value: '6months', label: 'Within 6 months' },
    { value: '12months', label: 'Within 12 months' },
    { value: 'exploring', label: 'Just exploring options for now' },
  ];
  
  return (
    <div className="space-y-6" data-section="3">
      <h2 className="text-xl font-semibold text-gray-900">Automation Needs</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="required text-gray-900 font-medium">Areas for Automation</Label>
          <p className="text-gray-800 mb-2">
            Select the areas where you'd like to implement or improve automation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            {automationAreas.map((area) => (
              <div key={area.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`area-${area.value}`} 
                  checked={formData.automation_areas?.includes(area.value)}
                  onCheckedChange={(checked) => 
                    onCheckboxChange('automation_areas', area.value, checked as boolean)
                  }
                  className="text-gray-900 border-gray-700"
                />
                <label
                  htmlFor={`area-${area.value}`}
                  className="text-gray-900 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {area.label}
                </label>
              </div>
            ))}
          </div>
          {errors.automation_areas && (
            <div className="text-red-500 text-sm mt-1">{errors.automation_areas}</div>
          )}
        </div>
        
        {formData.automation_areas?.includes('document_processing') && (
          <>
            <div>
              <Label className="text-gray-900 font-medium">Document Types</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                {documentTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`doc-${type.value}`} 
                      checked={formData.document_types?.includes(type.value)}
                      onCheckedChange={(checked) => 
                        onCheckboxChange('document_types', type.value, checked as boolean)
                      }
                      className="text-gray-900 border-gray-700"
                    />
                    <label
                      htmlFor={`doc-${type.value}`}
                      className="text-gray-900 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="document_volume" className="text-gray-900 font-medium">Document Volume</Label>
              <Select 
                value={formData.document_volume} 
                onValueChange={(value) => onSelectChange('document_volume', value)}
              >
                <SelectTrigger id="document_volume" className="mt-1 text-gray-900">
                  <SelectValue placeholder="Select volume" />
                </SelectTrigger>
                <SelectContent>
                  {documentVolumes.map((volume) => (
                    <SelectItem key={volume.value} value={volume.value} className="text-gray-900">
                      {volume.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        {formData.automation_areas?.includes('customer_service') && (
          <div>
            <Label className="text-gray-900 font-medium">Customer Service Channels</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
              {customerServiceChannels.map((channel) => (
                <div key={channel.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`channel-${channel.value}`} 
                    checked={formData.cs_channels?.includes(channel.value)}
                    onCheckedChange={(checked) => 
                      onCheckboxChange('cs_channels', channel.value, checked as boolean)
                    }
                    className="text-gray-900 border-gray-700"
                  />
                  <label
                    htmlFor={`channel-${channel.value}`}
                    className="text-gray-900 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {channel.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <Label className="text-gray-900 font-medium">Time Spent on Manual Processes</Label>
          <p className="text-gray-800 mb-2">
            Estimate how much time your staff spends on manual processes that could be automated.
          </p>
          <Select 
            value={formData.process_time_spent} 
            onValueChange={(value) => onSelectChange('process_time_spent', value)}
          >
            <SelectTrigger id="process_time_spent" className="mt-1 text-gray-900">
              <SelectValue placeholder="Select time estimate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="very_low" className="text-gray-900">Minimal (&#60; 5% of work time)</SelectItem>
              <SelectItem value="low" className="text-gray-900">Low (5-15% of work time)</SelectItem>
              <SelectItem value="medium" className="text-gray-900">Moderate (15-30% of work time)</SelectItem>
              <SelectItem value="high" className="text-gray-900">High (30-50% of work time)</SelectItem>
              <SelectItem value="very_high" className="text-gray-900">Very High (&#62; 50% of work time)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-gray-800 italic text-sm mt-1">
            This helps us quantify the potential time savings from automation.
          </p>
        </div>
        
        <div>
          <Label className="text-gray-900 font-medium">Error Frequency in Manual Processes</Label>
          <p className="text-gray-800 mb-2">
            How often do errors occur in your manual processes?
          </p>
          <Select 
            value={formData.error_frequency} 
            onValueChange={(value) => onSelectChange('error_frequency', value)}
          >
            <SelectTrigger id="error_frequency" className="mt-1 text-gray-900">
              <SelectValue placeholder="Select error frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="very_rare" className="text-gray-900">Very Rare (Almost Never)</SelectItem>
              <SelectItem value="rare" className="text-gray-900">Rare (Few Times a Year)</SelectItem>
              <SelectItem value="occasional" className="text-gray-900">Occasional (Monthly)</SelectItem>
              <SelectItem value="frequent" className="text-gray-900">Frequent (Weekly)</SelectItem>
              <SelectItem value="very_frequent" className="text-gray-900">Very Frequent (Daily)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="automation_experience" className="required text-gray-900 font-medium">Current Automation Experience</Label>
          <Select 
            value={formData.automation_experience} 
            onValueChange={(value) => onSelectChange('automation_experience', value)}
          >
            <SelectTrigger id="automation_experience" className={`mt-1 text-gray-900 ${errors.automation_experience ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              {automationExperience.map((exp) => (
                <SelectItem key={exp.value} value={exp.value} className="text-gray-900">
                  {exp.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.automation_experience && (
            <div className="text-red-500 text-sm mt-1">{errors.automation_experience}</div>
          )}
        </div>
        
        <div>
          <Label className="text-gray-900 font-medium">Existing Systems</Label>
          <p className="text-gray-800 mb-2">
            Select the systems you currently use in your business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            {existingSystems.map((system) => (
              <div key={system.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`system-${system.value}`} 
                  checked={formData.existing_systems?.includes(system.value)}
                  onCheckedChange={(checked) => 
                    onCheckboxChange('existing_systems', system.value, checked as boolean)
                  }
                  className="text-gray-900 border-gray-700"
                />
                <label
                  htmlFor={`system-${system.value}`}
                  className="text-gray-900 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {system.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label className="text-gray-900 font-medium">Specific Challenges or Requirements</Label>
          <p className="text-gray-800 mb-2">
            Please describe any specific challenges or requirements for your automation needs
          </p>
          <Textarea 
            id="specific_challenges" 
            name="specific_challenges"
            value={formData.specific_challenges || ''}
            onChange={onInputChange}
            placeholder="Please describe any specific challenges or requirements for your automation needs"
            className="mt-1 text-gray-900 h-24"
          />
        </div>
        
        <div>
          <Label htmlFor="automation_timeline" className="required text-gray-900 font-medium">Implementation Timeline</Label>
          <Select 
            value={formData.automation_timeline} 
            onValueChange={(value) => onSelectChange('automation_timeline', value)}
          >
            <SelectTrigger id="automation_timeline" className={`mt-1 text-gray-900 ${errors.automation_timeline ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate" className="text-gray-900">As soon as possible</SelectItem>
              <SelectItem value="3months" className="text-gray-900">Within 3 months</SelectItem>
              <SelectItem value="6months" className="text-gray-900">Within 6 months</SelectItem>
              <SelectItem value="12months" className="text-gray-900">Within 12 months</SelectItem>
              <SelectItem value="exploring" className="text-gray-900">Just exploring options for now</SelectItem>
            </SelectContent>
          </Select>
          {errors.automation_timeline && (
            <div className="text-red-500 text-sm mt-1">{errors.automation_timeline}</div>
          )}
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