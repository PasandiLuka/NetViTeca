import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { authApi } from "../../api/auth";
import type { User } from "../../types/UserModel";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import StatsSection from "../../components/StatsSection/StatsSection";
import PreferencesSection from "../../components/PreferencesSection/PreferencesSection";
import DangerZone from "../../components/DangerZone/DangerZone";
import { useNavigate } from "react-router-dom";

export default function MiPerfil() {
    const { user, updateUser, logoutUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    if (!user) return null;

    const handleUpdate = async (updatedUser: User) => {
        try {
            await authApi.updateProfile(user.id, updatedUser); // Using authApi to update

            // Merge updated fields into current user state
            // The API returns the updated user, but updatedUser from form has the fields we care about.
            const newUser = { ...user, ...updatedUser };
            updateUser(newUser);

            alert("Perfil actualizado correctamente.");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Hubo un error al actualizar el perfil.");
        }
    };

    const handleDelete = () => {
        // TODO: Implement delete using authApi
        if (confirm("¿Estás seguro? Esta acción no se puede deshacer.")) {
            console.log("Delete not fully implemented");
            alert("Funcionalidad en mantenimiento.");
            // logoutUser();
            // navigate("/login");
        }
    };

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto space-y-6">

                <ProfileHeader
                    user={user}
                    isEditing={isEditing}
                    onEdit={() => setIsEditing(!isEditing)}
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 animate-fadeIn">

                    {isEditing ? (
                        <ProfileForm
                            user={user}
                            onCancel={() => setIsEditing(false)}
                            onSave={handleUpdate}
                        />
                    ) : (
                        <>
                            <StatsSection />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2">
                                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Resumen de Cuenta</h2>
                                    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-[var(--color-text-secondary)] mb-1">Nombre Completo</p>
                                                <p className="text-[var(--color-text-primary)] font-medium text-lg">{user.fullname}</p>
                                            </div>
                                            <div>
                                                <p className="text-[var(--color-text-secondary)] mb-1">Usuario</p>
                                                <p className="text-[var(--color-text-primary)] font-medium text-lg">@{user.username}</p>
                                            </div>
                                            <div>
                                                <p className="text-[var(--color-text-secondary)] mb-1">Email</p>
                                                <p className="text-[var(--color-text-primary)] font-medium text-lg">{user.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-[var(--color-text-secondary)] mb-1">Teléfono</p>
                                                <p className="text-[var(--color-text-primary)] font-medium text-lg">{user.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <PreferencesSection />

                    <DangerZone
                        onLogout={handleLogout}
                        onDeleteAccount={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
}
