import type { Reserva } from "@/lib/types";

const CLAVE_RESERVAS = "reservabaq_reservas";

export function obtenerReservas(): Reserva[] {
  if (typeof window === "undefined") return [];
  const guardadas = localStorage.getItem(CLAVE_RESERVAS);
  return guardadas ? (JSON.parse(guardadas) as Reserva[]) : [];
}

export function guardarReserva(
  datos: Omit<Reserva, "id" | "creadaEn">
): Reserva {
  const nueva: Reserva = {
    ...datos,
    id: Date.now(),
    creadaEn: new Date().toISOString(),
  };
  localStorage.setItem(
    CLAVE_RESERVAS,
    JSON.stringify([...obtenerReservas(), nueva])
  );
  return nueva;
}