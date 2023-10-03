import React, { createContext, useContext, useState, ReactNode } from "react";

type ProdutosSaidaData = {
  dataProdutosSaida: any[];
  setDataProdutosSaida: React.Dispatch<React.SetStateAction<any[]>>;
};

const ProdutosSaidaContext = createContext<ProdutosSaidaData | undefined>(undefined);

type SaidasProviderProps = {
  children: ReactNode;
};

export const ProdutosSaidaProvider: React.FC<SaidasProviderProps> = ({ children }) => {
  const [dataProdutosSaida, setDataProdutosSaida] = useState<any[]>([]);

  return (
    <ProdutosSaidaContext.Provider value={{ dataProdutosSaida, setDataProdutosSaida }}>
      {children}
    </ProdutosSaidaContext.Provider>
  );
};

export const useProdutosSaidaContext = (): ProdutosSaidaData => {
  const context = useContext(ProdutosSaidaContext);
  if (context === undefined) {
    throw new Error("Erro ao buscar os produtos da saída");
  }
  return context;
};
