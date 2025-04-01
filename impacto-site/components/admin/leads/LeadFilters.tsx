'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'

interface LeadFiltersProps {
  onFilterChange: (filters: {
    search?: string
    status?: string
    startDate?: string
    endDate?: string
    sortBy?: string
    sortOrder?: string
    perPage?: number
  }) => void
  initialFilters: {
    search: string
    status: string
    startDate: string
    endDate: string
    sortBy: string
    sortOrder: string
    perPage: number
  }
}

export default function LeadFilters({
  onFilterChange,
  initialFilters
}: LeadFiltersProps) {
  // Initialize state with initial filters
  const [filters, setFilters] = useState({
    search: initialFilters.search || '',
    status: initialFilters.status || '',
    startDate: initialFilters.startDate || '',
    endDate: initialFilters.endDate || '',
    sortBy: initialFilters.sortBy || 'created_at',
    sortOrder: initialFilters.sortOrder || 'desc',
    perPage: initialFilters.perPage || 10
  })
  
  // Status options
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Closed', label: 'Closed' }
  ]
  
  // Per page options
  const perPageOptions = [
    { value: 10, label: '10 per page' },
    { value: 25, label: '25 per page' },
    { value: 50, label: '50 per page' },
    { value: 100, label: '100 per page' }
  ]
  
  // Handle input changes
  const handleChange = (name: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilterChange(filters)
  }
  
  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      status: '',
      startDate: '',
      endDate: '',
      sortBy: 'created_at',
      sortOrder: 'desc',
      perPage: 10
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }
  
  // Check if any filters are active
  const hasActiveFilters = 
    filters.search !== '' || 
    filters.status !== '' || 
    filters.startDate !== '' || 
    filters.endDate !== ''
  
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search input */}
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={filters.search}
                onChange={(e) => handleChange('search', e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-gray-900"
                placeholder="Search by name, email, or service..."
              />
            </div>
          </div>
          
          {/* Status filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Date range filters */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
              min={filters.startDate}
            />
          </div>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 w-full sm:w-auto mb-3 sm:mb-0">
            {/* Results per page */}
            <div className="w-full sm:w-auto">
              <select
                id="perPage"
                name="perPage"
                value={filters.perPage}
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  handleChange('perPage', value)
                  // Apply this filter immediately
                  onFilterChange({
                    ...filters,
                    perPage: value
                  })
                }}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900"
              >
                {perPageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </button>
            )}
            
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Search className="h-4 w-4 mr-1" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </form>
  )
} 