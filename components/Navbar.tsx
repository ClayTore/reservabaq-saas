import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-emerald-600">
          ReservaBaq
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-emerald-600">Inicio</Link>
          <Link href="/restaurantes" className="hover:text-emerald-600">Restaurantes</Link>
        </div>
      </nav>
    </header>
  );
}