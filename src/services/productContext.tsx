import React, { createContext, useContext, useState, ReactNode } from "react";

type ProductData = {
  produtos: any[];
  setProdutos: React.Dispatch<React.SetStateAction<any[]>>;
};

const ProductContext = createContext<ProductData | undefined>(undefined);

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [produtos, setProdutos] = useState<any[]>([]);

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
