import { tarjeta } from "@/lib/estilos";

type Props = {
  titulo: string;
  valor: number;
};

export default function TarjetaEstadistica({ titulo, valor }: Props) {
  return (
    <div className={`${tarjeta} p-5`}>
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{titulo}</p>
      <p className="mt-2 text-3xl font-bold text-primary">{valor}</p>
    </div>
  );
}