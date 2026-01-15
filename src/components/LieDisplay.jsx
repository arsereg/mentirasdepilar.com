import { motion, AnimatePresence } from 'framer-motion'
import { SourceLinks } from './SourceLinks'
import {
  categoryLabels,
  severityLabels,
  formatDate,
} from '../utils/filters'

const categoryIcons = {
  economy: '📊',
  health: '🏥',
  corruption: '💰',
  promises: '🎯',
  statistics: '📈',
  other: '📋',
}

const severityConfig = {
  critical: { class: 'severity-critical', label: 'Crítica', color: 'crimson' },
  major: { class: 'severity-major', label: 'Grave', color: 'orange' },
  moderate: { class: 'severity-moderate', label: 'Moderada', color: 'amber' },
  minor: { class: 'severity-minor', label: 'Menor', color: 'ink' },
}

export function LieDisplay({ lie, onMouseEnter, onMouseLeave }) {
  if (!lie) return null

  const severity = severityConfig[lie.severity] || severityConfig.moderate

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-24 sm:py-32"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.article
          key={lie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl"
        >
          {/* Evidence number - Large display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-end gap-4 mb-6"
          >
            <div className="relative">
              <span className="text-[80px] sm:text-[120px] lg:text-[160px] font-mono font-bold leading-none text-ink-900">
                {String(lie.id).padStart(3, '0')}
              </span>
              <span
                className="absolute -top-2 -right-2 sm:top-0 sm:right-0 text-[80px] sm:text-[120px] lg:text-[160px] font-mono font-bold leading-none gradient-text-crimson"
                style={{
                  WebkitTextStroke: '1px rgba(220, 38, 38, 0.3)',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {String(lie.id).padStart(3, '0')}
              </span>
            </div>
            <div className="pb-4 sm:pb-6 lg:pb-8">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-ink-500">
                Falsedad documentada
              </p>
            </div>
          </motion.div>

          {/* Main document card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="document-card overflow-hidden"
          >
            {/* Top bar with metadata */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-8 py-4 border-b border-ink-800/50 bg-ink-900/50">
              {/* Category and severity */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`category-tag ${severity.class}`}>
                  <span className="mr-1.5">{categoryIcons[lie.category] || '📋'}</span>
                  {categoryLabels[lie.category] || lie.category}
                </span>
                <span className={`category-tag ${severity.class}`}>
                  {severityLabels[lie.severity]}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-ink-400 font-mono">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(lie.date)}
              </div>
            </div>

            {/* Main content */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* The lie statement */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative mb-8"
              >
                {/* Quote marks */}
                <span className="quote-mark -left-2 -top-8 sm:-left-4 sm:-top-10">"</span>

                <blockquote className="relative font-serif text-2xl sm:text-3xl lg:text-4xl text-paper-100 leading-relaxed pl-4 sm:pl-6">
                  {lie.statement}
                </blockquote>

                <span className="quote-mark -right-2 bottom-0 sm:-right-4">"</span>

                {/* Context */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 flex items-start gap-3 pl-4 sm:pl-6"
                >
                  <div className="w-1 h-full min-h-[40px] bg-ink-700 rounded-full flex-shrink-0" />
                  <p className="text-ink-300 text-sm sm:text-base leading-relaxed">
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-500 block mb-1">
                      Contexto
                    </span>
                    {lie.context}
                  </p>
                </motion.div>
              </motion.div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-ink-800/50" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-ink-900 px-4 text-xs font-mono uppercase tracking-[0.3em] text-ink-500">
                    Verificación
                  </span>
                </div>
              </div>

              {/* The truth section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="truth-box"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-evidence-green/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-evidence-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg gradient-text-evidence">
                      La Verdad
                    </h2>
                    <p className="text-xs font-mono uppercase tracking-wider text-ink-500">
                      Según fuentes verificadas
                    </p>
                  </div>
                </div>
                <p className="text-paper-200 leading-relaxed text-base sm:text-lg pl-13">
                  {lie.truth}
                </p>
              </motion.div>

              {/* Sources */}
              <SourceLinks sources={lie.sources} />
            </div>

            {/* Bottom bar */}
            <div className="px-6 sm:px-8 py-4 border-t border-ink-800/50 bg-ink-900/30">
              <div className="flex items-center justify-between text-xs font-mono text-ink-500">
                <span className="uppercase tracking-wider">
                  Expediente #{String(lie.id).padStart(3, '0')}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                  Falsedad verificada
                </span>
              </div>
            </div>
          </motion.div>

          {/* Floating stamp effect for critical lies */}
          {lie.severity === 'critical' && (
            <motion.div
              initial={{ opacity: 0, scale: 2, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              className="absolute -top-2 -right-2 sm:top-4 sm:right-4 lg:top-8 lg:right-8 z-20 pointer-events-none"
            >
              <div className="evidence-stamp">
                <span>Crítico</span>
              </div>
            </motion.div>
          )}
        </motion.article>
      </AnimatePresence>
    </div>
  )
}
