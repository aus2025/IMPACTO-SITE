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
import Image from 'next/image'

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
  const [formData, setFormData] = useState<Partial<CaseStudy>>(initialData || {
    title: '',
    slug: '',
    client: '',
    industry: '',
    challenge: '',
    solution: '',
    results: '',
    metrics: [],
    gallery: [],
    status: 'draft'
  })
  
  const [industries, setIndustries] = useState<string[]>([])
  const [isLoadingIndustries, setIsLoadingIndustries] = useState(false)
  const supabase = createClient()
  
  useEffect(() => {
    const fetchIndustries = async () => {
      setIsLoadingIndustries(true)
      try {
        const { data, error } = await supabase
          .from('industries')
          .select('name')
          .order('name')
        
        if (error) throw error
        
        setIndustries(data.map(item => item.name))
      } catch (error) {
        console.error('Error fetching industries:', error)
      } finally {
        setIsLoadingIndustries(false)
      }
    }
    
    fetchIndustries()
  }, [])
  
  const saveDraft = async () => {
    if (!validateForm()) return
    
    const data: CaseStudy = {
      ...formData,
      status: 'draft',
      updated_at: new Date().toISOString()
    } as CaseStudy
    
    await onSave(data)
  }
  
  const publishCaseStudy = async () => {
    if (!validateForm()) return
    
    const data: CaseStudy = {
      ...formData,
      status: 'published',
      published_at: formData.published_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as CaseStudy
    
    await onSave(data, true)
  }
  
  const validateForm = (): boolean => {
    // Basic validation
    if (!formData.title?.trim()) {
      alert('Please enter a title')
      return false
    }
    
    if (!formData.slug?.trim()) {
      alert('Please enter a slug')
      return false
    }
    
    if (!formData.client?.trim()) {
      alert('Please enter a client name')
      return false
    }
    
    if (!formData.industry?.trim()) {
      alert('Please select an industry')
      return false
    }
    
    if (!formData.challenge?.trim()) {
      alert('Please describe the challenge')
      return false
    }
    
    if (!formData.solution?.trim()) {
      alert('Please describe the solution')
      return false
    }
    
    if (!formData.results?.trim()) {
      alert('Please describe the results')
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
      
      <Tabs defaultValue="content" className="w-full">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter case study title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="Enter URL slug"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      placeholder="Enter client name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => setFormData({ ...formData, industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingIndustries ? (
                          <div className="p-2 text-center">
                            <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                          </div>
                        ) : (
                          industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="featured_image">Featured Image URL</Label>
                  <Input
                    id="featured_image"
                    value={formData.featured_image}
                    onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                    placeholder="Enter featured image URL"
                  />
                  {formData.featured_image && (
                    <div className="mt-2 relative h-48">
                      <Image
                        src={formData.featured_image}
                        alt="Featured image preview"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-md"
                        priority={false}
                      />
                    </div>
                  )}
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
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="solution">Solution <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="solution"
                    placeholder="Describe your solution to the challenge"
                    className="min-h-[200px]"
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="results">Results</Label>
                  <Textarea
                    id="results"
                    placeholder="Describe the results and outcomes"
                    className="min-h-[150px]"
                    value={formData.results}
                    onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  />
                  <p className="text-sm text-gray-500">
                    You can also add specific metrics in the "Results & Metrics" tab.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
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
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  placeholder="Enter meta description"
                  className="min-h-[100px]"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Preview content will be added here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
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
            formData.status === 'published' ? 'Update & Publish' : 'Publish'
          )}
        </Button>
      </div>
    </div>
  )
} 