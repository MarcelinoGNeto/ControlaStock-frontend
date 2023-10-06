import { ProdutosTable } from "@/components/EntradaProduto/produtosTable";

export function Produtos() {
  return (
    <div className="min-h-screen flex flex-col">
      <h2 className="text-xl pl-10 pt-10 font-bold">Lista de Produtos</h2>
      <main className="flex-1 p-10 flex gap-6 justify-center">
        <ProdutosTable />
      </main>
    </div>
  );
}
