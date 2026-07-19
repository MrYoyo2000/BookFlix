import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { getBooks, createBook, deleteBook, updateBook } from "../API_servis/booksApi";

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (err) {
            setError("Failed to load books.");
        } finally {
            setLoading(false);
        }
    };

    const addBook = async (book: Omit<Book, "id">) => {
        try {
            const newBook = await createBook(book);
            setBooks((prev) => [...prev, newBook]);
        } catch (err) {
            setError("Failed to add book.");
        }
    };

    const removeBook = async (id: number) => {
        try {
            await deleteBook(id);
            setBooks((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            setError("Failed to delete book.");
        }
    };

    const editBook = async (book: Book) => {
        try {
            const res = await updateBook(book);
            setBooks((prev) =>
                prev.map((b) => (b.id === book.id ? { ...b, ...res } : b))
            );
        } catch (err) {
            setError("Failed to update book.");
        }
    };

    return {
        books,
        loading,
        error,
        addBook,
        removeBook,
        editBook,
        refresh: fetchBooks,
    };
};