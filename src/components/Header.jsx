import { motion } from 'framer-motion'

export function Header({ totalLies, currentIndex }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 header-bar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-crimson-600 rounded-sm"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)',
                  }}
                />
                <span className="relative text-xl sm:text-2xl font-bold text-white font-mono">!</span>
              </div>
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-crimson-500/30 blur-xl rounded-full" />
            </motion.div>

            {/* Title */}
            <div className="flex flex-col">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl font-bold tracking-tight"
              >
                <span className="text-paper-100">Mentiras de </span>
                <span className="gradient-text-crimson">Rodrigo Chaves</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-ink-400"
              >
                Expediente documentado
              </motion.p>
            </div>
          </div>

          {/* Counter Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Current / Total indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center"
            >
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-ink-900/60 border border-ink-800/50 rounded-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-ink-400">Caso</span>
                <div className="flex items-baseline gap-1">
                  <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-mono font-bold text-crimson-400 counter-display"
                  >
                    {String(currentIndex + 1).padStart(3, '0')}
                  </motion.span>
                  <span className="text-ink-600 font-mono">/</span>
                  <span className="text-sm font-mono text-ink-400">{totalLies}</span>
                </div>
              </div>

              {/* Mobile version */}
              <div className="flex sm:hidden items-center gap-1 px-3 py-1.5 bg-ink-900/60 border border-ink-800/50 rounded-sm">
                <motion.span
                  key={currentIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-mono font-bold text-crimson-400 counter-display"
                >
                  {currentIndex + 1}
                </motion.span>
                <span className="text-ink-600 font-mono text-sm">/</span>
                <span className="text-sm font-mono text-ink-400">{totalLies}</span>
              </div>
            </motion.div>

            {/* Total badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-crimson-500/10 border border-crimson-500/30 rounded-sm"
            >
              <div className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-crimson-400">
                {totalLies} falsedades documentadas
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-crimson-500/50 to-transparent" />
      </div>
    </motion.header>
  )
}
