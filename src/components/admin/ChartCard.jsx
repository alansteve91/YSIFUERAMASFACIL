export default function ChartCard({ title, subtitle, children, action, className = '' }) {
  return (
    <section className={`card-admin ${className}`}>
      <header className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-ink">{title}</h3>
          {subtitle && <p className="mt-0.5 text-[13px] text-ink-mute">{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}

export function EmptyState({ text = 'Aún no hay datos para mostrar.' }) {
  return (
    <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-ink/10 text-[13px] text-ink-faint">
      {text}
    </div>
  )
}
