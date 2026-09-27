import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartTooltip from './ChartTooltip'

export default function ResponsesChart({ data }) {
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6D5DF5" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#6D5DF5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="rgba(14,14,26,.06)" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: '#A3A3B8' }}
            interval="preserveStartEnd"
            minTickGap={18}
          />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#A3A3B8' }} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#ABA3FF', strokeWidth: 1, strokeDasharray: '3 3' }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#6D5DF5"
            strokeWidth={2}
            fill="url(#area)"
            activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#6D5DF5' }}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
