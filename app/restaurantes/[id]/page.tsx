import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerRestaurante, restaurantes } from "@/data/restaurantes";
import MenuRestaurante from "@/components/MenuRestaurante";

export const dynamicParams = false;

export function generateStaticParams() {
  return restaurantes.map((r) => ({ id: String(r.id) }));
}

export default async function DetalleRestaurante({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurante = obtenerRestaurante(Number(id));

  if (!restaurante) {
    notFound();
  }

  const datos = [
    { titulo: "Horario", valor: restaurante.horario },
    { titulo: "Vestimenta", valor: restaurante.vestimenta },
    { titulo: "Dirección", valor: restaurante.direccion },
  ];

  const linkWhatsapp = `https://wa.me/${restaurante.whatsapp}`;

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <Link
        href="/restaurantes"
        className="text-sm text-emerald-600 hover:underline"
      >
        ← Volver a la lista
      </Link>

      <h1 className="mb-2 mt-4 text-2xl font-bold">{restaurante.nombre}</h1>

      <p className="mb-6 text-sm text-zinc-500">
        {restaurante.tipoComida} · {restaurante.zona} · {restaurante.rangoPrecio}
      </p>

      <p className="mb-6 text-zinc-600">{restaurante.descripcion}</p>

      <div className="mb-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
        {datos.map((dato) => (
          <div key={dato.titulo}>
            <p className="font-semibold">{dato.titulo}</p>
            <p className="text-zinc-500">{dato.valor}</p>
          </div>
        ))}
      </div>

      <MenuRestaurante menu={restaurante.menu} />

      <a
        href={linkWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
      >
        Reservar por WhatsApp
      </a>
    </main>
  );
}