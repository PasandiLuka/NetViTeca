import { useState } from "react";
import { LogOut, Trash2, AlertTriangle, X } from "lucide-react";
import type { DangerZoneProps } from "../../types/DangerZoneProps";

export default function DangerZone({ onLogout, onDeleteAccount }: DangerZoneProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [step, setStep] = useState(1); // 1: Confirmación inicial, 2: Escribir "ELIMINAR"

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
        setStep(1);
        setConfirmText("");
    };

    const handleFinalDelete = () => {
        if (confirmText === "ELIMINAR") {
            onDeleteAccount();
        }
    };

    return (
        <div className="mt-12 mb-20">
            <h2 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-2">
                <AlertTriangle size={22} />
                Zona de Peligro
            </h2>

            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-6 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-[var(--color-text-primary)] font-medium">Cerrar Sesión</h3>
                        <p className="text-sm text-[var(--color-text-secondary)]">Finaliza tu sesión actual en este dispositivo.</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="px-6 py-2.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] !text-red-600 hover:!text-red-800 transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
                    >
                        <LogOut size={18} />
                        Cerrar Sesión
                    </button>
                </div>                
            </div>

            {/* Modal de Confirmación */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-[var(--color-background)] border border-red-500/30 rounded-2xl max-w-md w-full p-8 shadow-[0_0_50px_rgba(239,68,68,0.2)] relative">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="p-4 rounded-full bg-red-500/10 text-red-500 mb-2">
                                <AlertTriangle size={48} />
                            </div>

                            {step === 1 ? (
                                <>
                                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">¿Estás seguro?</h3>
                                    <p className="text-[var(--color-text-secondary)]">
                                        Estás a punto de eliminar tu cuenta permanentemente. Esta acción borrará todos tus datos y NO se puede revertir.
                                    </p>
                                    <div className="flex gap-4 w-full mt-4">
                                        <button
                                            onClick={() => setShowDeleteModal(false)}
                                            className="flex-1 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] font-medium"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => setStep(2)}
                                            className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors"
                                        >
                                            Continuar
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Confirmación Final</h3>
                                    <p className="text-[var(--color-text-secondary)] text-sm">
                                        Para confirmar, escribe <span className="text-red-500 font-bold select-none">ELIMINAR</span> a continuación.
                                    </p>
                                    <input
                                        type="text"
                                        value={confirmText}
                                        onChange={(e) => setConfirmText(e.target.value)}
                                        className="w-full bg-[var(--color-surface)] border border-red-500/30 rounded-lg px-4 py-3 text-center text-[var(--color-text-primary)] tracking-widest placeholder-[var(--color-text-muted)] focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder="ELIMINAR"
                                    />
                                    <button
                                        onClick={handleFinalDelete}
                                        disabled={confirmText !== "ELIMINAR"}
                                        className={`w-full py-3 rounded-lg font-bold transition-all mt-4 ${confirmText === "ELIMINAR"
                                            ? "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                            : "bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] cursor-not-allowed"
                                            }`}
                                    >
                                        Confirmar Eliminación
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
