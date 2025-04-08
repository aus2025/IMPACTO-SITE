'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'
import Link from 'next/link'
import { Loader2, PlusCircle, Search, Filter, MoreHorizontal, Eye, Pencil, Trash2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Badge,
} from '@/components/ui/badge'

// Define case study interface
interface CaseStudy {
  id: string
  title: string
  client: string
  industry: string
  slug: string
  status: 'draft' | 'published'
  created_at: Date
  updated_at: Date
  published_at: Date | null
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [industryFilter, setIndustryFilter] = useState<string>('all')
  const [industries, setIndustries] = useState<string[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  
  const supabase = createClient()
  
  // Fetch case studies data
  const fetchCaseStudies = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('updated_at', { ascending: false })
      
      if (error) throw error
      
      // Transform the dates
      const transformedData = data ? data.map((item) => ({
        ...item,
        created_at: new Date(item.created_at),
        updated_at: new Date(item.updated_at),
        published_at: item.published_at ? new Date(item.published_at) : null
      })) : []
      
      setCaseStudies(transformedData)
      
      // Extract unique industries for filtering
      const uniqueIndustries = data && data.length > 0 
        ? [...new Set(data.map(item => item.industry).filter(Boolean))]
        : []
      setIndustries(uniqueIndustries)
    } catch (err: any) {
      console.error('Error fetching case studies:', err.message || err)
      setError(err.message || 'Failed to fetch case studies')
      setCaseStudies([]) // Ensure we have an empty array to avoid map/filter errors
      setIndustries([])
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchCaseStudies()
  }, [])
  
  // Handle case study deletion
  const handleDelete = async (ids: string[]) => {
    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .in('id', ids)
      
      if (error) throw error
      
      // Refresh the data
      fetchCaseStudies()
      setSelectedItems([])
    } catch (err: any) {
      console.error('Error deleting case studies:', err)
      setError(err.message || 'Failed to delete case studies')
    }
  }
  
  // Handle status change
  const handleStatusChange = async (id: string, status: 'draft' | 'published') => {
    try {
      const updates = {
        status,
        updated_at: new Date().toISOString(),
        published_at: status === 'published' ? new Date().toISOString() : null
      }
      
      const { error } = await supabase
        .from('case_studies')
        .update(updates)
        .eq('id', id)
      
      if (error) throw error
      
      fetchCaseStudies()
    } catch (err: any) {
      console.error('Error updating case study status:', err)
      setError(err.message || 'Failed to update case study status')
    }
  }
  
  // Handle duplication
  const handleDuplicate = async (id: string) => {
    try {
      // Fetch the case study to duplicate
      const { data: caseStudyData, error: fetchError } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', id)
        .single()
      
      if (fetchError) throw fetchError
      
      // Create a new case study with the duplicated data
      const now = new Date().toISOString()
      
      // Remove the id from the original data
      const { id: _, ...dataWithoutId } = caseStudyData
      
      const newCaseStudy = {
        ...dataWithoutId,
        title: `${caseStudyData.title} (Copy)`,
        slug: `${caseStudyData.slug}-copy-${Date.now()}`,
        status: 'draft',
        created_at: now,
        updated_at: now,
        published_at: null
      }
      
      const { error: createError } = await supabase
        .from('case_studies')
        .insert(newCaseStudy)
      
      if (createError) throw createError
      
      fetchCaseStudies()
    } catch (err: any) {
      console.error('Error duplicating case study:', err)
      setError(err.message || 'Failed to duplicate case study')
    }
  }
  
  // Toggle item selection
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    )
  }
  
  // Toggle all items selection
  const toggleAllSelection = () => {
    if (selectedItems.length === filteredCaseStudies.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredCaseStudies.map(item => item.id))
    }
  }
  
  // Filter case studies based on search and filters
  const filteredCaseStudies = caseStudies.filter(caseStudy => {
    const matchesSearch = 
      searchQuery === '' || 
      caseStudy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseStudy.client.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = 
      statusFilter === 'all' || 
      caseStudy.status === statusFilter
    
    const matchesIndustry = 
      industryFilter === 'all' || 
      caseStudy.industry === industryFilter
    
    return matchesSearch && matchesStatus && matchesIndustry
  })
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <span className="ml-2 text-lg font-medium text-gray-700">Loading case studies...</span>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-md">
        <p className="font-medium">Error loading case studies</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Case Studies Management</h1>
        <Link href="/admin/case-studies/new">
          <Button className="flex items-center gap-1">
            <PlusCircle size={16} />
            <span>New Case Study</span>
          </Button>
        </Link>
      </div>
      
      {/* Filter and search bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by title or client..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      
      {/* Case studies table */}
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                    checked={selectedItems.length === filteredCaseStudies.length && filteredCaseStudies.length > 0}
                    onChange={toggleAllSelection}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCaseStudies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No case studies found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCaseStudies.map((caseStudy) => (
                  <TableRow key={caseStudy.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300"
                        checked={selectedItems.includes(caseStudy.id)}
                        onChange={() => toggleItemSelection(caseStudy.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{caseStudy.title}</TableCell>
                    <TableCell>{caseStudy.client}</TableCell>
                    <TableCell>{caseStudy.industry}</TableCell>
                    <TableCell>
                      <Badge variant={caseStudy.status === 'published' ? 'success' : 'secondary'}>
                        {caseStudy.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(caseStudy.updated_at, 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/case-studies/${caseStudy.slug}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/case-studies/${caseStudy.id}/edit`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(caseStudy.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Duplicate</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(
                              caseStudy.id, 
                              caseStudy.status === 'published' ? 'draft' : 'published'
                            )}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>
                              {caseStudy.status === 'published' ? 'Unpublish' : 'Publish'}
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete([caseStudy.id])}
                            className="text-red-600 hover:text-red-700 focus:text-red-700"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Bulk actions */}
        {selectedItems.length > 0 && (
          <div className="bg-gray-50 px-4 py-3 border-t rounded-b-md flex items-center justify-between">
            <span className="text-sm text-gray-700">
              {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const selectedCaseStudies = caseStudies.filter(item => 
                    selectedItems.includes(item.id)
                  )
                  const allPublished = selectedCaseStudies.every(item => 
                    item.status === 'published'
                  )
                  
                  // Update all selected items to the opposite of their current majority status
                  Promise.all(
                    selectedItems.map(id => 
                      handleStatusChange(id, allPublished ? 'draft' : 'published')
                    )
                  )
                }}
              >
                {caseStudies.filter(item => 
                  selectedItems.includes(item.id) && item.status === 'published'
                ).length > selectedItems.length / 2
                  ? 'Unpublish All'
                  : 'Publish All'
                }
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(selectedItems)}
              >
                Delete Selected
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
} 