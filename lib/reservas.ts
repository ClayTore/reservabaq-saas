import type { Reserva } from "@/lib/types";

const CLAVE_RESERVAS = "reservabaq_reservas";
const EVENTO_RESERVAS = "reservabaq-reservas";

export function leerReservasGuardadas(): string {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(CLAVE_RESERVAS) ?? "[]";
}

export function parsearReservas(texto: string): Reserva[] {
  try {
    const datos: unknown = JSON.parse(texto);
    if (!Array.isArray(datos)) return [];
    return datos.filter(
      (r): r is Reserva =>
        typeof r === "object" &&
        r !== null &&
        typeof r.id === "number" &&
        typeof r.restauranteNombre === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(r.fecha) &&
        /^\d{2}:\d{2}$/.test(r.hora)
    );
  } catch {
    return [];
  }
}

export function obtenerReservas(): Reserva[] {
  return parsearReservas(leerReservasGuardadas());
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

export function fechaHoy(): string {
  return new Date().toLocaleDateString("en-CA");
}
export function esPasada(reserva: Reserva, ahora = new Date()): boolean {
  const [a, m, d] = reserva.fecha.split("-").map(Number);
  const [h, min] = reserva.hora.split(":").map(Number);
  return new Date(a, m - 1, d, h, min) < ahora;
}

export function ordenarPorFecha(reservas: Reserva[]): Reserva[] {
  return [...reservas].sort((a, b) =>
    `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`)
  );
}
