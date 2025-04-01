'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import GalleryManager from './GalleryManager'
import ResultsMetricsInput from './ResultsMetricsInput'
import { createClient } from '@/utils/supabase/client'
import { v4 as uuidv4 } from 'uuid'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, AlertCircle } from 'lucide-react'

// Define case study interfaces
export interface CaseStudyMetric {
  id: string
  label: string
  value: string
  prefix?: string
  suffix?: string
}

export interface CaseStudyImage {
  id: string
  url: string
  alt: string
  caption?: string
}

export interface CaseStudy {
  id?: string
  title: string
  slug: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: string
  metrics: CaseStudyMetric[]
  gallery: CaseStudyImage[]
  featured_image?: string
  meta_title?: string
  meta_description?: string
  status: 'draft' | 'published'
  created_at?: string
  updated_at?: string
  published_at?: string | null
}

interface CaseStudyFormProps {
  initialData?: Partial<CaseStudy>
  onSave: (data: CaseStudy, publish?: boolean) => Promise<void>
  isSaving: boolean
  errorMessage?: string | null
}

export default function CaseStudyForm({
  initialData,
  onSave,
  isSaving,
  errorMessage
}: CaseStudyFormProps) {
  const supabase = createClient()
  
  // Form state
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [client, setClient] = useState(initialData?.client || '')
  const [industry, setIndustry] = useState(initialData?.industry || '')
  const [challenge, setChallenge] = useState(initialData?.challenge || '')
  const [solution, setSolution] = useState(initialData?.solution || '')
  const [results, setResults] = useState(initialData?.results || '')
  const [metrics, setMetrics] = useState<CaseStudyMetric[]>(initialData?.metrics || [])
  const [gallery, setGallery] = useState<CaseStudyImage[]>(initialData?.gallery || [])
  const [featuredImage, setFeaturedImage] = useState<string | undefined>(initialData?.featured_image)
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '')
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '')
  const [activeTab, setActiveTab] = useState('content')
  const [industries, setIndustries] = useState<string[]>([
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail'
  ])
  
  // Auto-generate slug from title
  useEffect(() => {
    if (title && !initialData?.slug) {
      setSlug(title.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/-+/g, '-') // Replace multiple - with single -
      )
    }
  }, [title, initialData?.slug])
  
  // Fetch available industries for dropdown
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        // Query for unique industries from existing case studies
        const { data, error } = await supabase
          .from('case_studies')
          .select('industry')
          .order('industry')
          
        if (error) throw error
        
        // Extract unique industries
        const uniqueIndustries = data
          ? [...new Set(data.map(item => item.industry).filter(Boolean))]
          : []
          
        // If we got results, use them
        if (uniqueIndustries.length > 0) {
          setIndustries(uniqueIndustries)
        }
        // If no results, we keep the default industries set in state
      } catch (err: any) {
        console.error('Error fetching industries:', err.message || err)
        // We already have default industries in state, so no need to set again
      }
    }
    
    fetchIndustries()
  }, [])
  
  // Save as draft
  const saveDraft = async () => {
    if (!validateForm()) return
    
    const caseStudyData: CaseStudy = {
      title,
      slug,
      client,
      industry,
      challenge,
      solution,
      results,
      metrics,
      gallery,
      featured_image: featuredImage,
      meta_title: metaTitle || title,
      meta_description: metaDescription,
      status: 'draft'
    }
    
    await onSave(caseStudyData)
  }
  
  // Publish case study
  const publishCaseStudy = async () => {
    if (!validateForm()) return
    
    const caseStudyData: CaseStudy = {
      title,
      slug,
      client,
      industry,
      challenge,
      solution,
      results,
      metrics,
      gallery,
      featured_image: featuredImage,
      meta_title: metaTitle || title,
      meta_description: metaDescription,
      status: 'published'
    }
    
    await onSave(caseStudyData, true)
  }
  
  // Validate form
  const validateForm = (): boolean => {
    if (!title) {
      setActiveTab('content')
      return false
    }
    
    if (!slug) {
      setActiveTab('content')
      return false
    }
    
    if (!client) {
      setActiveTab('content')
      return false
    }
    
    if (!industry) {
      setActiveTab('content')
      return false
    }
    
    if (!challenge) {
      setActiveTab('content')
      return false
    }
    
    if (!solution) {
      setActiveTab('content')
      return false
    }
    
    return true
  }
  
  return (
    <div className="space-y-6">
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media & Gallery</TabsTrigger>
          <TabsTrigger value="metrics">Results & Metrics</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        {/* Content Tab */}
        <TabsContent value="content">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="title">Case Study Title <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    placeholder="Enter case study title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
                  <Input
                    id="slug"
                    placeholder="URL-friendly slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Will be used in the URL: /case-studies/{slug}
                  </p>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="client">Client Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="client"
                    placeholder="Enter client name"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="industry">Industry <span className="text-red-500">*</span></Label>
                  <div className="flex space-x-2">
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind} value={ind}>
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Or type a new industry"
                      onChange={(e) => setIndustry(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Case Study Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="challenge">Challenge <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="challenge"
                    placeholder="Describe the client's challenge"
                    className="min-h-[150px]"
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="solution">Solution <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="solution"
                    placeholder="Describe your solution to the challenge"
                    className="min-h-[200px]"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="results">Results</Label>
                  <Textarea
                    id="results"
                    placeholder="Describe the results and outcomes"
                    className="min-h-[150px]"
                    value={results}
                    onChange={(e) => setResults(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    You can also add specific metrics in the "Results & Metrics" tab.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Media Tab */}
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input
                  id="featuredImage"
                  placeholder="Enter featured image URL"
                  value={featuredImage || ''}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                />
                {featuredImage && (
                  <div className="mt-2">
                    <img 
                      src={featuredImage} 
                      alt="Featured preview" 
                      className="max-w-xs rounded-md border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <GalleryManager 
              gallery={gallery} 
              onChange={setGallery} 
            />
          </div>
        </TabsContent>
        
        {/* Metrics Tab */}
        <TabsContent value="metrics">
          <ResultsMetricsInput 
            metrics={metrics}
            onChange={setMetrics}
          />
        </TabsContent>
        
        {/* SEO Tab */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  placeholder="Enter meta title (defaults to case study title)"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  placeholder="Enter meta description"
                  className="min-h-[100px]"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={saveDraft}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Draft'
          )}
        </Button>
        
        <Button
          onClick={publishCaseStudy}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            initialData?.status === 'published' ? 'Update & Publish' : 'Publish'
          )}
        </Button>
      </div>
    </div>
  )
} 