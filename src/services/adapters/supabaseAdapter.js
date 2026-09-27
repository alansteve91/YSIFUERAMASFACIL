/**
 * Adaptador Supabase (listo para usarse más adelante).
 *
 * No necesita instalar ninguna librería: usa la API REST de Supabase directamente.
 *
 * Para activarlo:
 *   1. Crea un proyecto en https://supabase.com
 *   2. Ejecuta el archivo  supabase/schema.sql  en el SQL Editor
 *   3. En el archivo .env coloca:
 *        VITE_DATA_SOURCE=supabase
 *        VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
 *        VITE_SUPABASE_ANON_KEY=tu-anon-key
 *   4. Reinicia  npm run dev
 */

const URL = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const TABLE = 'responses'

function assertConfigured() {
  if (!URL || !KEY) {
    throw new Error(
      'Supabase no está configurado. Revisa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env',
    )
  }
}

function headers(extra = {}) {
  return {
    apikey: KEY,
    Authorization: `Bearer ${KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  }
}

export const supabaseAdapter = {
  name: 'supabase',

  async insert(response) {
    assertConfigured()
    const res = await fetch(`${URL}/rest/v1/${TABLE}`, {
      method: 'POST',
      headers: headers({ Prefer: 'return=minimal' }),
      body: JSON.stringify({
        id: response.id,
        created_at: response.created_at,
        answers: response.answers,
        duration_sec: response.duration_sec,
        version: response.version,
      }),
    })
    if (!res.ok) throw new Error(`Supabase respondió ${res.status}`)
    return response
  },

  async list() {
    assertConfigured()
    const res = await fetch(`${URL}/rest/v1/${TABLE}?select=*&order=created_at.desc&limit=5000`, {
      headers: headers(),
    })
    if (!res.ok) throw new Error(`Supabase respondió ${res.status}`)
    return res.json()
  },

  async clear() {
    throw new Error('Por seguridad, borra los datos directamente desde el panel de Supabase.')
  },
}
