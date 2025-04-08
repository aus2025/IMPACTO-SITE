'use client'

import React from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  BarChart4, 
  Clock, 
  Users, 
  UserPlus 
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPercentage } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  description: string
  change?: number
  icon: React.ReactNode
  isLoading?: boolean
}

const MetricCard = ({ 
  title, 
  value, 
  description, 
  change, 
  icon, 
  isLoading = false 
}: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <Skeleton className="h-8 w-24" />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
      <CardDescription className="flex items-center pt-1">
        {isLoading ? (
          <Skeleton className="h-4 w-full" />
        ) : (
          <>
            {typeof change !== 'undefined' && (
              <span className={`mr-1 flex items-center text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                )}
                {Math.abs(change)}%
              </span>
            )}
            {description}
          </>
        )}
      </CardDescription>
    </CardContent>
  </Card>
)

interface LeadMetricsCardsProps {
  metrics: {
    totalLeads: number
    newLeads: number
    conversionRate: number
    averageResponseTime: number
  }
  previousMetrics: {
    totalLeads: number
    newLeads: number
    conversionRate: number
    averageResponseTime: number
  }
  isLoading: boolean
}

export default function LeadMetricsCards({ 
  metrics, 
  previousMetrics, 
  isLoading 
}: LeadMetricsCardsProps) {
  // Calculate percentage changes
  const calculateChange = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
  }
  
  const leadChangePercentage = calculateChange(metrics.totalLeads, previousMetrics.totalLeads)
  const newLeadChangePercentage = calculateChange(metrics.newLeads, previousMetrics.newLeads)
  const conversionChangePercentage = calculateChange(metrics.conversionRate, previousMetrics.conversionRate)
  const responseTimeChangePercentage = calculateChange(metrics.averageResponseTime, previousMetrics.averageResponseTime) * -1 // Invert as lower is better
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Leads"
        value={metrics.totalLeads}
        description="vs previous period"
        change={leadChangePercentage}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        isLoading={isLoading}
      />
      <MetricCard
        title="New Leads"
        value={metrics.newLeads}
        description="vs previous period"
        change={newLeadChangePercentage}
        icon={<UserPlus className="h-4 w-4 text-muted-foreground" />}
        isLoading={isLoading}
      />
      <MetricCard
        title="Conversion Rate"
        value={`${formatPercentage(metrics.conversionRate)}%`}
        description="vs previous period"
        change={conversionChangePercentage}
        icon={<BarChart4 className="h-4 w-4 text-muted-foreground" />}
        isLoading={isLoading}
      />
      <MetricCard
        title="Avg. Response Time"
        value={`${metrics.averageResponseTime.toFixed(1)} hrs`}
        description="vs previous period"
        change={responseTimeChangePercentage}
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        isLoading={isLoading}
      />
    </div>
  )
} 