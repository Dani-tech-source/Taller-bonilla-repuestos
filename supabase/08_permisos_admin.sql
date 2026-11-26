-- Solo usuarios con sesión iniciada pueden agregar, editar o borrar.
-- El registro público está apagado en Supabase, así que el único usuario
-- con sesión es el administrador del taller.
-- La lectura pública del catálogo sigue igual (políticas de schema.sql y 06).

grant insert, update, delete on repuestos to authenticated;
grant insert, update, delete on repuesto_modelos to authenticated;

-- Tabla repuestos
create policy "Admin agrega repuestos"
  on repuestos for insert to authenticated
  with check (true);

create policy "Admin edita repuestos"
  on repuestos for update to authenticated
  using (true) with check (true);

create policy "Admin borra repuestos"
  on repuestos for delete to authenticated
  using (true);

-- Tabla repuesto_modelos
create policy "Admin agrega compatibilidad"
  on repuesto_modelos for insert to authenticated
  with check (true);

create policy "Admin edita compatibilidad"
  on repuesto_modelos for update to authenticated
  using (true) with check (true);

create policy "Admin borra compatibilidad"
  on repuesto_modelos for delete to authenticated
  using (true);

-- Comprobación: deben salir 8 políticas (2 de lectura + 6 de admin)
select tablename, policyname, cmd
from pg_policies
where tablename in ('repuestos', 'repuesto_modelos')
order by tablename, cmd;