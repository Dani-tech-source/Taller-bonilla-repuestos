import { supabase } from "../lib/supabase";

// Siempre traer datos frescos de la base de datos
export const dynamic = "force-dynamic";

const lempiras = new Intl.NumberFormat("es-HN", {
  style: "currency",
  currency: "HNL",
});

// "1 modelo" / "3 modelos"
function textoModelos(cantidad) {
  return cantidad === 1 ? "1 modelo" : `${cantidad} modelos`;
}

export default async function Home() {
  const { data: repuestos, error } = await supabase
    .from("repuestos")
    .select("id, codigo, nombre, precio, stock, repuesto_modelos(modelo)")
    .order("nombre");

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <header className="bg-gray-900 text-white px-6 py-8 text-center">
        <h1 className="text-3xl font-bold">Repuestos Taller Bonilla</h1>
        <p className="text-gray-300 mt-1">
          Repuestos para Mercedes-Benz · San Pedro Sula
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <p className="text-red-600">
            No se pudo cargar el catálogo: {error.message}
          </p>
        )}

        {repuestos && (
          <>
            <p className="text-gray-600 mb-6">
              {repuestos.length} repuestos en el catálogo
            </p>

            {/* Tarjetas */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repuestos.map((r) => {
                const agotado = r.stock === 0;
                const modelos = r.repuesto_modelos.map((m) => m.modelo);

                return (
                  <article
                    key={r.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-semibold text-gray-900">
                        {r.nombre}
                      </h2>
                      {agotado ? (
                        <span className="shrink-0 text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded">
                          Agotado
                        </span>
                      ) : (
                        <span className="shrink-0 text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                          {r.stock} en stock
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      Código: {r.codigo}
                    </p>

                    <p className="text-lg font-bold text-gray-900 mt-3">
                      {r.precio === null
                        ? "Consultar precio"
                        : lempiras.format(r.precio)}
                    </p>

                    {/* Al hacer clic se despliega la lista de modelos */}
                    {modelos.length > 0 ? (
                      <details className="mt-3 text-sm">
                        <summary className="cursor-pointer text-blue-700">
                          Compatible con {textoModelos(modelos.length)}
                        </summary>
                        <ul className="mt-2 list-disc list-inside text-gray-700">
                          {modelos.map((modelo) => (
                            <li key={modelo}>{modelo}</li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <p className="mt-3 text-sm text-gray-400">
                        Modelos compatibles: consultar
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}