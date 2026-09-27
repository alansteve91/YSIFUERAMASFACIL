import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import BackgroundScene from '../components/survey/BackgroundScene'

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <BackgroundScene variant="landing" particles={false} />
      <p className="font-serif text-[96px] italic leading-none text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Esta página no existe… todavía.</h1>
      <p className="mt-2 text-ink-mute">Quizás el camino fácil es volver al inicio.</p>
      <Link to="/" className="btn-primary mt-8">
        <ArrowLeft className="h-4 w-4" />
        <span>Volver al inicio</span>
      </Link>
    </div>
  )
}
