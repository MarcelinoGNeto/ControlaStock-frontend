import { Separator } from "../ui/separator";
import { NavMenu } from "./navigationMenu/navigationMenu";
import { SuportButton } from "./suportButton/suportButton";

export function Menu() {
  return (
    <>
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">
          <NavMenu />
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido por: Marcelino Neto
          </span>
          <Separator orientation="vertical" className="h-6" />
          <SuportButton
            phoneNumber="5591993078307"
            message="Olá Marcelino! Estou precisando de suporte no sistema ControleStock"
          />
        </div>
      </div>
    </>
  );
}
