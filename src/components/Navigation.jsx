import { motion } from 'framer-motion'
import { FilterPanel } from './FilterPanel'
import { ShareButton } from './ShareButton'

export function Navigation({
  onPrevious,
  onNext,
  onRandom,
  currentLie,
  categoryFilter,
  setCategoryFilter,
  severityFilter,
  setSeverityFilter,
  categories,
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Background blur */}
      <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-lg border-t border-ink-800/50" />

      <div className="relative max-w-4xl mx-auto px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          {/* Previous button */}
          <motion.button
            onClick={onPrevious}
            className="nav-btn group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <span className="hidden sm:inline font-medium">Anterior</span>
          </motion.button>

          {/* Center actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Random button */}
            <motion.button
              onClick={onRandom}
              className="nav-btn group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                />
              </svg>
              <span className="hidden sm:inline font-medium">Aleatorio</span>
            </motion.button>

            {/* Share button */}
            <ShareButton lie={currentLie} />

            {/* Filter panel */}
            <FilterPanel
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              severityFilter={severityFilter}
              setSeverityFilter={setSeverityFilter}
              categories={categories}
            />
          </div>

          {/* Next button */}
          <motion.button
            onClick={onNext}
            className="nav-btn group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="hidden sm:inline font-medium">Siguiente</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </motion.button>
        </div>

        {/* Keyboard hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="hidden md:flex justify-center mt-3 gap-6 text-xs font-mono text-ink-500"
        >
          <span className="flex items-center gap-2">
            <kbd className="px-2 py-0.5 bg-ink-800/50 border border-ink-700/50 rounded text-ink-400">←</kbd>
            <kbd className="px-2 py-0.5 bg-ink-800/50 border border-ink-700/50 rounded text-ink-400">→</kbd>
            <span>Navegar</span>
          </span>
          <span className="flex items-center gap-2">
            <kbd className="px-2 py-0.5 bg-ink-800/50 border border-ink-700/50 rounded text-ink-400">Espacio</kbd>
            <span>Aleatorio</span>
          </span>
        </motion.div>
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-crimson-500/30 to-transparent" />
      </div>
    </motion.nav>
  )
}
