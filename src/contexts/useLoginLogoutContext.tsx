import React, { createContext, useContext, useState, ReactNode } from "react";

type logInOutData = {
  logInOut: boolean;
  setLogInOut: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginLogoutContext = createContext<logInOutData | undefined>(undefined);

type LoginLogoutProviderProps = {
  children: ReactNode;
};

export const LogInOutProvider: React.FC<LoginLogoutProviderProps> = ({ children }) => {
  const [logInOut, setLogInOut] = useState<boolean>(false);

  return (
    <LoginLogoutContext.Provider value={{ logInOut, setLogInOut }}>
      {children}
    </LoginLogoutContext.Provider>
  );
};

export const useLoginLogoutContext = (): logInOutData => {
  const context = useContext(LoginLogoutContext);
  if (context === undefined) {
    throw new Error("Erro ao buscar por Login-Logout");
  }
  return context;
};
