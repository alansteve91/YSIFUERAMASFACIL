import { safeStorage } from '../../lib/safeStorage'

const KEY = 'ysfmf:responses:v1'

/**
 * Adaptador local: guarda las respuestas en el navegador (localStorage).
 * Ideal para demostrar y probar. Cada navegador tiene sus propias respuestas.
 */
export const localAdapter = {
  name: 'local',

  async insert(response) {
    const all = safeStorage.get(KEY, [])
    all.push(response)
    const ok = safeStorage.set(KEY, all)
    if (!ok) throw new Error('No se pudo guardar en este navegador.')
    return response
  },

  async list() {
    const all = safeStorage.get(KEY, [])
    return Array.isArray(all) ? all : []
  },

  async clear() {
    safeStorage.remove(KEY)
  },
}
