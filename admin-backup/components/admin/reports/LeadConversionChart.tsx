'use client'

import { useMemo } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts'
import { format, parseISO, isValid } from 'date-fns'

interface LeadConversionChartProps {
  data: Array<{
    date: string
    totalLeads: number
    qualifiedLeads: number
    conversionRate: number
  }>
  loading?: boolean
  timeFrame: 'daily' | 'weekly' | 'monthly'
  chartType: 'line' | 'bar'
}

export default function LeadConversionChart({
  data,
  loading = false,
  timeFrame = 'daily',
  chartType = 'line'
}: LeadConversionChartProps) {
  // Get formatted data for chart
  const formattedData = useMemo(() => {
    if (!data || data.length === 0 || loading) {
      // Generate empty placeholder data if loading
      return Array.from({ length: 10 }).map((_, i) => ({
        date: `2023-01-${i + 1}`,
        totalLeads: 0,
        qualifiedLeads: 0,
        conversionRate: 0,
      }))
    }
    
    return data.map(item => {
      let formattedDate = item.date
      
      // Format the date based on timeframe
      if (isValid(parseISO(item.date))) {
        const dateObj = parseISO(item.date)
        
        if (timeFrame === 'daily') {
          formattedDate = format(dateObj, 'MMM dd')
        } else if (timeFrame === 'weekly') {
          formattedDate = format(dateObj, "'Week' w, yyyy")
        } else if (timeFrame === 'monthly') {
          formattedDate = format(dateObj, 'MMM yyyy')
        }
      }
      
      return {
        ...item,
        formattedDate,
      }
    })
  }, [data, loading, timeFrame])
  
  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="formattedDate" 
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis 
          yAxisId="left" 
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `${value}%`}
          tickMargin={10}
        />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'conversionRate') return [`${value}%`, 'Conversion Rate']
            if (name === 'totalLeads') return [value, 'Total Leads']
            if (name === 'qualifiedLeads') return [value, 'Qualified Leads']
            return [value, name]
          }}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="totalLeads" 
          stroke="#4f46e5" 
          activeDot={{ r: 8 }}
          strokeWidth={2}
          name="Total Leads"
        />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="qualifiedLeads" 
          stroke="#22c55e" 
          activeDot={{ r: 8 }}
          strokeWidth={2}
          name="Qualified Leads"
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="conversionRate" 
          stroke="#f59e0b" 
          activeDot={{ r: 8 }}
          strokeWidth={2}
          name="Conversion Rate"
        />
      </LineChart>
    </ResponsiveContainer>
  )
  
  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="formattedDate" 
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis 
          yAxisId="left" 
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `${value}%`}
          tickMargin={10}
        />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'conversionRate') return [`${value}%`, 'Conversion Rate']
            if (name === 'totalLeads') return [value, 'Total Leads']
            if (name === 'qualifiedLeads') return [value, 'Qualified Leads']
            return [value, name]
          }}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        <Bar 
          yAxisId="left"
          dataKey="totalLeads" 
          fill="#4f46e5" 
          name="Total Leads"
          barSize={20}
        />
        <Bar 
          yAxisId="left"
          dataKey="qualifiedLeads" 
          fill="#22c55e" 
          name="Qualified Leads"
          barSize={20}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="conversionRate" 
          stroke="#f59e0b" 
          strokeWidth={2}
          name="Conversion Rate"
        />
      </BarChart>
    </ResponsiveContainer>
  )
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Lead Conversion Trends</h3>
        <p className="text-sm text-gray-500 mt-1">
          {timeFrame === 'daily' && 'Daily lead generation and conversion metrics'}
          {timeFrame === 'weekly' && 'Weekly lead generation and conversion metrics'}
          {timeFrame === 'monthly' && 'Monthly lead generation and conversion metrics'}
        </p>
      </div>
      
      {loading ? (
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      ) : chartType === 'line' ? renderLineChart() : renderBarChart()}
    </div>
  )
} 