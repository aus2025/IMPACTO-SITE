'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowUpDown, Edit, Eye, Trash, 
  Copy, MoreHorizontal, Check, X,
  Calendar, Clock
} from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card } from '@/components/ui/card'

// Define the blog post type
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  status: 'draft' | 'published' | 'scheduled'
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
  author: {
    id: string
    name: string
  }
  tags: string[]
}

interface BlogTableProps {
  posts: BlogPost[]
  onDelete: (ids: string[]) => Promise<void>
  onStatusChange: (id: string, status: 'draft' | 'published') => Promise<void>
  onDuplicate: (id: string) => Promise<void>
}

export default function BlogTable({ 
  posts,
  onDelete,
  onStatusChange,
  onDuplicate
}: BlogTableProps) {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('updatedAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isChangingStatus, setIsChangingStatus] = useState(false)

  // Helper function to format dates
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A'
    return format(date, 'MMM d, yyyy')
  }

  // Helper function to format statuses
  const formatStatus = (status: string, date: Date | null) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check size={12} className="mr-1" /> Published
          </span>
        )
      case 'draft':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <X size={12} className="mr-1" /> Draft
          </span>
        )
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Calendar size={12} className="mr-1" /> Scheduled
            {date && <span className="ml-1">({format(date, 'MMM d')})</span>}
          </span>
        )
      default:
        return status
    }
  }

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesStatus = statusFilter === 'all' || post.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof BlogPost]
      let bValue: any = b[sortBy as keyof BlogPost]
      
      // Handle dates specifically
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc' 
          ? aValue.getTime() - bValue.getTime() 
          : bValue.getTime() - aValue.getTime()
      }
      
      // Handle strings
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue)
      }
      
      return 0
    })

  // Toggle post selection
  const toggleSelect = (id: string) => {
    setSelectedPosts(prev => 
      prev.includes(id) 
        ? prev.filter(postId => postId !== id) 
        : [...prev, id]
    )
  }

  // Toggle all posts selection
  const toggleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id))
    }
  }

  // Handle batch delete
  const handleBatchDelete = async () => {
    if (selectedPosts.length === 0) return
    
    try {
      setIsDeleting(true)
      await onDelete(selectedPosts)
      setSelectedPosts([])
    } catch (error) {
      console.error('Error deleting posts:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  // Handle batch publish/unpublish
  const handleBatchStatusChange = async (status: 'draft' | 'published') => {
    if (selectedPosts.length === 0) return
    
    try {
      setIsChangingStatus(true)
      await Promise.all(
        selectedPosts.map(id => onStatusChange(id, status))
      )
    } catch (error) {
      console.error(`Error changing post status to ${status}:`, error)
    } finally {
      setIsChangingStatus(false)
    }
  }

  // Toggle sort
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDirection('asc')
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters and actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select 
            value={statusFilter}
            onValueChange={setStatusFilter}
            items={[
              { value: 'all', label: 'All Status' },
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Draft' },
              { value: 'scheduled', label: 'Scheduled' }
            ]}
            className="w-40"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {selectedPosts.length > 0 && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBatchStatusChange('published')}
                disabled={isChangingStatus}
              >
                Publish
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBatchStatusChange('draft')}
                disabled={isChangingStatus}
              >
                Unpublish
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 border-red-200 hover:bg-red-50"
                onClick={handleBatchDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </>
          )}
          <Link href="/admin/blog/new">
            <Button size="sm">New Post</Button>
          </Link>
        </div>
      </div>
      
      {/* Posts table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left w-10">
                  <Checkbox
                    checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all posts"
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => toggleSort('title')}
                  >
                    <span>Title</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => toggleSort('status')}
                  >
                    <span>Status</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center space-x-1 font-medium"
                    onClick={() => toggleSort('updatedAt')}
                  >
                    <span>Last Updated</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No posts found
                  </td>
                </tr>
              ) : (
                filteredPosts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedPosts.includes(post.id)}
                        onCheckedChange={() => toggleSelect(post.id)}
                        aria-label={`Select ${post.title}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{post.title}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-block mr-1 px-1.5 py-0.5 rounded bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{post.author.name}</td>
                    <td className="px-4 py-3">{formatStatus(post.status, post.publishedAt)}</td>
                    <td className="px-4 py-3 text-gray-700">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-gray-400" />
                        {formatDate(post.updatedAt)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center space-x-2">
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit size={15} />
                          </Button>
                        </Link>
                        
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye size={15} />
                          </Button>
                        </Link>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => onDuplicate(post.id)}
                        >
                          <Copy size={15} />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => onDelete([post.id])}
                        >
                          <Trash size={15} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
} 