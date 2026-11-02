import { supabase } from "../../lib/supabase";

// Siempre traer datos frescos de la base de datos
export const dynamic = "force-dynamic";

const lempiras = new Intl.NumberFormat("es-HN", {
  style: "currency",
  currency: "HNL",
});

export default async function Prueba() {
  const { data: repuestos, error } = await supabase
    .from("repuestos")
    .select("id, codigo, nombre, precio, stock, repuesto_modelos(modelo)")
    .order("nombre");

  if (error) {
    return <p style={{ padding: 24 }}>Error: {error.message}</p>;
  }

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Prueba de conexión: {repuestos.length} repuestos</h1>
      <ul>
        {repuestos.map((r) => (
          <li key={r.id} style={{ marginBottom: 8 }}>
            <strong>{r.nombre}</strong> ({r.codigo}) —{" "}
            {r.precio === null ? "Consultar precio" : lempiras.format(r.precio)}{" "}
            — Stock: {r.stock} — Compatible con{" "}
            {r.repuesto_modelos.length} modelos
          </li>
        ))}
      </ul>
    </main>
  );
}