import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ProductProvider } from "./contexts/productContext.js";
import AppRouter from "./routes.tsx";
import { SaidaProvider } from "./contexts/saidaContext.tsx";
import { ProdutosSaidaProvider } from "./contexts/useProdutosSaidaContext.tsx";
import { AlertaProdutoProvider } from "./contexts/useAlertaProdutoContext.tsx";
import { AlertaQtdProdutoProvider } from "./contexts/useAlertaQtdProdutoContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductProvider>
      <SaidaProvider>
        <ProdutosSaidaProvider>
          <AlertaProdutoProvider>
            <AlertaQtdProdutoProvider>
              <AppRouter />
            </AlertaQtdProdutoProvider>
          </AlertaProdutoProvider>
        </ProdutosSaidaProvider>
      </SaidaProvider>
    </ProductProvider>
  </React.StrictMode>
);
