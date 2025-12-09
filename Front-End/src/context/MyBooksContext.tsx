import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Libro } from "../types/LibroModel";
import { booksApi } from "../api/books";
import { AuthContext } from "./AuthContext";

// Alias Book to Libro for compatibility with existing components
export type Book = Libro;

interface MyBooksContextType {
    myBooks: Book[];
    addBook: (book: Book) => Promise<void>;
    removeBook: (id: number) => Promise<void>;
    hasBook: (id: number) => boolean;
    incrementReadCount: (id: number) => void;
    getMostReadBook: () => Book | null;
    getBooksSavedLastMonth: () => number;
    getLastReadBook: () => Book | null;
}

const MyBooksContext = createContext<MyBooksContextType | undefined>(undefined);

export const MyBooksProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useContext(AuthContext);
    const [myBooks, setMyBooks] = useState<Book[]>([]);

    const [lastReadBookId, setLastReadBookId] = useState<number | null>(() => {
        const stored = localStorage.getItem("lastReadBookId");
        return stored ? parseInt(stored) : null;
    });

    // Pagar libros desde API cuando cambia el usuario
    useEffect(() => {
        if (user) {
            booksApi.getMyBooks(user.id)
                .then(books => setMyBooks(books))
                .catch(err => console.error("Error fetching my books", err));
        } else {
            setMyBooks([]);
        }
    }, [user]);

    useEffect(() => {
        if (lastReadBookId !== null) {
            localStorage.setItem("lastReadBookId", lastReadBookId.toString());
        }
    }, [lastReadBookId]);

    const addBook = async (book: Book) => {
        if (!user) return;
        try {
            await booksApi.addToLibrary(user.id, book.id);
            // Refresh list or optimistic update
            setMyBooks(prev => [...prev, { ...book, addedAt: new Date().toISOString(), personalReadCount: 0 }]);
        } catch (error) {
            console.error("Error adding book", error);
        }
    };

    const removeBook = async (id: number) => {
        if (!user) return;
        try {
            await booksApi.removeFromLibrary(user.id, id);
            setMyBooks(prev => prev.filter(b => b.id !== id));
        } catch (error) {
            console.error("Error removing book", error);
        }
    };

    const hasBook = (id: number) => myBooks.some((b) => b.id === id);

    const incrementReadCount = async (id: number) => {
        if (!user) return;

        // Optimistic update
        setMyBooks(prev => prev.map(book =>
            book.id === id
                ? { ...book, personalReadCount: (book.personalReadCount || 0) + 1 }
                : book
        ));

        setLastReadBookId(id);

        try {
            await booksApi.incrementReadCount(user.id, id);
        } catch (error) {
            console.error("Error incrementing read count", error);
            // Revert on failure? For stats, maybe not critical to revert UI immediately, but technically correct.
        }
    };

    const getMostReadBook = (): Book | null => {
        if (myBooks.length === 0) return null;

        const mostRead = myBooks.reduce((prev, current) => {
            const prevCount = prev.personalReadCount || 0;
            const currentCount = current.personalReadCount || 0;
            return (prevCount >= currentCount) ? prev : current;
        });

        if ((mostRead.personalReadCount || 0) === 0) return null;
        return mostRead;
    };

    const getBooksSavedLastMonth = (): number => {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

        return myBooks.filter(book => {
            if (!book.addedAt) return false;
            const addedDate = new Date(book.addedAt);
            return addedDate >= thirtyDaysAgo;
        }).length;
    };

    const getLastReadBook = (): Book | null => {
        if (lastReadBookId === null) return null;
        return myBooks.find((b) => b.id === lastReadBookId) || null;
    };

    return (
        <MyBooksContext.Provider value={{ myBooks, addBook, removeBook, hasBook, incrementReadCount, getMostReadBook, getBooksSavedLastMonth, getLastReadBook }}>
            {children}
        </MyBooksContext.Provider>
    );
};

export const useMyBooks = () => {
    const context = useContext(MyBooksContext);
    if (!context) {
        throw new Error("useMyBooks must be used within a MyBooksProvider");
    }
    return context;
};
