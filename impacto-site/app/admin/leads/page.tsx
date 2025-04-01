'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import LeadTable from '@/components/admin/leads/LeadTable'
import LeadFilters from '@/components/admin/leads/LeadFilters'
import { useSearchParams, useRouter } from 'next/navigation'
import { Download } from 'lucide-react'

export type Lead = {
  id: number
  created_at: string
  name: string
  email: string
  phone: string | null
  service_interest: string | null
  message: string
  status: string | null
  notes: string | null
  last_contacted: string | null
}

// Create a proper interface for filters instead of using 'any'
interface LeadFilters {
  search?: string
  status?: string
  startDate?: string
  endDate?: string
  sortBy?: string
  sortOrder?: string // Changed from 'asc' | 'desc' to string to match usage
  perPage?: number
}

export default function LeadsPage() {
  const supabase = createClient()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isExporting, setIsExporting] = useState(false)
  
  // Parse search parameters with null checks
  const page = searchParams?.get('page') ? parseInt(searchParams.get('page') as string) : 1
  const perPage = searchParams?.get('perPage') ? parseInt(searchParams.get('perPage') as string) : 10
  const search = searchParams?.get('search') || ''
  const status = searchParams?.get('status') || ''
  const startDate = searchParams?.get('startDate') || ''
  const endDate = searchParams?.get('endDate') || ''
  const sortBy = searchParams?.get('sortBy') || 'created_at'
  const sortOrder = searchParams?.get('sortOrder') || 'desc'

  // Convert to useCallback to fix dependency issues
  const fetchLeads = useCallback(async () => {
    setLoading(true)
    
    try {
      // Build the query
      let query = supabase
        .from('leads')
        .select('*', { count: 'exact' })
      
      // Apply filters
      if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,service_interest.ilike.%${search}%`)
      }
      
      if (status) {
        query = query.eq('status', status)
      }
      
      if (startDate) {
        query = query.gte('created_at', startDate)
      }
      
      if (endDate) {
        // Add one day to include the end date
        const nextDay = new Date(endDate)
        nextDay.setDate(nextDay.getDate() + 1)
        const endDateFormatted = nextDay.toISOString()
        query = query.lt('created_at', endDateFormatted)
      }
      
      // Apply sorting - Fix the type by using proper typing for sortBy
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })
      
      // Apply pagination
      const from = (page - 1) * perPage
      const to = from + perPage - 1
      query = query.range(from, to)
      
      const { data, error, count } = await query
      
      if (error) {
        throw error
      }
      
      setLeads(data || [])
      setTotalCount(count || 0)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }, [page, perPage, search, status, startDate, endDate, sortBy, sortOrder, supabase]);

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const exportToCsv = async () => {
    try {
      setIsExporting(true)
      
      // Fetch all leads for export (respecting filters but ignoring pagination)
      let query = supabase.from('leads').select('*')
      
      // Apply the same filters as the table
      if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,service_interest.ilike.%${search}%`)
      }
      
      if (status) {
        query = query.eq('status', status)
      }
      
      if (startDate) {
        query = query.gte('created_at', startDate)
      }
      
      if (endDate) {
        const nextDay = new Date(endDate)
        nextDay.setDate(nextDay.getDate() + 1)
        const endDateFormatted = nextDay.toISOString()
        query = query.lt('created_at', endDateFormatted)
      }
      
      // Apply the same sorting - fixing type issue
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })
      
      const { data, error } = await query
      
      if (error) throw error
      
      if (data && data.length > 0) {
        // Format data for CSV
        const headers = [
          'ID', 'Name', 'Email', 'Phone', 'Service Interest', 
          'Message', 'Status', 'Created At', 'Last Contacted', 'Notes'
        ]
        
        const csvRows = [
          headers.join(','),
          ...data.map(lead => [
            lead.id,
            `"${lead.name.replace(/"/g, '""')}"`,
            `"${lead.email.replace(/"/g, '""')}"`,
            lead.phone ? `"${lead.phone.replace(/"/g, '""')}"` : '',
            lead.service_interest ? `"${lead.service_interest.replace(/"/g, '""')}"` : '',
            `"${lead.message.replace(/"/g, '""')}"`,
            lead.status ? `"${lead.status.replace(/"/g, '""')}"` : '',
            new Date(lead.created_at).toLocaleDateString(),
            lead.last_contacted ? new Date(lead.last_contacted).toLocaleDateString() : '',
            lead.notes ? `"${lead.notes.replace(/"/g, '""')}"` : ''
          ].join(','))
        ]
        
        const csvString = csvRows.join('\n')
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', `impacto-leads-${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Error exporting leads:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    if (!searchParams) return
    
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/admin/leads?${params.toString()}`)
  }

  const handleFilterChange = (filters: LeadFilters) => {
    const params = new URLSearchParams()
    
    // Reset to page 1 when filters change
    params.set('page', '1')
    
    // Add all current filters
    if (filters.search) params.set('search', filters.search)
    if (filters.status) params.set('status', filters.status)
    if (filters.startDate) params.set('startDate', filters.startDate)
    if (filters.endDate) params.set('endDate', filters.endDate)
    if (filters.sortBy) params.set('sortBy', filters.sortBy)
    if (filters.sortOrder) params.set('sortOrder', filters.sortOrder)
    if (filters.perPage) params.set('perPage', filters.perPage.toString())
    
    router.push(`/admin/leads?${params.toString()}`)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-4 sm:mb-0">Lead Management</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={exportToCsv}
            disabled={isExporting || loading || leads.length === 0}
            className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} className="mr-2" />
            {isExporting ? 'Exporting...' : 'Export to CSV'}
          </button>
        </div>
      </div>
      
      <LeadFilters 
        onFilterChange={handleFilterChange} 
        initialFilters={{
          search,
          status,
          startDate,
          endDate,
          sortBy,
          sortOrder,
          perPage
        }}
      />
      
      <LeadTable 
        leads={leads}
        loading={loading}
        currentPage={currentPage}
        totalCount={totalCount}
        perPage={perPage}
        onPageChange={handlePageChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={(field) => {
          const newSortOrder = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc'
          handleFilterChange({
            search,
            status,
            startDate, 
            endDate,
            sortBy: field,
            sortOrder: newSortOrder,
            perPage
          })
        }}
      />
    </div>
  )
} 