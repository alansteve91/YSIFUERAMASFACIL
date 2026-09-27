import { useEffect } from 'react'
import { motion, AnimatePresence, useIsPresent } from 'framer-motion'
import { ArrowLeft, ArrowRight, CornerDownLeft, Loader2 } from 'lucide-react'
import ChoiceGrid from './ChoiceGrid'
import ScaleList from './ScaleList'
import TextAnswer from './TextAnswer'
import OtherInput from './OtherInput'

const ease = [0.22, 1, 0.36, 1]

export const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 56, filter: 'blur(8px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease } },
  exit: (dir) => ({ opacity: 0, x: dir * -56, filter: 'blur(8px)', transition: { duration: 0.32, ease: [0.4, 0, 1, 1] } }),
}

const AUTO_ADVANCE_MS = 420

export default function QuestionView({ survey }) {
  const { current: q, answers, setAnswer, next, scheduleNext, cancelScheduled, back, skip, canContinue, isLast, submitting, error, direction } = survey
  // Mientras la pregunta sale de pantalla ignoramos clics y teclas
  const isPresent = useIsPresent()
  const value = answers[q.id]
  const otherKey = `${q.id}_otro`
  const isFinal = q.variant === 'final'

  const otherSelected =
    q.otherValue && (Array.isArray(value) ? value.includes(q.otherValue) : value === q.otherValue)

  function handleChoice(v) {
    if (!isPresent) return
    setAnswer(q.id, v)
    // Las preguntas de una sola opción avanzan solas (como en una app)
    const single = q.type === 'single' || q.type === 'scale'
    if (single && v !== q.otherValue) scheduleNext(q.id, AUTO_ADVANCE_MS)
    else cancelScheduled()
  }

  function handleContinue() {
    if (!isPresent) return
    if (canContinue && !submitting) next({ fromId: q.id })
  }

  // Atajos de teclado: 1-9 para opciones, Enter para continuar
  useEffect(() => {
    if (!isPresent) return
    function onKey(e) {
      const tag = e.target?.tagName
      if (tag === 'TEXTAREA' || tag === 'INPUT' || e.metaKey || e.ctrlKey || e.altKey) return
      if (q.options && /^[1-9]$/.test(e.key)) {
        const opt = q.options[Number(e.key) - 1]
        if (!opt) return
        if (q.type === 'multi') {
          const arr = Array.isArray(value) ? value : []
          if (arr.includes(opt.value)) setAnswer(q.id, arr.filter((x) => x !== opt.value))
          else if (!q.maxSelect || arr.length < q.maxSelect) setAnswer(q.id, [...arr, opt.value])
        } else handleChoice(opt.value)
      }
      if (e.key === 'Enter' && tag !== 'BUTTON') {
        e.preventDefault()
        handleContinue()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const body = (
    <>
      {isFinal && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-[#3B82F6] px-4 py-1.5 text-[13px] font-semibold text-white shadow-glow"
        >
          {q.eyebrow}
        </motion.div>
      )}

      {q.lead && (
        <p className={`mb-3 text-pretty text-ink-mute ${isFinal ? 'text-lg sm:text-xl' : 'text-[16px] sm:text-lg'}`}>{q.lead}</p>
      )}
      <h2
        id={`q-${q.id}`}
        className={`text-balance font-semibold tracking-[-0.025em] text-ink ${
          isFinal ? 'text-[30px] leading-[1.12] sm:text-[42px]' : 'text-[26px] leading-[1.15] sm:text-[34px]'
        }`}
      >
        {q.title}
      </h2>
      {q.quote && (
        <p className="mt-3 font-serif text-[27px] italic leading-tight text-brand-700 sm:text-[34px]">{q.quote}</p>
      )}
      {q.subtitle && <p className="mt-3 text-[14px] text-ink-faint">{q.subtitle}</p>}

      <div className="mt-8" aria-labelledby={`q-${q.id}`}>
        {(q.type === 'single' || q.type === 'multi') && (
          <ChoiceGrid question={q} value={value} onChange={handleChoice} multiple={q.type === 'multi'} />
        )}
        {q.type === 'scale' && <ScaleList question={q} value={value} onChange={handleChoice} />}
        {q.type === 'text' && (
          <TextAnswer
            value={value}
            onChange={(v) => setAnswer(q.id, v)}
            onSubmit={handleContinue}
            placeholder={q.placeholder}
            rows={q.rows || 3}
            large={isFinal}
          />
        )}
        <AnimatePresence>
          {otherSelected && (
            <OtherInput
              value={answers[otherKey]}
              onChange={(v) => setAnswer(otherKey, v)}
              placeholder={q.otherPlaceholder}
              onEnter={handleContinue}
            />
          )}
        </AnimatePresence>
        {q.hint && (
          <p className="mt-4 flex items-start gap-2 text-[13.5px] leading-relaxed text-ink-faint">
            <span aria-hidden>💭</span>
            <span>{q.hint}</span>
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      )}
    </>
  )

  return (
    <motion.section
      key={q.id}
      custom={direction}
      variants={slide}
      initial="enter"
      animate="center"
      exit="exit"
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 sm:px-8"
    >
      <div className="flex-1 pb-6 pt-6 sm:pt-12">
        {isFinal ? (
          <div className="relative">
            <div className="absolute -inset-px rounded-[34px] bg-gradient-to-br from-brand-300 via-white to-[#BFDBFE] opacity-80" />
            <div className="glass-strong relative rounded-[33px] p-6 sm:p-10">{body}</div>
          </div>
        ) : (
          body
        )}
      </div>

      {/* Pie de navegación (fijo abajo en móvil) */}
      <div className="sticky bottom-0 -mx-5 mt-auto bg-gradient-to-t from-canvas via-canvas/90 to-transparent px-5 pt-6 safe-bottom sm:static sm:mx-0 sm:bg-none sm:px-0 sm:pb-12">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => isPresent && back()} className="btn-ghost -ml-3" aria-label="Pregunta anterior">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Atrás</span>
          </button>

          {q.skippable && (
            <button type="button" onClick={() => isPresent && skip(q.id)} className="btn-ghost text-ink-faint">
              Saltar
            </button>
          )}

          <div className="ml-auto flex items-center gap-4">
            <span
              className={`hidden items-center gap-1.5 text-[12px] text-ink-faint transition-opacity duration-300 md:inline-flex ${
                canContinue ? 'opacity-100' : 'opacity-0'
              }`}
            >
              o presiona <kbd className="rounded-md border border-ink/10 bg-white px-1.5 py-0.5 font-sans text-[11px]">Enter <CornerDownLeft className="inline h-3 w-3" /></kbd>
            </span>
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue || submitting}
              className="btn-primary group min-w-[150px]"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> <span>Enviando…</span>
                </>
              ) : (
                <>
                  <span>{isLast ? 'Enviar respuestas' : 'Continuar'}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
