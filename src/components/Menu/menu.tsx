import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { NavMenu } from "./navigationMenu/navigationMenu";
import { SuportButton } from "./suportButton/suportButton";
import { useAuthContext } from "@/contexts/useAuthContext";
import { useLoginLogoutContext } from "@/contexts/useLoginLogoutContext";
import { logout, usuarioAutenticado } from "@/services/loginAPI";
import { useEffect } from "react";

export function Menu() {
  const { autenticado } = useAuthContext();
  const { logInOut, setLogInOut } = useLoginLogoutContext();
  const { setAutenticado } = useAuthContext();

  const handleLogoutClick = () => {
    logout();
    setLogInOut(false);
    setAutenticado(false);
  };

  useEffect(() => {
    if (usuarioAutenticado()) {
      setLogInOut(true);
    }
  }, []);

  return (
    <>
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">
          {autenticado ? <NavMenu /> : null}
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
          {logInOut ? (
            <Link
              className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2
            inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors 
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none 
            disabled:opacity-50"
              to="/"
              onClick={handleLogoutClick}
            >
              Sair
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}
