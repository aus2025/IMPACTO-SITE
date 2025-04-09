'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastProps {
  id: string
  title?: string
  description?: string
  type?: ToastType
  duration?: number
  onClose?: () => void
}

interface ToastContextValue {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = React.useCallback(
    (toast: Omit<ToastProps, 'id'>) => {
      const id = Math.random().toString(36).slice(2)
      const newToast = { ...toast, id }
      
      setToasts((prev) => [...prev, newToast])
      
      if (toast.duration !== Infinity) {
        setTimeout(() => {
          removeToast(id)
          toast.onClose?.()
        }, toast.duration || 5000)
      }
    },
    []
  )

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const value = React.useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
    }),
    [toasts, addToast, removeToast]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const toast = (props: Omit<ToastProps, 'id'>) => {
  const { addToast } = useToast()
  addToast(props)
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "p-4 rounded-md shadow-md flex items-start",
            {
              'bg-green-50 text-green-800 border-l-4 border-green-500': toast.type === 'success',
              'bg-red-50 text-red-800 border-l-4 border-red-500': toast.type === 'error',
              'bg-blue-50 text-blue-800 border-l-4 border-blue-500': toast.type === 'info',
              'bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500': toast.type === 'warning',
              'bg-gray-50 text-gray-800 border-l-4 border-gray-500': !toast.type,
            }
          )}
        >
          <div className="flex-1">
            {toast.title && <h4 className="font-medium mb-1">{toast.title}</h4>}
            {toast.description && <p className="text-sm">{toast.description}</p>}
          </div>
          <button
            onClick={() => {
              removeToast(toast.id)
              toast.onClose?.()
            }}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
} 