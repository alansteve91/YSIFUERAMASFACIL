import { useMemo } from 'react'

/**
 * Fondo abstracto animado: orbes difuminados + cuadrícula + partículas suaves.
 * variant: 'landing' | 'survey' | 'final' | 'done'
 */
const PALETTES = {
  landing: ['from-brand-300/70 to-glow-sky/60', 'from-glow-rose/60 to-brand-200/60', 'from-glow-sky/50 to-glow-mint/40'],
  survey: ['from-brand-200/60 to-glow-sky/40', 'from-glow-rose/35 to-brand-100/50', 'from-glow-sky/30 to-brand-100/30'],
  final: ['from-brand-400/60 to-glow-rose/50', 'from-glow-peach/45 to-glow-rose/45', 'from-brand-300/50 to-glow-sky/40'],
  done: ['from-glow-mint/45 to-glow-sky/45', 'from-brand-300/55 to-glow-rose/40', 'from-glow-peach/35 to-brand-200/40'],
}

export default function BackgroundScene({ variant = 'survey', particles = true }) {
  const p = PALETTES[variant] || PALETTES.survey

  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${(i * 73) % 100}%`,
        size: 3 + ((i * 7) % 5),
        duration: 22 + ((i * 11) % 18),
        delay: -((i * 5) % 30),
        opacity: 0.25 + ((i * 13) % 40) / 100,
      })),
    [],
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden noise">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#FFFFFF_0%,#F7F7FB_55%,#F1F0F8_100%)]" />
      <div className="grid-fade absolute inset-0 opacity-70" />

      <div
        className={`absolute -left-[12%] -top-[18%] h-[55vmax] w-[55vmax] rounded-full bg-gradient-to-br ${p[0]} blur-[90px] animate-float transition-all duration-1000`}
      />
      <div
        className={`absolute -right-[15%] top-[20%] h-[48vmax] w-[48vmax] rounded-full bg-gradient-to-br ${p[1]} blur-[100px] animate-float-slow transition-all duration-1000`}
        style={{ animationDelay: '-8s' }}
      />
      <div
        className={`absolute -bottom-[25%] left-[20%] h-[45vmax] w-[45vmax] rounded-full bg-gradient-to-tr ${p[2]} blur-[110px] animate-float transition-all duration-1000`}
        style={{ animationDelay: '-14s' }}
      />

      {/* Anillo sutil */}
      <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 opacity-60 animate-spinslow [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      {particles &&
        dots.map((d, i) => (
          <span
            key={i}
            className="absolute bottom-[-10px] rounded-full bg-white shadow-[0_0_12px_rgba(138,125,251,.6)] animate-drift"
            style={{
              left: d.left,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
            }}
          />
        ))}
    </div>
  )
}
