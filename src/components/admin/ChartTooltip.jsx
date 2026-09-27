export default function ChartTooltip({ active, payload, label, unit = 'respuestas' }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-ink/[.06] bg-white px-3 py-2 text-[12.5px] shadow-lift">
      <p className="text-ink-mute">{payload[0].payload.fullLabel || label}</p>
      <p className="mt-0.5 font-semibold tabular-nums text-ink">
        {payload[0].value} <span className="font-normal text-ink-mute">{unit}</span>
      </p>
    </div>
  )
}
