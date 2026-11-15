"use client";

import { useState, type FormEvent } from "react";
import { guardarReserva } from "@/lib/reservas";

type Props = {
  restauranteId: number;
  restauranteNombre: string;
};

const claseInput =
  "w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none";

const opcionesPersonas = Array.from({ length: 8 }, (_, i) => i + 1);

export default function FormularioReserva({
  restauranteId,
  restauranteNombre,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [personas, setPersonas] = useState(2);
  const [error, setError] = useState("");
  const [confirmada, setConfirmada] = useState(false);

  function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const hoy = new Date().toLocaleDateString("en-CA");
    if (fecha < hoy) {
      setError("La fecha no puede ser anterior a hoy.");
      return;
    }
    if (!/^\d{10}$/.test(telefono)) {
      setError("El teléfono debe tener 10 dígitos.");
      return;
    }

    guardarReserva({
      restauranteId,
      restauranteNombre,
      nombre: nombre.trim(),
      telefono,
      fecha,
      hora,
      personas,
    });
    setError("");
    setConfirmada(true);
  }

  if (confirmada) {
    return (
      <div className="mb-8 rounded-lg border border-emerald-500 p-4">
        <p className="font-semibold text-emerald-600">¡Reserva confirmada!</p>
        <p className="mt-1 text-sm text-zinc-500">
          Mesa para {personas} en {restauranteNombre} el {fecha} a las {hora}.
        </p>
        <button
          onClick={() => {
            setConfirmada(false);
            setFecha("");
            setHora("");
          }}
          className="mt-3 text-sm text-emerald-600 hover:underline"
        >
          Hacer otra reserva
        </button>
      </div>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">Reservar mesa</h2>
      <form onSubmit={manejarEnvio} className="grid gap-3 sm:grid-cols-2">
        <input
          required
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={claseInput}
        />
        <input
          required
          placeholder="Teléfono (10 dígitos)"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className={claseInput}
        />
        <input
          required
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className={claseInput}
        />
        <input
          required
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className={claseInput}
        />
        <select
          value={personas}
          onChange={(e) => setPersonas(Number(e.target.value))}
          className={claseInput}
        >
          {opcionesPersonas.map((n) => (
            <option key={n} value={n} className="text-black">
              {n} {n === 1 ? "persona" : "personas"}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Confirmar reserva
        </button>
        {error && <p className="text-sm text-red-500 sm:col-span-2">{error}</p>}
      </form>
    </section>
  );
}