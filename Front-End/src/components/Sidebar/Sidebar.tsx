import { useContext } from "react";
import type { SidebarProps } from "../../types/SidebarProps";
import { cn } from "../../utils/cn";
import { AuthContext } from "../../context/AuthContext";


export default function Sidebar({ open, onClose }: SidebarProps) {
  const {logoutUser,user} = useContext(AuthContext);
  return (
    <>
      {/* BACKDROP */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-[280px] z-50",
          "bg-black/60 backdrop-blur-lg border-r border-white/10",
          "shadow-[0_0_25px_rgba(0,170,255,0.35)]",
          "transform transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
          "flex flex-col",                       // << NUEVO para permitir auto push
          open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        )}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white hover:text-cyan-400 transition"
          >
            ✕
          </button>
        </div>

        {/* 🔹 MENU LINKS */}
        <nav className="flex flex-col gap-2 px-6 mt-4">
          {[
            {href: "/", label: "Inicio"},
            {href: "/catalogo", label: "Catálogo"},
            {href: "/tuslibros", label: "Tus libros"},
            {href: "/genero", label: "Género"},
            {href: "/libro", label: "Libro"},
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-gray-200 text-lg py-2 px-3 rounded-md",
                "transition-all duration-300",
                "hover:text-white hover:bg-white/10",
                "hover:translate-x-2"
              )}
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 🔥 BOTÓN ABAJO DEL TODO */}
        {user && (
          <button
            onClick={logoutUser}
            className="mt-auto mb-6 mx-6 py-2 text-red-400 hover:text-red-500 transition"
          >
            Cerrar sesión
          </button>
        )}
      </aside>
    </>
  );
}
