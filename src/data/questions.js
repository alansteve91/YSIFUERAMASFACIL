import {
  GraduationCap,
  Briefcase,
  Rocket,
  Laptop,
  BookOpen,
  Sparkles,
  House,
  MessageCircle,
  Wallet,
  ShoppingCart,
  Car,
  ClipboardList,
  CircleHelp,
  CalendarDays,
  ShoppingBag,
  CreditCard,
  MapPin,
  Users,
  FileText,
  Headphones,
  MessagesSquare,
  Plus,
} from 'lucide-react'

/**
 * Definición de la encuesta.
 *
 * Tipos:
 *  - single : una sola opción (tarjetas)
 *  - multi  : varias opciones (tarjetas)
 *  - scale  : una opción, presentada como lista vertical
 *  - text   : respuesta abierta
 *
 * Campos útiles:
 *  - lead       : frase corta antes de la pregunta
 *  - title      : pregunta principal
 *  - quote      : frase destacada (tipografía serif)
 *  - hint       : texto discreto debajo del campo
 *  - otherValue : valor de la opción "Otra" → muestra un mini campo "¿Cuál?"
 *  - showIf     : (answers) => boolean   (preguntas condicionales)
 *  - reaction   : (answer, answers) => string | null   (mensaje breve en la transición)
 *  - skippable  : permite "Prefiero saltar esta"
 *  - variant    : 'final' para la última pregunta
 */

