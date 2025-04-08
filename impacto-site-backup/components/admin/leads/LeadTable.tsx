'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown, 
  Loader2 
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Lead } from '@/app/admin/leads/page'

interface LeadTableProps {
  leads: Lead[]
  loading: boolean
  currentPage: number
  totalCount: number
  perPage: number
  onPageChange: (page: number) => void
  sortBy: string
  sortOrder: string
  onSort: (field: string) => void
}

export default function LeadTable({
  leads,
  loading,
  currentPage,
  totalCount,
  perPage,
  onPageChange,
  sortBy,
  sortOrder,
  onSort
}: LeadTableProps) {
  
  const totalPages = Math.ceil(totalCount / perPage)
  
  // Status badge styles
  const getStatusBadgeClass = (status: string | null) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800'
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'Qualified':
        return 'bg-green-100 text-green-800'
      case 'Closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-500'
    }
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true })
  }
  
  // Render sort indicator
  const renderSortIndicator = (field: string) => {
    if (sortBy !== field) return null
    
    return sortOrder === 'asc' 
      ? <ChevronUp className="w-4 h-4 ml-1" /> 
      : <ChevronDown className="w-4 h-4 ml-1" />
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center">
                  Name
                  {renderSortIndicator('name')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('email')}
              >
                <div className="flex items-center">
                  Email
                  {renderSortIndicator('email')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('service_interest')}
              >
                <div className="flex items-center">
                  Service Interest
                  {renderSortIndicator('service_interest')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {renderSortIndicator('status')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('created_at')}
              >
                <div className="flex items-center">
                  Date
                  {renderSortIndicator('created_at')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.length === 0 && !loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                  No leads found matching the current filters.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{lead.name}</div>
                    {lead.phone && (
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.service_interest || 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(lead.status)}`}>
                      {lead.status || 'New'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{Math.min((currentPage - 1) * perPage + 1, totalCount)}</span> to{' '}
                <span className="font-medium">{Math.min(currentPage * perPage, totalCount)}</span> of{' '}
                <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                
                {/* Dynamic page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1; // Show pages 1-5 if few pages
                  } else if (currentPage <= 3) {
                    pageNum = i + 1; // Show pages 1-5 if at start
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i; // Show last 5 pages if at end
                  } else {
                    pageNum = currentPage - 2 + i; // Show 2 pages before and after current
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      aria-current={currentPage === pageNum ? 'page' : undefined}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 