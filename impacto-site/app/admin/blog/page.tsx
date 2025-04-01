'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'
import BlogTable, { BlogPost } from '@/components/admin/blog/BlogTable'
import { Loader2 } from 'lucide-react'

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  
  // Fetch blog posts
  const fetchPosts = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          status,
          created_at,
          updated_at,
          published_at,
          author_id,
          author:users(id, name),
          blog_post_tags(tag_id, tags(name))
        `)
        .order('updated_at', { ascending: false })
      
      if (error) throw error
      
      // Transform the data to match our BlogPost interface
      const transformedPosts = data.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        status: post.status,
        createdAt: new Date(post.created_at),
        updatedAt: new Date(post.updated_at),
        publishedAt: post.published_at ? new Date(post.published_at) : null,
        author: {
          id: post.author.id,
          name: post.author.name
        },
        tags: post.blog_post_tags.map((postTag: any) => postTag.tags.name)
      }))
      
      setPosts(transformedPosts)
    } catch (err: any) {
      console.error('Error fetching blog posts:', err)
      setError(err.message || 'Failed to fetch blog posts')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchPosts()
  }, [])
  
  // Handler for deleting posts
  const handleDelete = async (ids: string[]) => {
    try {
      // Delete post tags first (foreign key constraint)
      const { error: tagsError } = await supabase
        .from('blog_post_tags')
        .delete()
        .in('post_id', ids)
      
      if (tagsError) throw tagsError
      
      // Delete the posts
      const { error: postsError } = await supabase
        .from('blog_posts')
        .delete()
        .in('id', ids)
      
      if (postsError) throw postsError
      
      // Refresh the posts list
      fetchPosts()
    } catch (err: any) {
      console.error('Error deleting posts:', err)
      setError(err.message || 'Failed to delete posts')
    }
  }
  
  // Handler for changing post status
  const handleStatusChange = async (id: string, status: 'draft' | 'published') => {
    try {
      const updates = {
        status,
        updated_at: new Date().toISOString(),
        published_at: status === 'published' ? new Date().toISOString() : null
      }
      
      const { error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
      
      if (error) throw error
      
      // Refresh the posts list
      fetchPosts()
    } catch (err: any) {
      console.error('Error updating post status:', err)
      setError(err.message || 'Failed to update post status')
    }
  }
  
  // Handler for duplicating a post
  const handleDuplicate = async (id: string) => {
    try {
      // Fetch the post to duplicate
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()
      
      if (postError) throw postError
      
      // Fetch the post tags
      const { data: tagsData, error: tagsError } = await supabase
        .from('blog_post_tags')
        .select('tag_id')
        .eq('post_id', id)
      
      if (tagsError) throw tagsError
      
      // Create a new post with the duplicated data
      const now = new Date().toISOString()
      const { data: newPost, error: createError } = await supabase
        .from('blog_posts')
        .insert({
          title: `${postData.title} (Copy)`,
          slug: `${postData.slug}-copy-${Date.now()}`,
          content: postData.content,
          excerpt: postData.excerpt,
          meta_title: postData.meta_title,
          meta_description: postData.meta_description,
          featured_image: postData.featured_image,
          status: 'draft',
          author_id: postData.author_id,
          created_at: now,
          updated_at: now,
          published_at: null
        })
        .select()
      
      if (createError) throw createError
      
      // Duplicate tags
      if (tagsData.length > 0) {
        const newTags = tagsData.map((tag) => ({
          post_id: newPost[0].id,
          tag_id: tag.tag_id
        }))
        
        const { error: insertTagsError } = await supabase
          .from('blog_post_tags')
          .insert(newTags)
        
        if (insertTagsError) throw insertTagsError
      }
      
      // Refresh the posts list
      fetchPosts()
    } catch (err: any) {
      console.error('Error duplicating post:', err)
      setError(err.message || 'Failed to duplicate post')
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <span className="ml-2 text-lg font-medium text-gray-700">Loading posts...</span>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-md">
        <p className="font-medium">Error loading blog posts</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
      </div>
      
      <BlogTable
        posts={posts}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onDuplicate={handleDuplicate}
      />
    </div>
  )
} 