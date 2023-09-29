import { Button } from "./components/ui/button";
import { MessageSquare } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { DataTable } from "./components/dataTable";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">ControleStock</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido por: Marcelino Neto
          </span>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="secondary">
            <MessageSquare className="w-4 h-4 mr-2" />
            Suporte
          </Button>
        </div>
      </div>

      <main className="flex-1 p-10 flex gap-6">
        <DataTable />
      </main>
    </div>
  );
}
