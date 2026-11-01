-- Agrega código y stock a la tabla de repuestos
alter table repuestos add column codigo text unique;
alter table repuestos add column stock integer not null default 0 check (stock >= 0);

-- Permitir repuestos sin precio (la página mostrará "Consultar precio")
alter table repuestos alter column precio drop not null;

-- "disponible" se calcula solo a partir del stock
alter table repuestos drop column disponible;
alter table repuestos add column disponible boolean generated always as (stock > 0) stored;
