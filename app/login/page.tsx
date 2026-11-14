"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { iniciarSesion } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  function manejarEnvio(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (iniciarSesion(correo, clave)) {
      router.push("/panel");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  }

  return (
    <main className="mx-auto max-w-sm px-6 py-16">
      <h1 className="mb-2 text-2xl font-semibold">Ingresar</h1>
      <p className="mb-6 text-sm text-zinc-500">Acceso para restaurantes.</p>

      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo"
          required
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />
        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          placeholder="Contraseña"
          required
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Entrar
        </button>
      </form>

      <p className="mt-6 text-xs text-zinc-400">
        Demo: demo@reservabaq.com / reservabaq2026
      </p>
    </main>
  );
}