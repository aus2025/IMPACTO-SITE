import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const status = searchParams.get('status')
  const tag = searchParams.get('tag')
  const search = searchParams.get('search')
  const sortBy = searchParams.get('sortBy') || 'updated_at'
  const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc'
  
  // Calculate pagination
  const from = (page - 1) * limit
  const to = from + limit - 1
  
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
    
    // Build the query
    let query = supabase
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
        author:profiles(id, name),
        blog_post_tags(tag_id, tags(name))
      `, { count: 'exact' })
    
    // Apply filters
    if (status) {
      query = query.eq('status', status)
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`)
    }
    
    // Filter by tag if provided
    if (tag) {
      query = query
        .eq('blog_post_tags.tags.name', tag)
    }
    
    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })
    
    // Apply pagination
    query = query.range(from, to)
    
    const { data, count, error } = await query
    
    if (error) {
      throw error
    }
    
    // Transform the data to a more frontend-friendly format
    const formattedPosts = data.map(post => {
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        status: post.status,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        publishedAt: post.published_at,
        author: {
          id: post.author.id,
          name: post.author.name
        },
        tags: post.blog_post_tags.map((postTag: any) => postTag.tags.name)
      }
    })
    
    return NextResponse.json({
      posts: formattedPosts,
      total: count,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    })
  } catch (error: any) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient()
  
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
      tags
    } = await request.json()
    
    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug and content are required' },
        { status: 400 }
      )
    }
    
    // Check if slug is unique
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      )
    }
    
    // Set timestamps
    const now = new Date().toISOString()
    let publishedAt = null
    
    if (status === 'published') {
      publishedAt = now
    } else if (status === 'scheduled' && tags?.publishAt) {
      publishedAt = tags.publishAt
    }
    
    // Create the post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert({
        title,
        slug,
        content,
        excerpt,
        meta_title,
        meta_description,
        featured_image,
        status,
        author_id: user.id,
        created_at: now,
        updated_at: now,
        published_at: publishedAt
      })
      .select()
      .single()
    
    if (postError) {
      throw postError
    }
    
    // Process tags if provided
    if (tags && Array.isArray(tags)) {
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
          post_id: post.id,
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
      postId: post.id
    })
  } catch (error: any) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 