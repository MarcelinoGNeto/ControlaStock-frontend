import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu } from "../components/Menu/menu";
import { Home } from "../pages/home/Home";
import { Saidas } from "../pages/saidas/Saidas";
import { Produtos } from "../pages/produtos/Produtos";
import { Login } from "../pages/login/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";

export default function AppRouter() {
  
  return (
    <main>
      <Router>
        <Menu />
        <Routes>
          <Route path="*" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/saidas"
            element={
              <ProtectedRoutes>
                <Saidas />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/estoque"
            element={
              <ProtectedRoutes>
                <Produtos />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </main>
  );
}
