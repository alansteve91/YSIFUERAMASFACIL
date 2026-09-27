import { motion } from 'framer-motion'

export default function StatCard({ label, value, suffix, sub, icon: Icon, accent = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-3xl border p-5 shadow-soft sm:p-6 ${
        accent ? 'border-transparent bg-ink text-white' : 'border-ink/[.06] bg-white'
      }`}
    >
      {accent && (
        <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-gradient-to-br from-brand-400/70 to-[#E879A9]/50 blur-3xl" />
      )}
      <div className="relative flex items-start justify-between gap-3">
        <p className={`text-[11px] font-semibold uppercase tracking-[.14em] ${accent ? 'text-white/60' : 'text-ink-faint'}`}>{label}</p>
        {Icon && (
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
              accent ? 'bg-white/10 text-white' : 'bg-brand-50 text-brand-600'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="relative mt-4 flex items-baseline gap-1.5 text-[28px] font-semibold leading-none tracking-[-0.03em] tabular-nums sm:text-[40px]">
        {value}
        {suffix && <span className={`text-lg font-medium ${accent ? 'text-white/60' : 'text-ink-faint'}`}>{suffix}</span>}
      </p>
      {sub && <p className={`relative mt-2.5 text-[13px] ${accent ? 'text-white/65' : 'text-ink-mute'}`}>{sub}</p>}
    </motion.div>
  )
}
