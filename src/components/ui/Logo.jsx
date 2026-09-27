import { Link } from 'react-router-dom'

export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-brand-400 to-brand-700 shadow-glow ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="none" aria-hidden>
        <path d="M5 12.5l4.5 4.5L19 7.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default function Logo({ to = '/', onClick, compact = false }) {
  const content = (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="h-8 w-8" />
      {!compact && (
        <span className="text-[15px] font-semibold tracking-tight text-ink">
          ¿Y si fuera <span className="font-serif text-[18px] italic font-normal text-brand-600">más fácil</span>?
        </span>
      )}
    </span>
  )
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="rounded-xl" aria-label="Ir al inicio">
        {content}
      </button>
    )
  }
  return (
    <Link to={to} className="rounded-xl" aria-label="Ir al inicio">
      {content}
    </Link>
  )
}
