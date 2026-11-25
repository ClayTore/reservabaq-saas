import { useMemo, useSyncExternalStore } from "react";
import { leerReservasGuardadas, parsearReservas, suscribirReservas } from "@/lib/reservas";
import type { Reserva } from "@/lib/types";

export function useReservas(): Reserva[] {
  const guardadas = useSyncExternalStore(
    suscribirReservas,
    leerReservasGuardadas,
    () => "[]"
  );
  return useMemo(() => parsearReservas(guardadas), [guardadas]);
}