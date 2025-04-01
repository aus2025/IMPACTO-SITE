'use client'

import React, { useState, useEffect } from 'react'
import { format, subDays, subMonths, parseISO, differenceInHours, startOfDay, endOfDay, isSameDay, isSameWeek, isSameMonth } from 'date-fns'
import { createClient } from '@/utils/supabase/client'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

// Export dynamic flag to force dynamic rendering
export const dynamic = 'force-dynamic';

// Import our custom components
import LeadMetricsCards from './components/LeadMetricsCards'
import LeadDistributionCharts from './components/LeadDistributionCharts'
import LeadTrendsChart from './components/LeadTrendsChart'
import ReportExporter from './components/ReportExporter'

// Types
import type { Lead } from '@/app/admin/leads/page'

export default function LeadsReportPage() {
  // State variables
  const [isLoading, setIsLoading] = useState(true)
  const [leadsData, setLeadsData] = useState<Lead[]>([])
  const [previousLeadsData, setPreviousLeadsData] = useState<Lead[]>([])
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date()
  })
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    newLeads: 0,
    conversionRate: 0,
    averageResponseTime: 0,
    serviceDistribution: [] as {name: string, value: number}[],
    sourceDistribution: [] as {name: string, value: number}[]
  })
  const [previousMetrics, setPreviousMetrics] = useState({
    totalLeads: 0,
    newLeads: 0,
    conversionRate: 0,
    averageResponseTime: 0
  })
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([])
  
  // Setup Supabase client
  const supabase = createClient()
  
  // Fetch leads data when date range changes
  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      fetchLeadsData()
    }
  }, [dateRange])
  
  // Generate time series data when leads data or time frame changes
  useEffect(() => {
    if (leadsData.length > 0) {
      generateTimeSeriesData()
    }
  }, [leadsData, timeFrame])
  
  // Fetch leads data from Supabase
  const fetchLeadsData = async () => {
    if (!dateRange.from || !dateRange.to) return
    
    setIsLoading(true)
    
    try {
      // Calculate previous period for comparison
      const currentPeriodDays = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
      const previousPeriodStart = subDays(dateRange.from, currentPeriodDays)
      const previousPeriodEnd = subDays(dateRange.to, currentPeriodDays)
      
      // Fetch current period leads
      const { data: currentLeads, error: currentError } = await supabase
        .from('leads')
        .select('*')
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString())
        .order('created_at', { ascending: false })
      
      if (currentError) throw currentError
      
      // Fetch previous period leads for comparison
      const { data: previousLeads, error: previousError } = await supabase
        .from('leads')
        .select('*')
        .gte('created_at', previousPeriodStart.toISOString())
        .lte('created_at', previousPeriodEnd.toISOString())
        .order('created_at', { ascending: false })
      
      if (previousError) throw previousError
      
      setLeadsData(currentLeads || [])
      setPreviousLeadsData(previousLeads || [])
      
      // Process data for metrics and charts
      processLeadsData(currentLeads || [], previousLeads || [])
      
    } catch (error) {
      console.error('Error fetching leads data:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Process leads data to calculate metrics
  const processLeadsData = (currentLeads: Lead[], previousLeads: Lead[]) => {
    // Calculate metrics for current period
    const totalLeads = currentLeads.length
    
    // Calculate conversion rate (leads with status 'qualified' or 'converted')
    const convertedLeads = currentLeads.filter(lead => 
      lead.status === 'qualified' || lead.status === 'converted'
    ).length
    const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0
    
    // Calculate average response time (mocked for now)
    // In a real app, you would have timestamps for first contact
    const responseTimesSum = currentLeads.reduce((sum, lead) => {
      // Mock response time based on created_at date
      const responseTime = Math.floor(Math.random() * 24) // Random hours between 0-24
      return sum + responseTime
    }, 0)
    const averageResponseTime = totalLeads > 0 ? parseFloat((responseTimesSum / totalLeads).toFixed(1)) : 0
    
    // Calculate service interest distribution
    const serviceInterests: Record<string, number> = {}
    currentLeads.forEach(lead => {
      const service = lead.service_interest || 'Not specified'
      serviceInterests[service] = (serviceInterests[service] || 0) + 1
    })
    
    const serviceDistribution = Object.entries(serviceInterests)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
    
    // Calculate source distribution
    const sources: Record<string, number> = {}
    currentLeads.forEach(lead => {
      const source = lead.source || 'Not specified'
      sources[source] = (sources[source] || 0) + 1
    })
    
    const sourceDistribution = Object.entries(sources)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
    
    // Calculate metrics for previous period
    const prevTotalLeads = previousLeads.length
    
    const prevConvertedLeads = previousLeads.filter(lead => 
      lead.status === 'qualified' || lead.status === 'converted'
    ).length
    const prevConversionRate = prevTotalLeads > 0 ? Math.round((prevConvertedLeads / prevTotalLeads) * 100) : 0
    
    const prevResponseTimesSum = previousLeads.reduce((sum, lead) => {
      const responseTime = Math.floor(Math.random() * 24)
      return sum + responseTime
    }, 0)
    const prevAverageResponseTime = prevTotalLeads > 0 ? parseFloat((prevResponseTimesSum / prevTotalLeads).toFixed(1)) : 0
    
    // Count new leads received in the current period
    const newLeads = currentLeads.length
    const prevNewLeads = previousLeads.length
    
    // Set metrics state
    setMetrics({
      totalLeads,
      newLeads,
      conversionRate,
      averageResponseTime,
      serviceDistribution,
      sourceDistribution
    })
    
    setPreviousMetrics({
      totalLeads: prevTotalLeads,
      newLeads: prevNewLeads,
      conversionRate: prevConversionRate,
      averageResponseTime: prevAverageResponseTime
    })
  }
  
  // Generate time series data based on selected timeframe
  const generateTimeSeriesData = () => {
    const data: { date: string; total: number; converted: number }[] = []
    
    if (!dateRange.from || !dateRange.to || leadsData.length === 0) {
      setTimeSeriesData([])
      return
    }
    
    const groupLeadsByDate = (leads: Lead[]) => {
      const grouped: Record<string, { total: number; converted: number }> = {}
      
      leads.forEach(lead => {
        const date = parseISO(lead.created_at)
        let key = ''
        
        if (timeFrame === 'daily') {
          key = format(date, 'yyyy-MM-dd')
        } else if (timeFrame === 'weekly') {
          key = `Week ${format(date, 'w, yyyy')}`
        } else if (timeFrame === 'monthly') {
          key = format(date, 'MMM yyyy')
        }
        
        if (!grouped[key]) {
          grouped[key] = { total: 0, converted: 0 }
        }
        
        grouped[key].total++
        
        if (lead.status === 'qualified' || lead.status === 'converted') {
          grouped[key].converted++
        }
      })
      
      return grouped
    }
    
    const groupedData = groupLeadsByDate(leadsData)
    
    // Convert grouped data to array and sort by date
    const timeSeriesArray = Object.entries(groupedData).map(([date, values]) => ({
      date,
      total: values.total,
      converted: values.converted
    }))
    
    // Sort by date
    timeSeriesArray.sort((a, b) => {
      if (timeFrame === 'daily') {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (timeFrame === 'weekly') {
        const [aWeek, aYear] = a.date.replace('Week ', '').split(', ').map(Number)
        const [bWeek, bYear] = b.date.replace('Week ', '').split(', ').map(Number)
        return aYear !== bYear ? aYear - bYear : aWeek - bWeek
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }
    })
    
    setTimeSeriesData(timeSeriesArray)
  }
  
  // Date range change handler
  const handleDateRangeChange = (range: DateRange) => {
    if (range.from && range.to) {
      setDateRange(range)
    }
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* Header with title and date selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads Report</h1>
          <p className="text-muted-foreground mt-1">
            Analyze lead performance metrics and trends
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-[260px] justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <LeadMetricsCards 
        metrics={metrics}
        previousMetrics={previousMetrics}
        isLoading={isLoading}
      />
      
      {/* Lead Trends Chart */}
      <LeadTrendsChart
        timeSeriesData={timeSeriesData}
        isLoading={isLoading}
        chartType={chartType}
        onChartTypeChange={setChartType}
        timeFrame={timeFrame}
        onTimeFrameChange={setTimeFrame}
      />
      
      {/* Distribution Charts */}
      <LeadDistributionCharts
        sourceDistribution={metrics.sourceDistribution}
        serviceDistribution={metrics.serviceDistribution}
        isLoading={isLoading}
      />
      
      {/* Export/Schedule Reports */}
      <ReportExporter 
        leads={leadsData}
        metrics={metrics}
        dateRange={{
          startDate: dateRange.from || new Date(),
          endDate: dateRange.to || new Date()
        }}
        timeSeriesData={timeSeriesData}
        isLoading={isLoading}
      />
    </div>
  )
} 