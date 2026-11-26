export type Tema = "claro" | "oscuro";

const CLAVE_TEMA = "reservabaq_tema";
const EVENTO_TEMA = "reservabaq-tema";

export function obtenerTema(): Tema {
  if (typeof document === "undefined") return "claro";
  return document.documentElement.classList.contains("dark") ? "oscuro" : "claro";
}

export function cambiarTema(tema: Tema) {
  document.documentElement.classList.toggle("dark", tema === "oscuro");
  localStorage.setItem(CLAVE_TEMA, tema);
  window.dispatchEvent(new Event(EVENTO_TEMA));
}

export function suscribirTema(callback: () => void) {
  window.addEventListener(EVENTO_TEMA, callback);
  return () => window.removeEventListener(EVENTO_TEMA, callback);
}

export const scriptTemaInicial = `(function () {
  try {
    var guardado = localStorage.getItem("${CLAVE_TEMA}");
    var oscuro = guardado
      ? guardado === "oscuro"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (oscuro) document.documentElement.classList.add("dark");
  } catch (e) {}
})();`;