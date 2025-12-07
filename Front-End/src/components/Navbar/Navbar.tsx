import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import type { NavbarProps } from "../../types/NavbarProps";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Navbar({ open, setOpen }: NavbarProps) {
  const { user, logoutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  return (
    <nav
      className="
        fixed top-0 left-0 right-0 h-16 
        bg-black/70 backdrop-blur-xl border-b border-white/10 
        shadow-[0_0_15px_rgba(0,170,255,0.35)]
        flex items-center justify-between px-6 z-50
      "
    >
      {/* IZQUIERDA: HAMBURGER + LOGO + TITULO */}
      <div className="flex items-center gap-4">
        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white hover:text-cyan-400 transition"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* LOGO + TITULO */}
        <Link
          to="/"
          className="
              flex items-center gap-3 no-underline text-white
              hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]
              transition-all duration-200
            "
        >
          <img src="/logoNetViTeca.png" className="w-24" />
          <h2 className="text-xl font-semibold ">NetViTeca</h2>
        </Link>
      </div>

      {/* DERECHA: USUARIO */}
      {user && (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-white hover:text-cyan-300 transition focus:outline-none"
          >

            <span className="font-medium text-lg">{user.fullname || user.username}</span>
            <ChevronDown size={20} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* DROPDOWN MENU */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-md shadow-lg py-2 flex flex-col z-50">
              <Link
                to="/miperfil"
                className="text-left px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition w-full"
                onClick={() => {
                  setDropdownOpen(false);
                  // Acción "Mi perfil" por definir
                }}
              >
                Mi perfil
              </Link>
              <Link
                to="/mislibros"
                className="px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition block"
                onClick={() => setDropdownOpen(false)}
              >
                Mis Libros
              </Link>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <Link
                to="/"
                className="text-left px-4 py-2 text-red-400 hover:bg-white/10 hover:!text-red-500 transition w-full"
                onClick={() => {
                  setDropdownOpen(false);
                  logoutUser();
                }}
              >
                Cerrar sesión
              </Link>
            </div>
          )}
        </div>
      )}

    </nav>
  );
}
