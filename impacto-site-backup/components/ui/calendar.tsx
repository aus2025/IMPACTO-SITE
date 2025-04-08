'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

// Basic calendar implementation
export function Calendar({
  className,
  month,
  year,
  selected,
  onDateClick,
  ...props
}: {
  className?: string,
  month: number,
  year: number,
  selected?: Date,
  onDateClick?: (date: Date) => void
} & React.HTMLAttributes<HTMLDivElement>) {
  
  // Helper to check if a date is selected
  const isSelected = (date: Date) => {
    if (!selected) return false
    return date.getDate() === selected.getDate() &&
           date.getMonth() === selected.getMonth() &&
           date.getFullYear() === selected.getFullYear()
  }
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }
  
  // Get day of week the first day of month starts on (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }
  
  const days = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  
  // Generate calendar grid
  const generateCalendarGrid = () => {
    const grid = []
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      grid.push(<div key={`empty-${i}`} className="h-8" />)
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day)
      const isToday = new Date().toDateString() === date.toDateString()
      
      grid.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => onDateClick?.(date)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md text-sm",
            isSelected(date) && "bg-blue-600 text-white",
            !isSelected(date) && isToday && "border border-blue-600 text-blue-600",
            !isSelected(date) && !isToday && "text-gray-900 hover:bg-gray-100"
          )}
        >
          {day}
        </button>
      )
    }
    
    return grid
  }
  
  // Get month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  // Navigation handlers
  const prevMonth = () => {
    let newMonth = month - 1
    let newYear = year
    
    if (newMonth < 0) {
      newMonth = 11
      newYear--
    }
    
    onDateClick?.(new Date(newYear, newMonth, 1))
  }
  
  const nextMonth = () => {
    let newMonth = month + 1
    let newYear = year
    
    if (newMonth > 11) {
      newMonth = 0
      newYear++
    }
    
    onDateClick?.(new Date(newYear, newMonth, 1))
  }
  
  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{monthNames[month]} {year}</h4>
        <div className="flex items-center space-x-1">
          <button
            onClick={prevMonth}
            className="rounded-md p-1 hover:bg-gray-100"
            title="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextMonth}
            className="rounded-md p-1 hover:bg-gray-100"
            title="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="mt-2 grid grid-cols-7 gap-1 text-center">
        {/* Day labels */}
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {generateCalendarGrid()}
      </div>
    </div>
  )
} 