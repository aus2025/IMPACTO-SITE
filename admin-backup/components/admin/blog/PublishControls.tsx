'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar, Clock, Save, Eye, Send } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

type BlogStatus = 'draft' | 'published' | 'scheduled'

interface PublishControlsProps {
  status: BlogStatus
  publishedAt: Date | null
  onSaveDraft: () => Promise<void>
  onPublish: (schedule?: Date) => Promise<void>
  onPreview: () => void
  isSaving: boolean
}

export default function PublishControls({
  status,
  publishedAt,
  onSaveDraft,
  onPublish,
  onPreview,
  isSaving
}: PublishControlsProps) {
  const [showScheduleOptions, setShowScheduleOptions] = useState(false)
  const [scheduleDate, setScheduleDate] = useState<string>(
    publishedAt 
      ? format(publishedAt, 'yyyy-MM-dd')
      : format(new Date(), 'yyyy-MM-dd')
  )
  const [scheduleTime, setScheduleTime] = useState<string>(
    publishedAt 
      ? format(publishedAt, 'HH:mm') 
      : format(new Date(new Date().getTime() + 30 * 60000), 'HH:mm') // Default to 30 mins from now
  )

  const handleSchedulePublish = () => {
    // Combine date and time into a single Date object
    const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}:00`)
    onPublish(scheduledDateTime)
  }

  const handlePublishNow = () => {
    onPublish()
  }

  // Helper function to get status badge
  const getStatusBadge = () => {
    switch (status) {
      case 'published':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Published</span>
      case 'draft':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Draft</span>
      case 'scheduled':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Scheduled</span>
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Publishing</h3>
        {getStatusBadge()}
      </div>

      {status === 'scheduled' && publishedAt && (
        <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 flex items-center">
          <Calendar size={16} className="mr-2" />
          <span>
            Scheduled for {format(publishedAt, 'MMMM d, yyyy')} at {format(publishedAt, 'h:mm a')}
          </span>
        </div>
      )}

      {status === 'published' && publishedAt && (
        <div className="text-sm text-gray-600 flex items-center">
          <Clock size={14} className="mr-1" />
          <span>Published on {format(publishedAt, 'MMMM d, yyyy')}</span>
        </div>
      )}

      <div className="space-y-3">
        {showScheduleOptions && (
          <div className="space-y-3 bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-medium">Schedule Publication</h4>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="schedule-date" className="text-xs">Date</Label>
                <Input
                  id="schedule-date"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div>
                <Label htmlFor="schedule-time" className="text-xs">Time</Label>
                <Input
                  id="schedule-time"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                type="button" 
                size="sm" 
                onClick={handleSchedulePublish} 
                disabled={isSaving}
                className="w-full"
              >
                Schedule
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowScheduleOptions(false)}
                className="w-1/3"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            disabled={isSaving}
            className="flex-1"
          >
            <Save size={16} className="mr-2" />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onPreview}
            className="px-3"
          >
            <Eye size={16} />
          </Button>
        </div>
        
        {!showScheduleOptions && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              onClick={handlePublishNow}
              disabled={isSaving}
            >
              <Send size={16} className="mr-2" />
              Publish Now
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowScheduleOptions(true)}
              disabled={isSaving}
            >
              <Calendar size={16} className="mr-2" />
              Schedule
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
} 