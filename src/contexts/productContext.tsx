import React, { createContext, useContext, useState, ReactNode } from "react";

interface IProdutos {
  _id: string;
  nome: string;
  genero: string;
  medida: string;
  quantidade: number;
}

type ProductData = {
  produtos: IProdutos[];
  setProdutos: React.Dispatch<React.SetStateAction<IProdutos[]>>;
};

const ProductContext = createContext<ProductData | undefined>(undefined);

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [produtos, setProdutos] = useState<IProdutos[]>([]);

  return (
    <ProductContext.Provider value={{ produtos, setProdutos }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductData => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("Erro ao buscar os produtos");
  }
  return context;
};
