import Link from "next/link";
import { botonPrimario, botonSecundario } from "@/lib/estilos";

export default function NoEncontrado() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-sm font-semibold text-accent">Error 404</p>
      <h1 className="text-3xl font-bold tracking-tight">Esta mesa no existe</h1>
      <p className="max-w-md text-muted">
        La página que buscas no está disponible o el enlace está mal escrito.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link href="/" className={botonPrimario}>
          Ir al inicio
        </Link>
        <Link href="/restaurantes" className={botonSecundario}>
          Ver restaurantes
        </Link>
      </div>
    </main>
  );
}
