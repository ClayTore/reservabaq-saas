import type { ReactNode } from "react";
import { etiqueta, textoError } from "@/lib/estilos";

type Props = {
  id: string;
  titulo: string;
  error?: string;
  ayuda?: string;
  children: ReactNode;
};

// Etiqueta + campo + mensaje de error, igual en todos los formularios
export default function CampoFormulario({ id, titulo, error, ayuda, children }: Props) {
  return (
    <div>
      <label htmlFor={id} className={etiqueta}>
        {titulo}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className={textoError}>
          {error}
        </p>
      ) : (
        ayuda && <p className="mt-1.5 text-xs text-muted">{ayuda}</p>
      )}
    </div>
  );
}
