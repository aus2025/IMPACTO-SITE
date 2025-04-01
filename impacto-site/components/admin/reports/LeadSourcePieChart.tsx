'use client'

import { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts'

interface LeadSourcePieChartProps {
  data: Array<{
    name: string
    value: number
    color?: string
  }>
  title?: string
  loading?: boolean
}

// Default colors for pie chart segments
const COLORS = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#0ea5e9', '#f97316', '#14b8a6']

export default function LeadSourcePieChart({
  data,
  title = 'Lead Source Distribution',
  loading = false
}: LeadSourcePieChartProps) {
  // Format data for chart and add colors if not provided
  const chartData = useMemo(() => {
    if (!data || data.length === 0 || loading) {
      // Generate placeholder data if loading
      return Array.from({ length: 4 }).map((_, i) => ({
        name: `Source ${i + 1}`,
        value: 0,
        color: COLORS[i % COLORS.length]
      }))
    }
    
    const total = data.reduce((sum, item) => sum + item.value, 0)
    
    return data.map((item, index) => ({
      ...item,
      color: item.color || COLORS[index % COLORS.length],
      percentage: total > 0 ? Math.round((item.value / total) * 100) : 0
    }))
  }, [data, loading])
  
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name
  }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    
    // Only show label if percent is greater than 5%
    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null
  }
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Breakdown of leads by source
        </p>
      </div>
      
      {loading ? (
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <div className="h-64 md:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => {
                  return [`${value} (${props.payload.percentage}%)`, name]
                }}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry, index) => {
                  const item = chartData[index]
                  return (
                    <span className="text-sm">
                      {value} ({item.percentage}%)
                    </span>
                  )
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Legend as text below chart for small screens */}
      <div className="mt-4 grid grid-cols-2 gap-2 md:hidden">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-700">
              {item.name} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 