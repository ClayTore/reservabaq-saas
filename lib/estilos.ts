// Clases reutilizables para que todas las páginas se vean iguales (DRY)

export const contenedor = "mx-auto w-full max-w-5xl px-6";

export const tarjeta = "rounded-2xl border border-border bg-surface shadow-sm";

export const botonPrimario =
  "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition hover:bg-primary-hover";

export const botonSecundario =
  "inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary";

export const campo =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export const chip =
  "rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-muted";
export const campoConError =
  "border-red-500 focus:border-red-500 focus:ring-red-500/20";

export const etiqueta = "mb-1.5 block text-sm font-medium";

export const textoError = "mt-1.5 text-xs text-red-500";

export function opcion(activa: boolean, deshabilitada = false) {
  if (deshabilitada) {
    return "cursor-not-allowed rounded-xl border border-dashed border-border px-3 py-2 text-sm text-muted/50";
  }
  return activa
    ? "rounded-xl border border-primary bg-primary text-on-primary px-3 py-2 text-sm font-medium"
    : "rounded-xl border border-border bg-background px-3 py-2 text-sm transition hover:border-primary hover:text-primary";
}
