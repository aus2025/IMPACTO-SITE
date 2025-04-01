'use client'

import { usePathname } from 'next/navigation'
import AdminWrapper from '@/components/admin/AdminWrapper'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Don't run authentication checks on login and password reset pages
  const isAuthPage = [
    '/admin/login',
    '/admin/forgot-password',
    '/admin/reset-password',
  ].includes(pathname)

  // Auth pages don't need the admin wrapper
  if (isAuthPage) {
    return <>{children}</>
  }

  return <AdminWrapper>{children}</AdminWrapper>
} 