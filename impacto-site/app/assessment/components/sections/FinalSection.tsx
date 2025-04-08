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

export type FinalSectionProps = {
  formData: any;
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onCheckboxChange: (name: string, value: string, checked: boolean) => void;
  onCheckboxSingleChange: (name: string, checked: boolean) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string | null;
};

export default function FinalSection({ 
  formData, 
  errors,
  onInputChange, 
  onSelectChange, 
  onCheckboxChange,
  onCheckboxSingleChange,
  onPrev,
  onSubmit,
  isSubmitting,
  submitError
}: FinalSectionProps) {
  const referralSources = [
    { value: 'search', label: 'Search engine' },
    { value: 'social', label: 'Social media' },
    { value: 'recommendation', label: 'Recommendation' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'event', label: 'Event or conference' },
    { value: 'other', label: 'Other' },
  ];
  
  const consultationPreferences = [
    { value: 'email', label: 'Email consultation' },
    { value: 'call', label: 'Phone call' },
    { value: 'video', label: 'Video call' },
    { value: 'in_person', label: 'In-person meeting (if available)' },
  ];
  
  return (
    <div className="space-y-6" data-section="5">
      <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="referral_source" className="text-gray-900 font-medium">How did you hear about us?</Label>
          <Select 
            value={formData.referral_source} 
            onValueChange={(value) => onSelectChange('referral_source', value)}
          >
            <SelectTrigger id="referral_source" className="mt-1 text-gray-900">
              <SelectValue placeholder="Select referral source" />
            </SelectTrigger>
            <SelectContent>
              {referralSources.map((source) => (
                <SelectItem key={source.value} value={source.value} className="text-gray-900">
                  {source.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="consultation_preference" className="text-gray-900 font-medium">Consultation Preference</Label>
          <Select 
            value={formData.consultation_preference} 
            onValueChange={(value) => onSelectChange('consultation_preference', value)}
          >
            <SelectTrigger id="consultation_preference" className="mt-1 text-gray-900">
              <SelectValue placeholder="Select consultation preference" />
            </SelectTrigger>
            <SelectContent>
              {consultationPreferences.map((pref) => (
                <SelectItem key={pref.value} value={pref.value} className="text-gray-900">
                  {pref.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="additional_comments" className="text-gray-900 font-medium">Additional Comments</Label>
          <Textarea 
            id="additional_comments" 
            name="additional_comments"
            value={formData.additional_comments || ''}
            onChange={onInputChange}
            placeholder="Any additional information you'd like to share"
            className="mt-1 text-gray-900"
          />
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-start space-x-2 mb-4">
            <Checkbox 
              id="consent_terms" 
              checked={formData.consent_terms}
              onCheckedChange={(checked) => 
                onCheckboxSingleChange('consent_terms', checked as boolean)
              }
              className="mt-1 text-gray-900 border-gray-700"
            />
            <div>
              <label
                htmlFor="consent_terms"
                className="text-gray-900 font-medium"
              >
                Terms and Conditions
              </label>
              <p className="text-gray-800 text-sm">
                I agree to the terms and conditions and privacy policy. I understand that my data will be used to process my request.
              </p>
              {errors.consent_terms && (
                <div className="text-red-500 text-sm mt-1">{errors.consent_terms}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="consent_marketing" 
              checked={formData.consent_marketing}
              onCheckedChange={(checked) => 
                onCheckboxSingleChange('consent_marketing', checked as boolean)
              }
              className="mt-1 text-gray-900 border-gray-700"
            />
            <div>
              <label
                htmlFor="consent_marketing"
                className="text-gray-900 font-medium"
              >
                Marketing Communications
              </label>
              <p className="text-gray-800 text-sm">
                I would like to receive marketing communications, updates and insights about business automation.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4">
        {submitError && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md">
            {submitError}
          </div>
        )}
        
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
            onClick={onSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : 'Submit Assessment'}
          </Button>
        </div>
      </div>
    </div>
  );
} 