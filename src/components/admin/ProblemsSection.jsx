import { motion } from 'framer-motion'
import {
  MessageCircle,
  Briefcase,
  Wallet,
  CalendarDays,
  BookOpen,
  Receipt,
  Package,
  House,
  ClipboardList,
  Car,
  ArrowUpRight,
} from 'lucide-react'
import { EmptyState } from './ChartCard'

export const CATEGORY_ICONS = {
  whatsapp: MessageCircle,
  trabajo: Briefcase,
  pagos: Wallet,
  citas: CalendarDays,
  estudios: BookOpen,
  facturas: Receipt,
  pedidos: Package,
  casa: House,
  tramites: ClipboardList,
  traslados: Car,
}

export default function ProblemsSection({ categories, total, onSelect }) {
  if (!categories.length) return <EmptyState text="Cuando lleguen respuestas, aquí aparecerán los problemas más mencionados." />
  const max = categories[0].value
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((c, i) => {
        const Icon = CATEGORY_ICONS[c.key] || MessageCircle
        const payPct = c.value ? Math.round((c.payYes / c.value) * 100) : 0
        return (
          <motion.button
            type="button"
            key={c.key}
            onClick={() => onSelect(c.key)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="group card-admin text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
            title={`Ver respuestas que mencionan ${c.label}`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold tracking-tight">{c.label}</p>
                <p className="text-[12.5px] text-ink-mute">
                  {Math.round((c.value / total) * 100)}% de las respuestas · {payPct}% pagaría
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/[.05]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(c.value / max) * 100}%` }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                />
              </div>
              <p className="shrink-0 text-[13px] text-ink-mute">
                <span className="text-[17px] font-semibold tabular-nums text-ink">{c.value}</span> menciones
              </p>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
