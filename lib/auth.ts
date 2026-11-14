const CLAVE_SESION = "reservabaq_sesion";
const EVENTO_SESION = "reservabaq-sesion";

// Usuario de demostración: el sitio es estático y no tiene backend.
// No es un login seguro; en producción se usaría un servicio como Amazon Cognito.
const USUARIO_DEMO = { correo: "demo@reservabaq.com", clave: "reservabaq2026" };

export function iniciarSesion(correo: string, clave: string): boolean {
  const correoLimpio = correo.trim().toLowerCase();
  const valido = correoLimpio === USUARIO_DEMO.correo && clave === USUARIO_DEMO.clave;
  if (valido) {
    localStorage.setItem(CLAVE_SESION, correoLimpio);
    window.dispatchEvent(new Event(EVENTO_SESION));
  }
  return valido;
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
  window.dispatchEvent(new Event(EVENTO_SESION));
}

export function obtenerSesion(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CLAVE_SESION);
}

export function suscribirSesion(callback: () => void) {
  window.addEventListener(EVENTO_SESION, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENTO_SESION, callback);
    window.removeEventListener("storage", callback);
  };
}