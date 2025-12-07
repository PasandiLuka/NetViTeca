import { useState } from "react";
import { saveGenre } from "../../services/bookService";
import { useNavigate } from "react-router-dom";

const CreateGenre = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            await saveGenre(name.trim());
            // Mostramos feedback breve o simplemente redirigimos
            navigate("/genero");
        } catch (error) {
            console.error("Error creating genre:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-full min-h-[60vh]">
            <div className="w-full max-w-md bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(0,170,255,0.1)]">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Crear Nuevo Género</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="genreName" className="text-gray-300 text-sm">Nombre del Género</label>
                        <input
                            id="genreName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej. Terror Psicológico"
                            className="bg-white/5 border border-white/10 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !name.trim()}
                        className="mt-4 bg-cyan-500/80 hover:bg-cyan-500 text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Guardando..." : "Crear Género"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-gray-400 hover:text-white text-sm text-center mt-2 transition-colors"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateGenre;
