'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Check, X, Loader2 } from 'lucide-react'

interface StatusUpdaterProps {
  leadId: number
  currentStatus: string | null
  onStatusUpdate: (newStatus: string) => void
}

export default function StatusUpdater({
  leadId,
  currentStatus,
  onStatusUpdate
}: StatusUpdaterProps) {
  const supabase = createClient()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || 'New')
  
  const statusOptions = [
    { value: 'New', label: 'New', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'Contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'Qualified', label: 'Qualified', color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'Closed', label: 'Closed', color: 'bg-gray-100 text-gray-800 border-gray-200' }
  ]
  
  // Get current status info
  const currentStatusInfo = statusOptions.find(option => option.value === (currentStatus || 'New')) || statusOptions[0]
  
  const updateStatus = async () => {
    if (selectedStatus === currentStatus) {
      setIsOpen(false)
      return
    }
    
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          status: selectedStatus,
          // Optionally update last_contacted if status is changing to 'Contacted'
          ...(selectedStatus === 'Contacted' && { last_contacted: new Date().toISOString() })
        })
        .eq('id', leadId)
      
      if (error) {
        throw error
      }
      
      onStatusUpdate(selectedStatus)
      setIsOpen(false)
    } catch (error) {
      console.error('Error updating lead status:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="relative">
      {/* Status badge that toggles dropdown when clicked */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${currentStatusInfo.color} px-3 py-1.5 font-medium text-sm rounded-full border hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
      >
        {currentStatus || 'New'}
      </button>
      
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {statusOptions.map(option => (
              <button
                key={option.value}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center ${
                  selectedStatus === option.value ? 'bg-gray-50' : ''
                }`}
                onClick={() => setSelectedStatus(option.value)}
                role="menuitem"
              >
                <span 
                  className={`h-2 w-2 rounded-full mr-2 ${
                    option.value === 'New' ? 'bg-blue-500' :
                    option.value === 'Contacted' ? 'bg-yellow-500' :
                    option.value === 'Qualified' ? 'bg-green-500' :
                    'bg-gray-500'
                  }`} 
                />
                {option.label}
                {selectedStatus === option.value && (
                  <Check size={16} className="ml-auto text-green-500" />
                )}
              </button>
            ))}
          </div>
          
          <div className="border-t border-gray-100 p-2 flex space-x-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex justify-center items-center px-3 py-1 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-1/2"
            >
              <X size={14} className="mr-1" />
              Cancel
            </button>
            <button
              type="button"
              onClick={updateStatus}
              disabled={isLoading}
              className="inline-flex justify-center items-center px-3 py-1 text-xs font-medium rounded-md border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={14} className="animate-spin mr-1" />
              ) : (
                <Check size={14} className="mr-1" />
              )}
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 