/**
 * DATOS DE DEMOSTRACIÓN
 * ─────────────────────
 * Genera respuestas ficticias (pero realistas) para que el panel /admin
 * se vea lleno desde el primer día. Siempre se generan las mismas
 * respuestas (semilla fija), distribuidas en los últimos 30 días.
 *
 * Puedes apagarlas desde el panel con el interruptor "Datos demo".
 */

// Generador pseudoaleatorio con semilla (mulberry32)
function seeded(seed) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const THEMES = [
  {
    key: 'citas',
    weight: 14,
    perfil: ['negocio', 'independiente', 'empresa'],
    tiempo: ['mensajes', 'trabajo'],
    whatsapp: ['citas', 'clientes', 'coordinar'],
    auto: [
      'Confirmar citas con mis clientes uno por uno por WhatsApp',
      'Mandar recordatorios de citas un día antes',
      'Reagendar citas cuando alguien cancela a última hora',
    ],
    manual: [
      'Llevo la agenda en un cuaderno y luego la paso al celular',
      'Escribo a cada cliente para recordarle su cita',
      'Anoto las reservas en un Excel a mano',
    ],
    molestia: [
      'Que la gente no confirme y luego no llegue a la cita',
      'Responder las mismas preguntas de horarios todo el día',
      'Perder mensajes importantes entre tantos chats',
    ],
    eliminar: ['Confirmar citas', 'Responder "¿qué horarios tiene?"', 'Recordar citas a clientes'],
    masfacil: [
      'Cuando tuve que reprogramar 8 citas porque me enfermé',
      'Buscando en WhatsApp a qué hora había quedado con un cliente',
    ],
    asistente: [
      'Que confirme y recuerde las citas automáticamente',
      'Que conteste los mensajes de horarios y precios',
      'Que me organice la agenda de la semana',
    ],
    ideal: [
      'Que mis clientes agenden solos y les llegue el recordatorio',
      'No tener que perseguir a nadie para confirmar una cita',
    ],
  },
  {
    key: 'cobros',
    weight: 13,
    perfil: ['negocio', 'independiente'],
    tiempo: ['pagos', 'mensajes'],
    whatsapp: ['cobros', 'clientes', 'pedidos'],
    auto: [
      'Recordarle a los clientes que me deben',
      'Revisar si ya me depositaron en el banco',
      'Mandar el número de cuenta a cada cliente',
    ],
    manual: [
      'Reviso transferencias una por una en la app del banco',
      'Llevo en una libreta quién me debe y cuánto',
      'Hago los recibos a mano',
    ],
    molestia: [
      'Cobrarle a la gente, da pena estar recordando',
      'Que me manden la foto del depósito y tenga que verificar',
      'No saber cuánto me deben en total',
    ],
    eliminar: ['Cobrar pagos atrasados', 'Verificar depósitos', 'Hacer recibos'],
    masfacil: [
      'Cuando tuve que revisar 30 transferencias para cuadrar el mes',
      'Cuando un cliente dijo que ya había pagado y no encontraba el depósito',
    ],
    asistente: [
      'Que cobre por mí y me avise cuando ya pagaron',
      'Que concilie los depósitos del banco con mis ventas',
    ],
    ideal: ['Cobrar sin tener que estar recordando a nadie', 'Saber al instante quién ya pagó'],
  },
  {
    key: 'reportes',
    weight: 13,
    perfil: ['empresa', 'estudio_trabajo'],
    tiempo: ['trabajo'],
    whatsapp: ['informacion', 'coordinar'],
    auto: [
      'Armar el reporte semanal en Excel copiando datos de varios lados',
      'Pasar datos de correos a una hoja de Excel',
      'Hacer el informe de ventas del mes',
    ],
    manual: [
      'Copiar y pegar información entre sistemas que no se conectan',
      'Consolidar reportes de varias sucursales',
      'Llenar la planilla de horas cada semana',
    ],
    molestia: [
      'Las reuniones que pudieron ser un correo',
      'Buscar archivos que alguien guardó quién sabe dónde',
      'Pedir la misma información a varias personas',
    ],
    eliminar: ['El reporte semanal', 'Copiar datos a Excel', 'Llenar la planilla de horas'],
    masfacil: [
      'Haciendo un informe que me tomó toda la tarde solo de copiar y pegar',
      'Cuando tuve que buscar una cotización vieja en el correo',
    ],
    asistente: [
      'Que me arme los reportes con los datos actualizados',
      'Que me resuma los correos importantes del día',
      'Que llene las planillas por mí',
    ],
    ideal: ['Que los reportes se hagan solos', 'Que los sistemas del trabajo se hablen entre sí'],
  },
  {
    key: 'facturas',
    weight: 9,
    perfil: ['negocio', 'independiente', 'empresa'],
    tiempo: ['pagos', 'tramites', 'trabajo'],
    whatsapp: ['informacion', 'clientes'],
    auto: [
      'Emitir facturas electrónicas a cada cliente',
      'Pasar facturas de compras al contador',
      'Ordenar las facturas del mes para la declaración',
    ],
    manual: [
      'Tomo foto a cada factura y la mando al contador',
      'Registro las facturas en Excel una por una',
      'Hago las cotizaciones en Word',
    ],
    molestia: [
      'Perder facturas y luego no poder deducirlas',
      'Que el portal de la SAT se caiga justo cuando lo necesito',
    ],
    eliminar: ['Ordenar facturas', 'Hacer cotizaciones', 'Pasar gastos a Excel'],
    masfacil: [
      'Cuando tuve que buscar facturas de hace tres meses para el contador',
      'Haciendo la declaración mensual a última hora',
    ],
    asistente: [
      'Que lea mis facturas y las ordene solo',
      'Que haga las cotizaciones con mis precios',
    ],
    ideal: ['Olvidarme de ordenar facturas para siempre', 'Tener la contabilidad al día sin pensar'],
  },
  {
    key: 'estudios',
    weight: 11,
    perfil: ['estudio', 'estudio_trabajo'],
    tiempo: ['estudios', 'traslados'],
    whatsapp: ['coordinar', 'informacion', 'conversar'],
    auto: [
      'Organizar las fechas de entrega de todas las clases',
      'Coordinar a mi grupo para los trabajos',
      'Pasar mis apuntes en limpio',
    ],
    manual: [
      'Anoto las tareas en varias apps y siempre se me olvida alguna',
      'Busco en los grupos de WhatsApp qué dejaron de tarea',
      'Hago los resúmenes para estudiar a mano',
    ],
    molestia: [
      'Enterarme tarde de las tareas porque se perdió el mensaje en el grupo',
      'Coordinar horarios con el grupo de trabajo',
      'El tráfico para llegar a la universidad',
    ],
    eliminar: ['Revisar el portal de la U a cada rato', 'Coordinar al grupo', 'Hacer resúmenes'],
    masfacil: [
      'Cuando se me pasó una entrega porque estaba en otro grupo de WhatsApp',
      'Preparando un examen con apuntes de tres lugares diferentes',
    ],
    asistente: [
      'Que me recuerde todas las entregas y exámenes',
      'Que me haga resúmenes de las clases',
      'Que organice mi semana entre trabajo y U',
    ],
    ideal: ['Tener todas mis tareas y entregas en un solo lugar', 'Que el grupo se coordine solo'],
  },
  {
    key: 'casa',
    weight: 9,
    perfil: ['empresa', 'otra', 'estudio_trabajo', 'independiente'],
    tiempo: ['casa', 'compras'],
    whatsapp: ['pedidos', 'coordinar', 'conversar'],
    auto: [
      'Hacer la lista del súper cada semana',
      'Pagar la luz, el agua y el internet',
      'Planear qué vamos a comer en la semana',
    ],
    manual: [
      'Hacemos la lista del súper en un papel y siempre se nos olvida algo',
      'Pago cada servicio en una app diferente',
      'Coordino quién recoge a los niños por mensaje',
    ],
    molestia: [
      'Olvidar pagar un servicio y que me cobren mora',
      'Pensar qué cocinar todos los días',
      'Que se acabe algo en la casa y nadie avise',
    ],
    eliminar: ['Hacer la lista del súper', 'Pagar servicios', 'Pensar qué cocinar'],
    masfacil: [
      'Cuando me cortaron el internet por olvidar pagarlo',
      'Haciendo compras y dándome cuenta en casa que olvidé lo principal',
    ],
    asistente: [
      'Que pague mis servicios a tiempo',
      'Que haga el pedido del súper cuando algo se acabe',
      'Que planifique el menú de la semana',
    ],
    ideal: ['Que la casa se administre sola', 'No volver a pagar una mora'],
  },
  {
    key: 'tramites',
    weight: 7,
    perfil: ['empresa', 'negocio', 'otra'],
    tiempo: ['tramites', 'traslados'],
    whatsapp: ['informacion', 'ubicaciones'],
    auto: [
      'Ir a hacer filas para trámites',
      'Renovar documentos que se vencen',
      'Llenar los mismos formularios con los mismos datos',
    ],
    manual: [
      'Llenar formularios en papel que luego alguien transcribe',
      'Ir personalmente a entregar papelería',
    ],
    molestia: [
      'No saber qué requisitos piden hasta que llegas',
      'Las filas eternas en el banco',
      'Que se venza la licencia sin darme cuenta',
    ],
    eliminar: ['Hacer filas', 'Llenar formularios repetidos', 'Ir al banco'],
    masfacil: [
      'Cuando fui dos veces a hacer un trámite porque faltaba una copia',
      'Renovando un documento que pedía todo en persona',
    ],
    asistente: [
      'Que me avise antes de que se venzan mis documentos',
      'Que llene formularios por mí',
    ],
    ideal: ['Hacer cualquier trámite desde el celular', 'Saber exactamente qué llevar antes de ir'],
  },
  {
    key: 'inventario',
    weight: 8,
    perfil: ['negocio'],
    tiempo: ['trabajo', 'compras'],
    whatsapp: ['pedidos', 'clientes', 'cobros'],
    auto: [
      'Contar el inventario y hacer pedidos a proveedores',
      'Tomar pedidos por WhatsApp y pasarlos a una lista',
      'Actualizar precios en el catálogo',
    ],
    manual: [
      'Anoto los pedidos en un cuaderno',
      'Mando fotos del catálogo una por una',
      'Cuento el inventario a mano cada semana',
    ],
    molestia: [
      'Quedarme sin producto sin darme cuenta',
      'Que me pregunten el precio de todo por mensaje',
      'Confundir pedidos entre tantos chats',
    ],
    eliminar: ['Contar inventario', 'Mandar el catálogo', 'Pasar pedidos a la lista'],
    masfacil: [
      'Cuando se me cruzaron dos pedidos y le mandé el producto equivocado a un cliente',
      'Haciendo inventario un domingo completo',
    ],
    asistente: [
      'Que tome los pedidos de WhatsApp y los ordene',
      'Que me avise cuando algo se esté acabando',
      'Que responda precios y disponibilidad',
    ],
    ideal: ['Que los pedidos lleguen ordenados solos', 'Saber siempre cuánto inventario tengo'],
  },
  {
    key: 'traslados',
    weight: 5,
    perfil: ['empresa', 'estudio', 'estudio_trabajo'],
    tiempo: ['traslados'],
    whatsapp: ['ubicaciones', 'coordinar', 'conversar'],
    auto: ['Calcular a qué hora salir para no agarrar tráfico', 'Coordinar quién lleva a quién'],
    manual: ['Reviso Waze varias veces antes de salir', 'Coordino el carpool por mensajes'],
    molestia: ['El tráfico de la mañana', 'Buscar parqueo', 'Coordinar el transporte con otros'],
    eliminar: ['Manejar en hora pico', 'Buscar parqueo'],
    masfacil: ['Pasando dos horas en el tráfico para una reunión de 20 minutos'],
    asistente: ['Que me diga la mejor hora para salir', 'Que coordine el carpool'],
    ideal: ['Perder menos tiempo en el tráfico', 'No tener que ir en persona a todo'],
  },
]

