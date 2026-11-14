import AuthGuard from "@/components/AuthGuard";

export default function PanelPage() {
  return (
    <AuthGuard>
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Panel del restaurante</h1>
        <p className="mt-2 text-sm text-zinc-500">Aquí verás tus reservas (en construcción).</p>
      </main>
    </AuthGuard>
  );
}