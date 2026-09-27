-- ─────────────────────────────────────────────────────────────
--  ¿Y SI FUERA MÁS FÁCIL?  ·  Esquema para Supabase (para más adelante)
--  Ejecuta este archivo en: Supabase → SQL Editor → New query → Run
-- ─────────────────────────────────────────────────────────────

create table if not exists public.responses (
  id           uuid primary key,
  created_at   timestamptz not null default now(),
  answers      jsonb       not null,           -- solo las respuestas de la encuesta
  duration_sec integer,                         -- cuánto tardó (aprox.)
  version      smallint    not null default 1
);

-- No se guarda: nombre, correo, teléfono, IP, dirección, DPI ni fecha de nacimiento.

alter table public.responses enable row level security;

-- Cualquiera puede ENVIAR una respuesta (la encuesta es pública y anónima)
create policy "insert anonimo"
  on public.responses for insert
  to anon
  with check (true);

-- IMPORTANTE: leer respuestas debería hacerse solo con usuarios autenticados.
-- Para una prueba rápida puedes habilitar esta política y luego eliminarla:
-- create policy "lectura temporal" on public.responses for select to anon using (true);

create index if not exists responses_created_at_idx on public.responses (created_at desc);
