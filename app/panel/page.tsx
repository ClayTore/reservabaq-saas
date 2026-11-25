"use client";

import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import CampoFormulario from "@/components/CampoFormulario";
import TarjetaEstadistica from "@/components/TarjetaEstadistica";
import { restaurantes } from "@/data/restaurantes";
import { campo, contenedor, tarjeta } from "@/lib/estilos";
import { fechaISO, textoFecha, textoHora } from "@/lib/horarios";
import { esPasada, ordenarPorFecha, textoPersonas } from "@/lib/reservas";
import { useAhora } from "@/lib/useAhora";
import { useReservas } from "@/lib/useReservas";
import { limpiarNombre } from "@/lib/validaciones";

const periodos = [
  { valor: "proximas", texto: "Próximas" },
  { valor: "hoy", texto: "Solo hoy" },
  { valor: "pasadas", texto: "Pasadas" },
  { valor: "todas", texto: "Todas" },
] as const;

type Periodo = (typeof periodos)[number]["valor"];

export default function Panel() {
  const reservas = useReservas();
  const ahora = useAhora();
  const [restauranteId, setRestauranteId] = useState("todos");
  const [periodo, setPeriodo] = useState<Periodo>("proximas");
  const [cliente, setCliente] = useState("");

  const busqueda = cliente.trim().toLowerCase();
  const filtradas = ahora
    ? ordenarPorFecha(reservas).filter((r) => {
        const coincideRestaurante = restauranteId === "todos" || r.restauranteId === Number(restauranteId);
        const coincideCliente = !busqueda || r.nombre.toLowerCase().includes(busqueda);
        const pasada = esPasada(r, ahora);
        const coincidePeriodo =
          periodo === "todas" ||
          (periodo === "pasadas" && pasada) ||
          (periodo === "proximas" && !pasada) ||
          (periodo === "hoy" && r.fecha === fechaISO(ahora));
        return coincideRestaurante && coincideCliente && coincidePeriodo;
      })
    : [];

  const estadisticas = [
    { titulo: "Reservas", valor: filtradas.length },
    { titulo: "Personas", valor: filtradas.reduce((total, r) => total + r.personas, 0) },
    { titulo: "Restaurantes", valor: new Set(filtradas.map((r) => r.restauranteId)).size },
  ];

  return (
    <AuthGuard>
      <main className={`${contenedor} py-12`}>
        <h1 className="text-3xl font-bold tracking-tight">Panel del restaurante</h1>
        <p className="mt-2 text-muted">
          Resumen de reservas (demo con los datos de este navegador).
        </p>

        <div className={`${tarjeta} mt-8 grid gap-4 p-5 sm:grid-cols-3`}>
          <CampoFormulario id="filtro-restaurante" titulo="Restaurante">
            <select
              id="filtro-restaurante"
              value={restauranteId}
              onChange={(e) => setRestauranteId(e.target.value)}
              className={campo}
            >
              <option value="todos">Todos</option>
              {restaurantes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre}
                </option>
              ))}
            </select>
          </CampoFormulario>

          <CampoFormulario id="filtro-periodo" titulo="Periodo">
            <select
              id="filtro-periodo"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value as Periodo)}
              className={campo}
            >
              {periodos.map((p) => (
                <option key={p.valor} value={p.valor}>
                  {p.texto}
                </option>
              ))}
            </select>
          </CampoFormulario>

          <CampoFormulario id="filtro-cliente" titulo="Cliente" ayuda="Solo letras, máximo 50.">
            <input
              id="filtro-cliente"
              type="search"
              maxLength={50}
              placeholder="Buscar por nombre"
              value={cliente}
              onChange={(e) => setCliente(limpiarNombre(e.target.value))}
              className={campo}
            />
          </CampoFormulario>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {estadisticas.map((e) => (
            <TarjetaEstadistica key={e.titulo} titulo={e.titulo} valor={e.valor} />
          ))}
        </div>

        <h2 className="mt-10 text-xl font-semibold">Reservas</h2>
        {filtradas.length === 0 ? (
          <div className={`${tarjeta} mt-4 p-8 text-center text-muted`}>
            No hay reservas con esos filtros.
          </div>
        ) : (
          <ul className={`${tarjeta} mt-4 divide-y divide-border`}>
            {filtradas.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 p-4">
                <div>
                  <p className="font-medium">{r.restauranteNombre}</p>
                  <p className="text-sm text-muted">
                    {textoPersonas(r.personas)} · {r.nombre} · {r.telefono}
                  </p>
                </div>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-medium capitalize text-primary">
                  {textoFecha(r.fecha)} · {textoHora(r.hora)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </AuthGuard>
  );
}
