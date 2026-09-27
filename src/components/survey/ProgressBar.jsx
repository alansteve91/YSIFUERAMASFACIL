import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full">
      <div className="mb-2 flex items-baseline justify-between text-[12.5px] font-medium">
        <span className="text-ink-mute">
          Pregunta <span className="tabular-nums text-ink">{current}</span> de{' '}
          <span className="tabular-nums">{total}</span>
        </span>
        <span className="tabular-nums text-ink-faint">{pct}%</span>
      </div>
      <div
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-ink/[.06]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Progreso de la encuesta"
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-[#E879A9]"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
        >
          <span className="absolute inset-0 animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent)] bg-[length:200%_100%]" />
        </motion.div>
      </div>
    </div>
  )
}
