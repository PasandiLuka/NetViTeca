import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";
import { useMyBooks } from "../../context/MyBooksContext";

const MisLibros = () => {
  const { myBooks, removeBook } = useMyBooks();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<any>(null); // Using any to simplify avoiding complex type imports for now, or infer from usage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteRequest = (book: any) => {
    setBookToDelete(book);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      removeBook(bookToDelete.id);
      setDeleteModalOpen(false);
      setBookToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
      </div>
    );
  }

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {myBooks.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            image={book.image}
            title={book.title}
            author={book.author}
            description={book.description}
            url={book.url}
            onDelete={() => handleDeleteRequest(book)}
            onClick={() => console.log(`Leer libro: ${book.title}`)}
          />
        ))}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {
        deleteModalOpen && bookToDelete && (
          <div
            className="
            fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50
            animate-fadeIn
          "
          >
            <div className="
            bg-black/60 rounded-xl border border-white/10 p-8 w-[90%] max-w-md
            shadow-[0_0_40px_rgba(255,50,50,0.4)]
            text-center
          ">
              <h2 className="text-2xl text-white font-bold mb-4">¿Eliminar Libro?</h2>

              <p className="text-gray-300 mb-2">
                Vas a eliminar <span className="text-cyan-400 font-semibold">{bookToDelete.title}</span> de tu biblioteca.
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Esta acción no se puede deshacer (a menos que lo agregues de nuevo desde el catálogo).
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={confirmDelete}
                  className="
                    w-full py-2 rounded-lg font-semibold text-white
                    bg-red-600 
                    hover:bg-red-500 hover:text-white
                    active:scale-[0.97] transition-all
                    shadow-lg shadow-red-500/20
                "
                >
                  Sí, eliminar
                </button>

                <button
                  className="
                    w-full py-2 rounded-lg font-semibold text-gray-300
                    hover:text-white hover:bg-white/10
                    transition-all
                "
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default MisLibros;
