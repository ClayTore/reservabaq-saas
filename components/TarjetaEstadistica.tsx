type Props = {
  titulo: string;
  valor: number;
};

export default function TarjetaEstadistica({ titulo, valor }: Props) {
  return (
    <div className="rounded-lg border border-zinc-200 p-4">
      <p className="text-sm text-zinc-500">{titulo}</p>
      <p className="mt-1 text-3xl font-bold text-emerald-600">{valor}</p>
    </div>
  );
}