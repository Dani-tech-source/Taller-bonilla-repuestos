-- Agrega el tipo de repuesto (categoría) para poder agruparlos y filtrarlos
alter table repuestos add column categoria text
  check (categoria in (
    'Frenos', 'Motor', 'Enfriamiento', 'Eléctrico', 'Suspensión',
    'Filtros', 'Transmisión', 'Carrocería', 'Climatización'
  ));

-- Asigna la categoría a cada repuesto del inventario inicial (por código)
update repuestos set categoria = c.categoria
from (values
  ('003 420 51 20', 'Frenos'),
  ('007 420 58 20', 'Frenos'),
  ('609029',        'Frenos'),
  ('125060',        'Frenos'),
  ('LR061375',      'Frenos'),
  ('PWS176',        'Frenos'),
  ('124 240 19 17', 'Motor'),
  ('19467',         'Motor'),
  ('5330069 20',    'Motor'),
  ('36913',         'Motor'),
  ('P155/30',       'Enfriamiento'),
  ('P1511',         'Enfriamiento'),
  ('TM7003',        'Enfriamiento'),
  ('3457.90D',      'Enfriamiento'),
  ('098622A201',    'Eléctrico'),
  ('281002728',     'Eléctrico'),
  ('261210170',     'Eléctrico'),
  ('593793',        'Eléctrico'),
  ('260124',        'Suspensión'),
  ('H829/1X',       'Filtros'),
  ('82029717',      'Transmisión'),
  ('9XW358164041',  'Carrocería'),
  ('604036',        'Climatización')
) as c(codigo, categoria)
where repuestos.codigo = c.codigo;

-- Comprobación: debe devolver 0 filas (ningún repuesto sin categoría)
select codigo, nombre from repuestos where categoria is null;