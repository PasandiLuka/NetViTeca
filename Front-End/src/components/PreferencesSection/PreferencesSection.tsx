import { useContext, useState, useEffect } from "react";
import { Monitor, Moon, Sun, Bell, Globe, Type } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { authApi } from "../../api/auth";

export default function PreferencesSection() {
    const { theme, setTheme } = useTheme();
    const { user, updateUser } = useContext(AuthContext);
    const [notifications, setNotifications] = useState(user?.receiveNotifications ?? true);

    useEffect(() => {
        if (user) {
            setNotifications(user.receiveNotifications ?? true);
        }
    }, [user]);

    const toggleNotifications = async () => {
        if (!user) return;

        const newValue = !notifications;
        setNotifications(newValue);

        try {
            // Optimistic UI update
            updateUser({ ...user, receiveNotifications: newValue });
            await authApi.updateProfile(user.id, { ...user, receiveNotifications: newValue });
        } catch (error) {
            console.error("Error updating notification preference:", error);
            // Revert on error
            setNotifications(!newValue);
            updateUser({ ...user, receiveNotifications: !newValue });
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(0,200,255,0.05)] mt-8">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                <Monitor size={22} className="text-purple-400" />
                Preferencias
            </h2>

            <div className="space-y-6">
                {/* Theme Toggles */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-[var(--color-text-primary)] font-medium">Tema de la interfaz</h3>
                        <p className="text-sm text-[var(--color-text-secondary)]">Selecciona tu apariencia favorita</p>
                    </div>
                    <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                        <button
                            onClick={() => setTheme("light")}
                            className={`p-2 rounded-md transition-all ${theme === "light" ? "bg-white text-black shadow-md" : "text-gray-500 hover:text-gray-300"}`}
                            title="Claro"
                        >
                            <Sun size={18} />
                        </button>
                        <button
                            onClick={() => setTheme("system")}
                            className={`p-2 rounded-md transition-all ${theme === "system" ? "bg-white text-black shadow-md" : "text-gray-500 hover:text-gray-300"}`}
                            title="Automático"
                        >
                            <Monitor size={18} />
                        </button>
                        <button
                            onClick={() => setTheme("dark")}
                            className={`p-2 rounded-md transition-all ${theme === "dark" ? "bg-[var(--color-text-primary)] text-[var(--color-surface)] shadow-md" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"}`}
                            title="Oscuro"
                        >
                            <Moon size={18} />
                        </button>
                    </div>
                </div>

                <div className="h-px bg-white/5" />

                {/* Other Settings (Mock) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                <Bell size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[var(--color-text-primary)]">Notificaciones</p>
                                <p className="text-xs text-[var(--color-text-muted)]">Novedades y alertas</p>
                            </div>
                        </div>
                        {/* Switch Toggle Profesional */}
                        <button
                            onClick={toggleNotifications}
                            className={`
                                relative w-11 h-6 rounded-full flex items-center transition-all duration-300
                                ${notifications
                                    ? "bg-green-500/80 shadow-[0_0_12px_rgba(0,255,120,0.55)]"
                                    : "bg-red-500/70 shadow-[0_0_12px_rgba(255,80,80,0.55)]"
                                }
                                hover:brightness-110
                            `}
                        >
                            <span
                                className={`
                                    w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-all duration-300
                                    ${notifications
                                        ? "translate-x-3 opacity-100"
                                        : "translate-x-1 opacity-90"
                                    }
                                `}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 transition-colors">
                                <Globe size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[var(--color-text-primary)]">Idioma</p>
                                <p className="text-xs text-[var(--color-text-muted)]">Español (ES)</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                                <Type size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[var(--color-text-primary)]">Tipografía</p>
                                <p className="text-xs text-[var(--color-text-muted)]">Satoshi (Default)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
