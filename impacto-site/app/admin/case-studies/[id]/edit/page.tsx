'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CaseStudyForm, { CaseStudy } from '@/components/admin/case-studies/CaseStudyForm'
import CaseStudyPreview from '@/components/admin/case-studies/CaseStudyPreview'
import { Loader2, ArrowLeft, Eye, Save } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Fix type definition to match PageProps interface
interface PageProps {
  params: {
    id: string;
  };
}

export default function EditCaseStudy({ params }: PageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(
    searchParams.get('success') === 'true' ? 'Case study saved successfully!' : null
  )
  const [activeTab, setActiveTab] = useState('edit')
  
  // Fetch case study data
  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setLoading(true)
        
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .eq('id', params.id)
          .single()
        
        if (error) {
          if (error.code === 'PGRST116') {
            // Record not found
            setErrorMessage('Case study not found. It may have been deleted or you may not have permission to access it.')
          } else {
            throw error
          }
        } else if (data) {
          // Ensure metrics and gallery arrays exist
          const processedData = {
            ...data,
            metrics: data.metrics || [],
            gallery: data.gallery || []
          }
          setCaseStudy(processedData)
        }
      } catch (err: any) {
        console.error('Error fetching case study:', err.message || err)
        setErrorMessage('Failed to load case study: ' + (err.message || 'Unknown error'))
      } finally {
        setLoading(false)
      }
    }
    
    fetchCaseStudy()
  }, [params.id, supabase])
  
  // Handle saving the case study
  const handleSave = async (caseStudyData: CaseStudy, publish: boolean = false) => {
    try {
      setIsSaving(true)
      setErrorMessage(null)
      setSuccessMessage(null)
      
      // Check if slug is unique (excluding this case study)
      const { data: existingCaseStudy, error: slugCheckError } = await supabase
        .from('case_studies')
        .select('id')
        .eq('slug', caseStudyData.slug)
        .neq('id', params.id)
        .single()
      
      if (existingCaseStudy) {
        setErrorMessage('A case study with this slug already exists')
        setIsSaving(false)
        return
      }
      
      // Prepare data for update
      const now = new Date().toISOString()
      const status = publish ? 'published' : caseStudyData.status
      const publishedAt = publish ? now : caseStudyData.published_at
      
      const updatedCaseStudy = {
        title: caseStudyData.title,
        slug: caseStudyData.slug,
        client: caseStudyData.client,
        industry: caseStudyData.industry,
        challenge: caseStudyData.challenge,
        solution: caseStudyData.solution,
        results: caseStudyData.results,
        metrics: caseStudyData.metrics,
        gallery: caseStudyData.gallery,
        featured_image: caseStudyData.featured_image,
        meta_title: caseStudyData.meta_title || caseStudyData.title,
        meta_description: caseStudyData.meta_description,
        status,
        updated_at: now,
        published_at: publishedAt
      }
      
      // Update the case study
      const { error: updateError } = await supabase
        .from('case_studies')
        .update(updatedCaseStudy)
        .eq('id', params.id)
      
      if (updateError) throw updateError
      
      // Refresh the case study data
      const { data: refreshedData, error: refreshError } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', params.id)
        .single()
      
      if (refreshError) throw refreshError
      
      setCaseStudy(refreshedData)
      setSuccessMessage('Case study updated successfully!')
      setIsSaving(false)
    } catch (err: any) {
      console.error('Error updating case study:', err)
      setErrorMessage(err.message || 'Failed to update case study')
      setIsSaving(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <span className="ml-2 text-lg font-medium text-gray-700">Loading case study...</span>
      </div>
    )
  }
  
  if (!caseStudy) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Case study not found or you don't have permission to edit it.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link href="/admin/case-studies">
            <Button variant="outline">Back to Case Studies</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/case-studies" className="mr-4">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Case Study: {caseStudy.title}</h1>
        </div>
        <div className="flex space-x-2">
          <Link href={`/case-studies/${caseStudy.slug}`} target="_blank">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Eye size={16} />
              <span>View Live</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {successMessage && (
        <Alert className="bg-green-50 text-green-700 border-green-200">
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit">
          <CaseStudyForm
            initialData={caseStudy}
            onSave={handleSave}
            isSaving={isSaving}
            errorMessage={errorMessage}
          />
        </TabsContent>
        
        <TabsContent value="preview">
          <CaseStudyPreview caseStudy={caseStudy} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 