export const QUESTIONS = [
  {
    id: 'perfil',
    type: 'single',
    title: 'Para conocerte un poquito mejor, ¿qué describe mejor tu día a día?',
    otherValue: 'otra',
    otherPlaceholder: 'Cuéntanos en pocas palabras…',
    columns: 2,
    options: [
      { value: 'estudio', label: 'Estudio', icon: GraduationCap },
      { value: 'empresa', label: 'Trabajo en una empresa', icon: Briefcase },
      { value: 'negocio', label: 'Tengo un negocio', icon: Rocket },
      { value: 'independiente', label: 'Trabajo por mi cuenta', icon: Laptop },
      { value: 'estudio_trabajo', label: 'Estudio y trabajo', icon: BookOpen },
      { value: 'otra', label: 'Otra situación', icon: Sparkles },
    ],
    reaction: () => null,
  },
  {
    id: 'automatizar_semana',
    type: 'text',
    lead: 'Piensa en esta última semana…',
    title: '¿Qué actividad hiciste varias veces y te hubiera encantado que fuera automática?',
    placeholder: 'Por ejemplo: pasar datos de un lado a otro, confirmar citas, armar reportes…',
    skippable: true,
    reaction: (a) => (a && a.trim().length > 12 ? 'Interesante 👀' : null),
  },
  {
    id: 'tiempo_perdido',
    type: 'multi',
    title: '¿Dónde sientes que se te escapa más tiempo?',
    subtitle: 'Puedes elegir hasta 3.',
    maxSelect: 3,
    otherValue: 'otro',
    otherPlaceholder: '¿Dónde más?',
    columns: 3,
    options: [
      { value: 'trabajo', label: 'Trabajo', icon: Briefcase },
      { value: 'casa', label: 'Casa', icon: House },
      { value: 'estudios', label: 'Estudios', icon: BookOpen },
      { value: 'mensajes', label: 'Mensajes / WhatsApp', icon: MessageCircle },
      { value: 'pagos', label: 'Pagos y finanzas', icon: Wallet },
      { value: 'compras', label: 'Compras', icon: ShoppingCart },
      { value: 'traslados', label: 'Traslados', icon: Car },
      { value: 'tramites', label: 'Trámites', icon: ClipboardList },
      { value: 'otro', label: 'Otro', icon: CircleHelp },
    ],
    reaction: (a) => (Array.isArray(a) && a.includes('mensajes') ? 'Eso nos pasa a muchos.' : null),
  },
  {
    id: 'manual',
    type: 'text',
    title: '¿Qué haces actualmente de forma manual y piensas:',
    quote: '“Esto ya debería poder hacerse automáticamente”?',
    placeholder: 'Escribe aquí…',
    skippable: true,
    reaction: () => null,
  },
  {
    id: 'molestia',
    type: 'text',
    title: '¿Qué cosa pequeña te molesta o complica frecuentemente?',
    hint: 'No tiene que ser un problema enorme. A veces las mejores soluciones nacen de pequeñas molestias.',
    placeholder: 'Escribe aquí…',
    skippable: true,
    reaction: (a) => (a && a.trim().length > 8 ? 'Vamos descubriendo cosas…' : null),
  },
  {
    id: 'whatsapp',
    type: 'multi',
    title: '¿Qué actividad haces frecuentemente por WhatsApp?',
    subtitle: 'Elige todas las que apliquen.',
    otherValue: 'otra',
    otherPlaceholder: '¿Qué otra cosa?',
    columns: 3,
    options: [
      { value: 'citas', label: 'Coordinar citas', icon: CalendarDays },
      { value: 'pedidos', label: 'Hacer pedidos', icon: ShoppingBag },
      { value: 'cobros', label: 'Recordar / cobrar pagos', icon: CreditCard },
      { value: 'ubicaciones', label: 'Compartir ubicaciones', icon: MapPin },
      { value: 'coordinar', label: 'Coordinar personas', icon: Users },
      { value: 'informacion', label: 'Enviar información', icon: FileText },
      { value: 'clientes', label: 'Atender clientes', icon: Headphones },
      { value: 'conversar', label: 'Solo conversar', icon: MessagesSquare },
      { value: 'otra', label: 'Otra', icon: Plus },
    ],
    reaction: (a) => {
      if (!Array.isArray(a)) return null
      const work = a.filter((v) => ['citas', 'pedidos', 'cobros', 'clientes', 'coordinar'].includes(v))
      return work.length >= 2 ? 'Eso nos pasa a muchos.' : null
    },
  },
  {
    id: 'eliminar_tarea',
    type: 'text',
    lead: 'Si pudieras eliminar UNA tarea repetitiva de tu semana para siempre…',
    title: '¿Cuál sería?',
    placeholder: 'La primera que se te venga a la mente…',
    skippable: true,
    reaction: () => null,
  },
  {
    id: 'mas_facil',
    type: 'text',
    title: '¿Qué situación te ha hecho pensar recientemente:',
    quote: '“Tiene que existir una manera más fácil de hacer esto”?',
    placeholder: 'Escribe aquí…',
    skippable: true,
    reaction: (a) => (a && a.trim().length > 12 ? 'Buena respuesta ✨' : null),
  },
  {
    id: 'asistente',
    type: 'text',
    lead: 'Imagina que tienes un asistente digital disponible las 24 horas.',
    title: '¿Qué tarea le delegarías primero?',
    placeholder: 'Le pediría que…',
    skippable: true,
    reaction: () => null,
  },
  {
    id: 'pagaria',
    type: 'scale',
    lead: 'Si existiera una solución que realmente te ahorrara tiempo todas las semanas…',
    title: '¿considerarías pagar por ella?',
    options: [
      { value: 'si', label: 'Sí' },
      { value: 'probablemente_si', label: 'Probablemente sí' },
      { value: 'depende', label: 'Depende de cuánto me ayude' },
      { value: 'probablemente_no', label: 'Probablemente no' },
      { value: 'no', label: 'No' },
    ],
    reaction: (a) => (a === 'si' || a === 'probablemente_si' ? 'Anotado 👌' : null),
  },
  {
    id: 'precio',
    type: 'scale',
    title: 'Si realmente te resolviera un problema frecuente, ¿qué precio mensual te parecería razonable?',
    // Se muestra si aún no responde la pregunta 10, o si respondió Sí / Probablemente sí / Depende
    showIf: (answers) => !answers.pagaria || ['si', 'probablemente_si', 'depende'].includes(answers.pagaria),
    options: [
      { value: 'q10_25', label: 'Q10 – Q25' },
      { value: 'q26_50', label: 'Q26 – Q50' },
      { value: 'q51_100', label: 'Q51 – Q100' },
      { value: 'q101_200', label: 'Q101 – Q200' },
      { value: 'q201_500', label: 'Q201 – Q500' },
      { value: 'q500_mas', label: 'Más de Q500' },
      { value: 'depende', label: 'Dependería de la solución' },
    ],
    reaction: () => null,
  },
  {
    id: 'solucion_ideal',
    type: 'text',
    variant: 'final',
    eyebrow: 'Última pregunta ✨',
    lead: 'Si mañana apareciera una solución perfecta para UNA molestia de tu vida…',
    title: '¿qué te gustaría que solucionara?',
    placeholder: 'Sueña un poquito…',
    rows: 5,
    reaction: () => null,
  },
]

/** Etiquetas legibles para el panel administrativo */
export const LABELS = Object.fromEntries(
  QUESTIONS.filter((q) => q.options).map((q) => [
    q.id,
    Object.fromEntries(q.options.map((o) => [o.value, o.label])),
  ]),
)

export const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]))

/** Preguntas visibles según las respuestas actuales (resuelve las condicionales) */
export function visibleQuestions(answers) {
  return QUESTIONS.filter((q) => !q.showIf || q.showIf(answers))
}

/** Texto corto de la pregunta (para el panel) */
export function questionText(q) {
  return [q.lead, q.title, q.quote].filter(Boolean).join(' ')
}
