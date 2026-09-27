import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartTooltip from './ChartTooltip'
import { EmptyState } from './ChartCard'

const SHORT = {
  q10_25: '10–25',
  q26_50: '26–50',
  q51_100: '51–100',
  q101_200: '101–200',
  q201_500: '201–500',
  q500_mas: '500+',
  depende: 'Dep.',
}

export default function PriceChart({ data, topKey }) {
  if (!data.some((d) => d.value)) return <EmptyState />
  const rows = data.map((d) => ({ ...d, short: SHORT[d.key] || d.label, fullLabel: d.label }))
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 4, left: -26, bottom: 0 }} barCategoryGap="18%">
          <CartesianGrid vertical={false} stroke="rgba(15,23,42,.06)" />
          <XAxis dataKey="short" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} interval={0} height={24} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
          <Tooltip content={<ChartTooltip unit="personas" />} cursor={{ fill: 'rgba(37,99,235,.06)' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={900}>
            {rows.map((d) => (
              <Cell key={d.key} fill={d.key === topKey ? '#1D4ED8' : d.key === 'depende' ? '#CBD5E1' : '#93C5FD'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
