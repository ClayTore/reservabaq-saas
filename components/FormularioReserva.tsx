"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import CampoFormulario from "@/components/CampoFormulario";
import { botonPrimario, campo, campoConError, opcion, tarjeta } from "@/lib/estilos";
import {
  proximosDias,
  textoFecha,
  textoHora,
  turnosDisponibles,
  validarFecha,
  validarHora,
} from "@/lib/horarios";
import { guardarReserva, textoPersonas } from "@/lib/reservas";
import type { Restaurante } from "@/lib/types";
import { useAhora } from "@/lib/useAhora";
import {
  limpiarNombre,
  limpiarTelefono,
  validarNombre,
  validarPersonas,
  validarTelefono,
} from "@/lib/validaciones";

type Errores = Partial<Record<"nombre" | "telefono" | "fecha" | "hora" | "personas", string>>;

export default function FormularioReserva({ restaurante }: { restaurante: Restaurante }) {
  const ahora = useAhora();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [personas, setPersonas] = useState(2);
  const [errores, setErrores] = useState<Errores>({});
  const [confirmada, setConfirmada] = useState(false);

  const opcionesPersonas = Array.from({ length: restaurante.capacidadMaxima }, (_, i) => i + 1);

  function validarTodo(fechaActual: Date): Errores {
    const nuevos: Errores = {
      nombre: validarNombre(nombre),
      telefono: validarTelefono(telefono),
      fecha: validarFecha(restaurante, fecha, fechaActual),
      hora: fecha ? validarHora(restaurante, fecha, hora, fechaActual) : "",
      personas: validarPersonas(personas, restaurante.capacidadMaxima),
    };
    return Object.fromEntries(Object.entries(nuevos).filter(([, v]) => v)) as Errores;
  }

  function validarCampo(nombreCampo: keyof Errores, mensaje: string) {
    setErrores((previos) => ({ ...previos, [nombreCampo]: mensaje || undefined }));
  }

  function elegirFecha(valor: string) {
    setFecha(valor);
    if (ahora && !turnosDisponibles(restaurante, valor, ahora).includes(hora)) setHora("");
    validarCampo("fecha", "");
  }

  function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fechaActual = new Date();
    const encontrados = validarTodo(fechaActual);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    guardarReserva({
      restauranteId: restaurante.id,
      restauranteNombre: restaurante.nombre,
      nombre: nombre.trim().replace(/\s+/g, " "),
      telefono: telefono.replace(/\s/g, ""),
      fecha,
      hora,
      personas,
    });
    setConfirmada(true);
  }

  if (confirmada) {
    return (
      <div className="rounded-2xl border border-primary bg-primary-soft p-6">
        <p className="text-lg font-semibold text-primary">¡Reserva confirmada!</p>
        <p className="mt-1 text-sm text-muted">
          Mesa para {textoPersonas(personas)} en {restaurante.nombre}, el {textoFecha(fecha)} a
          las {textoHora(hora)}.
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

  const dias = ahora ? proximosDias(restaurante, ahora) : [];
  const turnos = ahora && fecha ? turnosDisponibles(restaurante, fecha, ahora) : [];

  return (
    <section className={`${tarjeta} p-6`}>
      <h2 className="text-lg font-semibold">Reservar mesa</h2>
      <p className="mt-1 text-xs text-muted">Abre: {restaurante.horario}</p>

      <form onSubmit={manejarEnvio} noValidate className="mt-5 grid gap-4">
        <CampoFormulario id="nombre" titulo="Nombre" error={errores.nombre}>
          <input
            id="nombre"
            autoComplete="name"
            maxLength={50}
            placeholder="Ej: María Pérez"
            value={nombre}
            onChange={(e) => setNombre(limpiarNombre(e.target.value))}
            onBlur={() => validarCampo("nombre", validarNombre(nombre))}
            aria-invalid={!!errores.nombre}
            aria-describedby={errores.nombre ? "nombre-error" : undefined}
            className={`${campo} ${errores.nombre ? campoConError : ""}`}
          />
        </CampoFormulario>

        <CampoFormulario
          id="telefono"
          titulo="Teléfono"
          error={errores.telefono}
          ayuda="Celular colombiano (10 dígitos) o con + si es de otro país."
        >
          <input
            id="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            placeholder="Ej: 300 123 4567"
            value={telefono}
            onChange={(e) => setTelefono(limpiarTelefono(e.target.value))}
            onBlur={() => validarCampo("telefono", validarTelefono(telefono))}
            aria-invalid={!!errores.telefono}
            aria-describedby={errores.telefono ? "telefono-error" : undefined}
            className={`${campo} ${errores.telefono ? campoConError : ""}`}
          />
        </CampoFormulario>

        <fieldset className="min-w-0">
          <legend className="mb-1.5 text-sm font-medium">Día</legend>
          {!ahora ? (
            <p className="text-sm text-muted">Cargando fechas...</p>
          ) : (
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
              {dias.map((dia) => (
                <button
                  key={dia.valor}
                  type="button"
                  disabled={!dia.abierto}
                  onClick={() => elegirFecha(dia.valor)}
                  aria-pressed={fecha === dia.valor}
                  title={dia.abierto ? textoFecha(dia.valor) : "Cerrado o sin horas disponibles"}
                  className={`${opcion(fecha === dia.valor, !dia.abierto)} flex min-w-14 shrink-0 flex-col items-center px-2!`}
                >
                  <span className="text-[11px] capitalize opacity-80">{dia.diaSemana}</span>
                  <span className="text-base font-semibold leading-tight">{dia.diaMes}</span>
                  <span className="text-[11px] capitalize opacity-80">{dia.mes}</span>
                </button>
              ))}
            </div>
          )}
          {errores.fecha && <p role="alert" className="mt-1 text-xs text-red-500">{errores.fecha}</p>}
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="mb-1.5 text-sm font-medium">Hora</legend>
          {!fecha ? (
            <p className="text-sm text-muted">Primero elige un día.</p>
          ) : turnos.length === 0 ? (
            <p className="text-sm text-muted">No hay horas disponibles ese día.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {turnos.map((turno) => (
                <button
                  key={turno}
                  type="button"
                  onClick={() => {
                    setHora(turno);
                    validarCampo("hora", "");
                  }}
                  aria-pressed={hora === turno}
                  className={`${opcion(hora === turno)} whitespace-nowrap`}
                >
                  {textoHora(turno)}
                </button>
              ))}
            </div>
          )}
          {errores.hora && <p role="alert" className="mt-1 text-xs text-red-500">{errores.hora}</p>}
        </fieldset>

        <CampoFormulario id="personas" titulo="Personas" error={errores.personas}>
          <select
            id="personas"
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
        </CampoFormulario>

        <button type="submit" className={`${botonPrimario} mt-1 w-full`}>
          Confirmar reserva
        </button>
      </form>
    </section>
  );
}
