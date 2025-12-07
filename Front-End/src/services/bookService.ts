import booksData from '../data/books.json';

export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    image: string;
}

export const getBooks = (): Promise<Book[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(booksData);
        }, 500); // Simula un retraso de red de 500ms
    });
};
