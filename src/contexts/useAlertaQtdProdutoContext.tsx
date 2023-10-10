import React, { createContext, useContext, useState, ReactNode } from "react";

type AlertaQtdProdutoContextData = {
  alertaQtdProdutoSelecionado: boolean;
  setAlertaQtdProdutoSelecionado: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlertaQtdProdutoContext = createContext<AlertaQtdProdutoContextData | undefined>(undefined);

type AlertaQtdProdutoProviderProps = {
  children: ReactNode;
};

export const AlertaQtdProdutoProvider: React.FC<AlertaQtdProdutoProviderProps> = ({ children }) => {
  const [alertaQtdProdutoSelecionado, setAlertaQtdProdutoSelecionado] = useState<boolean>(false);

  return (
    <AlertaQtdProdutoContext.Provider value={{ alertaQtdProdutoSelecionado, setAlertaQtdProdutoSelecionado }}>
      {children}
    </AlertaQtdProdutoContext.Provider>
  );
};

export const useAlertaQtdProdutoContext = (): AlertaQtdProdutoContextData => {
  const context = useContext(AlertaQtdProdutoContext);
  if (context === undefined) {
    throw new Error("Erro ao buscar alerta da quantidade do produto");
  }
  return context;
};
