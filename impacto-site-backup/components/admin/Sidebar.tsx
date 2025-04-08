'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  ChevronDown, ChevronRight, 
  LayoutDashboard, Users, FileText, 
  Settings, Mail, Calendar, 
  Menu, X, BarChart2, PenTool,
  User, LogOut
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

type NavItemType = {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: { title: string; href: string }[]
}

export default function Sidebar({ 
  isOpen, 
  toggleSidebar 
}: { 
  isOpen: boolean 
  toggleSidebar: () => void 
}) {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (!error && data?.user) {
          setUser(data.user)
          
          // Get user profile details
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single()
            
          if (profile) {
            setUser(prev => ({ ...prev, profile }))
          }
        }
      } catch (err) {
        console.error('Error fetching user:', err)
      }
    }
    
    getUser()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  const navItems: NavItemType[] = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: 'Blog Management',
      href: '#',
      icon: <FileText size={20} />,
      submenu: [
        { title: 'All Posts', href: '/admin/blog' },
        { title: 'Add New Post', href: '/admin/blog/new' },
      ],
    },
    {
      title: 'Case Studies',
      href: '#',
      icon: <FileText size={20} />,
      submenu: [
        { title: 'All Case Studies', href: '/admin/case-studies' },
        { title: 'Add New Case Study', href: '/admin/case-studies/new' },
      ],
    },
    {
      title: 'Content',
      href: '#',
      icon: <PenTool size={20} />,
      submenu: [
        { title: 'Pages', href: '/admin/content/pages' },
        { title: 'Services', href: '/admin/content/services' },
      ],
    },
    {
      title: 'Lead Management',
      href: '/admin/leads',
      icon: <Users size={20} />,
    },
    {
      title: 'Assessments',
      href: '/admin/assessments',
      icon: <BarChart2 size={20} />,
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings size={20} />,
    },
  ]

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(title)
    }
  }

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 w-64 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Increased padding significantly to move content down by approximately 8cm total */}
        <div className="pt-80 h-full flex flex-col">
          {/* User profile section only */}
          <div className="p-4 border-b border-gray-200">
            <div 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                {user?.email?.charAt(0).toUpperCase() || <User size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email || 'Admin'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Administrator
                </p>
              </div>
              <ChevronDown 
                size={16} 
                className={`text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
              />
            </div>
            
            {/* User dropdown menu */}
            {showDropdown && (
              <div className="mt-3 space-y-1">
                <Link 
                  href="/admin/profile"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
                >
                  <User size={16} className="mr-2 text-gray-500" />
                  Your Profile
                </Link>
                <Link 
                  href="/admin/settings"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
                >
                  <Settings size={16} className="mr-2 text-gray-500" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 rounded-md hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2 text-gray-500" />
                  Logout
                </button>
              </div>
            )}
          </div>

          <nav className="p-4 overflow-y-auto flex-1">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.title}>
                  {item.submenu ? (
                    <div className="mb-2">
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                          openSubmenu === item.title
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-3 text-gray-500 group-hover:text-indigo-500">
                            {item.icon}
                          </span>
                          {item.title}
                        </div>
                        {openSubmenu === item.title ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>
                      {openSubmenu === item.title && (
                        <ul className="mt-1 ml-6 space-y-1">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.title}>
                              <Link
                                href={subitem.href}
                                className={`block px-4 py-2 text-sm rounded-md ${
                                  isActive(subitem.href)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {subitem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(item.href)
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className={`mr-3 ${isActive(item.href) ? 'text-indigo-500' : 'text-gray-500'}`}>
                        {item.icon}
                      </span>
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
} 