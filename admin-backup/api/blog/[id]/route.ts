import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies()
  const supabase = createClient()
  const id = params.id
  
  try {
    // First try to get the post directly
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(id, name),
        blog_post_tags(tags(id, name))
      `)
      .eq('id', id)
      .single()
    
    if (error) {
      // If not found by ID, try finding by slug
      const { data: postBySlug, error: slugError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles(id, name),
          blog_post_tags(tags(id, name))
        `)
        .eq('slug', id)
        .single()
      
      if (slugError) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(postBySlug)
    }
    
    return NextResponse.json(post)
  } catch (error: any) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies()
  const supabase = createClient()
  const id = params.id
  
  try {
    // Verify user is admin
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Check if user has admin role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }
    
    // Parse request body
    const {
      title,
      slug,
      content,
      excerpt,
      meta_title,
      meta_description,
      featured_image,
      status,
      published_at,
      tags
    } = await request.json()
    
    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug and content are required' },
        { status: 400 }
      )
    }
    
    // Check if slug is unique (excluding this post)
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .neq('id', id)
      .single()
    
    if (existingPost) {
      return NextResponse.json(
        { error: 'Another post with this slug already exists' },
        { status: 400 }
      )
    }
    
    // Update the post
    const { data: post, error: updateError } = await supabase
      .from('blog_posts')
      .update({
        title,
        slug,
        content,
        excerpt,
        meta_title,
        meta_description,
        featured_image,
        status,
        published_at,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (updateError) {
      throw updateError
    }
    
    // Process tags if provided
    if (tags && Array.isArray(tags)) {
      // First, delete existing tag relations
      const { error: deleteError } = await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', id)
      
      if (deleteError) {
        throw deleteError
      }
      
      // Then create new tag relations
      const tagIds = []
      
      for (const tagName of tags) {
        // Check if tag exists
        const { data: existingTag } = await supabase
          .from('tags')
          .select('id')
          .eq('name', tagName)
          .single()
        
        if (existingTag) {
          tagIds.push(existingTag.id)
        } else {
          // Create new tag
          const { data: newTag, error: tagError } = await supabase
            .from('tags')
            .insert({ name: tagName })
            .select()
            .single()
          
          if (tagError) {
            throw tagError
          }
          
          tagIds.push(newTag.id)
        }
      }
      
      // Associate tags with post
      if (tagIds.length > 0) {
        const tagRelations = tagIds.map(tagId => ({
          post_id: id,
          tag_id: tagId
        }))
        
        const { error: relationsError } = await supabase
          .from('blog_post_tags')
          .insert(tagRelations)
        
        if (relationsError) {
          throw relationsError
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      post
    })
  } catch (error: any) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies()
  const supabase = createClient()
  const id = params.id
  
  try {
    // Verify user is admin
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Check if user has admin role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }
    
    // Delete tags relations first (foreign key constraint)
    const { error: tagsError } = await supabase
      .from('blog_post_tags')
      .delete()
      .eq('post_id', id)
    
    if (tagsError) {
      throw tagsError
    }
    
    // Delete the post
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (deleteError) {
      throw deleteError
    }
    
    return NextResponse.json({
      success: true
    })
  } catch (error: any) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}