import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import type { NavbarProps } from "../../types/NavbarProps";


export default function Navbar({ open, setOpen }: NavbarProps) {
  

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 h-16 
        bg-black/70 backdrop-blur-xl border-b border-white/10 
        shadow-[0_0_15px_rgba(0,170,255,0.35)]
        flex items-center justify-between px-6 z-50
      "
    >
      {/* LOGO + TITULO */}
      <div
        className={`transition-transform duration-300 ${
          open ? "translate-x-[280px]" : ""
        }`}
      >
        <div className="flex items-center gap-3">
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
      </div>
      {/* HAMBURGER */}
      <button
        onClick={() => setOpen(!open)}
        className="text-white hover:text-cyan-400 transition"
      >
        {open ? <X size={30} /> : <Menu size={30} />}
      </button>
      
    </nav>
  );
}
