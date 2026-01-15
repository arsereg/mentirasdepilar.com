import html2canvas from 'html2canvas'

/**
 * Exports a DOM element as a PNG image
 * @param {HTMLElement} element - The DOM element to export
 * @param {string} filename - The filename for the exported image
 * @returns {Promise<void>}
 */
export async function exportToPNG(element, filename = 'mentira') {
  if (!element) {
    console.error('No element provided for export')
    return
  }

  try {
    // Wait for fonts to load
    await document.fonts.ready

    // Create canvas with high quality settings
    // Dimensions: 1080x1920 (9:16 vertical format)
    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0a0a0a',
      width: 1080,
      height: 1920,
      logging: false,
      letterRendering: true,
    })

    // Convert to PNG and download
    const dataUrl = canvas.toDataURL('image/png', 1.0)

    // Create download link
    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = dataUrl
    link.click()

    return dataUrl
  } catch (error) {
    console.error('Error exporting image:', error)
    throw error
  }
}

/**
 * Creates a sanitized filename from the lie data
 * @param {Object} lie - The lie object
 * @returns {string}
 */
export function createFilename(lie) {
  if (!lie) return 'mentira'

  const id = String(lie.id).padStart(3, '0')
  const date = lie.date ? lie.date.replace(/-/g, '') : ''
  const category = lie.category || 'general'

  return `mentira-${id}-${category}-${date}`
}
