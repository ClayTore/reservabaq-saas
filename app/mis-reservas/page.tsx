"use client";

import { useState } from "react";
import Link from "next/link";
import { botonPrimario, contenedor, opcion, tarjeta } from "@/lib/estilos";
import { textoFecha, textoHora } from "@/lib/horarios";
import { cancelarReserva, esPasada, ordenarPorFecha, textoPersonas } from "@/lib/reservas";
import { useAhora } from "@/lib/useAhora";
import { useReservas } from "@/lib/useReservas";

const pestanas = [
  { valor: "proximas", texto: "Próximas" },
  { valor: "pasadas", texto: "Pasadas" },
] as const;

type Pestana = (typeof pestanas)[number]["valor"];

export default function MisReservas() {
  const reservas = useReservas();
  const ahora = useAhora();
  const [pestana, setPestana] = useState<Pestana>("proximas");
  const [porCancelar, setPorCancelar] = useState<number | null>(null);

  const ordenadas = ordenarPorFecha(reservas);
  const visibles = ahora
    ? ordenadas.filter((r) => (pestana === "pasadas") === esPasada(r, ahora))
    : [];
  if (pestana === "pasadas") visibles.reverse();

  return (
    <main className={`${contenedor} py-12`}>
      <h1 className="text-3xl font-bold tracking-tight">Mis reservas</h1>
      <p className="mt-2 text-muted">Reservas guardadas en este navegador.</p>

      <div className="mt-6 flex gap-2" role="tablist">
        {pestanas.map((p) => (
          <button
            key={p.valor}
            type="button"
            role="tab"
            aria-selected={pestana === p.valor}
            onClick={() => setPestana(p.valor)}
            className={opcion(pestana === p.valor)}
          >
            {p.texto}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <div className={`${tarjeta} mt-6 flex flex-col items-center gap-4 p-10 text-center`}>
          <p className="text-muted">
            {pestana === "proximas" ? "No tienes reservas próximas." : "No tienes reservas pasadas."}
          </p>
          {pestana === "proximas" && (
            <Link href="/restaurantes" className={botonPrimario}>
              Explorar restaurantes
            </Link>
          )}
        </div>
      ) : (
        <ul className="mt-6 grid gap-4">
          {visibles.map((r) => (
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
                <p className="mt-1 text-sm capitalize text-muted">
                  {textoFecha(r.fecha)} · {textoHora(r.hora)} · {textoPersonas(r.personas)}
                </p>
                <p className="text-sm text-muted">
                  A nombre de {r.nombre} · {r.telefono}
                </p>
              </div>

              {pestana === "proximas" &&
                (porCancelar === r.id ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted">¿Cancelar esta reserva?</span>
                    <button
                      type="button"
                      onClick={() => {
                        cancelarReserva(r.id);
                        setPorCancelar(null);
                      }}
                      className="rounded-full bg-red-500 px-4 py-1.5 font-medium text-white hover:bg-red-600"
                    >
                      Sí, cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => setPorCancelar(null)}
                      className="rounded-full border border-border px-4 py-1.5 text-muted hover:text-foreground"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPorCancelar(r.id)}
                    className="rounded-full border border-border px-4 py-1.5 text-sm text-muted transition hover:border-red-500 hover:text-red-500"
                  >
                    Cancelar
                  </button>
                ))}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
