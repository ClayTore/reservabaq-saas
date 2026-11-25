"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import CampoFormulario from "@/components/CampoFormulario";
import { iniciarSesion } from "@/lib/auth";
import { botonPrimario, campo, campoConError, tarjeta } from "@/lib/estilos";
import { validarClave, validarCorreo } from "@/lib/validaciones";

const MAX_INTENTOS = 5;

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [errores, setErrores] = useState<{ correo?: string; clave?: string }>({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [intentos, setIntentos] = useState(0);

  const bloqueado = intentos >= MAX_INTENTOS;

  function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (bloqueado) return;

    const nuevos = { correo: validarCorreo(correo), clave: validarClave(clave) };
    setErrores({ correo: nuevos.correo || undefined, clave: nuevos.clave || undefined });
    if (nuevos.correo || nuevos.clave) return;

    if (iniciarSesion(correo, clave)) {
      router.push("/panel");
      return;
    }
    const usados = intentos + 1;
    setIntentos(usados);
    setErrorGeneral(
      usados >= MAX_INTENTOS
        ? "Demasiados intentos. Recarga la página para intentar de nuevo."
        : `Correo o contraseña incorrectos. Te quedan ${MAX_INTENTOS - usados} intentos.`
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className={`${tarjeta} w-full max-w-sm p-8`}>
        <h1 className="text-2xl font-bold tracking-tight">Ingresar</h1>
        <p className="mt-1 text-sm text-muted">Acceso al panel del restaurante.</p>

        <form onSubmit={manejarEnvio} noValidate className="mt-6 grid gap-4">
          <CampoFormulario id="correo" titulo="Correo" error={errores.correo}>
            <input
              id="correo"
              type="email"
              autoComplete="email"
              maxLength={100}
              placeholder="tu@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value.replace(/\s/g, ""))}
              onBlur={() => setErrores((p) => ({ ...p, correo: validarCorreo(correo) || undefined }))}
              aria-invalid={!!errores.correo}
              className={`${campo} ${errores.correo ? campoConError : ""}`}
            />
          </CampoFormulario>

          <CampoFormulario id="clave" titulo="Contraseña" error={errores.clave}>
            <div className="relative">
              <input
                id="clave"
                type={verClave ? "text" : "password"}
                autoComplete="current-password"
                maxLength={64}
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                aria-invalid={!!errores.clave}
                className={`${campo} pr-16 ${errores.clave ? campoConError : ""}`}
              />
              <button
                type="button"
                onClick={() => setVerClave((v) => !v)}
                className="absolute inset-y-0 right-3 text-xs font-medium text-muted hover:text-primary"
              >
                {verClave ? "Ocultar" : "Ver"}
              </button>
            </div>
          </CampoFormulario>

          {errorGeneral && (
            <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-500">
              {errorGeneral}
            </p>
          )}

          <button
            type="submit"
            disabled={bloqueado}
            className={`${botonPrimario} mt-1 w-full disabled:cursor-not-allowed disabled:opacity-50`}
          >
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
