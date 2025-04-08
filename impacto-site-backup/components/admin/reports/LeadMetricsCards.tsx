'use client'

import { useMemo } from 'react'
import { 
  Users, 
  TrendingUp, 
  BarChart2, 
  Calendar, 
  ArrowUp, 
  ArrowDown,
  MessageSquare 
} from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: React.ReactNode
  trend?: number
  trendLabel?: string
  loading?: boolean
}

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendLabel,
  loading = false
}: MetricCardProps) {
  const trendDirection = useMemo(() => {
    if (trend === undefined) return null
    return trend >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
  }, [trend])

  const trendColor = useMemo(() => {
    if (trend === undefined) return ''
    return trend >= 0 ? 'text-green-500' : 'text-red-500'
  }, [trend])

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {loading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-2"></div>
          ) : (
            <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          )}
        </div>
        <div className="p-3 bg-indigo-50 rounded-full">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">{subtitle}</p>
        {trend !== undefined && trendLabel && (
          <div className={`flex items-center text-xs font-medium ${trendColor}`}>
            {trendDirection}
            <span className="ml-1">{Math.abs(trend)}%</span>
            <span className="ml-1 text-gray-500">{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface LeadMetricsCardsProps {
  data: {
    totalLeads: number
    newLeads: number
    conversionRate: number
    averageResponseTime: number
    serviceDistribution: {
      name: string
      value: number
    }[]
    sourceDistribution: {
      name: string
      value: number
    }[]
  }
  dateRange: {
    startDate: Date
    endDate: Date
  }
  previousPeriod: {
    totalLeads: number
    newLeads: number
    conversionRate: number
    averageResponseTime: number
  }
  loading?: boolean
}

export default function LeadMetricsCards({
  data,
  dateRange,
  previousPeriod,
  loading = false
}: LeadMetricsCardsProps) {
  // Calculate trend percentages
  const totalLeadsTrend = useMemo(() => {
    if (previousPeriod.totalLeads === 0) return 0
    return Math.round(((data.totalLeads - previousPeriod.totalLeads) / previousPeriod.totalLeads) * 100)
  }, [data.totalLeads, previousPeriod.totalLeads])

  const newLeadsTrend = useMemo(() => {
    if (previousPeriod.newLeads === 0) return 0
    return Math.round(((data.newLeads - previousPeriod.newLeads) / previousPeriod.newLeads) * 100)
  }, [data.newLeads, previousPeriod.newLeads])

  const conversionRateTrend = useMemo(() => {
    return Math.round(data.conversionRate - previousPeriod.conversionRate)
  }, [data.conversionRate, previousPeriod.conversionRate])

  const responseTimeTrend = useMemo(() => {
    if (previousPeriod.averageResponseTime === 0) return 0
    // Negative is better for response time
    return -Math.round(((data.averageResponseTime - previousPeriod.averageResponseTime) / previousPeriod.averageResponseTime) * 100)
  }, [data.averageResponseTime, previousPeriod.averageResponseTime])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Leads"
        value={loading ? '0' : data.totalLeads.toLocaleString()}
        subtitle="Total leads in selected period"
        icon={<Users className="h-6 w-6 text-indigo-600" />}
        trend={totalLeadsTrend}
        trendLabel="vs previous period"
        loading={loading}
      />
      
      <MetricCard
        title="New Leads"
        value={loading ? '0' : data.newLeads.toLocaleString()}
        subtitle="New leads in selected period"
        icon={<MessageSquare className="h-6 w-6 text-indigo-600" />}
        trend={newLeadsTrend}
        trendLabel="vs previous period"
        loading={loading}
      />
      
      <MetricCard
        title="Conversion Rate"
        value={loading ? '0%' : `${data.conversionRate}%`}
        subtitle="Lead to qualified conversion"
        icon={<TrendingUp className="h-6 w-6 text-indigo-600" />}
        trend={conversionRateTrend}
        trendLabel="vs previous period"
        loading={loading}
      />
      
      <MetricCard
        title="Avg. Response Time"
        value={loading ? '0' : `${data.averageResponseTime} hrs`}
        subtitle="Time to first contact"
        icon={<Calendar className="h-6 w-6 text-indigo-600" />}
        trend={responseTimeTrend}
        trendLabel="vs previous period"
        loading={loading}
      />
    </div>
  )
} 