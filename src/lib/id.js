/** Identificador aleatorio (no está ligado a la persona, solo a la respuesta). */
export function randomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'r-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}
