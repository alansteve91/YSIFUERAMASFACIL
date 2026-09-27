import { LABELS } from '../data/questions'

/** Campos de texto abierto que se analizan para descubrir problemas */
export const OPEN_FIELDS = [
  'automatizar_semana',
  'manual',
  'molestia',
  'eliminar_tarea',
  'mas_facil',
  'asistente',
  'solucion_ideal',
]

/**
 * Categorías de problemas.
 * Clasificación simple por palabras clave (versión 1).
 * Más adelante se reemplaza por IA sin cambiar el resto del panel.
 */
export const CATEGORIES = [
  { key: 'whatsapp', label: 'WhatsApp y mensajes', keywords: ['whatsapp', 'mensaje', 'chat', 'grupo', 'contest', 'respond'], from3: ['mensajes'] },
  { key: 'trabajo', label: 'Trabajo', keywords: ['reporte', 'informe', 'excel', 'correo', 'reunion', 'planilla', 'oficina', 'jefe', 'sistema', 'copiar', 'archivo'], from3: ['trabajo'] },
  { key: 'pagos', label: 'Pagos y cobros', keywords: ['pag', 'cobr', 'deposit', 'banco', 'transferen', 'me deben', 'recibo', 'mora'], from3: ['pagos'] },
  { key: 'citas', label: 'Citas y agenda', keywords: ['cita', 'agenda', 'recordar', 'recordatorio', 'reserv', 'horario', 'calendario'], from3: [] },
  { key: 'estudios', label: 'Estudios', keywords: ['tarea', 'clase', 'universidad', ' u ', 'examen', 'entrega', 'apunte', 'estudi', 'resumen'], from3: ['estudios'] },
  { key: 'facturas', label: 'Facturas y contabilidad', keywords: ['factura', 'contador', 'contab', 'cotiza', 'sat', 'declara', 'gasto'], from3: [] },
  { key: 'pedidos', label: 'Pedidos e inventario', keywords: ['pedido', 'inventario', 'proveedor', 'catalogo', 'producto', 'precio'], from3: ['compras'] },
  { key: 'casa', label: 'Casa', keywords: ['casa', 'super', 'cocin', 'comida', 'menu', 'niños', 'servicio', 'luz', 'agua', 'internet'], from3: ['casa'] },
  { key: 'tramites', label: 'Trámites', keywords: ['tramite', 'fila', 'formulario', 'document', 'licencia', 'requisit', 'papeler', 'renov'], from3: ['tramites'] },
  { key: 'traslados', label: 'Traslados', keywords: ['trafico', 'traslado', 'parqueo', 'manejar', 'carpool', 'waze', 'salir'], from3: ['traslados'] },
]

const plain = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

/** Devuelve las categorías detectadas en una respuesta */
export function categorize(response) {
  const a = response.answers || {}
  const text = ' ' + plain(OPEN_FIELDS.map((f) => a[f]).filter(Boolean).join(' · ')) + ' '
  const where = Array.isArray(a.tiempo_perdido) ? a.tiempo_perdido : []
  return CATEGORIES.filter(
    (c) => c.keywords.some((k) => text.includes(plain(k))) || c.from3.some((v) => where.includes(v)),
  ).map((c) => c.key)
}

const PAY_YES = ['si', 'probablemente_si']
const PRICE_MID = { q10_25: 17.5, q26_50: 38, q51_100: 75.5, q101_200: 150.5, q201_500: 350.5, q500_mas: 600 }

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function countBy(list, key, labels) {
  const map = new Map()
  for (const r of list) {
    const v = r.answers?.[key]
    const vals = Array.isArray(v) ? v : v ? [v] : []
    for (const x of vals) map.set(x, (map.get(x) || 0) + 1)
  }
  const order = labels ? Object.keys(labels) : [...map.keys()]
  return order
    .map((k) => ({ key: k, label: labels?.[k] ?? k, value: map.get(k) || 0 }))
}

