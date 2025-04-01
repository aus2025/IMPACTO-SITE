'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Phone validation regex (allows various formats)
const PHONE_REGEX = /^(\+\d{1,3}[- ]?)?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

interface QuickConsultationFormProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function QuickConsultationForm({ 
  variant = 'light',
  className = '',
}: QuickConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });
  
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        if (!value.trim()) return 'Email is required';
        return EMAIL_REGEX.test(value) ? '' : 'Please enter a valid email address';
      case 'phone':
        return value.trim() && !PHONE_REGEX.test(value) 
          ? 'Please enter a valid phone number' 
          : '';
      default:
        return '';
    }
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate on change
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service_interest: value }));
  };
  
  const validateForm = (): boolean => {
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
    };
    
    setFormErrors(errors);
    
    return !Object.values(errors).some(error => error);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });
    
    try {
      const { error } = await supabase.from('leads').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          service_interest: formData.service_interest || null,
          message: "Quick consultation request from website", // Default message
        },
      ]);
      
      if (error) {
        throw error;
      }
      
      setFormStatus({
        type: 'success',
        message: 'Thank you! We will contact you soon to schedule your consultation.',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_interest: '',
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        type: 'error',
        message: 'There was an error submitting your request. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const bgColor = variant === 'light' ? 'bg-white' : 'bg-blue-900';
  const textColor = variant === 'light' ? 'text-gray-800' : 'text-white';
  const borderColor = variant === 'light' ? 'border-gray-200' : 'border-blue-700';
  const inputBg = variant === 'light' ? 'bg-white' : 'bg-blue-800';
  const inputText = variant === 'light' ? 'text-gray-900' : 'text-white';
  const inputBorder = variant === 'light' ? 'border-gray-200' : 'border-blue-700';
  
  return (
    <div className={`${bgColor} ${textColor} rounded-lg shadow-lg p-6 border ${borderColor} transition-all ${className}`}>
      <h3 className="text-xl font-semibold mb-4">Request a Free Consultation</h3>
      
      {formStatus.type && (
        <div
          className={`p-4 mb-4 rounded-md animate-fadeIn ${
            formStatus.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {formStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className={textColor}>
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className={`mt-1 w-full ${inputBg} ${inputText} ${inputBorder} transition-all focus:border-blue-500`}
            aria-invalid={!!formErrors.name}
            aria-describedby={formErrors.name ? "name-error" : undefined}
          />
          {formErrors.name && (
            <p id="name-error" className="text-sm text-red-500 mt-1 animate-fadeIn">
              {formErrors.name}
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="email" className={textColor}>
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
            className={`mt-1 w-full ${inputBg} ${inputText} ${inputBorder} transition-all focus:border-blue-500`}
            aria-invalid={!!formErrors.email}
            aria-describedby={formErrors.email ? "email-error" : undefined}
          />
          {formErrors.email && (
            <p id="email-error" className="text-sm text-red-500 mt-1 animate-fadeIn">
              {formErrors.email}
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="phone" className={textColor}>
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className={`mt-1 w-full ${inputBg} ${inputText} ${inputBorder} transition-all focus:border-blue-500`}
            aria-invalid={!!formErrors.phone}
            aria-describedby={formErrors.phone ? "phone-error" : undefined}
          />
          {formErrors.phone && (
            <p id="phone-error" className="text-sm text-red-500 mt-1 animate-fadeIn">
              {formErrors.phone}
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="service_interest" className={textColor}>
            I'm Interested In
          </Label>
          <Select
            value={formData.service_interest}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger 
              id="service_interest" 
              className={`mt-1 w-full ${inputBg} ${inputText} ${inputBorder} transition-all focus:border-blue-500`}
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Social Media Marketing">Social Media Marketing</SelectItem>
              <SelectItem value="Workflow Automation">Workflow Automation</SelectItem>
              <SelectItem value="Data Analytics">Data Analytics</SelectItem>
              <SelectItem value="Customer Service Automation">Customer Service Automation</SelectItem>
              <SelectItem value="General Consultation">General Consultation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-xs mt-2 opacity-80">
          By submitting this form, you agree to our privacy policy and consent to being contacted regarding your inquiry.
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full ${
            variant === 'light' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-400 hover:bg-blue-500 text-blue-900'
          } transition-all`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : 'Request Consultation'}
        </Button>
      </form>
    </div>
  );
} 