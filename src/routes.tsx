import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu } from "./components/Menu/menu";
import { Home } from "./pages/home/Home";
import { Saidas } from "./pages/saidas/Saidas";
import { Produtos } from "./pages/produtos/Produtos";

export default function AppRouter() {
  return (
    <main>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saidas" element={<Saidas />} />
          <Route path="/produtos" element={<Produtos />} />
        </Routes>
      </Router>
    </main>
  );
}
