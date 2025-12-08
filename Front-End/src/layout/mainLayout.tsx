// src/layout/MainLayout.tsx
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] overflow-x-hidden">

      <Navbar open={open} setOpen={setOpen} />
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Contenido que se empuja */}
      <div
        className={`transition-transform duration-300 pt-16 ${open ? "translate-x-[280px]" : ""
          }`}
      >
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
