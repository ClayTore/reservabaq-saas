import ListaRestaurantes from "@/components/ListaRestaurantes";
import { restaurantes } from "@/data/restaurantes";
import { contenedor } from "@/lib/estilos";

export default function PaginaRestaurantes() {
  return (
    <main className={`${contenedor} py-12`}>
      <h1 className="text-3xl font-bold tracking-tight">Restaurantes en Barranquilla</h1>
      <p className="mt-2 mb-8 text-muted">
        Encuentra un lugar para hoy y reserva tu mesa.
      </p>
      <ListaRestaurantes restaurantes={restaurantes} />
    </main>
  );
}