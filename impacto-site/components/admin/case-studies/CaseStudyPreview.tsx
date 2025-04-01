'use client'

import { CaseStudy } from './CaseStudyForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { format } from 'date-fns'

interface CaseStudyPreviewProps {
  caseStudy: Partial<CaseStudy>
}

export default function CaseStudyPreview({ caseStudy }: CaseStudyPreviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Preview: {caseStudy.title || 'Untitled Case Study'}</CardTitle>
            {caseStudy.status && (
              <Badge variant={caseStudy.status === 'published' ? 'success' : 'secondary'}>
                {caseStudy.status === 'published' ? 'Published' : 'Draft'}
              </Badge>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {caseStudy.client && (
              <div><span className="font-medium">Client:</span> {caseStudy.client}</div>
            )}
            {caseStudy.industry && (
              <div><span className="font-medium">Industry:</span> {caseStudy.industry}</div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="full" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="full">Full Preview</TabsTrigger>
              <TabsTrigger value="mobile">Mobile View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="full">
              <div className="border rounded-md p-6 bg-white">
                {/* Featured Image */}
                {caseStudy.featured_image && (
                  <div className="mb-8 flex justify-center">
                    <img 
                      src={caseStudy.featured_image} 
                      alt={caseStudy.title || 'Case study featured image'} 
                      className="rounded-md max-h-96 object-cover"
                    />
                  </div>
                )}
                
                {/* Case Study Content */}
                <div className="max-w-4xl mx-auto">
                  {/* Title & Client */}
                  <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">{caseStudy.title || 'Untitled Case Study'}</h1>
                    {caseStudy.client && (
                      <p className="text-xl text-gray-600">
                        {caseStudy.client} • {caseStudy.industry || 'Industry'}
                      </p>
                    )}
                  </div>
                  
                  {/* Challenge Section */}
                  {caseStudy.challenge && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                      <div className="prose max-w-none">
                        {caseStudy.challenge.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Solution Section */}
                  {caseStudy.solution && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
                      <div className="prose max-w-none">
                        {caseStudy.solution.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Results Metrics */}
                  {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                    <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {caseStudy.metrics.map((metric) => (
                        <div key={metric.id} className="text-center p-6 bg-gray-50 rounded-lg">
                          <div className="text-3xl font-bold text-indigo-600">
                            {metric.prefix}{metric.value}{metric.suffix}
                          </div>
                          <div className="mt-2 text-gray-700">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Results Section */}
                  {caseStudy.results && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">The Results</h2>
                      <div className="prose max-w-none">
                        {caseStudy.results.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Gallery */}
                  {caseStudy.gallery && caseStudy.gallery.length > 0 && (
                    <div className="mt-12">
                      <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {caseStudy.gallery.map((image) => (
                          <div key={image.id} className="mb-4">
                            {image.url && (
                              <figure>
                                <img 
                                  src={image.url} 
                                  alt={image.alt || 'Case study image'} 
                                  className="rounded-md w-full object-cover"
                                />
                                {image.caption && (
                                  <figcaption className="mt-2 text-sm text-gray-500 italic">
                                    {image.caption}
                                  </figcaption>
                                )}
                              </figure>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mobile">
              <div className="border rounded-md mx-auto" style={{ maxWidth: '375px', height: '667px', overflow: 'auto' }}>
                <div className="p-4 bg-white">
                  {/* Mobile preview here */}
                  {caseStudy.featured_image && (
                    <div className="mb-6">
                      <img 
                        src={caseStudy.featured_image} 
                        alt={caseStudy.title || 'Case study featured image'} 
                        className="rounded-md w-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold mb-2">{caseStudy.title || 'Untitled Case Study'}</h1>
                    {caseStudy.client && (
                      <p className="text-sm text-gray-600">
                        {caseStudy.client} • {caseStudy.industry || 'Industry'}
                      </p>
                    )}
                  </div>
                  
                  {caseStudy.challenge && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-2">The Challenge</h2>
                      <div className="text-sm">
                        {caseStudy.challenge.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-3">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Add other sections with smaller fonts and spacing */}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>SEO Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4 bg-white">
            <div className="text-blue-700 text-xl mb-1 hover:underline cursor-pointer">
              {caseStudy.meta_title || caseStudy.title || 'Untitled Case Study'} | Company Name
            </div>
            <div className="text-green-800 text-sm mb-2">
              www.example.com/case-studies/{caseStudy.slug || 'untitled-case-study'}
            </div>
            <div className="text-gray-600 text-sm">
              {caseStudy.meta_description || 
                `Case study about ${caseStudy.client || 'our client'} in the ${caseStudy.industry || 'industry'} sector.`}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 