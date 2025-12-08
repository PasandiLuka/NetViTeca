import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { genresApi } from "../../api/genres";

const CreateGenre = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            await genresApi.create(name.trim());
            alert("Género creado con éxito");
            navigate("/catalogo");
        } catch (error) {
            console.error("Error creating genre:", error);
            alert("Error al crear el género");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-full min-h-[60vh]">
            <div className="w-full max-w-md bg-[var(--color-surface)] backdrop-blur-md p-8 rounded-xl border border-[var(--color-border)] shadow-[0_0_15px_rgba(0,170,255,0.1)]">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">Crear Nuevo Género</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="genreName" className="text-[var(--color-text-secondary)] text-sm">Nombre del Género</label>
                        <input
                            id="genreName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej. Terror Psicológico"
                            className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !name.trim()}
                        className="mt-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Guardando..." : "Crear Género"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm text-center mt-2 transition-colors"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateGenre;
