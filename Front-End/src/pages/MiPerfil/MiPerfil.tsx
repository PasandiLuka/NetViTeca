import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateUser, deleteUser, type User } from "../../utils/Auth";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import StatsSection from "../../components/StatsSection/StatsSection";
import PreferencesSection from "../../components/PreferencesSection/PreferencesSection";
import DangerZone from "../../components/DangerZone/DangerZone";
import { useNavigate } from "react-router-dom";

export default function MiPerfil() {
    const { user, updateAuthSession, logoutUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    if (!user) return null; // Should be handled by ProtectedRoute but extra safety

    const handleUpdate = (updatedUser: User) => {
        const result = updateUser(updatedUser);
        if (result.ok) {
            updateAuthSession(updatedUser);
            setIsEditing(false);
            // Optional: Add toast notification here
        } else {
            alert("Error al actualizar: " + result.msg);
        }
    };

    const handleDelete = () => {
        const result = deleteUser(user.username);
        if (result.ok) {
            logoutUser();
            navigate("/login");
        } else {
            alert("Error al eliminar cuenta");
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
                                    <h2 className="text-2xl font-bold text-white mb-4">Resumen de Cuenta</h2>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500 mb-1">Nombre Completo</p>
                                                <p className="text-white font-medium text-lg">{user.fullname}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 mb-1">Usuario</p>
                                                <p className="text-white font-medium text-lg">@{user.username}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 mb-1">Email</p>
                                                <p className="text-white font-medium text-lg">{user.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 mb-1">Teléfono</p>
                                                <p className="text-white font-medium text-lg">{user.phone}</p>
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
