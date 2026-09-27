import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const COLORS = ['#2563EB', '#3B82F6', '#93C5FD', '#BFDBFE', '#7DD3FC', '#A5F3FC', '#E0F2FE']

/**
 * Celebración elegante: una sola ráfaga suave de partículas.
 */
export default function Celebration() {
  const reduce = useReducedMotion()
  const pieces = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => {
        const angle = (i / 34) * Math.PI * 2 + (i % 3) * 0.2
        const dist = 140 + ((i * 37) % 160)
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist * 0.75 - 40,
          fall: 120 + ((i * 29) % 140),
          rotate: ((i * 47) % 360) - 180,
          size: 6 + ((i * 5) % 6),
          round: i % 3 === 0,
          color: COLORS[i % COLORS.length],
          delay: (i % 6) * 0.025,
        }
      }),
    [],
  )
  if (reduce) return null
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-[34%] z-0 h-0 w-0">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute block"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.45,
            borderRadius: p.round ? 999 : 2,
            background: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
          animate={{
            x: [0, p.x, p.x * 1.08],
            y: [0, p.y, p.y + p.fall],
            opacity: [0, 1, 0],
            scale: [0.4, 1, 0.8],
            rotate: [0, p.rotate, p.rotate * 1.6],
          }}
          transition={{ duration: 2.4, delay: 0.35 + p.delay, ease: [0.16, 1, 0.3, 1], times: [0, 0.35, 1] }}
        />
      ))}
    </div>
  )
}
