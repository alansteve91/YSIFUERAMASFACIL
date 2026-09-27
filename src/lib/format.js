const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

export function timeAgo(iso) {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000
  const abs = Math.abs(diff)
  if (abs < 60) return 'hace un momento'
  if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute')
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour')
  if (abs < 86400 * 30) return rtf.format(Math.round(diff / 86400), 'day')
  return new Date(iso).toLocaleDateString('es-GT', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function fullDate(iso) {
  return new Date(iso).toLocaleString('es-GT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function duration(sec) {
  if (!sec) return '—'
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return m ? `${m} min ${String(s).padStart(2, '0')} s` : `${s} s`
}

export const nf = new Intl.NumberFormat('es-GT')
