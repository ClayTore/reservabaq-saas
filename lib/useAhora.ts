import { useSyncExternalStore } from "react";

function suscribir(callback: () => void) {
  const intervalo = window.setInterval(callback, 30_000);
  return () => window.clearInterval(intervalo);
}

function minutoActual(): string {
  const ahora = new Date();
  ahora.setSeconds(0, 0);
  return ahora.toISOString();
}

export function useAhora(): Date | null {
  const valor = useSyncExternalStore(suscribir, minutoActual, () => "");
  return valor ? new Date(valor) : null;
}
