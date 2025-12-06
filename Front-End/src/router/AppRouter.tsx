import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import Home from "../pages/Home/Home";
import Catalogo from "../pages/Catologo/Catologo";
import TusLibros from "../pages/TusLibros/TusLibros";
import Genero from "../pages/Genero/Genero";
import Libro from "../pages/Libro/Libro";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="index" element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="tuslibros" element={<TusLibros />} />
        <Route path="genero" element={<Genero />} />
        <Route path="libro" element={<Libro />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
