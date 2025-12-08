import booksData from '../data/books.json';
import genresData from '../data/genres.json';

export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    image: string;
    url?: string;
    genre: string;
    addedAt?: string;
}

const BOOKS_KEY = 'netviteca_books';
const GENRES_KEY = 'netviteca_genres';

// --- LIBROS ---

export const getBooks = (): Promise<Book[]> => {
    return new Promise((resolve) => {
        const storedBooks = localStorage.getItem(BOOKS_KEY);
        if (storedBooks) {
            resolve(JSON.parse(storedBooks));
        } else {
            // Inicializar con datos del JSON si no hay nada en localStorage
            localStorage.setItem(BOOKS_KEY, JSON.stringify(booksData));
            resolve(booksData);
        }
    });
};

export const saveBook = (newBook: Omit<Book, 'id'>): Promise<Book> => {
    return new Promise((resolve) => {
        const storedBooksStr = localStorage.getItem(BOOKS_KEY);
        let currentBooks: Book[] = storedBooksStr ? JSON.parse(storedBooksStr) : booksData;

        // Generar nuevo ID
        const maxId = currentBooks.length > 0 ? Math.max(...currentBooks.map(b => b.id)) : 0;
        const bookToSave: Book = { ...newBook, id: maxId + 1 };

        currentBooks = [...currentBooks, bookToSave];
        localStorage.setItem(BOOKS_KEY, JSON.stringify(currentBooks));
        resolve(bookToSave);
    });
};

// --- GÉNEROS ---

export const getGenres = (): Promise<string[]> => {
    return new Promise((resolve) => {
        const storedGenres = localStorage.getItem(GENRES_KEY);
        if (storedGenres) {
            resolve(JSON.parse(storedGenres));
        } else {
            // Inicializar con datos del JSON
            localStorage.setItem(GENRES_KEY, JSON.stringify(genresData));
            resolve(genresData);
        }
    });
};

export const saveGenre = (newGenre: string): Promise<string[]> => {
    return new Promise((resolve) => {
        const storedGenresStr = localStorage.getItem(GENRES_KEY);
        let currentGenres: string[] = storedGenresStr ? JSON.parse(storedGenresStr) : genresData;

        if (!currentGenres.includes(newGenre)) {
            currentGenres = [...currentGenres, newGenre].sort();
            localStorage.setItem(GENRES_KEY, JSON.stringify(currentGenres));
        }

        resolve(currentGenres);
    });
};
