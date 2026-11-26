// Tests unitarios de las funciones de formato del catálogo
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatearPrecio, textoModelos } from "../lib/formato.js";

// Intl separa "L" y el número con un espacio especial (no-break space).
// Lo cambiamos por un espacio normal para poder comparar fácil.
const normalizar = (texto) => texto.replace(/\s/g, " ");

test("formatearPrecio muestra el precio en lempiras", () => {
  assert.equal(normalizar(formatearPrecio(2200)), "L 2,200.00");
});

test("formatearPrecio muestra centavos", () => {
  assert.equal(normalizar(formatearPrecio(375.5)), "L 375.50");
});

test("formatearPrecio muestra 'Consultar precio' cuando no hay precio", () => {
  assert.equal(formatearPrecio(null), "Consultar precio");
  assert.equal(formatearPrecio(undefined), "Consultar precio");
});

test("formatearPrecio acepta precio cero", () => {
  assert.equal(normalizar(formatearPrecio(0)), "L 0.00");
});

test("textoModelos usa singular con 1 modelo", () => {
  assert.equal(textoModelos(1), "1 modelo");
});

test("textoModelos usa plural con varios modelos", () => {
  assert.equal(textoModelos(13), "13 modelos");
});

test("textoModelos usa plural con 0 modelos", () => {
  assert.equal(textoModelos(0), "0 modelos");
});