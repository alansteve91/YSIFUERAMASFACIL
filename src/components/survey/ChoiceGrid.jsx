import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

const COLS = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
}

/**
 * Tarjetas seleccionables (una o varias).
 */
export default function ChoiceGrid({ question, value, onChange, multiple }) {
  const selected = multiple ? (Array.isArray(value) ? value : []) : value ? [value] : []
  const max = question.maxSelect
  const reachedMax = multiple && max && selected.length >= max

  function toggle(v) {
    if (!multiple) return onChange(v)
    if (selected.includes(v)) onChange(selected.filter((x) => x !== v))
    else if (!reachedMax) onChange([...selected, v])
  }

  return (
    <div className={`grid gap-2.5 sm:gap-3 ${COLS[question.columns] || COLS[3]}`} role={multiple ? 'group' : 'radiogroup'}>
      {question.options.map((opt, i) => {
        const Icon = opt.icon
        const isOn = selected.includes(opt.value)
        const disabled = !isOn && reachedMax
        return (
          <motion.button
            key={opt.value}
            type="button"
            role={multiple ? 'checkbox' : 'radio'}
            aria-checked={isOn}
            disabled={disabled}
            onClick={() => toggle(opt.value)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: disabled ? 0.45 : 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.035, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.97 }}
            className={`group relative flex min-h-[92px] flex-col items-start justify-between gap-3 rounded-2xl border p-3.5 text-left transition-all duration-300 sm:min-h-[104px] sm:p-4 ${
              isOn
                ? 'border-brand-400 bg-white shadow-[0_0_0_4px_rgba(37,99,235,.12),0_12px_28px_-12px_rgba(29,78,216,.45)]'
                : 'border-ink/[.07] bg-white/65 backdrop-blur hover:-translate-y-0.5 hover:border-ink/15 hover:bg-white hover:shadow-soft'
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300 ${
                isOn ? 'bg-brand-500 text-white' : 'bg-ink/[.04] text-ink-soft group-hover:bg-brand-50 group-hover:text-brand-600'
              }`}
            >
              {Icon && <Icon className="h-[18px] w-[18px]" strokeWidth={2} />}
            </span>
            <span className={`text-[14.5px] font-medium leading-snug sm:text-[15px] ${isOn ? 'text-ink' : 'text-ink-soft'}`}>
              {opt.label}
            </span>
            <AnimatePresence>
              {isOn && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                  className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white"
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
