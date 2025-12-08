import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Book } from "../services/bookService";

interface MyBooksContextType {
    myBooks: Book[];
    addBook: (book: Book) => void;
    removeBook: (id: number) => void;
    hasBook: (id: number) => boolean;
    incrementReadCount: (id: number) => void;
    getMostReadBook: () => Book | null;
    getMostReadBook: () => Book | null;
    getBooksSavedLastMonth: () => number;
    getLastReadBook: () => Book | null;
}

const MyBooksContext = createContext<MyBooksContextType | undefined>(undefined);

export const MyBooksProvider = ({ children }: { children: ReactNode }) => {
    const [myBooks, setMyBooks] = useState<Book[]>(() => {
        const stored = localStorage.getItem("myBooks");
        return stored ? JSON.parse(stored) : [];
    });

    const [readStats, setReadStats] = useState<Record<number, number>>(() => {
        const stored = localStorage.getItem("myBooksStats");
        return stored ? JSON.parse(stored) : {};
    });

    const [lastReadBookId, setLastReadBookId] = useState<number | null>(() => {
        const stored = localStorage.getItem("lastReadBookId");
        return stored ? parseInt(stored) : null;
    });

    useEffect(() => {
        localStorage.setItem("myBooks", JSON.stringify(myBooks));
    }, [myBooks]);

    useEffect(() => {
        localStorage.setItem("myBooksStats", JSON.stringify(readStats));
    }, [readStats]);

    useEffect(() => {
        if (lastReadBookId !== null) {
            localStorage.setItem("lastReadBookId", lastReadBookId.toString());
        }
    }, [lastReadBookId]);

    const addBook = (book: Book) => {
        setMyBooks((prev) => {
            if (prev.some((b) => b.id === book.id)) return prev;
            return [...prev, { ...book, addedAt: new Date().toISOString() }];
        });
    };

    const removeBook = (id: number) => {
        setMyBooks((prev) => prev.filter((b) => b.id !== id));
    };

    const hasBook = (id: number) => myBooks.some((b) => b.id === id);

    const incrementReadCount = (id: number) => {
        setReadStats((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
        setLastReadBookId(id);
    };

    const getMostReadBook = (): Book | null => {
        let maxId = -1;
        let maxCount = -1;

        for (const [id, count] of Object.entries(readStats)) {
            if (count > maxCount) {
                maxCount = count;
                maxId = parseInt(id);
            }
        }

        if (maxId === -1) return null;
        return myBooks.find((b) => b.id === maxId) || null;
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
