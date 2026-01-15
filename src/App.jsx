import { useCallback } from 'react'
import { Background } from './components/Background'
import { Header } from './components/Header'
import { LieDisplay } from './components/LieDisplay'
import { Navigation } from './components/Navigation'
import { useLieNavigation } from './hooks/useLieNavigation'

function App() {
  const {
    currentLie,
    currentIndex,
    totalLies,
    goToNext,
    goToPrevious,
    goToRandom,
    categoryFilter,
    setCategoryFilter,
    severityFilter,
    setSeverityFilter,
    setIsPaused,
    categories,
  } = useLieNavigation()

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true)
  }, [setIsPaused])

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false)
  }, [setIsPaused])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated background */}
      <Background />

      {/* Header with counter */}
      <Header totalLies={totalLies} currentIndex={currentIndex} />

      {/* Main content - lie display */}
      <main className="relative z-10">
        <LieDisplay
          lie={currentLie}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </main>

      {/* Navigation bar */}
      <Navigation
        onPrevious={goToPrevious}
        onNext={goToNext}
        onRandom={goToRandom}
        currentLie={currentLie}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
        categories={categories}
      />
    </div>
  )
}

export default App
