import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ShareButton({ lie }) {
  const [showCopied, setShowCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?lie=${lie.id}`
    const text = `Falsedad #${lie.id} de Rodrigo Chaves: "${lie.statement.substring(0, 100)}..."`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mentiras de Rodrigo Chaves - Expediente Documentado',
          text: text,
          url: url,
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(url)
        }
      }
    } else {
      copyToClipboard(url)
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleShare}
        className="nav-btn group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          />
        </svg>
        <span className="hidden sm:inline font-medium">Compartir</span>
      </motion.button>

      <AnimatePresence>
        {showCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-50"
          >
            <div className="flex items-center gap-2 bg-evidence-green text-white text-sm font-medium px-4 py-2 rounded-sm shadow-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Enlace copiado
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
