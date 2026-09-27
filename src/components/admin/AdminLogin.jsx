import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'
import BackgroundScene from '../survey/BackgroundScene'
import { LogoMark } from '../ui/Logo'

export default function AdminLogin({ onLogin }) {
  const [pin, setPin] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (!onLogin(pin)) {
      setError(true)
      setPin('')
    }
  }

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center px-5">
      <BackgroundScene variant="survey" particles={false} />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={error ? { opacity: 1, y: 0, x: [0, -10, 10, -6, 6, 0] } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => error && setError(false)}
        className="glass-strong w-full max-w-sm rounded-[28px] p-7 sm:p-8"
      >
        <LogoMark className="h-11 w-11" />
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Panel administrativo</h1>
        <p className="mt-1.5 text-[14.5px] text-ink-mute">Ingresa la clave para ver los resultados.</p>

        <label className="mt-7 block text-[13px] font-medium text-ink-soft" htmlFor="pin">
          Clave de acceso
        </label>
        <div className="relative mt-2">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            id="pin"
            type={show ? 'text' : 'password'}
            autoFocus
            autoComplete="off"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="field rounded-2xl py-3.5 pl-11 pr-12 text-[16px]"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink-faint hover:text-ink"
            aria-label={show ? 'Ocultar clave' : 'Mostrar clave'}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className={`mt-2 h-5 text-[13px] text-rose-600 transition-opacity ${error ? 'opacity-100' : 'opacity-0'}`}>
          Clave incorrecta. Intenta de nuevo.
        </p>

        <button type="submit" disabled={!pin} className="btn-primary mt-3 w-full">
          <span>Entrar</span>
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link to="/" className="mt-5 block text-center text-[13px] text-ink-mute hover:text-ink">
          ← Volver a la encuesta
        </Link>
      </motion.form>
    </div>
  )
}
