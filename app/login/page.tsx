"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { botonPrimario, campo, tarjeta } from "@/lib/estilos";
import { iniciarSesion } from "@/lib/auth";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (iniciarSesion(correo, clave)) {
      router.push("/panel");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className={`${tarjeta} w-full max-w-sm p-8`}>
        <h1 className="text-2xl font-bold tracking-tight">Ingresar</h1>
        <p className="mt-1 text-sm text-muted">Acceso al panel del restaurante.</p>

        <form onSubmit={manejarEnvio} className="mt-6 grid gap-3">
          <input
            type="email"
            required
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className={campo}
          />
          <input
            type="password"
            required
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className={campo}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className={`${botonPrimario} mt-1 w-full`}>
            Ingresar
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-surface-muted p-3 text-xs text-muted">
          <p className="font-medium">Usuario de prueba</p>
          <p>demo@reservabaq.com · reservabaq2026</p>
        </div>
      </div>
    </main>
  );
}