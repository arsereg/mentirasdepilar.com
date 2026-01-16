import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExportCard } from './ExportCard'
import { exportToPNG, createFilename } from '../utils/exportImage'

export function ExportButton({ lie }) {
  const [isExporting, setIsExporting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const exportRef = useRef(null)

  const handleExport = useCallback(async () => {
    if (!lie || isExporting) return

    setIsExporting(true)

    try {
      // Small delay to ensure the export card is rendered
      await new Promise(resolve => setTimeout(resolve, 100))

      const filename = createFilename(lie)
      await exportToPNG(exportRef.current, filename)

      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }, [lie, isExporting])

  // Keyboard shortcut: E to export
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only trigger on 'E' key, ignore if modifier keys are pressed
      if (e.key === 'e' || e.key === 'E') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          // Don't trigger if user is typing in an input field
          if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault()
            handleExport()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleExport])

  return (
    <>
      {/* Hidden export card - rendered off-screen for capture */}
      <ExportCard ref={exportRef} lie={lie} />

      {/* Export button */}
      <motion.button
        onClick={handleExport}
        disabled={isExporting || !lie}
        className="nav-btn relative group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        title="Exportar como imagen PNG (1920x1080)"
      >
        <AnimatePresence mode="wait">
          {isExporting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="hidden sm:inline">Exportando...</span>
            </motion.div>
          ) : showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-evidence-green"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="hidden sm:inline">Descargado</span>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              {/* Camera/Export icon */}
              <svg
                className="w-5 h-5 transition-transform group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <span className="hidden sm:inline">PNG</span>
              <span
                className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono bg-ink-800 rounded border border-ink-700"
              >
                E
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
          }}
        />
      </motion.button>
    </>
  )
}
