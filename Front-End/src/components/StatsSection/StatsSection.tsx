import { BookOpen, Headphones, Star, TrendingUp } from "lucide-react";
import { useMyBooks } from "../../context/MyBooksContext";

export default function StatsSection() {
    const { myBooks } = useMyBooks();

    const stats = [
        {
            label: "Libros Guardados",
            value: myBooks.length,
            icon: BookOpen,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20",
        },
        {
            label: "Audiolibros",
            value: 0, // Mock
            icon: Headphones,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
        },
        {
            label: "Valoraciones",
            value: 12, // Mock
            icon: Star,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20",
        },
        {
            label: "Último Leído",
            value: "Don Quijote", // Mock
            icon: TrendingUp,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-xl border ${stat.border} bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] group`}
                >
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <div className={`p-3 rounded-full ${stat.bg} ${stat.color} mb-1 shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-shadow`}>
                            <stat.icon size={24} />
                        </div>
                        <span className="text-3xl font-bold text-white tracking-wide">
                            {stat.value}
                        </span>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {stat.label}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
