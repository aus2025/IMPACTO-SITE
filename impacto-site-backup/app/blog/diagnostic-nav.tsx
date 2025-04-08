'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  description: string;
}

export default function BlogDiagnosticNav() {
  const pathname = usePathname();
  
  const navItems: NavItem[] = [
    {
      label: 'Diagnostic Hub',
      href: '/blog/diagnostic',
      description: 'Main diagnostic and troubleshooting hub'
    },
    {
      label: 'Regular Blog',
      href: '/blog',
      description: 'The original blog implementation'
    },
    {
      label: 'Fixed Blog',
      href: '/blog/fixed',
      description: 'Client-side fixed implementation with better error handling'
    },
    {
      label: 'Table Debug',
      href: '/blog/debug-tables',
      description: 'Check if blog tables exist and their status'
    },
    {
      label: 'Initialize Tables',
      href: '/blog/init-tables',
      description: 'Create blog tables in Supabase'
    },
    {
      label: 'Connection Test',
      href: '/blog/test',
      description: 'Test basic Supabase connection'
    }
  ];
  
  const isActive = (href: string) => pathname === href;
  
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">Blog Diagnostic Tools</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            className={`relative p-3 rounded-md transition-colors ${
              isActive(item.href)
                ? 'bg-blue-600 text-white'
                : 'bg-white hover:bg-blue-100 text-blue-900'
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{item.label}</span>
              <span className={`text-xs mt-1 ${isActive(item.href) ? 'text-blue-100' : 'text-blue-700'}`}>
                {item.description}
              </span>
            </div>
            {isActive(item.href) && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </Link>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-blue-200 text-sm text-blue-700">
        <p>
          If you're experiencing issues with the blog, use these diagnostic tools to identify and fix the problem.
        </p>
      </div>
    </div>
  );
} 