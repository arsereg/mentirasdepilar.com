import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import liesData from '../data/lies.json'

export function useLieNavigation() {
  // Initialize currentIndex from URL parameter if present
  const [currentIndex, setCurrentIndex] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const lieId = params.get('lie')
    if (lieId) {
      const id = parseInt(lieId, 10)
      const index = liesData.lies.findIndex(lie => lie.id === id)
      if (index !== -1) {
        return index
      }
    }
    return 0
  })
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [isPaused, setIsPaused] = useState(false)
  const prevFilters = useRef({ category: 'all', severity: 'all' })

  // Filter lies based on current filters
  const filteredLies = useMemo(() => {
    return liesData.lies.filter(lie => {
      const matchesCategory = categoryFilter === 'all' || lie.category === categoryFilter
      const matchesSeverity = severityFilter === 'all' || lie.severity === severityFilter
      return matchesCategory && matchesSeverity
    })
  }, [categoryFilter, severityFilter])

  // Current lie
  const currentLie = filteredLies[currentIndex] || filteredLies[0]
  const totalLies = filteredLies.length

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % filteredLies.length)
  }, [filteredLies.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + filteredLies.length) % filteredLies.length)
  }, [filteredLies.length])

  const goToRandom = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * filteredLies.length)
    setCurrentIndex(randomIndex)
  }, [filteredLies.length])

  const goToLie = useCallback((id) => {
    const index = filteredLies.findIndex(lie => lie.id === id)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }, [filteredLies])


  // Update URL when lie changes
  useEffect(() => {
    if (currentLie) {
      const url = new URL(window.location.href)
      url.searchParams.set('lie', currentLie.id.toString())
      window.history.replaceState({}, '', url.toString())
    }
  }, [currentLie])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === ' ') {
        e.preventDefault()
        goToRandom()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious, goToRandom])

  // Auto-advance every 30 seconds (pause on hover)
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      goToNext()
    }, 30000)

    return () => clearInterval(interval)
  }, [goToNext, isPaused])

  // Reset index when filters actually change (not on initial mount)
  useEffect(() => {
    const filtersChanged =
      prevFilters.current.category !== categoryFilter ||
      prevFilters.current.severity !== severityFilter

    if (filtersChanged) {
      setCurrentIndex(0)
    }

    prevFilters.current = { category: categoryFilter, severity: severityFilter }
  }, [categoryFilter, severityFilter])

  return {
    currentLie,
    currentIndex,
    totalLies,
    allLies: liesData.lies,
    filteredLies,
    goToNext,
    goToPrevious,
    goToRandom,
    goToLie,
    categoryFilter,
    setCategoryFilter,
    severityFilter,
    setSeverityFilter,
    setIsPaused,
    categories: liesData.metadata.categories,
  }
}
