'use client';

import BusinessAssessmentForm from '../BusinessAssessmentForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function StandardBusinessAssessmentPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link 
          href="/admin/assessments/forms" 
          className="flex items-center text-sm text-gray-500 hover:text-gray-800"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Forms
        </Link>
      </div>
      
      <BusinessAssessmentForm />
    </div>
  );
} 