import { SaidasTable } from "@/components/HistoricoSaidas/historicoSaidasTable";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <h2 className="text-xl pl-10 pt-10 font-bold">Histórico de Saídas</h2>
      <main className="flex-1 p-10 flex gap-6">
        <SaidasTable />
      </main>
    </div>
  );
}
