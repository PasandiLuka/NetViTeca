import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";
import { useMyBooks } from "../../context/MyBooksContext";

const TusLibros = () => {
  const { myBooks } = useMyBooks();
  const navigate = useNavigate();

  if (myBooks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mb-6">
          Hasta el momento no tiene libros, ¿desea adquirir uno?
        </h2>
        <button
          onClick={() => navigate("/catalogo")}
          className="
            px-8 py-3 rounded-xl font-bold text-lg
            bg-cyan-500 text-white shadow-lg shadow-cyan-500/30
            hover:bg-cyan-400 hover:scale-105 transition-all
          "
        >
          Ir al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Mis Libros</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {myBooks.map((book) => (
          <BookCard
            key={book.id}
            image={book.image}
            title={book.title}
            author={book.author}
            description={book.description}
            // En la vista de mis libros, el botón de agregar podría estar deshabilitado o no hacer nada
            // O podríamos poner lógica para "Leer"
            onClick={() => console.log(`Leer libro: ${book.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default TusLibros;
