import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Clock, CalendarDays } from 'lucide-react'
import { QUESTIONS, LABELS, questionText } from '../../data/questions'
import { CATEGORIES, categorize } from '../../lib/analytics'
import { fullDate, duration } from '../../lib/format'

function Answer({ q, a }) {
  const v = a[q.id]
  const other = a[`${q.id}_otro`]
  if (v == null || v === '' || (Array.isArray(v) && !v.length)) {
    return <p className="text-[14px] italic text-ink-faint">Sin respuesta</p>
  }
  if (Array.isArray(v)) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {v.map((x) => (
          <span key={x} className="rounded-full bg-brand-50 px-2.5 py-1 text-[13px] font-medium text-brand-700">
            {LABELS[q.id]?.[x] ?? x}
            {x === q.otherValue && other ? `: ${other}` : ''}
          </span>
        ))}
      </div>
    )
  }
  if (q.options) {
    return (
      <span className="inline-block rounded-full bg-brand-50 px-2.5 py-1 text-[13px] font-medium text-brand-700">
        {LABELS[q.id]?.[v] ?? v}
        {v === q.otherValue && other ? `: ${other}` : ''}
      </span>
    )
  }
  return <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink">“{v}”</p>
}

export default function ResponseModal({ response, onClose, onPrev, onNext, position }) {
  useEffect(() => {
    if (!response) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [response, onClose, onPrev, onNext])

  const a = response?.answers || {}
  const cats = response ? categorize(response) : []

  return (
    <AnimatePresence>
      {response && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Detalle de la respuesta"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] bg-white shadow-lift sm:rounded-[28px]"
          >
            <header className="flex items-center gap-3 border-b border-ink/[.06] px-5 py-4 sm:px-6">
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold tracking-tight">
                  Encuesta {response.demo ? <span className="text-ink-faint">(demo)</span> : <span className="text-brand-600">(real)</span>}
                </p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink-mute">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" /> {fullDate(response.created_at)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {duration(response.duration_sec)}
                  </span>
                </p>
              </div>
              {position && <span className="hidden text-[12px] tabular-nums text-ink-faint sm:inline">{position}</span>}
              <div className="flex items-center gap-1">
                <button type="button" onClick={onPrev} disabled={!onPrev} className="btn-ghost p-2" aria-label="Anterior">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button type="button" onClick={onNext} disabled={!onNext} className="btn-ghost p-2" aria-label="Siguiente">
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button type="button" onClick={onClose} className="btn-ghost p-2" aria-label="Cerrar">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div className="scrollbar-thin overflow-y-auto px-5 py-5 sm:px-6">
              {cats.length > 0 && (
                <div className="mb-5 flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-[11px] font-semibold uppercase tracking-[.14em] text-ink-faint">Temas</span>
                  {cats.map((c) => (
                    <span key={c} className="rounded-full border border-ink/[.08] px-2.5 py-0.5 text-[12px] text-ink-soft">
                      {CATEGORIES.find((x) => x.key === c)?.label}
                    </span>
                  ))}
                </div>
              )}
              <ol className="space-y-5">
                {QUESTIONS.map((q, i) => {
                  if (q.id === 'precio' && !a.precio) return null
                  return (
                    <li key={q.id} className="flex gap-3.5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/[.04] text-[11px] font-semibold tabular-nums text-ink-mute">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="mb-2 text-[13px] leading-snug text-ink-mute">{questionText(q)}</p>
                        <Answer q={q} a={a} />
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
