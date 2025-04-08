'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import CaseStudyForm, { CaseStudy } from '@/components/admin/case-studies/CaseStudyForm'
import { v4 as uuidv4 } from 'uuid'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewCaseStudy() {
  const router = useRouter()
  const supabase = createClient()
  
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  // Handle saving the case study
  const handleSave = async (caseStudyData: CaseStudy, publish: boolean = false) => {
    try {
      setIsSaving(true)
      setErrorMessage(null)
      
      // Check if slug is unique
      const { data: existingCaseStudy, error: slugCheckError } = await supabase
        .from('case_studies')
        .select('id')
        .eq('slug', caseStudyData.slug)
        .single()
      
      if (existingCaseStudy) {
        setErrorMessage('A case study with this slug already exists')
        setIsSaving(false)
        return
      }
      
      // Prepare data for insertion
      const id = uuidv4()
      const now = new Date().toISOString()
      const status = publish ? 'published' : 'draft'
      const publishedAt = publish ? now : null
      
      const newCaseStudy = {
        id,
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
        created_at: now,
        updated_at: now,
        published_at: publishedAt
      }
      
      // Insert the case study
      const { error: insertError } = await supabase
        .from('case_studies')
        .insert(newCaseStudy)
      
      if (insertError) throw insertError
      
      // Redirect to the edit page with success message
      router.push(`/admin/case-studies/${id}/edit?success=true`)
    } catch (err: any) {
      console.error('Error saving case study:', err)
      setErrorMessage(err.message || 'Failed to save case study')
      setIsSaving(false)
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Create New Case Study</h1>
        </div>
      </div>
      
      <CaseStudyForm
        onSave={handleSave}
        isSaving={isSaving}
        errorMessage={errorMessage}
      />
    </div>
  )
} 