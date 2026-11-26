import type { Restaurante } from "@/lib/types";


export const DIAS_RESERVA = 14;
const MINUTOS_ENTRE_TURNOS = 30;
const MINUTOS_ANTES_DE_CERRAR = 60;
const MINUTOS_DE_ANTICIPACION = 60;

function aMinutos(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function aHora(minutos: number): string {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function fechaISO(fecha: Date): string {
  return fecha.toLocaleDateString("en-CA");
}

export function textoHora(hora: string): string {
  const [h, m] = hora.split(":").map(Number);
  const sufijo = h < 12 ? "a.m." : "p.m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${sufijo}`;
}

export function textoFecha(fecha: string): string {
  const [a, m, d] = fecha.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function abreEseDia(restaurante: Restaurante, fecha: Date): boolean {
  return restaurante.diasAbierto.includes(fecha.getDay());
}

export function proximosDias(restaurante: Restaurante, ahora = new Date()) {
  return Array.from({ length: DIAS_RESERVA }, (_, i) => {
    const fecha = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + i);
    return {
      valor: fechaISO(fecha),
      diaSemana: fecha.toLocaleDateString("es-CO", { weekday: "short" }).replace(".", ""),
      diaMes: fecha.getDate(),
      mes: fecha.toLocaleDateString("es-CO", { month: "short" }).replace(".", ""),
      abierto: abreEseDia(restaurante, fecha) && turnosDisponibles(restaurante, fechaISO(fecha), ahora).length > 0,
    };
  });
}

export function turnosDisponibles(restaurante: Restaurante, fecha: string, ahora = new Date()): string[] {
  const inicio = aMinutos(restaurante.apertura);
  const fin = aMinutos(restaurante.cierre) - MINUTOS_ANTES_DE_CERRAR;
  const esHoy = fecha === fechaISO(ahora);
  const minimoHoy = ahora.getHours() * 60 + ahora.getMinutes() + MINUTOS_DE_ANTICIPACION;

  const turnos: string[] = [];
  for (let t = inicio; t <= fin; t += MINUTOS_ENTRE_TURNOS) {
    if (!esHoy || t >= minimoHoy) turnos.push(aHora(t));
  }
  return turnos;
}

export function validarFecha(restaurante: Restaurante, fecha: string, ahora = new Date()): string {
  if (!fecha) return "Elige el día de la reserva.";
  const dia = proximosDias(restaurante, ahora).find((d) => d.valor === fecha);
  if (!dia) return `Solo se puede reservar desde hoy hasta dentro de ${DIAS_RESERVA} días.`;
  if (!dia.abierto) return "El restaurante no tiene horas disponibles ese día.";
  return "";
}

export function validarHora(restaurante: Restaurante, fecha: string, hora: string, ahora = new Date()): string {
  if (!hora) return "Elige la hora de la reserva.";
  if (!turnosDisponibles(restaurante, fecha, ahora).includes(hora)) {
    return "Esa hora ya no está disponible. Elige otra.";
  }
  return "";
}
