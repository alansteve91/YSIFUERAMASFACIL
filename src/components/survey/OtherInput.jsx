import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

/** Mini campo "¿Cuál?" que aparece al elegir la opción "Otra" */
export default function OtherInput({ value, onChange, placeholder, onEnter }) {
  const ref = useRef(null)
  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus({ preventScroll: true }), 250)
    return () => clearTimeout(t)
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <input
        ref={ref}
        type="text"
        value={value || ''}
        maxLength={200}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onEnter?.())}
        placeholder={placeholder || '¿Cuál?'}
        className="field rounded-2xl py-3.5 text-[16px]"
        aria-label={placeholder || 'Otra opción'}
      />
    </motion.div>
  )
}
