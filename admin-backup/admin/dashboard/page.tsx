'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { 
  Users, FileText, Clock, ArrowRight, 
  BarChart2, Mail, Calendar, PlusCircle,
  Activity, TrendingUp, CheckCircle
} from 'lucide-react'

// Dashboard card component
const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  color = 'indigo' 
}: { 
  title: string
  value: string | number
  icon: React.ReactNode
  change?: { value: string; positive: boolean }
  color?: 'indigo' | 'blue' | 'green' | 'yellow' | 'red'
}) => {
  const colorClasses = {
    indigo: 'bg-indigo-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  }

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-1">
              <span className={`text-xs ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
                {change.positive ? '+' : ''}{change.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-lg text-white`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

// Activity item component
const ActivityItem = ({ 
  title, 
  description, 
  time, 
  icon 
}: { 
  title: string
  description: string
  time: string
  icon: React.ReactNode
}) => (
  <div className="flex py-3">
    <div className="mr-4 flex-shrink-0">
      <div className="bg-indigo-50 p-2 rounded-lg text-indigo-700">
        {icon}
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <div className="ml-4 flex-shrink-0">
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
)

// Quick action button component
const QuickActionButton = ({ 
  title, 
  icon, 
  href 
}: { 
  title: string
  icon: React.ReactNode
  href: string
}) => (
  <Link 
    href={href}
    className="flex items-center p-3 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
  >
    <div className="p-2 bg-indigo-50 rounded text-indigo-700 mr-3">
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-700">{title}</span>
  </Link>
)

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    leads: 48,
    blogPosts: 12,
    pageViews: 3254,
    assessments: 28
  })
  const [recentActivity, setRecentActivity] = useState([
    {
      title: 'New lead received',
      description: 'John Smith requested a consultation',
      time: '10 minutes ago',
      icon: <Users size={18} />
    },
    {
      title: 'Blog post published',
      description: 'How to improve your business strategy in 2023',
      time: '2 hours ago',
      icon: <FileText size={18} />
    },
    {
      title: 'Assessment completed',
      description: 'Business growth assessment by Company XYZ',
      time: '5 hours ago',
      icon: <CheckCircle size={18} />
    },
    {
      title: 'Contact form submission',
      description: 'Technical support inquiry from existing client',
      time: 'Yesterday',
      icon: <Mail size={18} />
    }
  ])
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) {
          console.error('Error fetching user:', error)
        } else {
          console.log('User data:', data)
          setUser(data.user)
        }
      } catch (err) {
        console.error('Exception fetching user:', err)
      }
    }
    getUser()
    
    // Here you would fetch your actual stats from your database
    // const fetchStats = async () => {
    //   const { data: leadCount } = await supabase.from('leads').select('*', { count: 'exact' })
    //   // ... fetch other stats
    //   setStats({...})
    // }
    // fetchStats()
    
  }, [supabase.auth])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          {user ? `Welcome, ${user.email}!` : 'Loading user data...'}
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Leads" 
          value={stats.leads} 
          icon={<Users size={20} />} 
          change={{ value: "12%", positive: true }}
          color="indigo"
        />
        <StatCard 
          title="Blog Posts" 
          value={stats.blogPosts} 
          icon={<FileText size={20} />} 
          change={{ value: "3%", positive: true }}
          color="blue"
        />
        <StatCard 
          title="Page Views" 
          value={stats.pageViews} 
          icon={<Activity size={20} />} 
          change={{ value: "5%", positive: true }}
          color="green"
        />
        <StatCard 
          title="Assessments" 
          value={stats.assessments} 
          icon={<BarChart2 size={20} />}
          change={{ value: "2%", positive: false }}
          color="yellow" 
        />
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionButton
            title="Add New Blog Post"
            icon={<PlusCircle size={18} />}
            href="/admin/blog/new"
          />
          <QuickActionButton
            title="View Leads"
            icon={<Users size={18} />}
            href="/admin/leads"
          />
          <QuickActionButton
            title="Update Services"
            icon={<FileText size={18} />}
            href="/admin/content/services"
          />
          <QuickActionButton
            title="View Analytics"
            icon={<TrendingUp size={18} />}
            href="/admin/analytics"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <Link href="/admin/activity" className="text-indigo-600 text-sm flex items-center hover:text-indigo-800">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity, index) => (
              <ActivityItem
                key={index}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                icon={activity.icon}
              />
            ))}
          </div>
        </div>
        
        {/* Analytics Overview */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Analytics Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Page Views</span>
                <span className="text-sm font-medium text-gray-700">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                <span className="text-sm font-medium text-gray-700">23%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Bounce Rate</span>
                <span className="text-sm font-medium text-gray-700">42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div className="pt-4">
              <Link 
                href="/admin/analytics" 
                className="text-indigo-600 text-sm flex items-center hover:text-indigo-800"
              >
                Detailed analytics <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 