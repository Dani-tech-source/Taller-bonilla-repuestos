-- Tabla de repuestos del taller
create table repuestos (
  id bigint generated always as identity primary key,
  nombre text not null,
  descripcion text,
  modelo_compatible text,
  precio numeric(10, 2) not null check (precio >= 0),
  foto_url text,
  disponible boolean not null default true,
  created_at timestamptz not null default now()
);

-- Seguridad: activar reglas de acceso
alter table repuestos enable row level security;

-- Exponer la tabla al API solo para lectura
grant select on repuestos to anon, authenticated;

-- Cualquier visitante puede VER los repuestos (catálogo público)
create policy "Catálogo público de lectura"
  on repuestos for select
  using (true);