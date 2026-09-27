import { motion } from 'framer-motion'
import { Check, Lock } from 'lucide-react'
import Celebration from './Celebration'

const ease = [0.22, 1, 0.36, 1]
const rise = (d) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease, delay: d } },
})

export default function FinalScreen({ onFinish }) {
  return (
    <motion.section
      key="done"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4 } }}
      className="relative mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-4 text-center"
    >
      <Celebration />

      {/* Check animado */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
        className="relative z-10 mb-9"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-brand-400/40"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 1.6, delay: 0.35, ease: 'easeOut' }}
        />
        <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 shadow-glow">
          <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
            <motion.path
              d="M13 25l7.5 7.5L35 17"
              stroke="white"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
            />
          </svg>
        </span>
      </motion.div>

      <motion.h1 {...rise(0.5)} className="relative z-10 text-5xl font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
        ¡Listo! <span className="inline-block">🎉</span>
      </motion.h1>
      <motion.p {...rise(0.65)} className="relative z-10 mt-5 text-xl font-medium text-ink sm:text-2xl">
        Gracias por regalarnos unos minutos.
      </motion.p>
      <motion.p {...rise(0.8)} className="relative z-10 mt-4 max-w-md text-pretty text-[16px] leading-relaxed text-ink-mute sm:text-[17px]">
        Tal vez esa pequeña molestia que acabas de compartir termine convirtiéndose en una{' '}
        <span className="font-serif text-[19px] italic text-brand-700 sm:text-[20px]">solución real</span>.
      </motion.p>

      <motion.ul {...rise(0.95)} className="relative z-10 mt-9 flex flex-wrap justify-center gap-2.5">
        <li className="chip py-2 pl-2 pr-3.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
          </span>
          Respuesta registrada
        </li>
        <li className="chip py-2 pl-2 pr-3.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Lock className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
          Completamente anónima
        </li>
      </motion.ul>

      <motion.div {...rise(1.1)} className="relative z-10 mt-11">
        <button type="button" onClick={onFinish} className="btn-primary px-10">
          <span>Finalizar</span>
        </button>
      </motion.div>
    </motion.section>
  )
}
