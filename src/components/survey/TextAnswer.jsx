import { useEffect, useRef } from 'react'

/**
 * Campo de texto que crece solo. Enter = continuar · Shift+Enter = nueva línea.
 */
export default function TextAnswer({ value, onChange, onSubmit, placeholder, rows = 3, large = false, maxLength = 1200 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Enfoca sin hacer scroll brusco (en móvil espera a que termine la animación)
    const t = setTimeout(() => el.focus({ preventScroll: true }), 420)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 320) + 'px'
  }, [value])

  const len = (value || '').length

  return (
    <div className="relative">
      <textarea
        ref={ref}
        value={value || ''}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault()
            onSubmit?.()
          }
        }}
        className={`field scrollbar-thin ${large ? 'min-h-[180px] text-[18px] sm:text-[19px]' : 'min-h-[128px]'}`}
        aria-label={placeholder}
      />
      <div className="pointer-events-none absolute bottom-3 right-4 text-[11px] tabular-nums text-ink-faint transition-opacity duration-300" style={{ opacity: len > maxLength * 0.7 ? 1 : 0 }}>
        {len}/{maxLength}
      </div>
    </div>
  )
}
