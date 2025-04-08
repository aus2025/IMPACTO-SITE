'use client'

import React from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'

const COLORS = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899']

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-md shadow-sm p-2 text-sm">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-muted-foreground">Count: {payload[0].value}</p>
        <p className="text-muted-foreground">
          {Math.round((payload[0].value / payload[0].payload.total) * 100)}%
        </p>
      </div>
    )
  }
  return null
}

interface LeadDistributionChartsProps {
  sourceDistribution: { name: string; value: number }[]
  serviceDistribution: { name: string; value: number }[]
  isLoading: boolean
}

export default function LeadDistributionCharts({
  sourceDistribution,
  serviceDistribution,
  isLoading
}: LeadDistributionChartsProps) {
  // Add total property to each item for percentage calculation in tooltip
  const sourceData = sourceDistribution.map(item => ({
    ...item,
    total: sourceDistribution.reduce((sum, i) => sum + i.value, 0)
  }))
  
  const serviceData = serviceDistribution.map(item => ({
    ...item,
    total: serviceDistribution.reduce((sum, i) => sum + i.value, 0)
  }))
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Lead Sources</CardTitle>
          <CardDescription>Distribution of leads by acquisition channel</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Skeleton className="h-[250px] w-[250px] rounded-full" />
            </div>
          ) : sourceData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => 
                    percent > 0.05 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''
                  }
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Service Interests</CardTitle>
          <CardDescription>Types of services leads are interested in</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Skeleton className="h-[250px] w-[250px] rounded-full" />
            </div>
          ) : serviceData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => 
                    percent > 0.05 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''
                  }
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 