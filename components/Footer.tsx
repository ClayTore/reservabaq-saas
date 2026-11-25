import { contenedor } from "@/lib/estilos";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div
        className={`${contenedor} flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between`}
      >
        <p>© 2026 ReservaBaq · Barranquilla, Colombia</p>
        <p>Proyecto de Buenas Prácticas en el Desarrollo de Software · CUC</p>
      </div>
    </footer>
  );
}