import client from './client';
import type { Genero } from '../types/GeneroModel';

// Ajuste si la respuesta API difiere del modelo local
// API devuelve: { id, name }
// Frontend GeneroModel: { id, genero? or name? } -> Check types later
// Assuming frontend model has 'name' or 'genero'. I'll check types/GeneroModel later.
// For now, mapping 'name' to 'genero' (from standard 'genero' in JSONs previously) or keeping as is.

interface GeneroAPI {
    id: number;
    name: string;
}

export const genresApi = {
    getAll: async (): Promise<Genero[]> => {
        const { data } = await client.get<GeneroAPI[]>('/api/generos');
        // Map API 'name' to whatever frontend uses if different.
        // If frontend uses 'genero' property:
        return data.map(g => ({
            id: g.id,
            genero: g.name // Assuming frontend type uses 'genero' based on old data
        } as any));
    },

    create: async (name: string): Promise<void> => {
        await client.post('/api/generos', { Name: name });
    }
};
