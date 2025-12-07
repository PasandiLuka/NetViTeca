import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const covers = [
  "/../../../public/DonQuijote.png",
  "/../../../public/portada_cien_anos_de_soledad_0.jpg",
  "/../../../public/Principito.jpeg",
  "/../../../public/portada_el-senor-de-los-anillos_j-r-r-tolkien_201601252224.jpg",
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  // Carrusel simple: cambia de portada cada 4s
  useEffect(() => {
    if (covers.length <= 1) return;

    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % covers.length);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LADO IZQUIERDO: TEXTO + CTAS */}
          <div className="space-y-6">
            <p className="text-sm font-medium text-cyan-400 uppercase tracking-[0.25em] stagger stagger-1">
              Bienvenido a
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              <span className="stagger stagger-2 inline-block">
                NetViTeca:
              </span>
              <br />
              <span className="stagger stagger-3 inline-block">
                tu biblioteca digital
              </span>
              <br />
              <span className="stagger stagger-4 inline-block text-cyan-300">
                personalizada y siempre a disposición.
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 max-w-xl stagger stagger-5">
              Gestiona, descubre y organiza nuevos titulos y colecciones
              de forma simple, moderna y sin preocuparte de su envejecimiento.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 stagger stagger-6">
              {/* CTA primario: Iniciar sesión */}
              <Link 
                to={"/login"}>
                <button
                  className="
                    px-6 py-3 rounded-xl
                    bg-cyan-500/90 text-white font-semibold
                    shadow-[0_0_20px_rgba(56,189,248,0.45)]
                    hover:bg-cyan-400 hover:shadow-[0_0_26px_rgba(56,189,248,0.6)]
                    transition-all duration-200
                  "
                >
                  Iniciar sesión
                </button>
              </Link>

              {/* CTA secundario: Registrarse */}
              <button
                className="
                  px-6 py-3 rounded-xl
                  border border-red-500/70 text-cyan-300 font-semibold
                  hover:bg-red-500/10 hover:text-cyan-200
                  transition-all duration-200
                "
              >
                <Link 
                to={"/register"}>
                  Registrarse
                </Link>
              </button>
            </div>
          </div>

          {/* LADO DERECHO: CARRUSEL DE PORTADAS */}
          <div className="relative h-[260px] md:h-[320px] lg:h-[360px] overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-black to-red-500/20 shadow-[0_0_40px_rgba(15,23,42,0.7)]">
            {/* Capa de portadas */}
            {covers.map((src, index) => (
              <img
                key={src + index}
                src={src}
                alt={`Portada ${index + 1}`}
                className={`
                  absolute inset-0 w-full h-full object-cover 
                  transition-opacity duration-700 
                  ${index === current ? "opacity-100" : "opacity-0"}
                `}
              />
            ))}

            {/* Overlay oscuro para contraste */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Texto decorativo encima */}
            <div className="relative h-full w-full flex flex-col justify-end p-6 gap-2">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Títulos destacados
              </p>
              <p className="text-sm text-gray-200 max-w-xs">
                Visualizá las portadas de tus libros en una experiencia pensada
                para leer y descubrir sin distracciones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
