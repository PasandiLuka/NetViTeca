import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nv-navbar">
      <div className="nv-container">
        
        {/* LOGO */}
        <Link to="/index" className="nv-logo">
          NetViTeca
        </Link>

        {/* BOTÓN HAMBURGUESA */}
        <button
          className="nv-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="nv-toggle-icon"></span>
          <span className="nv-toggle-icon"></span>
          <span className="nv-toggle-icon"></span>
        </button>

        {/* LINKS */}
        <div className={`nv-links ${isOpen ? "nv-open" : ""}`}>
          <Link to="/disponibles" className="nv-link">Catálogo</Link>
          <Link to="/biblioteca" className="nv-link">Adquirir Libro</Link>
          <Link to="/genero" className="nv-link">Crear Género</Link>
          <Link to="/libro" className="nv-link">Crear Libro</Link>
          <Link to="/librosApi" className="nv-link">Consultar API</Link>

          {/* Cerrar Sesión */}
          <button className="nv-logout">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
