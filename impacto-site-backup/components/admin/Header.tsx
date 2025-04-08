'use client'

import { useState } from 'react'
import { Search, Bell, Menu } from 'lucide-react'

export default function Header({ 
  toggleSidebar 
}: { 
  toggleSidebar: () => void 
}) {
  const [notifications, setNotifications] = useState<number>(2)

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Mobile menu button */}
        <button
          className="p-1 mr-4 text-gray-500 rounded-md lg:hidden hover:text-gray-700 focus:outline-none"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>

        {/* Left side - Title */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Administration Console</h1>
        </div>

        {/* Spacer for flex layout */}
        <div className="flex-1"></div>

        {/* Right side with search and notifications */}
        <div className="flex items-center space-x-3">
          {/* Search bar */}
          <div className="relative mr-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-[200px] py-2 pl-10 pr-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              placeholder="Search..."
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-1 text-gray-500 rounded-full hover:text-gray-700 focus:outline-none">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 