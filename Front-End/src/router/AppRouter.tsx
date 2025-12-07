import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import Home from "../pages/Home/Home";
import Catalogo from "../pages/Catologo/Catologo";
import TusLibros from "../pages/TusLibros/TusLibros";
import Genero from "../pages/Genero/Genero";
import Libro from "../pages/Libro/Libro";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProtectedRoute from "./ProtectedRouter";

function AppRouter() {
  return (
    <Routes>

      {/* RUTAS PUBLICAS */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* RUTAS PRIVADAS */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/tuslibros" element={<TusLibros />} />
        <Route path="/genero" element={<Genero />} />
        <Route path="/libro" element={<Libro />} />
      </Route>

    </Routes>
  );
}

export default AppRouter;
