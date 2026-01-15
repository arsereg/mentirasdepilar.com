import { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

export function Background() {
  const canvasRef = useRef(null)

  // Generate random document fragments for floating effect
  const fragments = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 30 - 15,
      scale: 0.5 + Math.random() * 0.5,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Draw subtle grid and effects
    const animate = () => {
      time += 0.002

      // Clear with fade effect
      ctx.fillStyle = 'rgba(13, 13, 13, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.008)'
      ctx.lineWidth = 1
      const gridSize = 60

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw subtle floating particles (like dust in spotlight)
      const numParticles = 30
      for (let i = 0; i < numParticles; i++) {
        const x = (Math.sin(time + i * 0.5) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(time * 0.7 + i * 0.3) * 0.5 + 0.5) * canvas.height
        const size = 1 + Math.sin(time + i) * 0.5
        const opacity = 0.03 + Math.sin(time * 2 + i) * 0.02

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 38, 38, ${opacity})`
        ctx.fill()
      }

      // Draw scan line
      const scanY = ((time * 50) % (canvas.height + 100)) - 50
      const gradient = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2)
      gradient.addColorStop(0, 'rgba(220, 38, 38, 0)')
      gradient.addColorStop(0.5, 'rgba(220, 38, 38, 0.03)')
      gradient.addColorStop(1, 'rgba(220, 38, 38, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, scanY - 2, canvas.width, 4)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Base dark gradient */}
      <div
        className="fixed inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(220, 38, 38, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(202, 138, 4, 0.04) 0%, transparent 40%),
            linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%)
          `,
        }}
      />

      {/* Canvas for animated effects */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Floating document fragments */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {fragments.map((fragment) => (
          <motion.div
            key={fragment.id}
            className="absolute w-16 h-20 opacity-[0.02]"
            style={{
              left: `${fragment.x}%`,
              top: `${fragment.y}%`,
              rotate: fragment.rotation,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [fragment.rotation, fragment.rotation + 5, fragment.rotation],
              opacity: [0.015, 0.025, 0.015],
            }}
            transition={{
              duration: fragment.duration,
              repeat: Infinity,
              delay: fragment.delay,
              ease: 'easeInOut',
            }}
          >
            <div
              className="w-full h-full border border-white/10 bg-white/5"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
              }}
            >
              <div className="h-1 w-8 bg-white/20 mt-2 ml-2" />
              <div className="h-0.5 w-10 bg-white/10 mt-1 ml-2" />
              <div className="h-0.5 w-6 bg-white/10 mt-1 ml-2" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top light beam */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(220, 38, 38, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Corner accents */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-4 left-0 w-16 h-px bg-gradient-to-r from-crimson-500/30 to-transparent" />
        <div className="absolute top-0 left-4 w-px h-16 bg-gradient-to-b from-crimson-500/30 to-transparent" />
      </div>

      <div className="fixed top-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-4 right-0 w-16 h-px bg-gradient-to-l from-crimson-500/30 to-transparent" />
        <div className="absolute top-0 right-4 w-px h-16 bg-gradient-to-b from-crimson-500/30 to-transparent" />
      </div>

      <div className="fixed bottom-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-4 left-0 w-16 h-px bg-gradient-to-r from-crimson-500/20 to-transparent" />
        <div className="absolute bottom-0 left-4 w-px h-16 bg-gradient-to-t from-crimson-500/20 to-transparent" />
      </div>

      <div className="fixed bottom-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-4 right-0 w-16 h-px bg-gradient-to-l from-crimson-500/20 to-transparent" />
        <div className="absolute bottom-0 right-4 w-px h-16 bg-gradient-to-t from-crimson-500/20 to-transparent" />
      </div>
    </>
  )
}
