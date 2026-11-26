// Funciones de formato que se usan en varias páginas del sitio

const lempiras = new Intl.NumberFormat("es-HN", {
  style: "currency",
  currency: "HNL",
});

// Precio en lempiras, o "Consultar precio" si todavía no tiene
export function formatearPrecio(precio) {
  if (precio === null || precio === undefined) {
    return "Consultar precio";
  }
  return lempiras.format(precio);
}

// "1 modelo" / "3 modelos"
export function textoModelos(cantidad) {
  return cantidad === 1 ? "1 modelo" : `${cantidad} modelos`;
}