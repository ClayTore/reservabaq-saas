import Link from "next/link";
import { notFound } from "next/navigation";
import FormularioReserva from "@/components/FormularioReserva";
import MenuRestaurante from "@/components/MenuRestaurante";
import { obtenerRestaurante, restaurantes } from "@/data/restaurantes";
import { chip, contenedor, tarjeta } from "@/lib/estilos";

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
    <main className={`${contenedor} py-10`}>
      <Link href="/restaurantes" className="text-sm text-muted transition hover:text-primary">
        ← Volver a restaurantes
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{restaurante.nombre}</h1>
        <span className="text-lg font-semibold text-accent">{restaurante.rangoPrecio}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className={chip}>{restaurante.tipoComida}</span>
        <span className={chip}>{restaurante.zona}</span>
      </div>

      <p className="mt-4 max-w-2xl text-muted">{restaurante.descripcion}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {datos.map((dato) => (
          <div key={dato.titulo} className={`${tarjeta} p-4`}>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {dato.titulo}
            </p>
            <p className="mt-1 text-sm font-medium">{dato.valor}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid items-start gap-6 md:grid-cols-[1.4fr_1fr]">
        <MenuRestaurante menu={restaurante.menu} />

      <div className="flex min-w-0 flex-col gap-3 md:sticky md:top-24">
          <FormularioReserva restaurante={restaurante} />
          <p className="text-center text-sm text-muted">
            ¿Prefieres escribir?{" "}
            <a
              href={linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Reservar por WhatsApp
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}