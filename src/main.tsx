import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ProductProvider } from "./contexts/productContext.js";
import AppRouter from "./routes.tsx";
import { SaidaProvider } from "./contexts/saidaContext.tsx";
import { ProdutosSaidaProvider } from "./contexts/useProdutosSaidaContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductProvider>
      <SaidaProvider>
        <ProdutosSaidaProvider>
          <AppRouter />
        </ProdutosSaidaProvider>
      </SaidaProvider>
    </ProductProvider>
  </React.StrictMode>
);
