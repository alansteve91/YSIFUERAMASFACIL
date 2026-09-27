import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Flame,
  Lightbulb,
  Inbox,
  Users,
  CalendarClock,
  HandCoins,
  Tag,
  RefreshCw,
  Download,
  LogOut,
  ExternalLink,
  Database,
} from 'lucide-react'
import useAdminData from '../hooks/useAdminData'
import AdminLogin from '../components/admin/AdminLogin'
import StatCard from '../components/admin/StatCard'
import ChartCard from '../components/admin/ChartCard'
import BarList from '../components/admin/BarList'
import ResponsesChart from '../components/admin/ResponsesChart'
import PriceChart from '../components/admin/PriceChart'
import PayBreakdown from '../components/admin/PayBreakdown'
import ProblemsSection from '../components/admin/ProblemsSection'
import Opportunities from '../components/admin/Opportunities'
import RecentResponses from '../components/admin/RecentResponses'
import ResponseModal from '../components/admin/ResponseModal'
import { LogoMark } from '../components/ui/Logo'
import { sessionStore } from '../lib/safeStorage'
import { toCSV } from '../lib/analytics'
import { QUESTIONS } from '../data/questions'
import { DATA_SOURCE } from '../services/responses'
import { nf, duration } from '../lib/format'

const AUTH_KEY = 'ysfmf:admin:auth'
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || 'masfacil'

const NAV = [
  { id: 'resumen', label: 'Resumen', icon: LayoutDashboard },
  { id: 'problemas', label: 'Problemas', icon: Flame },
  { id: 'oportunidades', label: 'Oportunidades', icon: Lightbulb },
  { id: 'respuestas', label: 'Respuestas', icon: Inbox },
]

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 84
  window.scrollTo({ top: y, behavior: 'smooth' })
}

/** Resalta en el menú la sección visible */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-90px 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex cursor-pointer select-none items-center gap-2.5 text-[13px] font-medium text-ink-soft">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-10 rounded-full transition-colors duration-300 ${checked ? 'bg-brand-500' : 'bg-ink/15'}`}
      >
        <span
          className={`absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
            checked ? 'translate-x-[18px]' : 'translate-x-0.5'
          }`}
        />
      </button>
      {label}
    </label>
  )
}

