"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cerrarSesion } from "@/lib/auth";
import { useSesion } from "@/lib/useSesion";

export default function Navbar() {
  const sesion = useSesion();
  const router = useRouter();

  function salir() {
    cerrarSesion();
    router.push("/");
  }

  return (
    <header className="border-b border-zinc-200">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-emerald-600">
          ReservaBaq
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-emerald-600">Inicio</Link>
          <Link href="/restaurantes" className="hover:text-emerald-600">Restaurantes</Link>
          {sesion ? (
            <>
              <Link href="/panel" className="hover:text-emerald-600">Panel</Link>
              <button onClick={salir} className="text-zinc-500 hover:text-red-500">Salir</button>
            </>
          ) : (
            <Link href="/login" className="rounded-full bg-emerald-600 px-4 py-1.5 text-white hover:bg-emerald-700">
              Ingresar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}