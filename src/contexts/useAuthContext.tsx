import { usuarioAutenticado } from "@/services/loginAPI";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  autenticado: boolean;
  setAutenticado: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [autenticado, setAutenticado] = useState(usuarioAutenticado());

  return (
    <AuthContext.Provider value={{ autenticado, setAutenticado }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
