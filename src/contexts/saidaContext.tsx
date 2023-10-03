import React, { createContext, useContext, useState, ReactNode } from "react";

type SaidaData = {
  saidas: any[];
  setSaidas: React.Dispatch<React.SetStateAction<any[]>>;
};

const SaidaContext = createContext<SaidaData | undefined>(undefined);

type SaidasProviderProps = {
  children: ReactNode;
};

export const SaidaProvider: React.FC<SaidasProviderProps> = ({ children }) => {
  const [saidas, setSaidas] = useState<any[]>([]);

  return (
    <SaidaContext.Provider value={{ saidas, setSaidas }}>
      {children}
    </SaidaContext.Provider>
  );
};

export const useSaidaContext = (): SaidaData => {
  const context = useContext(SaidaContext);
  if (context === undefined) {
    throw new Error("Erro ao buscar as saidas");
  }
  return context;
};
