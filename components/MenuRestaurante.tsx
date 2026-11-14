import type { PlatoMenu } from "@/lib/types";

export default function MenuRestaurante({ menu }: { menu: PlatoMenu[] }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">Menú</h2>
      <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200">
        {menu.map((plato) => (
          <li
            key={plato.nombre}
            className="flex items-start justify-between gap-4 p-4"
          >
            <div>
              <p className="font-medium">{plato.nombre}</p>
              <p className="text-sm text-zinc-500">{plato.descripcion}</p>
            </div>
            <p className="whitespace-nowrap text-sm font-semibold text-emerald-600">
              ${plato.precio.toLocaleString("es-CO")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}