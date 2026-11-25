import Link from "next/link";
import CarruselHero from "@/components/CarruselHero";
import { restaurantes } from "@/data/restaurantes";
import { botonPrimario, botonSecundario, contenedor, tarjeta } from "@/lib/estilos";

const pasos = [
  {
    numero: "01",
    titulo: "Busca",
    texto: "Filtra por tipo de comida, zona o nombre del restaurante.",
  },
  {
    numero: "02",
    titulo: "Conoce",
    texto: "Mira el menú, los precios, el horario y el código de vestimenta.",
  },
  {
    numero: "03",
    titulo: "Reserva",
    texto: "Separa tu mesa en pocos pasos, sin llamadas.",
  },
];

export default function Home() {
  const zonas = new Set(restaurantes.map((r) => r.zona)).size;

  const datos = [
    { valor: restaurantes.length, texto: "restaurantes" },
    { valor: zonas, texto: "zonas de la ciudad" },
    { valor: "24/7", texto: "reservas en línea" },
  ];

  return (
    <main className={`${contenedor} flex flex-col gap-16 py-12 sm:py-16`}>
      <section className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            Barranquilla · Restaurantes
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Encuentra tu próximo <span className="text-primary">restaurante</span>{" "}
            en Barranquilla
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted">
            Busca por tipo de comida, zona o nombre, y reserva tu mesa en minutos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/restaurantes" className={botonPrimario}>
              Explorar restaurantes
            </Link>
            <Link href="/mis-reservas" className={botonSecundario}>
              Ver mis reservas
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {datos.map((dato) => (
              <div key={dato.texto}>
                <dt className="text-sm text-muted">{dato.texto}</dt>
                <dd className="text-2xl font-bold text-primary">{dato.valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        <CarruselHero />
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">¿Cómo funciona?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {pasos.map((paso) => (
            <div key={paso.numero} className={`${tarjeta} p-6`}>
              <span className="text-sm font-semibold text-accent">{paso.numero}</span>
              <h3 className="mt-2 text-lg font-semibold">{paso.titulo}</h3>
              <p className="mt-1 text-sm text-muted">{paso.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-primary-soft p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">¿Tienes un restaurante?</h2>
          <p className="mt-1 text-sm text-muted">
            Publica tu menú y horarios, y recibe reservas con una suscripción mensual.
          </p>
        </div>
        <Link href="/login" className={botonPrimario}>
          Ir al panel
        </Link>
      </section>
    </main>
  );
}