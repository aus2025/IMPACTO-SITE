'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs } from '@/components/ui/tabs'
import BlogEditor from '@/components/admin/blog/BlogEditor'
import BlogMetadata from '@/components/admin/blog/BlogMetadata'
import ImageUploader from '@/components/admin/blog/ImageUploader'
import PublishControls from '@/components/admin/blog/PublishControls'
import TagInput from '@/components/admin/blog/TagInput'
import { v4 as uuidv4 } from 'uuid'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewBlogPost() {
  const router = useRouter()
  const supabase = createClient()
  
  // Form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('content')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      setSlug(title.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/-+/g, '-') // Replace multiple - with single -
      )
    }
  }, [title])
  
  // Fetch available tags for suggestions
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data, error } = await supabase
          .from('tags')
          .select('name')
          .order('name')
        
        if (error) throw error
        
        setSuggestedTags(data.map(tag => tag.name))
      } catch (err) {
        console.error('Error fetching tags:', err)
      }
    }
    
    fetchTags()
  }, [])
  
  // Helper to create or get tag IDs
  const getOrCreateTags = async (tagNames: string[]) => {
    const tagIds: string[] = []
    
    for (const name of tagNames) {
      // Check if tag exists
      const { data: existingTag, error: findError } = await supabase
        .from('tags')
        .select('id')
        .eq('name', name)
        .single()
      
      if (findError && findError.code !== 'PGRST116') {
        // Real error (not just "no rows returned")
        throw findError
      }
      
      if (existingTag) {
        tagIds.push(existingTag.id)
      } else {
        // Create new tag
        const { data: newTag, error: createError } = await supabase
          .from('tags')
          .insert({ name })
          .select()
          .single()
        
        if (createError) throw createError
        
        tagIds.push(newTag.id)
      }
    }
    
    return tagIds
  }
  
  // Save as draft
  const saveDraft = async () => {
    try {
      setIsSaving(true)
      setErrorMessage(null)
      
      // Basic validation
      if (!title || !slug || !content) {
        setErrorMessage('Title, slug, and content are required fields')
        return
      }
      
      // Check if slug is unique
      const { data: existingPost, error: slugCheckError } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)
        .single()
      
      if (existingPost) {
        setErrorMessage('A post with this slug already exists')
        return
      }
      
      // Get or create tags
      const tagIds = await getOrCreateTags(tags)
      
      // Current user info
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }
      
      // Create the post
      const now = new Date().toISOString()
      const { data: post, error: createError } = await supabase
        .from('blog_posts')
        .insert({
          id: uuidv4(),
          title,
          slug,
          content,
          excerpt,
          meta_title: metaTitle || title,
          meta_description: metaDescription || excerpt,
          featured_image: featuredImage,
          status: 'draft',
          author_id: user.id,
          created_at: now,
          updated_at: now
        })
        .select()
        .single()
      
      if (createError) throw createError
      
      // Associate tags with post
      if (tagIds.length > 0) {
        const tagRelations = tagIds.map(tagId => ({
          post_id: post.id,
          tag_id: tagId
        }))
        
        const { error: tagError } = await supabase
          .from('blog_post_tags')
          .insert(tagRelations)
        
        if (tagError) throw tagError
      }
      
      // Redirect to the edit page
      router.push(`/admin/blog/${post.id}/edit?success=true`)
    } catch (err: any) {
      console.error('Error saving draft:', err)
      setErrorMessage(err.message || 'Failed to save post')
    } finally {
      setIsSaving(false)
    }
  }
  
  // Publish post
  const publishPost = async (scheduleDate?: Date) => {
    try {
      setIsSaving(true)
      setErrorMessage(null)
      
      // Basic validation
      if (!title || !slug || !content) {
        setErrorMessage('Title, slug, and content are required fields')
        return
      }
      
      // Check if slug is unique
      const { data: existingPost, error: slugCheckError } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)
        .single()
      
      if (existingPost) {
        setErrorMessage('A post with this slug already exists')
        return
      }
      
      // Get or create tags
      const tagIds = await getOrCreateTags(tags)
      
      // Current user info
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }
      
      // Determine status and publish date
      const now = new Date().toISOString()
      const isScheduled = !!scheduleDate && scheduleDate > new Date()
      const status = isScheduled ? 'scheduled' : 'published'
      const publishedAt = isScheduled 
        ? scheduleDate.toISOString() 
        : now
      
      // Create the post
      const { data: post, error: createError } = await supabase
        .from('blog_posts')
        .insert({
          id: uuidv4(),
          title,
          slug,
          content,
          excerpt,
          meta_title: metaTitle || title,
          meta_description: metaDescription || excerpt,
          featured_image: featuredImage,
          status,
          author_id: user.id,
          created_at: now,
          updated_at: now,
          published_at: publishedAt
        })
        .select()
        .single()
      
      if (createError) throw createError
      
      // Associate tags with post
      if (tagIds.length > 0) {
        const tagRelations = tagIds.map(tagId => ({
          post_id: post.id,
          tag_id: tagId
        }))
        
        const { error: tagError } = await supabase
          .from('blog_post_tags')
          .insert(tagRelations)
        
        if (tagError) throw tagError
      }
      
      // Redirect to the blog list
      router.push('/admin/blog?success=publish')
    } catch (err: any) {
      console.error('Error publishing post:', err)
      setErrorMessage(err.message || 'Failed to publish post')
    } finally {
      setIsSaving(false)
    }
  }
  
  // Preview post
  const previewPost = () => {
    // Open a new window with a preview (for now just show content in an alert)
    // In a real implementation, this would use a preview API route
    alert('Preview functionality would go here. For now, here\'s the content:\n\n' + content)
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center">
          <Link href="/admin/blog" className="mr-4">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
        </div>
      </div>
      
      {errorMessage && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          {errorMessage}
        </div>
      )}
      
      {/* Main form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content column (spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex items-center">
                <span className="bg-gray-100 text-gray-600 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 text-sm">
                  /blog/
                </span>
                <Input
                  id="slug"
                  placeholder="your-post-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="rounded-l-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Brief summary of the post (used in listings and SEO)"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="resize-none h-20"
              />
            </div>
          </Card>
          
          <Tabs
            items={[
              { value: 'content', label: 'Content' },
              { value: 'seo', label: 'SEO' }
            ]}
            value={activeTab}
            onValueChange={setActiveTab}
          />
          
          {activeTab === 'content' && (
            <BlogEditor 
              initialContent={content} 
              onChange={setContent} 
            />
          )}
          
          {activeTab === 'seo' && (
            <BlogMetadata
              title={metaTitle}
              description={metaDescription}
              onTitleChange={setMetaTitle}
              onDescriptionChange={setMetaDescription}
            />
          )}
        </div>
        
        {/* Sidebar column */}
        <div className="space-y-6">
          <PublishControls
            status="draft"
            publishedAt={null}
            onSaveDraft={saveDraft}
            onPublish={publishPost}
            onPreview={previewPost}
            isSaving={isSaving}
          />
          
          <ImageUploader
            initialImage={featuredImage}
            onImageChange={setFeaturedImage}
          />
          
          <TagInput
            tags={tags}
            onTagsChange={setTags}
            suggestions={suggestedTags}
          />
        </div>
      </div>
    </div>
  )
} 