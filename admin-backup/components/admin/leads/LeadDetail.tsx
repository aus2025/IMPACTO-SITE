'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { 
  Calendar, 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  Briefcase,
  Clock2,
  Loader2,
  Send
} from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'
import type { Lead } from '@/app/admin/leads/page'
import StatusUpdater from './StatusUpdater'

interface LeadDetailProps {
  lead: Lead
  onLeadUpdated: (updatedLead: Lead) => void
}

export default function LeadDetail({ lead, onLeadUpdated }: LeadDetailProps) {
  const supabase = createClient()
  const [notes, setNotes] = useState(lead.notes || '')
  const [isSaving, setIsSaving] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [isLoadingComments, setIsLoadingComments] = useState(true)
  
  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return format(new Date(dateString), 'MMM d, yyyy h:mm a')
  }
  
  // Update notes
  const saveNotes = async () => {
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('leads')
        .update({ notes })
        .eq('id', lead.id)
        
      if (error) throw error
      
      onLeadUpdated({ ...lead, notes })
    } catch (error) {
      console.error('Error saving notes:', error)
    } finally {
      setIsSaving(false)
    }
  }
  
  // Handle status update
  const handleStatusUpdate = (newStatus: string) => {
    onLeadUpdated({ ...lead, status: newStatus })
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Lead Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
          <p className="text-sm text-gray-600 mt-1">
            <Calendar className="inline-block h-4 w-4 mr-1 mb-1" />
            Lead created {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:${lead.email}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </a>
          
          {lead.phone && (
            <a
              href={`tel:${lead.phone}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call
            </a>
          )}
          
          <div className="ml-auto sm:ml-0">
            <StatusUpdater 
              leadId={lead.id} 
              currentStatus={lead.status} 
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        </div>
      </div>
      
      {/* Lead Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Left column - Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1">
                    <a href={`mailto:${lead.email}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                      {lead.email}
                    </a>
                  </p>
                </div>
              </div>
              
              {lead.phone && (
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="mt-1">
                      <a href={`tel:${lead.phone}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                        {lead.phone}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <Briefcase className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Service Interest</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {lead.service_interest || 'Not specified'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(lead.created_at)}
                  </p>
                </div>
              </div>
              
              {lead.last_contacted && (
                <div className="flex items-start">
                  <Clock2 className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Contacted</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(lead.last_contacted)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Middle column - Message */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Lead Message</h3>
          <div className="bg-gray-50 rounded-lg p-4 h-[calc(100%-2rem)]">
            <div className="flex items-start mb-3">
              <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <p className="text-sm font-medium text-gray-500">Original Message</p>
            </div>
            <div className="whitespace-pre-wrap text-sm text-gray-800 overflow-auto max-h-64">
              {lead.message}
            </div>
          </div>
        </div>
        
        {/* Right column - Notes */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Notes
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Only visible to staff)
              </span>
            </h3>
            <div className="relative">
              <textarea
                rows={5}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Add private notes about this lead..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={saveNotes}
                  disabled={isSaving || notes === lead.notes}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Notes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Communication Timeline */}
      <div className="px-6 py-5 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Communication History</h3>
        
        {/* Add Comment Form */}
        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Add Communication Record
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <textarea
              name="comment"
              id="comment"
              rows={3}
              className="block w-full pr-10 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
              placeholder="Record a call, email, or meeting..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => {
                // This would normally save a comment to the database
                // For now, we'll just display it in the UI
                const comment = {
                  id: Date.now(),
                  content: newComment,
                  created_at: new Date().toISOString(),
                  user: 'Current User'
                }
                setComments([comment, ...comments])
                setNewComment('')
                
                // Also update last_contacted
                const updatedLead = {
                  ...lead,
                  last_contacted: new Date().toISOString()
                }
                onLeadUpdated(updatedLead)
              }}
              disabled={isPostingComment || !newComment.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 mr-2" />
              {isPostingComment ? 'Saving...' : 'Add Entry'}
            </button>
          </div>
        </div>
        
        {/* Communication Timeline */}
        <div className="flow-root">
          <ul className="-mb-8">
            {comments.length === 0 ? (
              <li className="py-6 text-center text-gray-500">
                No communication history yet. Add the first entry above.
              </li>
            ) : (
              comments.map((comment, commentIdx) => (
                <li key={comment.id}>
                  <div className="relative pb-8">
                    {commentIdx !== comments.length - 1 ? (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center ring-8 ring-white">
                          <MessageSquare className="h-5 w-5 text-indigo-500" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">{comment.user}</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            {formatDate(comment.created_at)}
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  )
} 