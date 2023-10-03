import { MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

export function Menu() {
  return (
    <>
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">
          <Link to="/">
          ControleStock
          </Link>
        </h1>

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
    </>
  );
}
