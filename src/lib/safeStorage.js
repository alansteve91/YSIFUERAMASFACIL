/**
 * Acceso seguro a localStorage.
 * En modo incógnito o con el almacenamiento bloqueado, simplemente no guarda nada
 * y la app sigue funcionando.
 */
export const safeStorage = {
  get(key, fallback = null) {
    try {
      const raw = window.localStorage.getItem(key)
      return raw == null ? fallback : JSON.parse(raw)
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* noop */
    }
  },
}

export const sessionStore = {
  get(key, fallback = null) {
    try {
      const raw = window.sessionStorage.getItem(key)
      return raw == null ? fallback : JSON.parse(raw)
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* noop */
    }
  },
  remove(key) {
    try {
      window.sessionStorage.removeItem(key)
    } catch {
      /* noop */
    }
  },
}
