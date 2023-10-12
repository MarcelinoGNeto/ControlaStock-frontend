import React, { ReactNode } from "react";
import AppRouter from "./routes";
import { usuarioAutenticado } from "@/services/loginAPI";

type ProtectedRouterProps = {
    children: ReactNode;
  };

export const ProtectedRoutes: React.FC<ProtectedRouterProps> = ({ children }) => {

    const userAuth = usuarioAutenticado()
    return userAuth ? children : <AppRouter />

  };
