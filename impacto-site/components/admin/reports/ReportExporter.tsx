'use client'

import { useState } from 'react'
import { Download, FilePdf, FileSpreadsheet, Send, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface ReportExporterProps {
  dateRange: {
    startDate: Date
    endDate: Date
  }
  onGeneratePdf: () => Promise<void>
  onGenerateCsv: () => Promise<void>
  onScheduleEmail?: (email: string, frequency: string) => Promise<void>
  loading?: boolean
}

export default function ReportExporter({
  dateRange,
  onGeneratePdf,
  onGenerateCsv,
  onScheduleEmail,
  loading = false
}: ReportExporterProps) {
  const [isExportingPdf, setIsExportingPdf] = useState(false)
  const [isExportingCsv, setIsExportingCsv] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState('')
  const [frequency, setFrequency] = useState('weekly')
  const [schedulingEmail, setSchedulingEmail] = useState(false)
  
  const handleGeneratePdf = async () => {
    setIsExportingPdf(true)
    try {
      await onGeneratePdf()
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsExportingPdf(false)
    }
  }
  
  const handleGenerateCsv = async () => {
    setIsExportingCsv(true)
    try {
      await onGenerateCsv()
    } catch (error) {
      console.error('Error generating CSV:', error)
    } finally {
      setIsExportingCsv(false)
    }
  }
  
  const handleScheduleEmail = async () => {
    if (!email || !frequency) return
    
    setSchedulingEmail(true)
    try {
      if (onScheduleEmail) {
        await onScheduleEmail(email, frequency)
      }
      setShowEmailModal(false)
      setEmail('')
    } catch (error) {
      console.error('Error scheduling email report:', error)
    } finally {
      setSchedulingEmail(false)
    }
  }
  
  const formattedDateRange = `${format(dateRange.startDate, 'MMM dd, yyyy')} - ${format(dateRange.endDate, 'MMM dd, yyyy')}`
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Export Lead Report</h3>
          <p className="text-sm text-gray-500 mt-1">
            Generate and download reports for the period: {formattedDateRange}
          </p>
        </div>
        <div className="flex items-center mt-3 sm:mt-0">
          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">{formattedDateRange}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={handleGeneratePdf}
          disabled={isExportingPdf || loading}
          className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          <FilePdf className="h-5 w-5 mr-2" />
          {isExportingPdf ? 'Generating PDF...' : 'Export as PDF'}
        </button>
        
        <button
          type="button"
          onClick={handleGenerateCsv}
          disabled={isExportingCsv || loading}
          className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          <FileSpreadsheet className="h-5 w-5 mr-2" />
          {isExportingCsv ? 'Generating CSV...' : 'Export as CSV'}
        </button>
        
        {onScheduleEmail && (
          <button
            type="button"
            onClick={() => setShowEmailModal(true)}
            disabled={loading}
            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5 mr-2" />
            Schedule Email Report
          </button>
        )}
      </div>
      
      {/* Email scheduling modal */}
      {showEmailModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowEmailModal(false)}
            ></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Schedule Email Report</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Set up recurring lead reports to be delivered to your inbox automatically.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                      Frequency
                    </label>
                    <select
                      id="frequency"
                      name="frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleScheduleEmail}
                  disabled={!email || schedulingEmail}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {schedulingEmail ? 'Scheduling...' : 'Schedule'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 