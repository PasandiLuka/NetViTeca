import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import Home from "../pages/Home/Home";
import Catalogo from "../pages/Catologo/Catologo";
import MisLibros from "../pages/MisLibros/MisLibros";

import Libro from "../pages/Libro/Libro";
import CreateBook from "../pages/Libro/CreateBook";
import CreateGenre from "../pages/Genero/CreateGenre";
import MiPerfil from "../pages/MiPerfil/MiPerfil";
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
        <Route path="/mislibros" element={<MisLibros />} />

        <Route path="/libro" element={<Libro />} />
        <Route path="/crearlibro" element={<CreateBook />} />
        <Route path="/creargenero" element={<CreateGenre />} />
        <Route path="/miperfil" element={<MiPerfil />} />
      </Route>

    </Routes>
  );
}

export default AppRouter;
