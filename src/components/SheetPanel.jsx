import React from 'react'
import { X, Maximize2, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SheetPanel({ open, onClose, title, icon: Icon, breadcrumb = [], children, full=false, onToggleFull }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: full ? 0.6 : 0.2 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`fixed top-0 right-0 h-full z-50 bg-white/80 backdrop-blur-lg border-l shadow-2xl ${full ? 'w-full' : 'w-[50vw]'} max-w-screen`}
            role="dialog" aria-modal="true"
          >
            <header className="sticky top-0 bg-white/70 backdrop-blur z-10 border-b">
              <div className="flex items-center justify-between h-14 px-4">
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-5 h-5 text-teal-600" />}
                  <div className="font-semibold">{title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={onToggleFull} className="p-2 rounded hover:bg-gray-100" aria-label="Maximize">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button onClick={onClose} className="p-2 rounded hover:bg-gray-100" aria-label="Close">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {breadcrumb.length > 0 && (
                <div className="px-4 pb-2 text-sm text-gray-600 flex items-center gap-1">
                  {breadcrumb.map((b, i)=> (
                    <span key={i} className="flex items-center gap-1">
                      <span>{b}</span>
                      {i < breadcrumb.length-1 && <ChevronRight className="w-3 h-3" />}
                    </span>
                  ))}
                </div>
              )}
            </header>
            <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
              {children}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
