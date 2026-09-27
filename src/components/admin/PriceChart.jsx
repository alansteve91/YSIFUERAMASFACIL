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
          <CartesianGrid vertical={false} stroke="rgba(14,14,26,.06)" />
          <XAxis dataKey="short" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#A3A3B8' }} interval={0} height={24} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#A3A3B8' }} />
          <Tooltip content={<ChartTooltip unit="personas" />} cursor={{ fill: 'rgba(109,93,245,.06)' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={900}>
            {rows.map((d) => (
              <Cell key={d.key} fill={d.key === topKey ? '#5B47E8' : d.key === 'depende' ? '#D6D6E0' : '#ABA3FF'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
