import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://10.120.0.113:5017';

const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token a las peticiones
client.interceptors.request.use(
    (config) => {
        const session = localStorage.getItem('session');
        if (session) {
            try {
                // const user = JSON.parse(session);
                // Asumiendo que el token está en user.token si existiera... 
                // pero por ahora el backend actual NO parece usar JWT Auth Header standard, 
                // sino que validaba por usuario/pass en endpoints o mocks.
                // Si el backend implementa JWT, deberiamos usar:
                // if (user.token) config.headers.Authorization = `Bearer ${user.token}`;

                // Dado que el backend actual parece ser básico (por lo visto en Controller), 
                // tal vez no necesitemos esto aún, pero es buena práctica dejarlo preparado.
            } catch (e) {
                console.error("Error parsing session", e);
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default client;
