import { createClient } from '@/utils/supabase/client'

export async function isAdmin() {
  const supabase = createClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error) return false
    return profile?.role === 'admin'
  } catch (error) {
    return false
  }
}

export async function requireAdmin() {
  const isUserAdmin = await isAdmin()
  if (!isUserAdmin) {
    throw new Error('Unauthorized access')
  }
  return true
} 