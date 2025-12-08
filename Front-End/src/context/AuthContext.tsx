import { createContext, useEffect, useState } from "react";
import type { User } from "../types/UserModel";
import { authApi } from "../api/auth";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  updateUser: (user: User) => void;
  logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Leer sesión guardada al iniciar
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch {
        localStorage.removeItem("session");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      // Map response to User type
      const loggedUser: User = { ...response };
      setUser(loggedUser);
      localStorage.setItem("session", JSON.stringify(loggedUser));
    } catch (error) {
      console.error("Login Error:", error);
      throw error; // Re-throw to be handled by UI
    }
  };

  const register = async (userData: any) => {
    try {
      await authApi.register(userData);
      // Optional: Auto-login after register? Or just redirect to login.
      // Usually register just creates key.
    } catch (error) {
      console.error("Register Error:", error);
      throw error;
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("session", JSON.stringify(updatedUser));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("session");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, updateUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
