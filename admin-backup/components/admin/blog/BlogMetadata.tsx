'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

interface BlogMetadataProps {
  title: string
  description: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
}

export default function BlogMetadata({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: BlogMetadataProps) {
  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-medium">SEO Metadata</h3>
      
      <div className="space-y-2">
        <Label htmlFor="meta-title">Meta Title</Label>
        <Input
          id="meta-title"
          placeholder="SEO-friendly title (55-60 characters recommended)"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          maxLength={100}
        />
        <div className="text-xs text-gray-500 flex justify-end">
          <span className={`${title.length > 60 ? 'text-red-500' : ''}`}>
            {title.length}/100
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="meta-description">Meta Description</Label>
        <Textarea
          id="meta-description"
          placeholder="Brief description for search results (150-160 characters recommended)"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          maxLength={250}
          className="resize-none h-24"
        />
        <div className="text-xs text-gray-500 flex justify-end">
          <span className={`${description.length > 160 ? 'text-red-500' : ''}`}>
            {description.length}/250
          </span>
        </div>
      </div>
    </Card>
  )
} 