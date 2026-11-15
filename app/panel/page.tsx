"use client";

import AuthGuard from "@/components/AuthGuard";
import TarjetaEstadistica from "@/components/TarjetaEstadistica";
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
    .sort((a, b) =>
      `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`)
    );

  return (
    <AuthGuard>
      <main className="mx-auto w-full max-w-2xl p-6">
        <h1 className="mb-2 text-2xl font-bold">Panel del restaurante</h1>
        <p className="mb-6 text-sm text-zinc-500">
          Resumen de reservas (demo con los datos de este navegador).
        </p>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {estadisticas.map((e) => (
            <TarjetaEstadistica key={e.titulo} titulo={e.titulo} valor={e.valor} />
          ))}
        </div>

        <h2 className="mb-3 text-lg font-semibold">Próximas reservas</h2>
        {proximas.length === 0 ? (
          <p className="text-sm text-zinc-500">No hay reservas próximas.</p>
        ) : (
          <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200">
            {proximas.map((r) => (
              <li key={r.id} className="p-4">
                <p className="font-medium">
                  {r.fecha} · {r.hora} — {r.restauranteNombre}
                </p>
                <p className="text-sm text-zinc-500">
                  {textoPersonas(r.personas)} · {r.nombre} · {r.telefono}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </AuthGuard>
  );
}