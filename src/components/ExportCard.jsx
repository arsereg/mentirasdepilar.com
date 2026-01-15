import { forwardRef } from 'react'
import {
  categoryLabels,
  severityLabels,
  formatDate,
} from '../utils/filters'

/**
 * ExportCard - A static, print-ready card for PNG export
 * Renders at exactly 1080x1920 (9:16 vertical format)
 * Note: Uses simple styles compatible with html2canvas (no emojis, no complex gradients on text)
 */
export const ExportCard = forwardRef(({ lie }, ref) => {
  if (!lie) return null

  // Determine font sizes based on content length
  const statementSize = lie.statement.length > 200 ? '30px' : lie.statement.length > 120 ? '36px' : '42px'
  const truthSize = lie.truth.length > 350 ? '20px' : lie.truth.length > 250 ? '22px' : '24px'

  const severityColors = {
    critical: { bg: 'rgba(220, 38, 38, 0.25)', border: '#dc2626', text: '#f87171' },
    major: { bg: 'rgba(249, 115, 22, 0.25)', border: '#f97316', text: '#fb923c' },
    moderate: { bg: 'rgba(245, 158, 11, 0.25)', border: '#f59e0b', text: '#fbbf24' },
    minor: { bg: 'rgba(109, 109, 109, 0.25)', border: '#6d6d6d', text: '#b0b0b0' },
  }
  const sColor = severityColors[lie.severity] || severityColors.moderate

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        width: '1080px',
        height: '1920px',
        fontFamily: "'Outfit', system-ui, sans-serif",
        background: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      {/* Subtle texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Top crimson accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: '#dc2626',
        }}
      />

      {/* Corner brackets */}
      <div style={{ position: 'absolute', top: '40px', left: '40px', width: '60px', height: '60px', borderTop: '3px solid #dc2626', borderLeft: '3px solid #dc2626' }} />
      <div style={{ position: 'absolute', top: '40px', right: '40px', width: '60px', height: '60px', borderTop: '3px solid #dc2626', borderRight: '3px solid #dc2626' }} />
      <div style={{ position: 'absolute', bottom: '40px', left: '40px', width: '60px', height: '60px', borderBottom: '3px solid #dc2626', borderLeft: '3px solid #dc2626' }} />
      <div style={{ position: 'absolute', bottom: '40px', right: '40px', width: '60px', height: '60px', borderBottom: '3px solid #dc2626', borderRight: '3px solid #dc2626' }} />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '70px 70px 60px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '50px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '38px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              MENTIRAS DE CHAVES
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#666666',
                marginTop: '8px',
              }}
            >
              Expediente Documentado
            </div>
          </div>

          {/* Date badge */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              color: '#888888',
              padding: '12px 20px',
              background: '#1a1a1a',
              border: '1px solid #333333',
              borderRadius: '4px',
            }}
          >
            {formatDate(lie.date)}
          </div>
        </div>

        {/* Case number - big and bold */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '30px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '160px',
              fontWeight: 900,
              lineHeight: 0.85,
              color: '#dc2626',
              textShadow: '4px 4px 0px #7f1d1d',
            }}
          >
            {String(lie.id).padStart(3, '0')}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '16px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#555555',
              paddingBottom: '20px',
            }}
          >
            FALSEDAD<br />DOCUMENTADA
          </div>
        </div>

        {/* Tags row */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '14px 24px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: sColor.text,
              background: sColor.bg,
              border: `2px solid ${sColor.border}`,
              borderRadius: '4px',
            }}
          >
            {categoryLabels[lie.category] || lie.category}
          </span>
          <span
            style={{
              display: 'inline-block',
              padding: '14px 24px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: sColor.text,
              background: sColor.bg,
              border: `2px solid ${sColor.border}`,
              borderRadius: '4px',
            }}
          >
            {severityLabels[lie.severity]}
          </span>
        </div>

        {/* Document card */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#111111',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {/* Statement section */}
          <div
            style={{
              position: 'relative',
              padding: '55px 50px 50px',
              borderBottom: '1px solid #222222',
            }}
          >
            {/* Opening quote */}
            <span
              style={{
                position: 'absolute',
                top: '5px',
                left: '25px',
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: '120px',
                lineHeight: 1,
                color: '#2a2a2a',
              }}
            >
              "
            </span>

            <p
              style={{
                position: 'relative',
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: statementSize,
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: '#f5f5f5',
                paddingLeft: '30px',
                paddingRight: '30px',
                zIndex: 1,
              }}
            >
              {lie.statement}
            </p>

            {/* Closing quote */}
            <span
              style={{
                position: 'absolute',
                bottom: '-30px',
                right: '25px',
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: '120px',
                lineHeight: 1,
                color: '#2a2a2a',
              }}
            >
              "
            </span>
          </div>

          {/* Context */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
              padding: '35px 50px',
              background: '#0d0d0d',
              borderBottom: '1px solid #222222',
            }}
          >
            <div
              style={{
                width: '5px',
                minHeight: '60px',
                background: '#444444',
                borderRadius: '3px',
                flexShrink: 0,
              }}
            />
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#666666',
                  marginBottom: '12px',
                }}
              >
                Contexto
              </span>
              <p
                style={{
                  fontSize: '20px',
                  lineHeight: 1.6,
                  color: '#999999',
                }}
              >
                {lie.context}
              </p>
            </div>
          </div>

          {/* Truth section */}
          <div
            style={{
              flex: 1,
              padding: '40px 50px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                flex: 1,
                padding: '35px 40px',
                background: 'rgba(22, 163, 74, 0.1)',
                border: '2px solid rgba(22, 163, 74, 0.3)',
                borderLeft: '6px solid #16a34a',
                borderRadius: '8px',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '25px' }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(22, 163, 74, 0.2)',
                    borderRadius: '8px',
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '26px',
                      fontWeight: 800,
                      color: '#22c55e',
                    }}
                  >
                    LA VERDAD
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#666666',
                      marginTop: '4px',
                    }}
                  >
                    Segun fuentes verificadas
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontSize: truthSize,
                  lineHeight: 1.7,
                  color: '#e0e0e0',
                }}
              >
                {lie.truth}
              </p>
            </div>

            {/* Sources */}
            {lie.sources && lie.sources.length > 0 && (
              <div style={{ marginTop: '30px' }}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '12px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#555555',
                    marginBottom: '15px',
                  }}
                >
                  Fuentes ({lie.sources.length})
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {lie.sources.slice(0, 3).map((source, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '14px 22px',
                        background: '#1a1a1a',
                        border: '1px solid #333333',
                        borderRadius: '4px',
                        fontSize: '15px',
                        color: '#999999',
                      }}
                    >
                      {source.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '35px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#444444',
            }}
          >
            Expediente #{String(lie.id).padStart(3, '0')}
          </span>

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '16px',
              letterSpacing: '0.1em',
              color: '#555555',
            }}
          >
            mentirasdechaves.com
          </span>

          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              color: '#444444',
            }}
          >
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#dc2626',
              }}
            />
            Falsedad Verificada
          </span>
        </div>
      </div>

      {/* Critical severity stamp */}
      {lie.severity === 'critical' && (
        <div
          style={{
            position: 'absolute',
            top: '280px',
            right: '60px',
            padding: '18px 36px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '22px',
            fontWeight: 900,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#ffffff',
            background: '#b91c1c',
            border: '4px solid #991b1b',
            transform: 'rotate(-12deg)',
            zIndex: 20,
          }}
        >
          CRITICO
        </div>
      )}
    </div>
  )
})

ExportCard.displayName = 'ExportCard'
