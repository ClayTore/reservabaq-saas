"use client";

import Link from "next/link";
import { botonPrimario, contenedor, tarjeta } from "@/lib/estilos";
import { cancelarReserva, textoPersonas } from "@/lib/reservas";
import { useReservas } from "@/lib/useReservas";

export default function MisReservas() {
  const reservas = useReservas();

  return (
    <main className={`${contenedor} py-12`}>
      <h1 className="text-3xl font-bold tracking-tight">Mis reservas</h1>
      <p className="mt-2 text-muted">Reservas guardadas en este navegador.</p>

      {reservas.length === 0 ? (
        <div className={`${tarjeta} mt-8 flex flex-col items-center gap-4 p-10 text-center`}>
          <p className="text-muted">Aún no tienes reservas.</p>
          <Link href="/restaurantes" className={botonPrimario}>
            Explorar restaurantes
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4">
          {reservas.map((r) => (
            <li
              key={r.id}
              className={`${tarjeta} flex flex-wrap items-start justify-between gap-4 p-5`}
            >
              <div>
                <Link
                  href={`/restaurantes/${r.restauranteId}`}
                  className="font-semibold transition hover:text-primary"
                >
                  {r.restauranteNombre}
                </Link>
                <p className="mt-1 text-sm text-muted">
                  {r.fecha} · {r.hora} · {textoPersonas(r.personas)}
                </p>
                <p className="text-sm text-muted">
                  A nombre de {r.nombre} · {r.telefono}
                </p>
              </div>
              <button
                type="button"
                onClick={() => cancelarReserva(r.id)}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-muted transition hover:border-red-500 hover:text-red-500"
              >
                Cancelar
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}