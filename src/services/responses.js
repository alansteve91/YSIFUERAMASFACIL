import { localAdapter } from './adapters/localAdapter'
import { supabaseAdapter } from './adapters/supabaseAdapter'
import { QUESTIONS } from '../data/questions'
import { randomId } from '../lib/id'

/**
 * Punto único de acceso a los datos.
 * El resto de la app NO sabe si los datos vienen del navegador o de Supabase.
 */
export const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE === 'supabase' ? 'supabase' : 'local'
const adapter = DATA_SOURCE === 'supabase' ? supabaseAdapter : localAdapter

const MAX_TEXT = 1200

/**
 * Deja solo lo necesario: las respuestas a las preguntas definidas.
 * No se guarda nombre, correo, teléfono, IP, navegador ni ubicación.
 */
function sanitize(answers, visibleIds) {
  const clean = {}
  for (const q of QUESTIONS) {
    if (!visibleIds.includes(q.id)) continue
    const v = answers[q.id]
    if (v == null || v === '' || (Array.isArray(v) && v.length === 0)) continue
    if (Array.isArray(v)) {
      const allowed = new Set((q.options || []).map((o) => o.value))
      clean[q.id] = v.filter((x) => allowed.has(x))
    } else if (q.options) {
      if (q.options.some((o) => o.value === v)) clean[q.id] = v
    } else {
      clean[q.id] = String(v).trim().slice(0, MAX_TEXT)
    }
    const otherKey = `${q.id}_otro`
    const selectedOther = q.otherValue && (Array.isArray(v) ? v.includes(q.otherValue) : v === q.otherValue)
    if (selectedOther && answers[otherKey]?.trim()) {
      clean[otherKey] = answers[otherKey].trim().slice(0, 200)
    }
  }
  return clean
}

export async function submitResponse(answers, { visibleIds, startedAt }) {
  const now = Date.now()
  const response = {
    id: randomId(),
    created_at: new Date(now).toISOString(),
    answers: sanitize(answers, visibleIds),
    // Solo la duración aproximada (para saber si la encuesta es muy larga)
    duration_sec: startedAt ? Math.min(3600, Math.round((now - startedAt) / 1000)) : null,
    version: 1,
  }
  return adapter.insert(response)
}

export async function listResponses() {
  return adapter.list()
}

export async function clearLocalResponses() {
  return adapter.clear()
}
