'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ContactSectionProps = {
  formData: any;
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onNext: () => void;
};

export default function ContactSection({ 
  formData, 
  errors, 
  onInputChange, 
  onSelectChange, 
  onNext 
}: ContactSectionProps) {
  return (
    <div className="space-y-6" data-section="1">
      <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="full_name" className="required text-gray-900 font-medium">Full Name</Label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name || ''}
            onChange={onInputChange}
            className={`mt-1 focus:ring-blue-600 focus:border-blue-600 text-gray-900 ${errors.full_name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Your full name"
          />
          {errors.full_name && (
            <div className="text-red-500 text-sm mt-1">{errors.full_name}</div>
          )}
        </div>
        
        <div>
          <Label htmlFor="email" className="required text-gray-900 font-medium">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={onInputChange}
            className={`mt-1 focus:ring-blue-600 focus:border-blue-600 text-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>
        
        <div>
          <Label htmlFor="phone" className="required text-gray-900 font-medium">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone || ''}
            onChange={onInputChange}
            className={`mt-1 focus:ring-blue-600 focus:border-blue-600 text-gray-900 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
          )}
        </div>
        
        <div>
          <Label htmlFor="company_name" className="text-gray-900 font-medium">Company Name</Label>
          <Input
            id="company_name"
            name="company_name"
            value={formData.company_name || ''}
            onChange={onInputChange}
            className={`mt-1 focus:ring-blue-600 focus:border-blue-600 text-gray-900 ${errors.company_name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Your company name"
          />
          {errors.company_name && (
            <div className="text-red-500 text-sm mt-1">{errors.company_name}</div>
          )}
        </div>
        
        <div>
          <Label htmlFor="job_title" className="text-gray-900 font-medium">Your Role</Label>
          <Select 
            value={formData.job_title || ''} 
            onValueChange={(value) => onSelectChange('job_title', value)}
          >
            <SelectTrigger id="job_title" className={`mt-1 focus:ring-blue-600 focus:border-blue-600 text-gray-900 ${errors.job_title ? 'border-red-500' : 'border-gray-300'}`}>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owner" className="text-gray-900">Business Owner</SelectItem>
              <SelectItem value="executive" className="text-gray-900">Executive/C-Level</SelectItem>
              <SelectItem value="manager" className="text-gray-900">Manager</SelectItem>
              <SelectItem value="director" className="text-gray-900">Director</SelectItem>
              <SelectItem value="other" className="text-gray-900">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.job_title && (
            <div className="text-red-500 text-sm mt-1">{errors.job_title}</div>
          )}
          <p className="text-gray-700 text-sm italic mt-1">
            Knowing your role helps us tailor our recommendations to your specific needs and authority level.
          </p>
        </div>
      </div>
      
      <div className="flex justify-end">
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