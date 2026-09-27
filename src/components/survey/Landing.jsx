import { motion } from 'framer-motion'
import { ArrowRight, Clock, Lock, Lightbulb, RotateCcw } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]
const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: (i) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease, delay: 0.15 + i * 0.12 } }),
}

const BADGES = [
  { icon: Clock, text: '2 minutos' },
  { icon: Lock, text: 'Anónimo' },
  { icon: Lightbulb, text: 'No existen respuestas incorrectas' },
]

/** Tarjetas flotantes decorativas (solo escritorio) */
function FloatingCard({ className, delay, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      className={`glass absolute rounded-2xl px-4 py-3 text-[13px] text-ink-soft ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Landing({ onStart, hasDraft, draftProgress, onRestart }) {
  return (
    <motion.section
      key="landing"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)', transition: { duration: 0.45, ease } }}
      className="relative mx-auto flex min-h-[calc(100dvh-80px)] w-full max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-6 text-center sm:px-8"
    >
      {/* Notas flotantes decorativas (solo pantallas grandes, fuera del texto) */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[min(1360px,100vw)] -translate-x-1/2 xl:block">
        <FloatingCard className="left-6 top-[12%]" delay={0.9}>
          <span className="mr-2">⏳</span>Otra vez llenando el mismo Excel…
        </FloatingCard>
        <FloatingCard className="right-6 top-[44%]" delay={1.2}>
          <span className="mr-2">💬</span>“¿A qué hora era la cita?”
        </FloatingCard>
        <FloatingCard className="bottom-[12%] left-12" delay={1.5}>
          <span className="mr-2">🔁</span>Copiar · pegar · repetir
        </FloatingCard>
      </div>

      <motion.div custom={0} variants={item} initial="hidden" animate="show" className="chip mb-7 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
        </span>
        Una conversación corta, no un formulario
      </motion.div>

      <motion.h1
        custom={1}
        variants={item}
        initial="hidden"
        animate="show"
        className="max-w-4xl text-balance text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl md:text-7xl lg:text-[84px]"
      >
        ¿Y si algunas cosas simplemente fueran{' '}
        <span className="font-serif font-normal italic tracking-[-0.01em] text-gradient">más fáciles</span>?
      </motion.h1>

      <motion.p
        custom={2}
        variants={item}
        initial="hidden"
        animate="show"
        className="mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-ink-mute sm:text-lg"
      >
        Todos tenemos pequeñas cosas que nos hacen perder tiempo.
        <br className="hidden sm:block" /> Queremos descubrir cuáles son las tuyas.
      </motion.p>

      <motion.ul
        custom={3}
        variants={item}
        initial="hidden"
        animate="show"
        className="mt-9 flex flex-wrap items-center justify-center gap-2.5"
      >
        {BADGES.map(({ icon: Icon, text }) => (
          <li key={text} className="chip py-2 pl-2 pr-3.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
            {text}
          </li>
        ))}
      </motion.ul>

      <motion.div custom={4} variants={item} initial="hidden" animate="show" className="mt-11 flex flex-col items-center gap-3">
        <button type="button" onClick={onStart} className="btn-primary group px-9 py-[18px] text-base" autoFocus>
          <span className="tracking-[.06em]">{hasDraft ? 'CONTINUAR' : 'COMENZAR'}</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        {hasDraft ? (
          <div className="flex items-center gap-2 text-[13px] text-ink-mute">
            <span>Vas en la pregunta {draftProgress}. </span>
            <button type="button" onClick={onRestart} className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700">
              <RotateCcw className="h-3.5 w-3.5" /> Empezar de nuevo
            </button>
          </div>
        ) : (
          <span className="text-[13px] text-ink-faint">Sin registro · sin correo · sin nombre</span>
        )}
      </motion.div>
    </motion.section>
  )
}
