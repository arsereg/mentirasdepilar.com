import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categoryLabels, severityLabels } from '../utils/filters'

const categoryIcons = {
  economy: '📊',
  health: '🏥',
  corruption: '💰',
  promises: '🎯',
  statistics: '📈',
  other: '📋',
}

export function FilterPanel({
  categoryFilter,
  setCategoryFilter,
  severityFilter,
  setSeverityFilter,
  categories,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const severities = ['all', 'minor', 'moderate', 'major', 'critical']
  const hasActiveFilters = categoryFilter !== 'all' || severityFilter !== 'all'

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`nav-btn ${hasActiveFilters ? 'border-crimson-500/50 bg-crimson-500/10' : ''}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
        <span className="hidden sm:inline font-medium">Filtrar</span>
        {hasActiveFilters && (
          <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute bottom-full mb-3 right-0 z-50 glass-panel p-5 min-w-[320px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-ink-700/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-sm bg-crimson-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-crimson-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-paper-100">Filtros</h3>
                    <p className="text-xs text-ink-400 font-mono">Refinar resultados</p>
                  </div>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      setCategoryFilter('all')
                      setSeverityFilter('all')
                    }}
                    className="text-xs font-medium text-crimson-400 hover:text-crimson-300 transition-colors"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {/* Category filter */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-400 mb-3">
                    Categoría
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setCategoryFilter('all')}
                      className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                        categoryFilter === 'all'
                          ? 'bg-crimson-500/20 text-crimson-400 border border-crimson-500/40'
                          : 'bg-ink-800/50 text-ink-300 border border-ink-700/30 hover:bg-ink-700/50 hover:border-ink-600/50'
                      }`}
                    >
                      Todas
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all flex items-center gap-1.5 ${
                          categoryFilter === cat
                            ? 'bg-crimson-500/20 text-crimson-400 border border-crimson-500/40'
                            : 'bg-ink-800/50 text-ink-300 border border-ink-700/30 hover:bg-ink-700/50 hover:border-ink-600/50'
                        }`}
                      >
                        <span>{categoryIcons[cat] || '📋'}</span>
                        {categoryLabels[cat] || cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Severity filter */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-400 mb-3">
                    Gravedad
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {severities.map(sev => (
                      <button
                        key={sev}
                        onClick={() => setSeverityFilter(sev)}
                        className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                          severityFilter === sev
                            ? 'bg-crimson-500/20 text-crimson-400 border border-crimson-500/40'
                            : 'bg-ink-800/50 text-ink-300 border border-ink-700/30 hover:bg-ink-700/50 hover:border-ink-600/50'
                        }`}
                      >
                        {sev === 'all' ? 'Todas' : severityLabels[sev]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
