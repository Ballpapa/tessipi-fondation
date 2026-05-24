import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(null)

/**
 * Fournit showToast(message, type) à toute l'application et rend le toast.
 * Reproduit le comportement de showToast() de l'ancien main.js.
 */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: '', type: 'success', active: false })
  const timerRef = useRef(null)

  const showToast = useCallback((message, type = 'success') => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ message, type, active: true })
    timerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, active: false }))
    }, 4000)
  }, [])

  const isError = toast.type === 'error'

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className={`toast${toast.active ? ' active' : ''}`} id="toast">
        <i
          className={isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}
          style={{ color: isError ? '#EF4444' : '#22C55E' }}
        />
        <span id="toastMessage">{toast.message}</span>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast doit être utilisé dans un ToastProvider')
  return ctx
}
