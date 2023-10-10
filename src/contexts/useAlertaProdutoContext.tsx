import React, { createContext, useContext, useState, ReactNode } from "react";

type AlertaProdutoContextData = {
  alertaProdutoSelecionado: boolean;
  setAlertaProdutoSelecionado: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlertaProdutoContext = createContext<AlertaProdutoContextData | undefined>(undefined);

type AlertaProdutoProviderProps = {
  children: ReactNode;
};

export const AlertaProdutoProvider: React.FC<AlertaProdutoProviderProps> = ({ children }) => {
  const [alertaProdutoSelecionado, setAlertaProdutoSelecionado] = useState<boolean>(false);

  return (
    <AlertaProdutoContext.Provider value={{ alertaProdutoSelecionado, setAlertaProdutoSelecionado }}>
      {children}
    </AlertaProdutoContext.Provider>
  );
};

export const useAlertaProdutoContext = (): AlertaProdutoContextData => {
  const context = useContext(AlertaProdutoContext);
  if (context === undefined) {
    throw new Error("Erro ao buscar alerta do produto");
  }
  return context;
};
