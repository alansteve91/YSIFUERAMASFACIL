import { motion } from 'framer-motion'

/** Reacción breve que aparece ~1 segundo entre preguntas */
export default function ReactionBubble({ text }) {
  return (
    <motion.div
      key={`reaction-${text}`}
      initial={{ opacity: 0, scale: 0.85, y: 12, filter: 'blur(6px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 320, damping: 24 } }}
      exit={{ opacity: 0, scale: 0.96, y: -10, filter: 'blur(6px)', transition: { duration: 0.25 } }}
      className="flex flex-1 items-center justify-center px-6 pb-24"
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-300/60 to-[#BFDBFE]/60 blur-2xl"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="glass-strong rounded-full px-7 py-4 text-center text-[22px] font-semibold tracking-tight text-ink sm:text-[26px]">
          {text}
        </div>
      </div>
    </motion.div>
  )
}
