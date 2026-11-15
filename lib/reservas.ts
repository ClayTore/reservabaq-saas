import type { Reserva } from "@/lib/types";

const CLAVE_RESERVAS = "reservabaq_reservas";
const EVENTO_RESERVAS = "reservabaq-reservas";

export function leerReservasGuardadas(): string {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(CLAVE_RESERVAS) ?? "[]";
}

export function obtenerReservas(): Reserva[] {
  return JSON.parse(leerReservasGuardadas()) as Reserva[];
}

function escribirReservas(reservas: Reserva[]) {
  localStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas));
  window.dispatchEvent(new Event(EVENTO_RESERVAS));
}

export function guardarReserva(
  datos: Omit<Reserva, "id" | "creadaEn">
): Reserva {
  const nueva: Reserva = {
    ...datos,
    id: Date.now(),
    creadaEn: new Date().toISOString(),
  };
  escribirReservas([...obtenerReservas(), nueva]);
  return nueva;
}

export function cancelarReserva(id: number) {
  escribirReservas(obtenerReservas().filter((r) => r.id !== id));
}

export function suscribirReservas(callback: () => void) {
  window.addEventListener(EVENTO_RESERVAS, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENTO_RESERVAS, callback);
    window.removeEventListener("storage", callback);
  };
}

export function textoPersonas(n: number): string {
  return `${n} ${n === 1 ? "persona" : "personas"}`;
}