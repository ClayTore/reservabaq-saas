"use client";

import Link from "next/link";
import { cancelarReserva, textoPersonas } from "@/lib/reservas";
import { useReservas } from "@/lib/useReservas";

export default function MisReservas() {
  const reservas = useReservas();

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-2 text-2xl font-bold">Mis reservas</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Reservas guardadas en este navegador.
      </p>

      {reservas.length === 0 ? (
        <p className="text-zinc-500">
          Aún no tienes reservas.{" "}
          <Link href="/restaurantes" className="text-emerald-600 hover:underline">
            Explorar restaurantes
          </Link>
        </p>
      ) : (
        <ul className="space-y-3">
          {reservas.map((r) => (
            <li
              key={r.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-zinc-200 p-4"
            >
              <div>
                <Link
                  href={`/restaurantes/${r.restauranteId}`}
                  className="font-semibold hover:text-emerald-600"
                >
                  {r.restauranteNombre}
                </Link>
                <p className="text-sm text-zinc-500">
                  {r.fecha} · {r.hora} · {textoPersonas(r.personas)}
                </p>
                <p className="text-sm text-zinc-500">
                  A nombre de {r.nombre} · {r.telefono}
                </p>
              </div>
              <button
                onClick={() => cancelarReserva(r.id)}
                className="text-sm text-red-500 hover:underline"
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