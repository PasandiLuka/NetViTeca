import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import { getBooks, type Book } from "../../services/bookService";
// import { getSession } from "../../utils/Auth"; // No se está usando por ahora

import { useMyBooks } from "../../context/MyBooksContext";

const Catalogo = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const { addBook } = useMyBooks();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error("Error al cargar los libros", err);
        setError("Hubo un problema al cargar el catálogo. Por favor intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center p-8 bg-red-900/20 border border-red-500/50 rounded-xl max-w-md">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Catálogo de Libros</h1>
        <GenreFilter
          genres={Array.from(new Set(books.map((book) => book.genre))).filter(Boolean).sort()} // Extract unique existing genres
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books
          .filter(book => selectedGenre === "Todos" || book.genre === selectedGenre)
          .map((book) => (
            <BookCard
              key={book.id}
              image={book.image}
              title={book.title}
              author={book.author}
              description={book.description}
              onClick={() => console.log(`Abrir libro: ${book.title}`)}
              onAdd={() => {
                addBook(book);
                alert(`Libro "${book.title}" agregado a tus libros`);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Catalogo;
