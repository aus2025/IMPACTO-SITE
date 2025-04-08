'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import MermaidModal from '@/components/admin/MermaidModal';

export default function AdminAssessmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMermaidModalOpen, setIsMermaidModalOpen] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchAssessment = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_assessments')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setAssessment(data);
    } catch (error) {
      console.error('Error fetching assessment:', error);
      router.push('/admin/assessments');
    } finally {
      setLoading(false);
    }
  }, [supabase, router]);

  useEffect(() => {
    if (params.id) {
      fetchAssessment(params.id as string);
    }
  }, [params.id, fetchAssessment]);

  const handleOpenMermaidModal = () => {
    setIsMermaidModalOpen(true);
  };

  const handleCloseMermaidModal = () => {
    setIsMermaidModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this assessment? This action cannot be undone.')) return;
    
    try {
      const { error } = await supabase
        .from('business_assessments')
        .delete()
        .eq('id', params.id);
        
      if (error) throw error;
      
      // Redirect back to assessments list
      router.push('/admin/assessments');
    } catch (error) {
      console.error('Error deleting assessment:', error);
    }
  };

  const renderJsonField = (field: any) => {
    if (!field) return <span className="text-gray-500">None</span>;
    
    if (Array.isArray(field)) {
      return (
        <ul className="list-disc pl-5">
          {field.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
      );
    }
    
    if (typeof field === 'object') {
      return (
        <div className="space-y-2">
          {Object.entries(field).map(([key, value]) => (
            <div key={key}>
              <span className="font-medium">{key}: </span>
              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
            </div>
          ))}
        </div>
      );
    }
    
    return String(field);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4">Loading assessment data...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">Assessment not found or has been deleted.</p>
          <Link 
            href="/admin/assessments" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Assessments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assessment Details</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleOpenMermaidModal}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Create Mermaid
          </button>
          <Link
            href={`/assessment/${assessment.id}/report`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            target="_blank"
          >
            View Report
          </Link>
          <Link
            href="/admin/assessments"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Back to List
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete Assessment
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{assessment.full_name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{assessment.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="font-medium">{assessment.company || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Submission Date</p>
              <p className="font-medium">{formatDate(assessment.created_at)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Business Challenges</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Key Challenges</p>
            {renderJsonField(assessment.challenges)}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Goals</p>
            {renderJsonField(assessment.goals)}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Compliance Concerns</p>
            {renderJsonField(assessment.compliance_concerns)}
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Workflows & Communication</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Reporting Tools</p>
            {renderJsonField(assessment.reporting_tools)}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Communication Channels</p>
            {renderJsonField(assessment.communication_channels)}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Communication Frequency</p>
            <p>{assessment.communication_frequency || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Communication Pain Points</p>
            {renderJsonField(assessment.communication_pain_points)}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Workflow Bottlenecks</p>
            {renderJsonField(assessment.workflow_bottlenecks)}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Workflow Automation Areas</p>
            {renderJsonField(assessment.workflow_automation_areas)}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Collaboration Tools</p>
            {renderJsonField(assessment.workflow_collaboration_tools)}
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">HR & Team</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">HR Team Size</p>
            <p>{assessment.hr_team_size || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">HR Pain Points</p>
            {renderJsonField(assessment.hr_pain_points)}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Hiring Volume</p>
            <p>{assessment.hr_hiring_volume || 'N/A'}</p>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Sales & Marketing</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Sales Channels</p>
            {renderJsonField(assessment.sales_channels)}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Sales Volume</p>
            <p>{assessment.sales_volume || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Sales Pain Points</p>
            {renderJsonField(assessment.sales_pain_points)}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Marketing Channels</p>
            {renderJsonField(assessment.marketing_channels)}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Marketing Budget</p>
            <p>{assessment.marketing_budget || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Marketing Pain Points</p>
            {renderJsonField(assessment.marketing_pain_points)}
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Raw Data</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
            {JSON.stringify(assessment, null, 2)}
          </pre>
        </div>
      </div>

      {/* Mermaid Modal */}
      <MermaidModal
        assessment={assessment}
        isOpen={isMermaidModalOpen}
        onClose={handleCloseMermaidModal}
      />
    </div>
  );
} 