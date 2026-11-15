"use client";

import AuthGuard from "@/components/AuthGuard";
import TarjetaEstadistica from "@/components/TarjetaEstadistica";
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
      </main>
    </AuthGuard>
  );
}