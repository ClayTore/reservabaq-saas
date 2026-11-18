"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { botonPrimario, campo, tarjeta } from "@/lib/estilos";
import { guardarReserva, textoPersonas } from "@/lib/reservas";

type Props = {
  restauranteId: number;
  restauranteNombre: string;
};

const opcionesPersonas = Array.from({ length: 8 }, (_, i) => i + 1);

export default function FormularioReserva({ restauranteId, restauranteNombre }: Props) {
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
      <div className="rounded-2xl border border-primary bg-primary-soft p-6">
        <p className="text-lg font-semibold text-primary">¡Reserva confirmada!</p>
        <p className="mt-1 text-sm text-muted">
          Mesa para {textoPersonas(personas)} en {restauranteNombre} el {fecha} a las{" "}
          {hora}.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/mis-reservas" className="text-primary hover:underline">
            Ver mis reservas
          </Link>
          <button
            type="button"
            onClick={() => {
              setConfirmada(false);
              setFecha("");
              setHora("");
            }}
            className="text-primary hover:underline"
          >
            Hacer otra reserva
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className={`${tarjeta} p-6`}>
      <h2 className="text-lg font-semibold">Reservar mesa</h2>
      <form onSubmit={manejarEnvio} className="mt-4 grid gap-3">
        <input
          required
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={campo}
        />
        <input
          required
          placeholder="Teléfono (10 dígitos)"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className={campo}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            required
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className={campo}
          />
          <input
            required
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className={campo}
          />
        </div>
        <select
          value={personas}
          onChange={(e) => setPersonas(Number(e.target.value))}
          className={campo}
        >
          {opcionesPersonas.map((n) => (
            <option key={n} value={n}>
              {textoPersonas(n)}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" className={`${botonPrimario} mt-1 w-full`}>
          Confirmar reserva
        </button>
      </form>
    </section>
  );
}