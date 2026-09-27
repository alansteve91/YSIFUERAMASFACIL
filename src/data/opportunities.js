/**
 * OPORTUNIDADES — DATOS SIMULADOS
 * ────────────────────────────────
 * Por ahora esta sección muestra un análisis de ejemplo.
 * Más adelante se reemplazará por un análisis automático con IA
 * (ver la función `analyzeWithAI` en src/lib/analytics.js).
 */

export const OPPORTUNITY_GROUPS = [
  {
    key: 'repetidos',
    title: 'Problemas muy repetidos',
    description: 'Lo que más aparece en las respuestas abiertas.',
    tone: 'rose',
    items: [
      { title: 'Confirmar y recordar citas por WhatsApp', metric: '38 menciones', trend: '+12% esta semana' },
      { title: 'Perseguir pagos pendientes de clientes', metric: '31 menciones', trend: '+8%' },
      { title: 'Armar reportes copiando datos a Excel', metric: '27 menciones', trend: 'estable' },
      { title: 'Perder información entre chats', metric: '19 menciones', trend: '+5%' },
    ],
  },
  {
    key: 'pagarian',
    title: 'Problemas por los que pagarían',
    description: 'Cruzados con “Sí / Probablemente sí”.',
    tone: 'amber',
    items: [
      { title: 'Cobros y recordatorios automáticos', metric: '72% pagaría', trend: 'Q26 – Q50 / mes' },
      { title: 'Agenda con confirmación automática', metric: '68% pagaría', trend: 'Q51 – Q100 / mes' },
      { title: 'Orden de facturas para el contador', metric: '61% pagaría', trend: 'Q26 – Q50 / mes' },
      { title: 'Pedidos de WhatsApp organizados', metric: '57% pagaría', trend: 'Q51 – Q100 / mes' },
    ],
  },
  {
    key: 'repetitivas',
    title: 'Tareas repetitivas',
    description: 'Tareas que se hacen varias veces por semana.',
    tone: 'sky',
    items: [
      { title: 'Copiar y pegar entre sistemas', metric: 'Diario', trend: '~4 h / semana' },
      { title: 'Responder precios y horarios', metric: 'Diario', trend: '~3 h / semana' },
      { title: 'Verificar depósitos bancarios', metric: '3–5 veces / semana', trend: '~2 h / semana' },
      { title: 'Hacer la lista del súper', metric: 'Semanal', trend: '~40 min / semana' },
    ],
  },
  {
    key: 'oportunidades',
    title: 'Posibles oportunidades',
    description: 'Hipótesis a validar con más respuestas.',
    tone: 'brand',
    items: [
      { title: 'Asistente de citas para negocios pequeños', metric: 'Señal alta', trend: 'Salones, clínicas, talleres', score: 92 },
      { title: 'Cobrador amable automático', metric: 'Señal alta', trend: 'Independientes y pymes', score: 88 },
      { title: 'Bandeja de pedidos desde WhatsApp', metric: 'Señal media', trend: 'Tiendas y emprendimientos', score: 74 },
      { title: 'Organizador de entregas universitarias', metric: 'Señal media', trend: 'Estudiantes', score: 63 },
    ],
  },
]
