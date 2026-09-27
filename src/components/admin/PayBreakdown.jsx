import { EmptyState } from './ChartCard'

// Del "Sí" (marca intenso) al "No" (gris): un polo de marca y un polo neutro
const COLORS = {
  si: '#1E40AF',
  probablemente_si: '#2563EB',
  depende: '#93C5FD',
  probablemente_no: '#CBD5E1',
  no: '#94A3B8',
}

export default function PayBreakdown({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  if (!total) return <EmptyState />
  return (
    <div>
      <div className="flex h-4 w-full gap-[2px] overflow-hidden rounded-full">
        {data
          .filter((d) => d.value > 0)
          .map((d) => (
            <div
              key={d.key}
              title={`${d.label}: ${d.value} (${Math.round((d.value / total) * 100)}%)`}
              className="h-full transition-opacity hover:opacity-80"
              style={{ width: `${(d.value / total) * 100}%`, background: COLORS[d.key] }}
            />
          ))}
      </div>
      <ul className="mt-5 space-y-2.5">
        {data.map((d) => (
          <li key={d.key} className="flex items-center gap-3 text-[13.5px]">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: COLORS[d.key] }} />
            <span className="flex-1 text-ink-soft">{d.label}</span>
            <span className="tabular-nums text-ink-faint">{Math.round((d.value / total) * 100)}%</span>
            <span className="w-8 text-right font-medium tabular-nums text-ink">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
