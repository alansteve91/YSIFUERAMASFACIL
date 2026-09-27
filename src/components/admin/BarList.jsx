import { motion } from 'framer-motion'
import { EmptyState } from './ChartCard'

/**
 * Barras horizontales (una sola serie, un solo tono).
 * Etiqueta a la izquierda, valor a la derecha, porcentaje al pasar el mouse.
 */
export default function BarList({ data, total, unit = '', limit }) {
  const rows = (limit ? data.slice(0, limit) : data).filter((d) => d.value > 0)
  if (!rows.length) return <EmptyState />
  const max = Math.max(...rows.map((d) => d.value))
  return (
    <ul className="space-y-3">
      {rows.map((d, i) => {
        const pct = total ? Math.round((d.value / total) * 100) : null
        return (
          <li key={d.key} className="group" title={`${d.label}: ${d.value}${pct != null ? ` (${pct}%)` : ''}`}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-[13.5px]">
              <span className="truncate font-medium text-ink-soft">{d.label}</span>
              <span className="shrink-0 tabular-nums text-ink">
                <span className="mr-1.5 text-[12px] text-ink-faint opacity-0 transition-opacity group-hover:opacity-100">
                  {pct != null && `${pct}%`}
                </span>
                {d.value}
                {unit && <span className="ml-1 text-ink-faint">{unit}</span>}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ink/[.05]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(d.value / max) * 100}%` }}
                transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-brand-500 transition-colors group-hover:bg-brand-600"
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
