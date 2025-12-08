import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { booksApi } from "../../api/books";
import { genresApi } from "../../api/genres";
import type { Genero } from "../../types/GeneroModel";

export default function CreateBook() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState<Genero[]>([]);

    const [form, setForm] = useState({
        title: "",
        genre: "", // Stores genre NAME for display/select usage if needed, or better, store ID? Form usually binds to select value.
        genreId: "", // Helper for select
        editorial: "",
        author: "",
        description: "",
        image: "",
        url: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        genresApi.getAll().then(data => {
            setGenres(data);
            // Pre-select first genre if available
            if (data.length > 0) {
                setForm(prev => ({ ...prev, genreId: data[0].id.toString(), genre: data[0].genero }));
            }
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const isImageValid = (url: string) => {
        // Basic validation
        return url.length > 5;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isImageValid(form.image)) {
            alert("Por favor introduce una URL de imagen válida");
            return;
        }

        setLoading(true);

        // Find genre ID from selection if needed, or use form.genreId
        const genreIdInt = parseInt(form.genreId);

        try {
            await booksApi.create({
                title: form.title,
                author: form.author,
                editorial: form.editorial,
                description: form.description,
                image: form.image,
                url: form.url,
                genreId: isNaN(genreIdInt) ? 1 : genreIdInt,
                // Publisher/PageCount defaults handled in API wrapper or backend
            });
            alert("Libro creado con éxito");
            navigate("/catalogo");
        } catch (error) {
            console.error("Error creating book:", error);
            alert("Error al crear el libro. Verifica los datos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">Publicar Nuevo Libro</h1>

            <div className="bg-[var(--color-surface)] backdrop-blur-md p-6 md:p-8 rounded-xl border border-[var(--color-border)] shadow-[0_0_20px_rgba(0,170,255,0.15)]">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* IZQUIERDA: Campos Texto */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[var(--color-text-secondary)] text-sm">Título del Libro</label>
                            <input
                                name="title"
                                type="text"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Ej. El Alquimista"
                                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[var(--color-text-secondary)] text-sm">Autor</label>
                            <input
                                name="author"
                                type="text"
                                value={form.author}
                                onChange={handleChange}
                                placeholder="Ej. Paulo Coelho"
                                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[var(--color-text-secondary)] text-sm">Editorial</label>
                            <input
                                name="editorial"
                                type="text"
                                value={form.editorial}
                                onChange={handleChange}
                                placeholder="Ej. Planeta"
                                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[var(--color-text-secondary)] text-sm">Género</label>
                            <select
                                name="genreId"
                                value={form.genreId}
                                onChange={handleChange}
                                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                                required
                            >
                                <option value="" disabled>Selecciona un género</option>
                                {genres.map(g => (
                                    <option key={g.id} value={g.id}>{g.genero}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[var(--color-text-secondary)] text-sm">Enlace al PDF</label>
                            <input
                                name="url"
                                type="url"
                                value={form.url}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {/* DERECHA: Descripción e Imagen */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[var(--color-text-secondary)] text-sm">Descripción</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Breve sinopsis del libro..."
                                rows={4}
                                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[var(--color-text-secondary)] text-sm">URL de Portada</label>
                            <input
                                name="image"
                                type="url"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                                required
                            />
                            {/* Previsualización imagen */}
                            <div className="mt-2 h-40 w-full bg-[var(--color-background)]/50 rounded-lg flex items-center justify-center overflow-hidden border border-[var(--color-border)]">
                                {form.image ? (
                                    <img
                                        src={form.image}
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
                            className="px-6 py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.5)] transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:scale-100"
                        >
                            {loading ? "Publicando..." : "Publicar Libro"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
