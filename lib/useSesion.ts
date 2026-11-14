import { useSyncExternalStore } from "react";
import { obtenerSesion, suscribirSesion } from "./auth";

export function useSesion() {
  return useSyncExternalStore(suscribirSesion, obtenerSesion, () => null);
}