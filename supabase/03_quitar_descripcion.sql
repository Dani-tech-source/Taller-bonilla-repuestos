-- Se elimina la columna "descripcion": el inventario del taller no la usa
-- (ya se corrió en Supabase el 1 de noviembre; se guarda aquí para que el repo
-- refleje la base de datos real)
alter table repuestos drop column if exists descripcion;