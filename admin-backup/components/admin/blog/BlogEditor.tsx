'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

// Dynamic import to avoid SSR issues with Markdown editor
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

interface BlogEditorProps {
  initialContent?: string
  onChange: (content: string) => void
}

export default function BlogEditor({ initialContent = '', onChange }: BlogEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync content with parent component
  useEffect(() => {
    if (mounted) {
      setContent(initialContent)
    }
  }, [initialContent, mounted])

  const handleChange = (value?: string) => {
    const newContent = value || ''
    setContent(newContent)
    onChange(newContent)
  }

  if (!mounted) {
    return <div className="min-h-[400px] bg-gray-100 animate-pulse rounded-md"></div>
  }

  return (
    <Card className="p-4">
      <div className="space-y-2">
        <Label htmlFor="blog-content">Content</Label>
        <div data-color-mode="light">
          <MDEditor
            value={content}
            onChange={handleChange}
            height={500}
            preview="edit"
            id="blog-content"
          />
        </div>
      </div>
    </Card>
  )
} 