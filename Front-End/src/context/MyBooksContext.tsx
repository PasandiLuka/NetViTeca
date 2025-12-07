import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Book } from "../services/bookService";

interface MyBooksContextType {
    myBooks: Book[];
    addBook: (book: Book) => void;
    removeBook: (id: number) => void;
    hasBook: (id: number) => boolean;
}

const MyBooksContext = createContext<MyBooksContextType | undefined>(undefined);

export const MyBooksProvider = ({ children }: { children: ReactNode }) => {
    const [myBooks, setMyBooks] = useState<Book[]>(() => {
        const stored = localStorage.getItem("myBooks");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("myBooks", JSON.stringify(myBooks));
    }, [myBooks]);

    const addBook = (book: Book) => {
        setMyBooks((prev) => {
            if (prev.some((b) => b.id === book.id)) return prev;
            return [...prev, book];
        });
    };

    const removeBook = (id: number) => {
        setMyBooks((prev) => prev.filter((b) => b.id !== id));
    };

    const hasBook = (id: number) => myBooks.some((b) => b.id === id);

    return (
        <MyBooksContext.Provider value={{ myBooks, addBook, removeBook, hasBook }}>
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
