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
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-md shadow-sm p-2 text-sm">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

interface LeadTrendsChartProps {
  timeSeriesData: any[]
  isLoading: boolean
  chartType: 'line' | 'bar'
  onChartTypeChange: (type: 'line' | 'bar') => void
  timeFrame: 'daily' | 'weekly' | 'monthly'
  onTimeFrameChange: (frame: 'daily' | 'weekly' | 'monthly') => void
}

export default function LeadTrendsChart({
  timeSeriesData,
  isLoading,
  chartType,
  onChartTypeChange,
  timeFrame,
  onTimeFrameChange
}: LeadTrendsChartProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Lead Trends</CardTitle>
          <CardDescription>Lead acquisition and conversion over time</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Tabs 
            value={timeFrame}
            onValueChange={(v) => onTimeFrameChange(v as 'daily' | 'weekly' | 'monthly')}
            className="w-fit"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Tabs 
            value={chartType} 
            onValueChange={(v) => onChartTypeChange(v as 'line' | 'bar')}
            className="w-fit"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-[350px] w-full" />
          </div>
        ) : timeSeriesData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No data available for the selected period
          </div>
        ) : chartType === 'line' ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeSeriesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                name="Total Leads"
                stroke="#4f46e5"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="converted"
                name="Converted"
                stroke="#22c55e"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={timeSeriesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="total" name="Total Leads" fill="#4f46e5" />
              <Bar dataKey="converted" name="Converted" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
} 