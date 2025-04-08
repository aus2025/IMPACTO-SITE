'use client'

import { useState, useEffect, ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AdminWrapper({ 
  children,
  requireAdmin = true
}: { 
  children: ReactNode
  requireAdmin?: boolean
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/admin/login')
          return
        }
        
        if (requireAdmin) {
          // Check if user has admin role
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()
          
          if (error || !profile || profile.role !== 'admin') {
            console.log('Access denied: User is not an admin')
            router.push('/admin/login')
            return
          }
        }
        
        setAuthenticated(true)
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [router, supabase, requireAdmin])
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  
  // Handle clicks outside of sidebar on mobile to close it
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-indigo-500" />
      </div>
    )
  }
  
  if (!authenticated) {
    return null // Prevent flash of content while redirecting
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-col flex-1 lg:pl-64">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 