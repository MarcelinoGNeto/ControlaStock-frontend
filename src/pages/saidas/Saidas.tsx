import { ProdutosTable } from "@/components/EntradaProduto/produtosTable";
import { RegistroSaidas } from "@/components/SaidaProduto/registroSaidas";

export function Saidas() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-10 flex gap-6">
        <ProdutosTable />

        <RegistroSaidas />

      </main>
    </div>
  );
}
