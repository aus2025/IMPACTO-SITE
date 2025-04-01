import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server-pages-app'
import { cookies } from 'next/headers'

import AdminLayout from '@/app/admin/layout'

export const metadata: Metadata = {
  title: 'Lead Reports | Impacto Admin',
  description: 'Lead analytics and reporting dashboard',
}

export default async function LeadReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side authentication check
  const supabase = createClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/signin?callbackUrl=/admin/reports/leads')
  }
  
  // Check user role (admin only)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()
  
  if (!profile || profile.role !== 'admin') {
    redirect('/admin')
  }
  
  return children
} 