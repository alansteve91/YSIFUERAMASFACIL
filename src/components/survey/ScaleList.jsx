import { motion } from 'framer-motion'

/**
 * Lista vertical de opciones (una sola respuesta). Ideal para escalas y rangos.
 */
export default function ScaleList({ question, value, onChange }) {
  return (
    <div className="flex flex-col gap-2" role="radiogroup">
      {question.options.map((opt, i) => {
        const isOn = value === opt.value
        return (
          <motion.button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isOn}
            onClick={() => onChange(opt.value)}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.985 }}
            className={`group flex w-full items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 sm:px-5 ${
              isOn
                ? 'border-brand-400 bg-white shadow-[0_0_0_4px_rgba(109,93,245,.12)]'
                : 'border-ink/[.07] bg-white/65 backdrop-blur hover:border-ink/15 hover:bg-white hover:shadow-soft'
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                isOn ? 'border-brand-500' : 'border-ink/20 group-hover:border-ink/35'
              }`}
            >
              <motion.span
                initial={false}
                animate={{ scale: isOn ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                className="h-2.5 w-2.5 rounded-full bg-brand-500"
              />
            </span>
            <span className={`text-[15.5px] font-medium ${isOn ? 'text-ink' : 'text-ink-soft'}`}>{opt.label}</span>
            <span aria-hidden className="ml-auto hidden text-[11px] font-semibold text-ink-faint sm:inline">{i + 1}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
