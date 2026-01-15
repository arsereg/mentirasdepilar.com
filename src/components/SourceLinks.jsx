import { motion } from 'framer-motion'
import { getSourceIcon } from '../utils/filters'

const sourceTypeLabels = {
  news: 'Noticia',
  official_document: 'Documento oficial',
  video: 'Video',
  audio: 'Audio',
}

export function SourceLinks({ sources }) {
  if (!sources || sources.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="mt-8 pt-6 border-t border-ink-800/30"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-sm bg-evidence-blue/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-evidence-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-paper-100">Fuentes verificables</h3>
          <p className="text-xs font-mono uppercase tracking-wider text-ink-500">
            {sources.length} fuente{sources.length > 1 ? 's' : ''} independiente{sources.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {sources.map((source, index) => (
          <motion.a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-chip group"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.01, x: 2 }}
          >
            <span className="text-lg flex-shrink-0">{getSourceIcon(source.type)}</span>
            <div className="flex-1 min-w-0">
              <span className="block text-paper-200 group-hover:text-paper-100 transition-colors truncate">
                {source.name}
              </span>
              <span className="block text-xs text-ink-500 font-mono">
                {sourceTypeLabels[source.type] || 'Fuente'}
              </span>
            </div>
            <svg
              className="w-4 h-4 text-ink-500 group-hover:text-paper-300 transition-all group-hover:translate-x-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
