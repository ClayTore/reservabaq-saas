"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { cerrarSesion } from "@/lib/auth";
import { useSesion } from "@/lib/useSesion";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/restaurantes", texto: "Restaurantes" },
  { href: "/mis-reservas", texto: "Mis reservas" },
];

function claseEnlace(activo: boolean) {
  return activo
    ? "font-medium text-primary"
    : "text-muted transition hover:text-foreground";
}

const botonIngresar =
  "rounded-full bg-primary px-4 py-1.5 text-center font-medium text-on-primary transition hover:bg-primary-hover";

export default function Navbar() {
  const sesion = useSesion();
  const router = useRouter();
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  function estaActivo(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function salir() {
    setMenuAbierto(false);
    cerrarSesion();
    router.push("/");
  }

  const todosLosEnlaces = sesion ? [...enlaces, { href: "/panel", texto: "Panel" }] : enlaces;

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-primary">
          ReservaBaq
        </Link>

        <div className="hidden items-center gap-6 text-sm md:flex">
          {todosLosEnlaces.map((enlace) => (
            <Link key={enlace.href} href={enlace.href} className={claseEnlace(estaActivo(enlace.href))}>
              {enlace.texto}
            </Link>
          ))}
          {sesion ? (
            <button onClick={salir} className="text-muted transition hover:text-red-500">
              Salir
            </button>
          ) : (
            <Link href="/login" className={botonIngresar}>
              Ingresar
            </Link>
          )}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            aria-expanded={menuAbierto}
            aria-controls="menu-celular"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            className="rounded-full border border-border p-2 text-muted transition hover:border-primary hover:text-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {menuAbierto ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuAbierto && (
        <div id="menu-celular" className="border-t border-border px-6 pb-5 pt-2 md:hidden">
          <ul className="flex flex-col">
            {todosLosEnlaces.map((enlace) => (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  onClick={() => setMenuAbierto(false)}
                  className={`block py-3 ${claseEnlace(estaActivo(enlace.href))}`}
                >
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
          {sesion ? (
            <button
              onClick={salir}
              className="mt-2 w-full rounded-full border border-border py-2 text-sm text-muted transition hover:border-red-500 hover:text-red-500"
            >
              Salir
            </button>
          ) : (
            <Link href="/login" onClick={() => setMenuAbierto(false)} className={`${botonIngresar} mt-2 block`}>
              Ingresar
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
