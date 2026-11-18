"use client";

import { useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import { campo, tarjeta } from "@/lib/estilos";
import type { Restaurante } from "@/lib/types";

function clasePildora(activa: boolean) {
  return activa
    ? "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-on-primary"
    : "rounded-full border border-border px-4 py-1.5 text-sm text-muted transition hover:border-primary hover:text-primary";
}

export default function ListaRestaurantes({
  restaurantes,
}: {
  restaurantes: Restaurante[];
}) {
  const [busqueda, setBusqueda] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");

  const tiposDeComida = ["Todos", ...new Set(restaurantes.map((r) => r.tipoComida))];
  const texto = busqueda.trim().toLowerCase();

  const filtrados = restaurantes.filter((r) => {
    const coincideTexto =
      r.nombre.toLowerCase().includes(texto) || r.zona.toLowerCase().includes(texto);
    const coincideTipo = tipoSeleccionado === "Todos" || r.tipoComida === tipoSeleccionado;
    return coincideTexto && coincideTipo;
  });

  return (
    <div>
      <input
        type="search"
        placeholder="Busca por nombre o zona..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className={campo}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {tiposDeComida.map((tipo) => (
          <button
            key={tipo}
            type="button"
            onClick={() => setTipoSeleccionado(tipo)}
            className={clasePildora(tipo === tipoSeleccionado)}
          >
            {tipo}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        {filtrados.length} {filtrados.length === 1 ? "resultado" : "resultados"}
      </p>

      {filtrados.length === 0 ? (
        <div className={`${tarjeta} mt-3 p-8 text-center text-muted`}>
          No hay restaurantes que coincidan.
        </div>
      ) : (
        <ul className="mt-3 grid gap-4 sm:grid-cols-2">
          {filtrados.map((restaurante) => (
            <li key={restaurante.id}>
              <RestaurantCard restaurante={restaurante} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}