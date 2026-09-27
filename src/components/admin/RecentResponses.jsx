import { useMemo, useState } from 'react'
import { Search, X, ChevronRight, Inbox } from 'lucide-react'
import { LABELS } from '../../data/questions'
import { CATEGORIES, OPEN_FIELDS, categorize } from '../../lib/analytics'
import { timeAgo } from '../../lib/format'

const PAGE = 8

const PAY_STYLE = {
  si: 'bg-emerald-50 text-emerald-700',
  probablemente_si: 'bg-emerald-50 text-emerald-700',
  depende: 'bg-amber-50 text-amber-700',
  probablemente_no: 'bg-ink/[.04] text-ink-mute',
  no: 'bg-ink/[.04] text-ink-mute',
}

function snippet(a) {
  return a.solucion_ideal || a.molestia || a.eliminar_tarea || a.automatizar_semana || 'Sin respuestas abiertas'
}

export default function RecentResponses({ responses, onOpen, category, onCategory }) {
  const [query, setQuery] = useState('')
  const [perfil, setPerfil] = useState('')
  const [shown, setShown] = useState(PAGE)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return responses.filter((r) => {
      const a = r.answers || {}
      if (perfil && a.perfil !== perfil) return false
      if (category && !categorize(r).includes(category)) return false
      if (q) {
        const text = OPEN_FIELDS.map((f) => a[f] || '').join(' ').toLowerCase()
        if (!text.includes(q)) return false
      }
      return true
    })
  }, [responses, query, perfil, category])

  const list = filtered.slice(0, shown)
  const catLabel = CATEGORIES.find((c) => c.key === category)?.label

  return (
    <div className="card-admin p-0 sm:p-0">
      {/* Filtros */}
      <div className="flex flex-col gap-2.5 border-b border-ink/[.05] p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShown(PAGE)
            }}
            placeholder="Buscar en las respuestas…"
            className="w-full rounded-xl border border-ink/[.08] bg-canvas/60 py-2.5 pl-10 pr-9 text-[14px] outline-none transition focus:border-brand-300 focus:bg-white"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-faint hover:text-ink"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <select
          value={perfil}
          onChange={(e) => {
            setPerfil(e.target.value)
            setShown(PAGE)
          }}
          className="rounded-xl border border-ink/[.08] bg-canvas/60 px-3 py-2.5 text-[14px] text-ink-soft outline-none focus:border-brand-300"
          aria-label="Filtrar por perfil"
        >
          <option value="">Todos los perfiles</option>
          {Object.entries(LABELS.perfil).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {(category || perfil || query) && (
        <div className="flex flex-wrap items-center gap-2 border-b border-ink/[.05] px-4 py-3 text-[12.5px] sm:px-5">
          <span className="text-ink-mute">{filtered.length} resultados</span>
          {category && (
            <button type="button" onClick={() => onCategory(null)} className="chip py-1 text-[12px] hover:border-ink/20">
              Tema: {catLabel} <X className="h-3 w-3" />
            </button>
          )}
          {perfil && (
            <button type="button" onClick={() => setPerfil('')} className="chip py-1 text-[12px] hover:border-ink/20">
              {LABELS.perfil[perfil]} <X className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      {/* Lista */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-ink-faint">
          <Inbox className="h-8 w-8" />
          <p className="text-[14px]">No hay respuestas que coincidan.</p>
        </div>
      ) : (
        <ul className="divide-y divide-ink/[.05]">
          {list.map((r) => {
            const a = r.answers || {}
            return (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => onOpen(r.id, filtered.map((x) => x.id))}
                  className="group flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-brand-50/40 sm:px-5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[12px]">
                      <span className="font-medium text-ink-soft">{LABELS.perfil[a.perfil] || 'Sin perfil'}</span>
                      <span className="text-ink-faint">·</span>
                      <span className="text-ink-faint">{timeAgo(r.created_at)}</span>
                      {!r.demo && (
                        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-brand-600">
                          Real
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[14.5px] text-ink">“{snippet(a)}”</p>
                  </div>
                  {a.pagaria && (
                    <span className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-medium sm:inline ${PAY_STYLE[a.pagaria]}`}>
                      {LABELS.pagaria[a.pagaria]}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {filtered.length > shown && (
        <div className="border-t border-ink/[.05] p-4 text-center">
          <button type="button" onClick={() => setShown((s) => s + PAGE * 2)} className="btn-soft">
            Ver más respuestas ({filtered.length - shown} restantes)
          </button>
        </div>
      )}
    </div>
  )
}
