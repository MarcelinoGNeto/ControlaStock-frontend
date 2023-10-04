import { FormSaida } from "@/components/SaidaProduto/formSaidaProdutos/formSaida";
import { ProdutosSaidaTable } from "./formSaidaProdutos/produtosSaidaTable";
import { SelecionaDestinatario } from "./formSaidaProdutos/selecionaDestinatario";
import { useProdutosSaidaContext } from "@/contexts/useProdutosSaidaContext";


export function RegistroSaidas() {
  const { dataProdutosSaida } = useProdutosSaidaContext();

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="font-semibold leading-none tracking-tight">Registar saída</div>
        <div className="text-sm text-muted-foreground">
          Escolha um destinatário e os produtos que farão parte dessa saída
        </div>
      </div>
      <div className="p-6 pt-0">
        <FormSaida />
        <ProdutosSaidaTable />
        <SelecionaDestinatario />
      </div>
    </div>
  );
}
