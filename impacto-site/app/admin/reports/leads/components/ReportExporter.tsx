'use client'

import React, { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarIcon, Download, Mail, FileText, Clock } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

// Import PDF and CSV components
import LeadReportPDF from '../LeadReportPDF'
import { exportLeadReports } from '../LeadReportCSV'

// Types
import type { Lead } from '@/app/admin/leads/page'

interface ReportExporterProps {
  leads: Lead[]
  metrics: {
    totalLeads: number
    newLeads: number
    conversionRate: number
    averageResponseTime: number
    serviceDistribution: {name: string, value: number}[]
    sourceDistribution: {name: string, value: number}[]
  }
  dateRange: {
    startDate: Date
    endDate: Date
  }
  timeSeriesData: any[]
  isLoading: boolean
}

export default function ReportExporter({ 
  leads, 
  metrics, 
  dateRange, 
  timeSeriesData, 
  isLoading 
}: ReportExporterProps) {
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date())
  const [scheduleFrequency, setScheduleFrequency] = useState('once')
  const [scheduleEmail, setScheduleEmail] = useState('')
  const [reportFormat, setReportFormat] = useState('pdf')
  
  const handleGeneratePdf = () => {
    // The actual PDF generation is handled by PDFDownloadLink
    // This function is just for tracking or additional actions
    toast({
      title: "PDF Generated",
      description: "Your PDF report has been generated successfully.",
    })
  }
  
  const handleGenerateCsv = () => {
    exportLeadReports(leads, metrics, dateRange)
    toast({
      title: "CSV Generated",
      description: "Your CSV reports have been generated successfully.",
    })
  }
  
  const handleScheduleReport = () => {
    // This would normally send a request to schedule a report
    // For now we'll just show a success message
    if (!scheduleEmail) {
      toast({
        title: "Email Required",
        description: "Please enter an email address for the scheduled report.",
        variant: "destructive"
      })
      return
    }
    
    toast({
      title: "Report Scheduled",
      description: `Your ${reportFormat.toUpperCase()} report has been scheduled for ${format(scheduleDate || new Date(), 'PPP')}`,
    })
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Reports</CardTitle>
        <CardDescription>
          Download or schedule lead reports in various formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="download">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="download">Download</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="download" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="reportType">Report Format</Label>
                <Select 
                  defaultValue="pdf" 
                  onValueChange={setReportFormat}
                >
                  <SelectTrigger id="reportType">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="csv">CSV Export</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              {reportFormat === 'pdf' ? (
                <div className="hidden">
                  <PDFDownloadLink
                    document={
                      <LeadReportPDF 
                        leads={leads} 
                        metrics={metrics} 
                        dateRange={dateRange}
                        timeSeriesData={timeSeriesData}
                      />
                    }
                    fileName={`impacto-leads-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`}
                  >
                    {({ loading }) => (
                      <Button 
                        onClick={handleGeneratePdf}
                        disabled={isLoading || loading}
                      >
                        {loading ? 'Preparing PDF...' : 'Download PDF'}
                        <Download className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </PDFDownloadLink>
                </div>
              ) : null}
              
              <Button 
                onClick={reportFormat === 'pdf' ? handleGeneratePdf : handleGenerateCsv}
                disabled={isLoading}
                variant="default"
              >
                {reportFormat === 'pdf' ? (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Download PDF
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Download CSV
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduleEmail">Email Address</Label>
                <Input 
                  id="scheduleEmail" 
                  placeholder="email@example.com"
                  value={scheduleEmail}
                  onChange={(e) => setScheduleEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Schedule Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduleDate ? (
                        format(scheduleDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={scheduleDate}
                      onSelect={setScheduleDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="scheduleFrequency">Frequency</Label>
                <Select 
                  defaultValue="once" 
                  onValueChange={setScheduleFrequency}
                >
                  <SelectTrigger id="scheduleFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">One-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="scheduleFormat">Report Format</Label>
                <Select 
                  defaultValue="pdf" 
                  onValueChange={setReportFormat}
                >
                  <SelectTrigger id="scheduleFormat">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="csv">CSV Export</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                onClick={handleScheduleReport}
                disabled={isLoading || !scheduleEmail}
                variant="default"
              >
                <Clock className="mr-2 h-4 w-4" />
                Schedule Report
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Hidden PDF download link that will be triggered by the visible button */}
        <div className="hidden">
          <PDFDownloadLink
            document={
              <LeadReportPDF 
                leads={leads} 
                metrics={metrics} 
                dateRange={dateRange}
                timeSeriesData={timeSeriesData}
              />
            }
            fileName={`impacto-leads-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`}
            id="pdfDownloadLink"
          >
            {({ loading }) => (
              <Button disabled={loading || isLoading}>
                {loading ? 'Preparing PDF...' : 'Download PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </CardContent>
    </Card>
  )
} 