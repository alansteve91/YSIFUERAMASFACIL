import { motion } from 'framer-motion'
import { Flame, Coins, Zap, Lightbulb, Sparkles } from 'lucide-react'
import { OPPORTUNITY_GROUPS } from '../../data/opportunities'

const TONES = {
  rose: { icon: Flame, chip: 'bg-rose-50 text-rose-600', dot: 'bg-rose-400' },
  amber: { icon: Coins, chip: 'bg-amber-50 text-amber-600', dot: 'bg-amber-400' },
  sky: { icon: Zap, chip: 'bg-sky-50 text-sky-600', dot: 'bg-sky-400' },
  brand: { icon: Lightbulb, chip: 'bg-brand-50 text-brand-600', dot: 'bg-brand-400' },
}

export default function Opportunities() {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2 rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 px-4 py-3 text-[13px] text-brand-800">
        <Sparkles className="h-4 w-4 shrink-0" />
        <span>
          <strong className="font-semibold">Datos simulados.</strong> Esta sección se conectará a un análisis con IA que agrupará
          los problemas automáticamente.
        </span>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {OPPORTUNITY_GROUPS.map((g, gi) => {
          const t = TONES[g.tone]
          const Icon = t.icon
          return (
            <motion.section
              key={g.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: gi * 0.06 }}
              className="card-admin"
            >
              <header className="mb-4 flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${t.chip}`}>
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold tracking-tight">{g.title}</h3>
                  <p className="text-[12.5px] text-ink-mute">{g.description}</p>
                </div>
              </header>
              <ul className="divide-y divide-ink/[.05]">
                {g.items.map((it) => (
                  <li key={it.title} className="flex items-center gap-3 py-3">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${t.dot}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-medium leading-snug text-ink">{it.title}</p>
                      <p className="mt-0.5 text-[12.5px] text-ink-mute">{it.trend}</p>
                    </div>
                    {it.score != null ? (
                      <div className="flex shrink-0 flex-col items-end">
                        <span className="text-[15px] font-semibold tabular-nums">{it.score}</span>
                        <span className="text-[11px] text-ink-faint">{it.metric}</span>
                      </div>
                    ) : (
                      <span className="shrink-0 rounded-full bg-ink/[.04] px-2.5 py-1 text-[12px] font-medium tabular-nums text-ink-soft">
                        {it.metric}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.section>
          )
        })}
      </div>
    </div>
  )
}
