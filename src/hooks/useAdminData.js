import { useCallback, useEffect, useMemo, useState } from 'react'
import { listResponses } from '../services/responses'
import { getMockResponses } from '../data/mockResponses'
import { computeStats } from '../lib/analytics'
import { safeStorage } from '../lib/safeStorage'

const DEMO_KEY = 'ysfmf:admin:demo'

/** Carga respuestas reales + (opcional) datos de demostración y calcula estadísticas */
export default function useAdminData() {
  const [real, setReal] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [includeDemo, setIncludeDemoState] = useState(() => safeStorage.get(DEMO_KEY, true))
  const [updatedAt, setUpdatedAt] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await listResponses()
      setReal(Array.isArray(list) ? list : [])
      setUpdatedAt(new Date())
    } catch (e) {
      setError(e?.message || 'No se pudieron cargar las respuestas.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    // Si alguien responde en otra pestaña, el panel se actualiza solo
    const onStorage = (e) => e.key && e.key.startsWith('ysfmf:responses') && load()
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [load])

  const setIncludeDemo = (v) => {
    setIncludeDemoState(v)
    safeStorage.set(DEMO_KEY, v)
  }

  const responses = useMemo(() => {
    const all = includeDemo ? [...real, ...getMockResponses()] : [...real]
    return all.sort((a, b) => b.created_at.localeCompare(a.created_at))
  }, [real, includeDemo])

  const stats = useMemo(() => computeStats(responses), [responses])

  return { responses, realCount: real.length, stats, loading, error, reload: load, includeDemo, setIncludeDemo, updatedAt }
}
