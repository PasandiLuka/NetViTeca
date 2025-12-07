import { useState, useEffect } from "react";
import type { User } from "../../utils/Auth";
import { Save, X, Phone, Mail, User as UserIcon, AlertCircle } from "lucide-react";

interface ProfileFormProps {
    user: User;
    onCancel: () => void;
    onSave: (updatedUser: User) => void;
}

export default function ProfileForm({ user, onCancel, onSave }: ProfileFormProps) {
    const [formData, setFormData] = useState<User>(user);
    const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        // Resetear form si cambia el user prop (aunque en este caso suele ser estable)
        setFormData(user);
        setErrors({});
        setIsDirty(false);
    }, [user]);

    const validate = (name: string, value: string) => {
        let error = "";
        if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Email inválido";
        }
        if (name === "phone" && !/^\+?[\d\s-]{8,}$/.test(value)) {
            error = "Teléfono inválido (mín. 8 dígitos)";
        }
        if (name === "fullname" && value.length < 3) {
            error = "Nombre muy corto";
        }
        if (name === "username" && value.length < 3) {
            error = "Username muy corto";
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setIsDirty(true);

        const error = validate(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar todo antes de enviar
        const newErrors: typeof errors = {};
        let hasError = false;
        (Object.keys(formData) as Array<keyof User>).forEach((key) => {
            if (key === 'password') return; // No validamos password aquí
            const error = validate(key, formData[key as keyof User] || "");
            if (error) {
                newErrors[key] = error;
                hasError = true;
            }
        });

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        onSave(formData);
    };

    const inputClasses = (hasError: boolean, isSuccess: boolean) => `
    w-full bg-black/20 border rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300
    ${hasError
            ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            : isSuccess && isDirty
                ? "border-green-500/50 focus:border-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                : "border-white/10 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        }
  `;

    return (
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_25px_rgba(0,200,255,0.05)] relative overflow-hidden animate-fadeIn">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <UserIcon size={24} className="text-cyan-400" />
                Información Personal
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fullname */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Nombre Completo</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            className={inputClasses(!!errors.fullname, !errors.fullname && formData.fullname.length > 0)}
                            placeholder="Ej: Darko Pantić"
                        />
                        {errors.fullname && <AlertCircle size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />}
                    </div>
                    {errors.fullname && <p className="text-xs text-red-400 ml-1">{errors.fullname}</p>}
                </div>

                {/* Username */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Nombre de Usuario</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled // Usernames usually shouldn't change easily or require check
                            className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
                            title="El nombre de usuario no se puede cambiar"
                        />
                    </div>
                    <p className="text-xs text-gray-500 ml-1">El nombre de usuario no es editable.</p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Correo Electrónico</label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${inputClasses(!!errors.email, !errors.email && formData.email.length > 0)} pl-10`}
                        />
                    </div>
                    {errors.email && <p className="text-xs text-red-400 ml-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Teléfono</label>
                    <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`${inputClasses(!!errors.phone, !errors.phone && formData.phone.length > 0)} pl-10`}
                        />
                    </div>
                    {errors.phone && <p className="text-xs text-red-400 ml-1">{errors.phone}</p>}
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-end gap-4 border-t border-white/10 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium flex items-center gap-2"
                >
                    <X size={18} />
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                    <Save size={18} />
                    Guardar Cambios
                </button>
            </div>
        </form>
    );
}
