import { useState, useEffect } from "react";
import { saveBook, getGenres } from "../../services/bookService";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
    const navigate = useNavigate();
    const [genres, setGenres] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        genre: "",
        image: "",
        url: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadGenres = async () => {
            const loadedGenres = await getGenres();
            setGenres(loadedGenres);
            // Pre-seleccionar el primer género si existe
            if (loadedGenres.length > 0) {
                setFormData(prev => ({ ...prev, genre: loadedGenres[0] }));
            }
        };
        loadGenres();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isImageValid = (url: string) => {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null || url.includes("images.unsplash.com");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isImageValid(formData.image)) {
            alert("Por favor introduce una URL de imagen válida (terminada en .jpg, .png, etc. o de Unsplash)");
            return;
        }

        setLoading(true);

        try {
            await saveBook(formData);
            navigate("/catalogo");
        } catch (error) {
            console.error("Error creating book:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Publicar Nuevo Libro</h1>

            <div className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(0,170,255,0.15)]">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* IZQUIERDA: Campos Texto */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Título del Libro</label>
                            <input
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Ej. El Alquimista"
                                className="bg-white/5 border border-white/10 rounded-md p-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Autor</label>
                            <input
                                name="author"
                                type="text"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Ej. Paulo Coelho"
                                className="bg-white/5 border border-white/10 rounded-md p-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Género</label>
                            <select
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                className="bg-white/5 border border-white/10 rounded-md p-3 text-white focus:border-cyan-400 focus:outline-none transition-colors [&>option]:bg-gray-900"
                                required
                            >
                                <option value="" disabled>Selecciona un género</option>
                                {genres.map(genre => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Enlace al PDF</label>
                            <input
                                name="url"
                                type="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="bg-white/5 border border-white/10 rounded-md p-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {/* DERECHA: Descripción e Imagen */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">Descripción</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Breve sinopsis del libro..."
                                rows={4}
                                className="bg-white/5 border border-white/10 rounded-md p-3 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm">URL de Portada</label>
                            <input
                                name="image"
                                type="url"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="bg-white/5 border border-white/10 rounded-md p-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                                required
                            />
                            {/* Previsualización imagen */}
                            <div className="mt-2 h-40 w-full bg-black/20 rounded-lg flex items-center justify-center overflow-hidden border border-white/5">
                                {formData.image ? (
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                ) : (
                                    <span className="text-gray-600 text-sm">Vista previa</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.5)] transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:scale-100"
                        >
                            {loading ? "Publicando..." : "Publicar Libro"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBook;
