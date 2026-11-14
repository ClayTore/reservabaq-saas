import ListaRestaurantes from "@/components/ListaRestaurantes";
import { restaurantes } from "@/data/restaurantes";

export default function RestaurantesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-semibold">Restaurantes en Barranquilla</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Busca por nombre, zona o tipo de comida.
      </p>
      <ListaRestaurantes restaurantes={restaurantes} />
    </main>
  );
}