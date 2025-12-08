import { useState } from "react";
import { Monitor, Moon, Sun, Bell, Globe, Type } from "lucide-react";

export default function PreferencesSection() {
    const [theme, setTheme] = useState<"light" | "dark" | "auto">("dark");
    const [notifications, setNotifications] = useState(true);

    // Mock function to simulate theme switching
    const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
        setTheme(newTheme);
        // In a real app, this would toggle a class on user_preferences/html/body
        console.log(`Theme changed to: ${newTheme}`);
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(0,200,255,0.05)] mt-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Monitor size={22} className="text-purple-400" />
                Preferencias
            </h2>

            <div className="space-y-6">
                {/* Theme Toggles */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-medium">Tema de la interfaz</h3>
                        <p className="text-sm text-gray-400">Selecciona tu apariencia favorita</p>
                    </div>
                    <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                        <button
                            onClick={() => handleThemeChange("light")}
                            className={`p-2 rounded-md transition-all ${theme === "light" ? "bg-white text-black shadow-md" : "text-gray-500 hover:text-gray-300"}`}
                            title="Claro"
                        >
                            <Sun size={18} />
                        </button>
                        <button
                            onClick={() => handleThemeChange("auto")}
                            className={`p-2 rounded-md transition-all ${theme === "auto" ? "bg-white text-black shadow-md" : "text-gray-500 hover:text-gray-300"}`}
                            title="Automático"
                        >
                            <Monitor size={18} />
                        </button>
                        <button
                            onClick={() => handleThemeChange("dark")}
                            className={`p-2 rounded-md transition-all ${theme === "dark" ? "bg-gray-700 text-white shadow-md" : "text-gray-500 hover:text-gray-300"}`}
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
                                <p className="text-sm font-medium text-gray-200">Notificaciones</p>
                                <p className="text-xs text-gray-500">Novedades y alertas</p>
                            </div>
                        </div>
                        {/* Switch Toggle Profesional */}
                        <button
                            onClick={() => setNotifications(!notifications)}
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
                                <p className="text-sm font-medium text-gray-200">Idioma</p>
                                <p className="text-xs text-gray-500">Español (ES)</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                                <Type size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-200">Tipografía</p>
                                <p className="text-xs text-gray-500">Satoshi (Default)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
