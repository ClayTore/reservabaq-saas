import Link from "next/link";

const pasos = [
  {
    titulo: "Busca",
    texto: "Filtra por tipo de comida, zona o nombre del restaurante.",
  },
  {
    titulo: "Conoce",
    texto: "Mira el menú, los precios, el horario y el código de vestimenta.",
  },
  {
    titulo: "Reserva",
    texto: "Separa tu mesa en pocos pasos, sin llamadas.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <section className="mb-10 rounded-3xl bg-emerald-700 px-8 py-12 text-white">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Encuentra tu próximo restaurante en Barranquilla
        </h1>
        <p className="mt-3 max-w-md text-emerald-50">
          Busca por tipo de comida, zona o nombre, y reserva tu mesa en minutos.
        </p>
        <Link
          href="/restaurantes"
          className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
        >
          Explorar restaurantes
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {pasos.map((paso) => (
          <div key={paso.titulo} className="rounded-xl border border-zinc-200 p-5">
            <h2 className="mb-1 font-semibold text-emerald-600">{paso.titulo}</h2>
            <p className="text-sm text-zinc-500">{paso.texto}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-xl border border-zinc-200 p-6">
        <h2 className="text-xl font-semibold">¿Tienes un restaurante?</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Publica tu menú, horarios y recibe reservas con una suscripción mensual.
        </p>
      </section>
    </main>
  );
}