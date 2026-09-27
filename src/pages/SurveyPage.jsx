import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import useSurvey from '../hooks/useSurvey'
import BackgroundScene from '../components/survey/BackgroundScene'
import Landing from '../components/survey/Landing'
import QuestionView from '../components/survey/QuestionView'
import ReactionBubble from '../components/survey/ReactionBubble'
import FinalScreen from '../components/survey/FinalScreen'
import ProgressBar from '../components/survey/ProgressBar'
import Logo from '../components/ui/Logo'

export default function SurveyPage() {
  const survey = useSurvey()
  const { stage, current, progress } = survey
  const inSurvey = stage === 'survey' || stage === 'reaction'
  const isFinalQ = current?.variant === 'final'

  // Al cambiar de pantalla, vuelve arriba
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [stage, survey.index])

  const bg = stage === 'landing' ? 'landing' : stage === 'done' ? 'done' : isFinalQ ? 'final' : 'survey'

  return (
    <div className="relative flex min-h-[100dvh] flex-col">
      <BackgroundScene variant={bg} particles={stage === 'landing' || stage === 'done'} />

      <header className="relative z-20 mx-auto flex w-full max-w-5xl items-center justify-between px-5 pb-2 pt-5 sm:px-8 sm:pt-7">
        <Logo onClick={stage === 'done' ? survey.finish : undefined} to="/" compact={inSurvey} />
        <AnimatePresence mode="wait">
          {inSurvey ? (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="ml-5 w-full max-w-[380px]"
            >
              <ProgressBar current={progress.current} total={progress.total} />
            </motion.div>
          ) : (
            <motion.span
              key="anon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="chip hidden sm:inline-flex"
            >
              <ShieldCheck className="h-4 w-4 text-brand-500" /> 100% anónimo
            </motion.span>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <AnimatePresence mode="wait" custom={survey.direction}>
          {stage === 'landing' && (
            <Landing
              key="landing"
              onStart={survey.start}
              hasDraft={survey.hasDraft}
              draftProgress={survey.draftProgress}
              onRestart={survey.restart}
            />
          )}
          {stage === 'survey' && current && <QuestionView key={current.id} survey={survey} />}
          {stage === 'reaction' && <ReactionBubble key={`r-${survey.index}`} text={survey.reaction} />}
          {stage === 'done' && <FinalScreen key="done" onFinish={survey.finish} />}
        </AnimatePresence>
      </main>
    </div>
  )
}
