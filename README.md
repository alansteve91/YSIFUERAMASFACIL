# ¿Y si fuera más fácil?

Encuesta anónima (tipo conversación) para descubrir las pequeñas cosas que le hacen perder tiempo a las personas, más un panel administrativo con resultados.

Hecho con **React + Vite + Tailwind CSS** (animaciones con Framer Motion, iconos Lucide y gráficas Recharts).

---

## 🚀 Cómo usarlo (4 pasos)

> Solo necesitas tener instalado **Node.js 20 o superior** → descárgalo en https://nodejs.org (botón "LTS").

### 1. Instalar dependencias

Abre una terminal **dentro de esta carpeta** y escribe:

```bash
npm install
```

(Solo se hace una vez. Tarda 1 o 2 minutos.)

### 2. Iniciar el proyecto

```bash
npm run dev
```

### 3. Abrir en el navegador

```
http://localhost:5173
```

(Normalmente se abre solo.)

### 4. Entrar al panel administrativo

```
http://localhost:5173/admin
```

Clave: **`masfacil`**

---

## 📱 Probarlo en tu celular

Con el celular conectado al **mismo Wi-Fi** que la computadora:

```bash
npm run dev -- --host
```

La terminal mostrará una dirección tipo `http://192.168.x.x:5173`. Ábrela en el celular.

---

## ❓ Preguntas frecuentes

**¿Dónde se guardan las respuestas?**
Por ahora, en el **navegador** donde se respondió la encuesta (no se necesita base de datos). Por eso, el panel `/admin` muestra las respuestas hechas en ese mismo navegador. Cuando conectemos Supabase, todas las respuestas llegarán a un solo lugar.

**¿Qué son los "datos demo"?**
El panel incluye 164 respuestas de ejemplo para que se vea completo desde el inicio. Puedes apagarlas con el interruptor **"Datos demo"** arriba a la derecha. Las respuestas reales se marcan con la etiqueta **REAL**.

**¿Cómo cambio la clave del panel?**
Copia el archivo `.env.example`, renómbralo a `.env` y cambia `VITE_ADMIN_PIN`. Luego reinicia `npm run dev`.
⚠️ Esta clave es un candado sencillo para la demostración, no una seguridad real. Antes de publicar, el acceso al panel debe protegerse con usuarios de Supabase.

**¿Cómo genero la versión final para publicar?**
```bash
npm run build
```
Se crea la carpeta `dist/`. (Todavía no la publiques.)

---

## ✨ Qué incluye

**Encuesta**
- Pantalla inicial con fondo abstracto animado.
- Una pregunta por pantalla, con barra de progreso y transiciones suaves.
- 12 preguntas (la 11 solo aparece si la persona respondió Sí / Probablemente sí / Depende en la 10).
- Tarjetas de selección simple y múltiple, escala, texto abierto y opción "Otra → ¿Cuál?".
- Botón **Atrás** que conserva las respuestas.
- Reacciones breves ("Interesante 👀", "Buena respuesta ✨"…) solo en algunas preguntas.
- Última pregunta con diseño especial y pantalla final con celebración.
- Si la persona cierra la pestaña, puede **continuar donde lo dejó** (durante 24 h).
- Atajos en computadora: **Enter** para continuar, **1-9** para elegir opciones.
- 100 % anónima: no pide nombre, correo, teléfono, dirección, DPI ni fecha de nacimiento. Solo se guardan las respuestas, la fecha y la duración aproximada.

**Panel `/admin`**
- Total de respuestas, respuestas de hoy, % que pagaría y rango de precio más elegido (con promedio estimado).
- Gráficas: respuestas por día, disposición a pagar, precio, dónde se escapa el tiempo, perfil y uso de WhatsApp.
- **Problemas descubiertos**: temas más mencionados (tócalos para filtrar las respuestas).
- **Oportunidades**: problemas repetidos, por los que pagarían, tareas repetitivas y posibles oportunidades (datos simulados, listos para conectar IA).
- **Respuestas recientes**: búsqueda, filtro por perfil y detalle de cada encuesta (con flechas ← → para navegar).
- Exportar todo a **CSV** (se abre en Excel).

---

## 🗂️ Estructura

```
y-si-fuera-mas-facil/
├── index.html
├── package.json
├── vite.config.js · tailwind.config.js · postcss.config.js
├── .env.example                  ← configuración opcional
├── public/favicon.svg
├── supabase/schema.sql           ← tabla lista para cuando conectemos Supabase
└── src/
    ├── main.jsx · App.jsx        ← arranque y rutas ( / y /admin )
    ├── styles/index.css          ← estilos globales y componentes CSS
    ├── data/
    │   ├── questions.js          ← ✏️ TODAS LAS PREGUNTAS (edítalas aquí)
    │   ├── mockResponses.js      ← respuestas de demostración
    │   └── opportunities.js      ← oportunidades simuladas
    ├── services/
    │   ├── responses.js          ← punto único para guardar/leer respuestas
    │   └── adapters/             ← local (navegador) y Supabase
    ├── lib/                      ← análisis, formato, almacenamiento seguro
    ├── hooks/                    ← lógica de la encuesta y del panel
    ├── components/
    │   ├── survey/               ← pantallas y piezas de la encuesta
    │   ├── admin/                ← tarjetas, gráficas y secciones del panel
    │   └── ui/                   ← logo
    └── pages/                    ← SurveyPage, AdminPage, NotFound
```

**¿Quieres cambiar una pregunta, una opción o una reacción?** Todo está en `src/data/questions.js`.

---

## 🔌 Conectar Supabase (más adelante)

Ya está preparado; no hay que instalar nada extra.

1. Crea un proyecto en https://supabase.com
2. En **SQL Editor**, ejecuta `supabase/schema.sql`.
3. Crea el archivo `.env` con:
   ```
   VITE_DATA_SOURCE=supabase
   VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```
4. Reinicia `npm run dev`.

El código que habla con Supabase está en `src/services/adapters/supabaseAdapter.js`.

## 🤖 Conectar IA (más adelante)

- La clasificación de temas está en `src/lib/analytics.js` (hoy usa palabras clave).
- La función `analyzeWithAI()` en ese mismo archivo es el punto para conectar el análisis con IA y reemplazar las oportunidades simuladas de `src/data/opportunities.js`.
