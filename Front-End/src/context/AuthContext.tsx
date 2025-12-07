import { createContext, useEffect, useState } from "react";
import { getSession, logout, type User } from "../utils/Auth";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (u: User) => void;
  logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🟦 Leer sesión guardada al iniciar la app
  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
    setLoading(false);
  }, []);

  // 🟦 Guardar sesión para ProtectedRoute
  const login = (u: User) => {
    setUser(u);
    localStorage.setItem("session", JSON.stringify(u));
  };

  const logoutUser = () => {
    setUser(null);
    logout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
