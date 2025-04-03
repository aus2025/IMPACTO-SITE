'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CaseStudyImage } from './CaseStudyForm'
import { Plus, Trash, Move, Image as ImageIcon } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

interface GalleryManagerProps {
  gallery: CaseStudyImage[]
  onChange: (gallery: CaseStudyImage[]) => void
}

export default function GalleryManager({
  gallery,
  onChange
}: GalleryManagerProps) {
  const [expandedImageId, setExpandedImageId] = useState<string | null>(null)
  
  // Add new image
  const addImage = () => {
    const newImage: CaseStudyImage = {
      id: uuidv4(),
      url: '',
      alt: '',
      caption: ''
    }
    
    onChange([...gallery, newImage])
    setExpandedImageId(newImage.id)
  }
  
  // Remove image
  const removeImage = (id: string) => {
    onChange(gallery.filter(img => img.id !== id))
    if (expandedImageId === id) {
      setExpandedImageId(null)
    }
  }
  
  // Update image
  const updateImage = (id: string, field: keyof CaseStudyImage, value: string) => {
    onChange(
      gallery.map(img => 
        img.id === id 
          ? { ...img, [field]: value }
          : img
      )
    )
  }
  
  // Move image up or down
  const moveImage = (id: string, direction: 'up' | 'down') => {
    const index = gallery.findIndex(img => img.id === id)
    if (index === -1) return
    
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= gallery.length) return
    
    const newGallery = [...gallery]
    const [movedImage] = newGallery.splice(index, 1)
    newGallery.splice(newIndex, 0, movedImage)
    
    onChange(newGallery)
  }
  
  // Toggle image details
  const toggleImageDetails = (id: string) => {
    setExpandedImageId(expandedImageId === id ? null : id)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Image Gallery</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addImage}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          <span>Add Image</span>
        </Button>
      </CardHeader>
      <CardContent>
        {gallery.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>No images added yet. Add images to create a gallery for this case study.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {gallery.map((image, index) => (
              <div 
                key={image.id} 
                className="p-4 border border-gray-200 rounded-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <Button
                    variant="ghost"
                    onClick={() => toggleImageDetails(image.id)}
                    className="flex items-center gap-2 font-medium"
                  >
                    <ImageIcon size={16} />
                    <span>Image {index + 1}</span>
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveImage(image.id, 'up')}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      <Move size={16} className="rotate-180" />
                      <span className="sr-only">Move up</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveImage(image.id, 'down')}
                      disabled={index === gallery.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      <Move size={16} />
                      <span className="sr-only">Move down</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(image.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash size={16} />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
                
                {/* Preview if URL exists */}
                {image.url && (
                  <div className="mb-3 flex justify-center">
                    <Image
                      src={image.url}
                      alt={image.alt || 'Gallery image'}
                      width={128}
                      height={128}
                      className="max-h-40 object-contain rounded-md border border-gray-200"
                      priority={false}
                    />
                  </div>
                )}
                
                {/* Show image details if expanded */}
                {expandedImageId === image.id && (
                  <div className="grid gap-3 pt-2">
                    <div className="grid gap-2">
                      <Label htmlFor={`image-url-${image.id}`}>Image URL <span className="text-red-500">*</span></Label>
                      <Input
                        id={`image-url-${image.id}`}
                        placeholder="Enter image URL"
                        value={image.url}
                        onChange={(e) => updateImage(image.id, 'url', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`image-alt-${image.id}`}>Alt Text <span className="text-red-500">*</span></Label>
                      <Input
                        id={`image-alt-${image.id}`}
                        placeholder="Describe the image for accessibility"
                        value={image.alt}
                        onChange={(e) => updateImage(image.id, 'alt', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`image-caption-${image.id}`}>Caption</Label>
                      <Textarea
                        id={`image-caption-${image.id}`}
                        placeholder="Optional caption for the image"
                        value={image.caption || ''}
                        onChange={(e) => updateImage(image.id, 'caption', e.target.value)}
                        className="h-20"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}