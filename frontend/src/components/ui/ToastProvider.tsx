import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import * as Toast from '@radix-ui/react-toast'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToastMessage {
  id: string
  title: string
  description?: string
  type: 'success' | 'error' | 'info'
}

interface ToastContextType {
  toast: (msg: Omit<ToastMessage, 'id'>) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast outside ToastProvider')
  return ctx
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const toast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { ...msg, id }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast.Root key={t.id} asChild open>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                className="fixed bottom-6 right-6 z-[200] bg-white border border-navy/10 shadow-xl p-4 flex items-start gap-3 max-w-xs"
              >
                {t.type === 'success' && <CheckCircle size={18} className="text-sage mt-0.5 shrink-0" />}
                {t.type === 'error' && <XCircle size={18} className="text-orange mt-0.5 shrink-0" />}
                <div className="flex-1">
                  <Toast.Title className="text-sm font-sans font-medium text-navy">{t.title}</Toast.Title>
                  {t.description && (
                    <Toast.Description className="text-xs text-navy/60 mt-0.5">{t.description}</Toast.Description>
                  )}
                </div>
                <Toast.Close asChild>
                  <button
                    onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                    className="text-navy/30 hover:text-navy"
                  >
                    <X size={14} />
                  </button>
                </Toast.Close>
              </motion.div>
            </Toast.Root>
          ))}
        </AnimatePresence>
        <Toast.Viewport />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}
