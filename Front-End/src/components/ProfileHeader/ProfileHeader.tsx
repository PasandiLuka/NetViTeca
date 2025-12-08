import type { ProfileHeaderProps } from "../../types/ProfileHeaderProps";
import { User as UserIcon, Mail, Calendar } from "lucide-react";

export default function ProfileHeader({ user, onEdit, isEditing }: ProfileHeaderProps) {
    // Generar iniciales
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    // Mock fecha de registro (ya que no la guardamos en Auth.ts)
    const memberSince = "Diciembre 2024";

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_25px_rgba(0,200,255,0.1)] mb-8 transition-all hover:shadow-[0_0_35px_rgba(0,200,255,0.2)]">
            {/* Avatar */}
            <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-cyan-500/30 ring-4 ring-white/10 transition-transform group-hover:scale-105">
                    {getInitials(user.fullname)}
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-[#0a0a0a] shadow-md" title="Online"></div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
                    {user.fullname}
                    <span className="text-sm font-normal text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded-full border border-cyan-500/20">
                        (@{user.username})
                    </span>
                </h1>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1.5">
                        <Mail size={14} className="text-cyan-500" />
                        <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-cyan-500" />
                        <span>Miembro desde {memberSince}</span>
                    </div>
                </div>
            </div>

            {/* Edit Action */}
            <button
                onClick={onEdit}
                disabled={isEditing}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${isEditing
                    ? "bg-white/5 text-gray-500 cursor-not-allowed"
                    : "bg-white text-white hover:bg-cyan-50 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
                    }`}
            >
                <UserIcon size={18} />
                {isEditing ? "Editando..." : "Editar Perfil"}
            </button>
        </div>
    );
}
