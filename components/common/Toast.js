'use client'

import { useState, useEffect } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  return { toasts, showToast }
}

export function ToastContainer({ toasts }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </div>
  )
}

function Toast({ message, type }) {
  const colors = {
    success: 'bg-green-500/90 border-green-400',
    error: 'bg-red-500/90 border-red-400',
    info: 'bg-blue-500/90 border-blue-400',
    warning: 'bg-yellow-500/90 border-yellow-400',
  }

  const icons = {
    success: '✓',
    error: '✗',
    info: 'ℹ',
    warning: '⚠',
  }

  return (
    <div
      className={`${colors[type]} border backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg animate-slide-up`}
    >
      <div className="flex items-center gap-2">
        <span className="text-white text-lg">{icons[type]}</span>
        <p className="text-white text-sm">{message}</p>
      </div>
    </div>
  )
}
