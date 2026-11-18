import { useSyncExternalStore } from "react";
import { obtenerTema, suscribirTema, type Tema } from "@/lib/tema";

export function useTema(): Tema {
  return useSyncExternalStore(suscribirTema, obtenerTema, () => "claro");
}