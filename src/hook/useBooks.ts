import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { getBooks, createBook, deleteBook, updateBook } from "../API_servis/booksApi";
import { logger } from "../logges/logges";

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
        logger.info("FETCH", "Loading books...");
        try {
            const data = await getBooks();
            setBooks(data);
            logger.success("FETCH", `${data.length} books loaded successfully.`, data);
        } catch (err) {
            setError("Failed to load books.");
            logger.error("FETCH", "Failed to load books.", err);
        } finally {
            setLoading(false);
        }
    };

    const addBook = async (book: Omit<Book, "id">) => {
        logger.info("CREATE", "Attempting to add a book...", book);
        try {
            const newBook = await createBook(book);
            setBooks((prev) => [...prev, newBook]);
            logger.success("CREATE", `Book "${newBook.title}" added with id: ${newBook.id}`, newBook);
        } catch (err) {
            setError("Failed to add book.");
            logger.error("CREATE", "Failed to add book.", err);
        }
    };

    const removeBook = async (id: number) => {
        logger.info("DELETE", `Attempting to delete book id: ${id}`);
        try {
            await deleteBook(id);
            setBooks((prev) => prev.filter((b) => b.id !== id));
            logger.success("DELETE", `Book id: ${id} deleted successfully.`);
        } catch (err) {
            setError("Failed to delete book.");
            logger.error("DELETE", `Failed to delete book id: ${id}`, err);
        }
    };

    const editBook = async (book: Book) => {
        logger.info("UPDATE", `Attempting to update book id: ${book.id}`, book);
        try {
            const res = await updateBook(book);
            setBooks((prev) =>
                prev.map((b) => (b.id === book.id ? { ...b, ...res } : b))
            );
            logger.success("UPDATE", `Book id: ${book.id} updated successfully.`, res);
        } catch (err) {
            setError("Failed to update book.");
            logger.error("UPDATE", `Failed to update book id: ${book.id}`, err);
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