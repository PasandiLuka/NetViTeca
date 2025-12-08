import client from './client';

// Tipos requeridos por el backend
export interface LoginRequest {
    email: string;
    password?: string; // El DTO backend usa 'Password', frontend login pasa (email, password)
}

// El backend retorna UsuarioResponseDTO
export interface AuthResponse {
    id: number;
    username: string;
    email: string;
}

export const authApi = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        // Ajustar segun DTO esperado: UsuarioLoginRequestDTO (Email, Password)
        const { data } = await client.post<AuthResponse>('/api/usuarios/login', { email, password });
        return data;
    },

    register: async (userData: any): Promise<AuthResponse> => {
        // DTO: UsuarioCreacionRequestDTO (NombreCompleto, NombreUsuario, Correo, Contrasena, NumeroTelefono)
        const payload = {
            FullName: userData.fullname,
            Username: userData.username,
            Email: userData.email,
            Password: userData.password,
            Phone: userData.phone
        };
        const { data } = await client.post<AuthResponse>('/api/usuarios/registro', payload);
        return data;
    },

    // Actualizar perfil de usuario
    updateProfile: async (id: number, userData: any): Promise<AuthResponse> => {
        // DTO Backend: UsuarioActualizacionRequestDTO (FullName, Phone)
        const payload = {
            FullName: userData.fullname,
            Phone: userData.phone
        };
        const { data } = await client.put<AuthResponse>(`/api/usuarios/${id}`, payload);
        return data;
    },
};