/** Calcula todo lo que muestra el dashboard */
export function computeStats(responses) {
  const now = new Date()
  const total = responses.length
  const today = responses.filter((r) => sameDay(new Date(r.created_at), now)).length
  const yesterdayDate = new Date(now)
  yesterdayDate.setDate(now.getDate() - 1)
  const yesterday = responses.filter((r) => sameDay(new Date(r.created_at), yesterdayDate)).length

  const answeredPay = responses.filter((r) => r.answers?.pagaria)
  const yes = answeredPay.filter((r) => PAY_YES.includes(r.answers.pagaria)).length
  const maybe = answeredPay.filter((r) => r.answers.pagaria === 'depende').length
  const payPct = answeredPay.length ? Math.round((yes / answeredPay.length) * 100) : 0
  const payPctWithMaybe = answeredPay.length ? Math.round(((yes + maybe) / answeredPay.length) * 100) : 0

  const priceCounts = countBy(responses, 'precio', LABELS.precio)
  const priceTop = [...priceCounts].filter((p) => p.key !== 'depende').sort((a, b) => b.value - a.value)[0]
  const priced = responses.filter((r) => PRICE_MID[r.answers?.precio])
  const priceAvg = priced.length
    ? Math.round(priced.reduce((s, r) => s + PRICE_MID[r.answers.precio], 0) / priced.length)
    : 0

  // Respuestas por día (últimos 14 días)
  const days = []
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    days.push({
      date: d,
      label: d.toLocaleDateString('es-GT', { day: 'numeric', month: 'short' }).replace('.', ''),
      value: responses.filter((r) => sameDay(new Date(r.created_at), d)).length,
    })
  }

  // Categorías de problemas
  const catMap = new Map(CATEGORIES.map((c) => [c.key, { ...c, value: 0, payYes: 0 }]))
  for (const r of responses) {
    for (const k of categorize(r)) {
      const c = catMap.get(k)
      c.value++
      if (PAY_YES.includes(r.answers?.pagaria)) c.payYes++
    }
  }
  const categories = [...catMap.values()].filter((c) => c.value > 0).sort((a, b) => b.value - a.value)

  const durations = responses.map((r) => r.duration_sec).filter(Boolean)
  const avgDuration = durations.length ? Math.round(durations.reduce((s, x) => s + x, 0) / durations.length) : 0

  return {
    total,
    today,
    yesterday,
    payPct,
    payPctWithMaybe,
    payAnswered: answeredPay.length,
    priceAvg,
    priceTop,
    avgDuration,
    days,
    perfil: countBy(responses, 'perfil', LABELS.perfil),
    tiempo: countBy(responses, 'tiempo_perdido', LABELS.tiempo_perdido).sort((a, b) => b.value - a.value),
    whatsapp: countBy(responses, 'whatsapp', LABELS.whatsapp).sort((a, b) => b.value - a.value),
    pagaria: countBy(responses, 'pagaria', LABELS.pagaria),
    precio: priceCounts,
    categories,
  }
}

/**
 * GANCHO PARA IA (futuro)
 * Aquí se conectará un análisis con IA que agrupe los problemas,
 * detecte patrones y proponga oportunidades. Debe devolver el mismo
 * formato que OPPORTUNITY_GROUPS (src/data/opportunities.js).
 */
export async function analyzeWithAI(/* responses */) {
  return null
}

/** Exporta las respuestas a CSV (se abre bien en Excel) */
export function toCSV(responses, questions) {
  const cols = []
  for (const q of questions) {
    cols.push(q.id)
    if (q.otherValue) cols.push(`${q.id}_otro`)
  }
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const head = ['id', 'fecha', 'duracion_seg', ...cols]
  const rows = responses.map((r) => {
    const a = r.answers || {}
    return [
      r.id,
      new Date(r.created_at).toLocaleString('es-GT'),
      r.duration_sec ?? '',
      ...cols.map((c) => {
        const v = a[c]
        const lbl = LABELS[c]
        if (Array.isArray(v)) return v.map((x) => lbl?.[x] ?? x).join(' | ')
        return lbl?.[v] ?? v ?? ''
      }),
    ]
  })
  return '﻿' + [head, ...rows].map((row) => row.map(esc).join(',')).join('\n')
}
