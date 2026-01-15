export const categoryLabels = {
  economy: 'Economía',
  health: 'Salud',
  corruption: 'Corrupción',
  promises: 'Promesas',
  statistics: 'Estadísticas',
  other: 'Otros',
}

export const categoryColors = {
  economy: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  health: 'bg-green-500/20 text-green-300 border-green-500/30',
  corruption: 'bg-red-500/20 text-red-300 border-red-500/30',
  promises: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  statistics: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  other: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
}

export const severityLabels = {
  minor: 'Menor',
  moderate: 'Moderada',
  major: 'Mayor',
  critical: 'Crítica',
}

export const severityColors = {
  minor: 'bg-slate-500/20 text-slate-300',
  moderate: 'bg-yellow-500/20 text-yellow-300',
  major: 'bg-orange-500/20 text-orange-300',
  critical: 'bg-red-500/20 text-red-300',
}

export const partyLabels = {
  PPSD: 'Partido PPSD',
  personal: 'Personal',
  cabinet: 'Gabinete',
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-CR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getSourceIcon(type) {
  switch (type) {
    case 'news':
      return '📰'
    case 'official_document':
      return '📄'
    case 'video':
      return '🎥'
    case 'audio':
      return '🎙️'
    default:
      return '🔗'
  }
}
