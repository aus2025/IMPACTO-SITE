'use client'

import { useState, useRef, ChangeEvent } from 'react'
import Image from 'next/image'
import { Upload, X, ImageIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface ImageUploaderProps {
  initialImage?: string | null
  onImageChange: (imageUrl: string | null) => void
  label?: string
}

export default function ImageUploader({ 
  initialImage = null, 
  onImageChange,
  label = 'Featured Image'
}: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(initialImage)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Create form data for file upload
      const formData = new FormData()
      formData.append('file', file)
      
      // Upload image to server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Failed to upload image')
      }
      
      const data = await response.json()
      const imageUrl = data.url
      
      setImage(imageUrl)
      onImageChange(imageUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Card className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        {image && (
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={handleRemoveImage}
            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X size={16} className="mr-1" />
            Remove
          </Button>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {image ? (
        <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={image}
            alt="Featured image"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div 
          onClick={triggerFileInput}
          className="cursor-pointer flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-md h-48 transition-colors hover:border-indigo-200 hover:bg-indigo-50/30"
        >
          <ImageIcon size={40} className="text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Click to upload image</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
        </div>
      )}
      
      {!image && (
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={triggerFileInput}
          disabled={isUploading}
          className="w-full"
        >
          <Upload size={16} className="mr-2" />
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </Button>
      )}
    </Card>
  )
} 