const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]+$/;
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function limpiarNombre(valor: string): string {
  return valor.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]/g, "").replace(/\s{2,}/g, " ");
}

export function limpiarTelefono(valor: string): string {
  const conMas = valor.trimStart().startsWith("+");
  const resto = valor.replace(/[^\d ]/g, "");
  return (conMas ? "+" : "") + resto;
}

export function validarNombre(nombre: string): string {
  const limpio = nombre.trim();
  if (!limpio) return "Escribe tu nombre.";
  if (!SOLO_LETRAS.test(limpio)) return "El nombre solo puede tener letras y espacios.";
  if (limpio.replace(/[ ']/g, "").length < 3) return "El nombre debe tener al menos 3 letras.";
  if (limpio.length > 50) return "El nombre no puede pasar de 50 caracteres.";
  return "";
}

export function validarTelefono(telefono: string): string {
  const sinEspacios = telefono.replace(/\s/g, "");
  if (!sinEspacios) return "Escribe tu número de teléfono.";
  if (sinEspacios.startsWith("+")) {
    if (!/^\+[1-9]\d{7,14}$/.test(sinEspacios)) {
      return "Número internacional no válido. Ejemplo: +1 305 555 0123.";
    }
    return "";
  }
  if (!/^3\d{9}$/.test(sinEspacios)) {
    return "El celular debe tener 10 dígitos y empezar por 3. Si es de otro país, usa +.";
  }
  return "";
}

export function validarCorreo(correo: string): string {
  const limpio = correo.trim();
  if (!limpio) return "Escribe tu correo.";
  if (!CORREO.test(limpio)) return "El correo no tiene un formato válido.";
  return "";
}

export function validarClave(clave: string): string {
  if (!clave) return "Escribe tu contraseña.";
  if (clave.length < 8) return "La contraseña tiene al menos 8 caracteres.";
  return "";
}

export function validarPersonas(personas: number, maximo: number): string {
  if (!Number.isInteger(personas) || personas < 1) return "Elige cuántas personas van.";
  if (personas > maximo) return `Para más de ${maximo} personas, escribe por WhatsApp.`;
  return "";
}
