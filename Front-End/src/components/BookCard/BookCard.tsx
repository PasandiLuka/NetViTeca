import type { BookCardProps } from "@/types/BookCardProps";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMyBooks } from "../../context/MyBooksContext";

export default function BookCard({ id, image, title, author, description, onAdd, onDelete, url }: BookCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const { incrementReadCount } = useMyBooks();

  // Estado para la imagen con fallback
  const [imgSrc, setImgSrc] = useState(image);

  useEffect(() => {
    setImgSrc(image);
  }, [image]);

  const handleImageError = () => {
    // Fallback a una imagen por defecto o placeholder de color
    // Usamos una imagen de placeholder de servicio público si falla
    setImgSrc("https://via.placeholder.com/300x400?text=No+Image");
  };

  // Validación de URL
  const isValidUrl = (link?: string) => {
    if (!link) return false;
    // Chequear si empieza con http/https
    if (link.startsWith("http://") || link.startsWith("https://")) return true;
    // Si es una ruta relativa válida (no ../..)
    if (link.startsWith("/") && !link.includes("..")) return true;
    return false;
  };

  const bookUrl = isValidUrl(url) ? url : "";

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpenModal(true)}
        className="
          group cursor-pointer overflow-hidden
          bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl 
          shadow-[0_0_15px_rgba(0,200,255,0.15)]
          hover:shadow-[0_0_15px_rgba(0,200,255,0.15)]
          hover:shadow-[0_0_35px_rgba(0,200,255,0.35)]
          backdrop-blur-lg transition-all duration-300
          hover:-translate-y-1 hover:border-cyan-400/50
          relative
        "
      >
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-xl">

          <img
            src={imgSrc}
            alt={title}
            onError={handleImageError}
            className="w-full h-full object-cover 
            group-hover:scale-105 transition-all duration-500"
          />

          {/* Badges */}


          {/* Botón Eliminar en la tarjeta (antes de presionar) */}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="
                 absolute top-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded-md font-bold shadow-lg
                 hover:bg-red-600 transition-colors z-20
               "
            >
              ✕ Eliminar
            </button>
          )}

          <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>

        <div className="p-4 flex flex-col gap-2 text-[var(--color-text-primary)]">
          <h3 className="font-bold text-lg text-[var(--color-text-primary)] group-hover:text-cyan-300 transition">
            {title.length > 42 ? title.slice(0, 42) + "..." : title}
          </h3>

          <p className="text-sm text-cyan-300 opacity-90">
            {author}
          </p>

          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
            {description}
          </p>

          {/* BOTÓN (Solo mostrar Agregar aquí si existe onAdd) */}
          {onAdd && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("📚 Agregado a biblioteca ->", title);
                onAdd();
              }}
              className="
                mt-2 w-full py-2 rounded-lg font-semibold
                bg-cyan-500 text-white hover:bg-cyan-400 
                transition shadow-[0_0_15px_rgba(0,200,255,0.4)]
                active:scale-[0.97]
              "
            >
              + Agregar a mi biblioteca
            </button>
          )}
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div
          className="
            fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50
            animate-fadeIn
          "
        >
          <div className="
            bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-8 w-[90%] max-w-xl 
            shadow-[0_0_40px_rgba(0,200,255,0.4)]
          ">
            <h2 className="text-3xl text-[var(--color-text-primary)] hover:text-cyan-300 transition-colors duration-300 font-bold">{title}</h2>
            <p className="text-[var(--color-text-secondary)] text-sm mt-1 mb-4">por {author}</p>

            <img
              src={imgSrc}
              onError={handleImageError}
              className="w-40 h-56 object-cover rounded-lg shadow mx-auto mb-4"
            />

            <p className="text-[var(--color-text-secondary)] text-center">{description}</p>



            {onAdd && (
              <button
                className="
                  w-full mt-6 py-2 rounded-lg bg-cyan-500 text-white font-semibold 
                  hover:bg-cyan-400 active:scale-[0.97]
                "
                onClick={() => {
                  console.log("📚 Agregado a biblioteca ->", title);
                  onAdd();
                }}
              >
                + Agregar a mi biblioteca
              </button>
            )}

            {/* Link Externo */}
            {bookUrl && (
              <Link
                to={bookUrl}
                target="_blank"
                onClick={() => incrementReadCount(id)}
                className="
                  block w-full mt-3 py-2 rounded-lg font-semibold text-center
                  bg-cyan-600 hover:bg-cyan-500 transition-all duration-300
                  text-white hover:text-cyan-400              /* 👈 foco del efecto */
                  active:scale-[0.97]
                  shadow-[0_0_15px_rgba(0,200,255,0.35)]
                "
              >
                📖 Ver Libro
              </Link>
            )}

            {/* Eliminar en Modal */}
            {onDelete && (
              <button
                onClick={() => { onDelete(); setOpenModal(false); }}
                className="
                  w-full mt-3 py-2 rounded-lg font-semibold text-white
                  bg-red-600 
                  hover:bg-red-500 hover:text-red-400
                  active:scale-[0.97] transition-all
                "
              >
                🗑 Eliminar de mi biblioteca
              </button>
            )}

            <button
              className="w-full mt-3 text-gray-400 hover:text-red-400 transition"
              onClick={() => setOpenModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
