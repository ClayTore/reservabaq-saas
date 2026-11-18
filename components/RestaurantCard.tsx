import Link from "next/link";
import { chip, tarjeta } from "@/lib/estilos";
import type { Restaurante } from "@/lib/types";

export default function RestaurantCard({ restaurante }: { restaurante: Restaurante }) {
  return (
    <Link
      href={`/restaurantes/${restaurante.id}`}
      className={`${tarjeta} group flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-semibold group-hover:text-primary">{restaurante.nombre}</h2>
        <span className="text-sm font-semibold text-accent">{restaurante.rangoPrecio}</span>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <span className={chip}>{restaurante.tipoComida}</span>
        <span className={chip}>{restaurante.zona}</span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted">{restaurante.descripcion}</p>

      <span className="mt-auto pt-4 text-sm font-medium text-primary">
        Ver menú y reservar →
      </span>
    </Link>
  );
}