const PAY = [
  ['si', 22],
  ['probablemente_si', 28],
  ['depende', 26],
  ['probablemente_no', 15],
  ['no', 9],
]
const PRICE = [
  ['q10_25', 18],
  ['q26_50', 30],
  ['q51_100', 24],
  ['q101_200', 11],
  ['q201_500', 5],
  ['q500_mas', 2],
  ['depende', 10],
]

function weighted(rand, pairs) {
  const total = pairs.reduce((s, [, w]) => s + w, 0)
  let r = rand() * total
  for (const [v, w] of pairs) {
    if ((r -= w) <= 0) return v
  }
  return pairs[0][0]
}
const pick = (rand, arr) => arr[Math.floor(rand() * arr.length)]
function pickSome(rand, arr, min, max) {
  const n = Math.min(arr.length, min + Math.floor(rand() * (max - min + 1)))
  const copy = [...arr]
  const out = []
  while (out.length < n && copy.length) out.push(copy.splice(Math.floor(rand() * copy.length), 1)[0])
  return out
}

let cache = null

export function getMockResponses() {
  if (cache) return cache
  const rand = seeded(20260926)
  const now = new Date()
  const themePairs = THEMES.map((t) => [t, t.weight])
  const out = []
  const TOTAL = 164

  for (let i = 0; i < TOTAL; i++) {
    const t = weighted(rand, themePairs)
    const t2 = rand() < 0.35 ? weighted(rand, themePairs) : t

    // Más respuestas en días recientes
    const daysAgo = Math.floor(Math.pow(rand(), 1.6) * 30)
    const d = new Date(now)
    d.setDate(d.getDate() - daysAgo)
    d.setHours(7 + Math.floor(rand() * 15), Math.floor(rand() * 60), Math.floor(rand() * 60), 0)
    if (d > now) d.setTime(now.getTime() - Math.floor(rand() * 3600_000))

    const answers = {}
    answers.perfil = pick(rand, t.perfil)
    if (answers.perfil === 'otra') answers.perfil_otro = pick(rand, ['Ama de casa', 'Jubilado', 'Buscando trabajo'])

    const skip = () => rand() < 0.1
    if (!skip()) answers.automatizar_semana = pick(rand, t.auto)
    answers.tiempo_perdido = [...new Set([...pickSome(rand, t.tiempo, 1, 2), ...(rand() < 0.4 ? [pick(rand, t2.tiempo)] : [])])].slice(0, 3)
    if (!skip()) answers.manual = pick(rand, t.manual)
    if (!skip()) answers.molestia = pick(rand, rand() < 0.7 ? t.molestia : t2.molestia)
    answers.whatsapp = [...new Set([...pickSome(rand, t.whatsapp, 1, 3), ...(rand() < 0.3 ? ['conversar'] : [])])]
    if (!skip()) answers.eliminar_tarea = pick(rand, t.eliminar)
    if (rand() > 0.18) answers.mas_facil = pick(rand, t.masfacil)
    if (!skip()) answers.asistente = pick(rand, rand() < 0.75 ? t.asistente : t2.asistente)

    answers.pagaria = weighted(rand, PAY)
    if (['si', 'probablemente_si', 'depende'].includes(answers.pagaria)) {
      answers.precio = weighted(rand, PRICE)
    }
    answers.solucion_ideal = pick(rand, rand() < 0.8 ? t.ideal : t2.ideal)

    out.push({
      id: `demo-${String(i + 1).padStart(3, '0')}`,
      created_at: d.toISOString(),
      answers,
      duration_sec: 95 + Math.floor(rand() * 110),
      version: 1,
      demo: true,
    })
  }

  cache = out.sort((a, b) => b.created_at.localeCompare(a.created_at))
  return cache
}