function SectionTitle({ id, eyebrow, title, children }) {
  return (
    <div id={id} className="mb-5 flex scroll-mt-24 flex-wrap items-end justify-between gap-3 pt-2">
      <div>
        <p className="section-label">{eyebrow}</p>
        <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.02em] sm:text-[26px]">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Dashboard({ onLogout }) {
  const { responses, realCount, stats, loading, error, reload, includeDemo, setIncludeDemo, updatedAt } = useAdminData()
  const [category, setCategory] = useState(null)
  const [modal, setModal] = useState(null) // { id, ids }
  const active = useActiveSection(useMemo(() => NAV.map((n) => n.id), []))

  const byId = useMemo(() => Object.fromEntries(responses.map((r) => [r.id, r])), [responses])
  const current = modal ? byId[modal.id] : null
  const pos = modal ? modal.ids.indexOf(modal.id) : -1

  const openResponse = useCallback((id, ids) => setModal({ id, ids }), [])
  const closeModal = useCallback(() => setModal(null), [])
  const prev = pos > 0 ? () => setModal((m) => ({ ...m, id: m.ids[pos - 1] })) : null
  const next = pos >= 0 && pos < (modal?.ids.length ?? 0) - 1 ? () => setModal((m) => ({ ...m, id: m.ids[pos + 1] })) : null

  function selectCategory(key) {
    setCategory(key)
    setTimeout(() => scrollToId('respuestas'), 50)
  }

  function exportCSV() {
    const blob = new Blob([toCSV(responses, QUESTIONS)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `respuestas-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const todayDelta = stats.today - stats.yesterday

  return (
    <div className="min-h-[100dvh] bg-canvas">
      {/* Menú lateral (escritorio) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-ink/[.06] bg-white/70 px-4 py-6 backdrop-blur-xl lg:flex">
        <Link to="/" className="flex items-center gap-2.5 px-2">
          <LogoMark className="h-8 w-8" />
          <div className="leading-tight">
            <p className="text-[14px] font-semibold tracking-tight">¿Y si fuera más fácil?</p>
            <p className="text-[11.5px] text-ink-faint">Panel de resultados</p>
          </div>
        </Link>
        <nav className="mt-10 space-y-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => scrollToId(n.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
                active === n.id ? 'bg-ink text-white' : 'text-ink-mute hover:bg-ink/[.04] hover:text-ink'
              }`}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto space-y-3">
          <div className="rounded-2xl border border-ink/[.06] bg-canvas p-4 text-[12.5px]">
            <p className="flex items-center gap-1.5 font-medium text-ink-soft">
              <Database className="h-3.5 w-3.5" /> Fuente: {DATA_SOURCE === 'supabase' ? 'Supabase' : 'Este navegador'}
            </p>
            <p className="mt-1 text-ink-mute">
              {nf.format(realCount)} reales{includeDemo ? ` · ${nf.format(responses.length - realCount)} demo` : ''}
            </p>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="btn-ghost w-full justify-start">
            <ExternalLink className="h-4 w-4" /> Ver encuesta
          </a>
          <button type="button" onClick={onLogout} className="btn-ghost w-full justify-start">
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        {/* Barra superior */}
        <header className="sticky top-0 z-20 border-b border-ink/[.05] bg-canvas/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-8">
            <Link to="/" className="lg:hidden" aria-label="Ir a la encuesta">
              <LogoMark className="h-8 w-8" />
            </Link>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-[16px] font-semibold tracking-tight sm:text-[18px]">Resultados</h1>
              <p className="hidden text-[12px] text-ink-faint sm:block">
                {updatedAt ? `Actualizado ${updatedAt.toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' })}` : 'Cargando…'}
              </p>
            </div>
            <div className="hidden sm:block">
              <Toggle checked={includeDemo} onChange={setIncludeDemo} label="Datos demo" />
            </div>
            <button type="button" onClick={reload} className="btn-soft px-2.5 sm:px-3.5" aria-label="Actualizar">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
            <button type="button" onClick={exportCSV} disabled={!responses.length} className="btn-soft px-2.5 disabled:opacity-40 sm:px-3.5" aria-label="Exportar CSV">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </button>
            <button type="button" onClick={onLogout} className="btn-soft px-2.5 lg:hidden" aria-label="Cerrar sesión">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          {/* Menú móvil */}
          <nav className="scrollbar-thin flex gap-1.5 overflow-x-auto px-4 pb-3 sm:px-8 lg:hidden">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => scrollToId(n.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  active === n.id ? 'bg-ink text-white' : 'bg-white text-ink-mute shadow-sm'
                }`}
              >
                <n.icon className="h-3.5 w-3.5" />
                {n.label}
              </button>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-7xl space-y-14 px-4 pb-24 pt-6 sm:px-8 sm:pt-8">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-ink/[.06] bg-white px-4 py-3 sm:hidden">
            <Toggle checked={includeDemo} onChange={setIncludeDemo} label="Incluir datos demo" />
            <span className="text-[12px] text-ink-faint">{realCount} reales</span>
          </div>

          {error && (
            <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          )}

          {/* RESUMEN */}
          <section>
            <SectionTitle id="resumen" eyebrow="Resumen" title="¿Qué nos están contando?">
              {stats.avgDuration > 0 && (
                <span className="chip">Tiempo promedio: {duration(stats.avgDuration)}</span>
              )}
            </SectionTitle>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
              <StatCard accent label="Total de respuestas" value={nf.format(stats.total)} icon={Users} sub={`${realCount} reales en esta fuente`} />
              <StatCard
                label="Respuestas de hoy"
                value={nf.format(stats.today)}
                icon={CalendarClock}
                sub={todayDelta === 0 ? 'Igual que ayer' : `${todayDelta > 0 ? '+' : ''}${todayDelta} vs. ayer`}
                delay={0.05}
              />
              <StatCard
                label="Pagaría"
                value={stats.payPct}
                suffix="%"
                icon={HandCoins}
                sub={`${stats.payPctWithMaybe}% contando “depende”`}
                delay={0.1}
              />
              <StatCard
                label="Precio más elegido"
                value={stats.priceTop?.value ? stats.priceTop.label.replace(' – ', '–') : '—'}
                icon={Tag}
                sub={stats.priceAvg ? `Promedio estimado: Q${stats.priceAvg} / mes` : 'Sin datos de precio'}
                delay={0.15}
              />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <ChartCard title="Respuestas por día" subtitle="Últimos 14 días" className="lg:col-span-2">
                <ResponsesChart data={stats.days} />
              </ChartCard>
              <ChartCard title="¿Pagarían por una solución?" subtitle={`${stats.payAnswered} respuestas`}>
                <PayBreakdown data={stats.pagaria} />
              </ChartCard>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <ChartCard title="Precio mensual razonable" subtitle="Quetzales al mes · entre quienes pagarían">
                <PriceChart data={stats.precio} topKey={stats.priceTop?.key} />
              </ChartCard>
              <ChartCard title="¿Dónde se escapa el tiempo?" subtitle="Pregunta 3 · selección múltiple">
                <BarList data={stats.tiempo} total={stats.total} limit={6} />
              </ChartCard>
              <ChartCard title="Perfil de quienes responden" subtitle="Pregunta 1">
                <BarList data={[...stats.perfil].sort((a, b) => b.value - a.value)} total={stats.total} />
              </ChartCard>
            </div>

            <div className="mt-4">
              <ChartCard title="Lo que hacen por WhatsApp" subtitle="Pregunta 6 · selección múltiple">
                <div className="grid gap-x-10 md:grid-cols-2">
                  <BarList data={stats.whatsapp.slice(0, Math.ceil(stats.whatsapp.length / 2))} total={stats.total} />
                  <div className="mt-3 md:mt-0">
                    <BarList data={stats.whatsapp.slice(Math.ceil(stats.whatsapp.length / 2))} total={stats.total} />
                  </div>
                </div>
              </ChartCard>
            </div>
          </section>

          {/* PROBLEMAS */}
          <section>
            <SectionTitle id="problemas" eyebrow="Categorías más mencionadas" title="Problemas descubiertos">
              <p className="max-w-xs text-[12.5px] text-ink-mute">Toca un tema para ver las respuestas que lo mencionan.</p>
            </SectionTitle>
            <ProblemsSection categories={stats.categories} total={stats.total || 1} onSelect={selectCategory} />
          </section>

          {/* OPORTUNIDADES */}
          <section>
            <SectionTitle id="oportunidades" eyebrow="Muy importante" title="Oportunidades" />
            <Opportunities />
          </section>

          {/* RESPUESTAS */}
          <section>
            <SectionTitle id="respuestas" eyebrow={`${nf.format(responses.length)} en total`} title="Respuestas recientes" />
            <RecentResponses responses={responses} onOpen={openResponse} category={category} onCategory={setCategory} />
          </section>
        </main>
      </div>

      <ResponseModal
        response={current}
        onClose={closeModal}
        onPrev={prev}
        onNext={next}
        position={modal ? `${pos + 1} de ${modal.ids.length}` : ''}
      />
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStore.get(AUTH_KEY, false))

  useEffect(() => {
    document.title = 'Panel · ¿Y si fuera más fácil?'
    return () => {
      document.title = '¿Y si fuera más fácil?'
    }
  }, [])

  function login(pin) {
    if (pin.trim() === ADMIN_PIN) {
      sessionStore.set(AUTH_KEY, true)
      setAuthed(true)
      return true
    }
    return false
  }

  function logout() {
    sessionStore.remove(AUTH_KEY)
    setAuthed(false)
  }

  return authed ? <Dashboard onLogout={logout} /> : <AdminLogin onLogin={login} />
}
