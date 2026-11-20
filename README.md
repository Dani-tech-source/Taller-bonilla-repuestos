# Taller-bonilla-repuestos
Catálogo web de repuestos Mercedes-Benz del taller de Dani Bonilla (San Pedro Sula).

Código de verificación: LEARN-CAP-33F01A9A
Repuestos Taller Bonilla

El problema

El taller no dispone de un inventario ordenado en Excel, cuando un cliente pregunta si hay una pieza para su carro, todo el proceso tomo al menos un dia para confirmar y no hay forma de que el cliente lo consulte por su cuenta.

La solución

Una página web pública donde cualquiera puede ver los repuestos disponibles con:

Nombre y código del repuesto
Precio en lempiras (o "Consultar precio" si todavía no está definido)
Stock disponible, con la etiqueta Agotado cuando llega a cero
Lista de modelos Mercedes-Benz compatibles (por ejemplo Clase C W203, C230, ML350)

El inventario original del Excel se limpió (mayúsculas inconsistentes, espacios ocultos, nombres de modelos sin estandarizar) y se cargó a la base de datos.

Tecnologías
Parte	                      Herramienta
Frontend	                  Next.js (App Router) + React
Estilos	                      Tailwind CSS
Base de datos	              Supabase (PostgreSQL)
Publicación	                  Vercel
Control de versiones	      Git + GitHub


Modelo de datos
repuestos: id, codigo, nombre, precio (opcional), stock, disponible (calculado a partir del stock), created_at.
repuesto_modelos: relación uno a muchos. Cada fila dice que un repuesto encaja en un modelo. Así un mismo repuesto puede ser compatible con varios modelos sin repetir sus datos.

Los scripts SQL están en la carpeta supabase/, numerados en el orden en que se corrieron.

Cómo correrlo en tu computadora
1. Clonar el repositorio y entrar a la carpeta taller-bonilla-repuestos.
2. Instalar dependencias: npm install
3. Crear un archivo .env.local en la raíz con las llaves de Supabase:
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...

Este archivo no se sube al repositorio (está en .gitignore). 
4. Levantar el servidor: npm run dev 
5. Abrir http://localhost:3000

Estructura del proyecto
app/          Páginas del sitio (page.js es el catálogo)
lib/          Conexión a Supabase y funciones reutilizables
supabase/     Scripts SQL de la base de datos
public/       Archivos estáticos
Próximos pasos

Agregar el tipo o categoría de cada repuesto (frenos, motor, suspensión, etc.)
Subir fotos de los repuestos con Supabase Storage
Búsqueda y filtros por modelo
Pruebas automáticas y CI con GitHub Actions
Autor

Dani Bonilla — Ingeniería en Informática, CEUTEC.