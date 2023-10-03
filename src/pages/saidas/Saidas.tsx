import { ProdutosTable } from "@/components/EntradaProduto/produtosTable";
import { FormSaida } from "@/components/SaidaProduto/formSaidaProdutos/formSaida";
import { ProdutosSaidaTable } from "@/components/SaidaProduto/formSaidaProdutos/produtosSaidaTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Saidas() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-10 flex gap-6">
        <aside>
          <ProdutosTable />
        </aside>
        <Card>
          <CardHeader>
            <CardTitle>Registar saída</CardTitle>
            <CardDescription>
              Escolha um destinatário e os produtos que farão parte dessa saída
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormSaida />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
