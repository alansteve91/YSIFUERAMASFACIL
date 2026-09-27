import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { QUESTIONS, visibleQuestions } from '../data/questions'
import { submitResponse } from '../services/responses'
import { safeStorage } from '../lib/safeStorage'

const DRAFT_KEY = 'ysfmf:draft:v1'
const DRAFT_TTL = 1000 * 60 * 60 * 24 // 24 h
const REACTION_MS = 1100

function loadDraft() {
  const d = safeStorage.get(DRAFT_KEY)
  if (!d || !d.savedAt || Date.now() - d.savedAt > DRAFT_TTL) return null
  if (typeof d.index !== 'number' || typeof d.answers !== 'object') return null
  return d
}

/** Verifica si la pregunta tiene una respuesta válida */
export function isAnswered(q, value) {
  if (q.type === 'multi') return Array.isArray(value) && value.length > 0
  if (q.type === 'text') return typeof value === 'string' && value.trim().length >= 2
  return value != null && value !== ''
}

/**
 * Estado completo de la encuesta:
 * etapas, navegación, respuestas, reacciones, borrador y envío.
 */
export default function useSurvey() {
  const [draft, setDraft] = useState(loadDraft)
  const [stage, setStage] = useState('landing') // landing | survey | reaction | done
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [direction, setDirection] = useState(1)
  const [reaction, setReaction] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const answersRef = useRef(answers)
  const startedAtRef = useRef(null)
  const lockRef = useRef(false)
  const lastReactionRef = useRef(-2)
  const timers = useRef([])

  // Referencias al valor más reciente (evita cierres "viejos" en temporizadores)
  const indexRef = useRef(index)
  const stageRef = useRef(stage)
  indexRef.current = index
  stageRef.current = stage
  const autoRef = useRef(null)


  const visible = useMemo(() => visibleQuestions(answers), [answers])
  const current = visible[index]
  const total = visible.length
  const isLast = index === total - 1

  // Limpia temporizadores al desmontar
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      clearTimeout(autoRef.current)
    },
    [],
  )

  // Libera el candado cuando cambia de pregunta
  useEffect(() => {
    lockRef.current = false
  }, [index, stage])

  // Guarda el progreso (por si cierra la pestaña sin querer)
  useEffect(() => {
    if (stage === 'survey' || stage === 'reaction') {
      safeStorage.set(DRAFT_KEY, { answers, index, startedAt: startedAtRef.current, savedAt: Date.now() })
    }
  }, [answers, index, stage])

  const later = (fn, ms) => {
    const t = setTimeout(fn, ms)
    timers.current.push(t)
  }

  const start = useCallback(() => {
    if (draft) {
      answersRef.current = draft.answers
      setAnswers(draft.answers)
      const vis = visibleQuestions(draft.answers)
      setIndex(Math.min(draft.index, vis.length - 1))
      startedAtRef.current = draft.startedAt || Date.now()
    } else {
      answersRef.current = {}
      setAnswers({})
      setIndex(0)
      startedAtRef.current = Date.now()
    }
    setDirection(1)
    setStage('survey')
  }, [draft])

  const restart = useCallback(() => {
    safeStorage.remove(DRAFT_KEY)
    setDraft(null)
  }, [])

  const setAnswer = useCallback((id, value) => {
    const next = { ...answersRef.current, [id]: value }
    answersRef.current = next
    setAnswers(next)
  }, [])

  const submit = useCallback(async () => {
    setSubmitting(true)
    setError(null)
    try {
      const vis = visibleQuestions(answersRef.current).map((q) => q.id)
      await submitResponse(answersRef.current, { visibleIds: vis, startedAt: startedAtRef.current })
      safeStorage.remove(DRAFT_KEY)
      setDraft(null)
      setDirection(1)
      setStage('done')
    } catch (e) {
      setError(e?.message || 'No pudimos enviar tus respuestas. Intenta de nuevo.')
      lockRef.current = false
    } finally {
      setSubmitting(false)
    }
  }, [])

  /**
   * Avanza. Muestra una reacción breve si corresponde.
   * `fromId` asegura que solo avance la pregunta que está en pantalla.
   */
  const next = useCallback(
    ({ skipReaction = false, fromId } = {}) => {
      clearTimeout(autoRef.current)
      if (lockRef.current || stageRef.current !== 'survey') return
      const i = indexRef.current
      const a = answersRef.current
      const vis = visibleQuestions(a)
      const q = vis[i]
      if (!q || (fromId && fromId !== q.id)) return
      lockRef.current = true

      if (i >= vis.length - 1) {
        submit()
        return
      }

      setDirection(1)
      const text = !skipReaction && lastReactionRef.current !== i - 1 ? q.reaction?.(a[q.id], a) : null

      if (text) {
        lastReactionRef.current = i
        setReaction(text)
        setStage('reaction')
        later(() => {
          setIndex(i + 1)
          setStage('survey')
        }, REACTION_MS)
      } else {
        setIndex(i + 1)
      }
    },
    [submit],
  )

  /** Avance automático (preguntas de una sola opción) */
  const scheduleNext = useCallback(
    (fromId, ms) => {
      clearTimeout(autoRef.current)
      autoRef.current = setTimeout(() => next({ fromId }), ms)
    },
    [next],
  )
  const cancelScheduled = useCallback(() => clearTimeout(autoRef.current), [])

  const back = useCallback(() => {
    clearTimeout(autoRef.current)
    if (stageRef.current !== 'survey') return
    setDirection(-1)
    const i = indexRef.current
    if (i === 0) {
      setDraft(loadDraft())
      setStage('landing')
      return
    }
    setIndex(i - 1)
  }, [])

  const skip = useCallback(
    (fromId) => {
      const q = visibleQuestions(answersRef.current)[indexRef.current]
      if (!q || q.id !== fromId) return
      setAnswer(q.id, '')
      next({ skipReaction: true, fromId })
    },
    [next, setAnswer],
  )

  const finish = useCallback(() => {
    answersRef.current = {}
    setAnswers({})
    setIndex(0)
    setDraft(null)
    lastReactionRef.current = -2
    setStage('landing')
  }, [])

  // Barra de progreso: posición actual (1..total)
  const progress = { current: Math.min(index + 1, total), total }

  return {
    stage,
    index,
    answers,
    current,
    total,
    isLast,
    direction,
    reaction,
    submitting,
    error,
    progress,
    hasDraft: !!draft && draft.index > 0,
    draftProgress: draft ? draft.index + 1 : 0,
    start,
    restart,
    setAnswer,
    next,
    scheduleNext,
    cancelScheduled,
    back,
    skip,
    finish,
    canContinue: current ? isAnswered(current, answers[current.id]) : false,
    questionsCount: QUESTIONS.length,
  }
}
