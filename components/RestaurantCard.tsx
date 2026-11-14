import Link from "next/link";
import type { Restaurante } from "@/lib/types";

export default function RestaurantCard({ restaurante }: { restaurante: Restaurante }) {
  return (
    <Link
      href={`/restaurantes/${restaurante.id}`}
      className="block rounded-lg border border-zinc-200 p-4 transition hover:border-emerald-500"
    >
      <h2 className="font-semibold">{restaurante.nombre}</h2>
      <p className="text-sm text-zinc-500">
        {restaurante.tipoComida} · {restaurante.zona} · {restaurante.rangoPrecio}
      </p>
      <p className="mt-2 text-sm text-zinc-600">{restaurante.descripcion}</p>
    </Link>
  );
}