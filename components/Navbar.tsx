"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cerrarSesion } from "@/lib/auth";
import { useSesion } from "@/lib/useSesion";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/restaurantes", texto: "Restaurantes" },
];

export default function Navbar() {
  const sesion = useSesion();
  const router = useRouter();

  function salir() {
    cerrarSesion();
    router.push("/");
  }

  return (
    <header className="border-b border-zinc-200">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="text-lg font-bold text-emerald-600">
          ReservaBaq
        </Link>
        <div className="flex flex-wrap items-center gap-4 text-sm sm:gap-6">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className="hover:text-emerald-600"
            >
              {enlace.texto}
            </Link>
          ))}
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