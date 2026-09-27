import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import SurveyPage from './pages/SurveyPage'
import NotFound from './pages/NotFound'

// El panel se carga solo cuando se visita /admin (la encuesta queda más liviana)
const AdminPage = lazy(() => import('./pages/AdminPage'))

function Loading() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<SurveyPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  )
}
