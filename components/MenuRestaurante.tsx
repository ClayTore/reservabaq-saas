import { tarjeta } from "@/lib/estilos";
import type { PlatoMenu } from "@/lib/types";

export default function MenuRestaurante({ menu }: { menu: PlatoMenu[] }) {
  return (
    <section className={`${tarjeta} p-6`}>
      <h2 className="text-lg font-semibold">Menú</h2>
      <ul className="mt-4 divide-y divide-border">
        {menu.map((plato) => (
          <li key={plato.nombre} className="flex items-start justify-between gap-4 py-3">
            <div>
              <p className="font-medium">{plato.nombre}</p>
              <p className="text-sm text-muted">{plato.descripcion}</p>
            </div>
            <p className="whitespace-nowrap text-sm font-semibold text-accent">
              ${plato.precio.toLocaleString("es-CO")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}