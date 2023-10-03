import { SaidasTable } from "@/components/SaidaProduto/saidasTable";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-10 flex gap-6">
        <SaidasTable />
      </main>
    </div>
  );
}
