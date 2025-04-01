'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
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
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function EditBlogPost() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const postId = params.id as string
  const showSuccessMessage = searchParams.get('success') === 'true'
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
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft')
  const [publishedAt, setPublishedAt] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('content')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState<string | null>(
    showSuccessMessage ? 'Post saved successfully!' : null
  )
  
  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        
        // Get post data
        const { data: post, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', postId)
          .single()
        
        if (postError) throw postError
        
        // Get tags for the post
        const { data: postTags, error: tagsError } = await supabase
          .from('blog_post_tags')
          .select('tags(name)')
          .eq('post_id', postId)
        
        if (tagsError) throw tagsError
        
        // Set all the form data
        setTitle(post.title)
        setSlug(post.slug)
        setContent(post.content || '')
        setExcerpt(post.excerpt || '')
        setMetaTitle(post.meta_title || '')
        setMetaDescription(post.meta_description || '')
        setFeaturedImage(post.featured_image)
        setStatus(post.status)
        setPublishedAt(post.published_at ? new Date(post.published_at) : null)
        
        // Extract tag names from the joined data
        const tagNames = postTags.map((tag: any) => tag.tags.name)
        setTags(tagNames)
      } catch (err: any) {
        console.error('Error fetching post:', err)
        setErrorMessage(err.message || 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPost()
  }, [postId])
  
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
  
  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [successMessage])
  
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
  
  // Save post changes
  const saveChanges = async (newStatus?: 'draft' | 'published' | 'scheduled', scheduleDate?: Date) => {
    try {
      setIsSaving(true)
      setErrorMessage(null)
      
      // Basic validation
      if (!title || !slug || !content) {
        setErrorMessage('Title, slug, and content are required fields')
        return
      }
      
      // Check if slug is unique (excluding this post)
      const { data: existingPost, error: slugCheckError } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)
        .neq('id', postId)
        .single()
      
      if (existingPost) {
        setErrorMessage('Another post with this slug already exists')
        return
      }
      
      // Determine the status and published date
      const finalStatus = newStatus || status
      let finalPublishedAt = publishedAt?.toISOString() || null
      
      if (newStatus === 'published' && status !== 'published') {
        // Newly published post
        finalPublishedAt = new Date().toISOString()
      } else if (newStatus === 'scheduled' && scheduleDate) {
        // Scheduled post
        finalPublishedAt = scheduleDate.toISOString()
      } else if (newStatus === 'draft' && status !== 'draft') {
        // Unpublishing a post
        finalPublishedAt = null
      }
      
      // Update the post
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({
          title,
          slug,
          content,
          excerpt,
          meta_title: metaTitle || title,
          meta_description: metaDescription || excerpt,
          featured_image: featuredImage,
          status: finalStatus,
          updated_at: new Date().toISOString(),
          published_at: finalPublishedAt
        })
        .eq('id', postId)
      
      if (updateError) throw updateError
      
      // Get or create tags
      const tagIds = await getOrCreateTags(tags)
      
      // Delete existing tag relations
      const { error: deleteTagsError } = await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', postId)
      
      if (deleteTagsError) throw deleteTagsError
      
      // Create new tag relations
      if (tagIds.length > 0) {
        const tagRelations = tagIds.map(tagId => ({
          post_id: postId,
          tag_id: tagId
        }))
        
        const { error: insertTagsError } = await supabase
          .from('blog_post_tags')
          .insert(tagRelations)
        
        if (insertTagsError) throw insertTagsError
      }
      
      // Update local state
      setStatus(finalStatus)
      setPublishedAt(finalPublishedAt ? new Date(finalPublishedAt) : null)
      setSuccessMessage('Post updated successfully!')
      
      // If status changed to published, redirect back to list
      if (newStatus === 'published' && status !== 'published') {
        router.push('/admin/blog?success=publish')
      }
    } catch (err: any) {
      console.error('Error saving post:', err)
      setErrorMessage(err.message || 'Failed to save post')
    } finally {
      setIsSaving(false)
    }
  }
  
  // Save as draft
  const saveDraft = async () => {
    await saveChanges('draft')
  }
  
  // Publish post
  const publishPost = async (scheduleDate?: Date) => {
    if (scheduleDate && scheduleDate > new Date()) {
      await saveChanges('scheduled', scheduleDate)
    } else {
      await saveChanges('published')
    }
  }
  
  // Preview post
  const previewPost = () => {
    // Open a new window with a preview
    // In a real implementation, this would use a preview API route
    window.open(`/blog/${slug}?preview=true`, '_blank')
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <span className="ml-2 text-lg font-medium text-gray-700">Loading post...</span>
      </div>
    )
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
        </div>
        
        <div className="flex items-center">
          <Link href={`/blog/${slug}`} target="_blank">
            <Button variant="outline" size="sm">
              View Published Post
            </Button>
          </Link>
        </div>
      </div>
      
      {errorMessage && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          {errorMessage}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-50 text-green-800 p-4 rounded-md flex items-center">
          <CheckCircle size={16} className="mr-2" />
          {successMessage}
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
            status={status}
            publishedAt={publishedAt}
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