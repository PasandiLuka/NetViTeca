import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import { booksApi } from "../../api/books";
import { genresApi } from "../../api/genres";
import type { Libro as Book } from "../../types/LibroModel";
import { useMyBooks } from "../../context/MyBooksContext";
import { AuthContext } from "../../context/AuthContext";

const Catalogo = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const { addBook } = useMyBooks();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Si hay usuario, pedir disponibles para él (excluyendo los que ya tiene)
        // Si no, pedir todos (getAvailable acepta userId opcional)
        // También pedimos los géneros para el filtro
        const [booksData, genresData] = await Promise.all([
          booksApi.getAvailable(user?.id),
          genresApi.getAll()
        ]);

        setBooks(booksData);
        // Asumimos que genresData viene con la propiedad 'genero' o 'name' mapeada correctamente
        // En genres.ts vimos que mapea a 'genero'
        setGenres(genresData.map((g: any) => g.genero || g.name));
      } catch (err) {
        console.error("Error al cargar los datos", err);
        setError("Hubo un problema al cargar el catálogo. Por favor intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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

  // Filtrar libros
  const filteredBooks = books.filter(book => {
    const matchGenre = selectedGenre === "Todos" || book.genre === selectedGenre;
    const matchSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4 md:mb-0">Catálogo de Libros</h1>

        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
                    px-4 py-2 rounded-lg 
                    bg-[var(--color-surface)] border border-[var(--color-border)] 
                    text-[var(--color-text-primary)] focus:border-cyan-500 focus:outline-none 
                    placeholder-gray-500 transition-all w-full md:w-64
                "
          />
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        </div>
      </div>

      {/* Caso 1: No hay libros en absoluto */}
      {books.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-64 text-center">
          <p className="text-[var(--color-text-secondary)] text-xl mb-6">No hay libros disponibles por el momento, ¿desea agregar un libro?</p>
          <button
            onClick={() => navigate('/crearlibro')}
            className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-400 transition-all transform hover:scale-105"
          >
            Crear un libro
          </button>
        </div>
      ) : (
        /* Caso 2: Hay libros, pero el filtro no arroja resultados */
        filteredBooks.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-[var(--color-text-secondary)] text-xl">No hay libros que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          /* Caso 3: Mostrar libros filtrados */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                image={book.image}
                title={book.title}
                author={book.author}
                editorial={book.editorial}
                description={book.description}
                onClick={() => console.log(`Abrir libro: ${book.title}`)}
                onAdd={() => {
                  addBook(book);
                  alert(`Libro "${book.title}" agregado a tus libros`);
                }}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Catalogo;
