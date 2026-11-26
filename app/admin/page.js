"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  const [sesion, setSesion] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Revisar si ya hay una sesión iniciada y escuchar cambios (login / logout)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSesion(data.session);
      setCargando(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_evento, nuevaSesion) => {
      setSesion(nuevaSesion);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  if (cargando) {
    return <p className="p-6 text-gray-500">Cargando…</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-6 py-6 text-center">
        <h1 className="text-2xl font-bold">Administración</h1>
        <p className="text-gray-300 text-sm mt-1">Repuestos Taller Bonilla</p>
      </header>

      <section className="max-w-md mx-auto px-4 py-8">
        {sesion ? <PanelAdmin correo={sesion.user.email} /> : <FormularioLogin />}
      </section>
    </main>
  );
}

function FormularioLogin() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function iniciarSesion(evento) {
    evento.preventDefault();
    setError("");
    setEnviando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    });

    if (error) {
      setError("Correo o contraseña incorrectos.");
    }
    setEnviando(false);
  }

  return (
    <form
      onSubmit={iniciarSesion}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-4"
    >
      <h2 className="font-semibold text-gray-900">Iniciar sesión</h2>

      <label className="flex flex-col gap-1 text-sm text-gray-700">
        Correo
        <input
          type="email"
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-700">
        Contraseña
        <input
          type="password"
          required
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="bg-gray-900 text-white rounded px-4 py-2 font-medium disabled:opacity-50"
      >
        {enviando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}

function PanelAdmin({ correo }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
      <p className="text-gray-700">
        Sesión iniciada como <strong>{correo}</strong>
      </p>

      <p className="text-sm text-gray-500">
        Aquí irá el formulario para agregar repuestos.
      </p>

      <button
        onClick={() => supabase.auth.signOut()}
        className="self-start border border-gray-300 rounded px-4 py-2 text-sm"
      >
        Cerrar sesión
      </button>
    </div>
  );
}