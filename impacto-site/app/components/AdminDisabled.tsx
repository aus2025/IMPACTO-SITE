'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDisabled() {
  const router = useRouter()
  
  useEffect(() => {
    // Automatically redirect to home page after 3 seconds
    const redirectTimer = setTimeout(() => {
      router.push('/')
    }, 3000)
    
    return () => {
      clearTimeout(redirectTimer)
    }
  }, [router])
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Admin Panel Disabled
        </h1>
        <p className="text-gray-700 mb-4">
          The admin panel is not available in this deployment.
        </p>
        <p className="text-gray-600 mb-6">
          You will be redirected to the home page in a few seconds...
        </p>
        <button
          onClick={() => router.push('/')}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Home Page
        </button>
      </div>
    </div>
  )
} 