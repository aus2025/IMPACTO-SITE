'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Plus, Copy, Edit, Archive, Eye, ChevronDown, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

// Define assessment form types
type FormStatus = 'active' | 'draft' | 'archived'
type StatusFilterValue = FormStatus | 'all'

interface FormVersion {
  version: number
  created_at: string
  status: FormStatus
  created_by: string
}

interface AssessmentForm {
  id: number
  name: string
  current_version: number
  status: FormStatus
  created_at: string
  updated_at: string
  created_by: string
  versions: FormVersion[]
  sections: {
    contact: any
    business_info: any
    automation_needs: any
    budget: any
    additional_info: any
  }
}

export default function AssessmentFormsPage() {
  const supabase = createClient()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [forms, setForms] = useState<AssessmentForm[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  
  // Parse search parameters
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1
  const perPage = searchParams.get('perPage') ? parseInt(searchParams.get('perPage') as string) : 10
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') as StatusFilterValue || 'all'
  const sortBy = searchParams.get('sortBy') || 'updated_at'
  const sortOrder = searchParams.get('sortOrder') || 'desc'

  // For demonstration - mock data
  // In production, this would be replaced with actual API calls
  useEffect(() => {
    async function fetchForms() {
      setLoading(true)
      
      try {
        // This would be a real API call in production
        // For now, we'll simulate the API with mock data
        
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const mockForms: AssessmentForm[] = [
          {
            id: 1,
            name: 'Standard Business Assessment',
            current_version: 3,
            status: 'active',
            created_at: '2023-11-01T14:30:00Z',
            updated_at: '2023-12-15T09:45:00Z',
            created_by: 'John Doe',
            versions: [
              { version: 3, created_at: '2023-12-15T09:45:00Z', status: 'active', created_by: 'John Doe' },
              { version: 2, created_at: '2023-11-28T11:22:00Z', status: 'archived', created_by: 'John Doe' },
              { version: 1, created_at: '2023-11-01T14:30:00Z', status: 'archived', created_by: 'John Doe' },
            ],
            sections: {
              contact: { fields: ['name', 'email', 'phone', 'company', 'role'] },
              business_info: { fields: ['industry', 'employees', 'goals', 'compliance_concerns'] },
              automation_needs: { fields: ['automation_areas', 'automation_experience'] },
              budget: { fields: ['budget_range', 'decision_timeline'] },
              additional_info: { fields: ['additional_comments', 'consent'] }
            }
          },
          {
            id: 2,
            name: 'Healthcare Industry Assessment',
            current_version: 1,
            status: 'draft',
            created_at: '2023-12-10T16:20:00Z',
            updated_at: '2023-12-12T13:15:00Z',
            created_by: 'Jane Smith',
            versions: [
              { version: 1, created_at: '2023-12-10T16:20:00Z', status: 'draft', created_by: 'Jane Smith' },
            ],
            sections: {
              contact: { fields: ['name', 'email', 'phone', 'company', 'role'] },
              business_info: { fields: ['industry', 'employees', 'healthcare_specialization', 'compliance_concerns'] },
              automation_needs: { fields: ['automation_areas', 'automation_experience', 'patient_data_handling'] },
              budget: { fields: ['budget_range', 'decision_timeline', 'grant_funding'] },
              additional_info: { fields: ['additional_comments', 'consent', 'hipaa_consent'] }
            }
          },
          {
            id: 3,
            name: 'E-commerce Assessment',
            current_version: 2,
            status: 'active',
            created_at: '2023-10-05T11:00:00Z',
            updated_at: '2023-11-20T14:30:00Z',
            created_by: 'Alex Johnson',
            versions: [
              { version: 2, created_at: '2023-11-20T14:30:00Z', status: 'active', created_by: 'Alex Johnson' },
              { version: 1, created_at: '2023-10-05T11:00:00Z', status: 'archived', created_by: 'Alex Johnson' },
            ],
            sections: {
              contact: { fields: ['name', 'email', 'phone', 'company', 'role'] },
              business_info: { fields: ['industry', 'employees', 'online_presence', 'sales_volume'] },
              automation_needs: { fields: ['automation_areas', 'inventory_management', 'customer_service'] },
              budget: { fields: ['budget_range', 'decision_timeline', 'roi_expectations'] },
              additional_info: { fields: ['additional_comments', 'consent'] }
            }
          },
          {
            id: 4,
            name: 'Manufacturing Assessment',
            current_version: 1,
            status: 'archived',
            created_at: '2023-09-15T09:20:00Z',
            updated_at: '2023-09-15T09:20:00Z',
            created_by: 'Robert Chen',
            versions: [
              { version: 1, created_at: '2023-09-15T09:20:00Z', status: 'archived', created_by: 'Robert Chen' },
            ],
            sections: {
              contact: { fields: ['name', 'email', 'phone', 'company', 'role'] },
              business_info: { fields: ['industry', 'employees', 'manufacturing_type', 'supply_chain'] },
              automation_needs: { fields: ['automation_areas', 'production_workflows', 'quality_control'] },
              budget: { fields: ['budget_range', 'decision_timeline', 'expected_savings'] },
              additional_info: { fields: ['additional_comments', 'consent'] }
            }
          },
        ]
        
        // Apply filters to mock data
        let filteredForms = [...mockForms]
        
        if (search) {
          const searchLower = search.toLowerCase()
          filteredForms = filteredForms.filter(form => 
            form.name.toLowerCase().includes(searchLower) ||
            form.created_by.toLowerCase().includes(searchLower)
          )
        }
        
        if (status && status !== 'all') {
          filteredForms = filteredForms.filter(form => form.status === status)
        }
        
        // Apply sorting
        filteredForms.sort((a, b) => {
          const aValue = a[sortBy as keyof AssessmentForm]
          const bValue = b[sortBy as keyof AssessmentForm]
          
          const comparison = sortOrder === 'asc'
            ? aValue < bValue ? -1 : aValue > bValue ? 1 : 0
            : aValue > bValue ? -1 : aValue < bValue ? 1 : 0
            
          return comparison
        })
        
        // Apply pagination
        const paginatedForms = filteredForms.slice((page - 1) * perPage, page * perPage)
        
        setForms(paginatedForms)
        setTotalCount(filteredForms.length)
      } catch (error) {
        console.error('Error fetching assessment forms:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchForms()
  }, [page, perPage, search, status, sortBy, sortOrder])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/admin/assessments/forms?${params.toString()}`)
  }

  const handleFilterChange = (filters: any) => {
    const params = new URLSearchParams()
    
    // Reset to page 1 when filters change
    params.set('page', '1')
    
    // Add all current filters
    if (filters.search) params.set('search', filters.search)
    if (filters.status) params.set('status', filters.status)
    if (filters.sortBy) params.set('sortBy', filters.sortBy)
    if (filters.sortOrder) params.set('sortOrder', filters.sortOrder)
    if (filters.perPage) params.set('perPage', filters.perPage.toString())
    
    router.push(`/admin/assessments/forms?${params.toString()}`)
  }

  const createNewForm = () => {
    router.push('/admin/assessments/forms/builder')
  }
  
  const createStandardForm = () => {
    router.push('/admin/assessments/forms/standard')
  }

  const getStatusBadge = (status: FormStatus) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case 'draft':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Draft</Badge>
      case 'archived':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Archived</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assessment Forms</h1>
        <div className="flex gap-3">
          <Button 
            onClick={createStandardForm}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Copy className="w-4 h-4 mr-2" />
            Standard Form
          </Button>
          <Button 
            onClick={createNewForm}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Form
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-5 border rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="search" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search forms..."
                  value={search}
                  onChange={(e) => handleFilterChange({ ...searchParams, search: e.target.value })}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="status-filter" className="text-sm font-medium">
                Status
              </label>
              <Select
                value={status}
                onValueChange={(value: StatusFilterValue) => handleFilterChange({ ...searchParams, status: value })}
              >
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="w-full md:w-1/4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="sort-by" className="text-sm font-medium">
                Sort by
              </label>
              <Select
                value={sortBy}
                onValueChange={(value) => handleFilterChange({ 
                  ...searchParams, 
                  sortBy: value,
                  sortOrder: sortBy === value && sortOrder === 'desc' ? 'asc' : 'desc'
                })}
              >
                <SelectTrigger id="sort-by">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated_at">Last Updated</SelectItem>
                  <SelectItem value="created_at">Created Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="current_version">Version</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="per-page" className="text-sm font-medium">
                Per page
              </label>
              <Select
                value={perPage.toString()}
                onValueChange={(value) => handleFilterChange({ ...searchParams, perPage: value })}
              >
                <SelectTrigger id="per-page" className="w-[80px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data table */}
      <Card className="shadow-sm border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : forms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No assessment forms found.
                  </TableCell>
                </TableRow>
              ) : (
                forms.map((form) => (
                  <TableRow key={form.id}>
                    <TableCell className="font-medium">{form.name}</TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" className="flex items-center gap-1 px-2 h-7">
                            v{form.current_version}
                            <ChevronDown size={14} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0">
                          <div className="p-3 border-b">
                            <h3 className="font-medium">Version History</h3>
                          </div>
                          <div className="max-h-72 overflow-auto">
                            {form.versions.map((version) => (
                              <div key={version.version} className="flex justify-between items-center p-3 hover:bg-gray-50 border-b last:border-b-0">
                                <div>
                                  <div className="font-medium">Version {version.version}</div>
                                  <div className="text-xs text-gray-500">{formatDate(version.created_at)}</div>
                                  <div className="text-xs text-gray-500">By {version.created_by}</div>
                                </div>
                                <div>{getStatusBadge(version.status)}</div>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell>{getStatusBadge(form.status)}</TableCell>
                    <TableCell>{formatDate(form.created_at)}</TableCell>
                    <TableCell>{formatDate(form.updated_at)}</TableCell>
                    <TableCell>{form.created_by}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/admin/assessments/forms/${form.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Preview</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/assessments/forms/${form.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Duplicate</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            <span>{form.status === 'archived' ? 'Reactivate' : 'Archive'}</span>
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
      </Card>
      
      {/* Pagination */}
      {totalCount > perPage && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing {((page - 1) * perPage) + 1} to {Math.min(page * perPage, totalCount)} of {totalCount} forms
          </div>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 h-8"
            >
              Previous
            </Button>
            {Array.from({ length: Math.ceil(totalCount / perPage) }).map((_, index) => (
              <Button
                key={index}
                variant={page === index + 1 ? "default" : "outline"}
                onClick={() => handlePageChange(index + 1)}
                className="px-3 h-8 min-w-[32px]"
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= Math.ceil(totalCount / perPage)}
              className="px-3 h-8"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 