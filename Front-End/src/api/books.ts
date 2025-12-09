import client from './client';
import type { Libro } from '../types/LibroModel';

// Interfaz interna para matchear la respuesta API (que trae objeto Genre)
interface LibroAPI {
    id: number;
    title: string;
    author: string;
    description: string;
    image: string;
    url?: string;
    editorial?: string;
    genre: {
        id: number;
        name: string;
    } | null;
    personalReadCount?: number;
    // Otros campos que vengan del backend
}

const mapBook = (apiBook: LibroAPI): Libro => {
    return {
        id: apiBook.id,
        title: apiBook.title,
        author: apiBook.author,
        description: apiBook.description,
        image: apiBook.image,
        url: apiBook.url,
        editorial: apiBook.editorial,
        // Flatten genre object to string for frontend compatibility
        genre: apiBook.genre?.name || 'Desconocido',
        personalReadCount: apiBook.personalReadCount || 0
    };
};

export const booksApi = {
    // Obtener libros disponibles (Catálogo)
    getAvailable: async (userId?: number, filter?: string): Promise<Libro[]> => {
        const params = filter ? { filter } : {};
        // Si no hay usuario, usamos ID 0 o manejamos lógica (según backend)
        const id = userId || 0;
        const { data } = await client.get<LibroAPI[]>(`/api/libros/disponibles/${id}`, { params });
        return data.map(mapBook);
    },

    // Obtener mis libros
    getMyBooks: async (userId: number): Promise<Libro[]> => {
        const { data } = await client.get<LibroAPI[]>(`/api/libros/usuario/${userId}`);
        return data.map(mapBook);
    },

    // Crear libro
    create: async (bookData: any): Promise<void> => {
        await client.post('/api/libros', {
            GenreId: bookData.genreId, // El backend espera GenreId
            Title: bookData.title,
            Editorial: bookData.editorial || 'Sin Editorial',
            Author: bookData.author,
            PageCount: bookData.pageCount || 100, // Dummy if missing
            Description: bookData.description,
            Image: bookData.image,
            Url: bookData.url || ''
        });
    },

    // Agregar a biblioteca
    addToLibrary: async (userId: number, bookId: number): Promise<void> => {
        await client.post('/api/bibliotecas', {
            UserId: userId,
            BookIds: [bookId]
        });
    },

    // Remover de biblioteca
    removeFromLibrary: async (userId: number, bookId: number): Promise<void> => {
        await client.delete(`/api/bibliotecas/${userId}/${bookId}`);
    },

    // Incrementar lectura
    incrementReadCount: async (userId: number, bookId: number): Promise<void> => {
        await client.post(`/api/bibliotecas/${userId}/${bookId}/read`);
    }
};
