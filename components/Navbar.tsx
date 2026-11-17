"use client";

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

export default function Navbar() {
  const sesion = useSesion();
  const router = useRouter();
  const pathname = usePathname();

  function estaActivo(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function salir() {
    cerrarSesion();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-primary">
          ReservaBaq
        </Link>
        <div className="flex flex-wrap items-center gap-4 text-sm sm:gap-6">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className={claseEnlace(estaActivo(enlace.href))}
            >
              {enlace.texto}
            </Link>
          ))}
          {sesion ? (
            <>
              <Link href="/panel" className={claseEnlace(estaActivo("/panel"))}>
                Panel
              </Link>
              <button
                onClick={salir}
                className="text-muted transition hover:text-red-500"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-primary px-4 py-1.5 font-medium text-on-primary transition hover:bg-primary-hover"
            >
              Ingresar
            </Link>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}