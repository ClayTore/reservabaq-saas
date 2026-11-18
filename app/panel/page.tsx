"use client";

import AuthGuard from "@/components/AuthGuard";
import TarjetaEstadistica from "@/components/TarjetaEstadistica";
import { contenedor, tarjeta } from "@/lib/estilos";
import { fechaHoy, textoPersonas } from "@/lib/reservas";
import { useReservas } from "@/lib/useReservas";

export default function Panel() {
  const reservas = useReservas();

  const personas = reservas.reduce((total, r) => total + r.personas, 0);
  const restaurantes = new Set(reservas.map((r) => r.restauranteId)).size;

  const estadisticas = [
    { titulo: "Reservas", valor: reservas.length },
    { titulo: "Personas", valor: personas },
    { titulo: "Restaurantes", valor: restaurantes },
  ];

  const hoy = fechaHoy();
  const proximas = reservas
    .filter((r) => r.fecha >= hoy)
    .sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`));

  return (
    <AuthGuard>
      <main className={`${contenedor} py-12`}>
        <h1 className="text-3xl font-bold tracking-tight">Panel del restaurante</h1>
        <p className="mt-2 text-muted">
          Resumen de reservas (demo con los datos de este navegador).
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {estadisticas.map((e) => (
            <TarjetaEstadistica key={e.titulo} titulo={e.titulo} valor={e.valor} />
          ))}
        </div>

        <h2 className="mt-10 text-xl font-semibold">Próximas reservas</h2>
        {proximas.length === 0 ? (
          <div className={`${tarjeta} mt-4 p-8 text-center text-muted`}>
            No hay reservas próximas.
          </div>
        ) : (
          <ul className={`${tarjeta} mt-4 divide-y divide-border`}>
            {proximas.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-2 p-4"
              >
                <div>
                  <p className="font-medium">{r.restauranteNombre}</p>
                  <p className="text-sm text-muted">
                    {textoPersonas(r.personas)} · {r.nombre} · {r.telefono}
                  </p>
                </div>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-primary">
                  {r.fecha} · {r.hora}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </AuthGuard>
  );
}